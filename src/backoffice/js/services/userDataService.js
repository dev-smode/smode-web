/* 
    @Summary: User Data Service 
    @Description: In charge of API requests and data related the user that is now logged in to the app.
*/

angular.module('MetronicApp')
    .service('userDataService', ['authService', '$state', '$http', 'CONFIG',
        function(authService, $state, $http, CONFIG) {
            const server = CONFIG.SERVER;

            function setUserData() {
                return authService.checkCurrentUser()
                    .then((res) => {
                        this.currentUser = {
                          'mainStateScreen':'login'
                        };
                        Object.assign(this.currentUser,res.data);

                        const _isAdmin = isAdmin.bind(this);
                        if (_isAdmin()) {
                            this.currentUser.mainStateScreen = 'customerList';
                        } else {
                            this.currentUser.mainStateScreen = 'driversList';
                        }
                    })
                    .catch(() => $state.go('login'));
            }

            function isCustomer() {
                return this.currentUser.roles.includes('CUSTOMER');
            }

            function isAdmin() {
                return this.currentUser.roles.includes('ADMIN');
            }

            function updateUserLanguage(lang) {
                return $http.patch(server + '/users/current', {language: lang});
            }

            return {
                setUserData,
                isCustomer,
                isAdmin,
                updateUserLanguage
            };
        }
    ]);
