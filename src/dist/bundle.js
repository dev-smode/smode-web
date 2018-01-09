(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module('MetronicApp', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'angular-jwt', 'naif.base64', 'angularModalService', 'angular-ladda', 'angular-progress-button-styles', 'swangular', 'ui.bootstrap.datetimepicker', 'ngAnimate', 'pascalprecht.translate', 'vcRecaptcha']);

MetronicApp.constant('CONFIG', {
    // 'SERVER': 'http://192.168.0.26:8080',//DEV
    'SERVER': 'https://api.irehapp.com/api', //PROD
    'DRIVER_PERMISSIONS': [{
        type: 'LEVEL_A',
        value: 0,
        name: 'DRIVER_FORM.DRIVER_PERMISSIONS.LEVEL_A'
    }, {
        type: 'LEVEL_B',
        value: 1,
        name: 'DRIVER_FORM.DRIVER_PERMISSIONS.LEVEL_B'
    }, {
        type: 'LEVEL_C',
        value: 2,
        name: 'DRIVER_FORM.DRIVER_PERMISSIONS.LEVEL_C'
    }, {
        type: 'LEVEL_D',
        value: 3,
        name: 'DRIVER_FORM.DRIVER_PERMISSIONS.LEVEL_D'
    }],
    'LANGUAGES': [{
        value: 'EN_US',
        name: 'English (us)',
        direction: 'ltr'
    }, {
        value: 'EN_UK',
        name: 'English (uk)',
        direction: 'ltr'
    }, {
        value: 'HE_IL',
        name: 'Hebrew',
        direction: 'rtl'
    }, {
        value: 'DE_DE',
        name: 'German',
        direction: 'ltr'
    }]
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
    readAs: false
});

MetronicApp.config(['jwtOptionsProvider', '$httpProvider', function (jwtOptionsProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;

    jwtOptionsProvider.config({
        authPrefix: '',
        whiteListedDomains: 'localhost',
        tokenGetter: function tokenGetter() {
            return localStorage.getItem('token');
        },
        unauthenticatedRedirector: ['$state', function ($state) {
            $state.go('login');
        }]
    });

    $httpProvider.interceptors.push('jwtInterceptor');
    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.interceptors.push('errorHandlerInterceptor');
}]);

MetronicApp.config(['$translateProvider', function ($translateProvider) {
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
    var langMap = {
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

MetronicApp.factory('settings', ['$rootScope', function ($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: '../assets',
        globalPath: '../assets/global',
        layoutPath: '../assets/layouts/layout'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function ($scope) {
    $scope.$on('$viewContentLoaded', function () {
        //App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
    });
}]);

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initHeader(); // init header
    });
}]);

MetronicApp.controller('SidebarController', ['$scope', 'userDataService', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initSidebar(); // init sidebar
    });
}]);

MetronicApp.controller('BackofficeController', ['userDataService', '$scope', '$state', 'CONFIG', '$translate', function (userDataService, $scope, $state, CONFIG, $translate) {
    $state.go(userDataService.currentUser.mainStateScreen);
    $scope.isCustomer = userDataService.isCustomer();
    $scope.isAdmin = userDataService.isAdmin();
    $scope.currentUser = userDataService.currentUser;

    _setDirection();
    var langMap = {
        'EN_US': 'en-US',
        'EN_UK': 'en-GB',
        'HE_IL': 'he-IL',
        'DE_DE': 'de-DE'
    };
    $translate.use(langMap[$scope.currentUser.language]);
    $scope.languages = CONFIG.LANGUAGES;
    $scope.chooseLanguage = function () {
        if (!langMap[$scope.currentUser.language]) {
            return;
        }
        $translate.use(langMap[$scope.currentUser.language]).then(function () {
            _setDirection();
            userDataService.updateUserLanguage($scope.currentUser.language);
        });
    };

    function _setDirection() {
        $scope.settings.direction = CONFIG.LANGUAGES.filter(function (lang) {
            return lang.value == userDataService.currentUser.language;
        });
        if ($scope.settings.direction.length > 0) {
            $scope.settings.direction = $scope.settings.direction[0].direction;
        } else {
            $scope.settings.direction = 'rtl';
        }
    }
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise('/backoffice');

    function isStateParams($stateParams, $q) {
        if ($stateParams.id.length === 0) {
            return $q.reject();
        }
    }

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'backoffice/views/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
    }).state('logout', {
        url: '/logout',
        controller: ['$state', '$q', 'userDataService', function ($state) {
            localStorage.removeItem('token');
            $state.go('login');
        }]
    }).state('backoffice', {
        url: '/backoffice',
        // abstract: true,
        templateUrl: '/backoffice/views/backoffice.html',
        controller: 'BackofficeController',
        controllerAs: 'vm',
        data: {
            requiresLogin: true
        },
        roles: ['ADMIN', 'CUSTOMER'],
        resolve: {
            setUserData: function setUserData(userDataService) {
                return userDataService.setUserData();
            }
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
            getStats: function getStats(dashboardService) {
                return dashboardService.getStats();
            }
        },
        roles: ['ADMIN', 'CUSTOMER']
    }).state('customerList', {
        url: '/customerList',
        parent: 'dashboard',
        templateUrl: 'backoffice/views/customerList.html',
        controller: 'CustomerController',
        controllerAs: 'vm',
        resolve: {
            getCustomers: function getCustomers(customersDataService) {
                return customersDataService.getCustomers();
            }
        },
        roles: ['ADMIN']
    }).state('addNewCustomer', {
        url: '/addNewCustomer',
        parent: 'dashboard',
        templateUrl: 'backoffice/views/addNewCustomer.html',
        controller: 'CustomerController',
        controllerAs: 'vm',
        roles: ['ADMIN']
    }).state('editCustomer', {
        url: '/editCustomer/:id',
        parent: 'dashboard',
        templateUrl: 'backoffice/views/addNewCustomer.html',
        controller: 'CustomerController',
        controllerAs: 'vm',
        params: {
            id: null
        },
        resolve: {
            isStateParams: isStateParams,
            getCustomers: function getCustomers(customersDataService, $stateParams) {
                return customersDataService.getCustomerByID($stateParams.id);
            }
        },
        roles: ['ADMIN']
    }).state('addNewDriver', {
        url: '/addNewDriver',
        parent: 'dashboard',
        templateUrl: 'backoffice/views/addNewDriver.html',
        controller: 'DriversController',
        controllerAs: 'vm',
        roles: ['ADMIN', 'CUSTOMER']
    }).state('editDriver', {
        url: '/editDriver/:id',
        parent: 'dashboard',
        templateUrl: 'backoffice/views/addNewDriver.html',
        controller: 'DriversController',
        controllerAs: 'vm',
        param: {
            id: null
        },
        resolve: {
            isStateParams: isStateParams,
            getDriverByID: function getDriverByID(driversDataService, $stateParams, userDataService, setUserData) {
                return driversDataService.getDriverByID(userDataService.currentUser.id, $stateParams.id);
            }
        },
        roles: ['ADMIN', 'CUSTOMER']
    }).state('driversList', {
        url: '/driversList/:id',
        parent: 'dashboard',
        templateUrl: 'backoffice/views/driversList.html',
        controller: 'DriversController',
        controllerAs: 'vm',
        params: {
            id: null
        },
        resolve: {
            getDrivers: function getDrivers(driversDataService, $stateParams, userDataService, customersDataService, setUserData) {
                if ($stateParams.id) {
                    return Promise.all([customersDataService.getCustomerByID($stateParams.id), driversDataService.getDrivers($stateParams.id)]);
                } else {
                    return driversDataService.getDrivers(userDataService.currentUser.id);
                }
            }
        },
        roles: ['ADMIN', 'CUSTOMER']
    }).state('addDriversPhoneNumbers', {
        parent: 'dashboard',
        url: '/phoneNumbers',
        templateUrl: 'backoffice/views/phoneNumbers.html',
        controller: 'CustomerController',
        controllerAs: 'vm',
        roles: ['CUSTOMER', 'ADMIN']
    }).state('preferences', {
        parent: 'dashboard',
        url: '/preferences',
        templateUrl: 'backoffice/views/preferences.html',
        controller: 'CustomerController',
        controllerAs: 'vm',
        roles: ['CUSTOMER', 'ADMIN']
    }).state('activityLog', {
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
            getLog: function getLog(driversDataService, $stateParams, userDataService, setUserData) {
                return driversDataService.getLog(userDataService.currentUser.id, $stateParams.id, $stateParams.month, $stateParams.year);
            }
        },
        roles: ['CUSTOMER', 'ADMIN']
    }).state('beaconsList', {
        parent: 'dashboard',
        url: '/beaconsList/:id',
        templateUrl: 'backoffice/views/beaconsList.html',
        controller: 'BeaconsController',
        controllerAs: 'vm',
        params: {
            id: null
        },
        resolve: {
            getBeacons: function getBeacons(beaconsDataService, userDataService, $stateParams, setUserData) {
                if ($stateParams.id) {
                    return beaconsDataService.getBeacons($stateParams.id);
                } else {
                    // return userDataService.setUserData().then(() => beaconsDataService.getBeacons(userDataService.currentUser.id));
                    return beaconsDataService.getBeacons(userDataService.currentUser.id);
                }
            }

        },
        roles: ['ADMIN', 'CUSTOMER']
    }).state('attachBeacon', {
        parent: 'dashboard',
        url: '/attachBeacon/:id',
        templateUrl: 'backoffice/views/attachBeacon.html',
        controller: 'BeaconsController',
        controllerAs: 'vm',
        resolve: {
            getBeacons: function getBeacons(beaconsDataService, userDataService, setUserData) {
                return (
                    // userDataService.setUserData().then(() =>
                    beaconsDataService.getBeacons(userDataService.currentUser.id)
                );
            }
        },
        roles: ['ADMIN', 'CUSTOMER']
    }).state('editBeacon', {
        parent: 'dashboard',
        url: '/attachBeacon/:id',
        templateUrl: 'backoffice/views/attachBeacon.html',
        controller: 'BeaconsController',
        controllerAs: 'vm',
        params: {
            id: null
        },
        roles: ['ADMIN', 'CUSTOMER']
    });
}]);

/* Init global settings and run the app */
MetronicApp.run(['$rootScope', 'settings', '$state', 'authManager', '$http', function ($rootScope, settings, $state, authManager) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view

    // check jwt on refresh
    authManager.checkAuthOnRefresh();
    authManager.redirectWhenUnauthenticated();

    $rootScope.$on('tokenHasExpired', function () {
        return $state.go('logout');
    });
}]);

angular.module('MetronicApp').controller('BeaconsController', ['$scope', '$stateParams', 'beaconsDataService', 'userDataService', '$state', function ($scope, $stateParams, beaconsDataService, userDataService, $state) {
    var _this = this;

    this.beacons = beaconsDataService.beacons;
    this.currentPage = 0;

    if ($stateParams.id) {
        this.id = $stateParams.id;
    }

    this.attachBeacon = function () {
        beaconsDataService.attachBeacon(userDataService.currentUser.id, _this.beacon).then(function () {
            return $state.go('beaconsList');
        });
    };

    this.toggleSuspendBeacon = function (index) {
        var beacon = _this.beacons.content[index];
        beacon.active = !beacon.active;
        beaconsDataService.toggleBeacon(userDataService.currentUser.id, beacon);
    };

    //Build array with `totalPages` elements and return his indexes
    //Used for displaying the paginator
    this.totalPages = function () {
        return Array.apply(0, Array(_this.beacons.totalPages)).map(function (index) {
            return index;
        });
    };

    this.goToPage = function (pageNumber) {
        var id = $stateParams.id || userDataService.currentUser.id;
        beaconsDataService.getBeacons(id, pageNumber).then(function (result) {
            _this.beacons = result;
            _this.currentPage = pageNumber;
        });
    };

    this.isOpen = false;

    this.openCalendar = function (e) {
        e.preventDefault();
        e.stopPropagation();

        this.isOpen = true;
    };
}]);

/* 
    @Summary: Customer controller 
    @Description: in charge of all logic actions related to the Customers.
*/
angular.module('MetronicApp').controller('CustomerController', ['$scope', 'customersDataService', '$stateParams', 'userDataService', '$state', function ($scope, customersDataService, $stateParams, userDataService, $state) {
    var _this2 = this;

    this.editMode = false;
    this.customers = customersDataService.customers;
    this.emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ($stateParams.id) {
        this.editMode = true;
        this.showPasswordFields = false;
        this.customer = customersDataService.editingCustomer;
    } else {
        // new client mode
        this.showPasswordFields = true;
    }

    this.setPermissionModel = function (permissions) {
        if (!permissions) {
            return;
        }
        _this2.allowedPermissions = permissions;
        _this2.allowedPermission = {};
        _this2.allowedPermissions.forEach(function (permission) {
            _this2.allowedPermission[permission.permission] = permission.allowed;
        });
    };

    this.setPermissionModel(userDataService.currentUser.permissions);

    this.savePermissions = function () {
        var permissions = [];
        _.forEach(_this2.allowedPermission, function (allowed, permission) {
            var permissionObj = _.find(_this2.allowedPermissions, { permission: permission });
            if (permissionObj) {
                permissionObj.allowed = allowed;
                permissions.push(permissionObj);
            } else {
                permissions.push({ permission: permission, allowed: allowed });
            }
        });
        customersDataService.setPermissions(userDataService.currentUser.id, permissions).then(function (permissions) {
            _this2.setPermissionModel(permissions);
        });
    };

    this.addNewCustomer = function () {
        _this2.loading = true;
        if (_this2.editMode) {
            customersDataService.editCustomer(_this2.customer).then(function () {
                return $state.go('customerList');
            }).finally(function () {
                return _this2.loading = false;
            });
        } else {
            customersDataService.addNewCustomer(_this2.customer).then(function () {
                return $state.go('customerList');
            }).finally(function () {
                return _this2.loading = false;
            });
        }
    };

    this.driversPhoneNumbers = userDataService.currentUser.quickCallNumbers;

    this.saveNumbers = function () {
        // fitler out empty objects in the array
        var data = _this2.driversPhoneNumbers.filter(function (x) {
            return x.name.length > 0 && x.number.length > 0;
        });
        return customersDataService.saveQuickCallNumbers(userDataService.currentUser.id, { numbers: data });
    };

    this.removeNumber = function (index) {
        _this2.phoneNumbersError = false;
        _this2.driversPhoneNumbers = _this2.driversPhoneNumbers.filter(function (x) {
            return _this2.driversPhoneNumbers[index] !== x;
        });
    };

    this.addNewNumber = function () {
        if (_this2.driversPhoneNumbers.length < 12) {
            _this2.driversPhoneNumbers.push({ name: '', number: '' });
        } else {
            _this2.phoneNumbersError = true;
        }
    };

    this.toggleSuspendCustomer = function () {
        _this2.customer.active = !_this2.customer.active;
        customersDataService.suspendCustomer(_this2.customer);
    };

    this.togglePasswordFields = function () {
        _this2.showPasswordFields = !_this2.showPasswordFields;
    };
}]);

/* 
    @Summary: Dashboard controller 
    @Description: in charge of all logic actions related to the Dashboard and every child state of the dashboard.
*/

angular.module('MetronicApp').controller('DashboardController', ['$scope', 'dashboardService', function ($scope, dashboardService) {
    this.stats = dashboardService.stats;
}]);
/* 
    @Summary: Drivers controller 
    @Description: in charge of all logic actions related to Drivers, 
    such as adding new drivers and display drivers list.
*/

angular.module('MetronicApp').controller('DriversController', ['$scope', '$stateParams', 'driversDataService', '$state', 'userDataService', 'customersDataService', 'CONFIG', function ($scope, $stateParams, driversDataService, $state, userDataService, customersDataService, CONFIG) {
    var _this3 = this;

    this.editMode = false;
    this.drivers = driversDataService.drivers;
    this.permissions = CONFIG.DRIVER_PERMISSIONS;
    this.searchQuery = '';
    this.currentPage = 0;

    /** 
     * we can have a $stateParams.id in 2 cases:
     * editing a driver or getting list of drivers per specific customer (as superadmin)  
     */
    if ($stateParams.id) {
        this.customer = customersDataService.editingCustomer; // we're displaying the list of drivers for a specific customer.
        this.id = $stateParams.id;
        if ($state.current.name === 'editDriver') {
            this.editMode = true;
            this.driver = driversDataService.editingDriver;
        }
    } else {
        // new driver mode
        this.mode = 'הוסף נהג חדש';
    }

    this.addNewDriver = function () {
        _this3.loading = true;
        if (_this3.editMode) {
            driversDataService.editDriver(userDataService.currentUser.id, _this3.driver).then(function () {
                _this3.loading = false;
                $state.go('driversList');
            });
        } else {
            driversDataService.addNewDriver(userDataService.currentUser.id, _this3.driver).then(function () {
                _this3.loading = false;
                $state.go('driversList');
            });
        }
    };

    this.goToEditCustomer = function () {
        $state.go('editCustomer', { id: _this3.customer.id });
    };

    this.viewLog = function () {
        $state.go('activityLog', {
            id: _this3.driver.id,
            month: new Date().getMonth(),
            year: new Date().getFullYear()
        });
    };

    this.toggleSuspendDriver = function () {
        _this3.driver.active = !_this3.driver.active;
        driversDataService.suspendDriver(userDataService.currentUser.id, _this3.driver);
    };

    this.goTo = function (index) {
        if (!$scope.isAdmin) {
            $state.go('editDriver', {
                id: this.drivers.content[index].id
            });
        }
    };

    /**
     * @TODO - move to helper
     */
    this.totalPages = function () {
        return Array.apply(0, Array(_this3.drivers.totalPages)).map(function (index) {
            return index;
        });
    };

    this.goToPage = function (pageNumber) {
        /**
         * define which id to use for API
         * if we're looking at a list of drivers as a customer - we need our own id
         * if we're looking at a list of drivers as a super admin for specific customer - we need the customer's id
         */
        var id = $stateParams.id || userDataService.currentUser.id;
        driversDataService.getDrivers(id, pageNumber).then(function (result) {
            _this3.drivers = result;
            _this3.currentPage = pageNumber;
        });
    };

    this.search = function () {
        var id = $stateParams.id || userDataService.currentUser.id;
        driversDataService.search(id, _this3.searchQuery).then(function (results) {
            _this3.drivers = results;
        });
    };
}]);

/* 
    @Summary: Login controller 
    @Description: in charge of all logic actions related to Login
*/
angular.module('MetronicApp').controller('LoginController', ['$state', 'authService', 'userDataService', function ($state, authService, userDataService) {
    var _this4 = this;

    this.submit = function (isValid) {
        if (isValid) {
            var user = {
                password: _this4.password,
                email: _this4.email,
                recaptchaResponse: _this4.recaptchaResponse
            };

            authService.login(user).then(function () {
                return userDataService.setUserData();
            }).then(function () {
                $state.go(userDataService.currentUser.mainStateScreen);
            });
        }
    };
}]);

/* 
    @Summary: Modal controller 
    @Description: in charge of all logic actions related to Modal
*/

angular.module('MetronicApp').controller('ModalController', ['close', function (close) {
    this.close = function (result) {
        // close, but give 500ms for bootstrap to animate
        close(result, 500);
    };
}]);
angular.module('MetronicApp').directive('confirmPassword', confirmPasswordConfig);

function confirmPasswordConfig() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            otherModelValue: '=compareTo'
        },
        link: function link(scope, element, attributes, ngModel) {
            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue === scope.otherModelValue;
            };

            scope.$watch('otherModelValue', function () {
                ngModel.$validate();
            });
        }
    };
}
/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
angular.module('MetronicApp').directive('ngSpinnerBar', ['$rootScope', '$state', function ($rootScope) {
    return {
        link: function link(scope, element) {
            // by defult hide the spinner bar
            element.addClass('hide'); // hide spinner bar by default

            // display the spinner bar whenever the route changes(the content part started loading)
            $rootScope.$on('$stateChangeStart', function () {
                element.removeClass('hide'); // show spinner bar
            });

            // hide the spinner bar on rounte change success(after the content loaded)
            $rootScope.$on('$stateChangeSuccess', function (event) {
                element.addClass('hide'); // hide spinner bar
                $('body').removeClass('page-on-load'); // remove page loading indicator
                Layout.setAngularJsSidebarMenuActiveLink('match', null, event.currentScope.$state); // activate selected link in the sidebar menu

                // auto scorll to page top
                setTimeout(function () {
                    App.scrollTop(); // scroll to the top on content load
                }, $rootScope.settings.layout.pageAutoScrollOnLoad);
            });

            // handle errors
            $rootScope.$on('$stateNotFound', function () {
                element.addClass('hide'); // hide spinner bar
            });

            // handle errors
            $rootScope.$on('$stateChangeError', function () {
                element.addClass('hide'); // hide spinner bar
            });
        }
    };
}]);

// Handle global LINK click
angular.module('MetronicApp').directive('a', function () {
    return {
        restrict: 'E',
        link: function link(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function (e) {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
});

// Handle Dropdown Hover Plugin Integration
angular.module('MetronicApp').directive('dropdownMenuHover', function () {
    return {
        link: function link(scope, elem) {
            elem.dropdownHover();
        }
    };
});
/* 
    @Summary: Authentication service 
    @Description: in charge of API requests and data related to user authentication.
*/

angular.module('MetronicApp').service('authService', ['$http', 'CONFIG', 'swangular', 'errorHandlerService', function ($http, CONFIG, swangular, errorHandlerService) {

    var server = CONFIG.SERVER;

    function login(credentials) {
        return $http.post(server + '/authenticate', credentials).then(function (result) {
            var token = result.headers().authorization;
            return localStorage.setItem('token', token);
        }).catch(function (err) {
            if (err.status === 401) {
                swangular.swal('פרטי ההתחברות שגויים', 'אנא בדוק את הנתונים שהזנת.', 'info');
                return Promise.reject(err);
            } else {
                errorHandlerService.handle(err);
            }
        });
    }

    function checkCurrentUser() {
        var token = localStorage.getItem('token');
        if (token) {
            return $http.get(server + '/users/current');
        } else return Promise.reject();
    }

    return {
        login: login,
        checkCurrentUser: checkCurrentUser
    };
}]);

angular.module('MetronicApp').factory('authInterceptor', function () {
    return {
        request: function request(config) {
            var token = localStorage.getItem('token');
            config.headers = config.headers || {};
            if (token) config.headers.Authorization = token;
            return config;
        },
        response: function response(res) {
            var newToken = res.headers().authorization;
            var currentToken = localStorage.getItem('token');

            if (newToken && newToken !== currentToken) {
                localStorage.setItem('token', newToken);
            }
            return res;
        }
    };
});

/* 
    @Summary: Beacons Data Service 
    @Description: In charge of API requests and data related the beacons
*/

angular.module('MetronicApp').service('beaconsDataService', ['$q', '$http', 'CONFIG', '$injector', function ($q, $http, CONFIG, $injector) {
    var server = CONFIG.SERVER;
    var swangular = $injector.get('swangular'); // avoid circular dependency

    function getBeacons(id) {
        var _this5 = this;

        var pageNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var params = '?page=' + pageNumber;
        return $http.get(server + '/customers/' + id + '/beacons' + params).then(function (res) {
            _this5.beacons = res.data;
            _this5.beacons.content = _this5.beacons.content.map(function (obj) {
                obj.lastActivity = moment.utc(obj.lastActivity).calendar();
                if (obj.lastActivity === 'Invalid date') {
                    obj.lastActivity = null;
                }
                return obj;
            });
            return res.data;
        });
    }

    function attachBeacon(customerId, _ref) {
        var serial = _ref.serial,
            uuid = _ref.uuid,
            licensePlateNumber = _ref.licensePlateNumber,
            expiryDate = _ref.expiryDate;

        return $http.post(server + '/customers/' + customerId + '/beacons', { serial: serial, uuid: uuid, licensePlateNumber: licensePlateNumber, expiryDate: expiryDate }).then(function (res) {
            return res.data;
        }).catch(function (err) {
            if (err.status === 409) {
                swangular.open({
                    htmlTemplate: 'backoffice/tpl/sensor-409.html',
                    showLoaderOnConfirm: true,
                    type: 'error',
                    controller: function controller() {}
                });
            }
        });
    }

    function toggleBeacon(customerId, _ref2) {
        var id = _ref2.id,
            active = _ref2.active;

        return $http.patch(server + '/customers/' + customerId + '/beacons/' + id + '/active', { active: active }).then(function (res) {
            return res.data;
        });
    }

    return {
        getBeacons: getBeacons,
        attachBeacon: attachBeacon,
        toggleBeacon: toggleBeacon
    };
}]);

/* 
    @Summary: Customers Data Service 
    @Description: In charge of API requests and data related the customers
*/

angular.module('MetronicApp').service('customersDataService', ['$http', 'CONFIG', 'swangular', function ($http, CONFIG, swangular) {

    var server = CONFIG.SERVER;

    function mapCustomers(data) {
        return data.map(function (item) {
            item.active ? item.status = 'CUSTOMER_LIST.ACTIVE' : item.status = 'CUSTOMER_LIST.NOT_ACTIVE';
            return item;
        });
    }

    function getCustomers() {
        var _this6 = this;

        return $http.get(server + '/customers').then(function (result) {
            _this6.customers = mapCustomers(result.data);
            return result.data;
        });
    }

    function addNewCustomer(newCustomer) {
        if (newCustomer.companyLogo) {
            newCustomer.companyLogo = newCustomer.companyLogo.base64;
        }
        return $http.post(server + '/customers', newCustomer).then(function (result) {
            return result;
        }).catch(function (err) {
            if (err.status === 409) {
                swangular.open({
                    htmlTemplate: 'backoffice/tpl/customer-409.html',
                    showLoaderOnConfirm: true,
                    type: 'warning',
                    controller: function controller() {}
                });
                return Promise.reject(err);
            }
        });
    }

    function editCustomer(_ref3) {
        var companyName = _ref3.companyName,
            displayName = _ref3.displayName,
            password = _ref3.password,
            email = _ref3.email,
            id = _ref3.id,
            active = _ref3.active,
            companyLogo = _ref3.companyLogo,
            companyRole = _ref3.companyRole,
            phoneNumber = _ref3.phoneNumber;

        if (companyLogo) {
            companyLogo = companyLogo.base64;
        }
        return $http.patch(server + '/customers/' + id, { companyName: companyName, displayName: displayName, password: password, email: email, active: active, companyLogo: companyLogo, companyRole: companyRole, phoneNumber: phoneNumber }).then(function (result) {
            return result;
        });
    }

    function getCustomerByID(id) {
        var _this7 = this;

        return $http.get(server + '/customers/' + id).then(function (result) {
            _this7.editingCustomer = result.data;
            return result.data;
        });
    }

    function saveQuickCallNumbers(id, data) {
        return $http.patch(server + '/customers/' + id + '/numbers', data).then(function (res) {
            return res.data;
        });
    }

    function suspendCustomer(_ref4) {
        var id = _ref4.id,
            active = _ref4.active;

        return $http.patch(server + '/customers/' + id + '/active', { active: active }).then(function (res) {
            return res.data;
        });
    }

    function setPermissions(id, permissions) {
        return $http.patch(server + '/customers/' + id + '/permissions', { permissions: permissions }).then(function (res) {
            return res.data;
        });
    }

    return {
        getCustomers: getCustomers,
        addNewCustomer: addNewCustomer,
        editCustomer: editCustomer,
        getCustomerByID: getCustomerByID,
        saveQuickCallNumbers: saveQuickCallNumbers,
        suspendCustomer: suspendCustomer,
        setPermissions: setPermissions
    };
}]);
/* 
    @Summary: Dashboard Data Service 
    @Description: In charge of Dashboard data such as Statistics
*/

angular.module('MetronicApp').service('dashboardService', ['$http', 'CONFIG', function ($http, CONFIG) {
    var server = CONFIG.SERVER;

    function getStats() {
        var _this8 = this;

        return $http.get(server + '/admin/statistics').then(function (result) {
            _this8.stats = result.data;
            _this8.stats.yesterdayActivitySeconds = moment().hours(0).minutes(0).seconds(_this8.stats.yesterdayActivitySeconds).format('HH:mm:ss');
            return _this8.stats;
        });
    }

    return {
        getStats: getStats
    };
}]);

/* 
    @Summary: Drivers Data Service 
    @Description: In charge of API requests and data related the drivers
*/

// import moment from 'moment';

angular.module('MetronicApp').service('driversDataService', ['$http', 'CONFIG', function ($http, CONFIG) {

    var server = CONFIG.SERVER;

    function mapDrivers(data) {
        data.content.map(function (item) {
            item.activeHours = moment().hours(0).minutes(0).seconds(item.yesterdayActivitySeconds).format('HH:mm:ss');
            return item;
        });

        return data;
    }

    function getDrivers(id) {
        var _this9 = this;

        var pageNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var params = '?page=' + pageNumber;
        return $http.get(server + '/customers/' + id + '/drivers' + params).then(function (result) {
            _this9.drivers = mapDrivers(result.data);
            return _this9.drivers;
        });
    }

    function getDriverByID(customerId, id) {
        var _this10 = this;

        return $http.get(server + '/customers/' + customerId + '/drivers/' + id).then(function (result) {
            _this10.editingDriver = result.data;
            _this10.editingDriver.permissionLevel = CONFIG.DRIVER_PERMISSIONS.map(function (obj) {
                return obj.type;
            }).indexOf(_this10.editingDriver.permissionLevel);
            return result.data;
        });
    }

    function addNewDriver(customerId, _ref5) {
        var displayName = _ref5.displayName,
            idNumber = _ref5.idNumber,
            phoneNumber = _ref5.phoneNumber,
            permissionLevel = _ref5.permissionLevel,
            licenseNumber = _ref5.licenseNumber;

        return $http.post(server + '/customers/' + customerId + '/drivers', {
            displayName: displayName,
            idNumber: idNumber,
            phoneNumber: phoneNumber,
            permissionLevel: permissionLevel,
            licenseNumber: licenseNumber
        });
    }

    function editDriver(customerId, _ref6) {
        var displayName = _ref6.displayName,
            idNumber = _ref6.idNumber,
            phoneNumber = _ref6.phoneNumber,
            id = _ref6.id,
            permissionLevel = _ref6.permissionLevel,
            active = _ref6.active,
            licenseNumber = _ref6.licenseNumber;

        return $http.patch(server + '/customers/' + customerId + '/drivers/' + id, {
            displayName: displayName,
            idNumber: idNumber,
            phoneNumber: phoneNumber,
            permissionLevel: permissionLevel,
            active: active,
            licenseNumber: licenseNumber
        });
    }

    function suspendDriver(customerId, _ref7) {
        var id = _ref7.id,
            active = _ref7.active;

        return $http.patch(server + '/customers/' + customerId + '/drivers/' + id + '/active', { active: active }).then(function (result) {
            return result;
        });
    }

    function getLog(cusotmerId, id, month, year) {
        var _this11 = this;

        function toSeconds(time) {
            var parts = time.split(':');
            return +parts[0] * 60 * 60 + +parts[1] * 60 + +parts[2];
        }

        var date = moment().day(0).month(month).year(year).format('YYYY/MM/DD');

        return $http.get(server + '/customers/' + cusotmerId + '/drivers/' + id + '/activity/?date=' + date).then(function (res) {
            _this11.log = res.data.filter(function (obj) {
                return obj.endedAt;
            }).map(function (obj) {
                obj.date = '' + moment(obj.startedAt).format('DD/MM/YYYY');
                obj.startedAt = '' + moment.utc(obj.startedAt).format('DD/MM/YYYY HH:mm:ss');
                obj.endedAt = '' + moment.utc(obj.endedAt).format('DD/MM/YYYY HH:mm:ss');

                if (obj.driverStatusLogs && obj.driverStatusLogs.length) {
                    obj.driverStatusLogs = obj.driverStatusLogs.map(function (status) {
                        status.date = '' + moment.utc(status.startedAt).format('DD/MM/YYYY');
                        status.startedAt = '' + moment.utc(status.startedAt).calendar();
                        status.endedAt = '' + moment.utc(status.endedAt).calendar();
                        return status;
                    });
                }
                return obj;
            });

            _this11.totalActivity = _this11.log.map(function (obj) {
                if (obj.totalTime) {
                    return toSeconds(obj.totalTime);
                }

                return obj;
            }).reduce(function (a, b) {
                return a + b;
            }, 0);

            _this11.totalActivity = moment().hours(0).minutes(0).seconds(_this11.totalActivity).format('HH:mm:ss');
            return res.data;
        });
    }

    function search(id, query) {
        return $http.get(server + '/customers/' + id + '/drivers' + '/?q=' + query).then(function (res) {
            return mapDrivers(res.data);
        });
    }

    return {
        getDrivers: getDrivers,
        addNewDriver: addNewDriver,
        editDriver: editDriver,
        suspendDriver: suspendDriver,
        getLog: getLog,
        getDriverByID: getDriverByID,
        search: search
    };
}]);

/* 
    @Summary: Error Handling Interceptor 
    @Description: In charge of intercepting responses and determine if their an error.
*/

angular.module('MetronicApp').factory('errorHandlerInterceptor', ['errorHandlerService', function (errorHandlerService) {
    return {
        responseError: function responseError(err) {
            return errorHandlerService.handle(err).then(function () {
                return Promise.resolve(err);
            }).catch(function () {
                return Promise.reject(err);
            });
        }
    };
}]);

angular.module('MetronicApp').service('errorHandlerService', ['$injector', function ($injector) {

    function handle(err) {
        var swangular = $injector.get('swangular'); // avoid circular dependency
        var $state = $injector.get('$state');

        return new Promise(function (resolve, reject) {
            switch (err.status) {

                case 401:
                    reject('unauthorized');
                    break;

                case 403:
                    swangular.open({
                        htmlTemplate: 'backoffice/tpl/403.html',
                        showLoaderOnConfirm: true,
                        type: 'error',
                        controller: function controller() {}
                    });
                    $state.go('login');
                    break;

                case 404:
                    swangular.open({
                        htmlTemplate: '/backoffice/tpl/404.html',
                        showLoaderOnConfirm: true,
                        type: 'error',
                        controller: function controller() {}
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
                        controller: function controller() {}
                    });
                    break;

                default:
                    resolve(err);
                    break;
            }
        });
    }

    return {
        handle: handle
    };
}]);
/* 
    @Summary: User Data Service 
    @Description: In charge of API requests and data related the user that is now logged in to the app.
*/

angular.module('MetronicApp').service('userDataService', ['authService', '$state', '$http', 'CONFIG', function (authService, $state, $http, CONFIG) {
    var server = CONFIG.SERVER;

    function setUserData() {
        var _this12 = this;

        return authService.checkCurrentUser().then(function (res) {
            _this12.currentUser = {
                'mainStateScreen': 'login'
            };
            Object.assign(_this12.currentUser, res.data);

            var _isAdmin = isAdmin.bind(_this12);
            if (_isAdmin()) {
                _this12.currentUser.mainStateScreen = 'customerList';
            } else {
                _this12.currentUser.mainStateScreen = 'driversList';
            }
        }).catch(function () {
            return $state.go('login');
        });
    }

    function isCustomer() {
        return this.currentUser.roles.includes('CUSTOMER');
    }

    function isAdmin() {
        return this.currentUser.roles.includes('ADMIN');
    }

    function updateUserLanguage(lang) {
        return $http.patch(server + '/users/current', { language: lang });
    }

    return {
        setUserData: setUserData,
        isCustomer: isCustomer,
        isAdmin: isAdmin,
        updateUserLanguage: updateUserLanguage
    };
}]);

angular.module('MetronicApp').directive('activityLog', activityLogConfig);

function activityLogConfig() {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'backoffice/js/directives/activityLog/activityLog.html',
        controller: ['$state', '$stateParams', 'driversDataService', activityLogController],
        controllerAs: 'vm'
    };
}

function activityLogController($state, $stateParams, driversDataService) {
    var months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

    $stateParams.month = Number($stateParams.month);
    $stateParams.year = Number($stateParams.year);

    this.log = driversDataService.log;
    this.totalActivity = driversDataService.totalActivity;

    this.currentDate = months[$stateParams.month] + ' ' + $stateParams.year;
    this.isFutureDate = $stateParams.month >= new Date().getMonth() && $stateParams.year >= new Date().getFullYear();
    this.isPastDate = $stateParams.year <= 2015;
    this.expandedRows = {};

    this.next = function () {
        var d = new Date($stateParams.year, $stateParams.month + 1, 1);
        $state.go('activityLog', { month: d.getMonth(), year: d.getFullYear() });
    };

    this.prev = function () {
        var d = new Date($stateParams.year, $stateParams.month - 1, 1);
        $state.go('activityLog', { month: d.getMonth(), year: d.getFullYear() });
    };

    this.expand = function (log) {
        log.expanded = !log.expanded;
    };
}

angular.module('MetronicApp').directive('appDatatable', appDatatableConfig);

function appDatatableConfig() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=',
            tabletitle: '=',
            thtitles: '=',
            tddata: '=',
            goto: '=',
            type: '=',
            pagination: '=',
            userId: '=',
            translateData: '='
        },
        templateUrl: 'backoffice/js/directives/appDatatable/appDatatable.html',
        controller: ['$scope', '$state', '$timeout', 'driversDataService', 'beaconsDataService', appDatatableController],
        controllerAs: 'vm'
    };
}

function appDatatableController($scope, $state, $timeout, driversDataService, beaconsDataService) {
    var _this13 = this;

    // Put properties on the controller
    this.data = $scope.data;
    this.content = this.data.content || this.data;
    this.thtitles = $scope.thtitles;
    this.tddata = $scope.tddata;
    this.tabletitle = $scope.tabletitle;
    this.translateData = $scope.translateData;
    var that = this;

    $scope.$watch('tabletitle', function () {
        that.tabletitle = $scope.tabletitle;
    });

    $scope.$watch('thtitles', function () {
        that.thtitles = $scope.thtitles;
    });

    /**
     * @TODO move to helper
     */
    this.totalPages = function () {
        return Array.apply(0, Array(_this13.data.totalPages)).map(function (index) {
            return index;
        });
    };

    this.goTo = function (index) {
        if ($scope.goto) {
            $state.go($scope.goto.state, _defineProperty({}, $scope.goto.key, this.content[index][$scope.goto.key]));
        }
    };

    this.goToPage = function (pageNumber) {
        switch ($scope.type) {
            case 'drivers':
                driversDataService.getDrivers($scope.userId, pageNumber).then(function (result) {
                    _this13.data = result;
                });
                break;

            case 'beacons':
                beaconsDataService.getBeacons($scope.userId, pageNumber).then(function (result) {
                    _this13.data = result;
                });
                break;
        }
    };
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQTs7OztBQUtBO0FBQ0EsSUFBTSxjQUFjLFFBQVEsTUFBUixDQUFlLGFBQWYsRUFBOEIsQ0FDOUMsV0FEOEMsRUFFOUMsY0FGOEMsRUFHOUMsWUFIOEMsRUFJOUMsYUFKOEMsRUFLOUMsYUFMOEMsRUFNOUMscUJBTjhDLEVBTzlDLGVBUDhDLEVBUTlDLGdDQVI4QyxFQVM5QyxXQVQ4QyxFQVU5Qyw2QkFWOEMsRUFXOUMsV0FYOEMsRUFZOUMsd0JBWjhDLEVBYTlDLGFBYjhDLENBQTlCLENBQXBCOztBQWdCQSxZQUFZLFFBQVosQ0FBcUIsUUFBckIsRUFBK0I7QUFDM0I7QUFDQSxjQUFVLDBCQUZpQixFQUVVO0FBQ3JDLDBCQUFzQixDQUNsQjtBQUNJLGNBQU0sU0FEVjtBQUVJLGVBQU8sQ0FGWDtBQUdJLGNBQU07QUFIVixLQURrQixFQU1sQjtBQUNJLGNBQU0sU0FEVjtBQUVJLGVBQU8sQ0FGWDtBQUdJLGNBQU07QUFIVixLQU5rQixFQVdsQjtBQUNJLGNBQU0sU0FEVjtBQUVJLGVBQU8sQ0FGWDtBQUdJLGNBQU07QUFIVixLQVhrQixFQWdCbEI7QUFDSSxjQUFNLFNBRFY7QUFFSSxlQUFPLENBRlg7QUFHSSxjQUFNO0FBSFYsS0FoQmtCLENBSEs7QUF3QjNCLGlCQUFhLENBQ1Q7QUFDSSxlQUFPLE9BRFg7QUFFSSxjQUFNLGNBRlY7QUFHSSxtQkFBVztBQUhmLEtBRFMsRUFNVDtBQUNJLGVBQU8sT0FEWDtBQUVJLGNBQU0sY0FGVjtBQUdJLG1CQUFXO0FBSGYsS0FOUyxFQVdUO0FBQ0ksZUFBTyxPQURYO0FBRUksY0FBTSxRQUZWO0FBR0ksbUJBQVc7QUFIZixLQVhTLEVBZ0JUO0FBQ0ksZUFBTyxPQURYO0FBRUksY0FBTSxRQUZWO0FBR0ksbUJBQVc7QUFIZixLQWhCUztBQXhCYyxDQUEvQjs7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U0FGRixDQUFQO0FBR0gsS0FKRDs7QUFNQSxTQUFLLElBQUwsR0FBWSxVQUFTLEtBQVQsRUFBZ0I7QUFDeEIsWUFBSSxPQUFPLElBQVgsRUFBaUI7QUFDYixtQkFBTyxFQUFQLENBQVUsT0FBTyxJQUFQLENBQVksS0FBdEIsc0JBQ0ssT0FBTyxJQUFQLENBQVksR0FEakIsRUFDdUIsS0FBSyxPQUFMLENBQWEsS0FBYixFQUFvQixPQUFPLElBQVAsQ0FBWSxHQUFoQyxDQUR2QjtBQUdIO0FBQ0osS0FORDs7QUFRQSxTQUFLLFFBQUwsR0FBZ0IsVUFBQyxVQUFELEVBQWdCO0FBQzVCLGdCQUFRLE9BQU8sSUFBZjtBQUNJLGlCQUFLLFNBQUw7QUFDUSxtQ0FBbUIsVUFBbkIsQ0FBOEIsT0FBTyxNQUFyQyxFQUE2QyxVQUE3QyxFQUF5RCxJQUF6RCxDQUE4RCxVQUFDLE1BQUQsRUFBWTtBQUN0RSw0QkFBSyxJQUFMLEdBQVksTUFBWjtBQUNILGlCQUZEO0FBR0o7O0FBRUosaUJBQUssU0FBTDtBQUNRLG1DQUFtQixVQUFuQixDQUE4QixPQUFPLE1BQXJDLEVBQTZDLFVBQTdDLEVBQXlELElBQXpELENBQThELFVBQUMsTUFBRCxFQUFZO0FBQ3RFLDRCQUFLLElBQUwsR0FBWSxNQUFaO0FBQ0gsaUJBRkQ7QUFHSjtBQVhSO0FBYUgsS0FkRDtBQWVIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKipcclxuTWV0cm9uaWMgQW5ndWxhckpTIEFwcCBNYWluIFNjcmlwdFxyXG4qKiovXHJcblxyXG5cclxuLyogTWV0cm9uaWMgQXBwICovXHJcbmNvbnN0IE1ldHJvbmljQXBwID0gYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJywgW1xyXG4gICAgJ3VpLnJvdXRlcicsXHJcbiAgICAndWkuYm9vdHN0cmFwJyxcclxuICAgICduZ1Nhbml0aXplJyxcclxuICAgICdhbmd1bGFyLWp3dCcsXHJcbiAgICAnbmFpZi5iYXNlNjQnLFxyXG4gICAgJ2FuZ3VsYXJNb2RhbFNlcnZpY2UnLFxyXG4gICAgJ2FuZ3VsYXItbGFkZGEnLFxyXG4gICAgJ2FuZ3VsYXItcHJvZ3Jlc3MtYnV0dG9uLXN0eWxlcycsXHJcbiAgICAnc3dhbmd1bGFyJyxcclxuICAgICd1aS5ib290c3RyYXAuZGF0ZXRpbWVwaWNrZXInLFxyXG4gICAgJ25nQW5pbWF0ZScsXHJcbiAgICAncGFzY2FscHJlY2h0LnRyYW5zbGF0ZScsXHJcbiAgICAndmNSZWNhcHRjaGEnXHJcbl0pO1xyXG5cclxuTWV0cm9uaWNBcHAuY29uc3RhbnQoJ0NPTkZJRycsIHtcclxuICAgIC8vICdTRVJWRVInOiAnaHR0cDovLzE5Mi4xNjguMC4yNjo4MDgwJywvL0RFVlxyXG4gICAgJ1NFUlZFUic6ICdodHRwOi8vNTIuMzUuMTk5LjIwMC9hcGknLC8vUFJPRFxyXG4gICAgJ0RSSVZFUl9QRVJNSVNTSU9OUyc6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdMRVZFTF9BJyxcclxuICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgICAgIG5hbWU6ICdEUklWRVJfRk9STS5EUklWRVJfUEVSTUlTU0lPTlMuTEVWRUxfQSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ0xFVkVMX0InLFxyXG4gICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgbmFtZTogJ0RSSVZFUl9GT1JNLkRSSVZFUl9QRVJNSVNTSU9OUy5MRVZFTF9CJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAnTEVWRUxfQycsXHJcbiAgICAgICAgICAgIHZhbHVlOiAyLFxyXG4gICAgICAgICAgICBuYW1lOiAnRFJJVkVSX0ZPUk0uRFJJVkVSX1BFUk1JU1NJT05TLkxFVkVMX0MnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdMRVZFTF9EJyxcclxuICAgICAgICAgICAgdmFsdWU6IDMsXHJcbiAgICAgICAgICAgIG5hbWU6ICdEUklWRVJfRk9STS5EUklWRVJfUEVSTUlTU0lPTlMuTEVWRUxfRCdcclxuICAgICAgICB9XSxcclxuICAgICdMQU5HVUFHRVMnOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTogJ0VOX1VTJyxcclxuICAgICAgICAgICAgbmFtZTogJ0VuZ2xpc2ggKHVzKScsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2x0cidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWU6ICdFTl9VSycsXHJcbiAgICAgICAgICAgIG5hbWU6ICdFbmdsaXNoICh1ayknLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb246ICdsdHInXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlOiAnSEVfSUwnLFxyXG4gICAgICAgICAgICBuYW1lOiAnSGVicmV3JyxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiAncnRsJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTogJ0RFX0RFJyxcclxuICAgICAgICAgICAgbmFtZTogJ0dlcm1hbicsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2x0cidcclxuICAgICAgICB9XHJcbiAgICBdXHJcbn0pO1xyXG5cclxuTWV0cm9uaWNBcHAuY29uc3RhbnQoJ3VpRGF0ZXRpbWVQaWNrZXJDb25maWcnLCB7XHJcbiAgICBkYXRlRm9ybWF0OiAnZGQtTU0teXl5eScsXHJcbiAgICBkZWZhdWx0VGltZTogJzAwOjAwOjAwJyxcclxuICAgIGh0bWw1VHlwZXM6IHtcclxuICAgICAgICBkYXRlOiAnZGQtTU0teXl5eScsXHJcbiAgICAgICAgJ2RhdGV0aW1lLWxvY2FsJzogJ3l5eXktTU0tZGRUSEg6bW06c3Muc3NzJyxcclxuICAgICAgICAnbW9udGgnOiAnTU0teXl5eSdcclxuICAgIH0sXHJcbiAgICBpbml0aWFsUGlja2VyOiAnZGF0ZScsXHJcbiAgICByZU9wZW5EZWZhdWx0OiBmYWxzZSxcclxuICAgIGVuYWJsZURhdGU6IHRydWUsXHJcbiAgICBlbmFibGVUaW1lOiBmYWxzZSxcclxuICAgIGJ1dHRvbkJhcjoge1xyXG4gICAgICAgIHNob3c6IGZhbHNlLFxyXG4gICAgICAgIG5vdzoge1xyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICB0ZXh0OiAnTm93J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9kYXk6IHtcclxuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgdGV4dDogJ1RvZGF5J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xlYXI6IHtcclxuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgdGV4dDogJ0NsZWFyJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0ZToge1xyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICB0ZXh0OiAnRGF0ZSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRpbWU6IHtcclxuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgdGV4dDogJ1RpbWUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbG9zZToge1xyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICB0ZXh0OiAnQ2xvc2UnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsb3NlT25EYXRlU2VsZWN0aW9uOiB0cnVlLFxyXG4gICAgY2xvc2VPblRpbWVOb3c6IHRydWUsXHJcbiAgICBhcHBlbmRUb0JvZHk6IGZhbHNlLFxyXG4gICAgYWx0SW5wdXRGb3JtYXRzOiBbXSxcclxuICAgIG5nTW9kZWxPcHRpb25zOiB7fSxcclxuICAgIHNhdmVBczogZmFsc2UsXHJcbiAgICByZWFkQXM6IGZhbHNlLFxyXG59KTtcclxuXHJcbk1ldHJvbmljQXBwLmNvbmZpZyhbJ2p3dE9wdGlvbnNQcm92aWRlcicsICckaHR0cFByb3ZpZGVyJywgKGp3dE9wdGlvbnNQcm92aWRlciwgJGh0dHBQcm92aWRlcikgPT4ge1xyXG4gICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xyXG5cclxuICAgIGp3dE9wdGlvbnNQcm92aWRlci5jb25maWcoe1xyXG4gICAgICAgIGF1dGhQcmVmaXg6ICcnLFxyXG4gICAgICAgIHdoaXRlTGlzdGVkRG9tYWluczonbG9jYWxob3N0JyxcclxuICAgICAgICB0b2tlbkdldHRlcjogKCkgPT4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyksXHJcbiAgICAgICAgdW5hdXRoZW50aWNhdGVkUmVkaXJlY3RvcjogWyckc3RhdGUnLCAoJHN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcclxuICAgICAgICB9XVxyXG4gICAgfSk7XHJcblxyXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnand0SW50ZXJjZXB0b3InKTtcclxuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2F1dGhJbnRlcmNlcHRvcicpO1xyXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnZXJyb3JIYW5kbGVySW50ZXJjZXB0b3InKTtcclxufV0pO1xyXG5cclxuTWV0cm9uaWNBcHAuY29uZmlnKFsnJHRyYW5zbGF0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHRyYW5zbGF0ZVByb3ZpZGVyKSB7XHJcbiAgICAkdHJhbnNsYXRlUHJvdmlkZXIudXNlU3RhdGljRmlsZXNMb2FkZXIoe1xyXG4gICAgICAgIHByZWZpeDogJ2Fzc2V0cy9sYW5ndWFnZXMvJyxcclxuICAgICAgICBzdWZmaXg6ICcuanNvbidcclxuICAgIH0pO1xyXG4gICAgLypcclxuICAgICBFTl9VUyhcImVuLVVTXCIpLFxyXG4gICAgIEVOX1VLKFwiZW4tR0JcIiksXHJcbiAgICAgSEVfSUwoXCJoZS1JTFwiKSxcclxuICAgICBERV9ERShcImRlLURFXCIpO1xyXG4gICAgICovXHJcbiAgICBjb25zdCBsYW5nTWFwID0ge1xyXG4gICAgICAgICdFTl9VUyc6ICdlbi1VUycsXHJcbiAgICAgICAgJ0VOX1VLJzogJ2VuLUdCJyxcclxuICAgICAgICAnSElfSUwnOiAnaGUtaWwnLFxyXG4gICAgICAgICdERV9ERSc6ICdkZS1kZSdcclxuICAgIH07XHJcbiAgICAkdHJhbnNsYXRlUHJvdmlkZXIudXNlU2FuaXRpemVWYWx1ZVN0cmF0ZWd5KG51bGwpO1xyXG4gICAgLy8kdHJhbnNsYXRlUHJvdmlkZXIucmVnaXN0ZXJBdmFpbGFibGVMYW5ndWFnZUtleXMoWydlbi1VUycsICdlbi1HQicsICdoZS1pbCcsICdkZS1kZSddLCBsYW5nTWFwKTtcclxuICAgICR0cmFuc2xhdGVQcm92aWRlci5wcmVmZXJyZWRMYW5ndWFnZSgnZW4tVVMnKTtcclxuICAgICR0cmFuc2xhdGVQcm92aWRlci5mYWxsYmFja0xhbmd1YWdlKCdlbi1VUycpO1xyXG59XSk7XHJcblxyXG5NZXRyb25pY0FwcC5mYWN0b3J5KCdzZXR0aW5ncycsIFsnJHJvb3RTY29wZScsICgkcm9vdFNjb3BlKSA9PiB7XHJcbiAgICAvLyBzdXBwb3J0ZWQgbGFuZ3VhZ2VzXHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IHtcclxuICAgICAgICBsYXlvdXQ6IHtcclxuICAgICAgICAgICAgcGFnZVNpZGViYXJDbG9zZWQ6IGZhbHNlLCAvLyBzaWRlYmFyIG1lbnUgc3RhdGVcclxuICAgICAgICAgICAgcGFnZUNvbnRlbnRXaGl0ZTogdHJ1ZSwgLy8gc2V0IHBhZ2UgY29udGVudCBsYXlvdXRcclxuICAgICAgICAgICAgcGFnZUJvZHlTb2xpZDogZmFsc2UsIC8vIHNvbGlkIGJvZHkgY29sb3Igc3RhdGVcclxuICAgICAgICAgICAgcGFnZUF1dG9TY3JvbGxPbkxvYWQ6IDEwMDAgLy8gYXV0byBzY3JvbGwgdG8gdG9wIG9uIHBhZ2UgbG9hZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXNzZXRzUGF0aDogJy4uL2Fzc2V0cycsXHJcbiAgICAgICAgZ2xvYmFsUGF0aDogJy4uL2Fzc2V0cy9nbG9iYWwnLFxyXG4gICAgICAgIGxheW91dFBhdGg6ICcuLi9hc3NldHMvbGF5b3V0cy9sYXlvdXQnLFxyXG4gICAgfTtcclxuXHJcbiAgICAkcm9vdFNjb3BlLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblxyXG4gICAgcmV0dXJuIHNldHRpbmdzO1xyXG59XSk7XHJcblxyXG4vKiBTZXR1cCBBcHAgTWFpbiBDb250cm9sbGVyICovXHJcbk1ldHJvbmljQXBwLmNvbnRyb2xsZXIoJ0FwcENvbnRyb2xsZXInLCBbJyRzY29wZScsICckcm9vdFNjb3BlJywgKCRzY29wZSkgPT4ge1xyXG4gICAgJHNjb3BlLiRvbignJHZpZXdDb250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgICAgIC8vQXBwLmluaXRDb21wb25lbnRzKCk7IC8vIGluaXQgY29yZSBjb21wb25lbnRzXHJcbiAgICAgICAgLy9MYXlvdXQuaW5pdCgpOyAvLyAgSW5pdCBlbnRpcmUgbGF5b3V0KGhlYWRlciwgZm9vdGVyLCBzaWRlYmFyLCBldGMpIG9uIHBhZ2UgbG9hZCBpZiB0aGUgcGFydGlhbHMgaW5jbHVkZWQgaW4gc2VydmVyIHNpZGUgaW5zdGVhZCBvZiBsb2FkaW5nIHdpdGggbmctaW5jbHVkZSBkaXJlY3RpdmVcclxuICAgIH0pO1xyXG59XSk7XHJcblxyXG4vKiBTZXR1cCBMYXlvdXQgUGFydCAtIEhlYWRlciAqL1xyXG5NZXRyb25pY0FwcC5jb250cm9sbGVyKCdIZWFkZXJDb250cm9sbGVyJywgWyckc2NvcGUnLCAoJHNjb3BlKSA9PiB7XHJcbiAgICAkc2NvcGUuJG9uKCckaW5jbHVkZUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgTGF5b3V0LmluaXRIZWFkZXIoKTsgLy8gaW5pdCBoZWFkZXJcclxuICAgIH0pO1xyXG59XSk7XHJcblxyXG5cclxuTWV0cm9uaWNBcHAuY29udHJvbGxlcignU2lkZWJhckNvbnRyb2xsZXInLCBbJyRzY29wZScsICd1c2VyRGF0YVNlcnZpY2UnLCAoJHNjb3BlKSA9PiB7XHJcbiAgICAkc2NvcGUuJG9uKCckaW5jbHVkZUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgTGF5b3V0LmluaXRTaWRlYmFyKCk7IC8vIGluaXQgc2lkZWJhclxyXG4gICAgfSk7XHJcbn1dKTtcclxuXHJcbk1ldHJvbmljQXBwLmNvbnRyb2xsZXIoJ0JhY2tvZmZpY2VDb250cm9sbGVyJywgWyd1c2VyRGF0YVNlcnZpY2UnLCAnJHNjb3BlJywgJyRzdGF0ZScsICdDT05GSUcnLCAnJHRyYW5zbGF0ZScsICh1c2VyRGF0YVNlcnZpY2UsICRzY29wZSwgJHN0YXRlLCBDT05GSUcsICR0cmFuc2xhdGUpID0+IHtcclxuICAgICRzdGF0ZS5nbyh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIubWFpblN0YXRlU2NyZWVuKTtcclxuICAgICRzY29wZS5pc0N1c3RvbWVyID0gdXNlckRhdGFTZXJ2aWNlLmlzQ3VzdG9tZXIoKTtcclxuICAgICRzY29wZS5pc0FkbWluID0gdXNlckRhdGFTZXJ2aWNlLmlzQWRtaW4oKTtcclxuICAgICRzY29wZS5jdXJyZW50VXNlciA9IHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlcjtcclxuXHJcbiAgICBfc2V0RGlyZWN0aW9uKCk7XHJcbiAgICBjb25zdCBsYW5nTWFwID0ge1xyXG4gICAgICAgICdFTl9VUyc6ICdlbi1VUycsXHJcbiAgICAgICAgJ0VOX1VLJzogJ2VuLUdCJyxcclxuICAgICAgICAnSEVfSUwnOiAnaGUtSUwnLFxyXG4gICAgICAgICdERV9ERSc6ICdkZS1ERSdcclxuICAgIH07XHJcbiAgICAkdHJhbnNsYXRlLnVzZShsYW5nTWFwWyRzY29wZS5jdXJyZW50VXNlci5sYW5ndWFnZV0pO1xyXG4gICAgJHNjb3BlLmxhbmd1YWdlcyA9IENPTkZJRy5MQU5HVUFHRVM7XHJcbiAgICAkc2NvcGUuY2hvb3NlTGFuZ3VhZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFsYW5nTWFwWyRzY29wZS5jdXJyZW50VXNlci5sYW5ndWFnZV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkdHJhbnNsYXRlLnVzZShsYW5nTWFwWyRzY29wZS5jdXJyZW50VXNlci5sYW5ndWFnZV0pLnRoZW4oKCk9PiB7XHJcbiAgICAgICAgICAgIF9zZXREaXJlY3Rpb24oKTtcclxuICAgICAgICAgICAgdXNlckRhdGFTZXJ2aWNlLnVwZGF0ZVVzZXJMYW5ndWFnZSgkc2NvcGUuY3VycmVudFVzZXIubGFuZ3VhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBfc2V0RGlyZWN0aW9uKCkge1xyXG4gICAgICAgICRzY29wZS5zZXR0aW5ncy5kaXJlY3Rpb24gPSBDT05GSUcuTEFOR1VBR0VTLmZpbHRlcigobGFuZykgPT4gbGFuZy52YWx1ZSA9PSB1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIubGFuZ3VhZ2UpO1xyXG4gICAgICAgIGlmICgkc2NvcGUuc2V0dGluZ3MuZGlyZWN0aW9uLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNldHRpbmdzLmRpcmVjdGlvbiA9ICRzY29wZS5zZXR0aW5ncy5kaXJlY3Rpb25bMF0uZGlyZWN0aW9uO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZXR0aW5ncy5kaXJlY3Rpb24gPSAncnRsJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XSk7XHJcblxyXG4vKiBTZXR1cCBSb3VudGluZyBGb3IgQWxsIFBhZ2VzICovXHJcbk1ldHJvbmljQXBwLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSA9PiB7XHJcbiAgICAvLyBSZWRpcmVjdCBhbnkgdW5tYXRjaGVkIHVybFxyXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2JhY2tvZmZpY2UnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBpc1N0YXRlUGFyYW1zKCRzdGF0ZVBhcmFtcywgJHEpIHtcclxuICAgICAgICBpZiAoJHN0YXRlUGFyYW1zLmlkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgLnN0YXRlKCdsb2dpbicsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2xvZ2luJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2xvZ2luLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2xvZ291dCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2xvZ291dCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IFsnJHN0YXRlJywgJyRxJywgJ3VzZXJEYXRhU2VydmljZScsICgkc3RhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd0b2tlbicpO1xyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdiYWNrb2ZmaWNlJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvYmFja29mZmljZScsXHJcbiAgICAgICAgICAgIC8vIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9iYWNrb2ZmaWNlL3ZpZXdzL2JhY2tvZmZpY2UuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdCYWNrb2ZmaWNlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZXNMb2dpbjogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJyxcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUidcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgc2V0VXNlckRhdGE6IHVzZXJEYXRhU2VydmljZSA9PiB1c2VyRGF0YVNlcnZpY2Uuc2V0VXNlckRhdGEoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyBEYXNoYm9hcmRcclxuICAgICAgICAuc3RhdGUoJ2Rhc2hib2FyZCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdiYWNrb2ZmaWNlJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2Rhc2hib2FyZC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0Rhc2hib2FyZENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIGdldFN0YXRzOiBkYXNoYm9hcmRTZXJ2aWNlID0+IGRhc2hib2FyZFNlcnZpY2UuZ2V0U3RhdHMoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJyxcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdjdXN0b21lckxpc3QnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9jdXN0b21lckxpc3QnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvY3VzdG9tZXJMaXN0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQ3VzdG9tZXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBnZXRDdXN0b21lcnM6IGN1c3RvbWVyc0RhdGFTZXJ2aWNlID0+IGN1c3RvbWVyc0RhdGFTZXJ2aWNlLmdldEN1c3RvbWVycygpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYWRkTmV3Q3VzdG9tZXInLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9hZGROZXdDdXN0b21lcicsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9hZGROZXdDdXN0b21lci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0N1c3RvbWVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdlZGl0Q3VzdG9tZXInLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9lZGl0Q3VzdG9tZXIvOmlkJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2FkZE5ld0N1c3RvbWVyLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQ3VzdG9tZXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGlkOiBudWxsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIGlzU3RhdGVQYXJhbXMsXHJcbiAgICAgICAgICAgICAgICBnZXRDdXN0b21lcnM6IChjdXN0b21lcnNEYXRhU2VydmljZSwgJHN0YXRlUGFyYW1zKSA9PiBjdXN0b21lcnNEYXRhU2VydmljZS5nZXRDdXN0b21lckJ5SUQoJHN0YXRlUGFyYW1zLmlkKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhZGROZXdEcml2ZXInLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9hZGROZXdEcml2ZXInLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvYWRkTmV3RHJpdmVyLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRHJpdmVyc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nLFxyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2VkaXREcml2ZXInLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9lZGl0RHJpdmVyLzppZCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9hZGROZXdEcml2ZXIuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEcml2ZXJzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcGFyYW06IHtcclxuICAgICAgICAgICAgICAgIGlkOiBudWxsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIGlzU3RhdGVQYXJhbXMsXHJcbiAgICAgICAgICAgICAgICBnZXREcml2ZXJCeUlEOiAoZHJpdmVyc0RhdGFTZXJ2aWNlLCAkc3RhdGVQYXJhbXMsIHVzZXJEYXRhU2VydmljZSwgc2V0VXNlckRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHJpdmVyc0RhdGFTZXJ2aWNlLmdldERyaXZlckJ5SUQodXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkLCAkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJyxcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdkcml2ZXJzTGlzdCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2RyaXZlcnNMaXN0LzppZCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9kcml2ZXJzTGlzdC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0RyaXZlcnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGlkOiBudWxsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIGdldERyaXZlcnM6IChkcml2ZXJzRGF0YVNlcnZpY2UsICRzdGF0ZVBhcmFtcywgdXNlckRhdGFTZXJ2aWNlLCBjdXN0b21lcnNEYXRhU2VydmljZSwgc2V0VXNlckRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHN0YXRlUGFyYW1zLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21lcnNEYXRhU2VydmljZS5nZXRDdXN0b21lckJ5SUQoJHN0YXRlUGFyYW1zLmlkKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRyaXZlcnNEYXRhU2VydmljZS5nZXREcml2ZXJzKCRzdGF0ZVBhcmFtcy5pZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRyaXZlcnNEYXRhU2VydmljZS5nZXREcml2ZXJzKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTicsXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYWRkRHJpdmVyc1Bob25lTnVtYmVycycsIHtcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdXJsOiAnL3Bob25lTnVtYmVycycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9waG9uZU51bWJlcnMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDdXN0b21lckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInLFxyXG4gICAgICAgICAgICAgICAgJ0FETUlOJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ3ByZWZlcmVuY2VzJywge1xyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvcHJlZmVyZW5jZXMnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvcHJlZmVyZW5jZXMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDdXN0b21lckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInLFxyXG4gICAgICAgICAgICAgICAgJ0FETUlOJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2FjdGl2aXR5TG9nJywge1xyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYWN0aXZpdHlMb2cvOmlkLzptb250aC86eWVhcicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9hY3Rpdml0eUxvZy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0RyaXZlcnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbW9udGg6IG51bGwsXHJcbiAgICAgICAgICAgICAgICB5ZWFyOiBudWxsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIGdldExvZzogKGRyaXZlcnNEYXRhU2VydmljZSwgJHN0YXRlUGFyYW1zLCB1c2VyRGF0YVNlcnZpY2UsIHNldFVzZXJEYXRhKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIGRyaXZlcnNEYXRhU2VydmljZS5nZXRMb2codXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkLCAkc3RhdGVQYXJhbXMuaWQsICRzdGF0ZVBhcmFtcy5tb250aCwgJHN0YXRlUGFyYW1zLnllYXIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInLFxyXG4gICAgICAgICAgICAgICAgJ0FETUlOJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2JlYWNvbnNMaXN0Jywge1xyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYmVhY29uc0xpc3QvOmlkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2JlYWNvbnNMaXN0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQmVhY29uc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgaWQ6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgZ2V0QmVhY29uczogKGJlYWNvbnNEYXRhU2VydmljZSwgdXNlckRhdGFTZXJ2aWNlLCAkc3RhdGVQYXJhbXMsIHNldFVzZXJEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRzdGF0ZVBhcmFtcy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVhY29uc0RhdGFTZXJ2aWNlLmdldEJlYWNvbnMoJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZXR1cm4gdXNlckRhdGFTZXJ2aWNlLnNldFVzZXJEYXRhKCkudGhlbigoKSA9PiBiZWFjb25zRGF0YVNlcnZpY2UuZ2V0QmVhY29ucyh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlYWNvbnNEYXRhU2VydmljZS5nZXRCZWFjb25zKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTicsXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYXR0YWNoQmVhY29uJywge1xyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXR0YWNoQmVhY29uLzppZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9hdHRhY2hCZWFjb24uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdCZWFjb25zQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgZ2V0QmVhY29uczogKGJlYWNvbnNEYXRhU2VydmljZSwgdXNlckRhdGFTZXJ2aWNlLCBzZXRVc2VyRGF0YSkgPT5cclxuICAgICAgICAgICAgICAgICAgICAvLyB1c2VyRGF0YVNlcnZpY2Uuc2V0VXNlckRhdGEoKS50aGVuKCgpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgYmVhY29uc0RhdGFTZXJ2aWNlLmdldEJlYWNvbnModXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJyxcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdlZGl0QmVhY29uJywge1xyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvYXR0YWNoQmVhY29uLzppZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9hdHRhY2hCZWFjb24uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdCZWFjb25zQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogbnVsbFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJyxcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pO1xyXG59XSk7XHJcblxyXG4vKiBJbml0IGdsb2JhbCBzZXR0aW5ncyBhbmQgcnVuIHRoZSBhcHAgKi9cclxuTWV0cm9uaWNBcHAucnVuKFsnJHJvb3RTY29wZScsICdzZXR0aW5ncycsICckc3RhdGUnLCAnYXV0aE1hbmFnZXInLFxyXG4gICckaHR0cCcsXHJcbiAgKCRyb290U2NvcGUsIHNldHRpbmdzLCAkc3RhdGUsIGF1dGhNYW5hZ2VyKSA9PiB7XHJcbiAgICAkcm9vdFNjb3BlLiRzdGF0ZSA9ICRzdGF0ZTsgLy8gc3RhdGUgdG8gYmUgYWNjZXNzZWQgZnJvbSB2aWV3XHJcbiAgICAkcm9vdFNjb3BlLiRzZXR0aW5ncyA9IHNldHRpbmdzOyAvLyBzdGF0ZSB0byBiZSBhY2Nlc3NlZCBmcm9tIHZpZXdcclxuXHJcbiAgICAvLyBjaGVjayBqd3Qgb24gcmVmcmVzaFxyXG4gICAgYXV0aE1hbmFnZXIuY2hlY2tBdXRoT25SZWZyZXNoKCk7XHJcbiAgICBhdXRoTWFuYWdlci5yZWRpcmVjdFdoZW5VbmF1dGhlbnRpY2F0ZWQoKTtcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbigndG9rZW5IYXNFeHBpcmVkJywgKCkgPT4gJHN0YXRlLmdvKCdsb2dvdXQnKSk7XHJcbn1dKTtcclxuXHJcblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuY29udHJvbGxlcignQmVhY29uc0NvbnRyb2xsZXInLCBbJyRzY29wZScsICckc3RhdGVQYXJhbXMnLCAnYmVhY29uc0RhdGFTZXJ2aWNlJywgJ3VzZXJEYXRhU2VydmljZScsICckc3RhdGUnLFxuICAgICAgICBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcywgYmVhY29uc0RhdGFTZXJ2aWNlLCB1c2VyRGF0YVNlcnZpY2UsICRzdGF0ZSkge1xuXG4gICAgICAgICAgICB0aGlzLmJlYWNvbnMgPSBiZWFjb25zRGF0YVNlcnZpY2UuYmVhY29ucztcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSAwO1xuXG4gICAgICAgICAgICBpZiAoJHN0YXRlUGFyYW1zLmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pZCA9ICRzdGF0ZVBhcmFtcy5pZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hdHRhY2hCZWFjb24gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYmVhY29uc0RhdGFTZXJ2aWNlLmF0dGFjaEJlYWNvbih1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsIHRoaXMuYmVhY29uKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2JlYWNvbnNMaXN0JykpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy50b2dnbGVTdXNwZW5kQmVhY29uID0gKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmVhY29uID0gdGhpcy5iZWFjb25zLmNvbnRlbnRbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGJlYWNvbi5hY3RpdmUgPSAhYmVhY29uLmFjdGl2ZTtcbiAgICAgICAgICAgICAgICBiZWFjb25zRGF0YVNlcnZpY2UudG9nZ2xlQmVhY29uKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCwgYmVhY29uKTtcbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgLy9CdWlsZCBhcnJheSB3aXRoIGB0b3RhbFBhZ2VzYCBlbGVtZW50cyBhbmQgcmV0dXJuIGhpcyBpbmRleGVzXG4gICAgICAgICAgICAvL1VzZWQgZm9yIGRpc3BsYXlpbmcgdGhlIHBhZ2luYXRvclxuICAgICAgICAgICAgdGhpcy50b3RhbFBhZ2VzID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheVxuICAgICAgICAgICAgICAgICAgICAuYXBwbHkoMCwgQXJyYXkodGhpcy5iZWFjb25zLnRvdGFsUGFnZXMpKVxuICAgICAgICAgICAgICAgICAgICAubWFwKGluZGV4ID0+IGluZGV4KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZ29Ub1BhZ2UgPSAocGFnZU51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gJHN0YXRlUGFyYW1zLmlkIHx8IHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZDtcbiAgICAgICAgICAgICAgICBiZWFjb25zRGF0YVNlcnZpY2UuZ2V0QmVhY29ucyhpZCwgcGFnZU51bWJlcilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWFjb25zID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2VOdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5vcGVuQ2FsZW5kYXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgXSk7XG5cbi8qIFxuICAgIEBTdW1tYXJ5OiBDdXN0b21lciBjb250cm9sbGVyIFxuICAgIEBEZXNjcmlwdGlvbjogaW4gY2hhcmdlIG9mIGFsbCBsb2dpYyBhY3Rpb25zIHJlbGF0ZWQgdG8gdGhlIEN1c3RvbWVycy5cbiovXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5jb250cm9sbGVyKCdDdXN0b21lckNvbnRyb2xsZXInLCBbJyRzY29wZScsICdjdXN0b21lcnNEYXRhU2VydmljZScsICckc3RhdGVQYXJhbXMnLCAndXNlckRhdGFTZXJ2aWNlJywgJyRzdGF0ZScsXG4gICAgICAgIGZ1bmN0aW9uKCRzY29wZSwgY3VzdG9tZXJzRGF0YVNlcnZpY2UsICRzdGF0ZVBhcmFtcywgdXNlckRhdGFTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJzID0gY3VzdG9tZXJzRGF0YVNlcnZpY2UuY3VzdG9tZXJzO1xuICAgICAgICAgICAgdGhpcy5lbWFpbFBhdHRlcm4gPSAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcblxuICAgICAgICAgICAgaWYgKCRzdGF0ZVBhcmFtcy5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Bhc3N3b3JkRmllbGRzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lciA9IGN1c3RvbWVyc0RhdGFTZXJ2aWNlLmVkaXRpbmdDdXN0b21lcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbmV3IGNsaWVudCBtb2RlXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFzc3dvcmRGaWVsZHMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFBlcm1pc3Npb25Nb2RlbCA9IChwZXJtaXNzaW9ucykgPT57XG4gICAgICAgICAgICAgICAgaWYgKCFwZXJtaXNzaW9ucykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWxsb3dlZFBlcm1pc3Npb25zID0gcGVybWlzc2lvbnM7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxvd2VkUGVybWlzc2lvbiA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsb3dlZFBlcm1pc3Npb25zLmZvckVhY2goKHBlcm1pc3Npb24pID0+eyBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxvd2VkUGVybWlzc2lvbltwZXJtaXNzaW9uLnBlcm1pc3Npb25dID0gcGVybWlzc2lvbi5hbGxvd2VkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zZXRQZXJtaXNzaW9uTW9kZWwodXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLnBlcm1pc3Npb25zKTtcblxuICAgICAgICAgICAgdGhpcy5zYXZlUGVybWlzc2lvbnMgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBlcm1pc3Npb25zID0gW107XG4gICAgICAgICAgICAgICAgXy5mb3JFYWNoKHRoaXMuYWxsb3dlZFBlcm1pc3Npb24sIChhbGxvd2VkLCBwZXJtaXNzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwZXJtaXNzaW9uT2JqID0gXy5maW5kKHRoaXMuYWxsb3dlZFBlcm1pc3Npb25zLCB7cGVybWlzc2lvbjogcGVybWlzc2lvbn0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGVybWlzc2lvbk9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbk9iai5hbGxvd2VkID0gYWxsb3dlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zLnB1c2gocGVybWlzc2lvbk9iaik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9ucy5wdXNoKHtwZXJtaXNzaW9uOiBwZXJtaXNzaW9uLCBhbGxvd2VkOiBhbGxvd2VkfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjdXN0b21lcnNEYXRhU2VydmljZS5zZXRQZXJtaXNzaW9ucyh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsIHBlcm1pc3Npb25zKS50aGVuKChwZXJtaXNzaW9ucykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlcm1pc3Npb25Nb2RlbChwZXJtaXNzaW9ucyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmFkZE5ld0N1c3RvbWVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJzRGF0YVNlcnZpY2UuZWRpdEN1c3RvbWVyKHRoaXMuY3VzdG9tZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2N1c3RvbWVyTGlzdCcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4gdGhpcy5sb2FkaW5nID0gZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyc0RhdGFTZXJ2aWNlLmFkZE5ld0N1c3RvbWVyKHRoaXMuY3VzdG9tZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2N1c3RvbWVyTGlzdCcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4gdGhpcy5sb2FkaW5nID0gZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZHJpdmVyc1Bob25lTnVtYmVycyA9IHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5xdWlja0NhbGxOdW1iZXJzO1xuXG4gICAgICAgICAgICB0aGlzLnNhdmVOdW1iZXJzID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGZpdGxlciBvdXQgZW1wdHkgb2JqZWN0cyBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5kcml2ZXJzUGhvbmVOdW1iZXJzXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoeCA9PiB4Lm5hbWUubGVuZ3RoID4gMCAmJiB4Lm51bWJlci5sZW5ndGggPiAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VzdG9tZXJzRGF0YVNlcnZpY2Uuc2F2ZVF1aWNrQ2FsbE51bWJlcnModXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkLCB7IG51bWJlcnM6IGRhdGEgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnJlbW92ZU51bWJlciA9IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGhvbmVOdW1iZXJzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyaXZlcnNQaG9uZU51bWJlcnMgPSB0aGlzLmRyaXZlcnNQaG9uZU51bWJlcnNcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcih4ID0+IHRoaXMuZHJpdmVyc1Bob25lTnVtYmVyc1tpbmRleF0gIT09IHgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5hZGROZXdOdW1iZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJpdmVyc1Bob25lTnVtYmVycy5sZW5ndGggPCAxMikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyaXZlcnNQaG9uZU51bWJlcnMucHVzaCh7IG5hbWU6ICcnLCBudW1iZXI6ICcnIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGhvbmVOdW1iZXJzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3VzcGVuZEN1c3RvbWVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXIuYWN0aXZlID0gIXRoaXMuY3VzdG9tZXIuYWN0aXZlO1xuICAgICAgICAgICAgICAgIGN1c3RvbWVyc0RhdGFTZXJ2aWNlLnN1c3BlbmRDdXN0b21lcih0aGlzLmN1c3RvbWVyKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMudG9nZ2xlUGFzc3dvcmRGaWVsZHMgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFzc3dvcmRGaWVsZHMgPSAhdGhpcy5zaG93UGFzc3dvcmRGaWVsZHM7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgXSk7XG5cbi8qIFxyXG4gICAgQFN1bW1hcnk6IERhc2hib2FyZCBjb250cm9sbGVyIFxyXG4gICAgQERlc2NyaXB0aW9uOiBpbiBjaGFyZ2Ugb2YgYWxsIGxvZ2ljIGFjdGlvbnMgcmVsYXRlZCB0byB0aGUgRGFzaGJvYXJkIGFuZCBldmVyeSBjaGlsZCBzdGF0ZSBvZiB0aGUgZGFzaGJvYXJkLlxyXG4qL1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdEYXNoYm9hcmRDb250cm9sbGVyJywgWyckc2NvcGUnLCAnZGFzaGJvYXJkU2VydmljZScsXHJcbiAgICAgICAgZnVuY3Rpb24oJHNjb3BlLCBkYXNoYm9hcmRTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHMgPSBkYXNoYm9hcmRTZXJ2aWNlLnN0YXRzO1xyXG4gICAgICAgIH1cclxuICAgIF0pO1xuLyogXG4gICAgQFN1bW1hcnk6IERyaXZlcnMgY29udHJvbGxlciBcbiAgICBARGVzY3JpcHRpb246IGluIGNoYXJnZSBvZiBhbGwgbG9naWMgYWN0aW9ucyByZWxhdGVkIHRvIERyaXZlcnMsIFxuICAgIHN1Y2ggYXMgYWRkaW5nIG5ldyBkcml2ZXJzIGFuZCBkaXNwbGF5IGRyaXZlcnMgbGlzdC5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0RyaXZlcnNDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJHN0YXRlUGFyYW1zJywgJ2RyaXZlcnNEYXRhU2VydmljZScsICckc3RhdGUnLCAndXNlckRhdGFTZXJ2aWNlJywgJ2N1c3RvbWVyc0RhdGFTZXJ2aWNlJywgJ0NPTkZJRycsXG4gICAgICAgIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBkcml2ZXJzRGF0YVNlcnZpY2UsICRzdGF0ZSwgdXNlckRhdGFTZXJ2aWNlLCBjdXN0b21lcnNEYXRhU2VydmljZSwgQ09ORklHKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRyaXZlcnMgPSBkcml2ZXJzRGF0YVNlcnZpY2UuZHJpdmVycztcbiAgICAgICAgICAgIHRoaXMucGVybWlzc2lvbnMgPSBDT05GSUcuRFJJVkVSX1BFUk1JU1NJT05TO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDA7XG5cbiAgICAgICAgICAgIC8qKiBcbiAgICAgICAgICAgICAqIHdlIGNhbiBoYXZlIGEgJHN0YXRlUGFyYW1zLmlkIGluIDIgY2FzZXM6XG4gICAgICAgICAgICAgKiBlZGl0aW5nIGEgZHJpdmVyIG9yIGdldHRpbmcgbGlzdCBvZiBkcml2ZXJzIHBlciBzcGVjaWZpYyBjdXN0b21lciAoYXMgc3VwZXJhZG1pbikgIFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAoJHN0YXRlUGFyYW1zLmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lciA9IGN1c3RvbWVyc0RhdGFTZXJ2aWNlLmVkaXRpbmdDdXN0b21lcjsgLy8gd2UncmUgZGlzcGxheWluZyB0aGUgbGlzdCBvZiBkcml2ZXJzIGZvciBhIHNwZWNpZmljIGN1c3RvbWVyLlxuICAgICAgICAgICAgICAgIHRoaXMuaWQgPSAkc3RhdGVQYXJhbXMuaWQ7XG4gICAgICAgICAgICAgICAgaWYgKCRzdGF0ZS5jdXJyZW50Lm5hbWUgPT09ICdlZGl0RHJpdmVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcml2ZXIgPSBkcml2ZXJzRGF0YVNlcnZpY2UuZWRpdGluZ0RyaXZlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBuZXcgZHJpdmVyIG1vZGVcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGUgPSAn15TXldeh16Mg16DXlNeSINeX15PXqSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYWRkTmV3RHJpdmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZHJpdmVyc0RhdGFTZXJ2aWNlLmVkaXREcml2ZXIodXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkLCB0aGlzLmRyaXZlcikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZHJpdmVyc0xpc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZHJpdmVyc0RhdGFTZXJ2aWNlLmFkZE5ld0RyaXZlcih1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsIHRoaXMuZHJpdmVyKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdkcml2ZXJzTGlzdCcpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmdvVG9FZGl0Q3VzdG9tZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdlZGl0Q3VzdG9tZXInLCB7IGlkOiB0aGlzLmN1c3RvbWVyLmlkIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy52aWV3TG9nID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYWN0aXZpdHlMb2cnLCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLmRyaXZlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN1c3BlbmREcml2ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcml2ZXIuYWN0aXZlID0gIXRoaXMuZHJpdmVyLmFjdGl2ZTtcbiAgICAgICAgICAgICAgICBkcml2ZXJzRGF0YVNlcnZpY2Uuc3VzcGVuZERyaXZlcih1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsIHRoaXMuZHJpdmVyKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZ29UbyA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKCEkc2NvcGUuaXNBZG1pbikge1xuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2VkaXREcml2ZXInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5kcml2ZXJzLmNvbnRlbnRbaW5kZXhdLmlkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQFRPRE8gLSBtb3ZlIHRvIGhlbHBlclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnRvdGFsUGFnZXMgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5XG4gICAgICAgICAgICAgICAgICAgIC5hcHBseSgwLCBBcnJheSh0aGlzLmRyaXZlcnMudG90YWxQYWdlcykpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoaW5kZXggPT4gaW5kZXgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5nb1RvUGFnZSA9IChwYWdlTnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogZGVmaW5lIHdoaWNoIGlkIHRvIHVzZSBmb3IgQVBJXG4gICAgICAgICAgICAgICAgICogaWYgd2UncmUgbG9va2luZyBhdCBhIGxpc3Qgb2YgZHJpdmVycyBhcyBhIGN1c3RvbWVyIC0gd2UgbmVlZCBvdXIgb3duIGlkXG4gICAgICAgICAgICAgICAgICogaWYgd2UncmUgbG9va2luZyBhdCBhIGxpc3Qgb2YgZHJpdmVycyBhcyBhIHN1cGVyIGFkbWluIGZvciBzcGVjaWZpYyBjdXN0b21lciAtIHdlIG5lZWQgdGhlIGN1c3RvbWVyJ3MgaWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9ICRzdGF0ZVBhcmFtcy5pZCB8fCB1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQ7XG4gICAgICAgICAgICAgICAgZHJpdmVyc0RhdGFTZXJ2aWNlLmdldERyaXZlcnMoaWQsIHBhZ2VOdW1iZXIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJpdmVycyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlTnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2VhcmNoID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gJHN0YXRlUGFyYW1zLmlkIHx8IHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZDtcbiAgICAgICAgICAgICAgICBkcml2ZXJzRGF0YVNlcnZpY2Uuc2VhcmNoKGlkLCB0aGlzLnNlYXJjaFF1ZXJ5KS50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJpdmVycyA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgXSk7XG5cbi8qIFxuICAgIEBTdW1tYXJ5OiBMb2dpbiBjb250cm9sbGVyIFxuICAgIEBEZXNjcmlwdGlvbjogaW4gY2hhcmdlIG9mIGFsbCBsb2dpYyBhY3Rpb25zIHJlbGF0ZWQgdG8gTG9naW5cbiovXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5jb250cm9sbGVyKCdMb2dpbkNvbnRyb2xsZXInLCBbJyRzdGF0ZScsICdhdXRoU2VydmljZScsICd1c2VyRGF0YVNlcnZpY2UnLFxuICAgICAgICBmdW5jdGlvbigkc3RhdGUsIGF1dGhTZXJ2aWNlLCB1c2VyRGF0YVNlcnZpY2UpIHtcblxuICAgICAgICAgICAgdGhpcy5zdWJtaXQgPSAoaXNWYWxpZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVjYXB0Y2hhUmVzcG9uc2U6IHRoaXMucmVjYXB0Y2hhUmVzcG9uc2VcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBhdXRoU2VydmljZS5sb2dpbih1c2VyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdXNlckRhdGFTZXJ2aWNlLnNldFVzZXJEYXRhKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5tYWluU3RhdGVTY3JlZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXSk7XG5cbi8qIFxuICAgIEBTdW1tYXJ5OiBNb2RhbCBjb250cm9sbGVyIFxuICAgIEBEZXNjcmlwdGlvbjogaW4gY2hhcmdlIG9mIGFsbCBsb2dpYyBhY3Rpb25zIHJlbGF0ZWQgdG8gTW9kYWxcbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ01vZGFsQ29udHJvbGxlcicsIFsnY2xvc2UnLFxuICAgICAgICBmdW5jdGlvbihjbG9zZSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSA9IChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjbG9zZSwgYnV0IGdpdmUgNTAwbXMgZm9yIGJvb3RzdHJhcCB0byBhbmltYXRlXG4gICAgICAgICAgICAgICAgY2xvc2UocmVzdWx0LCA1MDApOyBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbl0pO1xuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuZGlyZWN0aXZlKCdjb25maXJtUGFzc3dvcmQnLCBjb25maXJtUGFzc3dvcmRDb25maWcpO1xuXG5mdW5jdGlvbiBjb25maXJtUGFzc3dvcmRDb25maWcoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgcmVxdWlyZTogJ25nTW9kZWwnLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgb3RoZXJNb2RlbFZhbHVlOiAnPWNvbXBhcmVUbydcbiAgICAgICAgfSxcbiAgICAgICAgbGluazogKHNjb3BlLCBlbGVtZW50LCBhdHRyaWJ1dGVzLCBuZ01vZGVsKSA9PiB7XG4gICAgICAgICAgICBuZ01vZGVsLiR2YWxpZGF0b3JzLmNvbXBhcmVUbyA9IChtb2RlbFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsVmFsdWUgPT09IHNjb3BlLm90aGVyTW9kZWxWYWx1ZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaCgnb3RoZXJNb2RlbFZhbHVlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5nTW9kZWwuJHZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG4vKioqXHJcbkdMb2JhbCBEaXJlY3RpdmVzXHJcbioqKi9cclxuXHJcbi8vIFJvdXRlIFN0YXRlIExvYWQgU3Bpbm5lcih1c2VkIG9uIHBhZ2Ugb3IgY29udGVudCBsb2FkKVxyXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxyXG4gICAgLmRpcmVjdGl2ZSgnbmdTcGlubmVyQmFyJywgWyckcm9vdFNjb3BlJywgJyRzdGF0ZScsXHJcbiAgICAgICAgZnVuY3Rpb24oJHJvb3RTY29wZSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBieSBkZWZ1bHQgaGlkZSB0aGUgc3Bpbm5lciBiYXJcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdoaWRlJyk7IC8vIGhpZGUgc3Bpbm5lciBiYXIgYnkgZGVmYXVsdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBkaXNwbGF5IHRoZSBzcGlubmVyIGJhciB3aGVuZXZlciB0aGUgcm91dGUgY2hhbmdlcyh0aGUgY29udGVudCBwYXJ0IHN0YXJ0ZWQgbG9hZGluZylcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnaGlkZScpOyAvLyBzaG93IHNwaW5uZXIgYmFyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIHNwaW5uZXIgYmFyIG9uIHJvdW50ZSBjaGFuZ2Ugc3VjY2VzcyhhZnRlciB0aGUgY29udGVudCBsb2FkZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdoaWRlJyk7IC8vIGhpZGUgc3Bpbm5lciBiYXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdwYWdlLW9uLWxvYWQnKTsgLy8gcmVtb3ZlIHBhZ2UgbG9hZGluZyBpbmRpY2F0b3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgTGF5b3V0LnNldEFuZ3VsYXJKc1NpZGViYXJNZW51QWN0aXZlTGluaygnbWF0Y2gnLCBudWxsLCBldmVudC5jdXJyZW50U2NvcGUuJHN0YXRlKTsgLy8gYWN0aXZhdGUgc2VsZWN0ZWQgbGluayBpbiB0aGUgc2lkZWJhciBtZW51XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhdXRvIHNjb3JsbCB0byBwYWdlIHRvcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwLnNjcm9sbFRvcCgpOyAvLyBzY3JvbGwgdG8gdGhlIHRvcCBvbiBjb250ZW50IGxvYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgJHJvb3RTY29wZS5zZXR0aW5ncy5sYXlvdXQucGFnZUF1dG9TY3JvbGxPbkxvYWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGUgZXJyb3JzXHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZU5vdEZvdW5kJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2hpZGUnKTsgLy8gaGlkZSBzcGlubmVyIGJhclxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGUgZXJyb3JzXHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZUVycm9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2hpZGUnKTsgLy8gaGlkZSBzcGlubmVyIGJhclxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIF0pO1xyXG5cclxuLy8gSGFuZGxlIGdsb2JhbCBMSU5LIGNsaWNrXHJcbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXHJcbiAgICAuZGlyZWN0aXZlKCdhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0sIGF0dHJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXR0cnMubmdDbGljayB8fCBhdHRycy5ocmVmID09PSAnJyB8fCBhdHRycy5ocmVmID09PSAnIycpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IGxpbmsgY2xpY2sgZm9yIGFib3ZlIGNyaXRlcmlhXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4vLyBIYW5kbGUgRHJvcGRvd24gSG92ZXIgUGx1Z2luIEludGVncmF0aW9uXHJcbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXHJcbiAgICAuZGlyZWN0aXZlKCdkcm9wZG93bk1lbnVIb3ZlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtLmRyb3Bkb3duSG92ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcbi8qIFxuICAgIEBTdW1tYXJ5OiBBdXRoZW50aWNhdGlvbiBzZXJ2aWNlIFxuICAgIEBEZXNjcmlwdGlvbjogaW4gY2hhcmdlIG9mIEFQSSByZXF1ZXN0cyBhbmQgZGF0YSByZWxhdGVkIHRvIHVzZXIgYXV0aGVudGljYXRpb24uXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAuc2VydmljZSgnYXV0aFNlcnZpY2UnLCBbJyRodHRwJywgJ0NPTkZJRycsICdzd2FuZ3VsYXInLCAnZXJyb3JIYW5kbGVyU2VydmljZScsXG4gICAgZnVuY3Rpb24gKCRodHRwLCBDT05GSUcsIHN3YW5ndWxhciwgZXJyb3JIYW5kbGVyU2VydmljZSkge1xuXG4gICAgICBjb25zdCBzZXJ2ZXIgPSBDT05GSUcuU0VSVkVSO1xuXG4gICAgICBmdW5jdGlvbiBsb2dpbihjcmVkZW50aWFscykge1xuICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAucG9zdChzZXJ2ZXIgKyAnL2F1dGhlbnRpY2F0ZScsIGNyZWRlbnRpYWxzKVxuICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gcmVzdWx0LmhlYWRlcnMoKS5hdXRob3JpemF0aW9uO1xuICAgICAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIHRva2VuKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgIHN3YW5ndWxhci5zd2FsKCfXpNeo15jXmSDXlNeU16rXl9eR16jXldeqINep15LXldeZ15nXnScsXG4gICAgICAgICAgICAgICAgJ9eQ16DXkCDXkdeT15XXpyDXkNeqINeU16DXqteV16DXmdedINep15TXlteg16ouJyxcbiAgICAgICAgICAgICAgICAnaW5mbydcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlcnJvckhhbmRsZXJTZXJ2aWNlLmhhbmRsZShlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjaGVja0N1cnJlbnRVc2VyKCkge1xuICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHNlcnZlciArICcvdXNlcnMvY3VycmVudCcpO1xuICAgICAgICB9IGVsc2UgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxvZ2luLFxuICAgICAgICBjaGVja0N1cnJlbnRVc2VyXG4gICAgICB9O1xuICAgIH1cbiAgXSk7XG5cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgLmZhY3RvcnkoJ2F1dGhJbnRlcmNlcHRvcicsICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVxdWVzdDogZnVuY3Rpb24gKGNvbmZpZykge1xuICAgICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuICAgICAgICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuICAgICAgICBpZih0b2tlbikgY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IHRva2VuO1xuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgfSxcbiAgICAgIHJlc3BvbnNlOiAocmVzKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1Rva2VuID0gcmVzLmhlYWRlcnMoKS5hdXRob3JpemF0aW9uO1xuICAgICAgICBjb25zdCBjdXJyZW50VG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcblxuICAgICAgICBpZiAobmV3VG9rZW4gJiYgbmV3VG9rZW4gIT09IGN1cnJlbnRUb2tlbikge1xuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIG5ld1Rva2VuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG4vKiBcbiAgICBAU3VtbWFyeTogQmVhY29ucyBEYXRhIFNlcnZpY2UgXG4gICAgQERlc2NyaXB0aW9uOiBJbiBjaGFyZ2Ugb2YgQVBJIHJlcXVlc3RzIGFuZCBkYXRhIHJlbGF0ZWQgdGhlIGJlYWNvbnNcbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLnNlcnZpY2UoJ2JlYWNvbnNEYXRhU2VydmljZScsIFsnJHEnLCAnJGh0dHAnLCAnQ09ORklHJywgJyRpbmplY3RvcicsXG4gICAgICAgIGZ1bmN0aW9uKCRxLCAkaHR0cCwgQ09ORklHLCAkaW5qZWN0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlcnZlciA9IENPTkZJRy5TRVJWRVI7XG4gICAgICAgICAgICBjb25zdCBzd2FuZ3VsYXIgPSAkaW5qZWN0b3IuZ2V0KCdzd2FuZ3VsYXInKTsgLy8gYXZvaWQgY2lyY3VsYXIgZGVwZW5kZW5jeVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRCZWFjb25zKGlkLCBwYWdlTnVtYmVyID0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IGA/cGFnZT0ke3BhZ2VOdW1iZXJ9YDtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLmdldChgJHtzZXJ2ZXJ9L2N1c3RvbWVycy8ke2lkfS9iZWFjb25zJHtwYXJhbXN9YClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWFjb25zID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlYWNvbnMuY29udGVudCA9IHRoaXMuYmVhY29ucy5jb250ZW50Lm1hcCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmxhc3RBY3Rpdml0eSA9IG1vbWVudC51dGMob2JqLmxhc3RBY3Rpdml0eSkuY2FsZW5kYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmxhc3RBY3Rpdml0eSA9PT0gJ0ludmFsaWQgZGF0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmxhc3RBY3Rpdml0eSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGF0dGFjaEJlYWNvbihjdXN0b21lcklkLCB7IHNlcmlhbCwgdXVpZCwgbGljZW5zZVBsYXRlTnVtYmVyLCBleHBpcnlEYXRlIH0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoYCR7c2VydmVyfS9jdXN0b21lcnMvJHtjdXN0b21lcklkfS9iZWFjb25zYCwgeyBzZXJpYWwsIHV1aWQsIGxpY2Vuc2VQbGF0ZU51bWJlciwgZXhwaXJ5RGF0ZSB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gNDA5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dhbmd1bGFyLm9wZW4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sVGVtcGxhdGU6ICdiYWNrb2ZmaWNlL3RwbC9zZW5zb3ItNDA5Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TG9hZGVyT25Db25maXJtOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAoKSA9PiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gdG9nZ2xlQmVhY29uKGN1c3RvbWVySWQsIHsgaWQsIGFjdGl2ZSB9KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wYXRjaChgJHtzZXJ2ZXJ9L2N1c3RvbWVycy8ke2N1c3RvbWVySWR9L2JlYWNvbnMvJHtpZH0vYWN0aXZlYCwgeyBhY3RpdmUgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBnZXRCZWFjb25zLFxuICAgICAgICAgICAgICAgIGF0dGFjaEJlYWNvbixcbiAgICAgICAgICAgICAgICB0b2dnbGVCZWFjb25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcblxuLyogXG4gICAgQFN1bW1hcnk6IEN1c3RvbWVycyBEYXRhIFNlcnZpY2UgXG4gICAgQERlc2NyaXB0aW9uOiBJbiBjaGFyZ2Ugb2YgQVBJIHJlcXVlc3RzIGFuZCBkYXRhIHJlbGF0ZWQgdGhlIGN1c3RvbWVyc1xuKi9cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuc2VydmljZSgnY3VzdG9tZXJzRGF0YVNlcnZpY2UnLCBbJyRodHRwJywgJ0NPTkZJRycsICdzd2FuZ3VsYXInLFxuICAgICAgICBmdW5jdGlvbigkaHR0cCwgQ09ORklHLCBzd2FuZ3VsYXIpIHtcblxuICAgICAgICAgICAgY29uc3Qgc2VydmVyID0gQ09ORklHLlNFUlZFUjtcblxuICAgICAgICAgICAgZnVuY3Rpb24gbWFwQ3VzdG9tZXJzKGRhdGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPyBpdGVtLnN0YXR1cyA9ICdDVVNUT01FUl9MSVNULkFDVElWRScgOiBpdGVtLnN0YXR1cyA9ICdDVVNUT01FUl9MSVNULk5PVF9BQ1RJVkUnO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0Q3VzdG9tZXJzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAuZ2V0KHNlcnZlciArICcvY3VzdG9tZXJzJylcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lcnMgPSBtYXBDdXN0b21lcnMocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkTmV3Q3VzdG9tZXIobmV3Q3VzdG9tZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3Q3VzdG9tZXIuY29tcGFueUxvZ28pIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3Q3VzdG9tZXIuY29tcGFueUxvZ28gPSBuZXdDdXN0b21lci5jb21wYW55TG9nby5iYXNlNjQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAucG9zdChzZXJ2ZXIgKyAnL2N1c3RvbWVycycsIG5ld0N1c3RvbWVyKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyci5zdGF0dXMgPT09IDQwOSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3YW5ndWxhci5vcGVuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbFRlbXBsYXRlOiAnYmFja29mZmljZS90cGwvY3VzdG9tZXItNDA5Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TG9hZGVyT25Db25maXJtOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICgpID0+IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBlZGl0Q3VzdG9tZXIoeyBjb21wYW55TmFtZSwgZGlzcGxheU5hbWUsIHBhc3N3b3JkLCBlbWFpbCwgaWQsIGFjdGl2ZSwgY29tcGFueUxvZ28sIGNvbXBhbnlSb2xlLCBwaG9uZU51bWJlciB9KSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhbnlMb2dvKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlMb2dvID0gY29tcGFueUxvZ28uYmFzZTY0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBhdGNoKHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBpZCwgeyBjb21wYW55TmFtZSwgZGlzcGxheU5hbWUsIHBhc3N3b3JkLCBlbWFpbCwgYWN0aXZlLCBjb21wYW55TG9nbywgY29tcGFueVJvbGUsIHBob25lTnVtYmVyIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRDdXN0b21lckJ5SUQoaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLmdldChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgaWQpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdGluZ0N1c3RvbWVyID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzYXZlUXVpY2tDYWxsTnVtYmVycyhpZCwgZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAucGF0Y2goc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGlkICsgJy9udW1iZXJzJywgZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gc3VzcGVuZEN1c3RvbWVyKHsgaWQsIGFjdGl2ZSB9KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wYXRjaChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgaWQgKyAnL2FjdGl2ZScsIHsgYWN0aXZlIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFBlcm1pc3Npb25zKGlkLCBwZXJtaXNzaW9ucykge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAucGF0Y2goc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGlkICsgJy9wZXJtaXNzaW9ucycsIHsgcGVybWlzc2lvbnMgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBnZXRDdXN0b21lcnMsXG4gICAgICAgICAgICAgICAgYWRkTmV3Q3VzdG9tZXIsXG4gICAgICAgICAgICAgICAgZWRpdEN1c3RvbWVyLFxuICAgICAgICAgICAgICAgIGdldEN1c3RvbWVyQnlJRCxcbiAgICAgICAgICAgICAgICBzYXZlUXVpY2tDYWxsTnVtYmVycyxcbiAgICAgICAgICAgICAgICBzdXNwZW5kQ3VzdG9tZXIsXG4gICAgICAgICAgICAgICAgc2V0UGVybWlzc2lvbnNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcbi8qIFxuICAgIEBTdW1tYXJ5OiBEYXNoYm9hcmQgRGF0YSBTZXJ2aWNlIFxuICAgIEBEZXNjcmlwdGlvbjogSW4gY2hhcmdlIG9mIERhc2hib2FyZCBkYXRhIHN1Y2ggYXMgU3RhdGlzdGljc1xuKi9cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuc2VydmljZSgnZGFzaGJvYXJkU2VydmljZScsIFsnJGh0dHAnLCAnQ09ORklHJyxcbiAgICAgICAgZnVuY3Rpb24oJGh0dHAsIENPTkZJRykge1xuICAgICAgICAgICAgY29uc3Qgc2VydmVyID0gQ09ORklHLlNFUlZFUjtcblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0U3RhdHMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoYCR7c2VydmVyfS9hZG1pbi9zdGF0aXN0aWNzYClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0cyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0cy55ZXN0ZXJkYXlBY3Rpdml0eVNlY29uZHMgPSBtb21lbnQoKS5ob3VycygwKS5taW51dGVzKDApLnNlY29uZHModGhpcy5zdGF0cy55ZXN0ZXJkYXlBY3Rpdml0eVNlY29uZHMpLmZvcm1hdCgnSEg6bW06c3MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRzO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBnZXRTdGF0c1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIF0pO1xuXG4vKiBcbiAgICBAU3VtbWFyeTogRHJpdmVycyBEYXRhIFNlcnZpY2UgXG4gICAgQERlc2NyaXB0aW9uOiBJbiBjaGFyZ2Ugb2YgQVBJIHJlcXVlc3RzIGFuZCBkYXRhIHJlbGF0ZWQgdGhlIGRyaXZlcnNcbiovXG5cbi8vIGltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuc2VydmljZSgnZHJpdmVyc0RhdGFTZXJ2aWNlJywgWyckaHR0cCcsICdDT05GSUcnLFxuICAgICAgICBmdW5jdGlvbigkaHR0cCwgQ09ORklHKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHNlcnZlciA9IENPTkZJRy5TRVJWRVI7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hcERyaXZlcnMoZGF0YSkge1xuICAgICAgICAgICAgICAgIGRhdGEuY29udGVudC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmVIb3VycyA9IG1vbWVudCgpLmhvdXJzKDApLm1pbnV0ZXMoMCkuc2Vjb25kcyhpdGVtLnllc3RlcmRheUFjdGl2aXR5U2Vjb25kcykuZm9ybWF0KCdISDptbTpzcycpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXREcml2ZXJzKGlkLCBwYWdlTnVtYmVyID0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IGA/cGFnZT0ke3BhZ2VOdW1iZXJ9YDtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLmdldChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgaWQgKyAnL2RyaXZlcnMnICsgcGFyYW1zKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyaXZlcnMgPSBtYXBEcml2ZXJzKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyaXZlcnM7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXREcml2ZXJCeUlEKGN1c3RvbWVySWQsIGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGN1c3RvbWVySWQgKyAnL2RyaXZlcnMvJyArIGlkKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdEcml2ZXIgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdGluZ0RyaXZlci5wZXJtaXNzaW9uTGV2ZWwgPSBDT05GSUcuRFJJVkVSX1BFUk1JU1NJT05TXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgob2JqKSA9PiBvYmoudHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5kZXhPZih0aGlzLmVkaXRpbmdEcml2ZXIucGVybWlzc2lvbkxldmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZE5ld0RyaXZlcihjdXN0b21lcklkLCB7IGRpc3BsYXlOYW1lLCBpZE51bWJlciwgcGhvbmVOdW1iZXIsIHBlcm1pc3Npb25MZXZlbCwgbGljZW5zZU51bWJlciB9KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBjdXN0b21lcklkICsgJy9kcml2ZXJzJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZE51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbkxldmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGljZW5zZU51bWJlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZWRpdERyaXZlcihjdXN0b21lcklkLCB7IGRpc3BsYXlOYW1lLCBpZE51bWJlciwgcGhvbmVOdW1iZXIsIGlkLCBwZXJtaXNzaW9uTGV2ZWwsIGFjdGl2ZSwgbGljZW5zZU51bWJlciB9KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wYXRjaChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgY3VzdG9tZXJJZCArICcvZHJpdmVycy8nICsgaWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWROdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25MZXZlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpY2Vuc2VOdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHN1c3BlbmREcml2ZXIoY3VzdG9tZXJJZCwgeyBpZCwgYWN0aXZlIH0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBhdGNoKHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBjdXN0b21lcklkICsgJy9kcml2ZXJzLycgKyBpZCArICcvYWN0aXZlJywgeyBhY3RpdmUgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldExvZyhjdXNvdG1lcklkLCBpZCwgbW9udGgsIHllYXIpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB0b1NlY29uZHModGltZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGFydHMgPSB0aW1lLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoK3BhcnRzWzBdKSAqIDYwICogNjAgKyAoK3BhcnRzWzFdKSAqIDYwICsgKCtwYXJ0c1syXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG1vbWVudCgpLmRheSgwKS5tb250aChtb250aCkueWVhcih5ZWFyKS5mb3JtYXQoJ1lZWVkvTU0vREQnKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAuZ2V0KGAke3NlcnZlcn0vY3VzdG9tZXJzLyR7Y3Vzb3RtZXJJZH0vZHJpdmVycy8ke2lkfS9hY3Rpdml0eS8/ZGF0ZT0ke2RhdGV9YClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cgPSByZXMuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKG9iaikgPT4gb2JqLmVuZGVkQXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5kYXRlID0gYCR7bW9tZW50KG9iai5zdGFydGVkQXQpLmZvcm1hdCgnREQvTU0vWVlZWScpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zdGFydGVkQXQgPSBgJHttb21lbnQudXRjKG9iai5zdGFydGVkQXQpLmZvcm1hdCgnREQvTU0vWVlZWSBISDptbTpzcycpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5lbmRlZEF0ID0gYCR7bW9tZW50LnV0YyhvYmouZW5kZWRBdCkuZm9ybWF0KCdERC9NTS9ZWVlZIEhIOm1tOnNzJyl9YDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmRyaXZlclN0YXR1c0xvZ3MgJiYgb2JqLmRyaXZlclN0YXR1c0xvZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZHJpdmVyU3RhdHVzTG9ncyA9IG9iai5kcml2ZXJTdGF0dXNMb2dzLm1hcCgoc3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRhdGUgPSBgJHttb21lbnQudXRjKHN0YXR1cy5zdGFydGVkQXQpLmZvcm1hdCgnREQvTU0vWVlZWScpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnN0YXJ0ZWRBdCA9IGAke21vbWVudC51dGMoc3RhdHVzLnN0YXJ0ZWRBdCkuY2FsZW5kYXIoKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5lbmRlZEF0ID0gYCR7bW9tZW50LnV0YyhzdGF0dXMuZW5kZWRBdCkuY2FsZW5kYXIoKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQWN0aXZpdHkgPSB0aGlzLmxvZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnRvdGFsVGltZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRvU2Vjb25kcyhvYmoudG90YWxUaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGIpID0+IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhICsgYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEFjdGl2aXR5ID0gbW9tZW50KCkuaG91cnMoMCkubWludXRlcygwKS5zZWNvbmRzKHRoaXMudG90YWxBY3Rpdml0eSkuZm9ybWF0KCdISDptbTpzcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWFyY2goaWQsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGlkICsgJy9kcml2ZXJzJyArICcvP3E9JyArIHF1ZXJ5KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFwRHJpdmVycyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdldERyaXZlcnMsXG4gICAgICAgICAgICAgICAgYWRkTmV3RHJpdmVyLFxuICAgICAgICAgICAgICAgIGVkaXREcml2ZXIsXG4gICAgICAgICAgICAgICAgc3VzcGVuZERyaXZlcixcbiAgICAgICAgICAgICAgICBnZXRMb2csXG4gICAgICAgICAgICAgICAgZ2V0RHJpdmVyQnlJRCxcbiAgICAgICAgICAgICAgICBzZWFyY2hcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcblxuLyogXG4gICAgQFN1bW1hcnk6IEVycm9yIEhhbmRsaW5nIEludGVyY2VwdG9yIFxuICAgIEBEZXNjcmlwdGlvbjogSW4gY2hhcmdlIG9mIGludGVyY2VwdGluZyByZXNwb25zZXMgYW5kIGRldGVybWluZSBpZiB0aGVpciBhbiBlcnJvci5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLmZhY3RvcnkoJ2Vycm9ySGFuZGxlckludGVyY2VwdG9yJywgWydlcnJvckhhbmRsZXJTZXJ2aWNlJyxcbiAgICAgICAgZnVuY3Rpb24oZXJyb3JIYW5kbGVyU2VydmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZUVycm9yOiAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnJvckhhbmRsZXJTZXJ2aWNlLmhhbmRsZShlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBQcm9taXNlLnJlc29sdmUoZXJyKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiBQcm9taXNlLnJlamVjdChlcnIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5dKTtcblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuc2VydmljZSgnZXJyb3JIYW5kbGVyU2VydmljZScsIFsnJGluamVjdG9yJyxcbiAgICAgICAgZnVuY3Rpb24oJGluamVjdG9yKSB7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGhhbmRsZShlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzd2FuZ3VsYXIgPSAkaW5qZWN0b3IuZ2V0KCdzd2FuZ3VsYXInKTsgLy8gYXZvaWQgY2lyY3VsYXIgZGVwZW5kZW5jeVxuICAgICAgICAgICAgICAgIGNvbnN0ICRzdGF0ZSA9ICRpbmplY3Rvci5nZXQoJyRzdGF0ZScpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlcnIuc3RhdHVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgndW5hdXRob3JpemVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3YW5ndWxhci5vcGVuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbFRlbXBsYXRlOiAnYmFja29mZmljZS90cGwvNDAzLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TG9hZGVyT25Db25maXJtOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAoKSA9PiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dhbmd1bGFyLm9wZW4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sVGVtcGxhdGU6ICcvYmFja29mZmljZS90cGwvNDA0Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TG9hZGVyT25Db25maXJtOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAoKSA9PiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgnbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDA5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgnZHVwbGljYXRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1MDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDUwMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2FuZ3VsYXIub3Blbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxUZW1wbGF0ZTogJ2JhY2tvZmZpY2UvdHBsLzUwMi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0xvYWRlck9uQ29uZmlybTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogKCkgPT4ge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcbi8qIFxuICAgIEBTdW1tYXJ5OiBVc2VyIERhdGEgU2VydmljZSBcbiAgICBARGVzY3JpcHRpb246IEluIGNoYXJnZSBvZiBBUEkgcmVxdWVzdHMgYW5kIGRhdGEgcmVsYXRlZCB0aGUgdXNlciB0aGF0IGlzIG5vdyBsb2dnZWQgaW4gdG8gdGhlIGFwcC5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLnNlcnZpY2UoJ3VzZXJEYXRhU2VydmljZScsIFsnYXV0aFNlcnZpY2UnLCAnJHN0YXRlJywgJyRodHRwJywgJ0NPTkZJRycsXG4gICAgICAgIGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUsICRodHRwLCBDT05GSUcpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlcnZlciA9IENPTkZJRy5TRVJWRVI7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFVzZXJEYXRhKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5jaGVja0N1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VXNlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ21haW5TdGF0ZVNjcmVlbic6J2xvZ2luJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jdXJyZW50VXNlcixyZXMuZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9pc0FkbWluID0gaXNBZG1pbi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pc0FkbWluKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyLm1haW5TdGF0ZVNjcmVlbiA9ICdjdXN0b21lckxpc3QnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyLm1haW5TdGF0ZVNjcmVlbiA9ICdkcml2ZXJzTGlzdCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiAkc3RhdGUuZ28oJ2xvZ2luJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBpc0N1c3RvbWVyKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRVc2VyLnJvbGVzLmluY2x1ZGVzKCdDVVNUT01FUicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBpc0FkbWluKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRVc2VyLnJvbGVzLmluY2x1ZGVzKCdBRE1JTicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiB1cGRhdGVVc2VyTGFuZ3VhZ2UobGFuZykge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wYXRjaChzZXJ2ZXIgKyAnL3VzZXJzL2N1cnJlbnQnLCB7bGFuZ3VhZ2U6IGxhbmd9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzZXRVc2VyRGF0YSxcbiAgICAgICAgICAgICAgICBpc0N1c3RvbWVyLFxuICAgICAgICAgICAgICAgIGlzQWRtaW4sXG4gICAgICAgICAgICAgICAgdXBkYXRlVXNlckxhbmd1YWdlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgXSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLmRpcmVjdGl2ZSgnYWN0aXZpdHlMb2cnLCBhY3Rpdml0eUxvZ0NvbmZpZyk7XG5cbmZ1bmN0aW9uIGFjdGl2aXR5TG9nQ29uZmlnKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL2pzL2RpcmVjdGl2ZXMvYWN0aXZpdHlMb2cvYWN0aXZpdHlMb2cuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6IFsnJHN0YXRlJywgJyRzdGF0ZVBhcmFtcycsICdkcml2ZXJzRGF0YVNlcnZpY2UnLCBhY3Rpdml0eUxvZ0NvbnRyb2xsZXJdLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBhY3Rpdml0eUxvZ0NvbnRyb2xsZXIoJHN0YXRlLCAkc3RhdGVQYXJhbXMsIGRyaXZlcnNEYXRhU2VydmljZSkge1xuICAgIGNvbnN0IG1vbnRocyA9IFtcbiAgICAgICAgJ9eZ16DXldeQ16gnLFxuICAgICAgICAn16TXkdeo15XXkNeoJyxcbiAgICAgICAgJ9ee16jXpScsXG4gICAgICAgICfXkNek16jXmdecJyxcbiAgICAgICAgJ9ee15DXmScsXG4gICAgICAgICfXmdeV16DXmScsXG4gICAgICAgICfXmdeV15zXmScsXG4gICAgICAgICfXkNeV15LXldeh15gnLFxuICAgICAgICAn16HXpNeY157XkdeoJyxcbiAgICAgICAgJ9eQ15XXp9eY15XXkdeoJyxcbiAgICAgICAgJ9eg15XXkdee15HXqCcsXG4gICAgICAgICfXk9em157XkdeoJ1xuICAgIF07XG5cbiAgICAkc3RhdGVQYXJhbXMubW9udGggPSBOdW1iZXIoJHN0YXRlUGFyYW1zLm1vbnRoKTtcbiAgICAkc3RhdGVQYXJhbXMueWVhciA9IE51bWJlcigkc3RhdGVQYXJhbXMueWVhcik7XG5cbiAgICB0aGlzLmxvZyA9IGRyaXZlcnNEYXRhU2VydmljZS5sb2c7XG4gICAgdGhpcy50b3RhbEFjdGl2aXR5ID0gZHJpdmVyc0RhdGFTZXJ2aWNlLnRvdGFsQWN0aXZpdHk7XG5cbiAgICB0aGlzLmN1cnJlbnREYXRlID0gYCR7bW9udGhzWyRzdGF0ZVBhcmFtcy5tb250aF19ICR7JHN0YXRlUGFyYW1zLnllYXJ9YDtcbiAgICB0aGlzLmlzRnV0dXJlRGF0ZSA9ICRzdGF0ZVBhcmFtcy5tb250aCA+PSBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgJiYgJHN0YXRlUGFyYW1zLnllYXIgPj0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICAgIHRoaXMuaXNQYXN0RGF0ZSA9ICRzdGF0ZVBhcmFtcy55ZWFyIDw9IDIwMTU7XG4gICAgdGhpcy5leHBhbmRlZFJvd3MgPSB7fTtcblxuICAgIHRoaXMubmV4dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZCA9IG5ldyBEYXRlKCRzdGF0ZVBhcmFtcy55ZWFyLCAkc3RhdGVQYXJhbXMubW9udGggKyAxLCAxKTtcbiAgICAgICAgJHN0YXRlLmdvKCdhY3Rpdml0eUxvZycsIHsgbW9udGg6IGQuZ2V0TW9udGgoKSwgeWVhcjogZC5nZXRGdWxsWWVhcigpIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnByZXYgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgkc3RhdGVQYXJhbXMueWVhciwgJHN0YXRlUGFyYW1zLm1vbnRoIC0gMSwgMSk7XG4gICAgICAgICRzdGF0ZS5nbygnYWN0aXZpdHlMb2cnLCB7IG1vbnRoOiBkLmdldE1vbnRoKCksIHllYXI6IGQuZ2V0RnVsbFllYXIoKSB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5leHBhbmQgPSAobG9nKSA9PiB7XG4gICAgICAgIGxvZy5leHBhbmRlZCA9ICFsb2cuZXhwYW5kZWQ7XG4gICAgfTtcbn1cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuZGlyZWN0aXZlKCdhcHBEYXRhdGFibGUnLCBhcHBEYXRhdGFibGVDb25maWcpO1xuXG5mdW5jdGlvbiBhcHBEYXRhdGFibGVDb25maWcoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIGRhdGE6ICc9JyxcbiAgICAgICAgICAgIHRhYmxldGl0bGU6ICc9JyxcbiAgICAgICAgICAgIHRodGl0bGVzOiAnPScsXG4gICAgICAgICAgICB0ZGRhdGE6ICc9JyxcbiAgICAgICAgICAgIGdvdG86ICc9JyxcbiAgICAgICAgICAgIHR5cGU6ICc9JyxcbiAgICAgICAgICAgIHBhZ2luYXRpb246ICc9JyxcbiAgICAgICAgICAgIHVzZXJJZDogJz0nLFxuICAgICAgICAgICAgdHJhbnNsYXRlRGF0YTogJz0nXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS9qcy9kaXJlY3RpdmVzL2FwcERhdGF0YWJsZS9hcHBEYXRhdGFibGUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgJyRzdGF0ZScsICckdGltZW91dCcsICdkcml2ZXJzRGF0YVNlcnZpY2UnLCAnYmVhY29uc0RhdGFTZXJ2aWNlJywgYXBwRGF0YXRhYmxlQ29udHJvbGxlcl0sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGFwcERhdGF0YWJsZUNvbnRyb2xsZXIoJHNjb3BlLCAkc3RhdGUsICR0aW1lb3V0LCBkcml2ZXJzRGF0YVNlcnZpY2UsIGJlYWNvbnNEYXRhU2VydmljZSkge1xuXG4gICAgLy8gUHV0IHByb3BlcnRpZXMgb24gdGhlIGNvbnRyb2xsZXJcbiAgICB0aGlzLmRhdGEgPSAkc2NvcGUuZGF0YTtcbiAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmRhdGEuY29udGVudCB8fCB0aGlzLmRhdGE7XG4gICAgdGhpcy50aHRpdGxlcyA9ICRzY29wZS50aHRpdGxlcztcbiAgICB0aGlzLnRkZGF0YSA9ICRzY29wZS50ZGRhdGE7XG4gICAgdGhpcy50YWJsZXRpdGxlID0gJHNjb3BlLnRhYmxldGl0bGU7XG4gICAgdGhpcy50cmFuc2xhdGVEYXRhID0gJHNjb3BlLnRyYW5zbGF0ZURhdGE7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgJHNjb3BlLiR3YXRjaCgndGFibGV0aXRsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnRhYmxldGl0bGUgPSAkc2NvcGUudGFibGV0aXRsZTtcbiAgICB9KTtcblxuICAgICRzY29wZS4kd2F0Y2goJ3RodGl0bGVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQudGh0aXRsZXMgPSAkc2NvcGUudGh0aXRsZXM7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBAVE9ETyBtb3ZlIHRvIGhlbHBlclxuICAgICAqL1xuICAgIHRoaXMudG90YWxQYWdlcyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIEFycmF5XG4gICAgICAgICAgICAuYXBwbHkoMCwgQXJyYXkodGhpcy5kYXRhLnRvdGFsUGFnZXMpKVxuICAgICAgICAgICAgLm1hcChpbmRleCA9PiBpbmRleCk7XG4gICAgfTtcblxuICAgIHRoaXMuZ29UbyA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgIGlmICgkc2NvcGUuZ290bykge1xuICAgICAgICAgICAgJHN0YXRlLmdvKCRzY29wZS5nb3RvLnN0YXRlLCB7XG4gICAgICAgICAgICAgICAgWyRzY29wZS5nb3RvLmtleV06IHRoaXMuY29udGVudFtpbmRleF1bJHNjb3BlLmdvdG8ua2V5XVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5nb1RvUGFnZSA9IChwYWdlTnVtYmVyKSA9PiB7XG4gICAgICAgIHN3aXRjaCAoJHNjb3BlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2RyaXZlcnMnOlxuICAgICAgICAgICAgICAgICAgICBkcml2ZXJzRGF0YVNlcnZpY2UuZ2V0RHJpdmVycygkc2NvcGUudXNlcklkLCBwYWdlTnVtYmVyKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2JlYWNvbnMnOlxuICAgICAgICAgICAgICAgICAgICBiZWFjb25zRGF0YVNlcnZpY2UuZ2V0QmVhY29ucygkc2NvcGUudXNlcklkLCBwYWdlTnVtYmVyKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xufSJdfQ==
