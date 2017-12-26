/***
Metronic AngularJS App Main Script
***/


/* Metronic App */
const MetronicApp = angular.module('MetronicApp', [
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'angular-jwt',
    'naif.base64',
    'angularModalService',
    'angular-ladda',
    'angular-progress-button-styles',
    'swangular',
    'ui.bootstrap.datetimepicker',
    'ngAnimate',
    'pascalprecht.translate',
    'vcRecaptcha'
]);

MetronicApp.constant('CONFIG', {
    // 'SERVER': 'http://192.168.0.26:8080',//DEV
    'SERVER': 'http://52.35.199.200:80',//PROD
    'DRIVER_PERMISSIONS': [
        {
            type: 'LEVEL_A',
            value: 0,
            name: 'DRIVER_FORM.DRIVER_PERMISSIONS.LEVEL_A'
        },
        {
            type: 'LEVEL_B',
            value: 1,
            name: 'DRIVER_FORM.DRIVER_PERMISSIONS.LEVEL_B'
        },
        {
            type: 'LEVEL_C',
            value: 2,
            name: 'DRIVER_FORM.DRIVER_PERMISSIONS.LEVEL_C'
        },
        {
            type: 'LEVEL_D',
            value: 3,
            name: 'DRIVER_FORM.DRIVER_PERMISSIONS.LEVEL_D'
        }],
    'LANGUAGES': [
        {
            value: 'EN_US',
            name: 'English (us)',
            direction: 'ltr'
        },
        {
            value: 'EN_UK',
            name: 'English (uk)',
            direction: 'ltr'
        },
        {
            value: 'HE_IL',
            name: 'Hebrew',
            direction: 'rtl'
        },
        {
            value: 'DE_DE',
            name: 'German',
            direction: 'ltr'
        }
    ]
});

MetronicApp.constant('uiDatetimePickerConfig', {
    dateFormat: 'dd-MM-yyyy',
    defaultTime: '00:00:00',
    html5Types: {
        date: 'dd-MM-yyyy',
        'datetime-local': 'yyyy-MM-ddTHH:mm:ss.sss',
        'month': 'MM-yyyy'
    },
    initialPicker: 'date',
    reOpenDefault: false,
    enableDate: true,
    enableTime: false,
    buttonBar: {
        show: false,
        now: {
            show: true,
            text: 'Now'
        },
        today: {
            show: true,
            text: 'Today'
        },
        clear: {
            show: true,
            text: 'Clear'
        },
        date: {
            show: true,
            text: 'Date'
        },
        time: {
            show: true,
            text: 'Time'
        },
        close: {
            show: true,
            text: 'Close'
        }
    },
    closeOnDateSelection: true,
    closeOnTimeNow: true,
    appendToBody: false,
    altInputFormats: [],
    ngModelOptions: {},
    saveAs: false,
    readAs: false,
});

MetronicApp.config(['jwtOptionsProvider', '$httpProvider', (jwtOptionsProvider, $httpProvider) => {
    $httpProvider.defaults.withCredentials = true;

    jwtOptionsProvider.config({
        authPrefix: '',
        whiteListedDomains:'localhost',
        tokenGetter: () => localStorage.getItem('token'),
        unauthenticatedRedirector: ['$state', ($state) => {
            $state.go('login');
        }]
    });

    $httpProvider.interceptors.push('jwtInterceptor');
    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.interceptors.push('errorHandlerInterceptor');
}]);

MetronicApp.config(['$translateProvider', function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'assets/languages/',
        suffix: '.json'
    });
    /*
     EN_US("en-US"),
     EN_UK("en-GB"),
     HE_IL("he-IL"),
     DE_DE("de-DE");
     */
    const langMap = {
        'EN_US': 'en-US',
        'EN_UK': 'en-GB',
        'HI_IL': 'he-il',
        'DE_DE': 'de-de'
    };
    $translateProvider.useSanitizeValueStrategy(null);
    //$translateProvider.registerAvailableLanguageKeys(['en-US', 'en-GB', 'he-il', 'de-de'], langMap);
    $translateProvider.preferredLanguage('en-US');
    $translateProvider.fallbackLanguage('en-US');
}]);

MetronicApp.factory('settings', ['$rootScope', ($rootScope) => {
    // supported languages
    const settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: '../assets',
        globalPath: '../assets/global',
        layoutPath: '../assets/layouts/layout',
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', ($scope) => {
    $scope.$on('$viewContentLoaded', () => {
        //App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
    });
}]);

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', ($scope) => {
    $scope.$on('$includeContentLoaded', () => {
        Layout.initHeader(); // init header
    });
}]);


MetronicApp.controller('SidebarController', ['$scope', 'userDataService', ($scope) => {
    $scope.$on('$includeContentLoaded', () => {
        Layout.initSidebar(); // init sidebar
    });
}]);

MetronicApp.controller('BackofficeController', ['userDataService', '$scope', '$state', 'CONFIG', '$translate', (userDataService, $scope, $state, CONFIG, $translate) => {
    $state.go(userDataService.currentUser.mainStateScreen);
    $scope.isCustomer = userDataService.isCustomer();
    $scope.isAdmin = userDataService.isAdmin();
    $scope.currentUser = userDataService.currentUser;

    _setDirection();
    const langMap = {
        'EN_US': 'en-US',
        'EN_UK': 'en-GB',
        'HE_IL': 'he-IL',
        'DE_DE': 'de-DE'
    };
    $translate.use(langMap[$scope.currentUser.language]);
    $scope.languages = CONFIG.LANGUAGES;
    $scope.chooseLanguage = () => {
        if (!langMap[$scope.currentUser.language]) {
            return;
        }
        $translate.use(langMap[$scope.currentUser.language]).then(()=> {
            _setDirection();
            userDataService.updateUserLanguage($scope.currentUser.language);
        });
    };

    function _setDirection() {
        $scope.settings.direction = CONFIG.LANGUAGES.filter((lang) => lang.value == userDataService.currentUser.language);
        if ($scope.settings.direction.length > 0) {
            $scope.settings.direction = $scope.settings.direction[0].direction;
        } else {
            $scope.settings.direction = 'rtl';
        }
    }

}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise('/backoffice');

    function isStateParams($stateParams, $q) {
        if ($stateParams.id.length === 0) {
            return $q.reject();
        }
    }

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'backoffice/views/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })
        .state('logout', {
            url: '/logout',
            controller: ['$state', '$q', 'userDataService', ($state) => {
                localStorage.removeItem('token');
                $state.go('login');
            }]
        })
        .state('backoffice', {
            url: '/backoffice',
            // abstract: true,
            templateUrl: '/backoffice/views/backoffice.html',
            controller: 'BackofficeController',
            controllerAs: 'vm',
            data: {
                requiresLogin: true
            },
            roles: [
                'ADMIN',
                'CUSTOMER'
            ],
            resolve: {
                setUserData: userDataService => userDataService.setUserData()
            }
        })
        // Dashboard
        .state('dashboard', {
            url: '/dashboard',
            abstract: true,
            parent: 'backoffice',
            templateUrl: 'backoffice/views/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'vm',
            resolve: {
                getStats: dashboardService => dashboardService.getStats()
            },
            roles: [
                'ADMIN',
                'CUSTOMER'
            ]
        })
        .state('customerList', {
            url: '/customerList',
            parent: 'dashboard',
            templateUrl: 'backoffice/views/customerList.html',
            controller: 'CustomerController',
            controllerAs: 'vm',
            resolve: {
                getCustomers: customersDataService => customersDataService.getCustomers()
            },
            roles: [
                'ADMIN'
            ]
        })
        .state('addNewCustomer', {
            url: '/addNewCustomer',
            parent: 'dashboard',
            templateUrl: 'backoffice/views/addNewCustomer.html',
            controller: 'CustomerController',
            controllerAs: 'vm',
            roles: [
                'ADMIN'
            ]
        })
        .state('editCustomer', {
            url: '/editCustomer/:id',
            parent: 'dashboard',
            templateUrl: 'backoffice/views/addNewCustomer.html',
            controller: 'CustomerController',
            controllerAs: 'vm',
            params: {
                id: null
            },
            resolve: {
                isStateParams,
                getCustomers: (customersDataService, $stateParams) => customersDataService.getCustomerByID($stateParams.id),
            },
            roles: [
                'ADMIN'
            ]
        })
        .state('addNewDriver', {
            url: '/addNewDriver',
            parent: 'dashboard',
            templateUrl: 'backoffice/views/addNewDriver.html',
            controller: 'DriversController',
            controllerAs: 'vm',
            roles: [
                'ADMIN',
                'CUSTOMER'
            ]
        })
        .state('editDriver', {
            url: '/editDriver/:id',
            parent: 'dashboard',
            templateUrl: 'backoffice/views/addNewDriver.html',
            controller: 'DriversController',
            controllerAs: 'vm',
            param: {
                id: null
            },
            resolve: {
                isStateParams,
                getDriverByID: (driversDataService, $stateParams, userDataService, setUserData) => {
                    return driversDataService.getDriverByID(userDataService.currentUser.id, $stateParams.id);
                }
            },
            roles: [
                'ADMIN',
                'CUSTOMER'
            ]
        })
        .state('driversList', {
            url: '/driversList/:id',
            parent: 'dashboard',
            templateUrl: 'backoffice/views/driversList.html',
            controller: 'DriversController',
            controllerAs: 'vm',
            params: {
                id: null
            },
            resolve: {
                getDrivers: (driversDataService, $stateParams, userDataService, customersDataService, setUserData) => {
                    if ($stateParams.id) {
                        return Promise.all([
                            customersDataService.getCustomerByID($stateParams.id),
                            driversDataService.getDrivers($stateParams.id)
                        ]);
                    } else {
                        return driversDataService.getDrivers(userDataService.currentUser.id);
                    }
                },
            },
            roles: [
                'ADMIN',
                'CUSTOMER'
            ]
        })
        .state('addDriversPhoneNumbers', {
            parent: 'dashboard',
            url: '/phoneNumbers',
            templateUrl: 'backoffice/views/phoneNumbers.html',
            controller: 'CustomerController',
            controllerAs: 'vm',
            roles: [
                'CUSTOMER',
                'ADMIN'
            ]
        })
        .state('preferences', {
            parent: 'dashboard',
            url: '/preferences',
            templateUrl: 'backoffice/views/preferences.html',
            controller: 'CustomerController',
            controllerAs: 'vm',
            roles: [
                'CUSTOMER',
                'ADMIN'
            ]
        })
        .state('activityLog', {
            parent: 'dashboard',
            url: '/activityLog/:id/:month/:year',
            templateUrl: 'backoffice/views/activityLog.html',
            controller: 'DriversController',
            controllerAs: 'vm',
            params: {
                id: null,
                month: null,
                year: null
            },
            resolve: {
                getLog: (driversDataService, $stateParams, userDataService, setUserData) =>
                    driversDataService.getLog(userDataService.currentUser.id, $stateParams.id, $stateParams.month, $stateParams.year)
            },
            roles: [
                'CUSTOMER',
                'ADMIN'
            ]
        })
        .state('beaconsList', {
            parent: 'dashboard',
            url: '/beaconsList/:id',
            templateUrl: 'backoffice/views/beaconsList.html',
            controller: 'BeaconsController',
            controllerAs: 'vm',
            params: {
                id: null
            },
            resolve: {
                getBeacons: (beaconsDataService, userDataService, $stateParams, setUserData) => {
                    if ($stateParams.id) {
                        return beaconsDataService.getBeacons($stateParams.id);
                    } else {
                        // return userDataService.setUserData().then(() => beaconsDataService.getBeacons(userDataService.currentUser.id));
                        return beaconsDataService.getBeacons(userDataService.currentUser.id);
                    }
                }

            },
            roles: [
                'ADMIN',
                'CUSTOMER'
            ]
        })
        .state('attachBeacon', {
            parent: 'dashboard',
            url: '/attachBeacon/:id',
            templateUrl: 'backoffice/views/attachBeacon.html',
            controller: 'BeaconsController',
            controllerAs: 'vm',
            resolve: {
                getBeacons: (beaconsDataService, userDataService, setUserData) =>
                    // userDataService.setUserData().then(() =>
                    beaconsDataService.getBeacons(userDataService.currentUser.id)
            },
            roles: [
                'ADMIN',
                'CUSTOMER'
            ]
        })
        .state('editBeacon', {
            parent: 'dashboard',
            url: '/attachBeacon/:id',
            templateUrl: 'backoffice/views/attachBeacon.html',
            controller: 'BeaconsController',
            controllerAs: 'vm',
            params: {
                id: null
            },
            roles: [
                'ADMIN',
                'CUSTOMER'
            ]
        });
}]);

/* Init global settings and run the app */
MetronicApp.run(['$rootScope', 'settings', '$state', 'authManager',
  '$http',
  ($rootScope, settings, $state, authManager) => {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view

    // check jwt on refresh
    authManager.checkAuthOnRefresh();
    authManager.redirectWhenUnauthenticated();

    $rootScope.$on('tokenHasExpired', () => $state.go('logout'));
}]);

