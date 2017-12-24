(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module('MetronicApp', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'angular-jwt', 'naif.base64', 'angularModalService', 'angular-ladda', 'angular-progress-button-styles', 'swangular', 'ui.bootstrap.datetimepicker', 'ngAnimate', 'pascalprecht.translate', 'vcRecaptcha']);

MetronicApp.constant('CONFIG', {
    'SERVER': 'http://52.35.199.200:80',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQTs7OztBQUtBO0FBQ0EsSUFBTSxjQUFjLFFBQVEsTUFBUixDQUFlLGFBQWYsRUFBOEIsQ0FDOUMsV0FEOEMsRUFFOUMsY0FGOEMsRUFHOUMsWUFIOEMsRUFJOUMsYUFKOEMsRUFLOUMsYUFMOEMsRUFNOUMscUJBTjhDLEVBTzlDLGVBUDhDLEVBUTlDLGdDQVI4QyxFQVM5QyxXQVQ4QyxFQVU5Qyw2QkFWOEMsRUFXOUMsV0FYOEMsRUFZOUMsd0JBWjhDLEVBYTlDLGFBYjhDLENBQTlCLENBQXBCOztBQWdCQSxZQUFZLFFBQVosQ0FBcUIsUUFBckIsRUFBK0I7QUFDM0IsY0FBVSwyQkFEaUI7QUFFM0IsMEJBQXNCLENBQ2xCO0FBQ0ksY0FBTSxTQURWO0FBRUksZUFBTyxDQUZYO0FBR0ksY0FBTTtBQUhWLEtBRGtCLEVBTWxCO0FBQ0ksY0FBTSxTQURWO0FBRUksZUFBTyxDQUZYO0FBR0ksY0FBTTtBQUhWLEtBTmtCLEVBV2xCO0FBQ0ksY0FBTSxTQURWO0FBRUksZUFBTyxDQUZYO0FBR0ksY0FBTTtBQUhWLEtBWGtCLEVBZ0JsQjtBQUNJLGNBQU0sU0FEVjtBQUVJLGVBQU8sQ0FGWDtBQUdJLGNBQU07QUFIVixLQWhCa0IsQ0FGSztBQXVCM0IsaUJBQWEsQ0FDVDtBQUNJLGVBQU8sT0FEWDtBQUVJLGNBQU0sY0FGVjtBQUdJLG1CQUFXO0FBSGYsS0FEUyxFQU1UO0FBQ0ksZUFBTyxPQURYO0FBRUksY0FBTSxjQUZWO0FBR0ksbUJBQVc7QUFIZixLQU5TLEVBV1Q7QUFDSSxlQUFPLE9BRFg7QUFFSSxjQUFNLFFBRlY7QUFHSSxtQkFBVztBQUhmLEtBWFMsRUFnQlQ7QUFDSSxlQUFPLE9BRFg7QUFFSSxjQUFNLFFBRlY7QUFHSSxtQkFBVztBQUhmLEtBaEJTO0FBdkJjLENBQS9COztBQStDQSxZQUFZ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QUFHSCxLQUpEOztBQU1BLFNBQUssSUFBTCxHQUFZLFVBQVMsS0FBVCxFQUFnQjtBQUN4QixZQUFJLE9BQU8sSUFBWCxFQUFpQjtBQUNiLG1CQUFPLEVBQVAsQ0FBVSxPQUFPLElBQVAsQ0FBWSxLQUF0QixzQkFDSyxPQUFPLElBQVAsQ0FBWSxHQURqQixFQUN1QixLQUFLLE9BQUwsQ0FBYSxLQUFiLEVBQW9CLE9BQU8sSUFBUCxDQUFZLEdBQWhDLENBRHZCO0FBR0g7QUFDSixLQU5EOztBQVFBLFNBQUssUUFBTCxHQUFnQixVQUFDLFVBQUQsRUFBZ0I7QUFDNUIsZ0JBQVEsT0FBTyxJQUFmO0FBQ0ksaUJBQUssU0FBTDtBQUNRLG1DQUFtQixVQUFuQixDQUE4QixPQUFPLE1BQXJDLEVBQTZDLFVBQTdDLEVBQXlELElBQXpELENBQThELFVBQUMsTUFBRCxFQUFZO0FBQ3RFLDRCQUFLLElBQUwsR0FBWSxNQUFaO0FBQ0gsaUJBRkQ7QUFHSjs7QUFFSixpQkFBSyxTQUFMO0FBQ1EsbUNBQW1CLFVBQW5CLENBQThCLE9BQU8sTUFBckMsRUFBNkMsVUFBN0MsRUFBeUQsSUFBekQsQ0FBOEQsVUFBQyxNQUFELEVBQVk7QUFDdEUsNEJBQUssSUFBTCxHQUFZLE1BQVo7QUFDSCxpQkFGRDtBQUdKO0FBWFI7QUFhSCxLQWREO0FBZUgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqKlxyXG5NZXRyb25pYyBBbmd1bGFySlMgQXBwIE1haW4gU2NyaXB0XHJcbioqKi9cclxuXHJcblxyXG4vKiBNZXRyb25pYyBBcHAgKi9cclxuY29uc3QgTWV0cm9uaWNBcHAgPSBhbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnLCBbXHJcbiAgICAndWkucm91dGVyJyxcclxuICAgICd1aS5ib290c3RyYXAnLFxyXG4gICAgJ25nU2FuaXRpemUnLFxyXG4gICAgJ2FuZ3VsYXItand0JyxcclxuICAgICduYWlmLmJhc2U2NCcsXHJcbiAgICAnYW5ndWxhck1vZGFsU2VydmljZScsXHJcbiAgICAnYW5ndWxhci1sYWRkYScsXHJcbiAgICAnYW5ndWxhci1wcm9ncmVzcy1idXR0b24tc3R5bGVzJyxcclxuICAgICdzd2FuZ3VsYXInLFxyXG4gICAgJ3VpLmJvb3RzdHJhcC5kYXRldGltZXBpY2tlcicsXHJcbiAgICAnbmdBbmltYXRlJyxcclxuICAgICdwYXNjYWxwcmVjaHQudHJhbnNsYXRlJyxcclxuICAgICd2Y1JlY2FwdGNoYSdcclxuXSk7XHJcblxyXG5NZXRyb25pY0FwcC5jb25zdGFudCgnQ09ORklHJywge1xyXG4gICAgJ1NFUlZFUic6ICdodHRwOi8vNTIuMzUuMTk5LjIwMDo4MDgwJyxcclxuICAgICdEUklWRVJfUEVSTUlTU0lPTlMnOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAnTEVWRUxfQScsXHJcbiAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgICAgICBuYW1lOiAnRFJJVkVSX0ZPUk0uRFJJVkVSX1BFUk1JU1NJT05TLkxFVkVMX0EnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdMRVZFTF9CJyxcclxuICAgICAgICAgICAgdmFsdWU6IDEsXHJcbiAgICAgICAgICAgIG5hbWU6ICdEUklWRVJfRk9STS5EUklWRVJfUEVSTUlTU0lPTlMuTEVWRUxfQidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ0xFVkVMX0MnLFxyXG4gICAgICAgICAgICB2YWx1ZTogMixcclxuICAgICAgICAgICAgbmFtZTogJ0RSSVZFUl9GT1JNLkRSSVZFUl9QRVJNSVNTSU9OUy5MRVZFTF9DJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAnTEVWRUxfRCcsXHJcbiAgICAgICAgICAgIHZhbHVlOiAzLFxyXG4gICAgICAgICAgICBuYW1lOiAnRFJJVkVSX0ZPUk0uRFJJVkVSX1BFUk1JU1NJT05TLkxFVkVMX0QnXHJcbiAgICAgICAgfV0sXHJcbiAgICAnTEFOR1VBR0VTJzogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWU6ICdFTl9VUycsXHJcbiAgICAgICAgICAgIG5hbWU6ICdFbmdsaXNoICh1cyknLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb246ICdsdHInXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlOiAnRU5fVUsnLFxyXG4gICAgICAgICAgICBuYW1lOiAnRW5nbGlzaCAodWspJyxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiAnbHRyJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTogJ0hFX0lMJyxcclxuICAgICAgICAgICAgbmFtZTogJ0hlYnJldycsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ3J0bCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWU6ICdERV9ERScsXHJcbiAgICAgICAgICAgIG5hbWU6ICdHZXJtYW4nLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb246ICdsdHInXHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG59KTtcclxuXHJcbk1ldHJvbmljQXBwLmNvbnN0YW50KCd1aURhdGV0aW1lUGlja2VyQ29uZmlnJywge1xyXG4gICAgZGF0ZUZvcm1hdDogJ2RkLU1NLXl5eXknLFxyXG4gICAgZGVmYXVsdFRpbWU6ICcwMDowMDowMCcsXHJcbiAgICBodG1sNVR5cGVzOiB7XHJcbiAgICAgICAgZGF0ZTogJ2RkLU1NLXl5eXknLFxyXG4gICAgICAgICdkYXRldGltZS1sb2NhbCc6ICd5eXl5LU1NLWRkVEhIOm1tOnNzLnNzcycsXHJcbiAgICAgICAgJ21vbnRoJzogJ01NLXl5eXknXHJcbiAgICB9LFxyXG4gICAgaW5pdGlhbFBpY2tlcjogJ2RhdGUnLFxyXG4gICAgcmVPcGVuRGVmYXVsdDogZmFsc2UsXHJcbiAgICBlbmFibGVEYXRlOiB0cnVlLFxyXG4gICAgZW5hYmxlVGltZTogZmFsc2UsXHJcbiAgICBidXR0b25CYXI6IHtcclxuICAgICAgICBzaG93OiBmYWxzZSxcclxuICAgICAgICBub3c6IHtcclxuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgdGV4dDogJ05vdydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRvZGF5OiB7XHJcbiAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgIHRleHQ6ICdUb2RheSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsZWFyOiB7XHJcbiAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgIHRleHQ6ICdDbGVhcidcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGU6IHtcclxuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgdGV4dDogJ0RhdGUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aW1lOiB7XHJcbiAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgIHRleHQ6ICdUaW1lJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xvc2U6IHtcclxuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgdGV4dDogJ0Nsb3NlJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjbG9zZU9uRGF0ZVNlbGVjdGlvbjogdHJ1ZSxcclxuICAgIGNsb3NlT25UaW1lTm93OiB0cnVlLFxyXG4gICAgYXBwZW5kVG9Cb2R5OiBmYWxzZSxcclxuICAgIGFsdElucHV0Rm9ybWF0czogW10sXHJcbiAgICBuZ01vZGVsT3B0aW9uczoge30sXHJcbiAgICBzYXZlQXM6IGZhbHNlLFxyXG4gICAgcmVhZEFzOiBmYWxzZSxcclxufSk7XHJcblxyXG5NZXRyb25pY0FwcC5jb25maWcoWydqd3RPcHRpb25zUHJvdmlkZXInLCAnJGh0dHBQcm92aWRlcicsIChqd3RPcHRpb25zUHJvdmlkZXIsICRodHRwUHJvdmlkZXIpID0+IHtcclxuICAgICRodHRwUHJvdmlkZXIuZGVmYXVsdHMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcclxuXHJcbiAgICBqd3RPcHRpb25zUHJvdmlkZXIuY29uZmlnKHtcclxuICAgICAgICBhdXRoUHJlZml4OiAnJyxcclxuICAgICAgICB3aGl0ZUxpc3RlZERvbWFpbnM6J2xvY2FsaG9zdCcsXHJcbiAgICAgICAgdG9rZW5HZXR0ZXI6ICgpID0+IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpLFxyXG4gICAgICAgIHVuYXV0aGVudGljYXRlZFJlZGlyZWN0b3I6IFsnJHN0YXRlJywgKCRzdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XHJcbiAgICAgICAgfV1cclxuICAgIH0pO1xyXG5cclxuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2p3dEludGVyY2VwdG9yJyk7XHJcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdhdXRoSW50ZXJjZXB0b3InKTtcclxuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2Vycm9ySGFuZGxlckludGVyY2VwdG9yJyk7XHJcbn1dKTtcclxuXHJcbk1ldHJvbmljQXBwLmNvbmZpZyhbJyR0cmFuc2xhdGVQcm92aWRlcicsIGZ1bmN0aW9uKCR0cmFuc2xhdGVQcm92aWRlcikge1xyXG4gICAgJHRyYW5zbGF0ZVByb3ZpZGVyLnVzZVN0YXRpY0ZpbGVzTG9hZGVyKHtcclxuICAgICAgICBwcmVmaXg6ICdhc3NldHMvbGFuZ3VhZ2VzLycsXHJcbiAgICAgICAgc3VmZml4OiAnLmpzb24nXHJcbiAgICB9KTtcclxuICAgIC8qXHJcbiAgICAgRU5fVVMoXCJlbi1VU1wiKSxcclxuICAgICBFTl9VSyhcImVuLUdCXCIpLFxyXG4gICAgIEhFX0lMKFwiaGUtSUxcIiksXHJcbiAgICAgREVfREUoXCJkZS1ERVwiKTtcclxuICAgICAqL1xyXG4gICAgY29uc3QgbGFuZ01hcCA9IHtcclxuICAgICAgICAnRU5fVVMnOiAnZW4tVVMnLFxyXG4gICAgICAgICdFTl9VSyc6ICdlbi1HQicsXHJcbiAgICAgICAgJ0hJX0lMJzogJ2hlLWlsJyxcclxuICAgICAgICAnREVfREUnOiAnZGUtZGUnXHJcbiAgICB9O1xyXG4gICAgJHRyYW5zbGF0ZVByb3ZpZGVyLnVzZVNhbml0aXplVmFsdWVTdHJhdGVneShudWxsKTtcclxuICAgIC8vJHRyYW5zbGF0ZVByb3ZpZGVyLnJlZ2lzdGVyQXZhaWxhYmxlTGFuZ3VhZ2VLZXlzKFsnZW4tVVMnLCAnZW4tR0InLCAnaGUtaWwnLCAnZGUtZGUnXSwgbGFuZ01hcCk7XHJcbiAgICAkdHJhbnNsYXRlUHJvdmlkZXIucHJlZmVycmVkTGFuZ3VhZ2UoJ2VuLVVTJyk7XHJcbiAgICAkdHJhbnNsYXRlUHJvdmlkZXIuZmFsbGJhY2tMYW5ndWFnZSgnZW4tVVMnKTtcclxufV0pO1xyXG5cclxuTWV0cm9uaWNBcHAuZmFjdG9yeSgnc2V0dGluZ3MnLCBbJyRyb290U2NvcGUnLCAoJHJvb3RTY29wZSkgPT4ge1xyXG4gICAgLy8gc3VwcG9ydGVkIGxhbmd1YWdlc1xyXG4gICAgY29uc3Qgc2V0dGluZ3MgPSB7XHJcbiAgICAgICAgbGF5b3V0OiB7XHJcbiAgICAgICAgICAgIHBhZ2VTaWRlYmFyQ2xvc2VkOiBmYWxzZSwgLy8gc2lkZWJhciBtZW51IHN0YXRlXHJcbiAgICAgICAgICAgIHBhZ2VDb250ZW50V2hpdGU6IHRydWUsIC8vIHNldCBwYWdlIGNvbnRlbnQgbGF5b3V0XHJcbiAgICAgICAgICAgIHBhZ2VCb2R5U29saWQ6IGZhbHNlLCAvLyBzb2xpZCBib2R5IGNvbG9yIHN0YXRlXHJcbiAgICAgICAgICAgIHBhZ2VBdXRvU2Nyb2xsT25Mb2FkOiAxMDAwIC8vIGF1dG8gc2Nyb2xsIHRvIHRvcCBvbiBwYWdlIGxvYWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzc2V0c1BhdGg6ICcuLi9hc3NldHMnLFxyXG4gICAgICAgIGdsb2JhbFBhdGg6ICcuLi9hc3NldHMvZ2xvYmFsJyxcclxuICAgICAgICBsYXlvdXRQYXRoOiAnLi4vYXNzZXRzL2xheW91dHMvbGF5b3V0JyxcclxuICAgIH07XHJcblxyXG4gICAgJHJvb3RTY29wZS5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cclxuICAgIHJldHVybiBzZXR0aW5ncztcclxufV0pO1xyXG5cclxuLyogU2V0dXAgQXBwIE1haW4gQ29udHJvbGxlciAqL1xyXG5NZXRyb25pY0FwcC5jb250cm9sbGVyKCdBcHBDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICgkc2NvcGUpID0+IHtcclxuICAgICRzY29wZS4kb24oJyR2aWV3Q29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgICAgICAvL0FwcC5pbml0Q29tcG9uZW50cygpOyAvLyBpbml0IGNvcmUgY29tcG9uZW50c1xyXG4gICAgICAgIC8vTGF5b3V0LmluaXQoKTsgLy8gIEluaXQgZW50aXJlIGxheW91dChoZWFkZXIsIGZvb3Rlciwgc2lkZWJhciwgZXRjKSBvbiBwYWdlIGxvYWQgaWYgdGhlIHBhcnRpYWxzIGluY2x1ZGVkIGluIHNlcnZlciBzaWRlIGluc3RlYWQgb2YgbG9hZGluZyB3aXRoIG5nLWluY2x1ZGUgZGlyZWN0aXZlXHJcbiAgICB9KTtcclxufV0pO1xyXG5cclxuLyogU2V0dXAgTGF5b3V0IFBhcnQgLSBIZWFkZXIgKi9cclxuTWV0cm9uaWNBcHAuY29udHJvbGxlcignSGVhZGVyQ29udHJvbGxlcicsIFsnJHNjb3BlJywgKCRzY29wZSkgPT4ge1xyXG4gICAgJHNjb3BlLiRvbignJGluY2x1ZGVDb250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgICAgIExheW91dC5pbml0SGVhZGVyKCk7IC8vIGluaXQgaGVhZGVyXHJcbiAgICB9KTtcclxufV0pO1xyXG5cclxuXHJcbk1ldHJvbmljQXBwLmNvbnRyb2xsZXIoJ1NpZGViYXJDb250cm9sbGVyJywgWyckc2NvcGUnLCAndXNlckRhdGFTZXJ2aWNlJywgKCRzY29wZSkgPT4ge1xyXG4gICAgJHNjb3BlLiRvbignJGluY2x1ZGVDb250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgICAgIExheW91dC5pbml0U2lkZWJhcigpOyAvLyBpbml0IHNpZGViYXJcclxuICAgIH0pO1xyXG59XSk7XHJcblxyXG5NZXRyb25pY0FwcC5jb250cm9sbGVyKCdCYWNrb2ZmaWNlQ29udHJvbGxlcicsIFsndXNlckRhdGFTZXJ2aWNlJywgJyRzY29wZScsICckc3RhdGUnLCAnQ09ORklHJywgJyR0cmFuc2xhdGUnLCAodXNlckRhdGFTZXJ2aWNlLCAkc2NvcGUsICRzdGF0ZSwgQ09ORklHLCAkdHJhbnNsYXRlKSA9PiB7XHJcbiAgICAkc3RhdGUuZ28odXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLm1haW5TdGF0ZVNjcmVlbik7XHJcbiAgICAkc2NvcGUuaXNDdXN0b21lciA9IHVzZXJEYXRhU2VydmljZS5pc0N1c3RvbWVyKCk7XHJcbiAgICAkc2NvcGUuaXNBZG1pbiA9IHVzZXJEYXRhU2VydmljZS5pc0FkbWluKCk7XHJcbiAgICAkc2NvcGUuY3VycmVudFVzZXIgPSB1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXI7XHJcblxyXG4gICAgX3NldERpcmVjdGlvbigpO1xyXG4gICAgY29uc3QgbGFuZ01hcCA9IHtcclxuICAgICAgICAnRU5fVVMnOiAnZW4tVVMnLFxyXG4gICAgICAgICdFTl9VSyc6ICdlbi1HQicsXHJcbiAgICAgICAgJ0hFX0lMJzogJ2hlLUlMJyxcclxuICAgICAgICAnREVfREUnOiAnZGUtREUnXHJcbiAgICB9O1xyXG4gICAgJHRyYW5zbGF0ZS51c2UobGFuZ01hcFskc2NvcGUuY3VycmVudFVzZXIubGFuZ3VhZ2VdKTtcclxuICAgICRzY29wZS5sYW5ndWFnZXMgPSBDT05GSUcuTEFOR1VBR0VTO1xyXG4gICAgJHNjb3BlLmNob29zZUxhbmd1YWdlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICghbGFuZ01hcFskc2NvcGUuY3VycmVudFVzZXIubGFuZ3VhZ2VdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgJHRyYW5zbGF0ZS51c2UobGFuZ01hcFskc2NvcGUuY3VycmVudFVzZXIubGFuZ3VhZ2VdKS50aGVuKCgpPT4ge1xyXG4gICAgICAgICAgICBfc2V0RGlyZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhU2VydmljZS51cGRhdGVVc2VyTGFuZ3VhZ2UoJHNjb3BlLmN1cnJlbnRVc2VyLmxhbmd1YWdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gX3NldERpcmVjdGlvbigpIHtcclxuICAgICAgICAkc2NvcGUuc2V0dGluZ3MuZGlyZWN0aW9uID0gQ09ORklHLkxBTkdVQUdFUy5maWx0ZXIoKGxhbmcpID0+IGxhbmcudmFsdWUgPT0gdXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmxhbmd1YWdlKTtcclxuICAgICAgICBpZiAoJHNjb3BlLnNldHRpbmdzLmRpcmVjdGlvbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZXR0aW5ncy5kaXJlY3Rpb24gPSAkc2NvcGUuc2V0dGluZ3MuZGlyZWN0aW9uWzBdLmRpcmVjdGlvbjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2V0dGluZ3MuZGlyZWN0aW9uID0gJ3J0bCc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufV0pO1xyXG5cclxuLyogU2V0dXAgUm91bnRpbmcgRm9yIEFsbCBQYWdlcyAqL1xyXG5NZXRyb25pY0FwcC5jb25maWcoWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLCAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikgPT4ge1xyXG4gICAgLy8gUmVkaXJlY3QgYW55IHVubWF0Y2hlZCB1cmxcclxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9iYWNrb2ZmaWNlJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gaXNTdGF0ZVBhcmFtcygkc3RhdGVQYXJhbXMsICRxKSB7XHJcbiAgICAgICAgaWYgKCRzdGF0ZVBhcmFtcy5pZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIC5zdGF0ZSgnbG9naW4nLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9sb2dpbicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdsb2dvdXQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9sb2dvdXQnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBbJyRzdGF0ZScsICckcScsICd1c2VyRGF0YVNlcnZpY2UnLCAoJHN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndG9rZW4nKTtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYmFja29mZmljZScsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2JhY2tvZmZpY2UnLFxyXG4gICAgICAgICAgICAvLyBhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYmFja29mZmljZS92aWV3cy9iYWNrb2ZmaWNlLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQmFja29mZmljZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVzTG9naW46IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTicsXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIHNldFVzZXJEYXRhOiB1c2VyRGF0YVNlcnZpY2UgPT4gdXNlckRhdGFTZXJ2aWNlLnNldFVzZXJEYXRhKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gRGFzaGJvYXJkXHJcbiAgICAgICAgLnN0YXRlKCdkYXNoYm9hcmQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9kYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICAgICAgcGFyZW50OiAnYmFja29mZmljZScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9kYXNoYm9hcmQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEYXNoYm9hcmRDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBnZXRTdGF0czogZGFzaGJvYXJkU2VydmljZSA9PiBkYXNoYm9hcmRTZXJ2aWNlLmdldFN0YXRzKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTicsXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnY3VzdG9tZXJMaXN0Jywge1xyXG4gICAgICAgICAgICB1cmw6ICcvY3VzdG9tZXJMaXN0JyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2N1c3RvbWVyTGlzdC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0N1c3RvbWVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgZ2V0Q3VzdG9tZXJzOiBjdXN0b21lcnNEYXRhU2VydmljZSA9PiBjdXN0b21lcnNEYXRhU2VydmljZS5nZXRDdXN0b21lcnMoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2FkZE5ld0N1c3RvbWVyJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvYWRkTmV3Q3VzdG9tZXInLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvYWRkTmV3Q3VzdG9tZXIuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDdXN0b21lckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnZWRpdEN1c3RvbWVyJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvZWRpdEN1c3RvbWVyLzppZCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9hZGROZXdDdXN0b21lci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0N1c3RvbWVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogbnVsbFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBpc1N0YXRlUGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgZ2V0Q3VzdG9tZXJzOiAoY3VzdG9tZXJzRGF0YVNlcnZpY2UsICRzdGF0ZVBhcmFtcykgPT4gY3VzdG9tZXJzRGF0YVNlcnZpY2UuZ2V0Q3VzdG9tZXJCeUlEKCRzdGF0ZVBhcmFtcy5pZCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYWRkTmV3RHJpdmVyJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvYWRkTmV3RHJpdmVyJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2FkZE5ld0RyaXZlci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0RyaXZlcnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJyxcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdlZGl0RHJpdmVyJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvZWRpdERyaXZlci86aWQnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvYWRkTmV3RHJpdmVyLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRHJpdmVyc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHBhcmFtOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogbnVsbFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBpc1N0YXRlUGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgZ2V0RHJpdmVyQnlJRDogKGRyaXZlcnNEYXRhU2VydmljZSwgJHN0YXRlUGFyYW1zLCB1c2VyRGF0YVNlcnZpY2UsIHNldFVzZXJEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRyaXZlcnNEYXRhU2VydmljZS5nZXREcml2ZXJCeUlEKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCwgJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTicsXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnZHJpdmVyc0xpc3QnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9kcml2ZXJzTGlzdC86aWQnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvZHJpdmVyc0xpc3QuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEcml2ZXJzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogbnVsbFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBnZXREcml2ZXJzOiAoZHJpdmVyc0RhdGFTZXJ2aWNlLCAkc3RhdGVQYXJhbXMsIHVzZXJEYXRhU2VydmljZSwgY3VzdG9tZXJzRGF0YVNlcnZpY2UsIHNldFVzZXJEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRzdGF0ZVBhcmFtcy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJzRGF0YVNlcnZpY2UuZ2V0Q3VzdG9tZXJCeUlEKCRzdGF0ZVBhcmFtcy5pZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcml2ZXJzRGF0YVNlcnZpY2UuZ2V0RHJpdmVycygkc3RhdGVQYXJhbXMuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkcml2ZXJzRGF0YVNlcnZpY2UuZ2V0RHJpdmVycyh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nLFxyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2FkZERyaXZlcnNQaG9uZU51bWJlcnMnLCB7XHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHVybDogJy9waG9uZU51bWJlcnMnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvcGhvbmVOdW1iZXJzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQ3VzdG9tZXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJyxcclxuICAgICAgICAgICAgICAgICdBRE1JTidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdwcmVmZXJlbmNlcycsIHtcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdXJsOiAnL3ByZWZlcmVuY2VzJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL3ByZWZlcmVuY2VzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQ3VzdG9tZXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJyxcclxuICAgICAgICAgICAgICAgICdBRE1JTidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhY3Rpdml0eUxvZycsIHtcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdXJsOiAnL2FjdGl2aXR5TG9nLzppZC86bW9udGgvOnllYXInLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvYWN0aXZpdHlMb2cuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEcml2ZXJzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogbnVsbCxcclxuICAgICAgICAgICAgICAgIG1vbnRoOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgeWVhcjogbnVsbFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBnZXRMb2c6IChkcml2ZXJzRGF0YVNlcnZpY2UsICRzdGF0ZVBhcmFtcywgdXNlckRhdGFTZXJ2aWNlLCBzZXRVc2VyRGF0YSkgPT5cclxuICAgICAgICAgICAgICAgICAgICBkcml2ZXJzRGF0YVNlcnZpY2UuZ2V0TG9nKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCwgJHN0YXRlUGFyYW1zLmlkLCAkc3RhdGVQYXJhbXMubW9udGgsICRzdGF0ZVBhcmFtcy55ZWFyKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJyxcclxuICAgICAgICAgICAgICAgICdBRE1JTidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdiZWFjb25zTGlzdCcsIHtcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdXJsOiAnL2JlYWNvbnNMaXN0LzppZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9iZWFjb25zTGlzdC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0JlYWNvbnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGlkOiBudWxsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIGdldEJlYWNvbnM6IChiZWFjb25zRGF0YVNlcnZpY2UsIHVzZXJEYXRhU2VydmljZSwgJHN0YXRlUGFyYW1zLCBzZXRVc2VyRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkc3RhdGVQYXJhbXMuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlYWNvbnNEYXRhU2VydmljZS5nZXRCZWFjb25zKCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuIHVzZXJEYXRhU2VydmljZS5zZXRVc2VyRGF0YSgpLnRoZW4oKCkgPT4gYmVhY29uc0RhdGFTZXJ2aWNlLmdldEJlYWNvbnModXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZWFjb25zRGF0YVNlcnZpY2UuZ2V0QmVhY29ucyh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nLFxyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2F0dGFjaEJlYWNvbicsIHtcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F0dGFjaEJlYWNvbi86aWQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvYXR0YWNoQmVhY29uLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQmVhY29uc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIGdldEJlYWNvbnM6IChiZWFjb25zRGF0YVNlcnZpY2UsIHVzZXJEYXRhU2VydmljZSwgc2V0VXNlckRhdGEpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlckRhdGFTZXJ2aWNlLnNldFVzZXJEYXRhKCkudGhlbigoKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIGJlYWNvbnNEYXRhU2VydmljZS5nZXRCZWFjb25zKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTicsXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnZWRpdEJlYWNvbicsIHtcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F0dGFjaEJlYWNvbi86aWQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvYXR0YWNoQmVhY29uLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQmVhY29uc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgaWQ6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTicsXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxufV0pO1xyXG5cclxuLyogSW5pdCBnbG9iYWwgc2V0dGluZ3MgYW5kIHJ1biB0aGUgYXBwICovXHJcbk1ldHJvbmljQXBwLnJ1bihbJyRyb290U2NvcGUnLCAnc2V0dGluZ3MnLCAnJHN0YXRlJywgJ2F1dGhNYW5hZ2VyJyxcclxuICAnJGh0dHAnLFxyXG4gICgkcm9vdFNjb3BlLCBzZXR0aW5ncywgJHN0YXRlLCBhdXRoTWFuYWdlcikgPT4ge1xyXG4gICAgJHJvb3RTY29wZS4kc3RhdGUgPSAkc3RhdGU7IC8vIHN0YXRlIHRvIGJlIGFjY2Vzc2VkIGZyb20gdmlld1xyXG4gICAgJHJvb3RTY29wZS4kc2V0dGluZ3MgPSBzZXR0aW5nczsgLy8gc3RhdGUgdG8gYmUgYWNjZXNzZWQgZnJvbSB2aWV3XHJcblxyXG4gICAgLy8gY2hlY2sgand0IG9uIHJlZnJlc2hcclxuICAgIGF1dGhNYW5hZ2VyLmNoZWNrQXV0aE9uUmVmcmVzaCgpO1xyXG4gICAgYXV0aE1hbmFnZXIucmVkaXJlY3RXaGVuVW5hdXRoZW50aWNhdGVkKCk7XHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oJ3Rva2VuSGFzRXhwaXJlZCcsICgpID0+ICRzdGF0ZS5nbygnbG9nb3V0JykpO1xyXG59XSk7XHJcblxyXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0JlYWNvbnNDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJHN0YXRlUGFyYW1zJywgJ2JlYWNvbnNEYXRhU2VydmljZScsICd1c2VyRGF0YVNlcnZpY2UnLCAnJHN0YXRlJyxcbiAgICAgICAgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIGJlYWNvbnNEYXRhU2VydmljZSwgdXNlckRhdGFTZXJ2aWNlLCAkc3RhdGUpIHtcblxuICAgICAgICAgICAgdGhpcy5iZWFjb25zID0gYmVhY29uc0RhdGFTZXJ2aWNlLmJlYWNvbnM7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMDtcblxuICAgICAgICAgICAgaWYgKCRzdGF0ZVBhcmFtcy5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaWQgPSAkc3RhdGVQYXJhbXMuaWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYXR0YWNoQmVhY29uID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGJlYWNvbnNEYXRhU2VydmljZS5hdHRhY2hCZWFjb24odXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkLCB0aGlzLmJlYWNvbilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gJHN0YXRlLmdvKCdiZWFjb25zTGlzdCcpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3VzcGVuZEJlYWNvbiA9IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJlYWNvbiA9IHRoaXMuYmVhY29ucy5jb250ZW50W2luZGV4XTtcbiAgICAgICAgICAgICAgICBiZWFjb24uYWN0aXZlID0gIWJlYWNvbi5hY3RpdmU7XG4gICAgICAgICAgICAgICAgYmVhY29uc0RhdGFTZXJ2aWNlLnRvZ2dsZUJlYWNvbih1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsIGJlYWNvbik7XG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIC8vQnVpbGQgYXJyYXkgd2l0aCBgdG90YWxQYWdlc2AgZWxlbWVudHMgYW5kIHJldHVybiBoaXMgaW5kZXhlc1xuICAgICAgICAgICAgLy9Vc2VkIGZvciBkaXNwbGF5aW5nIHRoZSBwYWdpbmF0b3JcbiAgICAgICAgICAgIHRoaXMudG90YWxQYWdlcyA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXlcbiAgICAgICAgICAgICAgICAgICAgLmFwcGx5KDAsIEFycmF5KHRoaXMuYmVhY29ucy50b3RhbFBhZ2VzKSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcChpbmRleCA9PiBpbmRleCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmdvVG9QYWdlID0gKHBhZ2VOdW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9ICRzdGF0ZVBhcmFtcy5pZCB8fCB1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQ7XG4gICAgICAgICAgICAgICAgYmVhY29uc0RhdGFTZXJ2aWNlLmdldEJlYWNvbnMoaWQsIHBhZ2VOdW1iZXIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVhY29ucyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlTnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMub3BlbkNhbGVuZGFyID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIF0pO1xuXG4vKiBcbiAgICBAU3VtbWFyeTogQ3VzdG9tZXIgY29udHJvbGxlciBcbiAgICBARGVzY3JpcHRpb246IGluIGNoYXJnZSBvZiBhbGwgbG9naWMgYWN0aW9ucyByZWxhdGVkIHRvIHRoZSBDdXN0b21lcnMuXG4qL1xuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuY29udHJvbGxlcignQ3VzdG9tZXJDb250cm9sbGVyJywgWyckc2NvcGUnLCAnY3VzdG9tZXJzRGF0YVNlcnZpY2UnLCAnJHN0YXRlUGFyYW1zJywgJ3VzZXJEYXRhU2VydmljZScsICckc3RhdGUnLFxuICAgICAgICBmdW5jdGlvbigkc2NvcGUsIGN1c3RvbWVyc0RhdGFTZXJ2aWNlLCAkc3RhdGVQYXJhbXMsIHVzZXJEYXRhU2VydmljZSwgJHN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVycyA9IGN1c3RvbWVyc0RhdGFTZXJ2aWNlLmN1c3RvbWVycztcbiAgICAgICAgICAgIHRoaXMuZW1haWxQYXR0ZXJuID0gL14oKFtePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSsoXFwuW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKykqKXwoXCIuK1wiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XG5cbiAgICAgICAgICAgIGlmICgkc3RhdGVQYXJhbXMuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQYXNzd29yZEZpZWxkcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXIgPSBjdXN0b21lcnNEYXRhU2VydmljZS5lZGl0aW5nQ3VzdG9tZXI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIG5ldyBjbGllbnQgbW9kZVxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Bhc3N3b3JkRmllbGRzID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRQZXJtaXNzaW9uTW9kZWwgPSAocGVybWlzc2lvbnMpID0+e1xuICAgICAgICAgICAgICAgIGlmICghcGVybWlzc2lvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFsbG93ZWRQZXJtaXNzaW9ucyA9IHBlcm1pc3Npb25zO1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsb3dlZFBlcm1pc3Npb24gPSB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbG93ZWRQZXJtaXNzaW9ucy5mb3JFYWNoKChwZXJtaXNzaW9uKSA9PnsgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsb3dlZFBlcm1pc3Npb25bcGVybWlzc2lvbi5wZXJtaXNzaW9uXSA9IHBlcm1pc3Npb24uYWxsb3dlZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2V0UGVybWlzc2lvbk1vZGVsKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5wZXJtaXNzaW9ucyk7XG5cbiAgICAgICAgICAgIHRoaXMuc2F2ZVBlcm1pc3Npb25zID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBwZXJtaXNzaW9ucyA9IFtdO1xuICAgICAgICAgICAgICAgIF8uZm9yRWFjaCh0aGlzLmFsbG93ZWRQZXJtaXNzaW9uLCAoYWxsb3dlZCwgcGVybWlzc2lvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGVybWlzc2lvbk9iaiA9IF8uZmluZCh0aGlzLmFsbG93ZWRQZXJtaXNzaW9ucywge3Blcm1pc3Npb246IHBlcm1pc3Npb259KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBlcm1pc3Npb25PYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25PYmouYWxsb3dlZCA9IGFsbG93ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9ucy5wdXNoKHBlcm1pc3Npb25PYmopO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbnMucHVzaCh7cGVybWlzc2lvbjogcGVybWlzc2lvbiwgYWxsb3dlZDogYWxsb3dlZH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY3VzdG9tZXJzRGF0YVNlcnZpY2Uuc2V0UGVybWlzc2lvbnModXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkLCBwZXJtaXNzaW9ucykudGhlbigocGVybWlzc2lvbnMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQZXJtaXNzaW9uTW9kZWwocGVybWlzc2lvbnMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5hZGROZXdDdXN0b21lciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVkaXRNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyc0RhdGFTZXJ2aWNlLmVkaXRDdXN0b21lcih0aGlzLmN1c3RvbWVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gJHN0YXRlLmdvKCdjdXN0b21lckxpc3QnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHRoaXMubG9hZGluZyA9IGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjdXN0b21lcnNEYXRhU2VydmljZS5hZGROZXdDdXN0b21lcih0aGlzLmN1c3RvbWVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gJHN0YXRlLmdvKCdjdXN0b21lckxpc3QnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHRoaXMubG9hZGluZyA9IGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmRyaXZlcnNQaG9uZU51bWJlcnMgPSB1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIucXVpY2tDYWxsTnVtYmVycztcblxuICAgICAgICAgICAgdGhpcy5zYXZlTnVtYmVycyA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBmaXRsZXIgb3V0IGVtcHR5IG9iamVjdHMgaW4gdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZHJpdmVyc1Bob25lTnVtYmVyc1xuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHggPT4geC5uYW1lLmxlbmd0aCA+IDAgJiYgeC5udW1iZXIubGVuZ3RoID4gMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1c3RvbWVyc0RhdGFTZXJ2aWNlLnNhdmVRdWlja0NhbGxOdW1iZXJzKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCwgeyBudW1iZXJzOiBkYXRhIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVOdW1iZXIgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBob25lTnVtYmVyc0Vycm9yID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5kcml2ZXJzUGhvbmVOdW1iZXJzID0gdGhpcy5kcml2ZXJzUGhvbmVOdW1iZXJzXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoeCA9PiB0aGlzLmRyaXZlcnNQaG9uZU51bWJlcnNbaW5kZXhdICE9PSB4KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuYWRkTmV3TnVtYmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRyaXZlcnNQaG9uZU51bWJlcnMubGVuZ3RoIDwgMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcml2ZXJzUGhvbmVOdW1iZXJzLnB1c2goeyBuYW1lOiAnJywgbnVtYmVyOiAnJyB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBob25lTnVtYmVyc0Vycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN1c3BlbmRDdXN0b21lciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyLmFjdGl2ZSA9ICF0aGlzLmN1c3RvbWVyLmFjdGl2ZTtcbiAgICAgICAgICAgICAgICBjdXN0b21lcnNEYXRhU2VydmljZS5zdXNwZW5kQ3VzdG9tZXIodGhpcy5jdXN0b21lcik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVBhc3N3b3JkRmllbGRzID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Bhc3N3b3JkRmllbGRzID0gIXRoaXMuc2hvd1Bhc3N3b3JkRmllbGRzO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIF0pO1xuXG4vKiBcclxuICAgIEBTdW1tYXJ5OiBEYXNoYm9hcmQgY29udHJvbGxlciBcclxuICAgIEBEZXNjcmlwdGlvbjogaW4gY2hhcmdlIG9mIGFsbCBsb2dpYyBhY3Rpb25zIHJlbGF0ZWQgdG8gdGhlIERhc2hib2FyZCBhbmQgZXZlcnkgY2hpbGQgc3RhdGUgb2YgdGhlIGRhc2hib2FyZC5cclxuKi9cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXHJcbiAgICAuY29udHJvbGxlcignRGFzaGJvYXJkQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ2Rhc2hib2FyZFNlcnZpY2UnLFxyXG4gICAgICAgIGZ1bmN0aW9uKCRzY29wZSwgZGFzaGJvYXJkU2VydmljZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRzID0gZGFzaGJvYXJkU2VydmljZS5zdGF0cztcclxuICAgICAgICB9XHJcbiAgICBdKTtcbi8qIFxuICAgIEBTdW1tYXJ5OiBEcml2ZXJzIGNvbnRyb2xsZXIgXG4gICAgQERlc2NyaXB0aW9uOiBpbiBjaGFyZ2Ugb2YgYWxsIGxvZ2ljIGFjdGlvbnMgcmVsYXRlZCB0byBEcml2ZXJzLCBcbiAgICBzdWNoIGFzIGFkZGluZyBuZXcgZHJpdmVycyBhbmQgZGlzcGxheSBkcml2ZXJzIGxpc3QuXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5jb250cm9sbGVyKCdEcml2ZXJzQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRzdGF0ZVBhcmFtcycsICdkcml2ZXJzRGF0YVNlcnZpY2UnLCAnJHN0YXRlJywgJ3VzZXJEYXRhU2VydmljZScsICdjdXN0b21lcnNEYXRhU2VydmljZScsICdDT05GSUcnLFxuICAgICAgICBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcywgZHJpdmVyc0RhdGFTZXJ2aWNlLCAkc3RhdGUsIHVzZXJEYXRhU2VydmljZSwgY3VzdG9tZXJzRGF0YVNlcnZpY2UsIENPTkZJRykge1xuICAgICAgICAgICAgdGhpcy5lZGl0TW9kZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kcml2ZXJzID0gZHJpdmVyc0RhdGFTZXJ2aWNlLmRyaXZlcnM7XG4gICAgICAgICAgICB0aGlzLnBlcm1pc3Npb25zID0gQ09ORklHLkRSSVZFUl9QRVJNSVNTSU9OUztcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUXVlcnkgPSAnJztcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSAwO1xuXG4gICAgICAgICAgICAvKiogXG4gICAgICAgICAgICAgKiB3ZSBjYW4gaGF2ZSBhICRzdGF0ZVBhcmFtcy5pZCBpbiAyIGNhc2VzOlxuICAgICAgICAgICAgICogZWRpdGluZyBhIGRyaXZlciBvciBnZXR0aW5nIGxpc3Qgb2YgZHJpdmVycyBwZXIgc3BlY2lmaWMgY3VzdG9tZXIgKGFzIHN1cGVyYWRtaW4pICBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKCRzdGF0ZVBhcmFtcy5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXIgPSBjdXN0b21lcnNEYXRhU2VydmljZS5lZGl0aW5nQ3VzdG9tZXI7IC8vIHdlJ3JlIGRpc3BsYXlpbmcgdGhlIGxpc3Qgb2YgZHJpdmVycyBmb3IgYSBzcGVjaWZpYyBjdXN0b21lci5cbiAgICAgICAgICAgICAgICB0aGlzLmlkID0gJHN0YXRlUGFyYW1zLmlkO1xuICAgICAgICAgICAgICAgIGlmICgkc3RhdGUuY3VycmVudC5uYW1lID09PSAnZWRpdERyaXZlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJpdmVyID0gZHJpdmVyc0RhdGFTZXJ2aWNlLmVkaXRpbmdEcml2ZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHsgLy8gbmV3IGRyaXZlciBtb2RlXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlID0gJ9eU15XXodejINeg15TXkiDXl9eT16knO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmFkZE5ld0RyaXZlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVkaXRNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRyaXZlcnNEYXRhU2VydmljZS5lZGl0RHJpdmVyKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCwgdGhpcy5kcml2ZXIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2RyaXZlcnNMaXN0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRyaXZlcnNEYXRhU2VydmljZS5hZGROZXdEcml2ZXIodXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkLCB0aGlzLmRyaXZlcikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZHJpdmVyc0xpc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5nb1RvRWRpdEN1c3RvbWVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZWRpdEN1c3RvbWVyJywgeyBpZDogdGhpcy5jdXN0b21lci5pZCB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMudmlld0xvZyA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FjdGl2aXR5TG9nJywge1xuICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5kcml2ZXIuaWQsXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiBuZXcgRGF0ZSgpLmdldE1vbnRoKCksXG4gICAgICAgICAgICAgICAgICAgIHllYXI6IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy50b2dnbGVTdXNwZW5kRHJpdmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJpdmVyLmFjdGl2ZSA9ICF0aGlzLmRyaXZlci5hY3RpdmU7XG4gICAgICAgICAgICAgICAgZHJpdmVyc0RhdGFTZXJ2aWNlLnN1c3BlbmREcml2ZXIodXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkLCB0aGlzLmRyaXZlcik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmdvVG8gPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICghJHNjb3BlLmlzQWRtaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdlZGl0RHJpdmVyJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuZHJpdmVycy5jb250ZW50W2luZGV4XS5pZFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBUT0RPIC0gbW92ZSB0byBoZWxwZXJcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy50b3RhbFBhZ2VzID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheVxuICAgICAgICAgICAgICAgICAgICAuYXBwbHkoMCwgQXJyYXkodGhpcy5kcml2ZXJzLnRvdGFsUGFnZXMpKVxuICAgICAgICAgICAgICAgICAgICAubWFwKGluZGV4ID0+IGluZGV4KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZ29Ub1BhZ2UgPSAocGFnZU51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGRlZmluZSB3aGljaCBpZCB0byB1c2UgZm9yIEFQSVxuICAgICAgICAgICAgICAgICAqIGlmIHdlJ3JlIGxvb2tpbmcgYXQgYSBsaXN0IG9mIGRyaXZlcnMgYXMgYSBjdXN0b21lciAtIHdlIG5lZWQgb3VyIG93biBpZFxuICAgICAgICAgICAgICAgICAqIGlmIHdlJ3JlIGxvb2tpbmcgYXQgYSBsaXN0IG9mIGRyaXZlcnMgYXMgYSBzdXBlciBhZG1pbiBmb3Igc3BlY2lmaWMgY3VzdG9tZXIgLSB3ZSBuZWVkIHRoZSBjdXN0b21lcidzIGlkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgY29uc3QgaWQgPSAkc3RhdGVQYXJhbXMuaWQgfHwgdXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkO1xuICAgICAgICAgICAgICAgIGRyaXZlcnNEYXRhU2VydmljZS5nZXREcml2ZXJzKGlkLCBwYWdlTnVtYmVyKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyaXZlcnMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFnZU51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNlYXJjaCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9ICRzdGF0ZVBhcmFtcy5pZCB8fCB1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQ7XG4gICAgICAgICAgICAgICAgZHJpdmVyc0RhdGFTZXJ2aWNlLnNlYXJjaChpZCwgdGhpcy5zZWFyY2hRdWVyeSkudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyaXZlcnMgPSByZXN1bHRzO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIF0pO1xuXG4vKiBcbiAgICBAU3VtbWFyeTogTG9naW4gY29udHJvbGxlciBcbiAgICBARGVzY3JpcHRpb246IGluIGNoYXJnZSBvZiBhbGwgbG9naWMgYWN0aW9ucyByZWxhdGVkIHRvIExvZ2luXG4qL1xuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuY29udHJvbGxlcignTG9naW5Db250cm9sbGVyJywgWyckc3RhdGUnLCAnYXV0aFNlcnZpY2UnLCAndXNlckRhdGFTZXJ2aWNlJyxcbiAgICAgICAgZnVuY3Rpb24oJHN0YXRlLCBhdXRoU2VydmljZSwgdXNlckRhdGFTZXJ2aWNlKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc3VibWl0ID0gKGlzVmFsaWQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogdGhpcy5lbWFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlY2FwdGNoYVJlc3BvbnNlOiB0aGlzLnJlY2FwdGNoYVJlc3BvbnNlXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgYXV0aFNlcnZpY2UubG9naW4odXNlcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHVzZXJEYXRhU2VydmljZS5zZXRVc2VyRGF0YSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbyh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIubWFpblN0YXRlU2NyZWVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbl0pO1xuXG4vKiBcbiAgICBAU3VtbWFyeTogTW9kYWwgY29udHJvbGxlciBcbiAgICBARGVzY3JpcHRpb246IGluIGNoYXJnZSBvZiBhbGwgbG9naWMgYWN0aW9ucyByZWxhdGVkIHRvIE1vZGFsXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5jb250cm9sbGVyKCdNb2RhbENvbnRyb2xsZXInLCBbJ2Nsb3NlJyxcbiAgICAgICAgZnVuY3Rpb24oY2xvc2UpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UgPSAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY2xvc2UsIGJ1dCBnaXZlIDUwMG1zIGZvciBib290c3RyYXAgdG8gYW5pbWF0ZVxuICAgICAgICAgICAgICAgIGNsb3NlKHJlc3VsdCwgNTAwKTsgXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5dKTtcbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLmRpcmVjdGl2ZSgnY29uZmlybVBhc3N3b3JkJywgY29uZmlybVBhc3N3b3JkQ29uZmlnKTtcblxuZnVuY3Rpb24gY29uZmlybVBhc3N3b3JkQ29uZmlnKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIG90aGVyTW9kZWxWYWx1ZTogJz1jb21wYXJlVG8nXG4gICAgICAgIH0sXG4gICAgICAgIGxpbms6IChzY29wZSwgZWxlbWVudCwgYXR0cmlidXRlcywgbmdNb2RlbCkgPT4ge1xuICAgICAgICAgICAgbmdNb2RlbC4kdmFsaWRhdG9ycy5jb21wYXJlVG8gPSAobW9kZWxWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb2RlbFZhbHVlID09PSBzY29wZS5vdGhlck1vZGVsVmFsdWU7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goJ290aGVyTW9kZWxWYWx1ZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBuZ01vZGVsLiR2YWxpZGF0ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqKlxyXG5HTG9iYWwgRGlyZWN0aXZlc1xyXG4qKiovXHJcblxyXG4vLyBSb3V0ZSBTdGF0ZSBMb2FkIFNwaW5uZXIodXNlZCBvbiBwYWdlIG9yIGNvbnRlbnQgbG9hZClcclxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcclxuICAgIC5kaXJlY3RpdmUoJ25nU3Bpbm5lckJhcicsIFsnJHJvb3RTY29wZScsICckc3RhdGUnLFxyXG4gICAgICAgIGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYnkgZGVmdWx0IGhpZGUgdGhlIHNwaW5uZXIgYmFyXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnaGlkZScpOyAvLyBoaWRlIHNwaW5uZXIgYmFyIGJ5IGRlZmF1bHRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZGlzcGxheSB0aGUgc3Bpbm5lciBiYXIgd2hlbmV2ZXIgdGhlIHJvdXRlIGNoYW5nZXModGhlIGNvbnRlbnQgcGFydCBzdGFydGVkIGxvYWRpbmcpXHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2hpZGUnKTsgLy8gc2hvdyBzcGlubmVyIGJhclxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBoaWRlIHRoZSBzcGlubmVyIGJhciBvbiByb3VudGUgY2hhbmdlIHN1Y2Nlc3MoYWZ0ZXIgdGhlIGNvbnRlbnQgbG9hZGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnaGlkZScpOyAvLyBoaWRlIHNwaW5uZXIgYmFyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygncGFnZS1vbi1sb2FkJyk7IC8vIHJlbW92ZSBwYWdlIGxvYWRpbmcgaW5kaWNhdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExheW91dC5zZXRBbmd1bGFySnNTaWRlYmFyTWVudUFjdGl2ZUxpbmsoJ21hdGNoJywgbnVsbCwgZXZlbnQuY3VycmVudFNjb3BlLiRzdGF0ZSk7IC8vIGFjdGl2YXRlIHNlbGVjdGVkIGxpbmsgaW4gdGhlIHNpZGViYXIgbWVudVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXV0byBzY29ybGwgdG8gcGFnZSB0b3BcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFwcC5zY3JvbGxUb3AoKTsgLy8gc2Nyb2xsIHRvIHRoZSB0b3Agb24gY29udGVudCBsb2FkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sICRyb290U2NvcGUuc2V0dGluZ3MubGF5b3V0LnBhZ2VBdXRvU2Nyb2xsT25Mb2FkKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGFuZGxlIGVycm9yc1xyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVOb3RGb3VuZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdoaWRlJyk7IC8vIGhpZGUgc3Bpbm5lciBiYXJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGFuZGxlIGVycm9yc1xyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VFcnJvcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdoaWRlJyk7IC8vIGhpZGUgc3Bpbm5lciBiYXJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICBdKTtcclxuXHJcbi8vIEhhbmRsZSBnbG9iYWwgTElOSyBjbGlja1xyXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxyXG4gICAgLmRpcmVjdGl2ZSgnYScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtLCBhdHRycykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGF0dHJzLm5nQ2xpY2sgfHwgYXR0cnMuaHJlZiA9PT0gJycgfHwgYXR0cnMuaHJlZiA9PT0gJyMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCBsaW5rIGNsaWNrIGZvciBhYm92ZSBjcml0ZXJpYVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuLy8gSGFuZGxlIERyb3Bkb3duIEhvdmVyIFBsdWdpbiBJbnRlZ3JhdGlvblxyXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxyXG4gICAgLmRpcmVjdGl2ZSgnZHJvcGRvd25NZW51SG92ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgZWxlbS5kcm9wZG93bkhvdmVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7XG4vKiBcbiAgICBAU3VtbWFyeTogQXV0aGVudGljYXRpb24gc2VydmljZSBcbiAgICBARGVzY3JpcHRpb246IGluIGNoYXJnZSBvZiBBUEkgcmVxdWVzdHMgYW5kIGRhdGEgcmVsYXRlZCB0byB1c2VyIGF1dGhlbnRpY2F0aW9uLlxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgLnNlcnZpY2UoJ2F1dGhTZXJ2aWNlJywgWyckaHR0cCcsICdDT05GSUcnLCAnc3dhbmd1bGFyJywgJ2Vycm9ySGFuZGxlclNlcnZpY2UnLFxuICAgIGZ1bmN0aW9uICgkaHR0cCwgQ09ORklHLCBzd2FuZ3VsYXIsIGVycm9ySGFuZGxlclNlcnZpY2UpIHtcblxuICAgICAgY29uc3Qgc2VydmVyID0gQ09ORklHLlNFUlZFUjtcblxuICAgICAgZnVuY3Rpb24gbG9naW4oY3JlZGVudGlhbHMpIHtcbiAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgLnBvc3Qoc2VydmVyICsgJy9hdXRoZW50aWNhdGUnLCBjcmVkZW50aWFscylcbiAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IHJlc3VsdC5oZWFkZXJzKCkuYXV0aG9yaXphdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCB0b2tlbik7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgaWYgKGVyci5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICAgICAgICBzd2FuZ3VsYXIuc3dhbCgn16TXqNeY15kg15TXlNeq15fXkdeo15XXqiDXqdeS15XXmdeZ150nLFxuICAgICAgICAgICAgICAgICfXkNeg15Ag15HXk9eV16cg15DXqiDXlNeg16rXldeg15nXnSDXqdeU15bXoNeqLicsXG4gICAgICAgICAgICAgICAgJ2luZm8nXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXJyb3JIYW5kbGVyU2VydmljZS5oYW5kbGUoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY2hlY2tDdXJyZW50VXNlcigpIHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgcmV0dXJuICRodHRwLmdldChzZXJ2ZXIgKyAnL3VzZXJzL2N1cnJlbnQnKTtcbiAgICAgICAgfSBlbHNlIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBsb2dpbixcbiAgICAgICAgY2hlY2tDdXJyZW50VXNlclxuICAgICAgfTtcbiAgICB9XG4gIF0pO1xuXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gIC5mYWN0b3J5KCdhdXRoSW50ZXJjZXB0b3InLCAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICAgICAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcbiAgICAgICAgaWYodG9rZW4pIGNvbmZpZy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSB0b2tlbjtcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgIH0sXG4gICAgICByZXNwb25zZTogKHJlcykgPT4ge1xuICAgICAgICBjb25zdCBuZXdUb2tlbiA9IHJlcy5oZWFkZXJzKCkuYXV0aG9yaXphdGlvbjtcbiAgICAgICAgY29uc3QgY3VycmVudFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XG5cbiAgICAgICAgaWYgKG5ld1Rva2VuICYmIG5ld1Rva2VuICE9PSBjdXJyZW50VG9rZW4pIHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCBuZXdUb2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxuLyogXG4gICAgQFN1bW1hcnk6IEJlYWNvbnMgRGF0YSBTZXJ2aWNlIFxuICAgIEBEZXNjcmlwdGlvbjogSW4gY2hhcmdlIG9mIEFQSSByZXF1ZXN0cyBhbmQgZGF0YSByZWxhdGVkIHRoZSBiZWFjb25zXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5zZXJ2aWNlKCdiZWFjb25zRGF0YVNlcnZpY2UnLCBbJyRxJywgJyRodHRwJywgJ0NPTkZJRycsICckaW5qZWN0b3InLFxuICAgICAgICBmdW5jdGlvbigkcSwgJGh0dHAsIENPTkZJRywgJGluamVjdG9yKSB7XG4gICAgICAgICAgICBjb25zdCBzZXJ2ZXIgPSBDT05GSUcuU0VSVkVSO1xuICAgICAgICAgICAgY29uc3Qgc3dhbmd1bGFyID0gJGluamVjdG9yLmdldCgnc3dhbmd1bGFyJyk7IC8vIGF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY3lcblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0QmVhY29ucyhpZCwgcGFnZU51bWJlciA9IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBgP3BhZ2U9JHtwYWdlTnVtYmVyfWA7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoYCR7c2VydmVyfS9jdXN0b21lcnMvJHtpZH0vYmVhY29ucyR7cGFyYW1zfWApXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVhY29ucyA9IHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWFjb25zLmNvbnRlbnQgPSB0aGlzLmJlYWNvbnMuY29udGVudC5tYXAoKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5sYXN0QWN0aXZpdHkgPSBtb21lbnQudXRjKG9iai5sYXN0QWN0aXZpdHkpLmNhbGVuZGFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5sYXN0QWN0aXZpdHkgPT09ICdJbnZhbGlkIGRhdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5sYXN0QWN0aXZpdHkgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBhdHRhY2hCZWFjb24oY3VzdG9tZXJJZCwgeyBzZXJpYWwsIHV1aWQsIGxpY2Vuc2VQbGF0ZU51bWJlciwgZXhwaXJ5RGF0ZSB9KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KGAke3NlcnZlcn0vY3VzdG9tZXJzLyR7Y3VzdG9tZXJJZH0vYmVhY29uc2AsIHsgc2VyaWFsLCB1dWlkLCBsaWNlbnNlUGxhdGVOdW1iZXIsIGV4cGlyeURhdGUgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyci5zdGF0dXMgPT09IDQwOSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3YW5ndWxhci5vcGVuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbFRlbXBsYXRlOiAnYmFja29mZmljZS90cGwvc2Vuc29yLTQwOS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0xvYWRlck9uQ29uZmlybTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogKCkgPT4ge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHRvZ2dsZUJlYWNvbihjdXN0b21lcklkLCB7IGlkLCBhY3RpdmUgfSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAucGF0Y2goYCR7c2VydmVyfS9jdXN0b21lcnMvJHtjdXN0b21lcklkfS9iZWFjb25zLyR7aWR9L2FjdGl2ZWAsIHsgYWN0aXZlIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZ2V0QmVhY29ucyxcbiAgICAgICAgICAgICAgICBhdHRhY2hCZWFjb24sXG4gICAgICAgICAgICAgICAgdG9nZ2xlQmVhY29uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgXSk7XG5cbi8qIFxuICAgIEBTdW1tYXJ5OiBDdXN0b21lcnMgRGF0YSBTZXJ2aWNlIFxuICAgIEBEZXNjcmlwdGlvbjogSW4gY2hhcmdlIG9mIEFQSSByZXF1ZXN0cyBhbmQgZGF0YSByZWxhdGVkIHRoZSBjdXN0b21lcnNcbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLnNlcnZpY2UoJ2N1c3RvbWVyc0RhdGFTZXJ2aWNlJywgWyckaHR0cCcsICdDT05GSUcnLCAnc3dhbmd1bGFyJyxcbiAgICAgICAgZnVuY3Rpb24oJGh0dHAsIENPTkZJRywgc3dhbmd1bGFyKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHNlcnZlciA9IENPTkZJRy5TRVJWRVI7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hcEN1c3RvbWVycyhkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlID8gaXRlbS5zdGF0dXMgPSAnQ1VTVE9NRVJfTElTVC5BQ1RJVkUnIDogaXRlbS5zdGF0dXMgPSAnQ1VTVE9NRVJfTElTVC5OT1RfQUNUSVZFJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEN1c3RvbWVycygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLmdldChzZXJ2ZXIgKyAnL2N1c3RvbWVycycpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJzID0gbWFwQ3VzdG9tZXJzKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZE5ld0N1c3RvbWVyKG5ld0N1c3RvbWVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld0N1c3RvbWVyLmNvbXBhbnlMb2dvKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0N1c3RvbWVyLmNvbXBhbnlMb2dvID0gbmV3Q3VzdG9tZXIuY29tcGFueUxvZ28uYmFzZTY0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBvc3Qoc2VydmVyICsgJy9jdXN0b21lcnMnLCBuZXdDdXN0b21lcilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIuc3RhdHVzID09PSA0MDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2FuZ3VsYXIub3Blbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxUZW1wbGF0ZTogJ2JhY2tvZmZpY2UvdHBsL2N1c3RvbWVyLTQwOS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0xvYWRlck9uQ29uZmlybTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAoKSA9PiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZWRpdEN1c3RvbWVyKHsgY29tcGFueU5hbWUsIGRpc3BsYXlOYW1lLCBwYXNzd29yZCwgZW1haWwsIGlkLCBhY3RpdmUsIGNvbXBhbnlMb2dvLCBjb21wYW55Um9sZSwgcGhvbmVOdW1iZXIgfSkge1xuICAgICAgICAgICAgICAgIGlmIChjb21wYW55TG9nbykge1xuICAgICAgICAgICAgICAgICAgICBjb21wYW55TG9nbyA9IGNvbXBhbnlMb2dvLmJhc2U2NDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wYXRjaChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgaWQsIHsgY29tcGFueU5hbWUsIGRpc3BsYXlOYW1lLCBwYXNzd29yZCwgZW1haWwsIGFjdGl2ZSwgY29tcGFueUxvZ28sIGNvbXBhbnlSb2xlLCBwaG9uZU51bWJlciB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0Q3VzdG9tZXJCeUlEKGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGlkKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdDdXN0b21lciA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gc2F2ZVF1aWNrQ2FsbE51bWJlcnMoaWQsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBhdGNoKHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBpZCArICcvbnVtYmVycycsIGRhdGEpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHN1c3BlbmRDdXN0b21lcih7IGlkLCBhY3RpdmUgfSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAucGF0Y2goc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGlkICsgJy9hY3RpdmUnLCB7IGFjdGl2ZSB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRQZXJtaXNzaW9ucyhpZCwgcGVybWlzc2lvbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBhdGNoKHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBpZCArICcvcGVybWlzc2lvbnMnLCB7IHBlcm1pc3Npb25zIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZ2V0Q3VzdG9tZXJzLFxuICAgICAgICAgICAgICAgIGFkZE5ld0N1c3RvbWVyLFxuICAgICAgICAgICAgICAgIGVkaXRDdXN0b21lcixcbiAgICAgICAgICAgICAgICBnZXRDdXN0b21lckJ5SUQsXG4gICAgICAgICAgICAgICAgc2F2ZVF1aWNrQ2FsbE51bWJlcnMsXG4gICAgICAgICAgICAgICAgc3VzcGVuZEN1c3RvbWVyLFxuICAgICAgICAgICAgICAgIHNldFBlcm1pc3Npb25zXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgXSk7XG4vKiBcbiAgICBAU3VtbWFyeTogRGFzaGJvYXJkIERhdGEgU2VydmljZSBcbiAgICBARGVzY3JpcHRpb246IEluIGNoYXJnZSBvZiBEYXNoYm9hcmQgZGF0YSBzdWNoIGFzIFN0YXRpc3RpY3NcbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLnNlcnZpY2UoJ2Rhc2hib2FyZFNlcnZpY2UnLCBbJyRodHRwJywgJ0NPTkZJRycsXG4gICAgICAgIGZ1bmN0aW9uKCRodHRwLCBDT05GSUcpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlcnZlciA9IENPTkZJRy5TRVJWRVI7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFN0YXRzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAuZ2V0KGAke3NlcnZlcn0vYWRtaW4vc3RhdGlzdGljc2ApXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHMgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHMueWVzdGVyZGF5QWN0aXZpdHlTZWNvbmRzID0gbW9tZW50KCkuaG91cnMoMCkubWludXRlcygwKS5zZWNvbmRzKHRoaXMuc3RhdHMueWVzdGVyZGF5QWN0aXZpdHlTZWNvbmRzKS5mb3JtYXQoJ0hIOm1tOnNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0cztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZ2V0U3RhdHNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcblxuLyogXG4gICAgQFN1bW1hcnk6IERyaXZlcnMgRGF0YSBTZXJ2aWNlIFxuICAgIEBEZXNjcmlwdGlvbjogSW4gY2hhcmdlIG9mIEFQSSByZXF1ZXN0cyBhbmQgZGF0YSByZWxhdGVkIHRoZSBkcml2ZXJzXG4qL1xuXG4vLyBpbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLnNlcnZpY2UoJ2RyaXZlcnNEYXRhU2VydmljZScsIFsnJGh0dHAnLCAnQ09ORklHJyxcbiAgICAgICAgZnVuY3Rpb24oJGh0dHAsIENPTkZJRykge1xuXG4gICAgICAgICAgICBjb25zdCBzZXJ2ZXIgPSBDT05GSUcuU0VSVkVSO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBEcml2ZXJzKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBkYXRhLmNvbnRlbnQubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWN0aXZlSG91cnMgPSBtb21lbnQoKS5ob3VycygwKS5taW51dGVzKDApLnNlY29uZHMoaXRlbS55ZXN0ZXJkYXlBY3Rpdml0eVNlY29uZHMpLmZvcm1hdCgnSEg6bW06c3MnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0RHJpdmVycyhpZCwgcGFnZU51bWJlciA9IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBgP3BhZ2U9JHtwYWdlTnVtYmVyfWA7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGlkICsgJy9kcml2ZXJzJyArIHBhcmFtcylcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcml2ZXJzID0gbWFwRHJpdmVycyhyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kcml2ZXJzO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0RHJpdmVyQnlJRChjdXN0b21lcklkLCBpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAuZ2V0KHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBjdXN0b21lcklkICsgJy9kcml2ZXJzLycgKyBpZClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0aW5nRHJpdmVyID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdEcml2ZXIucGVybWlzc2lvbkxldmVsID0gQ09ORklHLkRSSVZFUl9QRVJNSVNTSU9OU1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKG9iaikgPT4gb2JqLnR5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmluZGV4T2YodGhpcy5lZGl0aW5nRHJpdmVyLnBlcm1pc3Npb25MZXZlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGROZXdEcml2ZXIoY3VzdG9tZXJJZCwgeyBkaXNwbGF5TmFtZSwgaWROdW1iZXIsIHBob25lTnVtYmVyLCBwZXJtaXNzaW9uTGV2ZWwsIGxpY2Vuc2VOdW1iZXIgfSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAucG9zdChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgY3VzdG9tZXJJZCArICcvZHJpdmVycycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWROdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25MZXZlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpY2Vuc2VOdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGVkaXREcml2ZXIoY3VzdG9tZXJJZCwgeyBkaXNwbGF5TmFtZSwgaWROdW1iZXIsIHBob25lTnVtYmVyLCBpZCwgcGVybWlzc2lvbkxldmVsLCBhY3RpdmUsIGxpY2Vuc2VOdW1iZXIgfSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAucGF0Y2goc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGN1c3RvbWVySWQgKyAnL2RyaXZlcnMvJyArIGlkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uTGV2ZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlTnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzdXNwZW5kRHJpdmVyKGN1c3RvbWVySWQsIHsgaWQsIGFjdGl2ZSB9KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wYXRjaChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgY3VzdG9tZXJJZCArICcvZHJpdmVycy8nICsgaWQgKyAnL2FjdGl2ZScsIHsgYWN0aXZlIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRMb2coY3Vzb3RtZXJJZCwgaWQsIG1vbnRoLCB5ZWFyKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdG9TZWNvbmRzKHRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnRzID0gdGltZS5zcGxpdCgnOicpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCtwYXJ0c1swXSkgKiA2MCAqIDYwICsgKCtwYXJ0c1sxXSkgKiA2MCArICgrcGFydHNbMl0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBtb21lbnQoKS5kYXkoMCkubW9udGgobW9udGgpLnllYXIoeWVhcikuZm9ybWF0KCdZWVlZL01NL0REJyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLmdldChgJHtzZXJ2ZXJ9L2N1c3RvbWVycy8ke2N1c290bWVySWR9L2RyaXZlcnMvJHtpZH0vYWN0aXZpdHkvP2RhdGU9JHtkYXRlfWApXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nID0gcmVzLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChvYmopID0+IG9iai5lbmRlZEF0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZGF0ZSA9IGAke21vbWVudChvYmouc3RhcnRlZEF0KS5mb3JtYXQoJ0REL01NL1lZWVknKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouc3RhcnRlZEF0ID0gYCR7bW9tZW50LnV0YyhvYmouc3RhcnRlZEF0KS5mb3JtYXQoJ0REL01NL1lZWVkgSEg6bW06c3MnKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZW5kZWRBdCA9IGAke21vbWVudC51dGMob2JqLmVuZGVkQXQpLmZvcm1hdCgnREQvTU0vWVlZWSBISDptbTpzcycpfWA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5kcml2ZXJTdGF0dXNMb2dzICYmIG9iai5kcml2ZXJTdGF0dXNMb2dzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmRyaXZlclN0YXR1c0xvZ3MgPSBvYmouZHJpdmVyU3RhdHVzTG9ncy5tYXAoKHN0YXR1cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5kYXRlID0gYCR7bW9tZW50LnV0YyhzdGF0dXMuc3RhcnRlZEF0KS5mb3JtYXQoJ0REL01NL1lZWVknKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5zdGFydGVkQXQgPSBgJHttb21lbnQudXRjKHN0YXR1cy5zdGFydGVkQXQpLmNhbGVuZGFyKCl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZW5kZWRBdCA9IGAke21vbWVudC51dGMoc3RhdHVzLmVuZGVkQXQpLmNhbGVuZGFyKCl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEFjdGl2aXR5ID0gdGhpcy5sb2dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai50b3RhbFRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0b1NlY29uZHMob2JqLnRvdGFsVGltZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVkdWNlKChhLCBiKSA9PiB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYSArIGI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxBY3Rpdml0eSA9IG1vbWVudCgpLmhvdXJzKDApLm1pbnV0ZXMoMCkuc2Vjb25kcyh0aGlzLnRvdGFsQWN0aXZpdHkpLmZvcm1hdCgnSEg6bW06c3MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gc2VhcmNoKGlkLCBxdWVyeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAuZ2V0KHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBpZCArICcvZHJpdmVycycgKyAnLz9xPScgKyBxdWVyeSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hcERyaXZlcnMocmVzLmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBnZXREcml2ZXJzLFxuICAgICAgICAgICAgICAgIGFkZE5ld0RyaXZlcixcbiAgICAgICAgICAgICAgICBlZGl0RHJpdmVyLFxuICAgICAgICAgICAgICAgIHN1c3BlbmREcml2ZXIsXG4gICAgICAgICAgICAgICAgZ2V0TG9nLFxuICAgICAgICAgICAgICAgIGdldERyaXZlckJ5SUQsXG4gICAgICAgICAgICAgICAgc2VhcmNoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgXSk7XG5cbi8qIFxuICAgIEBTdW1tYXJ5OiBFcnJvciBIYW5kbGluZyBJbnRlcmNlcHRvciBcbiAgICBARGVzY3JpcHRpb246IEluIGNoYXJnZSBvZiBpbnRlcmNlcHRpbmcgcmVzcG9uc2VzIGFuZCBkZXRlcm1pbmUgaWYgdGhlaXIgYW4gZXJyb3IuXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5mYWN0b3J5KCdlcnJvckhhbmRsZXJJbnRlcmNlcHRvcicsIFsnZXJyb3JIYW5kbGVyU2VydmljZScsXG4gICAgICAgIGZ1bmN0aW9uKGVycm9ySGFuZGxlclNlcnZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JIYW5kbGVyU2VydmljZS5oYW5kbGUoZXJyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gUHJvbWlzZS5yZXNvbHZlKGVycikpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4gUHJvbWlzZS5yZWplY3QoZXJyKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLnNlcnZpY2UoJ2Vycm9ySGFuZGxlclNlcnZpY2UnLCBbJyRpbmplY3RvcicsXG4gICAgICAgIGZ1bmN0aW9uKCRpbmplY3Rvcikge1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBoYW5kbGUoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3dhbmd1bGFyID0gJGluamVjdG9yLmdldCgnc3dhbmd1bGFyJyk7IC8vIGF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY3lcbiAgICAgICAgICAgICAgICBjb25zdCAkc3RhdGUgPSAkaW5qZWN0b3IuZ2V0KCckc3RhdGUnKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoZXJyLnN0YXR1cykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQwMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoJ3VuYXV0aG9yaXplZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQwMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2FuZ3VsYXIub3Blbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxUZW1wbGF0ZTogJ2JhY2tvZmZpY2UvdHBsLzQwMy5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0xvYWRlck9uQ29uZmlybTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogKCkgPT4ge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3YW5ndWxhci5vcGVuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbFRlbXBsYXRlOiAnL2JhY2tvZmZpY2UvdHBsLzQwNC5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0xvYWRlck9uQ29uZmlybTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogKCkgPT4ge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoJ25vdCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQwOTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoJ2R1cGxpY2F0ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQwMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1MDI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dhbmd1bGFyLm9wZW4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sVGVtcGxhdGU6ICdiYWNrb2ZmaWNlL3RwbC81MDIuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dMb2FkZXJPbkNvbmZpcm06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICgpID0+IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaGFuZGxlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgXSk7XG4vKiBcbiAgICBAU3VtbWFyeTogVXNlciBEYXRhIFNlcnZpY2UgXG4gICAgQERlc2NyaXB0aW9uOiBJbiBjaGFyZ2Ugb2YgQVBJIHJlcXVlc3RzIGFuZCBkYXRhIHJlbGF0ZWQgdGhlIHVzZXIgdGhhdCBpcyBub3cgbG9nZ2VkIGluIHRvIHRoZSBhcHAuXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5zZXJ2aWNlKCd1c2VyRGF0YVNlcnZpY2UnLCBbJ2F1dGhTZXJ2aWNlJywgJyRzdGF0ZScsICckaHR0cCcsICdDT05GSUcnLFxuICAgICAgICBmdW5jdGlvbihhdXRoU2VydmljZSwgJHN0YXRlLCAkaHR0cCwgQ09ORklHKSB7XG4gICAgICAgICAgICBjb25zdCBzZXJ2ZXIgPSBDT05GSUcuU0VSVkVSO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRVc2VyRGF0YSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXV0aFNlcnZpY2UuY2hlY2tDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFVzZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICdtYWluU3RhdGVTY3JlZW4nOidsb2dpbidcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuY3VycmVudFVzZXIscmVzLmRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBfaXNBZG1pbiA9IGlzQWRtaW4uYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfaXNBZG1pbigpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VXNlci5tYWluU3RhdGVTY3JlZW4gPSAnY3VzdG9tZXJMaXN0JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VXNlci5tYWluU3RhdGVTY3JlZW4gPSAnZHJpdmVyc0xpc3QnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4gJHN0YXRlLmdvKCdsb2dpbicpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gaXNDdXN0b21lcigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50VXNlci5yb2xlcy5pbmNsdWRlcygnQ1VTVE9NRVInKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gaXNBZG1pbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50VXNlci5yb2xlcy5pbmNsdWRlcygnQURNSU4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlVXNlckxhbmd1YWdlKGxhbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAucGF0Y2goc2VydmVyICsgJy91c2Vycy9jdXJyZW50Jywge2xhbmd1YWdlOiBsYW5nfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2V0VXNlckRhdGEsXG4gICAgICAgICAgICAgICAgaXNDdXN0b21lcixcbiAgICAgICAgICAgICAgICBpc0FkbWluLFxuICAgICAgICAgICAgICAgIHVwZGF0ZVVzZXJMYW5ndWFnZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIF0pO1xuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5kaXJlY3RpdmUoJ2FjdGl2aXR5TG9nJywgYWN0aXZpdHlMb2dDb25maWcpO1xuXG5mdW5jdGlvbiBhY3Rpdml0eUxvZ0NvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS9qcy9kaXJlY3RpdmVzL2FjdGl2aXR5TG9nL2FjdGl2aXR5TG9nLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiBbJyRzdGF0ZScsICckc3RhdGVQYXJhbXMnLCAnZHJpdmVyc0RhdGFTZXJ2aWNlJywgYWN0aXZpdHlMb2dDb250cm9sbGVyXSxcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYWN0aXZpdHlMb2dDb250cm9sbGVyKCRzdGF0ZSwgJHN0YXRlUGFyYW1zLCBkcml2ZXJzRGF0YVNlcnZpY2UpIHtcbiAgICBjb25zdCBtb250aHMgPSBbXG4gICAgICAgICfXmdeg15XXkNeoJyxcbiAgICAgICAgJ9ek15HXqNeV15DXqCcsXG4gICAgICAgICfXnteo16UnLFxuICAgICAgICAn15DXpNeo15nXnCcsXG4gICAgICAgICfXnteQ15knLFxuICAgICAgICAn15nXldeg15knLFxuICAgICAgICAn15nXldec15knLFxuICAgICAgICAn15DXldeS15XXodeYJyxcbiAgICAgICAgJ9eh16TXmNee15HXqCcsXG4gICAgICAgICfXkNeV16fXmNeV15HXqCcsXG4gICAgICAgICfXoNeV15HXnteR16gnLFxuICAgICAgICAn15PXptee15HXqCdcbiAgICBdO1xuXG4gICAgJHN0YXRlUGFyYW1zLm1vbnRoID0gTnVtYmVyKCRzdGF0ZVBhcmFtcy5tb250aCk7XG4gICAgJHN0YXRlUGFyYW1zLnllYXIgPSBOdW1iZXIoJHN0YXRlUGFyYW1zLnllYXIpO1xuXG4gICAgdGhpcy5sb2cgPSBkcml2ZXJzRGF0YVNlcnZpY2UubG9nO1xuICAgIHRoaXMudG90YWxBY3Rpdml0eSA9IGRyaXZlcnNEYXRhU2VydmljZS50b3RhbEFjdGl2aXR5O1xuXG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IGAke21vbnRoc1skc3RhdGVQYXJhbXMubW9udGhdfSAkeyRzdGF0ZVBhcmFtcy55ZWFyfWA7XG4gICAgdGhpcy5pc0Z1dHVyZURhdGUgPSAkc3RhdGVQYXJhbXMubW9udGggPj0gbmV3IERhdGUoKS5nZXRNb250aCgpICYmICRzdGF0ZVBhcmFtcy55ZWFyID49IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgICB0aGlzLmlzUGFzdERhdGUgPSAkc3RhdGVQYXJhbXMueWVhciA8PSAyMDE1O1xuICAgIHRoaXMuZXhwYW5kZWRSb3dzID0ge307XG5cbiAgICB0aGlzLm5leHQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgkc3RhdGVQYXJhbXMueWVhciwgJHN0YXRlUGFyYW1zLm1vbnRoICsgMSwgMSk7XG4gICAgICAgICRzdGF0ZS5nbygnYWN0aXZpdHlMb2cnLCB7IG1vbnRoOiBkLmdldE1vbnRoKCksIHllYXI6IGQuZ2V0RnVsbFllYXIoKSB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5wcmV2ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkID0gbmV3IERhdGUoJHN0YXRlUGFyYW1zLnllYXIsICRzdGF0ZVBhcmFtcy5tb250aCAtIDEsIDEpO1xuICAgICAgICAkc3RhdGUuZ28oJ2FjdGl2aXR5TG9nJywgeyBtb250aDogZC5nZXRNb250aCgpLCB5ZWFyOiBkLmdldEZ1bGxZZWFyKCkgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZXhwYW5kID0gKGxvZykgPT4ge1xuICAgICAgICBsb2cuZXhwYW5kZWQgPSAhbG9nLmV4cGFuZGVkO1xuICAgIH07XG59XG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLmRpcmVjdGl2ZSgnYXBwRGF0YXRhYmxlJywgYXBwRGF0YXRhYmxlQ29uZmlnKTtcblxuZnVuY3Rpb24gYXBwRGF0YXRhYmxlQ29uZmlnKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICBkYXRhOiAnPScsXG4gICAgICAgICAgICB0YWJsZXRpdGxlOiAnPScsXG4gICAgICAgICAgICB0aHRpdGxlczogJz0nLFxuICAgICAgICAgICAgdGRkYXRhOiAnPScsXG4gICAgICAgICAgICBnb3RvOiAnPScsXG4gICAgICAgICAgICB0eXBlOiAnPScsXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiAnPScsXG4gICAgICAgICAgICB1c2VySWQ6ICc9JyxcbiAgICAgICAgICAgIHRyYW5zbGF0ZURhdGE6ICc9J1xuICAgICAgICB9LFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2UvanMvZGlyZWN0aXZlcy9hcHBEYXRhdGFibGUvYXBwRGF0YXRhYmxlLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiBbJyRzY29wZScsICckc3RhdGUnLCAnJHRpbWVvdXQnLCAnZHJpdmVyc0RhdGFTZXJ2aWNlJywgJ2JlYWNvbnNEYXRhU2VydmljZScsIGFwcERhdGF0YWJsZUNvbnRyb2xsZXJdLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBhcHBEYXRhdGFibGVDb250cm9sbGVyKCRzY29wZSwgJHN0YXRlLCAkdGltZW91dCwgZHJpdmVyc0RhdGFTZXJ2aWNlLCBiZWFjb25zRGF0YVNlcnZpY2UpIHtcblxuICAgIC8vIFB1dCBwcm9wZXJ0aWVzIG9uIHRoZSBjb250cm9sbGVyXG4gICAgdGhpcy5kYXRhID0gJHNjb3BlLmRhdGE7XG4gICAgdGhpcy5jb250ZW50ID0gdGhpcy5kYXRhLmNvbnRlbnQgfHwgdGhpcy5kYXRhO1xuICAgIHRoaXMudGh0aXRsZXMgPSAkc2NvcGUudGh0aXRsZXM7XG4gICAgdGhpcy50ZGRhdGEgPSAkc2NvcGUudGRkYXRhO1xuICAgIHRoaXMudGFibGV0aXRsZSA9ICRzY29wZS50YWJsZXRpdGxlO1xuICAgIHRoaXMudHJhbnNsYXRlRGF0YSA9ICRzY29wZS50cmFuc2xhdGVEYXRhO1xuICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICRzY29wZS4kd2F0Y2goJ3RhYmxldGl0bGUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC50YWJsZXRpdGxlID0gJHNjb3BlLnRhYmxldGl0bGU7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUuJHdhdGNoKCd0aHRpdGxlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnRodGl0bGVzID0gJHNjb3BlLnRodGl0bGVzO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQFRPRE8gbW92ZSB0byBoZWxwZXJcbiAgICAgKi9cbiAgICB0aGlzLnRvdGFsUGFnZXMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBBcnJheVxuICAgICAgICAgICAgLmFwcGx5KDAsIEFycmF5KHRoaXMuZGF0YS50b3RhbFBhZ2VzKSlcbiAgICAgICAgICAgIC5tYXAoaW5kZXggPT4gaW5kZXgpO1xuICAgIH07XG5cbiAgICB0aGlzLmdvVG8gPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICBpZiAoJHNjb3BlLmdvdG8pIHtcbiAgICAgICAgICAgICRzdGF0ZS5nbygkc2NvcGUuZ290by5zdGF0ZSwge1xuICAgICAgICAgICAgICAgIFskc2NvcGUuZ290by5rZXldOiB0aGlzLmNvbnRlbnRbaW5kZXhdWyRzY29wZS5nb3RvLmtleV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZ29Ub1BhZ2UgPSAocGFnZU51bWJlcikgPT4ge1xuICAgICAgICBzd2l0Y2ggKCRzY29wZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdkcml2ZXJzJzpcbiAgICAgICAgICAgICAgICAgICAgZHJpdmVyc0RhdGFTZXJ2aWNlLmdldERyaXZlcnMoJHNjb3BlLnVzZXJJZCwgcGFnZU51bWJlcikudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdiZWFjb25zJzpcbiAgICAgICAgICAgICAgICAgICAgYmVhY29uc0RhdGFTZXJ2aWNlLmdldEJlYWNvbnMoJHNjb3BlLnVzZXJJZCwgcGFnZU51bWJlcikudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfTtcbn0iXX0=
