/* 
    @Summary: Login controller 
    @Description: in charge of all logic actions related to Login
*/
angular.module('MetronicApp')
    .controller('LoginController', ['$state', 'authService', 'userDataService',
        function($state, authService, userDataService) {

            this.submit = (isValid) => {
                if (isValid) {
                    const user = {
                        password: this.password,
                        email: this.email,
                        recaptchaResponse: this.recaptchaResponse
                    };

                    authService.login(user)
                        .then(() => userDataService.setUserData())
                        .then(() => {
                            $state.go(userDataService.currentUser.mainStateScreen);
                        });
                }
            };
        }
]);
