/* 
    @Summary: Error Handling Interceptor 
    @Description: In charge of intercepting responses and determine if their an error.
*/

angular.module('MetronicApp')
    .factory('errorHandlerInterceptor', ['errorHandlerService',
        function(errorHandlerService) {
            return {
                responseError: (err) => {
                    return errorHandlerService.handle(err)
                        .then(() => Promise.resolve(err))
                        .catch(() => Promise.reject(err));
                }
            };
        }
]);

angular.module('MetronicApp')
    .service('errorHandlerService', ['$injector',
        function($injector) {

            function handle(err) {
                const swangular = $injector.get('swangular'); // avoid circular dependency
                const $state = $injector.get('$state');

                return new Promise((resolve, reject) => {
                    switch (err.status) {

                        case 401:
                            reject('unauthorized');
                            break;

                        case 403:
                            swangular.open({
                                htmlTemplate: 'backoffice/tpl/403.html',
                                showLoaderOnConfirm: true,
                                type: 'error',
                                controller: () => {}
                            });
                            $state.go('login');
                            break;

                        case 404:
                            swangular.open({
                                htmlTemplate: '/backoffice/tpl/404.html',
                                showLoaderOnConfirm: true,
                                type: 'error',
                                controller: () => {}
                            });
                            reject('not found');
                            break;

                        case 409:
                            reject('duplicate');
                            break;

                        case 400:
                        case 500:
                        case 502:
                            swangular.open({
                                htmlTemplate: 'backoffice/tpl/502.html',
                                showLoaderOnConfirm: true,
                                type: 'error',
                                controller: () => {}
                            });
                            break;

                        default:
                            resolve(err);
                            break;
                    }
                });
            }

            return {
                handle
            };
        }
    ]);