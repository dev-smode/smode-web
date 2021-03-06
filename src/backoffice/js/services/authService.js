/* 
    @Summary: Authentication service 
    @Description: in charge of API requests and data related to user authentication.
*/

angular.module('MetronicApp')
  .service('authService', ['$http', 'CONFIG', 'swangular', 'errorHandlerService',
    function ($http, CONFIG, swangular, errorHandlerService) {

      const server = CONFIG.SERVER;

      function login(credentials) {
        return $http
          .post(server + '/authenticate', credentials)
          .then((result) => {
            const token = result.headers().authorization;
            return localStorage.setItem('token', token);
          })
          .catch((err) => {
            if (err.status === 401) {
              swangular.swal('פרטי ההתחברות שגויים',
                'אנא בדוק את הנתונים שהזנת.',
                'info'
              );
              return Promise.reject(err);
            } else {
              errorHandlerService.handle(err);
            }
          });
      }

      function checkCurrentUser() {
        const token = localStorage.getItem('token');
        if (token) {
          return $http.get(server + '/users/current');
        } else return Promise.reject();
      }

      return {
        login,
        checkCurrentUser
      };
    }
  ]);


angular.module('MetronicApp')
  .factory('authInterceptor', () => {
    return {
      request: function (config) {
        const token = localStorage.getItem('token');
        config.headers = config.headers || {};
        if(token) config.headers.Authorization = token;
        return config;
      },
      response: (res) => {
        const newToken = res.headers().authorization;
        const currentToken = localStorage.getItem('token');

        if (newToken && newToken !== currentToken) {
          localStorage.setItem('token', newToken);
        }
        return res;
      }
    };
  });
