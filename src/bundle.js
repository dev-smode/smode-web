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
    'SERVER': 'http://52.35.199.200:80', //PROD
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQTs7OztBQUtBO0FBQ0EsSUFBTSxjQUFjLFFBQVEsTUFBUixDQUFlLGFBQWYsRUFBOEIsQ0FDOUMsV0FEOEMsRUFFOUMsY0FGOEMsRUFHOUMsWUFIOEMsRUFJOUMsYUFKOEMsRUFLOUMsYUFMOEMsRUFNOUMscUJBTjhDLEVBTzlDLGVBUDhDLEVBUTlDLGdDQVI4QyxFQVM5QyxXQVQ4QyxFQVU5Qyw2QkFWOEMsRUFXOUMsV0FYOEMsRUFZOUMsd0JBWjhDLEVBYTlDLGFBYjhDLENBQTlCLENBQXBCOztBQWdCQSxZQUFZLFFBQVosQ0FBcUIsUUFBckIsRUFBK0I7QUFDM0I7QUFDQSxjQUFVLHlCQUZpQixFQUVTO0FBQ3BDLDBCQUFzQixDQUNsQjtBQUNJLGNBQU0sU0FEVjtBQUVJLGVBQU8sQ0FGWDtBQUdJLGNBQU07QUFIVixLQURrQixFQU1sQjtBQUNJLGNBQU0sU0FEVjtBQUVJLGVBQU8sQ0FGWDtBQUdJLGNBQU07QUFIVixLQU5rQixFQVdsQjtBQUNJLGNBQU0sU0FEVjtBQUVJLGVBQU8sQ0FGWDtBQUdJLGNBQU07QUFIVixLQVhrQixFQWdCbEI7QUFDSSxjQUFNLFNBRFY7QUFFSSxlQUFPLENBRlg7QUFHSSxjQUFNO0FBSFYsS0FoQmtCLENBSEs7QUF3QjNCLGlCQUFhLENBQ1Q7QUFDSSxlQUFPLE9BRFg7QUFFSSxjQUFNLGNBRlY7QUFHSSxtQkFBVztBQUhmLEtBRFMsRUFNVDtBQUNJLGVBQU8sT0FEWDtBQUVJLGNBQU0sY0FGVjtBQUdJLG1CQUFXO0FBSGYsS0FOUyxFQVdUO0FBQ0ksZUFBTyxPQURYO0FBRUksY0FBTSxRQUZWO0FBR0ksbUJBQVc7QUFIZixLQVhTLEVBZ0JUO0FBQ0ksZUFBTyxPQURYO0FBRUksY0FBTSxRQUZWO0FBR0ksbUJBQVc7QUFIZixLQWhCUztBQXhCYyxDQUEvQjs7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U0FGRixDQUFQO0FBR0gsS0FKRDs7QUFNQSxTQUFLLElBQUwsR0FBWSxVQUFTLEtBQVQsRUFBZ0I7QUFDeEIsWUFBSSxPQUFPLElBQVgsRUFBaUI7QUFDYixtQkFBTyxFQUFQLENBQVUsT0FBTyxJQUFQLENBQVksS0FBdEIsc0JBQ0ssT0FBTyxJQUFQLENBQVksR0FEakIsRUFDdUIsS0FBSyxPQUFMLENBQWEsS0FBYixFQUFvQixPQUFPLElBQVAsQ0FBWSxHQUFoQyxDQUR2QjtBQUdIO0FBQ0osS0FORDs7QUFRQSxTQUFLLFFBQUwsR0FBZ0IsVUFBQyxVQUFELEVBQWdCO0FBQzVCLGdCQUFRLE9BQU8sSUFBZjtBQUNJLGlCQUFLLFNBQUw7QUFDUSxtQ0FBbUIsVUFBbkIsQ0FBOEIsT0FBTyxNQUFyQyxFQUE2QyxVQUE3QyxFQUF5RCxJQUF6RCxDQUE4RCxVQUFDLE1BQUQsRUFBWTtBQUN0RSw0QkFBSyxJQUFMLEdBQVksTUFBWjtBQUNILGlCQUZEO0FBR0o7O0FBRUosaUJBQUssU0FBTDtBQUNRLG1DQUFtQixVQUFuQixDQUE4QixPQUFPLE1BQXJDLEVBQTZDLFVBQTdDLEVBQXlELElBQXpELENBQThELFVBQUMsTUFBRCxFQUFZO0FBQ3RFLDRCQUFLLElBQUwsR0FBWSxNQUFaO0FBQ0gsaUJBRkQ7QUFHSjtBQVhSO0FBYUgsS0FkRDtBQWVIIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKipcclxuTWV0cm9uaWMgQW5ndWxhckpTIEFwcCBNYWluIFNjcmlwdFxyXG4qKiovXHJcblxyXG5cclxuLyogTWV0cm9uaWMgQXBwICovXHJcbmNvbnN0IE1ldHJvbmljQXBwID0gYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJywgW1xyXG4gICAgJ3VpLnJvdXRlcicsXHJcbiAgICAndWkuYm9vdHN0cmFwJyxcclxuICAgICduZ1Nhbml0aXplJyxcclxuICAgICdhbmd1bGFyLWp3dCcsXHJcbiAgICAnbmFpZi5iYXNlNjQnLFxyXG4gICAgJ2FuZ3VsYXJNb2RhbFNlcnZpY2UnLFxyXG4gICAgJ2FuZ3VsYXItbGFkZGEnLFxyXG4gICAgJ2FuZ3VsYXItcHJvZ3Jlc3MtYnV0dG9uLXN0eWxlcycsXHJcbiAgICAnc3dhbmd1bGFyJyxcclxuICAgICd1aS5ib290c3RyYXAuZGF0ZXRpbWVwaWNrZXInLFxyXG4gICAgJ25nQW5pbWF0ZScsXHJcbiAgICAncGFzY2FscHJlY2h0LnRyYW5zbGF0ZScsXHJcbiAgICAndmNSZWNhcHRjaGEnXHJcbl0pO1xyXG5cclxuTWV0cm9uaWNBcHAuY29uc3RhbnQoJ0NPTkZJRycsIHtcclxuICAgIC8vICdTRVJWRVInOiAnaHR0cDovLzE5Mi4xNjguMC4yNjo4MDgwJywvL0RFVlxyXG4gICAgJ1NFUlZFUic6ICdodHRwOi8vNTIuMzUuMTk5LjIwMDo4MCcsLy9QUk9EXHJcbiAgICAnRFJJVkVSX1BFUk1JU1NJT05TJzogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ0xFVkVMX0EnLFxyXG4gICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgbmFtZTogJ0RSSVZFUl9GT1JNLkRSSVZFUl9QRVJNSVNTSU9OUy5MRVZFTF9BJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAnTEVWRUxfQicsXHJcbiAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiAnRFJJVkVSX0ZPUk0uRFJJVkVSX1BFUk1JU1NJT05TLkxFVkVMX0InXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdMRVZFTF9DJyxcclxuICAgICAgICAgICAgdmFsdWU6IDIsXHJcbiAgICAgICAgICAgIG5hbWU6ICdEUklWRVJfRk9STS5EUklWRVJfUEVSTUlTU0lPTlMuTEVWRUxfQydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ0xFVkVMX0QnLFxyXG4gICAgICAgICAgICB2YWx1ZTogMyxcclxuICAgICAgICAgICAgbmFtZTogJ0RSSVZFUl9GT1JNLkRSSVZFUl9QRVJNSVNTSU9OUy5MRVZFTF9EJ1xyXG4gICAgICAgIH1dLFxyXG4gICAgJ0xBTkdVQUdFUyc6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlOiAnRU5fVVMnLFxyXG4gICAgICAgICAgICBuYW1lOiAnRW5nbGlzaCAodXMpJyxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiAnbHRyJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTogJ0VOX1VLJyxcclxuICAgICAgICAgICAgbmFtZTogJ0VuZ2xpc2ggKHVrKScsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2x0cidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWU6ICdIRV9JTCcsXHJcbiAgICAgICAgICAgIG5hbWU6ICdIZWJyZXcnLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb246ICdydGwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlOiAnREVfREUnLFxyXG4gICAgICAgICAgICBuYW1lOiAnR2VybWFuJyxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiAnbHRyJ1xyXG4gICAgICAgIH1cclxuICAgIF1cclxufSk7XHJcblxyXG5NZXRyb25pY0FwcC5jb25zdGFudCgndWlEYXRldGltZVBpY2tlckNvbmZpZycsIHtcclxuICAgIGRhdGVGb3JtYXQ6ICdkZC1NTS15eXl5JyxcclxuICAgIGRlZmF1bHRUaW1lOiAnMDA6MDA6MDAnLFxyXG4gICAgaHRtbDVUeXBlczoge1xyXG4gICAgICAgIGRhdGU6ICdkZC1NTS15eXl5JyxcclxuICAgICAgICAnZGF0ZXRpbWUtbG9jYWwnOiAneXl5eS1NTS1kZFRISDptbTpzcy5zc3MnLFxyXG4gICAgICAgICdtb250aCc6ICdNTS15eXl5J1xyXG4gICAgfSxcclxuICAgIGluaXRpYWxQaWNrZXI6ICdkYXRlJyxcclxuICAgIHJlT3BlbkRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgZW5hYmxlRGF0ZTogdHJ1ZSxcclxuICAgIGVuYWJsZVRpbWU6IGZhbHNlLFxyXG4gICAgYnV0dG9uQmFyOiB7XHJcbiAgICAgICAgc2hvdzogZmFsc2UsXHJcbiAgICAgICAgbm93OiB7XHJcbiAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgIHRleHQ6ICdOb3cnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b2RheToge1xyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICB0ZXh0OiAnVG9kYXknXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGVhcjoge1xyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICB0ZXh0OiAnQ2xlYXInXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRlOiB7XHJcbiAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgIHRleHQ6ICdEYXRlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGltZToge1xyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICB0ZXh0OiAnVGltZSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsb3NlOiB7XHJcbiAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgIHRleHQ6ICdDbG9zZSdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2xvc2VPbkRhdGVTZWxlY3Rpb246IHRydWUsXHJcbiAgICBjbG9zZU9uVGltZU5vdzogdHJ1ZSxcclxuICAgIGFwcGVuZFRvQm9keTogZmFsc2UsXHJcbiAgICBhbHRJbnB1dEZvcm1hdHM6IFtdLFxyXG4gICAgbmdNb2RlbE9wdGlvbnM6IHt9LFxyXG4gICAgc2F2ZUFzOiBmYWxzZSxcclxuICAgIHJlYWRBczogZmFsc2UsXHJcbn0pO1xyXG5cclxuTWV0cm9uaWNBcHAuY29uZmlnKFsnand0T3B0aW9uc1Byb3ZpZGVyJywgJyRodHRwUHJvdmlkZXInLCAoand0T3B0aW9uc1Byb3ZpZGVyLCAkaHR0cFByb3ZpZGVyKSA9PiB7XHJcbiAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLndpdGhDcmVkZW50aWFscyA9IHRydWU7XHJcblxyXG4gICAgand0T3B0aW9uc1Byb3ZpZGVyLmNvbmZpZyh7XHJcbiAgICAgICAgYXV0aFByZWZpeDogJycsXHJcbiAgICAgICAgd2hpdGVMaXN0ZWREb21haW5zOidsb2NhbGhvc3QnLFxyXG4gICAgICAgIHRva2VuR2V0dGVyOiAoKSA9PiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSxcclxuICAgICAgICB1bmF1dGhlbnRpY2F0ZWRSZWRpcmVjdG9yOiBbJyRzdGF0ZScsICgkc3RhdGUpID0+IHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xyXG4gICAgICAgIH1dXHJcbiAgICB9KTtcclxuXHJcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdqd3RJbnRlcmNlcHRvcicpO1xyXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnYXV0aEludGVyY2VwdG9yJyk7XHJcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdlcnJvckhhbmRsZXJJbnRlcmNlcHRvcicpO1xyXG59XSk7XHJcblxyXG5NZXRyb25pY0FwcC5jb25maWcoWyckdHJhbnNsYXRlUHJvdmlkZXInLCBmdW5jdGlvbigkdHJhbnNsYXRlUHJvdmlkZXIpIHtcclxuICAgICR0cmFuc2xhdGVQcm92aWRlci51c2VTdGF0aWNGaWxlc0xvYWRlcih7XHJcbiAgICAgICAgcHJlZml4OiAnYXNzZXRzL2xhbmd1YWdlcy8nLFxyXG4gICAgICAgIHN1ZmZpeDogJy5qc29uJ1xyXG4gICAgfSk7XHJcbiAgICAvKlxyXG4gICAgIEVOX1VTKFwiZW4tVVNcIiksXHJcbiAgICAgRU5fVUsoXCJlbi1HQlwiKSxcclxuICAgICBIRV9JTChcImhlLUlMXCIpLFxyXG4gICAgIERFX0RFKFwiZGUtREVcIik7XHJcbiAgICAgKi9cclxuICAgIGNvbnN0IGxhbmdNYXAgPSB7XHJcbiAgICAgICAgJ0VOX1VTJzogJ2VuLVVTJyxcclxuICAgICAgICAnRU5fVUsnOiAnZW4tR0InLFxyXG4gICAgICAgICdISV9JTCc6ICdoZS1pbCcsXHJcbiAgICAgICAgJ0RFX0RFJzogJ2RlLWRlJ1xyXG4gICAgfTtcclxuICAgICR0cmFuc2xhdGVQcm92aWRlci51c2VTYW5pdGl6ZVZhbHVlU3RyYXRlZ3kobnVsbCk7XHJcbiAgICAvLyR0cmFuc2xhdGVQcm92aWRlci5yZWdpc3RlckF2YWlsYWJsZUxhbmd1YWdlS2V5cyhbJ2VuLVVTJywgJ2VuLUdCJywgJ2hlLWlsJywgJ2RlLWRlJ10sIGxhbmdNYXApO1xyXG4gICAgJHRyYW5zbGF0ZVByb3ZpZGVyLnByZWZlcnJlZExhbmd1YWdlKCdlbi1VUycpO1xyXG4gICAgJHRyYW5zbGF0ZVByb3ZpZGVyLmZhbGxiYWNrTGFuZ3VhZ2UoJ2VuLVVTJyk7XHJcbn1dKTtcclxuXHJcbk1ldHJvbmljQXBwLmZhY3RvcnkoJ3NldHRpbmdzJywgWyckcm9vdFNjb3BlJywgKCRyb290U2NvcGUpID0+IHtcclxuICAgIC8vIHN1cHBvcnRlZCBsYW5ndWFnZXNcclxuICAgIGNvbnN0IHNldHRpbmdzID0ge1xyXG4gICAgICAgIGxheW91dDoge1xyXG4gICAgICAgICAgICBwYWdlU2lkZWJhckNsb3NlZDogZmFsc2UsIC8vIHNpZGViYXIgbWVudSBzdGF0ZVxyXG4gICAgICAgICAgICBwYWdlQ29udGVudFdoaXRlOiB0cnVlLCAvLyBzZXQgcGFnZSBjb250ZW50IGxheW91dFxyXG4gICAgICAgICAgICBwYWdlQm9keVNvbGlkOiBmYWxzZSwgLy8gc29saWQgYm9keSBjb2xvciBzdGF0ZVxyXG4gICAgICAgICAgICBwYWdlQXV0b1Njcm9sbE9uTG9hZDogMTAwMCAvLyBhdXRvIHNjcm9sbCB0byB0b3Agb24gcGFnZSBsb2FkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3NldHNQYXRoOiAnLi4vYXNzZXRzJyxcclxuICAgICAgICBnbG9iYWxQYXRoOiAnLi4vYXNzZXRzL2dsb2JhbCcsXHJcbiAgICAgICAgbGF5b3V0UGF0aDogJy4uL2Fzc2V0cy9sYXlvdXRzL2xheW91dCcsXHJcbiAgICB9O1xyXG5cclxuICAgICRyb290U2NvcGUuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHJcbiAgICByZXR1cm4gc2V0dGluZ3M7XHJcbn1dKTtcclxuXHJcbi8qIFNldHVwIEFwcCBNYWluIENvbnRyb2xsZXIgKi9cclxuTWV0cm9uaWNBcHAuY29udHJvbGxlcignQXBwQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAoJHNjb3BlKSA9PiB7XHJcbiAgICAkc2NvcGUuJG9uKCckdmlld0NvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgLy9BcHAuaW5pdENvbXBvbmVudHMoKTsgLy8gaW5pdCBjb3JlIGNvbXBvbmVudHNcclxuICAgICAgICAvL0xheW91dC5pbml0KCk7IC8vICBJbml0IGVudGlyZSBsYXlvdXQoaGVhZGVyLCBmb290ZXIsIHNpZGViYXIsIGV0Yykgb24gcGFnZSBsb2FkIGlmIHRoZSBwYXJ0aWFscyBpbmNsdWRlZCBpbiBzZXJ2ZXIgc2lkZSBpbnN0ZWFkIG9mIGxvYWRpbmcgd2l0aCBuZy1pbmNsdWRlIGRpcmVjdGl2ZVxyXG4gICAgfSk7XHJcbn1dKTtcclxuXHJcbi8qIFNldHVwIExheW91dCBQYXJ0IC0gSGVhZGVyICovXHJcbk1ldHJvbmljQXBwLmNvbnRyb2xsZXIoJ0hlYWRlckNvbnRyb2xsZXInLCBbJyRzY29wZScsICgkc2NvcGUpID0+IHtcclxuICAgICRzY29wZS4kb24oJyRpbmNsdWRlQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgICAgICBMYXlvdXQuaW5pdEhlYWRlcigpOyAvLyBpbml0IGhlYWRlclxyXG4gICAgfSk7XHJcbn1dKTtcclxuXHJcblxyXG5NZXRyb25pY0FwcC5jb250cm9sbGVyKCdTaWRlYmFyQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ3VzZXJEYXRhU2VydmljZScsICgkc2NvcGUpID0+IHtcclxuICAgICRzY29wZS4kb24oJyRpbmNsdWRlQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgICAgICBMYXlvdXQuaW5pdFNpZGViYXIoKTsgLy8gaW5pdCBzaWRlYmFyXHJcbiAgICB9KTtcclxufV0pO1xyXG5cclxuTWV0cm9uaWNBcHAuY29udHJvbGxlcignQmFja29mZmljZUNvbnRyb2xsZXInLCBbJ3VzZXJEYXRhU2VydmljZScsICckc2NvcGUnLCAnJHN0YXRlJywgJ0NPTkZJRycsICckdHJhbnNsYXRlJywgKHVzZXJEYXRhU2VydmljZSwgJHNjb3BlLCAkc3RhdGUsIENPTkZJRywgJHRyYW5zbGF0ZSkgPT4ge1xyXG4gICAgJHN0YXRlLmdvKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5tYWluU3RhdGVTY3JlZW4pO1xyXG4gICAgJHNjb3BlLmlzQ3VzdG9tZXIgPSB1c2VyRGF0YVNlcnZpY2UuaXNDdXN0b21lcigpO1xyXG4gICAgJHNjb3BlLmlzQWRtaW4gPSB1c2VyRGF0YVNlcnZpY2UuaXNBZG1pbigpO1xyXG4gICAgJHNjb3BlLmN1cnJlbnRVc2VyID0gdXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyO1xyXG5cclxuICAgIF9zZXREaXJlY3Rpb24oKTtcclxuICAgIGNvbnN0IGxhbmdNYXAgPSB7XHJcbiAgICAgICAgJ0VOX1VTJzogJ2VuLVVTJyxcclxuICAgICAgICAnRU5fVUsnOiAnZW4tR0InLFxyXG4gICAgICAgICdIRV9JTCc6ICdoZS1JTCcsXHJcbiAgICAgICAgJ0RFX0RFJzogJ2RlLURFJ1xyXG4gICAgfTtcclxuICAgICR0cmFuc2xhdGUudXNlKGxhbmdNYXBbJHNjb3BlLmN1cnJlbnRVc2VyLmxhbmd1YWdlXSk7XHJcbiAgICAkc2NvcGUubGFuZ3VhZ2VzID0gQ09ORklHLkxBTkdVQUdFUztcclxuICAgICRzY29wZS5jaG9vc2VMYW5ndWFnZSA9ICgpID0+IHtcclxuICAgICAgICBpZiAoIWxhbmdNYXBbJHNjb3BlLmN1cnJlbnRVc2VyLmxhbmd1YWdlXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgICR0cmFuc2xhdGUudXNlKGxhbmdNYXBbJHNjb3BlLmN1cnJlbnRVc2VyLmxhbmd1YWdlXSkudGhlbigoKT0+IHtcclxuICAgICAgICAgICAgX3NldERpcmVjdGlvbigpO1xyXG4gICAgICAgICAgICB1c2VyRGF0YVNlcnZpY2UudXBkYXRlVXNlckxhbmd1YWdlKCRzY29wZS5jdXJyZW50VXNlci5sYW5ndWFnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIF9zZXREaXJlY3Rpb24oKSB7XHJcbiAgICAgICAgJHNjb3BlLnNldHRpbmdzLmRpcmVjdGlvbiA9IENPTkZJRy5MQU5HVUFHRVMuZmlsdGVyKChsYW5nKSA9PiBsYW5nLnZhbHVlID09IHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5sYW5ndWFnZSk7XHJcbiAgICAgICAgaWYgKCRzY29wZS5zZXR0aW5ncy5kaXJlY3Rpb24ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2V0dGluZ3MuZGlyZWN0aW9uID0gJHNjb3BlLnNldHRpbmdzLmRpcmVjdGlvblswXS5kaXJlY3Rpb247XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNldHRpbmdzLmRpcmVjdGlvbiA9ICdydGwnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1dKTtcclxuXHJcbi8qIFNldHVwIFJvdW50aW5nIEZvciBBbGwgUGFnZXMgKi9cclxuTWV0cm9uaWNBcHAuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJywgKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpID0+IHtcclxuICAgIC8vIFJlZGlyZWN0IGFueSB1bm1hdGNoZWQgdXJsXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvYmFja29mZmljZScpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGlzU3RhdGVQYXJhbXMoJHN0YXRlUGFyYW1zLCAkcSkge1xyXG4gICAgICAgIGlmICgkc3RhdGVQYXJhbXMuaWQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAuc3RhdGUoJ2xvZ2luJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvbG9naW4uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbG9nb3V0Jywge1xyXG4gICAgICAgICAgICB1cmw6ICcvbG9nb3V0JyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogWyckc3RhdGUnLCAnJHEnLCAndXNlckRhdGFTZXJ2aWNlJywgKCRzdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Rva2VuJyk7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2JhY2tvZmZpY2UnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9iYWNrb2ZmaWNlJyxcclxuICAgICAgICAgICAgLy8gYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2JhY2tvZmZpY2Uvdmlld3MvYmFja29mZmljZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0JhY2tvZmZpY2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlc0xvZ2luOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nLFxyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJ1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBzZXRVc2VyRGF0YTogdXNlckRhdGFTZXJ2aWNlID0+IHVzZXJEYXRhU2VydmljZS5zZXRVc2VyRGF0YSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIERhc2hib2FyZFxyXG4gICAgICAgIC5zdGF0ZSgnZGFzaGJvYXJkJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2JhY2tvZmZpY2UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvZGFzaGJvYXJkLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRGFzaGJvYXJkQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgZ2V0U3RhdHM6IGRhc2hib2FyZFNlcnZpY2UgPT4gZGFzaGJvYXJkU2VydmljZS5nZXRTdGF0cygpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nLFxyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2N1c3RvbWVyTGlzdCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2N1c3RvbWVyTGlzdCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9jdXN0b21lckxpc3QuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDdXN0b21lckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIGdldEN1c3RvbWVyczogY3VzdG9tZXJzRGF0YVNlcnZpY2UgPT4gY3VzdG9tZXJzRGF0YVNlcnZpY2UuZ2V0Q3VzdG9tZXJzKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhZGROZXdDdXN0b21lcicsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2FkZE5ld0N1c3RvbWVyJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2FkZE5ld0N1c3RvbWVyLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQ3VzdG9tZXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2VkaXRDdXN0b21lcicsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2VkaXRDdXN0b21lci86aWQnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvYWRkTmV3Q3VzdG9tZXIuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDdXN0b21lckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgaWQ6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgaXNTdGF0ZVBhcmFtcyxcclxuICAgICAgICAgICAgICAgIGdldEN1c3RvbWVyczogKGN1c3RvbWVyc0RhdGFTZXJ2aWNlLCAkc3RhdGVQYXJhbXMpID0+IGN1c3RvbWVyc0RhdGFTZXJ2aWNlLmdldEN1c3RvbWVyQnlJRCgkc3RhdGVQYXJhbXMuaWQpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2FkZE5ld0RyaXZlcicsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2FkZE5ld0RyaXZlcicsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9hZGROZXdEcml2ZXIuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEcml2ZXJzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTicsXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnZWRpdERyaXZlcicsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2VkaXREcml2ZXIvOmlkJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2FkZE5ld0RyaXZlci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0RyaXZlcnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBwYXJhbToge1xyXG4gICAgICAgICAgICAgICAgaWQ6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgaXNTdGF0ZVBhcmFtcyxcclxuICAgICAgICAgICAgICAgIGdldERyaXZlckJ5SUQ6IChkcml2ZXJzRGF0YVNlcnZpY2UsICRzdGF0ZVBhcmFtcywgdXNlckRhdGFTZXJ2aWNlLCBzZXRVc2VyRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkcml2ZXJzRGF0YVNlcnZpY2UuZ2V0RHJpdmVyQnlJRCh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsICRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nLFxyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2RyaXZlcnNMaXN0Jywge1xyXG4gICAgICAgICAgICB1cmw6ICcvZHJpdmVyc0xpc3QvOmlkJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2RyaXZlcnNMaXN0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRHJpdmVyc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgaWQ6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgZ2V0RHJpdmVyczogKGRyaXZlcnNEYXRhU2VydmljZSwgJHN0YXRlUGFyYW1zLCB1c2VyRGF0YVNlcnZpY2UsIGN1c3RvbWVyc0RhdGFTZXJ2aWNlLCBzZXRVc2VyRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkc3RhdGVQYXJhbXMuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyc0RhdGFTZXJ2aWNlLmdldEN1c3RvbWVyQnlJRCgkc3RhdGVQYXJhbXMuaWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJpdmVyc0RhdGFTZXJ2aWNlLmdldERyaXZlcnMoJHN0YXRlUGFyYW1zLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHJpdmVyc0RhdGFTZXJ2aWNlLmdldERyaXZlcnModXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJyxcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhZGREcml2ZXJzUGhvbmVOdW1iZXJzJywge1xyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvcGhvbmVOdW1iZXJzJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL3Bob25lTnVtYmVycy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0N1c3RvbWVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUicsXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgncHJlZmVyZW5jZXMnLCB7XHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHVybDogJy9wcmVmZXJlbmNlcycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9wcmVmZXJlbmNlcy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0N1c3RvbWVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUicsXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYWN0aXZpdHlMb2cnLCB7XHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHVybDogJy9hY3Rpdml0eUxvZy86aWQvOm1vbnRoLzp5ZWFyJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2FjdGl2aXR5TG9nLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRHJpdmVyc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBtb250aDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHllYXI6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgZ2V0TG9nOiAoZHJpdmVyc0RhdGFTZXJ2aWNlLCAkc3RhdGVQYXJhbXMsIHVzZXJEYXRhU2VydmljZSwgc2V0VXNlckRhdGEpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgZHJpdmVyc0RhdGFTZXJ2aWNlLmdldExvZyh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsICRzdGF0ZVBhcmFtcy5pZCwgJHN0YXRlUGFyYW1zLm1vbnRoLCAkc3RhdGVQYXJhbXMueWVhcilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUicsXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYmVhY29uc0xpc3QnLCB7XHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHVybDogJy9iZWFjb25zTGlzdC86aWQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvYmVhY29uc0xpc3QuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdCZWFjb25zQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogbnVsbFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBnZXRCZWFjb25zOiAoYmVhY29uc0RhdGFTZXJ2aWNlLCB1c2VyRGF0YVNlcnZpY2UsICRzdGF0ZVBhcmFtcywgc2V0VXNlckRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHN0YXRlUGFyYW1zLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZWFjb25zRGF0YVNlcnZpY2UuZ2V0QmVhY29ucygkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJldHVybiB1c2VyRGF0YVNlcnZpY2Uuc2V0VXNlckRhdGEoKS50aGVuKCgpID0+IGJlYWNvbnNEYXRhU2VydmljZS5nZXRCZWFjb25zKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVhY29uc0RhdGFTZXJ2aWNlLmdldEJlYWNvbnModXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJyxcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhdHRhY2hCZWFjb24nLCB7XHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHVybDogJy9hdHRhY2hCZWFjb24vOmlkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2F0dGFjaEJlYWNvbi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0JlYWNvbnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBnZXRCZWFjb25zOiAoYmVhY29uc0RhdGFTZXJ2aWNlLCB1c2VyRGF0YVNlcnZpY2UsIHNldFVzZXJEYXRhKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXJEYXRhU2VydmljZS5zZXRVc2VyRGF0YSgpLnRoZW4oKCkgPT5cclxuICAgICAgICAgICAgICAgICAgICBiZWFjb25zRGF0YVNlcnZpY2UuZ2V0QmVhY29ucyh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nLFxyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2VkaXRCZWFjb24nLCB7XHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHVybDogJy9hdHRhY2hCZWFjb24vOmlkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2F0dGFjaEJlYWNvbi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0JlYWNvbnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGlkOiBudWxsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nLFxyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbn1dKTtcclxuXHJcbi8qIEluaXQgZ2xvYmFsIHNldHRpbmdzIGFuZCBydW4gdGhlIGFwcCAqL1xyXG5NZXRyb25pY0FwcC5ydW4oWyckcm9vdFNjb3BlJywgJ3NldHRpbmdzJywgJyRzdGF0ZScsICdhdXRoTWFuYWdlcicsXHJcbiAgJyRodHRwJyxcclxuICAoJHJvb3RTY29wZSwgc2V0dGluZ3MsICRzdGF0ZSwgYXV0aE1hbmFnZXIpID0+IHtcclxuICAgICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlOyAvLyBzdGF0ZSB0byBiZSBhY2Nlc3NlZCBmcm9tIHZpZXdcclxuICAgICRyb290U2NvcGUuJHNldHRpbmdzID0gc2V0dGluZ3M7IC8vIHN0YXRlIHRvIGJlIGFjY2Vzc2VkIGZyb20gdmlld1xyXG5cclxuICAgIC8vIGNoZWNrIGp3dCBvbiByZWZyZXNoXHJcbiAgICBhdXRoTWFuYWdlci5jaGVja0F1dGhPblJlZnJlc2goKTtcclxuICAgIGF1dGhNYW5hZ2VyLnJlZGlyZWN0V2hlblVuYXV0aGVudGljYXRlZCgpO1xyXG5cclxuICAgICRyb290U2NvcGUuJG9uKCd0b2tlbkhhc0V4cGlyZWQnLCAoKSA9PiAkc3RhdGUuZ28oJ2xvZ291dCcpKTtcclxufV0pO1xyXG5cclxuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5jb250cm9sbGVyKCdCZWFjb25zQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRzdGF0ZVBhcmFtcycsICdiZWFjb25zRGF0YVNlcnZpY2UnLCAndXNlckRhdGFTZXJ2aWNlJywgJyRzdGF0ZScsXG4gICAgICAgIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBiZWFjb25zRGF0YVNlcnZpY2UsIHVzZXJEYXRhU2VydmljZSwgJHN0YXRlKSB7XG5cbiAgICAgICAgICAgIHRoaXMuYmVhY29ucyA9IGJlYWNvbnNEYXRhU2VydmljZS5iZWFjb25zO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDA7XG5cbiAgICAgICAgICAgIGlmICgkc3RhdGVQYXJhbXMuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlkID0gJHN0YXRlUGFyYW1zLmlkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmF0dGFjaEJlYWNvbiA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBiZWFjb25zRGF0YVNlcnZpY2UuYXR0YWNoQmVhY29uKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCwgdGhpcy5iZWFjb24pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+ICRzdGF0ZS5nbygnYmVhY29uc0xpc3QnKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN1c3BlbmRCZWFjb24gPSAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBiZWFjb24gPSB0aGlzLmJlYWNvbnMuY29udGVudFtpbmRleF07XG4gICAgICAgICAgICAgICAgYmVhY29uLmFjdGl2ZSA9ICFiZWFjb24uYWN0aXZlO1xuICAgICAgICAgICAgICAgIGJlYWNvbnNEYXRhU2VydmljZS50b2dnbGVCZWFjb24odXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkLCBiZWFjb24pO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICAvL0J1aWxkIGFycmF5IHdpdGggYHRvdGFsUGFnZXNgIGVsZW1lbnRzIGFuZCByZXR1cm4gaGlzIGluZGV4ZXNcbiAgICAgICAgICAgIC8vVXNlZCBmb3IgZGlzcGxheWluZyB0aGUgcGFnaW5hdG9yXG4gICAgICAgICAgICB0aGlzLnRvdGFsUGFnZXMgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5XG4gICAgICAgICAgICAgICAgICAgIC5hcHBseSgwLCBBcnJheSh0aGlzLmJlYWNvbnMudG90YWxQYWdlcykpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoaW5kZXggPT4gaW5kZXgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5nb1RvUGFnZSA9IChwYWdlTnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWQgPSAkc3RhdGVQYXJhbXMuaWQgfHwgdXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkO1xuICAgICAgICAgICAgICAgIGJlYWNvbnNEYXRhU2VydmljZS5nZXRCZWFjb25zKGlkLCBwYWdlTnVtYmVyKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlYWNvbnMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFnZU51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLm9wZW5DYWxlbmRhciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcblxuLyogXG4gICAgQFN1bW1hcnk6IEN1c3RvbWVyIGNvbnRyb2xsZXIgXG4gICAgQERlc2NyaXB0aW9uOiBpbiBjaGFyZ2Ugb2YgYWxsIGxvZ2ljIGFjdGlvbnMgcmVsYXRlZCB0byB0aGUgQ3VzdG9tZXJzLlxuKi9cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0N1c3RvbWVyQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ2N1c3RvbWVyc0RhdGFTZXJ2aWNlJywgJyRzdGF0ZVBhcmFtcycsICd1c2VyRGF0YVNlcnZpY2UnLCAnJHN0YXRlJyxcbiAgICAgICAgZnVuY3Rpb24oJHNjb3BlLCBjdXN0b21lcnNEYXRhU2VydmljZSwgJHN0YXRlUGFyYW1zLCB1c2VyRGF0YVNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0TW9kZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jdXN0b21lcnMgPSBjdXN0b21lcnNEYXRhU2VydmljZS5jdXN0b21lcnM7XG4gICAgICAgICAgICB0aGlzLmVtYWlsUGF0dGVybiA9IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xuXG4gICAgICAgICAgICBpZiAoJHN0YXRlUGFyYW1zLmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFzc3dvcmRGaWVsZHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyID0gY3VzdG9tZXJzRGF0YVNlcnZpY2UuZWRpdGluZ0N1c3RvbWVyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBuZXcgY2xpZW50IG1vZGVcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQYXNzd29yZEZpZWxkcyA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0UGVybWlzc2lvbk1vZGVsID0gKHBlcm1pc3Npb25zKSA9PntcbiAgICAgICAgICAgICAgICBpZiAoIXBlcm1pc3Npb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxvd2VkUGVybWlzc2lvbnMgPSBwZXJtaXNzaW9ucztcbiAgICAgICAgICAgICAgICB0aGlzLmFsbG93ZWRQZXJtaXNzaW9uID0ge307XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxvd2VkUGVybWlzc2lvbnMuZm9yRWFjaCgocGVybWlzc2lvbikgPT57IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbG93ZWRQZXJtaXNzaW9uW3Blcm1pc3Npb24ucGVybWlzc2lvbl0gPSBwZXJtaXNzaW9uLmFsbG93ZWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNldFBlcm1pc3Npb25Nb2RlbCh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIucGVybWlzc2lvbnMpO1xuXG4gICAgICAgICAgICB0aGlzLnNhdmVQZXJtaXNzaW9ucyA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGVybWlzc2lvbnMgPSBbXTtcbiAgICAgICAgICAgICAgICBfLmZvckVhY2godGhpcy5hbGxvd2VkUGVybWlzc2lvbiwgKGFsbG93ZWQsIHBlcm1pc3Npb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlcm1pc3Npb25PYmogPSBfLmZpbmQodGhpcy5hbGxvd2VkUGVybWlzc2lvbnMsIHtwZXJtaXNzaW9uOiBwZXJtaXNzaW9ufSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwZXJtaXNzaW9uT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uT2JqLmFsbG93ZWQgPSBhbGxvd2VkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbnMucHVzaChwZXJtaXNzaW9uT2JqKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zLnB1c2goe3Blcm1pc3Npb246IHBlcm1pc3Npb24sIGFsbG93ZWQ6IGFsbG93ZWR9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGN1c3RvbWVyc0RhdGFTZXJ2aWNlLnNldFBlcm1pc3Npb25zKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCwgcGVybWlzc2lvbnMpLnRoZW4oKHBlcm1pc3Npb25zKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVybWlzc2lvbk1vZGVsKHBlcm1pc3Npb25zKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuYWRkTmV3Q3VzdG9tZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0TW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjdXN0b21lcnNEYXRhU2VydmljZS5lZGl0Q3VzdG9tZXIodGhpcy5jdXN0b21lcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+ICRzdGF0ZS5nbygnY3VzdG9tZXJMaXN0JykpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluYWxseSgoKSA9PiB0aGlzLmxvYWRpbmcgPSBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJzRGF0YVNlcnZpY2UuYWRkTmV3Q3VzdG9tZXIodGhpcy5jdXN0b21lcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+ICRzdGF0ZS5nbygnY3VzdG9tZXJMaXN0JykpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluYWxseSgoKSA9PiB0aGlzLmxvYWRpbmcgPSBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5kcml2ZXJzUGhvbmVOdW1iZXJzID0gdXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLnF1aWNrQ2FsbE51bWJlcnM7XG5cbiAgICAgICAgICAgIHRoaXMuc2F2ZU51bWJlcnMgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZml0bGVyIG91dCBlbXB0eSBvYmplY3RzIGluIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRyaXZlcnNQaG9uZU51bWJlcnNcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcih4ID0+IHgubmFtZS5sZW5ndGggPiAwICYmIHgubnVtYmVyLmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXN0b21lcnNEYXRhU2VydmljZS5zYXZlUXVpY2tDYWxsTnVtYmVycyh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsIHsgbnVtYmVyczogZGF0YSB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTnVtYmVyID0gKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5waG9uZU51bWJlcnNFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJpdmVyc1Bob25lTnVtYmVycyA9IHRoaXMuZHJpdmVyc1Bob25lTnVtYmVyc1xuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHggPT4gdGhpcy5kcml2ZXJzUGhvbmVOdW1iZXJzW2luZGV4XSAhPT0geCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmFkZE5ld051bWJlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcml2ZXJzUGhvbmVOdW1iZXJzLmxlbmd0aCA8IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJpdmVyc1Bob25lTnVtYmVycy5wdXNoKHsgbmFtZTogJycsIG51bWJlcjogJycgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waG9uZU51bWJlcnNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy50b2dnbGVTdXNwZW5kQ3VzdG9tZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lci5hY3RpdmUgPSAhdGhpcy5jdXN0b21lci5hY3RpdmU7XG4gICAgICAgICAgICAgICAgY3VzdG9tZXJzRGF0YVNlcnZpY2Uuc3VzcGVuZEN1c3RvbWVyKHRoaXMuY3VzdG9tZXIpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy50b2dnbGVQYXNzd29yZEZpZWxkcyA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQYXNzd29yZEZpZWxkcyA9ICF0aGlzLnNob3dQYXNzd29yZEZpZWxkcztcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcblxuLyogXHJcbiAgICBAU3VtbWFyeTogRGFzaGJvYXJkIGNvbnRyb2xsZXIgXHJcbiAgICBARGVzY3JpcHRpb246IGluIGNoYXJnZSBvZiBhbGwgbG9naWMgYWN0aW9ucyByZWxhdGVkIHRvIHRoZSBEYXNoYm9hcmQgYW5kIGV2ZXJ5IGNoaWxkIHN0YXRlIG9mIHRoZSBkYXNoYm9hcmQuXHJcbiovXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZENvbnRyb2xsZXInLCBbJyRzY29wZScsICdkYXNoYm9hcmRTZXJ2aWNlJyxcclxuICAgICAgICBmdW5jdGlvbigkc2NvcGUsIGRhc2hib2FyZFNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0cyA9IGRhc2hib2FyZFNlcnZpY2Uuc3RhdHM7XHJcbiAgICAgICAgfVxyXG4gICAgXSk7XG4vKiBcbiAgICBAU3VtbWFyeTogRHJpdmVycyBjb250cm9sbGVyIFxuICAgIEBEZXNjcmlwdGlvbjogaW4gY2hhcmdlIG9mIGFsbCBsb2dpYyBhY3Rpb25zIHJlbGF0ZWQgdG8gRHJpdmVycywgXG4gICAgc3VjaCBhcyBhZGRpbmcgbmV3IGRyaXZlcnMgYW5kIGRpc3BsYXkgZHJpdmVycyBsaXN0LlxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuY29udHJvbGxlcignRHJpdmVyc0NvbnRyb2xsZXInLCBbJyRzY29wZScsICckc3RhdGVQYXJhbXMnLCAnZHJpdmVyc0RhdGFTZXJ2aWNlJywgJyRzdGF0ZScsICd1c2VyRGF0YVNlcnZpY2UnLCAnY3VzdG9tZXJzRGF0YVNlcnZpY2UnLCAnQ09ORklHJyxcbiAgICAgICAgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIGRyaXZlcnNEYXRhU2VydmljZSwgJHN0YXRlLCB1c2VyRGF0YVNlcnZpY2UsIGN1c3RvbWVyc0RhdGFTZXJ2aWNlLCBDT05GSUcpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZHJpdmVycyA9IGRyaXZlcnNEYXRhU2VydmljZS5kcml2ZXJzO1xuICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9ucyA9IENPTkZJRy5EUklWRVJfUEVSTUlTU0lPTlM7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gJyc7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMDtcblxuICAgICAgICAgICAgLyoqIFxuICAgICAgICAgICAgICogd2UgY2FuIGhhdmUgYSAkc3RhdGVQYXJhbXMuaWQgaW4gMiBjYXNlczpcbiAgICAgICAgICAgICAqIGVkaXRpbmcgYSBkcml2ZXIgb3IgZ2V0dGluZyBsaXN0IG9mIGRyaXZlcnMgcGVyIHNwZWNpZmljIGN1c3RvbWVyIChhcyBzdXBlcmFkbWluKSAgXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICgkc3RhdGVQYXJhbXMuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyID0gY3VzdG9tZXJzRGF0YVNlcnZpY2UuZWRpdGluZ0N1c3RvbWVyOyAvLyB3ZSdyZSBkaXNwbGF5aW5nIHRoZSBsaXN0IG9mIGRyaXZlcnMgZm9yIGEgc3BlY2lmaWMgY3VzdG9tZXIuXG4gICAgICAgICAgICAgICAgdGhpcy5pZCA9ICRzdGF0ZVBhcmFtcy5pZDtcbiAgICAgICAgICAgICAgICBpZiAoJHN0YXRlLmN1cnJlbnQubmFtZSA9PT0gJ2VkaXREcml2ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyaXZlciA9IGRyaXZlcnNEYXRhU2VydmljZS5lZGl0aW5nRHJpdmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIG5ldyBkcml2ZXIgbW9kZVxuICAgICAgICAgICAgICAgIHRoaXMubW9kZSA9ICfXlNeV16HXoyDXoNeU15Ig15fXk9epJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hZGROZXdEcml2ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0TW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBkcml2ZXJzRGF0YVNlcnZpY2UuZWRpdERyaXZlcih1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsIHRoaXMuZHJpdmVyKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdkcml2ZXJzTGlzdCcpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkcml2ZXJzRGF0YVNlcnZpY2UuYWRkTmV3RHJpdmVyKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCwgdGhpcy5kcml2ZXIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2RyaXZlcnNMaXN0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZ29Ub0VkaXRDdXN0b21lciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2VkaXRDdXN0b21lcicsIHsgaWQ6IHRoaXMuY3VzdG9tZXIuaWQgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnZpZXdMb2cgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhY3Rpdml0eUxvZycsIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuZHJpdmVyLmlkLFxuICAgICAgICAgICAgICAgICAgICBtb250aDogbmV3IERhdGUoKS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3VzcGVuZERyaXZlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyaXZlci5hY3RpdmUgPSAhdGhpcy5kcml2ZXIuYWN0aXZlO1xuICAgICAgICAgICAgICAgIGRyaXZlcnNEYXRhU2VydmljZS5zdXNwZW5kRHJpdmVyKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCwgdGhpcy5kcml2ZXIpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5nb1RvID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoISRzY29wZS5pc0FkbWluKSB7XG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZWRpdERyaXZlcicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLmRyaXZlcnMuY29udGVudFtpbmRleF0uaWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAVE9ETyAtIG1vdmUgdG8gaGVscGVyXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMudG90YWxQYWdlcyA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXlcbiAgICAgICAgICAgICAgICAgICAgLmFwcGx5KDAsIEFycmF5KHRoaXMuZHJpdmVycy50b3RhbFBhZ2VzKSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcChpbmRleCA9PiBpbmRleCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmdvVG9QYWdlID0gKHBhZ2VOdW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBkZWZpbmUgd2hpY2ggaWQgdG8gdXNlIGZvciBBUElcbiAgICAgICAgICAgICAgICAgKiBpZiB3ZSdyZSBsb29raW5nIGF0IGEgbGlzdCBvZiBkcml2ZXJzIGFzIGEgY3VzdG9tZXIgLSB3ZSBuZWVkIG91ciBvd24gaWRcbiAgICAgICAgICAgICAgICAgKiBpZiB3ZSdyZSBsb29raW5nIGF0IGEgbGlzdCBvZiBkcml2ZXJzIGFzIGEgc3VwZXIgYWRtaW4gZm9yIHNwZWNpZmljIGN1c3RvbWVyIC0gd2UgbmVlZCB0aGUgY3VzdG9tZXIncyBpZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gJHN0YXRlUGFyYW1zLmlkIHx8IHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZDtcbiAgICAgICAgICAgICAgICBkcml2ZXJzRGF0YVNlcnZpY2UuZ2V0RHJpdmVycyhpZCwgcGFnZU51bWJlcilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcml2ZXJzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2VOdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zZWFyY2ggPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWQgPSAkc3RhdGVQYXJhbXMuaWQgfHwgdXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkO1xuICAgICAgICAgICAgICAgIGRyaXZlcnNEYXRhU2VydmljZS5zZWFyY2goaWQsIHRoaXMuc2VhcmNoUXVlcnkpLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcml2ZXJzID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcblxuLyogXG4gICAgQFN1bW1hcnk6IExvZ2luIGNvbnRyb2xsZXIgXG4gICAgQERlc2NyaXB0aW9uOiBpbiBjaGFyZ2Ugb2YgYWxsIGxvZ2ljIGFjdGlvbnMgcmVsYXRlZCB0byBMb2dpblxuKi9cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0xvZ2luQ29udHJvbGxlcicsIFsnJHN0YXRlJywgJ2F1dGhTZXJ2aWNlJywgJ3VzZXJEYXRhU2VydmljZScsXG4gICAgICAgIGZ1bmN0aW9uKCRzdGF0ZSwgYXV0aFNlcnZpY2UsIHVzZXJEYXRhU2VydmljZSkge1xuXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdCA9IChpc1ZhbGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHRoaXMuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNhcHRjaGFSZXNwb25zZTogdGhpcy5yZWNhcHRjaGFSZXNwb25zZVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luKHVzZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB1c2VyRGF0YVNlcnZpY2Uuc2V0VXNlckRhdGEoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28odXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLm1haW5TdGF0ZVNjcmVlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5dKTtcblxuLyogXG4gICAgQFN1bW1hcnk6IE1vZGFsIGNvbnRyb2xsZXIgXG4gICAgQERlc2NyaXB0aW9uOiBpbiBjaGFyZ2Ugb2YgYWxsIGxvZ2ljIGFjdGlvbnMgcmVsYXRlZCB0byBNb2RhbFxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuY29udHJvbGxlcignTW9kYWxDb250cm9sbGVyJywgWydjbG9zZScsXG4gICAgICAgIGZ1bmN0aW9uKGNsb3NlKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlID0gKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNsb3NlLCBidXQgZ2l2ZSA1MDBtcyBmb3IgYm9vdHN0cmFwIHRvIGFuaW1hdGVcbiAgICAgICAgICAgICAgICBjbG9zZShyZXN1bHQsIDUwMCk7IFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXSk7XG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5kaXJlY3RpdmUoJ2NvbmZpcm1QYXNzd29yZCcsIGNvbmZpcm1QYXNzd29yZENvbmZpZyk7XG5cbmZ1bmN0aW9uIGNvbmZpcm1QYXNzd29yZENvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICBvdGhlck1vZGVsVmFsdWU6ICc9Y29tcGFyZVRvJ1xuICAgICAgICB9LFxuICAgICAgICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJpYnV0ZXMsIG5nTW9kZWwpID0+IHtcbiAgICAgICAgICAgIG5nTW9kZWwuJHZhbGlkYXRvcnMuY29tcGFyZVRvID0gKG1vZGVsVmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kZWxWYWx1ZSA9PT0gc2NvcGUub3RoZXJNb2RlbFZhbHVlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCdvdGhlck1vZGVsVmFsdWUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbmdNb2RlbC4kdmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKipcclxuR0xvYmFsIERpcmVjdGl2ZXNcclxuKioqL1xyXG5cclxuLy8gUm91dGUgU3RhdGUgTG9hZCBTcGlubmVyKHVzZWQgb24gcGFnZSBvciBjb250ZW50IGxvYWQpXHJcbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXHJcbiAgICAuZGlyZWN0aXZlKCduZ1NwaW5uZXJCYXInLCBbJyRyb290U2NvcGUnLCAnJHN0YXRlJyxcclxuICAgICAgICBmdW5jdGlvbigkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGJ5IGRlZnVsdCBoaWRlIHRoZSBzcGlubmVyIGJhclxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2hpZGUnKTsgLy8gaGlkZSBzcGlubmVyIGJhciBieSBkZWZhdWx0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRpc3BsYXkgdGhlIHNwaW5uZXIgYmFyIHdoZW5ldmVyIHRoZSByb3V0ZSBjaGFuZ2VzKHRoZSBjb250ZW50IHBhcnQgc3RhcnRlZCBsb2FkaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdoaWRlJyk7IC8vIHNob3cgc3Bpbm5lciBiYXJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGlkZSB0aGUgc3Bpbm5lciBiYXIgb24gcm91bnRlIGNoYW5nZSBzdWNjZXNzKGFmdGVyIHRoZSBjb250ZW50IGxvYWRlZClcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2hpZGUnKTsgLy8gaGlkZSBzcGlubmVyIGJhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ3BhZ2Utb24tbG9hZCcpOyAvLyByZW1vdmUgcGFnZSBsb2FkaW5nIGluZGljYXRvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMYXlvdXQuc2V0QW5ndWxhckpzU2lkZWJhck1lbnVBY3RpdmVMaW5rKCdtYXRjaCcsIG51bGwsIGV2ZW50LmN1cnJlbnRTY29wZS4kc3RhdGUpOyAvLyBhY3RpdmF0ZSBzZWxlY3RlZCBsaW5rIGluIHRoZSBzaWRlYmFyIG1lbnVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGF1dG8gc2NvcmxsIHRvIHBhZ2UgdG9wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcHAuc2Nyb2xsVG9wKCk7IC8vIHNjcm9sbCB0byB0aGUgdG9wIG9uIGNvbnRlbnQgbG9hZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAkcm9vdFNjb3BlLnNldHRpbmdzLmxheW91dC5wYWdlQXV0b1Njcm9sbE9uTG9hZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlTm90Rm91bmQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnaGlkZScpOyAvLyBoaWRlIHNwaW5uZXIgYmFyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlRXJyb3InLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnaGlkZScpOyAvLyBoaWRlIHNwaW5uZXIgYmFyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgXSk7XHJcblxyXG4vLyBIYW5kbGUgZ2xvYmFsIExJTksgY2xpY2tcclxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcclxuICAgIC5kaXJlY3RpdmUoJ2EnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbSwgYXR0cnMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhdHRycy5uZ0NsaWNrIHx8IGF0dHJzLmhyZWYgPT09ICcnIHx8IGF0dHJzLmhyZWYgPT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgbGluayBjbGljayBmb3IgYWJvdmUgY3JpdGVyaWFcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbi8vIEhhbmRsZSBEcm9wZG93biBIb3ZlciBQbHVnaW4gSW50ZWdyYXRpb25cclxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcclxuICAgIC5kaXJlY3RpdmUoJ2Ryb3Bkb3duTWVudUhvdmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0pIHtcclxuICAgICAgICAgICAgICAgIGVsZW0uZHJvcGRvd25Ib3ZlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xuLyogXG4gICAgQFN1bW1hcnk6IEF1dGhlbnRpY2F0aW9uIHNlcnZpY2UgXG4gICAgQERlc2NyaXB0aW9uOiBpbiBjaGFyZ2Ugb2YgQVBJIHJlcXVlc3RzIGFuZCBkYXRhIHJlbGF0ZWQgdG8gdXNlciBhdXRoZW50aWNhdGlvbi5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gIC5zZXJ2aWNlKCdhdXRoU2VydmljZScsIFsnJGh0dHAnLCAnQ09ORklHJywgJ3N3YW5ndWxhcicsICdlcnJvckhhbmRsZXJTZXJ2aWNlJyxcbiAgICBmdW5jdGlvbiAoJGh0dHAsIENPTkZJRywgc3dhbmd1bGFyLCBlcnJvckhhbmRsZXJTZXJ2aWNlKSB7XG5cbiAgICAgIGNvbnN0IHNlcnZlciA9IENPTkZJRy5TRVJWRVI7XG5cbiAgICAgIGZ1bmN0aW9uIGxvZ2luKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgIC5wb3N0KHNlcnZlciArICcvYXV0aGVudGljYXRlJywgY3JlZGVudGlhbHMpXG4gICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSByZXN1bHQuaGVhZGVycygpLmF1dGhvcml6YXRpb247XG4gICAgICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgdG9rZW4pO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICAgICAgc3dhbmd1bGFyLnN3YWwoJ9ek16jXmNeZINeU15TXqteX15HXqNeV16og16nXkteV15nXmdedJyxcbiAgICAgICAgICAgICAgICAn15DXoNeQINeR15PXldenINeQ16og15TXoNeq15XXoNeZ150g16nXlNeW16DXqi4nLFxuICAgICAgICAgICAgICAgICdpbmZvJ1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVycm9ySGFuZGxlclNlcnZpY2UuaGFuZGxlKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGNoZWNrQ3VycmVudFVzZXIoKSB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoc2VydmVyICsgJy91c2Vycy9jdXJyZW50Jyk7XG4gICAgICAgIH0gZWxzZSByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbG9naW4sXG4gICAgICAgIGNoZWNrQ3VycmVudFVzZXJcbiAgICAgIH07XG4gICAgfVxuICBdKTtcblxuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAuZmFjdG9yeSgnYXV0aEludGVyY2VwdG9yJywgKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICByZXF1ZXN0OiBmdW5jdGlvbiAoY29uZmlnKSB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XG4gICAgICAgIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG4gICAgICAgIGlmKHRva2VuKSBjb25maWcuaGVhZGVycy5BdXRob3JpemF0aW9uID0gdG9rZW47XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICB9LFxuICAgICAgcmVzcG9uc2U6IChyZXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV3VG9rZW4gPSByZXMuaGVhZGVycygpLmF1dGhvcml6YXRpb247XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuXG4gICAgICAgIGlmIChuZXdUb2tlbiAmJiBuZXdUb2tlbiAhPT0gY3VycmVudFRva2VuKSB7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgbmV3VG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbi8qIFxuICAgIEBTdW1tYXJ5OiBCZWFjb25zIERhdGEgU2VydmljZSBcbiAgICBARGVzY3JpcHRpb246IEluIGNoYXJnZSBvZiBBUEkgcmVxdWVzdHMgYW5kIGRhdGEgcmVsYXRlZCB0aGUgYmVhY29uc1xuKi9cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuc2VydmljZSgnYmVhY29uc0RhdGFTZXJ2aWNlJywgWyckcScsICckaHR0cCcsICdDT05GSUcnLCAnJGluamVjdG9yJyxcbiAgICAgICAgZnVuY3Rpb24oJHEsICRodHRwLCBDT05GSUcsICRpbmplY3Rvcikge1xuICAgICAgICAgICAgY29uc3Qgc2VydmVyID0gQ09ORklHLlNFUlZFUjtcbiAgICAgICAgICAgIGNvbnN0IHN3YW5ndWxhciA9ICRpbmplY3Rvci5nZXQoJ3N3YW5ndWxhcicpOyAvLyBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmN5XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEJlYWNvbnMoaWQsIHBhZ2VOdW1iZXIgPSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gYD9wYWdlPSR7cGFnZU51bWJlcn1gO1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAuZ2V0KGAke3NlcnZlcn0vY3VzdG9tZXJzLyR7aWR9L2JlYWNvbnMke3BhcmFtc31gKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlYWNvbnMgPSByZXMuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVhY29ucy5jb250ZW50ID0gdGhpcy5iZWFjb25zLmNvbnRlbnQubWFwKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoubGFzdEFjdGl2aXR5ID0gbW9tZW50LnV0YyhvYmoubGFzdEFjdGl2aXR5KS5jYWxlbmRhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoubGFzdEFjdGl2aXR5ID09PSAnSW52YWxpZCBkYXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoubGFzdEFjdGl2aXR5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gYXR0YWNoQmVhY29uKGN1c3RvbWVySWQsIHsgc2VyaWFsLCB1dWlkLCBsaWNlbnNlUGxhdGVOdW1iZXIsIGV4cGlyeURhdGUgfSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAucG9zdChgJHtzZXJ2ZXJ9L2N1c3RvbWVycy8ke2N1c3RvbWVySWR9L2JlYWNvbnNgLCB7IHNlcmlhbCwgdXVpZCwgbGljZW5zZVBsYXRlTnVtYmVyLCBleHBpcnlEYXRlIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIuc3RhdHVzID09PSA0MDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2FuZ3VsYXIub3Blbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxUZW1wbGF0ZTogJ2JhY2tvZmZpY2UvdHBsL3NlbnNvci00MDkuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dMb2FkZXJPbkNvbmZpcm06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICgpID0+IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiB0b2dnbGVCZWFjb24oY3VzdG9tZXJJZCwgeyBpZCwgYWN0aXZlIH0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBhdGNoKGAke3NlcnZlcn0vY3VzdG9tZXJzLyR7Y3VzdG9tZXJJZH0vYmVhY29ucy8ke2lkfS9hY3RpdmVgLCB7IGFjdGl2ZSB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdldEJlYWNvbnMsXG4gICAgICAgICAgICAgICAgYXR0YWNoQmVhY29uLFxuICAgICAgICAgICAgICAgIHRvZ2dsZUJlYWNvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIF0pO1xuXG4vKiBcbiAgICBAU3VtbWFyeTogQ3VzdG9tZXJzIERhdGEgU2VydmljZSBcbiAgICBARGVzY3JpcHRpb246IEluIGNoYXJnZSBvZiBBUEkgcmVxdWVzdHMgYW5kIGRhdGEgcmVsYXRlZCB0aGUgY3VzdG9tZXJzXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5zZXJ2aWNlKCdjdXN0b21lcnNEYXRhU2VydmljZScsIFsnJGh0dHAnLCAnQ09ORklHJywgJ3N3YW5ndWxhcicsXG4gICAgICAgIGZ1bmN0aW9uKCRodHRwLCBDT05GSUcsIHN3YW5ndWxhcikge1xuXG4gICAgICAgICAgICBjb25zdCBzZXJ2ZXIgPSBDT05GSUcuU0VSVkVSO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBDdXN0b21lcnMoZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA/IGl0ZW0uc3RhdHVzID0gJ0NVU1RPTUVSX0xJU1QuQUNUSVZFJyA6IGl0ZW0uc3RhdHVzID0gJ0NVU1RPTUVSX0xJU1QuTk9UX0FDVElWRSc7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRDdXN0b21lcnMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoc2VydmVyICsgJy9jdXN0b21lcnMnKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVycyA9IG1hcEN1c3RvbWVycyhyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGROZXdDdXN0b21lcihuZXdDdXN0b21lcikge1xuICAgICAgICAgICAgICAgIGlmIChuZXdDdXN0b21lci5jb21wYW55TG9nbykge1xuICAgICAgICAgICAgICAgICAgICBuZXdDdXN0b21lci5jb21wYW55TG9nbyA9IG5ld0N1c3RvbWVyLmNvbXBhbnlMb2dvLmJhc2U2NDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KHNlcnZlciArICcvY3VzdG9tZXJzJywgbmV3Q3VzdG9tZXIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gNDA5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dhbmd1bGFyLm9wZW4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sVGVtcGxhdGU6ICdiYWNrb2ZmaWNlL3RwbC9jdXN0b21lci00MDkuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dMb2FkZXJPbkNvbmZpcm06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogKCkgPT4ge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGVkaXRDdXN0b21lcih7IGNvbXBhbnlOYW1lLCBkaXNwbGF5TmFtZSwgcGFzc3dvcmQsIGVtYWlsLCBpZCwgYWN0aXZlLCBjb21wYW55TG9nbywgY29tcGFueVJvbGUsIHBob25lTnVtYmVyIH0pIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGFueUxvZ28pIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueUxvZ28gPSBjb21wYW55TG9nby5iYXNlNjQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAucGF0Y2goc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGlkLCB7IGNvbXBhbnlOYW1lLCBkaXNwbGF5TmFtZSwgcGFzc3dvcmQsIGVtYWlsLCBhY3RpdmUsIGNvbXBhbnlMb2dvLCBjb21wYW55Um9sZSwgcGhvbmVOdW1iZXIgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEN1c3RvbWVyQnlJRChpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAuZ2V0KHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBpZClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0aW5nQ3VzdG9tZXIgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNhdmVRdWlja0NhbGxOdW1iZXJzKGlkLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wYXRjaChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgaWQgKyAnL251bWJlcnMnLCBkYXRhKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzdXNwZW5kQ3VzdG9tZXIoeyBpZCwgYWN0aXZlIH0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBhdGNoKHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBpZCArICcvYWN0aXZlJywgeyBhY3RpdmUgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0UGVybWlzc2lvbnMoaWQsIHBlcm1pc3Npb25zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wYXRjaChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgaWQgKyAnL3Blcm1pc3Npb25zJywgeyBwZXJtaXNzaW9ucyB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdldEN1c3RvbWVycyxcbiAgICAgICAgICAgICAgICBhZGROZXdDdXN0b21lcixcbiAgICAgICAgICAgICAgICBlZGl0Q3VzdG9tZXIsXG4gICAgICAgICAgICAgICAgZ2V0Q3VzdG9tZXJCeUlELFxuICAgICAgICAgICAgICAgIHNhdmVRdWlja0NhbGxOdW1iZXJzLFxuICAgICAgICAgICAgICAgIHN1c3BlbmRDdXN0b21lcixcbiAgICAgICAgICAgICAgICBzZXRQZXJtaXNzaW9uc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIF0pO1xuLyogXG4gICAgQFN1bW1hcnk6IERhc2hib2FyZCBEYXRhIFNlcnZpY2UgXG4gICAgQERlc2NyaXB0aW9uOiBJbiBjaGFyZ2Ugb2YgRGFzaGJvYXJkIGRhdGEgc3VjaCBhcyBTdGF0aXN0aWNzXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5zZXJ2aWNlKCdkYXNoYm9hcmRTZXJ2aWNlJywgWyckaHR0cCcsICdDT05GSUcnLFxuICAgICAgICBmdW5jdGlvbigkaHR0cCwgQ09ORklHKSB7XG4gICAgICAgICAgICBjb25zdCBzZXJ2ZXIgPSBDT05GSUcuU0VSVkVSO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRTdGF0cygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLmdldChgJHtzZXJ2ZXJ9L2FkbWluL3N0YXRpc3RpY3NgKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRzID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRzLnllc3RlcmRheUFjdGl2aXR5U2Vjb25kcyA9IG1vbWVudCgpLmhvdXJzKDApLm1pbnV0ZXMoMCkuc2Vjb25kcyh0aGlzLnN0YXRzLnllc3RlcmRheUFjdGl2aXR5U2Vjb25kcykuZm9ybWF0KCdISDptbTpzcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdHM7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdldFN0YXRzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgXSk7XG5cbi8qIFxuICAgIEBTdW1tYXJ5OiBEcml2ZXJzIERhdGEgU2VydmljZSBcbiAgICBARGVzY3JpcHRpb246IEluIGNoYXJnZSBvZiBBUEkgcmVxdWVzdHMgYW5kIGRhdGEgcmVsYXRlZCB0aGUgZHJpdmVyc1xuKi9cblxuLy8gaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5zZXJ2aWNlKCdkcml2ZXJzRGF0YVNlcnZpY2UnLCBbJyRodHRwJywgJ0NPTkZJRycsXG4gICAgICAgIGZ1bmN0aW9uKCRodHRwLCBDT05GSUcpIHtcblxuICAgICAgICAgICAgY29uc3Qgc2VydmVyID0gQ09ORklHLlNFUlZFUjtcblxuICAgICAgICAgICAgZnVuY3Rpb24gbWFwRHJpdmVycyhkYXRhKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5jb250ZW50Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZUhvdXJzID0gbW9tZW50KCkuaG91cnMoMCkubWludXRlcygwKS5zZWNvbmRzKGl0ZW0ueWVzdGVyZGF5QWN0aXZpdHlTZWNvbmRzKS5mb3JtYXQoJ0hIOm1tOnNzJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldERyaXZlcnMoaWQsIHBhZ2VOdW1iZXIgPSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gYD9wYWdlPSR7cGFnZU51bWJlcn1gO1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAuZ2V0KHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBpZCArICcvZHJpdmVycycgKyBwYXJhbXMpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJpdmVycyA9IG1hcERyaXZlcnMocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJpdmVycztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldERyaXZlckJ5SUQoY3VzdG9tZXJJZCwgaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLmdldChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgY3VzdG9tZXJJZCArICcvZHJpdmVycy8nICsgaWQpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdGluZ0RyaXZlciA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0aW5nRHJpdmVyLnBlcm1pc3Npb25MZXZlbCA9IENPTkZJRy5EUklWRVJfUEVSTUlTU0lPTlNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChvYmopID0+IG9iai50eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbmRleE9mKHRoaXMuZWRpdGluZ0RyaXZlci5wZXJtaXNzaW9uTGV2ZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkTmV3RHJpdmVyKGN1c3RvbWVySWQsIHsgZGlzcGxheU5hbWUsIGlkTnVtYmVyLCBwaG9uZU51bWJlciwgcGVybWlzc2lvbkxldmVsLCBsaWNlbnNlTnVtYmVyIH0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBvc3Qoc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGN1c3RvbWVySWQgKyAnL2RyaXZlcnMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uTGV2ZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlTnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBlZGl0RHJpdmVyKGN1c3RvbWVySWQsIHsgZGlzcGxheU5hbWUsIGlkTnVtYmVyLCBwaG9uZU51bWJlciwgaWQsIHBlcm1pc3Npb25MZXZlbCwgYWN0aXZlLCBsaWNlbnNlTnVtYmVyIH0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBhdGNoKHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBjdXN0b21lcklkICsgJy9kcml2ZXJzLycgKyBpZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZE51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbkxldmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGljZW5zZU51bWJlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gc3VzcGVuZERyaXZlcihjdXN0b21lcklkLCB7IGlkLCBhY3RpdmUgfSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAucGF0Y2goc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGN1c3RvbWVySWQgKyAnL2RyaXZlcnMvJyArIGlkICsgJy9hY3RpdmUnLCB7IGFjdGl2ZSB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TG9nKGN1c290bWVySWQsIGlkLCBtb250aCwgeWVhcikge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRvU2Vjb25kcyh0aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJ0cyA9IHRpbWUuc3BsaXQoJzonKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgrcGFydHNbMF0pICogNjAgKiA2MCArICgrcGFydHNbMV0pICogNjAgKyAoK3BhcnRzWzJdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gbW9tZW50KCkuZGF5KDApLm1vbnRoKG1vbnRoKS55ZWFyKHllYXIpLmZvcm1hdCgnWVlZWS9NTS9ERCcpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoYCR7c2VydmVyfS9jdXN0b21lcnMvJHtjdXNvdG1lcklkfS9kcml2ZXJzLyR7aWR9L2FjdGl2aXR5Lz9kYXRlPSR7ZGF0ZX1gKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyA9IHJlcy5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigob2JqKSA9PiBvYmouZW5kZWRBdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmRhdGUgPSBgJHttb21lbnQob2JqLnN0YXJ0ZWRBdCkuZm9ybWF0KCdERC9NTS9ZWVlZJyl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnN0YXJ0ZWRBdCA9IGAke21vbWVudC51dGMob2JqLnN0YXJ0ZWRBdCkuZm9ybWF0KCdERC9NTS9ZWVlZIEhIOm1tOnNzJyl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmVuZGVkQXQgPSBgJHttb21lbnQudXRjKG9iai5lbmRlZEF0KS5mb3JtYXQoJ0REL01NL1lZWVkgSEg6bW06c3MnKX1gO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouZHJpdmVyU3RhdHVzTG9ncyAmJiBvYmouZHJpdmVyU3RhdHVzTG9ncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5kcml2ZXJTdGF0dXNMb2dzID0gb2JqLmRyaXZlclN0YXR1c0xvZ3MubWFwKChzdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGF0ZSA9IGAke21vbWVudC51dGMoc3RhdHVzLnN0YXJ0ZWRBdCkuZm9ybWF0KCdERC9NTS9ZWVlZJyl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuc3RhcnRlZEF0ID0gYCR7bW9tZW50LnV0YyhzdGF0dXMuc3RhcnRlZEF0KS5jYWxlbmRhcigpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmVuZGVkQXQgPSBgJHttb21lbnQudXRjKHN0YXR1cy5lbmRlZEF0KS5jYWxlbmRhcigpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxBY3Rpdml0eSA9IHRoaXMubG9nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudG90YWxUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9TZWNvbmRzKG9iai50b3RhbFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYikgPT4geyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQWN0aXZpdHkgPSBtb21lbnQoKS5ob3VycygwKS5taW51dGVzKDApLnNlY29uZHModGhpcy50b3RhbEFjdGl2aXR5KS5mb3JtYXQoJ0hIOm1tOnNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlYXJjaChpZCwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLmdldChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgaWQgKyAnL2RyaXZlcnMnICsgJy8/cT0nICsgcXVlcnkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXBEcml2ZXJzKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZ2V0RHJpdmVycyxcbiAgICAgICAgICAgICAgICBhZGROZXdEcml2ZXIsXG4gICAgICAgICAgICAgICAgZWRpdERyaXZlcixcbiAgICAgICAgICAgICAgICBzdXNwZW5kRHJpdmVyLFxuICAgICAgICAgICAgICAgIGdldExvZyxcbiAgICAgICAgICAgICAgICBnZXREcml2ZXJCeUlELFxuICAgICAgICAgICAgICAgIHNlYXJjaFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIF0pO1xuXG4vKiBcbiAgICBAU3VtbWFyeTogRXJyb3IgSGFuZGxpbmcgSW50ZXJjZXB0b3IgXG4gICAgQERlc2NyaXB0aW9uOiBJbiBjaGFyZ2Ugb2YgaW50ZXJjZXB0aW5nIHJlc3BvbnNlcyBhbmQgZGV0ZXJtaW5lIGlmIHRoZWlyIGFuIGVycm9yLlxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuZmFjdG9yeSgnZXJyb3JIYW5kbGVySW50ZXJjZXB0b3InLCBbJ2Vycm9ySGFuZGxlclNlcnZpY2UnLFxuICAgICAgICBmdW5jdGlvbihlcnJvckhhbmRsZXJTZXJ2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlclNlcnZpY2UuaGFuZGxlKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IFByb21pc2UucmVzb2x2ZShlcnIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IFByb21pc2UucmVqZWN0KGVycikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbl0pO1xuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5zZXJ2aWNlKCdlcnJvckhhbmRsZXJTZXJ2aWNlJywgWyckaW5qZWN0b3InLFxuICAgICAgICBmdW5jdGlvbigkaW5qZWN0b3IpIHtcblxuICAgICAgICAgICAgZnVuY3Rpb24gaGFuZGxlKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN3YW5ndWxhciA9ICRpbmplY3Rvci5nZXQoJ3N3YW5ndWxhcicpOyAvLyBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmN5XG4gICAgICAgICAgICAgICAgY29uc3QgJHN0YXRlID0gJGluamVjdG9yLmdldCgnJHN0YXRlJyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGVyci5zdGF0dXMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCd1bmF1dGhvcml6ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dhbmd1bGFyLm9wZW4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sVGVtcGxhdGU6ICdiYWNrb2ZmaWNlL3RwbC80MDMuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dMb2FkZXJPbkNvbmZpcm06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICgpID0+IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQwNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2FuZ3VsYXIub3Blbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxUZW1wbGF0ZTogJy9iYWNrb2ZmaWNlL3RwbC80MDQuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dMb2FkZXJPbkNvbmZpcm06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICgpID0+IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdkdXBsaWNhdGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDUwMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3YW5ndWxhci5vcGVuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbFRlbXBsYXRlOiAnYmFja29mZmljZS90cGwvNTAyLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TG9hZGVyT25Db25maXJtOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAoKSA9PiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGhhbmRsZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIF0pO1xuLyogXG4gICAgQFN1bW1hcnk6IFVzZXIgRGF0YSBTZXJ2aWNlIFxuICAgIEBEZXNjcmlwdGlvbjogSW4gY2hhcmdlIG9mIEFQSSByZXF1ZXN0cyBhbmQgZGF0YSByZWxhdGVkIHRoZSB1c2VyIHRoYXQgaXMgbm93IGxvZ2dlZCBpbiB0byB0aGUgYXBwLlxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuc2VydmljZSgndXNlckRhdGFTZXJ2aWNlJywgWydhdXRoU2VydmljZScsICckc3RhdGUnLCAnJGh0dHAnLCAnQ09ORklHJyxcbiAgICAgICAgZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSwgJGh0dHAsIENPTkZJRykge1xuICAgICAgICAgICAgY29uc3Qgc2VydmVyID0gQ09ORklHLlNFUlZFUjtcblxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0VXNlckRhdGEoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmNoZWNrQ3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFpblN0YXRlU2NyZWVuJzonbG9naW4nXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmN1cnJlbnRVc2VyLHJlcy5kYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgX2lzQWRtaW4gPSBpc0FkbWluLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2lzQWRtaW4oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFVzZXIubWFpblN0YXRlU2NyZWVuID0gJ2N1c3RvbWVyTGlzdCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFVzZXIubWFpblN0YXRlU2NyZWVuID0gJ2RyaXZlcnNMaXN0JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+ICRzdGF0ZS5nbygnbG9naW4nKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzQ3VzdG9tZXIoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXIucm9sZXMuaW5jbHVkZXMoJ0NVU1RPTUVSJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzQWRtaW4oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXIucm9sZXMuaW5jbHVkZXMoJ0FETUlOJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVVzZXJMYW5ndWFnZShsYW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLnBhdGNoKHNlcnZlciArICcvdXNlcnMvY3VycmVudCcsIHtsYW5ndWFnZTogbGFuZ30pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNldFVzZXJEYXRhLFxuICAgICAgICAgICAgICAgIGlzQ3VzdG9tZXIsXG4gICAgICAgICAgICAgICAgaXNBZG1pbixcbiAgICAgICAgICAgICAgICB1cGRhdGVVc2VyTGFuZ3VhZ2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuZGlyZWN0aXZlKCdhY3Rpdml0eUxvZycsIGFjdGl2aXR5TG9nQ29uZmlnKTtcblxuZnVuY3Rpb24gYWN0aXZpdHlMb2dDb25maWcoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2UvanMvZGlyZWN0aXZlcy9hY3Rpdml0eUxvZy9hY3Rpdml0eUxvZy5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogWyckc3RhdGUnLCAnJHN0YXRlUGFyYW1zJywgJ2RyaXZlcnNEYXRhU2VydmljZScsIGFjdGl2aXR5TG9nQ29udHJvbGxlcl0sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGFjdGl2aXR5TG9nQ29udHJvbGxlcigkc3RhdGUsICRzdGF0ZVBhcmFtcywgZHJpdmVyc0RhdGFTZXJ2aWNlKSB7XG4gICAgY29uc3QgbW9udGhzID0gW1xuICAgICAgICAn15nXoNeV15DXqCcsXG4gICAgICAgICfXpNeR16jXldeQ16gnLFxuICAgICAgICAn157XqNelJyxcbiAgICAgICAgJ9eQ16TXqNeZ15wnLFxuICAgICAgICAn157XkNeZJyxcbiAgICAgICAgJ9eZ15XXoNeZJyxcbiAgICAgICAgJ9eZ15XXnNeZJyxcbiAgICAgICAgJ9eQ15XXkteV16HXmCcsXG4gICAgICAgICfXodek15jXnteR16gnLFxuICAgICAgICAn15DXlden15jXldeR16gnLFxuICAgICAgICAn16DXldeR157XkdeoJyxcbiAgICAgICAgJ9eT16bXnteR16gnXG4gICAgXTtcblxuICAgICRzdGF0ZVBhcmFtcy5tb250aCA9IE51bWJlcigkc3RhdGVQYXJhbXMubW9udGgpO1xuICAgICRzdGF0ZVBhcmFtcy55ZWFyID0gTnVtYmVyKCRzdGF0ZVBhcmFtcy55ZWFyKTtcblxuICAgIHRoaXMubG9nID0gZHJpdmVyc0RhdGFTZXJ2aWNlLmxvZztcbiAgICB0aGlzLnRvdGFsQWN0aXZpdHkgPSBkcml2ZXJzRGF0YVNlcnZpY2UudG90YWxBY3Rpdml0eTtcblxuICAgIHRoaXMuY3VycmVudERhdGUgPSBgJHttb250aHNbJHN0YXRlUGFyYW1zLm1vbnRoXX0gJHskc3RhdGVQYXJhbXMueWVhcn1gO1xuICAgIHRoaXMuaXNGdXR1cmVEYXRlID0gJHN0YXRlUGFyYW1zLm1vbnRoID49IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSAmJiAkc3RhdGVQYXJhbXMueWVhciA+PSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gICAgdGhpcy5pc1Bhc3REYXRlID0gJHN0YXRlUGFyYW1zLnllYXIgPD0gMjAxNTtcbiAgICB0aGlzLmV4cGFuZGVkUm93cyA9IHt9O1xuXG4gICAgdGhpcy5uZXh0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkID0gbmV3IERhdGUoJHN0YXRlUGFyYW1zLnllYXIsICRzdGF0ZVBhcmFtcy5tb250aCArIDEsIDEpO1xuICAgICAgICAkc3RhdGUuZ28oJ2FjdGl2aXR5TG9nJywgeyBtb250aDogZC5nZXRNb250aCgpLCB5ZWFyOiBkLmdldEZ1bGxZZWFyKCkgfSk7XG4gICAgfTtcblxuICAgIHRoaXMucHJldiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZCA9IG5ldyBEYXRlKCRzdGF0ZVBhcmFtcy55ZWFyLCAkc3RhdGVQYXJhbXMubW9udGggLSAxLCAxKTtcbiAgICAgICAgJHN0YXRlLmdvKCdhY3Rpdml0eUxvZycsIHsgbW9udGg6IGQuZ2V0TW9udGgoKSwgeWVhcjogZC5nZXRGdWxsWWVhcigpIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmV4cGFuZCA9IChsb2cpID0+IHtcbiAgICAgICAgbG9nLmV4cGFuZGVkID0gIWxvZy5leHBhbmRlZDtcbiAgICB9O1xufVxuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5kaXJlY3RpdmUoJ2FwcERhdGF0YWJsZScsIGFwcERhdGF0YWJsZUNvbmZpZyk7XG5cbmZ1bmN0aW9uIGFwcERhdGF0YWJsZUNvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgZGF0YTogJz0nLFxuICAgICAgICAgICAgdGFibGV0aXRsZTogJz0nLFxuICAgICAgICAgICAgdGh0aXRsZXM6ICc9JyxcbiAgICAgICAgICAgIHRkZGF0YTogJz0nLFxuICAgICAgICAgICAgZ290bzogJz0nLFxuICAgICAgICAgICAgdHlwZTogJz0nLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjogJz0nLFxuICAgICAgICAgICAgdXNlcklkOiAnPScsXG4gICAgICAgICAgICB0cmFuc2xhdGVEYXRhOiAnPSdcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL2pzL2RpcmVjdGl2ZXMvYXBwRGF0YXRhYmxlL2FwcERhdGF0YWJsZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogWyckc2NvcGUnLCAnJHN0YXRlJywgJyR0aW1lb3V0JywgJ2RyaXZlcnNEYXRhU2VydmljZScsICdiZWFjb25zRGF0YVNlcnZpY2UnLCBhcHBEYXRhdGFibGVDb250cm9sbGVyXSxcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYXBwRGF0YXRhYmxlQ29udHJvbGxlcigkc2NvcGUsICRzdGF0ZSwgJHRpbWVvdXQsIGRyaXZlcnNEYXRhU2VydmljZSwgYmVhY29uc0RhdGFTZXJ2aWNlKSB7XG5cbiAgICAvLyBQdXQgcHJvcGVydGllcyBvbiB0aGUgY29udHJvbGxlclxuICAgIHRoaXMuZGF0YSA9ICRzY29wZS5kYXRhO1xuICAgIHRoaXMuY29udGVudCA9IHRoaXMuZGF0YS5jb250ZW50IHx8IHRoaXMuZGF0YTtcbiAgICB0aGlzLnRodGl0bGVzID0gJHNjb3BlLnRodGl0bGVzO1xuICAgIHRoaXMudGRkYXRhID0gJHNjb3BlLnRkZGF0YTtcbiAgICB0aGlzLnRhYmxldGl0bGUgPSAkc2NvcGUudGFibGV0aXRsZTtcbiAgICB0aGlzLnRyYW5zbGF0ZURhdGEgPSAkc2NvcGUudHJhbnNsYXRlRGF0YTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAkc2NvcGUuJHdhdGNoKCd0YWJsZXRpdGxlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQudGFibGV0aXRsZSA9ICRzY29wZS50YWJsZXRpdGxlO1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLiR3YXRjaCgndGh0aXRsZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC50aHRpdGxlcyA9ICRzY29wZS50aHRpdGxlcztcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEBUT0RPIG1vdmUgdG8gaGVscGVyXG4gICAgICovXG4gICAgdGhpcy50b3RhbFBhZ2VzID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gQXJyYXlcbiAgICAgICAgICAgIC5hcHBseSgwLCBBcnJheSh0aGlzLmRhdGEudG90YWxQYWdlcykpXG4gICAgICAgICAgICAubWFwKGluZGV4ID0+IGluZGV4KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nb1RvID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgaWYgKCRzY29wZS5nb3RvKSB7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJHNjb3BlLmdvdG8uc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBbJHNjb3BlLmdvdG8ua2V5XTogdGhpcy5jb250ZW50W2luZGV4XVskc2NvcGUuZ290by5rZXldXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmdvVG9QYWdlID0gKHBhZ2VOdW1iZXIpID0+IHtcbiAgICAgICAgc3dpdGNoICgkc2NvcGUudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnZHJpdmVycyc6XG4gICAgICAgICAgICAgICAgICAgIGRyaXZlcnNEYXRhU2VydmljZS5nZXREcml2ZXJzKCRzY29wZS51c2VySWQsIHBhZ2VOdW1iZXIpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnYmVhY29ucyc6XG4gICAgICAgICAgICAgICAgICAgIGJlYWNvbnNEYXRhU2VydmljZS5nZXRCZWFjb25zKCRzY29wZS51c2VySWQsIHBhZ2VOdW1iZXIpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH07XG59Il19
