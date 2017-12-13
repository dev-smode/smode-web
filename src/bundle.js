(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module('MetronicApp', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'angular-jwt', 'naif.base64', 'angularModalService', 'angular-ladda', 'angular-progress-button-styles', 'swangular', 'ui.bootstrap.datetimepicker', 'ngAnimate', 'pascalprecht.translate', 'vcRecaptcha']);

MetronicApp.constant('CONFIG', {
    'SERVER': 'http://localhost:8080',
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
MetronicApp.run(['$rootScope', 'settings', '$state', 'authManager', 'userDataService', 'authService', function ($rootScope, settings, $state, authManager, userDataService) {
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
            console.log('result:', result, 'auth', result.headers());
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
        if (localStorage.getItem('token')) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQTs7OztBQUtBO0FBQ0EsSUFBTSxjQUFjLFFBQVEsTUFBUixDQUFlLGFBQWYsRUFBOEIsQ0FDOUMsV0FEOEMsRUFFOUMsY0FGOEMsRUFHOUMsWUFIOEMsRUFJOUMsYUFKOEMsRUFLOUMsYUFMOEMsRUFNOUMscUJBTjhDLEVBTzlDLGVBUDhDLEVBUTlDLGdDQVI4QyxFQVM5QyxXQVQ4QyxFQVU5Qyw2QkFWOEMsRUFXOUMsV0FYOEMsRUFZOUMsd0JBWjhDLEVBYTlDLGFBYjhDLENBQTlCLENBQXBCOztBQWdCQSxZQUFZLFFBQVosQ0FBcUIsUUFBckIsRUFBK0I7QUFDM0IsY0FBVSx1QkFEaUI7QUFFM0IsMEJBQXNCLENBQ2xCO0FBQ0ksY0FBTSxTQURWO0FBRUksZUFBTyxDQUZYO0FBR0ksY0FBTTtBQUhWLEtBRGtCLEVBTWxCO0FBQ0ksY0FBTSxTQURWO0FBRUksZUFBTyxDQUZYO0FBR0ksY0FBTTtBQUhWLEtBTmtCLEVBV2xCO0FBQ0ksY0FBTSxTQURWO0FBRUksZUFBTyxDQUZYO0FBR0ksY0FBTTtBQUhWLEtBWGtCLEVBZ0JsQjtBQUNJLGNBQU0sU0FEVjtBQUVJLGVBQU8sQ0FGWDtBQUdJLGNBQU07QUFIVixLQWhCa0IsQ0FGSztBQXVCM0IsaUJBQWEsQ0FDVDtBQUNJLGVBQU8sT0FEWDtBQUVJLGNBQU0sY0FGVjtBQUdJLG1CQUFXO0FBSGYsS0FEUyxFQU1UO0FBQ0ksZUFBTyxPQURYO0FBRUksY0FBTSxjQUZWO0FBR0ksbUJBQVc7QUFIZixLQU5TLEVBV1Q7QUFDSSxlQUFPLE9BRFg7QUFFSSxjQUFNLFFBRlY7QUFHSSxtQkFBVztBQUhmLEtBWFMsRUFnQlQ7QUFDSSxlQUFPLE9BRFg7QUFFSSxjQUFNLFFBRlY7QUFHSSxtQkFBVztBQUhmLEtBaEJTO0FBdkJjLENBQS9COztBQStDQSxZQUFZLFFBQVosQ0FBcUIsd0JBQXJCLEVBQStDO0FBQzNDLGdCQUFZLFlBRCtCO0FBRTNDLGlCQUFhLFVBRjhCO0FBRzNDLGdCQUFZO0FBQ1IsY0FBTSxZQURFO0FBRVIsMEJBQWtCLHlCQUZWO0FBR1IsaUJBQVM7QUFIRCxLQUgrQjtBQVEzQyxtQkFBZSxNQVI0QjtBQVMzQyxtQkFBZSxLQVQ0QjtBQVUzQyxnQkFBWSxJQVYrQjtBQVczQyxnQkFBWSxLQVgrQjtBQVkzQyxlQUFXO0FBQ1AsY0FBTSxLQURDO0FBRVAsYUFBSztBQUNELGtCQUFNLElBREw7QUFFRCxrQkFBTTtBQUZMLFNBRkU7QUFNUCxlQUFPO0FBQ0gsa0JBQU0sSUFESDtBQUVILGtCQUFNO0FBRkgsU0FOQTtBQVVQLGVBQU87QUFDSCxrQkFBTSxJQURIO0FBRUgsa0JBQU07QUFGSCxTQVZBO0FBY1AsY0FBTTtBQUNGLGtCQUFNLElBREo7QUFFRixrQkFBTTtBQUZKLFNBZEM7QUFrQlAsY0FBTTtBQUNGLGtCQUFNLElBREo7QUFFRixrQkFBTTtBQUZKLFNBbEJDO0FBc0JQLGVBQU87QUFDSCxrQkFBTSxJQURIO0FBRUgsa0JBQU07QUFGSDtBQXRCQSxLQVpnQztBQXVDM0MsMEJBQXNCLElBdkNxQjtBQXdDM0Msb0JBQWdCLElBeEMyQjtBQXlDM0Msa0JBQWMsS0F6QzZCO0FBMEMzQyxxQkFBaUIsRUExQzBCO0FBMkMzQyxvQkFBZ0IsRUEzQzJCO0FBNEMzQyxZQUFRLEtBNUNtQztBQTZDM0MsWUFBUTtBQTdDbUMsQ0FBL0M7O0FBZ0RBLFlBQVksTUFBWixDQUFtQixDQUFDLG9CQUFELEVBQXVCLGVBQXZCLEVBQXdDLFVBQUMsa0JBQUQsRUFBcUIsYUFBckIsRUFBdUM7QUFDOUYsa0JBQWMsUUFBZCxDQUF1QixlQUF2QixHQUF5QyxJQUF6Qzs7QUFFQSx1QkFBbUIsTUFBbkIsQ0FBMEI7QUFDdEIsb0JBQVksRUFEVTtBQUV0Qiw0QkFBbUIsV0FGRztBQUd0QixxQkFBYTtBQUFBLG1CQUFNLGFBQWEsT0FBYixDQUFxQixPQUFyQixDQUFOO0FBQUEsU0FIUztBQUl0QixtQ0FBMkIsQ0FBQyxRQUFELEVBQVcsVUFBQyxNQUFELEVBQVk7QUFDOUMsbUJBQU8sRUFBUCxDQUFVLE9BQVY7QUFDSCxTQUYwQjtBQUpMLEtBQTFCOztBQVNBLGtCQUFjLFlBQWQsQ0FBMkIsSUFBM0IsQ0FBZ0MsZ0JBQWhDO0FBQ0Esa0JBQWMsWUFBZCxDQUEyQixJQUEzQixDQUFnQyxpQkFBaEM7QUFDQSxrQkFBYyxZQUFkLENBQTJCLElBQTNCLENBQWdDLHlCQUFoQztBQUNILENBZmtCLENBQW5COztBQWlCQSxZQUFZLE1BQVosQ0FBbUIsQ0FBQyxvQkFBRCxFQUF1QixVQUFTLGtCQUFULEVBQTZCO0FBQ25FLHVCQUFtQixvQkFBbkIsQ0FBd0M7QUFDcEMsZ0JBQVEsbUJBRDRCO0FBRXBDLGdCQUFRO0FBRjRCLEtBQXhDO0FBSUE7Ozs7OztBQU1BLFFBQU0sVUFBVTtBQUNaLGlCQUFTLE9BREc7QUFFWixpQkFBUyxPQUZHO0FBR1osaUJBQVMsT0FIRztBQUlaLGlCQUFTO0FBSkcsS0FBaEI7QUFNQSx1QkFBbUIsd0JBQW5CLENBQTRDLElBQTVDO0FBQ0E7QUFDQSx1QkFBbUIsaUJBQW5CLENBQXFDLE9BQXJDO0FBQ0EsdUJBQW1CLGdCQUFuQixDQUFvQyxPQUFwQztBQUNILENBckJrQixDQUFuQjs7QUF1QkEsWUFBWSxPQUFaLENBQW9CLFVBQXBCLEVBQWdDLENBQUMsWUFBRCxFQUFlLFVBQUMsVUFBRCxFQUFnQjtBQUMzRDtBQUNBLFFBQU0sV0FBVztBQUNiLGdCQUFRO0FBQ0osK0JBQW1CLEtBRGYsRUFDc0I7QUFDMUIsOEJBQWtCLElBRmQsRUFFb0I7QUFDeEIsMkJBQWUsS0FIWCxFQUdrQjtBQUN0QixrQ0FBc0IsSUFKbEIsQ0FJdUI7QUFKdkIsU0FESztBQU9iLG9CQUFZLFdBUEM7QUFRYixvQkFBWSxrQkFSQztBQVNiLG9CQUFZO0FBVEMsS0FBakI7O0FBWUEsZUFBVyxRQUFYLEdBQXNCLFFBQXRCOztBQUVBLFdBQU8sUUFBUDtBQUNILENBakIrQixDQUFoQzs7QUFtQkE7QUFDQSxZQUFZLFVBQVosQ0FBdUIsZUFBdkIsRUFBd0MsQ0FBQyxRQUFELEVBQVcsWUFBWCxFQUF5QixVQUFDLE1BQUQsRUFBWTtBQUN6RSxXQUFPLEdBQVAsQ0FBVyxvQkFBWCxFQUFpQyxZQUFNO0FBQ25DO0FBQ0E7QUFDSCxLQUhEO0FBSUgsQ0FMdUMsQ0FBeEM7O0FBT0E7QUFDQSxZQUFZLFVBQVosQ0FBdUIsa0JBQXZCLEVBQTJDLENBQUMsUUFBRCxFQUFXLFVBQUMsTUFBRCxFQUFZO0FBQzlELFdBQU8sR0FBUCxDQUFXLHVCQUFYLEVBQW9DLFlBQU07QUFDdEMsZUFBTyxVQUFQLEdBRHNDLENBQ2pCO0FBQ3hCLEtBRkQ7QUFHSCxDQUowQyxDQUEzQzs7QUFPQSxZQUFZLFVBQVosQ0FBdUIsbUJBQXZCLEVBQTRDLENBQUMsUUFBRCxFQUFXLGlCQUFYLEVBQThCLFVBQUMsTUFBRCxFQUFZO0FBQ2xGLFdBQU8sR0FBUCxDQUFXLHVCQUFYLEVBQW9DLFlBQU07QUFDdEMsZUFBTyxXQUFQLEdBRHNDLENBQ2hCO0FBQ3pCLEtBRkQ7QUFHSCxDQUoyQyxDQUE1Qzs7QUFNQSxZQUFZLFVBQVosQ0FBdUIsc0JBQXZCLEVBQStDLENBQUMsaUJBQUQsRUFBb0IsUUFBcEIsRUFBOEIsUUFBOUIsRUFBd0MsUUFBeEMsRUFBa0QsWUFBbEQsRUFBZ0UsVUFBQyxlQUFELEVBQWtCLE1BQWxCLEVBQTBCLE1BQTFCLEVBQWtDLE1BQWxDLEVBQTBDLFVBQTFDLEVBQXlEO0FBQ3BLLFdBQU8sRUFBUCxDQUFVLGdCQUFnQixXQUFoQixDQUE0QixlQUF0QztBQUNBLFdBQU8sVUFBUCxHQUFvQixnQkFBZ0IsVUFBaEIsRUFBcEI7QUFDQSxXQUFPLE9BQVAsR0FBaUIsZ0JBQWdCLE9BQWhCLEVBQWpCO0FBQ0EsV0FBTyxXQUFQLEdBQXFCLGdCQUFnQixXQUFyQzs7QUFFQTtBQUNBLFFBQU0sVUFBVTtBQUNaLGlCQUFTLE9BREc7QUFFWixpQkFBUyxPQUZHO0FBR1osaUJBQVMsT0FIRztBQUlaLGlCQUFTO0FBSkcsS0FBaEI7QUFNQSxlQUFXLEdBQVgsQ0FBZSxRQUFRLE9BQU8sV0FBUCxDQUFtQixRQUEzQixDQUFmO0FBQ0EsV0FBTyxTQUFQLEdBQW1CLE9BQU8sU0FBMUI7QUFDQSxXQUFPLGNBQVAsR0FBd0IsWUFBTTtBQUMxQixZQUFJLENBQUMsUUFBUSxPQUFPLFdBQVAsQ0FBbUIsUUFBM0IsQ0FBTCxFQUEyQztBQUN2QztBQUNIO0FBQ0QsbUJBQVcsR0FBWCxDQUFlLFFBQVEsT0FBTyxXQUFQLENBQW1CLFFBQTNCLENBQWYsRUFBcUQsSUFBckQsQ0FBMEQsWUFBSztBQUMzRDtBQUNBLDRCQUFnQixrQkFBaEIsQ0FBbUMsT0FBTyxXQUFQLENBQW1CLFFBQXREO0FBQ0gsU0FIRDtBQUlILEtBUkQ7O0FBVUEsYUFBUyxhQUFULEdBQXlCO0FBQ3JCLGVBQU8sUUFBUCxDQUFnQixTQUFoQixHQUE0QixPQUFPLFNBQVAsQ0FBaUIsTUFBakIsQ0FBd0IsVUFBQyxJQUFEO0FBQUEsbUJBQVUsS0FBSyxLQUFMLElBQWMsZ0JBQWdCLFdBQWhCLENBQTRCLFFBQXBEO0FBQUEsU0FBeEIsQ0FBNUI7QUFDQSxZQUFJLE9BQU8sUUFBUCxDQUFnQixTQUFoQixDQUEwQixNQUExQixHQUFtQyxDQUF2QyxFQUEwQztBQUN0QyxtQkFBTyxRQUFQLENBQWdCLFNBQWhCLEdBQTRCLE9BQU8sUUFBUCxDQUFnQixTQUFoQixDQUEwQixDQUExQixFQUE2QixTQUF6RDtBQUNILFNBRkQsTUFFTztBQUNILG1CQUFPLFFBQVAsQ0FBZ0IsU0FBaEIsR0FBNEIsS0FBNUI7QUFDSDtBQUNKO0FBRUosQ0FsQzhDLENBQS9DOztBQW9DQTtBQUNBLFlBQVksTUFBWixDQUFtQixDQUFDLGdCQUFELEVBQW1CLG9CQUFuQixFQUF5QyxVQUFDLGNBQUQsRUFBaUIsa0JBQWpCLEVBQXdDO0FBQ2hHO0FBQ0EsdUJBQW1CLFNBQW5CLENBQTZCLGFBQTdCOztBQUVBLGFBQVMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxFQUFyQyxFQUF5QztBQUNyQyxZQUFJLGFBQWEsRUFBYixDQUFnQixNQUFoQixLQUEyQixDQUEvQixFQUFrQztBQUM5QixtQkFBTyxHQUFHLE1BQUgsRUFBUDtBQUNIO0FBQ0o7O0FBRUQsbUJBQ0ssS0FETCxDQUNXLE9BRFgsRUFDb0I7QUFDWixhQUFLLFFBRE87QUFFWixxQkFBYSw2QkFGRDtBQUdaLG9CQUFZLGlCQUhBO0FBSVosc0JBQWM7QUFKRixLQURwQixFQU9LLEtBUEwsQ0FPVyxRQVBYLEVBT3FCO0FBQ2IsYUFBSyxTQURRO0FBRWIsb0JBQVksQ0FBQyxRQUFELEVBQVcsSUFBWCxFQUFpQixpQkFBakIsRUFBb0MsVUFBQyxNQUFELEVBQVk7QUFDeEQseUJBQWEsVUFBYixDQUF3QixPQUF4QjtBQUNBLG1CQUFPLEVBQVAsQ0FBVSxPQUFWO0FBQ0gsU0FIVztBQUZDLEtBUHJCLEVBY0ssS0FkTCxDQWNXLFlBZFgsRUFjeUI7QUFDakIsYUFBSyxhQURZO0FBRWpCO0FBQ0EscUJBQWEsbUNBSEk7QUFJakIsb0JBQVksc0JBSks7QUFLakIsc0JBQWMsSUFMRztBQU1qQixjQUFNO0FBQ0YsMkJBQWU7QUFEYixTQU5XO0FBU2pCLGVBQU8sQ0FDSCxPQURHLEVBRUgsVUFGRyxDQVRVO0FBYWpCLGlCQUFTO0FBQ0wseUJBQWE7QUFBQSx1QkFBbUIsZ0JBQWdCLFdBQWhCLEVBQW5CO0FBQUE7QUFEUjtBQWJRLEtBZHpCO0FBK0JJO0FBL0JKLEtBZ0NLLEtBaENMLENBZ0NXLFdBaENYLEVBZ0N3QjtBQUNoQixhQUFLLFlBRFc7QUFFaEIsa0JBQVUsSUFGTTtBQUdoQixnQkFBUSxZQUhRO0FBSWhCLHFCQUFhLGlDQUpHO0FBS2hCLG9CQUFZLHFCQUxJO0FBTWhCLHNCQUFjLElBTkU7QUFPaEIsaUJBQVM7QUFDTCxzQkFBVTtBQUFBLHVCQUFvQixpQkFBaUIsUUFBakIsRUFBcEI7QUFBQTtBQURMLFNBUE87QUFVaEIsZUFBTyxDQUNILE9BREcsRUFFSCxVQUZHO0FBVlMsS0FoQ3hCLEVBK0NLLEtBL0NMLENBK0NXLGNBL0NYLEVBK0MyQjtBQUNuQixhQUFLLGVBRGM7QUFFbkIsZ0JBQVEsV0FGVztBQUduQixxQkFBYSxvQ0FITTtBQUluQixvQkFBWSxvQkFKTztBQUtuQixzQkFBYyxJQUxLO0FBTW5CLGlCQUFTO0FBQ0wsMEJBQWM7QUFBQSx1QkFBd0IscUJBQXFCLFlBQXJCLEVBQXhCO0FBQUE7QUFEVCxTQU5VO0FBU25CLGVBQU8sQ0FDSCxPQURHO0FBVFksS0EvQzNCLEVBNERLLEtBNURMLENBNERXLGdCQTVEWCxFQTRENkI7QUFDckIsYUFBSyxpQkFEZ0I7QUFFckIsZ0JBQVEsV0FGYTtBQUdyQixxQkFBYSxzQ0FIUTtBQUlyQixvQkFBWSxvQkFKUztBQUtyQixzQkFBYyxJQUxPO0FBTXJCLGVBQU8sQ0FDSCxPQURHO0FBTmMsS0E1RDdCLEVBc0VLLEtBdEVMLENBc0VXLGNBdEVYLEVBc0UyQjtBQUNuQixhQUFLLG1CQURjO0FBRW5CLGdCQUFRLFdBRlc7QUFHbkIscUJBQWEsc0NBSE07QUFJbkIsb0JBQVksb0JBSk87QUFLbkIsc0JBQWMsSUFMSztBQU1uQixnQkFBUTtBQUNKLGdCQUFJO0FBREEsU0FOVztBQVNuQixpQkFBUztBQUNMLHdDQURLO0FBRUwsMEJBQWMsc0JBQUMsb0JBQUQsRUFBdUIsWUFBdkI7QUFBQSx1QkFBd0MscUJBQXFCLGVBQXJCLENBQXFDLGFBQWEsRUFBbEQsQ0FBeEM7QUFBQTtBQUZULFNBVFU7QUFhbkIsZUFBTyxDQUNILE9BREc7QUFiWSxLQXRFM0IsRUF1RkssS0F2RkwsQ0F1RlcsY0F2RlgsRUF1RjJCO0FBQ25CLGFBQUssZUFEYztBQUVuQixnQkFBUSxXQUZXO0FBR25CLHFCQUFhLG9DQUhNO0FBSW5CLG9CQUFZLG1CQUpPO0FBS25CLHNCQUFjLElBTEs7QUFNbkIsZUFBTyxDQUNILE9BREcsRUFFSCxVQUZHO0FBTlksS0F2RjNCLEVBa0dLLEtBbEdMLENBa0dXLFlBbEdYLEVBa0d5QjtBQUNqQixhQUFLLGlCQURZO0FBRWpCLGdCQUFRLFdBRlM7QUFHakIscUJBQWEsb0NBSEk7QUFJakIsb0JBQVksbUJBSks7QUFLakIsc0JBQWMsSUFMRztBQU1qQixlQUFPO0FBQ0gsZ0JBQUk7QUFERCxTQU5VO0FBU2pCLGlCQUFTO0FBQ0wsd0NBREs7QUFFTCwyQkFBZSx1QkFBQyxrQkFBRCxFQUFxQixZQUFyQixFQUFtQyxlQUFuQyxFQUFvRCxXQUFwRCxFQUFvRTtBQUMvRSx1QkFBTyxtQkFBbUIsYUFBbkIsQ0FBaUMsZ0JBQWdCLFdBQWhCLENBQTRCLEVBQTdELEVBQWlFLGFBQWEsRUFBOUUsQ0FBUDtBQUNIO0FBSkksU0FUUTtBQWVqQixlQUFPLENBQ0gsT0FERyxFQUVILFVBRkc7QUFmVSxLQWxHekIsRUFzSEssS0F0SEwsQ0FzSFcsYUF0SFgsRUFzSDBCO0FBQ2xCLGFBQUssa0JBRGE7QUFFbEIsZ0JBQVEsV0FGVTtBQUdsQixxQkFBYSxtQ0FISztBQUlsQixvQkFBWSxtQkFKTTtBQUtsQixzQkFBYyxJQUxJO0FBTWxCLGdCQUFRO0FBQ0osZ0JBQUk7QUFEQSxTQU5VO0FBU2xCLGlCQUFTO0FBQ0wsd0JBQVksb0JBQUMsa0JBQUQsRUFBcUIsWUFBckIsRUFBbUMsZUFBbkMsRUFBb0Qsb0JBQXBELEVBQTBFLFdBQTFFLEVBQTBGO0FBQ2xHLG9CQUFJLGFBQWEsRUFBakIsRUFBcUI7QUFDakIsMkJBQU8sUUFBUSxHQUFSLENBQVksQ0FDZixxQkFBcUIsZUFBckIsQ0FBcUMsYUFBYSxFQUFsRCxDQURlLEVBRWYsbUJBQW1CLFVBQW5CLENBQThCLGFBQWEsRUFBM0MsQ0FGZSxDQUFaLENBQVA7QUFJSCxpQkFMRCxNQUtPO0FBQ0gsMkJBQU8sbUJBQW1CLFVBQW5CLENBQThCLGdCQUFnQixXQUFoQixDQUE0QixFQUExRCxDQUFQO0FBQ0g7QUFDSjtBQVZJLFNBVFM7QUFxQmxCLGVBQU8sQ0FDSCxPQURHLEVBRUgsVUFGRztBQXJCVyxLQXRIMUIsRUFnSkssS0FoSkwsQ0FnSlcsd0JBaEpYLEVBZ0pxQztBQUM3QixnQkFBUSxXQURxQjtBQUU3QixhQUFLLGVBRndCO0FBRzdCLHFCQUFhLG9DQUhnQjtBQUk3QixvQkFBWSxvQkFKaUI7QUFLN0Isc0JBQWMsSUFMZTtBQU03QixlQUFPLENBQ0gsVUFERyxFQUVILE9BRkc7QUFOc0IsS0FoSnJDLEVBMkpLLEtBM0pMLENBMkpXLGFBM0pYLEVBMkowQjtBQUNsQixnQkFBUSxXQURVO0FBRWxCLGFBQUssY0FGYTtBQUdsQixxQkFBYSxtQ0FISztBQUlsQixvQkFBWSxvQkFKTTtBQUtsQixzQkFBYyxJQUxJO0FBTWxCLGVBQU8sQ0FDSCxVQURHLEVBRUgsT0FGRztBQU5XLEtBM0oxQixFQXNLSyxLQXRLTCxDQXNLVyxhQXRLWCxFQXNLMEI7QUFDbEIsZ0JBQVEsV0FEVTtBQUVsQixhQUFLLCtCQUZhO0FBR2xCLHFCQUFhLG1DQUhLO0FBSWxCLG9CQUFZLG1CQUpNO0FBS2xCLHNCQUFjLElBTEk7QUFNbEIsZ0JBQVE7QUFDSixnQkFBSSxJQURBO0FBRUosbUJBQU8sSUFGSDtBQUdKLGtCQUFNO0FBSEYsU0FOVTtBQVdsQixpQkFBUztBQUNMLG9CQUFRLGdCQUFDLGtCQUFELEVBQXFCLFlBQXJCLEVBQW1DLGVBQW5DLEVBQW9ELFdBQXBEO0FBQUEsdUJBQ0osbUJBQW1CLE1BQW5CLENBQTBCLGdCQUFnQixXQUFoQixDQUE0QixFQUF0RCxFQUEwRCxhQUFhLEVBQXZFLEVBQTJFLGFBQWEsS0FBeEYsRUFBK0YsYUFBYSxJQUE1RyxDQURJO0FBQUE7QUFESCxTQVhTO0FBZWxCLGVBQU8sQ0FDSCxVQURHLEVBRUgsT0FGRztBQWZXLEtBdEsxQixFQTBMSyxLQTFMTCxDQTBMVyxhQTFMWCxFQTBMMEI7QUFDbEIsZ0JBQVEsV0FEVTtBQUVsQixhQUFLLGtCQUZhO0FBR2xCLHFCQUFhLG1DQUhLO0FBSWxCLG9CQUFZLG1CQUpNO0FBS2xCLHNCQUFjLElBTEk7QUFNbEIsZ0JBQVE7QUFDSixnQkFBSTtBQURBLFNBTlU7QUFTbEIsaUJBQVM7QUFDTCx3QkFBWSxvQkFBQyxrQkFBRCxFQUFxQixlQUFyQixFQUFzQyxZQUF0QyxFQUFvRCxXQUFwRCxFQUFvRTtBQUM1RSxvQkFBSSxhQUFhLEVBQWpCLEVBQXFCO0FBQ2pCLDJCQUFPLG1CQUFtQixVQUFuQixDQUE4QixhQUFhLEVBQTNDLENBQVA7QUFDSCxpQkFGRCxNQUVPO0FBQ0g7QUFDQSwyQkFBTyxtQkFBbUIsVUFBbkIsQ0FBOEIsZ0JBQWdCLFdBQWhCLENBQTRCLEVBQTFELENBQVA7QUFDSDtBQUNKOztBQVJJLFNBVFM7QUFvQmxCLGVBQU8sQ0FDSCxPQURHLEVBRUgsVUFGRztBQXBCVyxLQTFMMUIsRUFtTkssS0FuTkwsQ0FtTlcsY0FuTlgsRUFtTjJCO0FBQ25CLGdCQUFRLFdBRFc7QUFFbkIsYUFBSyxtQkFGYztBQUduQixxQkFBYSxvQ0FITTtBQUluQixvQkFBWSxtQkFKTztBQUtuQixzQkFBYyxJQUxLO0FBTW5CLGlCQUFTO0FBQ0wsd0JBQVksb0JBQUMsa0JBQUQsRUFBcUIsZUFBckIsRUFBc0MsV0FBdEM7QUFBQTtBQUNSO0FBQ0EsdUNBQW1CLFVBQW5CLENBQThCLGdCQUFnQixXQUFoQixDQUE0QixFQUExRDtBQUZRO0FBQUE7QUFEUCxTQU5VO0FBV25CLGVBQU8sQ0FDSCxPQURHLEVBRUgsVUFGRztBQVhZLEtBbk4zQixFQW1PSyxLQW5PTCxDQW1PVyxZQW5PWCxFQW1PeUI7QUFDakIsZ0JBQVEsV0FEUztBQUVqQixhQUFLLG1CQUZZO0FBR2pCLHFCQUFhLG9DQUhJO0FBSWpCLG9CQUFZLG1CQUpLO0FBS2pCLHNCQUFjLElBTEc7QUFNakIsZ0JBQVE7QUFDSixnQkFBSTtBQURBLFNBTlM7QUFTakIsZUFBTyxDQUNILE9BREcsRUFFSCxVQUZHO0FBVFUsS0FuT3pCO0FBaVBILENBM1BrQixDQUFuQjs7QUE2UEE7QUFDQSxZQUFZLEdBQVosQ0FBZ0IsQ0FBQyxZQUFELEVBQWUsVUFBZixFQUEyQixRQUEzQixFQUFxQyxhQUFyQyxFQUFvRCxpQkFBcEQsRUFBdUUsYUFBdkUsRUFBc0YsVUFBQyxVQUFELEVBQWEsUUFBYixFQUF1QixNQUF2QixFQUErQixXQUEvQixFQUE0QyxlQUE1QyxFQUFnRTtBQUNsSyxlQUFXLE1BQVgsR0FBb0IsTUFBcEIsQ0FEa0ssQ0FDdEk7QUFDNUIsZUFBVyxTQUFYLEdBQXVCLFFBQXZCLENBRmtLLENBRWpJOztBQUVqQztBQUNBLGdCQUFZLGtCQUFaO0FBQ0EsZ0JBQVksMkJBQVo7O0FBRUEsZUFBVyxHQUFYLENBQWUsaUJBQWYsRUFBa0M7QUFBQSxlQUFNLE9BQU8sRUFBUCxDQUFVLFFBQVYsQ0FBTjtBQUFBLEtBQWxDO0FBQ0gsQ0FUZSxDQUFoQjs7QUFXQSxRQUFRLE1BQVIsQ0FBZSxhQUFmLEVBQ0ssVUFETCxDQUNnQixtQkFEaEIsRUFDcUMsQ0FBQyxRQUFELEVBQVcsY0FBWCxFQUEyQixvQkFBM0IsRUFBaUQsaUJBQWpELEVBQW9FLFFBQXBFLEVBQzdCLFVBQVMsTUFBVCxFQUFpQixZQUFqQixFQUErQixrQkFBL0IsRUFBbUQsZUFBbkQsRUFBb0UsTUFBcEUsRUFBNEU7QUFBQTs7QUFFeEUsU0FBSyxPQUFMLEdBQWUsbUJBQW1CLE9BQWxDO0FBQ0EsU0FBSyxXQUFMLEdBQW1CLENBQW5COztBQUVBLFFBQUksYUFBYSxFQUFqQixFQUFxQjtBQUNqQixhQUFLLEVBQUwsR0FBVSxhQUFhLEVBQXZCO0FBQ0g7O0FBRUQsU0FBSyxZQUFMLEdBQW9CLFlBQU07QUFDdEIsMkJBQW1CLFlBQW5CLENBQWdDLGdCQUFnQixXQUFoQixDQUE0QixFQUE1RCxFQUFnRSxNQUFLLE1BQXJFLEVBQ0ssSUFETCxDQUNVO0FBQUEsbUJBQU0sT0FBTyxFQUFQLENBQVUsYUFBVixDQUFOO0FBQUEsU0FEVjtBQUVILEtBSEQ7O0FBS0EsU0FBSyxtQkFBTCxHQUEyQixVQUFDLEtBQUQsRUFBVztBQUNsQyxZQUFNLFNBQVMsTUFBSyxPQUFMLENBQWEsT0FBYixDQUFxQixLQUFyQixDQUFmO0FBQ0EsZUFBTyxNQUFQLEdBQWdCLENBQUMsT0FBTyxNQUF4QjtBQUNBLDJCQUFtQixZQUFuQixDQUFnQyxnQkFBZ0IsV0FBaEIsQ0FBNEIsRUFBNUQsRUFBZ0UsTUFBaEU7QUFDSCxLQUpEOztBQU9BO0FBQ0E7QUFDQSxTQUFLLFVBQUwsR0FBa0IsWUFBTTtBQUNwQixlQUFPLE1BQ0YsS0FERSxDQUNJLENBREosRUFDTyxNQUFNLE1BQUssT0FBTCxDQUFhLFVBQW5CLENBRFAsRUFFRixHQUZFLENBRUU7QUFBQSxtQkFBUyxLQUFUO0FBQUEsU0FGRixDQUFQO0FBR0gsS0FKRDs7QUFNQSxTQUFLLFFBQUwsR0FBZ0IsVUFBQyxVQUFELEVBQWdCO0FBQzVCLFlBQU0sS0FBSyxhQUFhLEVBQWIsSUFBbUIsZ0JBQWdCLFdBQWhCLENBQTRCLEVBQTFEO0FBQ0EsMkJBQW1CLFVBQW5CLENBQThCLEVBQTlCLEVBQWtDLFVBQWxDLEVBQ0ssSUFETCxDQUNVLFVBQUMsTUFBRCxFQUFZO0FBQ2Qsa0JBQUssT0FBTCxHQUFlLE1BQWY7QUFDQSxrQkFBSyxXQUFMLEdBQW1CLFVBQW5CO0FBQ0gsU0FKTDtBQUtILEtBUEQ7O0FBU0EsU0FBSyxNQUFMLEdBQWMsS0FBZDs7QUFFQSxTQUFLLFlBQUwsR0FBb0IsVUFBUyxDQUFULEVBQVk7QUFDNUIsVUFBRSxjQUFGO0FBQ0EsVUFBRSxlQUFGOztBQUVBLGFBQUssTUFBTCxHQUFjLElBQWQ7QUFDSCxLQUxEO0FBTUgsQ0EvQzRCLENBRHJDOztBQW1EQTs7OztBQUlBLFFBQVEsTUFBUixDQUFlLGFBQWYsRUFDSyxVQURMLENBQ2dCLG9CQURoQixFQUNzQyxDQUFDLFFBQUQsRUFBVyxzQkFBWCxFQUFtQyxjQUFuQyxFQUFtRCxpQkFBbkQsRUFBc0UsUUFBdEUsRUFDOUIsVUFBUyxNQUFULEVBQWlCLG9CQUFqQixFQUF1QyxZQUF2QyxFQUFxRCxlQUFyRCxFQUFzRSxNQUF0RSxFQUE4RTtBQUFBOztBQUMxRSxTQUFLLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxTQUFLLFNBQUwsR0FBaUIscUJBQXFCLFNBQXRDO0FBQ0EsU0FBSyxZQUFMLEdBQW9CLHdKQUFwQjs7QUFFQSxRQUFJLGFBQWEsRUFBakIsRUFBcUI7QUFDakIsYUFBSyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsYUFBSyxrQkFBTCxHQUEwQixLQUExQjtBQUNBLGFBQUssUUFBTCxHQUFnQixxQkFBcUIsZUFBckM7QUFDSCxLQUpELE1BSU87QUFDSDtBQUNBLGFBQUssa0JBQUwsR0FBMEIsSUFBMUI7QUFDSDs7QUFFRCxTQUFLLGtCQUFMLEdBQTBCLFVBQUMsV0FBRCxFQUFnQjtBQUN0QyxZQUFJLENBQUMsV0FBTCxFQUFrQjtBQUNkO0FBQ0g7QUFDRCxlQUFLLGtCQUFMLEdBQTBCLFdBQTFCO0FBQ0EsZUFBSyxpQkFBTCxHQUF5QixFQUF6QjtBQUNBLGVBQUssa0JBQUwsQ0FBd0IsT0FBeEIsQ0FBZ0MsVUFBQyxVQUFELEVBQWU7QUFDM0MsbUJBQUssaUJBQUwsQ0FBdUIsV0FBVyxVQUFsQyxJQUFnRCxXQUFXLE9BQTNEO0FBQ0gsU0FGRDtBQUdILEtBVEQ7O0FBV0EsU0FBSyxrQkFBTCxDQUF3QixnQkFBZ0IsV0FBaEIsQ0FBNEIsV0FBcEQ7O0FBRUEsU0FBSyxlQUFMLEdBQXVCLFlBQU07QUFDekIsWUFBSSxjQUFjLEVBQWxCO0FBQ0EsVUFBRSxPQUFGLENBQVUsT0FBSyxpQkFBZixFQUFrQyxVQUFDLE9BQUQsRUFBVSxVQUFWLEVBQXlCO0FBQ3ZELGdCQUFJLGdCQUFnQixFQUFFLElBQUYsQ0FBTyxPQUFLLGtCQUFaLEVBQWdDLEVBQUMsWUFBWSxVQUFiLEVBQWhDLENBQXBCO0FBQ0EsZ0JBQUksYUFBSixFQUFtQjtBQUNmLDhCQUFjLE9BQWQsR0FBd0IsT0FBeEI7QUFDQSw0QkFBWSxJQUFaLENBQWlCLGFBQWpCO0FBQ0gsYUFIRCxNQUdPO0FBQ0gsNEJBQVksSUFBWixDQUFpQixFQUFDLFlBQVksVUFBYixFQUF5QixTQUFTLE9BQWxDLEVBQWpCO0FBQ0g7QUFDSixTQVJEO0FBU0EsNkJBQXFCLGNBQXJCLENBQW9DLGdCQUFnQixXQUFoQixDQUE0QixFQUFoRSxFQUFvRSxXQUFwRSxFQUFpRixJQUFqRixDQUFzRixVQUFDLFdBQUQsRUFBaUI7QUFDbkcsbUJBQUssa0JBQUwsQ0FBd0IsV0FBeEI7QUFDSCxTQUZEO0FBR0gsS0FkRDs7QUFnQkEsU0FBSyxjQUFMLEdBQXNCLFlBQU07QUFDeEIsZUFBSyxPQUFMLEdBQWUsSUFBZjtBQUNBLFlBQUksT0FBSyxRQUFULEVBQW1CO0FBQ2YsaUNBQXFCLFlBQXJCLENBQWtDLE9BQUssUUFBdkMsRUFDSyxJQURMLENBQ1U7QUFBQSx1QkFBTSxPQUFPLEVBQVAsQ0FBVSxjQUFWLENBQU47QUFBQSxhQURWLEVBRUssT0FGTCxDQUVhO0FBQUEsdUJBQU0sT0FBSyxPQUFMLEdBQWUsS0FBckI7QUFBQSxhQUZiO0FBR0gsU0FKRCxNQUlPO0FBQ0gsaUNBQXFCLGNBQXJCLENBQW9DLE9BQUssUUFBekMsRUFDSyxJQURMLENBQ1U7QUFBQSx1QkFBTSxPQUFPLEVBQVAsQ0FBVSxjQUFWLENBQU47QUFBQSxhQURWLEVBRUssT0FGTCxDQUVhO0FBQUEsdUJBQU0sT0FBSyxPQUFMLEdBQWUsS0FBckI7QUFBQSxhQUZiO0FBR0g7QUFDSixLQVhEOztBQWFBLFNBQUssbUJBQUwsR0FBMkIsZ0JBQWdCLFdBQWhCLENBQTRCLGdCQUF2RDs7QUFFQSxTQUFLLFdBQUwsR0FBbUIsWUFBTTtBQUNyQjtBQUNBLFlBQU0sT0FBTyxPQUFLLG1CQUFMLENBQ1IsTUFEUSxDQUNEO0FBQUEsbUJBQUssRUFBRSxJQUFGLENBQU8sTUFBUCxHQUFnQixDQUFoQixJQUFxQixFQUFFLE1BQUYsQ0FBUyxNQUFULEdBQWtCLENBQTVDO0FBQUEsU0FEQyxDQUFiO0FBRUEsZUFBTyxxQkFBcUIsb0JBQXJCLENBQTBDLGdCQUFnQixXQUFoQixDQUE0QixFQUF0RSxFQUEwRSxFQUFFLFNBQVMsSUFBWCxFQUExRSxDQUFQO0FBQ0gsS0FMRDs7QUFPQSxTQUFLLFlBQUwsR0FBb0IsVUFBQyxLQUFELEVBQVc7QUFDM0IsZUFBSyxpQkFBTCxHQUF5QixLQUF6QjtBQUNBLGVBQUssbUJBQUwsR0FBMkIsT0FBSyxtQkFBTCxDQUN0QixNQURzQixDQUNmO0FBQUEsbUJBQUssT0FBSyxtQkFBTCxDQUF5QixLQUF6QixNQUFvQyxDQUF6QztBQUFBLFNBRGUsQ0FBM0I7QUFFSCxLQUpEOztBQU1BLFNBQUssWUFBTCxHQUFvQixZQUFNO0FBQ3RCLFlBQUksT0FBSyxtQkFBTCxDQUF5QixNQUF6QixHQUFrQyxFQUF0QyxFQUEwQztBQUN0QyxtQkFBSyxtQkFBTCxDQUF5QixJQUF6QixDQUE4QixFQUFFLE1BQU0sRUFBUixFQUFZLFFBQVEsRUFBcEIsRUFBOUI7QUFDSCxTQUZELE1BRU87QUFDSCxtQkFBSyxpQkFBTCxHQUF5QixJQUF6QjtBQUNIO0FBQ0osS0FORDs7QUFRQSxTQUFLLHFCQUFMLEdBQTZCLFlBQU07QUFDL0IsZUFBSyxRQUFMLENBQWMsTUFBZCxHQUF1QixDQUFDLE9BQUssUUFBTCxDQUFjLE1BQXRDO0FBQ0EsNkJBQXFCLGVBQXJCLENBQXFDLE9BQUssUUFBMUM7QUFDSCxLQUhEOztBQUtBLFNBQUssb0JBQUwsR0FBNEIsWUFBTTtBQUM5QixlQUFLLGtCQUFMLEdBQTBCLENBQUMsT0FBSyxrQkFBaEM7QUFDSCxLQUZEO0FBR0gsQ0F4RjZCLENBRHRDOztBQTRGQTs7Ozs7QUFLQSxRQUFRLE1BQVIsQ0FBZSxhQUFmLEVBQ0ssVUFETCxDQUNnQixxQkFEaEIsRUFDdUMsQ0FBQyxRQUFELEVBQVcsa0JBQVgsRUFDL0IsVUFBUyxNQUFULEVBQWlCLGdCQUFqQixFQUFtQztBQUMvQixTQUFLLEtBQUwsR0FBYSxpQkFBaUIsS0FBOUI7QUFDSCxDQUg4QixDQUR2QztBQU1BOzs7Ozs7QUFNQSxRQUFRLE1BQVIsQ0FBZSxhQUFmLEVBQ0ssVUFETCxDQUNnQixtQkFEaEIsRUFDcUMsQ0FBQyxRQUFELEVBQVcsY0FBWCxFQUEyQixvQkFBM0IsRUFBaUQsUUFBakQsRUFBMkQsaUJBQTNELEVBQThFLHNCQUE5RSxFQUFzRyxRQUF0RyxFQUM3QixVQUFTLE1BQVQsRUFBaUIsWUFBakIsRUFBK0Isa0JBQS9CLEVBQW1ELE1BQW5ELEVBQTJELGVBQTNELEVBQTRFLG9CQUE1RSxFQUFrRyxNQUFsRyxFQUEwRztBQUFBOztBQUN0RyxTQUFLLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxTQUFLLE9BQUwsR0FBZSxtQkFBbUIsT0FBbEM7QUFDQSxTQUFLLFdBQUwsR0FBbUIsT0FBTyxrQkFBMUI7QUFDQSxTQUFLLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxTQUFLLFdBQUwsR0FBbUIsQ0FBbkI7O0FBRUE7Ozs7QUFJQSxRQUFJLGFBQWEsRUFBakIsRUFBcUI7QUFDakIsYUFBSyxRQUFMLEdBQWdCLHFCQUFxQixlQUFyQyxDQURpQixDQUNxQztBQUN0RCxhQUFLLEVBQUwsR0FBVSxhQUFhLEVBQXZCO0FBQ0EsWUFBSSxPQUFPLE9BQVAsQ0FBZSxJQUFmLEtBQXdCLFlBQTVCLEVBQTBDO0FBQ3RDLGlCQUFLLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxpQkFBSyxNQUFMLEdBQWMsbUJBQW1CLGFBQWpDO0FBQ0g7QUFDSixLQVBELE1BT087QUFBRTtBQUNMLGFBQUssSUFBTCxHQUFZLGNBQVo7QUFDSDs7QUFFRCxTQUFLLFlBQUwsR0FBb0IsWUFBTTtBQUN0QixlQUFLLE9BQUwsR0FBZSxJQUFmO0FBQ0EsWUFBSSxPQUFLLFFBQVQsRUFBbUI7QUFDZiwrQkFBbUIsVUFBbkIsQ0FBOEIsZ0JBQWdCLFdBQWhCLENBQTRCLEVBQTFELEVBQThELE9BQUssTUFBbkUsRUFBMkUsSUFBM0UsQ0FBZ0YsWUFBTTtBQUNsRix1QkFBSyxPQUFMLEdBQWUsS0FBZjtBQUNBLHVCQUFPLEVBQVAsQ0FBVSxhQUFWO0FBQ0gsYUFIRDtBQUlILFNBTEQsTUFLTztBQUNILCtCQUFtQixZQUFuQixDQUFnQyxnQkFBZ0IsV0FBaEIsQ0FBNEIsRUFBNUQsRUFBZ0UsT0FBSyxNQUFyRSxFQUE2RSxJQUE3RSxDQUFrRixZQUFNO0FBQ3BGLHVCQUFLLE9BQUwsR0FBZSxLQUFmO0FBQ0EsdUJBQU8sRUFBUCxDQUFVLGFBQVY7QUFDSCxhQUhEO0FBSUg7QUFDSixLQWJEOztBQWVBLFNBQUssZ0JBQUwsR0FBd0IsWUFBTTtBQUMxQixlQUFPLEVBQVAsQ0FBVSxjQUFWLEVBQTBCLEVBQUUsSUFBSSxPQUFLLFFBQUwsQ0FBYyxFQUFwQixFQUExQjtBQUNILEtBRkQ7O0FBSUEsU0FBSyxPQUFMLEdBQWUsWUFBTTtBQUNqQixlQUFPLEVBQVAsQ0FBVSxhQUFWLEVBQXlCO0FBQ3JCLGdCQUFJLE9BQUssTUFBTCxDQUFZLEVBREs7QUFFckIsbUJBQU8sSUFBSSxJQUFKLEdBQVcsUUFBWCxFQUZjO0FBR3JCLGtCQUFNLElBQUksSUFBSixHQUFXLFdBQVg7QUFIZSxTQUF6QjtBQUtILEtBTkQ7O0FBUUEsU0FBSyxtQkFBTCxHQUEyQixZQUFNO0FBQzdCLGVBQUssTUFBTCxDQUFZLE1BQVosR0FBcUIsQ0FBQyxPQUFLLE1BQUwsQ0FBWSxNQUFsQztBQUNBLDJCQUFtQixhQUFuQixDQUFpQyxnQkFBZ0IsV0FBaEIsQ0FBNEIsRUFBN0QsRUFBaUUsT0FBSyxNQUF0RTtBQUNILEtBSEQ7O0FBS0EsU0FBSyxJQUFMLEdBQVksVUFBUyxLQUFULEVBQWdCO0FBQ3hCLFlBQUksQ0FBQyxPQUFPLE9BQVosRUFBcUI7QUFDakIsbUJBQU8sRUFBUCxDQUFVLFlBQVYsRUFBd0I7QUFDcEIsb0JBQUksS0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixLQUFyQixFQUE0QjtBQURaLGFBQXhCO0FBR0g7QUFDSixLQU5EOztBQVFBOzs7QUFHQSxTQUFLLFVBQUwsR0FBa0IsWUFBTTtBQUNwQixlQUFPLE1BQ0YsS0FERSxDQUNJLENBREosRUFDTyxNQUFNLE9BQUssT0FBTCxDQUFhLFVBQW5CLENBRFAsRUFFRixHQUZFLENBRUU7QUFBQSxtQkFBUyxLQUFUO0FBQUEsU0FGRixDQUFQO0FBR0gsS0FKRDs7QUFNQSxTQUFLLFFBQUwsR0FBZ0IsVUFBQyxVQUFELEVBQWdCO0FBQzVCOzs7OztBQUtBLFlBQU0sS0FBSyxhQUFhLEVBQWIsSUFBbUIsZ0JBQWdCLFdBQWhCLENBQTRCLEVBQTFEO0FBQ0EsMkJBQW1CLFVBQW5CLENBQThCLEVBQTlCLEVBQWtDLFVBQWxDLEVBQ0ssSUFETCxDQUNVLFVBQUMsTUFBRCxFQUFZO0FBQ2QsbUJBQUssT0FBTCxHQUFlLE1BQWY7QUFDQSxtQkFBSyxXQUFMLEdBQW1CLFVBQW5CO0FBQ0gsU0FKTDtBQUtILEtBWkQ7O0FBY0EsU0FBSyxNQUFMLEdBQWMsWUFBTTtBQUNoQixZQUFNLEtBQUssYUFBYSxFQUFiLElBQW1CLGdCQUFnQixXQUFoQixDQUE0QixFQUExRDtBQUNBLDJCQUFtQixNQUFuQixDQUEwQixFQUExQixFQUE4QixPQUFLLFdBQW5DLEVBQWdELElBQWhELENBQXFELFVBQUMsT0FBRCxFQUFhO0FBQzlELG1CQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0gsU0FGRDtBQUdILEtBTEQ7QUFNSCxDQTVGNEIsQ0FEckM7O0FBZ0dBOzs7O0FBSUEsUUFBUSxNQUFSLENBQWUsYUFBZixFQUNLLFVBREwsQ0FDZ0IsaUJBRGhCLEVBQ21DLENBQUMsUUFBRCxFQUFXLGFBQVgsRUFBMEIsaUJBQTFCLEVBQzNCLFVBQVMsTUFBVCxFQUFpQixXQUFqQixFQUE4QixlQUE5QixFQUErQztBQUFBOztBQUUzQyxTQUFLLE1BQUwsR0FBYyxVQUFDLE9BQUQsRUFBYTtBQUN2QixZQUFJLE9BQUosRUFBYTtBQUNULGdCQUFNLE9BQU87QUFDVCwwQkFBVSxPQUFLLFFBRE47QUFFVCx1QkFBTyxPQUFLLEtBRkg7QUFHVCxtQ0FBbUIsT0FBSztBQUhmLGFBQWI7O0FBTUEsd0JBQVksS0FBWixDQUFrQixJQUFsQixFQUNLLElBREwsQ0FDVTtBQUFBLHVCQUFNLGdCQUFnQixXQUFoQixFQUFOO0FBQUEsYUFEVixFQUVLLElBRkwsQ0FFVSxZQUFNO0FBQ1IsdUJBQU8sRUFBUCxDQUFVLGdCQUFnQixXQUFoQixDQUE0QixlQUF0QztBQUNILGFBSkw7QUFLSDtBQUNKLEtBZEQ7QUFlSCxDQWxCMEIsQ0FEbkM7O0FBc0JBOzs7OztBQUtBLFFBQVEsTUFBUixDQUFlLGFBQWYsRUFDSyxVQURMLENBQ2dCLGlCQURoQixFQUNtQyxDQUFDLE9BQUQsRUFDM0IsVUFBUyxLQUFULEVBQWdCO0FBQ1osU0FBSyxLQUFMLEdBQWEsVUFBQyxNQUFELEVBQVk7QUFDckI7QUFDQSxjQUFNLE1BQU4sRUFBYyxHQUFkO0FBQ0gsS0FIRDtBQUlILENBTjBCLENBRG5DO0FBU0EsUUFBUSxNQUFSLENBQWUsYUFBZixFQUNLLFNBREwsQ0FDZSxpQkFEZixFQUNrQyxxQkFEbEM7O0FBR0EsU0FBUyxxQkFBVCxHQUFpQztBQUM3QixXQUFPO0FBQ0gsa0JBQVUsR0FEUDtBQUVILGlCQUFTLFNBRk47QUFHSCxlQUFPO0FBQ0gsNkJBQWlCO0FBRGQsU0FISjtBQU1ILGNBQU0sY0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQixVQUFqQixFQUE2QixPQUE3QixFQUF5QztBQUMzQyxvQkFBUSxXQUFSLENBQW9CLFNBQXBCLEdBQWdDLFVBQUMsVUFBRCxFQUFnQjtBQUM1Qyx1QkFBTyxlQUFlLE1BQU0sZUFBNUI7QUFDSCxhQUZEOztBQUlBLGtCQUFNLE1BQU4sQ0FBYSxpQkFBYixFQUFnQyxZQUFNO0FBQ2xDLHdCQUFRLFNBQVI7QUFDSCxhQUZEO0FBR0g7QUFkRSxLQUFQO0FBZ0JIO0FBQ0Q7Ozs7QUFJQTtBQUNBLFFBQVEsTUFBUixDQUFlLGFBQWYsRUFDSyxTQURMLENBQ2UsY0FEZixFQUMrQixDQUFDLFlBQUQsRUFBZSxRQUFmLEVBQ3ZCLFVBQVMsVUFBVCxFQUFxQjtBQUNqQixXQUFPO0FBQ0gsY0FBTSxjQUFTLEtBQVQsRUFBZ0IsT0FBaEIsRUFBeUI7QUFDM0I7QUFDQSxvQkFBUSxRQUFSLENBQWlCLE1BQWpCLEVBRjJCLENBRUQ7O0FBRTFCO0FBQ0EsdUJBQVcsR0FBWCxDQUFlLG1CQUFmLEVBQW9DLFlBQVc7QUFDM0Msd0JBQVEsV0FBUixDQUFvQixNQUFwQixFQUQyQyxDQUNkO0FBQ2hDLGFBRkQ7O0FBSUE7QUFDQSx1QkFBVyxHQUFYLENBQWUscUJBQWYsRUFBc0MsVUFBUyxLQUFULEVBQWdCO0FBQ2xELHdCQUFRLFFBQVIsQ0FBaUIsTUFBakIsRUFEa0QsQ0FDeEI7QUFDMUIsa0JBQUUsTUFBRixFQUFVLFdBQVYsQ0FBc0IsY0FBdEIsRUFGa0QsQ0FFWDtBQUN2Qyx1QkFBTyxpQ0FBUCxDQUF5QyxPQUF6QyxFQUFrRCxJQUFsRCxFQUF3RCxNQUFNLFlBQU4sQ0FBbUIsTUFBM0UsRUFIa0QsQ0FHa0M7O0FBRXBGO0FBQ0EsMkJBQVcsWUFBVztBQUNsQix3QkFBSSxTQUFKLEdBRGtCLENBQ0Q7QUFDcEIsaUJBRkQsRUFFRyxXQUFXLFFBQVgsQ0FBb0IsTUFBcEIsQ0FBMkIsb0JBRjlCO0FBR0gsYUFURDs7QUFXQTtBQUNBLHVCQUFXLEdBQVgsQ0FBZSxnQkFBZixFQUFpQyxZQUFXO0FBQ3hDLHdCQUFRLFFBQVIsQ0FBaUIsTUFBakIsRUFEd0MsQ0FDZDtBQUM3QixhQUZEOztBQUlBO0FBQ0EsdUJBQVcsR0FBWCxDQUFlLG1CQUFmLEVBQW9DLFlBQVc7QUFDM0Msd0JBQVEsUUFBUixDQUFpQixNQUFqQixFQUQyQyxDQUNqQjtBQUM3QixhQUZEO0FBR0g7QUEvQkUsS0FBUDtBQWlDSCxDQW5Dc0IsQ0FEL0I7O0FBdUNBO0FBQ0EsUUFBUSxNQUFSLENBQWUsYUFBZixFQUNLLFNBREwsQ0FDZSxHQURmLEVBQ29CLFlBQVc7QUFDdkIsV0FBTztBQUNILGtCQUFVLEdBRFA7QUFFSCxjQUFNLGNBQVMsS0FBVCxFQUFnQixJQUFoQixFQUFzQixLQUF0QixFQUE2QjtBQUMvQixnQkFBSSxNQUFNLE9BQU4sSUFBaUIsTUFBTSxJQUFOLEtBQWUsRUFBaEMsSUFBc0MsTUFBTSxJQUFOLEtBQWUsR0FBekQsRUFBOEQ7QUFDMUQscUJBQUssRUFBTCxDQUFRLE9BQVIsRUFBaUIsVUFBUyxDQUFULEVBQVk7QUFDekIsc0JBQUUsY0FBRixHQUR5QixDQUNMO0FBQ3ZCLGlCQUZEO0FBR0g7QUFDSjtBQVJFLEtBQVA7QUFVSCxDQVpMOztBQWNBO0FBQ0EsUUFBUSxNQUFSLENBQWUsYUFBZixFQUNLLFNBREwsQ0FDZSxtQkFEZixFQUNvQyxZQUFXO0FBQ3ZDLFdBQU87QUFDSCxjQUFNLGNBQVMsS0FBVCxFQUFnQixJQUFoQixFQUFzQjtBQUN4QixpQkFBSyxhQUFMO0FBQ0g7QUFIRSxLQUFQO0FBS0gsQ0FQTDtBQVFBOzs7OztBQUtBLFFBQVEsTUFBUixDQUFlLGFBQWYsRUFDSyxPQURMLENBQ2EsYUFEYixFQUM0QixDQUFDLE9BQUQsRUFBVSxRQUFWLEVBQW9CLFdBQXBCLEVBQWlDLHFCQUFqQyxFQUNwQixVQUFTLEtBQVQsRUFBZ0IsTUFBaEIsRUFBd0IsU0FBeEIsRUFBbUMsbUJBQW5DLEVBQXdEOztBQUVwRCxRQUFNLFNBQVMsT0FBTyxNQUF0Qjs7QUFFQSxhQUFTLEtBQVQsQ0FBZSxXQUFmLEVBQTRCO0FBQ3hCLGVBQU8sTUFDRixJQURFLENBQ0csU0FBUyxlQURaLEVBQzZCLFdBRDdCLEVBRUYsSUFGRSxDQUVHLFVBQUMsTUFBRCxFQUFZO0FBQ2Qsb0JBQVEsR0FBUixDQUFZLFNBQVosRUFBc0IsTUFBdEIsRUFBNkIsTUFBN0IsRUFBb0MsT0FBTyxPQUFQLEVBQXBDO0FBQ0EsZ0JBQU0sUUFBUSxPQUFPLE9BQVAsR0FBaUIsYUFBL0I7QUFDQSxtQkFBTyxhQUFhLE9BQWIsQ0FBcUIsT0FBckIsRUFBOEIsS0FBOUIsQ0FBUDtBQUNILFNBTkUsRUFPRixLQVBFLENBT0ksVUFBQyxHQUFELEVBQVM7QUFDWixnQkFBSSxJQUFJLE1BQUosS0FBZSxHQUFuQixFQUF3QjtBQUNwQiwwQkFBVSxJQUFWLENBQWUsc0JBQWYsRUFDSSw0QkFESixFQUVJLE1BRko7QUFJQSx1QkFBTyxRQUFRLE1BQVIsQ0FBZSxHQUFmLENBQVA7QUFDSCxhQU5ELE1BTU87QUFDSCxvQ0FBb0IsTUFBcEIsQ0FBMkIsR0FBM0I7QUFDSDtBQUNKLFNBakJFLENBQVA7QUFrQkg7O0FBRUQsYUFBUyxnQkFBVCxHQUE0QjtBQUN4QixZQUFJLGFBQWEsT0FBYixDQUFxQixPQUFyQixDQUFKLEVBQW1DO0FBQy9CLG1CQUFPLE1BQU0sR0FBTixDQUFVLFNBQVMsZ0JBQW5CLENBQVA7QUFDSCxTQUZELE1BRU8sT0FBTyxRQUFRLE1BQVIsRUFBUDtBQUNWOztBQUVELFdBQU87QUFDSCxvQkFERztBQUVIO0FBRkcsS0FBUDtBQUlILENBcENtQixDQUQ1Qjs7QUF5Q0EsUUFBUSxNQUFSLENBQWUsYUFBZixFQUNLLE9BREwsQ0FDYSxpQkFEYixFQUNnQyxZQUFNO0FBQzlCLFdBQU87QUFDSCxrQkFBVSxrQkFBQyxHQUFELEVBQVM7QUFDZixnQkFBTSxXQUFXLElBQUksT0FBSixHQUFjLGFBQS9CO0FBQ0EsZ0JBQU0sZUFBZSxhQUFhLE9BQWIsQ0FBcUIsT0FBckIsQ0FBckI7O0FBRUEsZ0JBQUksWUFBWSxhQUFhLFlBQTdCLEVBQTJDO0FBQ3ZDLDZCQUFhLE9BQWIsQ0FBcUIsT0FBckIsRUFBOEIsUUFBOUI7QUFDSDtBQUNELG1CQUFPLEdBQVA7QUFDSDtBQVRFLEtBQVA7QUFXSCxDQWJMOztBQWVBOzs7OztBQUtBLFFBQVEsTUFBUixDQUFlLGFBQWYsRUFDSyxPQURMLENBQ2Esb0JBRGIsRUFDbUMsQ0FBQyxJQUFELEVBQU8sT0FBUCxFQUFnQixRQUFoQixFQUEwQixXQUExQixFQUMzQixVQUFTLEVBQVQsRUFBYSxLQUFiLEVBQW9CLE1BQXBCLEVBQTRCLFNBQTVCLEVBQXVDO0FBQ25DLFFBQU0sU0FBUyxPQUFPLE1BQXRCO0FBQ0EsUUFBTSxZQUFZLFVBQVUsR0FBVixDQUFjLFdBQWQsQ0FBbEIsQ0FGbUMsQ0FFVzs7QUFFOUMsYUFBUyxVQUFULENBQW9CLEVBQXBCLEVBQXdDO0FBQUE7O0FBQUEsWUFBaEIsVUFBZ0IsdUVBQUgsQ0FBRzs7QUFDcEMsWUFBTSxvQkFBa0IsVUFBeEI7QUFDQSxlQUFPLE1BQ0YsR0FERSxDQUNLLE1BREwsbUJBQ3lCLEVBRHpCLGdCQUNzQyxNQUR0QyxFQUVGLElBRkUsQ0FFRyxVQUFDLEdBQUQsRUFBUztBQUNYLG1CQUFLLE9BQUwsR0FBZSxJQUFJLElBQW5CO0FBQ0EsbUJBQUssT0FBTCxDQUFhLE9BQWIsR0FBdUIsT0FBSyxPQUFMLENBQWEsT0FBYixDQUFxQixHQUFyQixDQUF5QixVQUFDLEdBQUQsRUFBUztBQUNyRCxvQkFBSSxZQUFKLEdBQW1CLE9BQU8sR0FBUCxDQUFXLElBQUksWUFBZixFQUE2QixRQUE3QixFQUFuQjtBQUNBLG9CQUFJLElBQUksWUFBSixLQUFxQixjQUF6QixFQUF5QztBQUNyQyx3QkFBSSxZQUFKLEdBQW1CLElBQW5CO0FBQ0g7QUFDRCx1QkFBTyxHQUFQO0FBQ0gsYUFOc0IsQ0FBdkI7QUFPQSxtQkFBTyxJQUFJLElBQVg7QUFDSCxTQVpFLENBQVA7QUFhSDs7QUFFRCxhQUFTLFlBQVQsQ0FBc0IsVUFBdEIsUUFBb0Y7QUFBQSxZQUFoRCxNQUFnRCxRQUFoRCxNQUFnRDtBQUFBLFlBQXhDLElBQXdDLFFBQXhDLElBQXdDO0FBQUEsWUFBbEMsa0JBQWtDLFFBQWxDLGtCQUFrQztBQUFBLFlBQWQsVUFBYyxRQUFkLFVBQWM7O0FBQ2hGLGVBQU8sTUFDRixJQURFLENBQ00sTUFETixtQkFDMEIsVUFEMUIsZUFDZ0QsRUFBRSxjQUFGLEVBQVUsVUFBVixFQUFnQixzQ0FBaEIsRUFBb0Msc0JBQXBDLEVBRGhELEVBRUYsSUFGRSxDQUVHLFVBQUMsR0FBRCxFQUFTO0FBQ1gsbUJBQU8sSUFBSSxJQUFYO0FBQ0gsU0FKRSxFQUtGLEtBTEUsQ0FLSSxVQUFDLEdBQUQsRUFBUztBQUNaLGdCQUFJLElBQUksTUFBSixLQUFlLEdBQW5CLEVBQXdCO0FBQ3BCLDBCQUFVLElBQVYsQ0FBZTtBQUNYLGtDQUFjLGdDQURIO0FBRVgseUNBQXFCLElBRlY7QUFHWCwwQkFBTSxPQUhLO0FBSVgsZ0NBQVksc0JBQU0sQ0FBRTtBQUpULGlCQUFmO0FBTUg7QUFDSixTQWRFLENBQVA7QUFlSDs7QUFFRCxhQUFTLFlBQVQsQ0FBc0IsVUFBdEIsU0FBa0Q7QUFBQSxZQUFkLEVBQWMsU0FBZCxFQUFjO0FBQUEsWUFBVixNQUFVLFNBQVYsTUFBVTs7QUFDOUMsZUFBTyxNQUNGLEtBREUsQ0FDTyxNQURQLG1CQUMyQixVQUQzQixpQkFDaUQsRUFEakQsY0FDOEQsRUFBRSxjQUFGLEVBRDlELEVBRUYsSUFGRSxDQUVHLFVBQUMsR0FBRCxFQUFTO0FBQ1gsbUJBQU8sSUFBSSxJQUFYO0FBQ0gsU0FKRSxDQUFQO0FBS0g7O0FBRUQsV0FBTztBQUNILDhCQURHO0FBRUgsa0NBRkc7QUFHSDtBQUhHLEtBQVA7QUFLSCxDQXJEMEIsQ0FEbkM7O0FBeURBOzs7OztBQUtBLFFBQVEsTUFBUixDQUFlLGFBQWYsRUFDSyxPQURMLENBQ2Esc0JBRGIsRUFDcUMsQ0FBQyxPQUFELEVBQVUsUUFBVixFQUFvQixXQUFwQixFQUM3QixVQUFTLEtBQVQsRUFBZ0IsTUFBaEIsRUFBd0IsU0FBeEIsRUFBbUM7O0FBRS9CLFFBQU0sU0FBUyxPQUFPLE1BQXRCOztBQUVBLGFBQVMsWUFBVCxDQUFzQixJQUF0QixFQUE0QjtBQUN4QixlQUFPLEtBQUssR0FBTCxDQUFTLFVBQUMsSUFBRCxFQUFVO0FBQ3RCLGlCQUFLLE1BQUwsR0FBYyxLQUFLLE1BQUwsR0FBYyxzQkFBNUIsR0FBcUQsS0FBSyxNQUFMLEdBQWMsMEJBQW5FO0FBQ0EsbUJBQU8sSUFBUDtBQUNILFNBSE0sQ0FBUDtBQUlIOztBQUVELGFBQVMsWUFBVCxHQUF3QjtBQUFBOztBQUNwQixlQUFPLE1BQ0YsR0FERSxDQUNFLFNBQVMsWUFEWCxFQUVGLElBRkUsQ0FFRyxVQUFDLE1BQUQsRUFBWTtBQUNkLG1CQUFLLFNBQUwsR0FBaUIsYUFBYSxPQUFPLElBQXBCLENBQWpCO0FBQ0EsbUJBQU8sT0FBTyxJQUFkO0FBQ0gsU0FMRSxDQUFQO0FBTUg7O0FBRUQsYUFBUyxjQUFULENBQXdCLFdBQXhCLEVBQXFDO0FBQ2pDLFlBQUksWUFBWSxXQUFoQixFQUE2QjtBQUN6Qix3QkFBWSxXQUFaLEdBQTBCLFlBQVksV0FBWixDQUF3QixNQUFsRDtBQUNIO0FBQ0QsZUFBTyxNQUNGLElBREUsQ0FDRyxTQUFTLFlBRFosRUFDMEIsV0FEMUIsRUFFRixJQUZFLENBRUc7QUFBQSxtQkFBVSxNQUFWO0FBQUEsU0FGSCxFQUdGLEtBSEUsQ0FHSSxVQUFDLEdBQUQsRUFBUztBQUNaLGdCQUFJLElBQUksTUFBSixLQUFlLEdBQW5CLEVBQXdCO0FBQ3BCLDBCQUFVLElBQVYsQ0FBZTtBQUNYLGtDQUFjLGtDQURIO0FBRVgseUNBQXFCLElBRlY7QUFHWCwwQkFBTSxTQUhLO0FBSVgsZ0NBQVksc0JBQU0sQ0FBRTtBQUpULGlCQUFmO0FBTUEsdUJBQU8sUUFBUSxNQUFSLENBQWUsR0FBZixDQUFQO0FBQ0g7QUFDSixTQWJFLENBQVA7QUFjSDs7QUFFRCxhQUFTLFlBQVQsUUFBd0g7QUFBQSxZQUFoRyxXQUFnRyxTQUFoRyxXQUFnRztBQUFBLFlBQW5GLFdBQW1GLFNBQW5GLFdBQW1GO0FBQUEsWUFBdEUsUUFBc0UsU0FBdEUsUUFBc0U7QUFBQSxZQUE1RCxLQUE0RCxTQUE1RCxLQUE0RDtBQUFBLFlBQXJELEVBQXFELFNBQXJELEVBQXFEO0FBQUEsWUFBakQsTUFBaUQsU0FBakQsTUFBaUQ7QUFBQSxZQUF6QyxXQUF5QyxTQUF6QyxXQUF5QztBQUFBLFlBQTVCLFdBQTRCLFNBQTVCLFdBQTRCO0FBQUEsWUFBZixXQUFlLFNBQWYsV0FBZTs7QUFDcEgsWUFBSSxXQUFKLEVBQWlCO0FBQ2IsMEJBQWMsWUFBWSxNQUExQjtBQUNIO0FBQ0QsZUFBTyxNQUNGLEtBREUsQ0FDSSxTQUFTLGFBQVQsR0FBeUIsRUFEN0IsRUFDaUMsRUFBRSx3QkFBRixFQUFlLHdCQUFmLEVBQTRCLGtCQUE1QixFQUFzQyxZQUF0QyxFQUE2QyxjQUE3QyxFQUFxRCx3QkFBckQsRUFBa0Usd0JBQWxFLEVBQStFLHdCQUEvRSxFQURqQyxFQUVGLElBRkUsQ0FFRztBQUFBLG1CQUFVLE1BQVY7QUFBQSxTQUZILENBQVA7QUFHSDs7QUFFRCxhQUFTLGVBQVQsQ0FBeUIsRUFBekIsRUFBNkI7QUFBQTs7QUFDekIsZUFBTyxNQUNGLEdBREUsQ0FDRSxTQUFTLGFBQVQsR0FBeUIsRUFEM0IsRUFFRixJQUZFLENBRUcsVUFBQyxNQUFELEVBQVk7QUFDZCxtQkFBSyxlQUFMLEdBQXVCLE9BQU8sSUFBOUI7QUFDQSxtQkFBTyxPQUFPLElBQWQ7QUFDSCxTQUxFLENBQVA7QUFNSDs7QUFFRCxhQUFTLG9CQUFULENBQThCLEVBQTlCLEVBQWtDLElBQWxDLEVBQXdDO0FBQ3BDLGVBQU8sTUFDRixLQURFLENBQ0ksU0FBUyxhQUFULEdBQXlCLEVBQXpCLEdBQThCLFVBRGxDLEVBQzhDLElBRDlDLEVBRUYsSUFGRSxDQUVHO0FBQUEsbUJBQU8sSUFBSSxJQUFYO0FBQUEsU0FGSCxDQUFQO0FBR0g7O0FBRUQsYUFBUyxlQUFULFFBQXlDO0FBQUEsWUFBZCxFQUFjLFNBQWQsRUFBYztBQUFBLFlBQVYsTUFBVSxTQUFWLE1BQVU7O0FBQ3JDLGVBQU8sTUFDRixLQURFLENBQ0ksU0FBUyxhQUFULEdBQXlCLEVBQXpCLEdBQThCLFNBRGxDLEVBQzZDLEVBQUUsY0FBRixFQUQ3QyxFQUVGLElBRkUsQ0FFRztBQUFBLG1CQUFPLElBQUksSUFBWDtBQUFBLFNBRkgsQ0FBUDtBQUdIOztBQUVELGFBQVMsY0FBVCxDQUF3QixFQUF4QixFQUE0QixXQUE1QixFQUF5QztBQUNyQyxlQUFPLE1BQ0YsS0FERSxDQUNJLFNBQVMsYUFBVCxHQUF5QixFQUF6QixHQUE4QixjQURsQyxFQUNrRCxFQUFFLHdCQUFGLEVBRGxELEVBRUYsSUFGRSxDQUVHO0FBQUEsbUJBQU8sSUFBSSxJQUFYO0FBQUEsU0FGSCxDQUFQO0FBR0g7O0FBRUQsV0FBTztBQUNILGtDQURHO0FBRUgsc0NBRkc7QUFHSCxrQ0FIRztBQUlILHdDQUpHO0FBS0gsa0RBTEc7QUFNSCx3Q0FORztBQU9IO0FBUEcsS0FBUDtBQVNILENBdEY0QixDQURyQztBQXlGQTs7Ozs7QUFLQSxRQUFRLE1BQVIsQ0FBZSxhQUFmLEVBQ0ssT0FETCxDQUNhLGtCQURiLEVBQ2lDLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFDekIsVUFBUyxLQUFULEVBQWdCLE1BQWhCLEVBQXdCO0FBQ3BCLFFBQU0sU0FBUyxPQUFPLE1BQXRCOztBQUVBLGFBQVMsUUFBVCxHQUFvQjtBQUFBOztBQUNoQixlQUFPLE1BQ0YsR0FERSxDQUNLLE1BREwsd0JBRUYsSUFGRSxDQUVHLFVBQUMsTUFBRCxFQUFZO0FBQ2QsbUJBQUssS0FBTCxHQUFhLE9BQU8sSUFBcEI7QUFDQSxtQkFBSyxLQUFMLENBQVcsd0JBQVgsR0FBc0MsU0FBUyxLQUFULENBQWUsQ0FBZixFQUFrQixPQUFsQixDQUEwQixDQUExQixFQUE2QixPQUE3QixDQUFxQyxPQUFLLEtBQUwsQ0FBVyx3QkFBaEQsRUFBMEUsTUFBMUUsQ0FBaUYsVUFBakYsQ0FBdEM7QUFDQSxtQkFBTyxPQUFLLEtBQVo7QUFDSCxTQU5FLENBQVA7QUFPSDs7QUFFRCxXQUFPO0FBQ0g7QUFERyxLQUFQO0FBR0gsQ0FqQndCLENBRGpDOztBQXFCQTs7Ozs7QUFLQTs7QUFFQSxRQUFRLE1BQVIsQ0FBZSxhQUFmLEVBQ0ssT0FETCxDQUNhLG9CQURiLEVBQ21DLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFDM0IsVUFBUyxLQUFULEVBQWdCLE1BQWhCLEVBQXdCOztBQUVwQixRQUFNLFNBQVMsT0FBTyxNQUF0Qjs7QUFFQSxhQUFTLFVBQVQsQ0FBb0IsSUFBcEIsRUFBMEI7QUFDdEIsYUFBSyxPQUFMLENBQWEsR0FBYixDQUFpQixVQUFDLElBQUQsRUFBVTtBQUN2QixpQkFBSyxXQUFMLEdBQW1CLFNBQVMsS0FBVCxDQUFlLENBQWYsRUFBa0IsT0FBbEIsQ0FBMEIsQ0FBMUIsRUFBNkIsT0FBN0IsQ0FBcUMsS0FBSyx3QkFBMUMsRUFBb0UsTUFBcEUsQ0FBMkUsVUFBM0UsQ0FBbkI7QUFDQSxtQkFBTyxJQUFQO0FBQ0gsU0FIRDs7QUFLQSxlQUFPLElBQVA7QUFDSDs7QUFFRCxhQUFTLFVBQVQsQ0FBb0IsRUFBcEIsRUFBd0M7QUFBQTs7QUFBQSxZQUFoQixVQUFnQix1RUFBSCxDQUFHOztBQUNwQyxZQUFNLG9CQUFrQixVQUF4QjtBQUNBLGVBQU8sTUFDRixHQURFLENBQ0UsU0FBUyxhQUFULEdBQXlCLEVBQXpCLEdBQThCLFVBQTlCLEdBQTJDLE1BRDdDLEVBRUYsSUFGRSxDQUVHLFVBQUMsTUFBRCxFQUFZO0FBQ2QsbUJBQUssT0FBTCxHQUFlLFdBQVcsT0FBTyxJQUFsQixDQUFmO0FBQ0EsbUJBQU8sT0FBSyxPQUFaO0FBQ0gsU0FMRSxDQUFQO0FBTUg7O0FBRUQsYUFBUyxhQUFULENBQXVCLFVBQXZCLEVBQW1DLEVBQW5DLEVBQXVDO0FBQUE7O0FBQ25DLGVBQU8sTUFDRixHQURFLENBQ0UsU0FBUyxhQUFULEdBQXlCLFVBQXpCLEdBQXNDLFdBQXRDLEdBQW9ELEVBRHRELEVBRUYsSUFGRSxDQUVHLFVBQUMsTUFBRCxFQUFZO0FBQ2Qsb0JBQUssYUFBTCxHQUFxQixPQUFPLElBQTVCO0FBQ0Esb0JBQUssYUFBTCxDQUFtQixlQUFuQixHQUFxQyxPQUFPLGtCQUFQLENBQ2hDLEdBRGdDLENBQzVCLFVBQUMsR0FBRDtBQUFBLHVCQUFTLElBQUksSUFBYjtBQUFBLGFBRDRCLEVBRWhDLE9BRmdDLENBRXhCLFFBQUssYUFBTCxDQUFtQixlQUZLLENBQXJDO0FBR0EsbUJBQU8sT0FBTyxJQUFkO0FBQ0gsU0FSRSxDQUFQO0FBU0g7O0FBRUQsYUFBUyxZQUFULENBQXNCLFVBQXRCLFNBQTBHO0FBQUEsWUFBdEUsV0FBc0UsU0FBdEUsV0FBc0U7QUFBQSxZQUF6RCxRQUF5RCxTQUF6RCxRQUF5RDtBQUFBLFlBQS9DLFdBQStDLFNBQS9DLFdBQStDO0FBQUEsWUFBbEMsZUFBa0MsU0FBbEMsZUFBa0M7QUFBQSxZQUFqQixhQUFpQixTQUFqQixhQUFpQjs7QUFDdEcsZUFBTyxNQUNGLElBREUsQ0FDRyxTQUFTLGFBQVQsR0FBeUIsVUFBekIsR0FBc0MsVUFEekMsRUFDcUQ7QUFDcEQsb0NBRG9EO0FBRXBELDhCQUZvRDtBQUdwRCxvQ0FIb0Q7QUFJcEQsNENBSm9EO0FBS3BEO0FBTG9ELFNBRHJELENBQVA7QUFRSDs7QUFFRCxhQUFTLFVBQVQsQ0FBb0IsVUFBcEIsU0FBb0g7QUFBQSxZQUFsRixXQUFrRixTQUFsRixXQUFrRjtBQUFBLFlBQXJFLFFBQXFFLFNBQXJFLFFBQXFFO0FBQUEsWUFBM0QsV0FBMkQsU0FBM0QsV0FBMkQ7QUFBQSxZQUE5QyxFQUE4QyxTQUE5QyxFQUE4QztBQUFBLFlBQTFDLGVBQTBDLFNBQTFDLGVBQTBDO0FBQUEsWUFBekIsTUFBeUIsU0FBekIsTUFBeUI7QUFBQSxZQUFqQixhQUFpQixTQUFqQixhQUFpQjs7QUFDaEgsZUFBTyxNQUNGLEtBREUsQ0FDSSxTQUFTLGFBQVQsR0FBeUIsVUFBekIsR0FBc0MsV0FBdEMsR0FBb0QsRUFEeEQsRUFDNEQ7QUFDM0Qsb0NBRDJEO0FBRTNELDhCQUYyRDtBQUczRCxvQ0FIMkQ7QUFJM0QsNENBSjJEO0FBSzNELDBCQUwyRDtBQU0zRDtBQU4yRCxTQUQ1RCxDQUFQO0FBU0g7O0FBRUQsYUFBUyxhQUFULENBQXVCLFVBQXZCLFNBQW1EO0FBQUEsWUFBZCxFQUFjLFNBQWQsRUFBYztBQUFBLFlBQVYsTUFBVSxTQUFWLE1BQVU7O0FBQy9DLGVBQU8sTUFDRixLQURFLENBQ0ksU0FBUyxhQUFULEdBQXlCLFVBQXpCLEdBQXNDLFdBQXRDLEdBQW9ELEVBQXBELEdBQXlELFNBRDdELEVBQ3dFLEVBQUUsY0FBRixFQUR4RSxFQUVGLElBRkUsQ0FFRyxVQUFDLE1BQUQsRUFBWTtBQUNkLG1CQUFPLE1BQVA7QUFDSCxTQUpFLENBQVA7QUFLSDs7QUFFRCxhQUFTLE1BQVQsQ0FBZ0IsVUFBaEIsRUFBNEIsRUFBNUIsRUFBZ0MsS0FBaEMsRUFBdUMsSUFBdkMsRUFBNkM7QUFBQTs7QUFDekMsaUJBQVMsU0FBVCxDQUFtQixJQUFuQixFQUF5QjtBQUNyQixnQkFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBWjtBQUNBLG1CQUFRLENBQUMsTUFBTSxDQUFOLENBQUYsR0FBYyxFQUFkLEdBQW1CLEVBQW5CLEdBQXlCLENBQUMsTUFBTSxDQUFOLENBQUYsR0FBYyxFQUF0QyxHQUE0QyxDQUFDLE1BQU0sQ0FBTixDQUFwRDtBQUNIOztBQUVELFlBQU0sT0FBTyxTQUFTLEdBQVQsQ0FBYSxDQUFiLEVBQWdCLEtBQWhCLENBQXNCLEtBQXRCLEVBQTZCLElBQTdCLENBQWtDLElBQWxDLEVBQXdDLE1BQXhDLENBQStDLFlBQS9DLENBQWI7O0FBRUEsZUFBTyxNQUNGLEdBREUsQ0FDSyxNQURMLG1CQUN5QixVQUR6QixpQkFDK0MsRUFEL0Msd0JBQ29FLElBRHBFLEVBRUYsSUFGRSxDQUVHLFVBQUMsR0FBRCxFQUFTO0FBQ1gsb0JBQUssR0FBTCxHQUFXLElBQUksSUFBSixDQUNOLE1BRE0sQ0FDQyxVQUFDLEdBQUQ7QUFBQSx1QkFBUyxJQUFJLE9BQWI7QUFBQSxhQURELEVBRU4sR0FGTSxDQUVGLFVBQUMsR0FBRCxFQUFTO0FBQ1Ysb0JBQUksSUFBSixRQUFjLE9BQU8sSUFBSSxTQUFYLEVBQXNCLE1BQXRCLENBQTZCLFlBQTdCLENBQWQ7QUFDQSxvQkFBSSxTQUFKLFFBQW1CLE9BQU8sR0FBUCxDQUFXLElBQUksU0FBZixFQUEwQixNQUExQixDQUFpQyxxQkFBakMsQ0FBbkI7QUFDQSxvQkFBSSxPQUFKLFFBQWlCLE9BQU8sR0FBUCxDQUFXLElBQUksT0FBZixFQUF3QixNQUF4QixDQUErQixxQkFBL0IsQ0FBakI7O0FBRUEsb0JBQUksSUFBSSxnQkFBSixJQUF3QixJQUFJLGdCQUFKLENBQXFCLE1BQWpELEVBQXlEO0FBQ3JELHdCQUFJLGdCQUFKLEdBQXVCLElBQUksZ0JBQUosQ0FBcUIsR0FBckIsQ0FBeUIsVUFBQyxNQUFELEVBQVk7QUFDeEQsK0JBQU8sSUFBUCxRQUFpQixPQUFPLEdBQVAsQ0FBVyxPQUFPLFNBQWxCLEVBQTZCLE1BQTdCLENBQW9DLFlBQXBDLENBQWpCO0FBQ0EsK0JBQU8sU0FBUCxRQUFzQixPQUFPLEdBQVAsQ0FBVyxPQUFPLFNBQWxCLEVBQTZCLFFBQTdCLEVBQXRCO0FBQ0EsK0JBQU8sT0FBUCxRQUFvQixPQUFPLEdBQVAsQ0FBVyxPQUFPLE9BQWxCLEVBQTJCLFFBQTNCLEVBQXBCO0FBQ0EsK0JBQU8sTUFBUDtBQUNILHFCQUxzQixDQUF2QjtBQU1IO0FBQ0QsdUJBQU8sR0FBUDtBQUNILGFBaEJNLENBQVg7O0FBa0JBLG9CQUFLLGFBQUwsR0FBcUIsUUFBSyxHQUFMLENBQ2hCLEdBRGdCLENBQ1osVUFBQyxHQUFELEVBQVM7QUFDVixvQkFBSSxJQUFJLFNBQVIsRUFBbUI7QUFDZiwyQkFBTyxVQUFVLElBQUksU0FBZCxDQUFQO0FBQ0g7O0FBRUQsdUJBQU8sR0FBUDtBQUNILGFBUGdCLEVBUWhCLE1BUmdCLENBUVQsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFVO0FBQ2QsdUJBQU8sSUFBSSxDQUFYO0FBQ0gsYUFWZ0IsRUFVZCxDQVZjLENBQXJCOztBQVlBLG9CQUFLLGFBQUwsR0FBcUIsU0FBUyxLQUFULENBQWUsQ0FBZixFQUFrQixPQUFsQixDQUEwQixDQUExQixFQUE2QixPQUE3QixDQUFxQyxRQUFLLGFBQTFDLEVBQXlELE1BQXpELENBQWdFLFVBQWhFLENBQXJCO0FBQ0EsbUJBQU8sSUFBSSxJQUFYO0FBQ0gsU0FuQ0UsQ0FBUDtBQXFDSDs7QUFFRCxhQUFTLE1BQVQsQ0FBZ0IsRUFBaEIsRUFBb0IsS0FBcEIsRUFBMkI7QUFDdkIsZUFBTyxNQUNGLEdBREUsQ0FDRSxTQUFTLGFBQVQsR0FBeUIsRUFBekIsR0FBOEIsVUFBOUIsR0FBMkMsTUFBM0MsR0FBb0QsS0FEdEQsRUFFRixJQUZFLENBRUcsVUFBQyxHQUFELEVBQVM7QUFDWCxtQkFBTyxXQUFXLElBQUksSUFBZixDQUFQO0FBQ0gsU0FKRSxDQUFQO0FBS0g7O0FBRUQsV0FBTztBQUNILDhCQURHO0FBRUgsa0NBRkc7QUFHSCw4QkFIRztBQUlILG9DQUpHO0FBS0gsc0JBTEc7QUFNSCxvQ0FORztBQU9IO0FBUEcsS0FBUDtBQVNILENBbkkwQixDQURuQzs7QUF1SUE7Ozs7O0FBS0EsUUFBUSxNQUFSLENBQWUsYUFBZixFQUNLLE9BREwsQ0FDYSx5QkFEYixFQUN3QyxDQUFDLHFCQUFELEVBQ2hDLFVBQVMsbUJBQVQsRUFBOEI7QUFDMUIsV0FBTztBQUNILHVCQUFlLHVCQUFDLEdBQUQsRUFBUztBQUNwQixtQkFBTyxvQkFBb0IsTUFBcEIsQ0FBMkIsR0FBM0IsRUFDRixJQURFLENBQ0c7QUFBQSx1QkFBTSxRQUFRLE9BQVIsQ0FBZ0IsR0FBaEIsQ0FBTjtBQUFBLGFBREgsRUFFRixLQUZFLENBRUk7QUFBQSx1QkFBTSxRQUFRLE1BQVIsQ0FBZSxHQUFmLENBQU47QUFBQSxhQUZKLENBQVA7QUFHSDtBQUxFLEtBQVA7QUFPSCxDQVQrQixDQUR4Qzs7QUFhQSxRQUFRLE1BQVIsQ0FBZSxhQUFmLEVBQ0ssT0FETCxDQUNhLHFCQURiLEVBQ29DLENBQUMsV0FBRCxFQUM1QixVQUFTLFNBQVQsRUFBb0I7O0FBRWhCLGFBQVMsTUFBVCxDQUFnQixHQUFoQixFQUFxQjtBQUNqQixZQUFNLFlBQVksVUFBVSxHQUFWLENBQWMsV0FBZCxDQUFsQixDQURpQixDQUM2QjtBQUM5QyxZQUFNLFNBQVMsVUFBVSxHQUFWLENBQWMsUUFBZCxDQUFmOztBQUVBLGVBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUNwQyxvQkFBUSxJQUFJLE1BQVo7O0FBRUkscUJBQUssR0FBTDtBQUNJLDJCQUFPLGNBQVA7QUFDQTs7QUFFSixxQkFBSyxHQUFMO0FBQ0ksOEJBQVUsSUFBVixDQUFlO0FBQ1gsc0NBQWMseUJBREg7QUFFWCw2Q0FBcUIsSUFGVjtBQUdYLDhCQUFNLE9BSEs7QUFJWCxvQ0FBWSxzQkFBTSxDQUFFO0FBSlQscUJBQWY7QUFNQSwyQkFBTyxFQUFQLENBQVUsT0FBVjtBQUNBOztBQUVKLHFCQUFLLEdBQUw7QUFDSSw4QkFBVSxJQUFWLENBQWU7QUFDWCxzQ0FBYywwQkFESDtBQUVYLDZDQUFxQixJQUZWO0FBR1gsOEJBQU0sT0FISztBQUlYLG9DQUFZLHNCQUFNLENBQUU7QUFKVCxxQkFBZjtBQU1BLDJCQUFPLFdBQVA7QUFDQTs7QUFFSixxQkFBSyxHQUFMO0FBQ0ksMkJBQU8sV0FBUDtBQUNBOztBQUVKLHFCQUFLLEdBQUw7QUFDQSxxQkFBSyxHQUFMO0FBQ0EscUJBQUssR0FBTDtBQUNJLDhCQUFVLElBQVYsQ0FBZTtBQUNYLHNDQUFjLHlCQURIO0FBRVgsNkNBQXFCLElBRlY7QUFHWCw4QkFBTSxPQUhLO0FBSVgsb0NBQVksc0JBQU0sQ0FBRTtBQUpULHFCQUFmO0FBTUE7O0FBRUo7QUFDSSw0QkFBUSxHQUFSO0FBQ0E7QUEzQ1I7QUE2Q0gsU0E5Q00sQ0FBUDtBQStDSDs7QUFFRCxXQUFPO0FBQ0g7QUFERyxLQUFQO0FBR0gsQ0EzRDJCLENBRHBDO0FBOERBOzs7OztBQUtBLFFBQVEsTUFBUixDQUFlLGFBQWYsRUFDSyxPQURMLENBQ2EsaUJBRGIsRUFDZ0MsQ0FBQyxhQUFELEVBQWdCLFFBQWhCLEVBQTBCLE9BQTFCLEVBQW1DLFFBQW5DLEVBQ3hCLFVBQVMsV0FBVCxFQUFzQixNQUF0QixFQUE4QixLQUE5QixFQUFxQyxNQUFyQyxFQUE2QztBQUN6QyxRQUFNLFNBQVMsT0FBTyxNQUF0Qjs7QUFFQSxhQUFTLFdBQVQsR0FBdUI7QUFBQTs7QUFDbkIsZUFBTyxZQUFZLGdCQUFaLEdBQ0YsSUFERSxDQUNHLFVBQUMsR0FBRCxFQUFTO0FBQ1gsb0JBQUssV0FBTCxHQUFtQjtBQUNqQixtQ0FBa0I7QUFERCxhQUFuQjtBQUdBLG1CQUFPLE1BQVAsQ0FBYyxRQUFLLFdBQW5CLEVBQStCLElBQUksSUFBbkM7O0FBRUEsZ0JBQU0sV0FBVyxRQUFRLElBQVIsU0FBakI7QUFDQSxnQkFBSSxVQUFKLEVBQWdCO0FBQ1osd0JBQUssV0FBTCxDQUFpQixlQUFqQixHQUFtQyxjQUFuQztBQUNILGFBRkQsTUFFTztBQUNILHdCQUFLLFdBQUwsQ0FBaUIsZUFBakIsR0FBbUMsYUFBbkM7QUFDSDtBQUNKLFNBYkUsRUFjRixLQWRFLENBY0k7QUFBQSxtQkFBTSxPQUFPLEVBQVAsQ0FBVSxPQUFWLENBQU47QUFBQSxTQWRKLENBQVA7QUFlSDs7QUFFRCxhQUFTLFVBQVQsR0FBc0I7QUFDbEIsZUFBTyxLQUFLLFdBQUwsQ0FBaUIsS0FBakIsQ0FBdUIsUUFBdkIsQ0FBZ0MsVUFBaEMsQ0FBUDtBQUNIOztBQUVELGFBQVMsT0FBVCxHQUFtQjtBQUNmLGVBQU8sS0FBSyxXQUFMLENBQWlCLEtBQWpCLENBQXVCLFFBQXZCLENBQWdDLE9BQWhDLENBQVA7QUFDSDs7QUFFRCxhQUFTLGtCQUFULENBQTRCLElBQTVCLEVBQWtDO0FBQzlCLGVBQU8sTUFBTSxLQUFOLENBQVksU0FBUyxnQkFBckIsRUFBdUMsRUFBQyxVQUFVLElBQVgsRUFBdkMsQ0FBUDtBQUNIOztBQUVELFdBQU87QUFDSCxnQ0FERztBQUVILDhCQUZHO0FBR0gsd0JBSEc7QUFJSDtBQUpHLEtBQVA7QUFNSCxDQXhDdUIsQ0FEaEM7O0FBNENBLFFBQVEsTUFBUixDQUFlLGFBQWYsRUFDSyxTQURMLENBQ2UsYUFEZixFQUM4QixpQkFEOUI7O0FBR0EsU0FBUyxpQkFBVCxHQUE2QjtBQUN6QixXQUFPO0FBQ0gsa0JBQVUsR0FEUDtBQUVILGlCQUFTLElBRk47QUFHSCxlQUFPLEVBSEo7QUFJSCxxQkFBYSx1REFKVjtBQUtILG9CQUFZLENBQUMsUUFBRCxFQUFXLGNBQVgsRUFBMkIsb0JBQTNCLEVBQWlELHFCQUFqRCxDQUxUO0FBTUgsc0JBQWM7QUFOWCxLQUFQO0FBUUg7O0FBRUQsU0FBUyxxQkFBVCxDQUErQixNQUEvQixFQUF1QyxZQUF2QyxFQUFxRCxrQkFBckQsRUFBeUU7QUFDckUsUUFBTSxTQUFTLENBQ1gsT0FEVyxFQUVYLFFBRlcsRUFHWCxLQUhXLEVBSVgsT0FKVyxFQUtYLEtBTFcsRUFNWCxNQU5XLEVBT1gsTUFQVyxFQVFYLFFBUlcsRUFTWCxRQVRXLEVBVVgsU0FWVyxFQVdYLFFBWFcsRUFZWCxPQVpXLENBQWY7O0FBZUEsaUJBQWEsS0FBYixHQUFxQixPQUFPLGFBQWEsS0FBcEIsQ0FBckI7QUFDQSxpQkFBYSxJQUFiLEdBQW9CLE9BQU8sYUFBYSxJQUFwQixDQUFwQjs7QUFFQSxTQUFLLEdBQUwsR0FBVyxtQkFBbUIsR0FBOUI7QUFDQSxTQUFLLGFBQUwsR0FBcUIsbUJBQW1CLGFBQXhDOztBQUVBLFNBQUssV0FBTCxHQUFzQixPQUFPLGFBQWEsS0FBcEIsQ0FBdEIsU0FBb0QsYUFBYSxJQUFqRTtBQUNBLFNBQUssWUFBTCxHQUFvQixhQUFhLEtBQWIsSUFBc0IsSUFBSSxJQUFKLEdBQVcsUUFBWCxFQUF0QixJQUErQyxhQUFhLElBQWIsSUFBcUIsSUFBSSxJQUFKLEdBQVcsV0FBWCxFQUF4RjtBQUNBLFNBQUssVUFBTCxHQUFrQixhQUFhLElBQWIsSUFBcUIsSUFBdkM7QUFDQSxTQUFLLFlBQUwsR0FBb0IsRUFBcEI7O0FBRUEsU0FBSyxJQUFMLEdBQVksWUFBTTtBQUNkLFlBQU0sSUFBSSxJQUFJLElBQUosQ0FBUyxhQUFhLElBQXRCLEVBQTRCLGFBQWEsS0FBYixHQUFxQixDQUFqRCxFQUFvRCxDQUFwRCxDQUFWO0FBQ0EsZUFBTyxFQUFQLENBQVUsYUFBVixFQUF5QixFQUFFLE9BQU8sRUFBRSxRQUFGLEVBQVQsRUFBdUIsTUFBTSxFQUFFLFdBQUYsRUFBN0IsRUFBekI7QUFDSCxLQUhEOztBQUtBLFNBQUssSUFBTCxHQUFZLFlBQU07QUFDZCxZQUFNLElBQUksSUFBSSxJQUFKLENBQVMsYUFBYSxJQUF0QixFQUE0QixhQUFhLEtBQWIsR0FBcUIsQ0FBakQsRUFBb0QsQ0FBcEQsQ0FBVjtBQUNBLGVBQU8sRUFBUCxDQUFVLGFBQVYsRUFBeUIsRUFBRSxPQUFPLEVBQUUsUUFBRixFQUFULEVBQXVCLE1BQU0sRUFBRSxXQUFGLEVBQTdCLEVBQXpCO0FBQ0gsS0FIRDs7QUFLQSxTQUFLLE1BQUwsR0FBYyxVQUFDLEdBQUQsRUFBUztBQUNuQixZQUFJLFFBQUosR0FBZSxDQUFDLElBQUksUUFBcEI7QUFDSCxLQUZEO0FBR0g7O0FBRUQsUUFBUSxNQUFSLENBQWUsYUFBZixFQUNLLFNBREwsQ0FDZSxjQURmLEVBQytCLGtCQUQvQjs7QUFHQSxTQUFTLGtCQUFULEdBQThCO0FBQzFCLFdBQU87QUFDSCxrQkFBVSxHQURQO0FBRUgsaUJBQVMsSUFGTjtBQUdILGVBQU87QUFDSCxrQkFBTSxHQURIO0FBRUgsd0JBQVksR0FGVDtBQUdILHNCQUFVLEdBSFA7QUFJSCxvQkFBUSxHQUpMO0FBS0gsa0JBQU0sR0FMSDtBQU1ILGtCQUFNLEdBTkg7QUFPSCx3QkFBWSxHQVBUO0FBUUgsb0JBQVEsR0FSTDtBQVNILDJCQUFlO0FBVFosU0FISjtBQWNILHFCQUFhLHlEQWRWO0FBZUgsb0JBQVksQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixVQUFyQixFQUFpQyxvQkFBakMsRUFBdUQsb0JBQXZELEVBQTZFLHNCQUE3RSxDQWZUO0FBZ0JILHNCQUFjO0FBaEJYLEtBQVA7QUFrQkg7O0FBRUQsU0FBUyxzQkFBVCxDQUFnQyxNQUFoQyxFQUF3QyxNQUF4QyxFQUFnRCxRQUFoRCxFQUEwRCxrQkFBMUQsRUFBOEUsa0JBQTlFLEVBQWtHO0FBQUE7O0FBRTlGO0FBQ0EsU0FBSyxJQUFMLEdBQVksT0FBTyxJQUFuQjtBQUNBLFNBQUssT0FBTCxHQUFlLEtBQUssSUFBTCxDQUFVLE9BQVYsSUFBcUIsS0FBSyxJQUF6QztBQUNBLFNBQUssUUFBTCxHQUFnQixPQUFPLFFBQXZCO0FBQ0EsU0FBSyxNQUFMLEdBQWMsT0FBTyxNQUFyQjtBQUNBLFNBQUssVUFBTCxHQUFrQixPQUFPLFVBQXpCO0FBQ0EsU0FBSyxhQUFMLEdBQXFCLE9BQU8sYUFBNUI7QUFDQSxRQUFJLE9BQU8sSUFBWDs7QUFFQSxXQUFPLE1BQVAsQ0FBYyxZQUFkLEVBQTRCLFlBQVc7QUFDbkMsYUFBSyxVQUFMLEdBQWtCLE9BQU8sVUFBekI7QUFDSCxLQUZEOztBQUlBLFdBQU8sTUFBUCxDQUFjLFVBQWQsRUFBMEIsWUFBVztBQUNqQyxhQUFLLFFBQUwsR0FBZ0IsT0FBTyxRQUF2QjtBQUNILEtBRkQ7O0FBSUE7OztBQUdBLFNBQUssVUFBTCxHQUFrQixZQUFNO0FBQ3BCLGVBQU8sTUFDRixLQURFLENBQ0ksQ0FESixFQUNPLE1BQU0sUUFBSyxJQUFMLENBQVUsVUFBaEIsQ0FEUCxFQUVGLEdBRkUsQ0FFRTtBQUFBLG1CQUFTLEtBQVQ7QUFBQSxTQUZGLENBQVA7QUFHSCxLQUpEOztBQU1BLFNBQUssSUFBTCxHQUFZLFVBQVMsS0FBVCxFQUFnQjtBQUN4QixZQUFJLE9BQU8sSUFBWCxFQUFpQjtBQUNiLG1CQUFPLEVBQVAsQ0FBVSxPQUFPLElBQVAsQ0FBWSxLQUF0QixzQkFDSyxPQUFPLElBQVAsQ0FBWSxHQURqQixFQUN1QixLQUFLLE9BQUwsQ0FBYSxLQUFiLEVBQW9CLE9BQU8sSUFBUCxDQUFZLEdBQWhDLENBRHZCO0FBR0g7QUFDSixLQU5EOztBQVFBLFNBQUssUUFBTCxHQUFnQixVQUFDLFVBQUQsRUFBZ0I7QUFDNUIsZ0JBQVEsT0FBTyxJQUFmO0FBQ0ksaUJBQUssU0FBTDtBQUNRLG1DQUFtQixVQUFuQixDQUE4QixPQUFPLE1BQXJDLEVBQTZDLFVBQTdDLEVBQXlELElBQXpELENBQThELFVBQUMsTUFBRCxFQUFZO0FBQ3RFLDRCQUFLLElBQUwsR0FBWSxNQUFaO0FBQ0gsaUJBRkQ7QUFHSjs7QUFFSixpQkFBSyxTQUFMO0FBQ1EsbUNBQW1CLFVBQW5CLENBQThCLE9BQU8sTUFBckMsRUFBNkMsVUFBN0MsRUFBeUQsSUFBekQsQ0FBOEQsVUFBQyxNQUFELEVBQVk7QUFDdEUsNEJBQUssSUFBTCxHQUFZLE1BQVo7QUFDSCxpQkFGRDtBQUdKO0FBWFI7QUFhSCxLQWREO0FBZUgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqKlxyXG5NZXRyb25pYyBBbmd1bGFySlMgQXBwIE1haW4gU2NyaXB0XHJcbioqKi9cclxuXHJcblxyXG4vKiBNZXRyb25pYyBBcHAgKi9cclxuY29uc3QgTWV0cm9uaWNBcHAgPSBhbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnLCBbXHJcbiAgICAndWkucm91dGVyJyxcclxuICAgICd1aS5ib290c3RyYXAnLFxyXG4gICAgJ25nU2FuaXRpemUnLFxyXG4gICAgJ2FuZ3VsYXItand0JyxcclxuICAgICduYWlmLmJhc2U2NCcsXHJcbiAgICAnYW5ndWxhck1vZGFsU2VydmljZScsXHJcbiAgICAnYW5ndWxhci1sYWRkYScsXHJcbiAgICAnYW5ndWxhci1wcm9ncmVzcy1idXR0b24tc3R5bGVzJyxcclxuICAgICdzd2FuZ3VsYXInLFxyXG4gICAgJ3VpLmJvb3RzdHJhcC5kYXRldGltZXBpY2tlcicsXHJcbiAgICAnbmdBbmltYXRlJyxcclxuICAgICdwYXNjYWxwcmVjaHQudHJhbnNsYXRlJyxcclxuICAgICd2Y1JlY2FwdGNoYSdcclxuXSk7XHJcblxyXG5NZXRyb25pY0FwcC5jb25zdGFudCgnQ09ORklHJywge1xyXG4gICAgJ1NFUlZFUic6ICdodHRwOi8vbG9jYWxob3N0OjgwODAnLFxyXG4gICAgJ0RSSVZFUl9QRVJNSVNTSU9OUyc6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdMRVZFTF9BJyxcclxuICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgICAgIG5hbWU6ICdEUklWRVJfRk9STS5EUklWRVJfUEVSTUlTU0lPTlMuTEVWRUxfQSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ0xFVkVMX0InLFxyXG4gICAgICAgICAgICB2YWx1ZTogMSxcclxuICAgICAgICAgICAgbmFtZTogJ0RSSVZFUl9GT1JNLkRSSVZFUl9QRVJNSVNTSU9OUy5MRVZFTF9CJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAnTEVWRUxfQycsXHJcbiAgICAgICAgICAgIHZhbHVlOiAyLFxyXG4gICAgICAgICAgICBuYW1lOiAnRFJJVkVSX0ZPUk0uRFJJVkVSX1BFUk1JU1NJT05TLkxFVkVMX0MnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdMRVZFTF9EJyxcclxuICAgICAgICAgICAgdmFsdWU6IDMsXHJcbiAgICAgICAgICAgIG5hbWU6ICdEUklWRVJfRk9STS5EUklWRVJfUEVSTUlTU0lPTlMuTEVWRUxfRCdcclxuICAgICAgICB9XSxcclxuICAgICdMQU5HVUFHRVMnOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTogJ0VOX1VTJyxcclxuICAgICAgICAgICAgbmFtZTogJ0VuZ2xpc2ggKHVzKScsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2x0cidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWU6ICdFTl9VSycsXHJcbiAgICAgICAgICAgIG5hbWU6ICdFbmdsaXNoICh1ayknLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb246ICdsdHInXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlOiAnSEVfSUwnLFxyXG4gICAgICAgICAgICBuYW1lOiAnSGVicmV3JyxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiAncnRsJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTogJ0RFX0RFJyxcclxuICAgICAgICAgICAgbmFtZTogJ0dlcm1hbicsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2x0cidcclxuICAgICAgICB9XHJcbiAgICBdXHJcbn0pO1xyXG5cclxuTWV0cm9uaWNBcHAuY29uc3RhbnQoJ3VpRGF0ZXRpbWVQaWNrZXJDb25maWcnLCB7XHJcbiAgICBkYXRlRm9ybWF0OiAnZGQtTU0teXl5eScsXHJcbiAgICBkZWZhdWx0VGltZTogJzAwOjAwOjAwJyxcclxuICAgIGh0bWw1VHlwZXM6IHtcclxuICAgICAgICBkYXRlOiAnZGQtTU0teXl5eScsXHJcbiAgICAgICAgJ2RhdGV0aW1lLWxvY2FsJzogJ3l5eXktTU0tZGRUSEg6bW06c3Muc3NzJyxcclxuICAgICAgICAnbW9udGgnOiAnTU0teXl5eSdcclxuICAgIH0sXHJcbiAgICBpbml0aWFsUGlja2VyOiAnZGF0ZScsXHJcbiAgICByZU9wZW5EZWZhdWx0OiBmYWxzZSxcclxuICAgIGVuYWJsZURhdGU6IHRydWUsXHJcbiAgICBlbmFibGVUaW1lOiBmYWxzZSxcclxuICAgIGJ1dHRvbkJhcjoge1xyXG4gICAgICAgIHNob3c6IGZhbHNlLFxyXG4gICAgICAgIG5vdzoge1xyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICB0ZXh0OiAnTm93J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9kYXk6IHtcclxuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgdGV4dDogJ1RvZGF5J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xlYXI6IHtcclxuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgdGV4dDogJ0NsZWFyJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0ZToge1xyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICB0ZXh0OiAnRGF0ZSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRpbWU6IHtcclxuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgdGV4dDogJ1RpbWUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbG9zZToge1xyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICB0ZXh0OiAnQ2xvc2UnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNsb3NlT25EYXRlU2VsZWN0aW9uOiB0cnVlLFxyXG4gICAgY2xvc2VPblRpbWVOb3c6IHRydWUsXHJcbiAgICBhcHBlbmRUb0JvZHk6IGZhbHNlLFxyXG4gICAgYWx0SW5wdXRGb3JtYXRzOiBbXSxcclxuICAgIG5nTW9kZWxPcHRpb25zOiB7fSxcclxuICAgIHNhdmVBczogZmFsc2UsXHJcbiAgICByZWFkQXM6IGZhbHNlLFxyXG59KTtcclxuXHJcbk1ldHJvbmljQXBwLmNvbmZpZyhbJ2p3dE9wdGlvbnNQcm92aWRlcicsICckaHR0cFByb3ZpZGVyJywgKGp3dE9wdGlvbnNQcm92aWRlciwgJGh0dHBQcm92aWRlcikgPT4ge1xyXG4gICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xyXG5cclxuICAgIGp3dE9wdGlvbnNQcm92aWRlci5jb25maWcoe1xyXG4gICAgICAgIGF1dGhQcmVmaXg6ICcnLFxyXG4gICAgICAgIHdoaXRlTGlzdGVkRG9tYWluczonbG9jYWxob3N0JyxcclxuICAgICAgICB0b2tlbkdldHRlcjogKCkgPT4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyksXHJcbiAgICAgICAgdW5hdXRoZW50aWNhdGVkUmVkaXJlY3RvcjogWyckc3RhdGUnLCAoJHN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcclxuICAgICAgICB9XVxyXG4gICAgfSk7XHJcblxyXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnand0SW50ZXJjZXB0b3InKTtcclxuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2F1dGhJbnRlcmNlcHRvcicpO1xyXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnZXJyb3JIYW5kbGVySW50ZXJjZXB0b3InKTtcclxufV0pO1xyXG5cclxuTWV0cm9uaWNBcHAuY29uZmlnKFsnJHRyYW5zbGF0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHRyYW5zbGF0ZVByb3ZpZGVyKSB7XHJcbiAgICAkdHJhbnNsYXRlUHJvdmlkZXIudXNlU3RhdGljRmlsZXNMb2FkZXIoe1xyXG4gICAgICAgIHByZWZpeDogJ2Fzc2V0cy9sYW5ndWFnZXMvJyxcclxuICAgICAgICBzdWZmaXg6ICcuanNvbidcclxuICAgIH0pO1xyXG4gICAgLypcclxuICAgICBFTl9VUyhcImVuLVVTXCIpLFxyXG4gICAgIEVOX1VLKFwiZW4tR0JcIiksXHJcbiAgICAgSEVfSUwoXCJoZS1JTFwiKSxcclxuICAgICBERV9ERShcImRlLURFXCIpO1xyXG4gICAgICovXHJcbiAgICBjb25zdCBsYW5nTWFwID0ge1xyXG4gICAgICAgICdFTl9VUyc6ICdlbi1VUycsXHJcbiAgICAgICAgJ0VOX1VLJzogJ2VuLUdCJyxcclxuICAgICAgICAnSElfSUwnOiAnaGUtaWwnLFxyXG4gICAgICAgICdERV9ERSc6ICdkZS1kZSdcclxuICAgIH07XHJcbiAgICAkdHJhbnNsYXRlUHJvdmlkZXIudXNlU2FuaXRpemVWYWx1ZVN0cmF0ZWd5KG51bGwpO1xyXG4gICAgLy8kdHJhbnNsYXRlUHJvdmlkZXIucmVnaXN0ZXJBdmFpbGFibGVMYW5ndWFnZUtleXMoWydlbi1VUycsICdlbi1HQicsICdoZS1pbCcsICdkZS1kZSddLCBsYW5nTWFwKTtcclxuICAgICR0cmFuc2xhdGVQcm92aWRlci5wcmVmZXJyZWRMYW5ndWFnZSgnZW4tVVMnKTtcclxuICAgICR0cmFuc2xhdGVQcm92aWRlci5mYWxsYmFja0xhbmd1YWdlKCdlbi1VUycpO1xyXG59XSk7XHJcblxyXG5NZXRyb25pY0FwcC5mYWN0b3J5KCdzZXR0aW5ncycsIFsnJHJvb3RTY29wZScsICgkcm9vdFNjb3BlKSA9PiB7XHJcbiAgICAvLyBzdXBwb3J0ZWQgbGFuZ3VhZ2VzXHJcbiAgICBjb25zdCBzZXR0aW5ncyA9IHtcclxuICAgICAgICBsYXlvdXQ6IHtcclxuICAgICAgICAgICAgcGFnZVNpZGViYXJDbG9zZWQ6IGZhbHNlLCAvLyBzaWRlYmFyIG1lbnUgc3RhdGVcclxuICAgICAgICAgICAgcGFnZUNvbnRlbnRXaGl0ZTogdHJ1ZSwgLy8gc2V0IHBhZ2UgY29udGVudCBsYXlvdXRcclxuICAgICAgICAgICAgcGFnZUJvZHlTb2xpZDogZmFsc2UsIC8vIHNvbGlkIGJvZHkgY29sb3Igc3RhdGVcclxuICAgICAgICAgICAgcGFnZUF1dG9TY3JvbGxPbkxvYWQ6IDEwMDAgLy8gYXV0byBzY3JvbGwgdG8gdG9wIG9uIHBhZ2UgbG9hZFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXNzZXRzUGF0aDogJy4uL2Fzc2V0cycsXHJcbiAgICAgICAgZ2xvYmFsUGF0aDogJy4uL2Fzc2V0cy9nbG9iYWwnLFxyXG4gICAgICAgIGxheW91dFBhdGg6ICcuLi9hc3NldHMvbGF5b3V0cy9sYXlvdXQnLFxyXG4gICAgfTtcclxuXHJcbiAgICAkcm9vdFNjb3BlLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcbiAgICBcclxuICAgIHJldHVybiBzZXR0aW5ncztcclxufV0pO1xyXG5cclxuLyogU2V0dXAgQXBwIE1haW4gQ29udHJvbGxlciAqL1xyXG5NZXRyb25pY0FwcC5jb250cm9sbGVyKCdBcHBDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICgkc2NvcGUpID0+IHtcclxuICAgICRzY29wZS4kb24oJyR2aWV3Q29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgICAgICAvL0FwcC5pbml0Q29tcG9uZW50cygpOyAvLyBpbml0IGNvcmUgY29tcG9uZW50c1xyXG4gICAgICAgIC8vTGF5b3V0LmluaXQoKTsgLy8gIEluaXQgZW50aXJlIGxheW91dChoZWFkZXIsIGZvb3Rlciwgc2lkZWJhciwgZXRjKSBvbiBwYWdlIGxvYWQgaWYgdGhlIHBhcnRpYWxzIGluY2x1ZGVkIGluIHNlcnZlciBzaWRlIGluc3RlYWQgb2YgbG9hZGluZyB3aXRoIG5nLWluY2x1ZGUgZGlyZWN0aXZlIFxyXG4gICAgfSk7XHJcbn1dKTtcclxuXHJcbi8qIFNldHVwIExheW91dCBQYXJ0IC0gSGVhZGVyICovXHJcbk1ldHJvbmljQXBwLmNvbnRyb2xsZXIoJ0hlYWRlckNvbnRyb2xsZXInLCBbJyRzY29wZScsICgkc2NvcGUpID0+IHtcclxuICAgICRzY29wZS4kb24oJyRpbmNsdWRlQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgICAgICBMYXlvdXQuaW5pdEhlYWRlcigpOyAvLyBpbml0IGhlYWRlclxyXG4gICAgfSk7XHJcbn1dKTtcclxuXHJcblxyXG5NZXRyb25pY0FwcC5jb250cm9sbGVyKCdTaWRlYmFyQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ3VzZXJEYXRhU2VydmljZScsICgkc2NvcGUpID0+IHtcclxuICAgICRzY29wZS4kb24oJyRpbmNsdWRlQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgICAgICBMYXlvdXQuaW5pdFNpZGViYXIoKTsgLy8gaW5pdCBzaWRlYmFyXHJcbiAgICB9KTtcclxufV0pO1xyXG5cclxuTWV0cm9uaWNBcHAuY29udHJvbGxlcignQmFja29mZmljZUNvbnRyb2xsZXInLCBbJ3VzZXJEYXRhU2VydmljZScsICckc2NvcGUnLCAnJHN0YXRlJywgJ0NPTkZJRycsICckdHJhbnNsYXRlJywgKHVzZXJEYXRhU2VydmljZSwgJHNjb3BlLCAkc3RhdGUsIENPTkZJRywgJHRyYW5zbGF0ZSkgPT4ge1xyXG4gICAgJHN0YXRlLmdvKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5tYWluU3RhdGVTY3JlZW4pO1xyXG4gICAgJHNjb3BlLmlzQ3VzdG9tZXIgPSB1c2VyRGF0YVNlcnZpY2UuaXNDdXN0b21lcigpO1xyXG4gICAgJHNjb3BlLmlzQWRtaW4gPSB1c2VyRGF0YVNlcnZpY2UuaXNBZG1pbigpO1xyXG4gICAgJHNjb3BlLmN1cnJlbnRVc2VyID0gdXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyO1xyXG5cclxuICAgIF9zZXREaXJlY3Rpb24oKTtcclxuICAgIGNvbnN0IGxhbmdNYXAgPSB7XHJcbiAgICAgICAgJ0VOX1VTJzogJ2VuLVVTJyxcclxuICAgICAgICAnRU5fVUsnOiAnZW4tR0InLFxyXG4gICAgICAgICdIRV9JTCc6ICdoZS1JTCcsXHJcbiAgICAgICAgJ0RFX0RFJzogJ2RlLURFJ1xyXG4gICAgfTtcclxuICAgICR0cmFuc2xhdGUudXNlKGxhbmdNYXBbJHNjb3BlLmN1cnJlbnRVc2VyLmxhbmd1YWdlXSk7XHJcbiAgICAkc2NvcGUubGFuZ3VhZ2VzID0gQ09ORklHLkxBTkdVQUdFUztcclxuICAgICRzY29wZS5jaG9vc2VMYW5ndWFnZSA9ICgpID0+IHtcclxuICAgICAgICBpZiAoIWxhbmdNYXBbJHNjb3BlLmN1cnJlbnRVc2VyLmxhbmd1YWdlXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgICR0cmFuc2xhdGUudXNlKGxhbmdNYXBbJHNjb3BlLmN1cnJlbnRVc2VyLmxhbmd1YWdlXSkudGhlbigoKT0+IHtcclxuICAgICAgICAgICAgX3NldERpcmVjdGlvbigpO1xyXG4gICAgICAgICAgICB1c2VyRGF0YVNlcnZpY2UudXBkYXRlVXNlckxhbmd1YWdlKCRzY29wZS5jdXJyZW50VXNlci5sYW5ndWFnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIF9zZXREaXJlY3Rpb24oKSB7XHJcbiAgICAgICAgJHNjb3BlLnNldHRpbmdzLmRpcmVjdGlvbiA9IENPTkZJRy5MQU5HVUFHRVMuZmlsdGVyKChsYW5nKSA9PiBsYW5nLnZhbHVlID09IHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5sYW5ndWFnZSk7XHJcbiAgICAgICAgaWYgKCRzY29wZS5zZXR0aW5ncy5kaXJlY3Rpb24ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2V0dGluZ3MuZGlyZWN0aW9uID0gJHNjb3BlLnNldHRpbmdzLmRpcmVjdGlvblswXS5kaXJlY3Rpb247XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNldHRpbmdzLmRpcmVjdGlvbiA9ICdydGwnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1dKTtcclxuXHJcbi8qIFNldHVwIFJvdW50aW5nIEZvciBBbGwgUGFnZXMgKi9cclxuTWV0cm9uaWNBcHAuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJywgKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpID0+IHtcclxuICAgIC8vIFJlZGlyZWN0IGFueSB1bm1hdGNoZWQgdXJsXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvYmFja29mZmljZScpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGlzU3RhdGVQYXJhbXMoJHN0YXRlUGFyYW1zLCAkcSkge1xyXG4gICAgICAgIGlmICgkc3RhdGVQYXJhbXMuaWQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAuc3RhdGUoJ2xvZ2luJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvbG9naW4uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbG9nb3V0Jywge1xyXG4gICAgICAgICAgICB1cmw6ICcvbG9nb3V0JyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogWyckc3RhdGUnLCAnJHEnLCAndXNlckRhdGFTZXJ2aWNlJywgKCRzdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Rva2VuJyk7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2JhY2tvZmZpY2UnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9iYWNrb2ZmaWNlJyxcclxuICAgICAgICAgICAgLy8gYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2JhY2tvZmZpY2Uvdmlld3MvYmFja29mZmljZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0JhY2tvZmZpY2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlc0xvZ2luOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nLFxyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJ1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBzZXRVc2VyRGF0YTogdXNlckRhdGFTZXJ2aWNlID0+IHVzZXJEYXRhU2VydmljZS5zZXRVc2VyRGF0YSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIERhc2hib2FyZFxyXG4gICAgICAgIC5zdGF0ZSgnZGFzaGJvYXJkJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2JhY2tvZmZpY2UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvZGFzaGJvYXJkLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRGFzaGJvYXJkQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgZ2V0U3RhdHM6IGRhc2hib2FyZFNlcnZpY2UgPT4gZGFzaGJvYXJkU2VydmljZS5nZXRTdGF0cygpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nLFxyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2N1c3RvbWVyTGlzdCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2N1c3RvbWVyTGlzdCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9jdXN0b21lckxpc3QuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDdXN0b21lckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIGdldEN1c3RvbWVyczogY3VzdG9tZXJzRGF0YVNlcnZpY2UgPT4gY3VzdG9tZXJzRGF0YVNlcnZpY2UuZ2V0Q3VzdG9tZXJzKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhZGROZXdDdXN0b21lcicsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2FkZE5ld0N1c3RvbWVyJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2FkZE5ld0N1c3RvbWVyLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQ3VzdG9tZXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2VkaXRDdXN0b21lcicsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2VkaXRDdXN0b21lci86aWQnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvYWRkTmV3Q3VzdG9tZXIuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDdXN0b21lckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgaWQ6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgaXNTdGF0ZVBhcmFtcyxcclxuICAgICAgICAgICAgICAgIGdldEN1c3RvbWVyczogKGN1c3RvbWVyc0RhdGFTZXJ2aWNlLCAkc3RhdGVQYXJhbXMpID0+IGN1c3RvbWVyc0RhdGFTZXJ2aWNlLmdldEN1c3RvbWVyQnlJRCgkc3RhdGVQYXJhbXMuaWQpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2FkZE5ld0RyaXZlcicsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2FkZE5ld0RyaXZlcicsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9hZGROZXdEcml2ZXIuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEcml2ZXJzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTicsXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnZWRpdERyaXZlcicsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2VkaXREcml2ZXIvOmlkJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2FkZE5ld0RyaXZlci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0RyaXZlcnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBwYXJhbToge1xyXG4gICAgICAgICAgICAgICAgaWQ6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgaXNTdGF0ZVBhcmFtcyxcclxuICAgICAgICAgICAgICAgIGdldERyaXZlckJ5SUQ6IChkcml2ZXJzRGF0YVNlcnZpY2UsICRzdGF0ZVBhcmFtcywgdXNlckRhdGFTZXJ2aWNlLCBzZXRVc2VyRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkcml2ZXJzRGF0YVNlcnZpY2UuZ2V0RHJpdmVyQnlJRCh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsICRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nLFxyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2RyaXZlcnNMaXN0Jywge1xyXG4gICAgICAgICAgICB1cmw6ICcvZHJpdmVyc0xpc3QvOmlkJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2RyaXZlcnNMaXN0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRHJpdmVyc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgaWQ6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgZ2V0RHJpdmVyczogKGRyaXZlcnNEYXRhU2VydmljZSwgJHN0YXRlUGFyYW1zLCB1c2VyRGF0YVNlcnZpY2UsIGN1c3RvbWVyc0RhdGFTZXJ2aWNlLCBzZXRVc2VyRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkc3RhdGVQYXJhbXMuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyc0RhdGFTZXJ2aWNlLmdldEN1c3RvbWVyQnlJRCgkc3RhdGVQYXJhbXMuaWQpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHJpdmVyc0RhdGFTZXJ2aWNlLmdldERyaXZlcnMoJHN0YXRlUGFyYW1zLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHJpdmVyc0RhdGFTZXJ2aWNlLmdldERyaXZlcnModXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJyxcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhZGREcml2ZXJzUGhvbmVOdW1iZXJzJywge1xyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvcGhvbmVOdW1iZXJzJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL3Bob25lTnVtYmVycy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0N1c3RvbWVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUicsXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgncHJlZmVyZW5jZXMnLCB7XHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHVybDogJy9wcmVmZXJlbmNlcycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9wcmVmZXJlbmNlcy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0N1c3RvbWVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUicsXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYWN0aXZpdHlMb2cnLCB7XHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHVybDogJy9hY3Rpdml0eUxvZy86aWQvOm1vbnRoLzp5ZWFyJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2FjdGl2aXR5TG9nLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRHJpdmVyc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBtb250aDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHllYXI6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgZ2V0TG9nOiAoZHJpdmVyc0RhdGFTZXJ2aWNlLCAkc3RhdGVQYXJhbXMsIHVzZXJEYXRhU2VydmljZSwgc2V0VXNlckRhdGEpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgZHJpdmVyc0RhdGFTZXJ2aWNlLmdldExvZyh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsICRzdGF0ZVBhcmFtcy5pZCwgJHN0YXRlUGFyYW1zLm1vbnRoLCAkc3RhdGVQYXJhbXMueWVhcilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUicsXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYmVhY29uc0xpc3QnLCB7XHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHVybDogJy9iZWFjb25zTGlzdC86aWQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvYmVhY29uc0xpc3QuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdCZWFjb25zQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogbnVsbFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBnZXRCZWFjb25zOiAoYmVhY29uc0RhdGFTZXJ2aWNlLCB1c2VyRGF0YVNlcnZpY2UsICRzdGF0ZVBhcmFtcywgc2V0VXNlckRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJHN0YXRlUGFyYW1zLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZWFjb25zRGF0YVNlcnZpY2UuZ2V0QmVhY29ucygkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJldHVybiB1c2VyRGF0YVNlcnZpY2Uuc2V0VXNlckRhdGEoKS50aGVuKCgpID0+IGJlYWNvbnNEYXRhU2VydmljZS5nZXRCZWFjb25zKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVhY29uc0RhdGFTZXJ2aWNlLmdldEJlYWNvbnModXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJyxcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhdHRhY2hCZWFjb24nLCB7XHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHVybDogJy9hdHRhY2hCZWFjb24vOmlkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2F0dGFjaEJlYWNvbi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0JlYWNvbnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBnZXRCZWFjb25zOiAoYmVhY29uc0RhdGFTZXJ2aWNlLCB1c2VyRGF0YVNlcnZpY2UsIHNldFVzZXJEYXRhKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZXJEYXRhU2VydmljZS5zZXRVc2VyRGF0YSgpLnRoZW4oKCkgPT5cclxuICAgICAgICAgICAgICAgICAgICBiZWFjb25zRGF0YVNlcnZpY2UuZ2V0QmVhY29ucyh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nLFxyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2VkaXRCZWFjb24nLCB7XHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHVybDogJy9hdHRhY2hCZWFjb24vOmlkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2F0dGFjaEJlYWNvbi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0JlYWNvbnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGlkOiBudWxsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nLFxyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSk7XHJcbn1dKTtcclxuXHJcbi8qIEluaXQgZ2xvYmFsIHNldHRpbmdzIGFuZCBydW4gdGhlIGFwcCAqL1xyXG5NZXRyb25pY0FwcC5ydW4oWyckcm9vdFNjb3BlJywgJ3NldHRpbmdzJywgJyRzdGF0ZScsICdhdXRoTWFuYWdlcicsICd1c2VyRGF0YVNlcnZpY2UnLCAnYXV0aFNlcnZpY2UnLCAoJHJvb3RTY29wZSwgc2V0dGluZ3MsICRzdGF0ZSwgYXV0aE1hbmFnZXIsIHVzZXJEYXRhU2VydmljZSkgPT4ge1xyXG4gICAgJHJvb3RTY29wZS4kc3RhdGUgPSAkc3RhdGU7IC8vIHN0YXRlIHRvIGJlIGFjY2Vzc2VkIGZyb20gdmlld1xyXG4gICAgJHJvb3RTY29wZS4kc2V0dGluZ3MgPSBzZXR0aW5nczsgLy8gc3RhdGUgdG8gYmUgYWNjZXNzZWQgZnJvbSB2aWV3XHJcblxyXG4gICAgLy8gY2hlY2sgand0IG9uIHJlZnJlc2hcclxuICAgIGF1dGhNYW5hZ2VyLmNoZWNrQXV0aE9uUmVmcmVzaCgpO1xyXG4gICAgYXV0aE1hbmFnZXIucmVkaXJlY3RXaGVuVW5hdXRoZW50aWNhdGVkKCk7XHJcblxyXG4gICAgJHJvb3RTY29wZS4kb24oJ3Rva2VuSGFzRXhwaXJlZCcsICgpID0+ICRzdGF0ZS5nbygnbG9nb3V0JykpO1xyXG59XSk7XHJcblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuY29udHJvbGxlcignQmVhY29uc0NvbnRyb2xsZXInLCBbJyRzY29wZScsICckc3RhdGVQYXJhbXMnLCAnYmVhY29uc0RhdGFTZXJ2aWNlJywgJ3VzZXJEYXRhU2VydmljZScsICckc3RhdGUnLFxuICAgICAgICBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcywgYmVhY29uc0RhdGFTZXJ2aWNlLCB1c2VyRGF0YVNlcnZpY2UsICRzdGF0ZSkge1xuXG4gICAgICAgICAgICB0aGlzLmJlYWNvbnMgPSBiZWFjb25zRGF0YVNlcnZpY2UuYmVhY29ucztcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSAwO1xuXG4gICAgICAgICAgICBpZiAoJHN0YXRlUGFyYW1zLmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pZCA9ICRzdGF0ZVBhcmFtcy5pZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hdHRhY2hCZWFjb24gPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYmVhY29uc0RhdGFTZXJ2aWNlLmF0dGFjaEJlYWNvbih1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsIHRoaXMuYmVhY29uKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2JlYWNvbnNMaXN0JykpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy50b2dnbGVTdXNwZW5kQmVhY29uID0gKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmVhY29uID0gdGhpcy5iZWFjb25zLmNvbnRlbnRbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGJlYWNvbi5hY3RpdmUgPSAhYmVhY29uLmFjdGl2ZTtcbiAgICAgICAgICAgICAgICBiZWFjb25zRGF0YVNlcnZpY2UudG9nZ2xlQmVhY29uKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCwgYmVhY29uKTtcbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgLy9CdWlsZCBhcnJheSB3aXRoIGB0b3RhbFBhZ2VzYCBlbGVtZW50cyBhbmQgcmV0dXJuIGhpcyBpbmRleGVzXG4gICAgICAgICAgICAvL1VzZWQgZm9yIGRpc3BsYXlpbmcgdGhlIHBhZ2luYXRvclxuICAgICAgICAgICAgdGhpcy50b3RhbFBhZ2VzID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheVxuICAgICAgICAgICAgICAgICAgICAuYXBwbHkoMCwgQXJyYXkodGhpcy5iZWFjb25zLnRvdGFsUGFnZXMpKVxuICAgICAgICAgICAgICAgICAgICAubWFwKGluZGV4ID0+IGluZGV4KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZ29Ub1BhZ2UgPSAocGFnZU51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gJHN0YXRlUGFyYW1zLmlkIHx8IHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZDtcbiAgICAgICAgICAgICAgICBiZWFjb25zRGF0YVNlcnZpY2UuZ2V0QmVhY29ucyhpZCwgcGFnZU51bWJlcilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWFjb25zID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2VOdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5vcGVuQ2FsZW5kYXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgXSk7XG5cbi8qIFxuICAgIEBTdW1tYXJ5OiBDdXN0b21lciBjb250cm9sbGVyIFxuICAgIEBEZXNjcmlwdGlvbjogaW4gY2hhcmdlIG9mIGFsbCBsb2dpYyBhY3Rpb25zIHJlbGF0ZWQgdG8gdGhlIEN1c3RvbWVycy5cbiovXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5jb250cm9sbGVyKCdDdXN0b21lckNvbnRyb2xsZXInLCBbJyRzY29wZScsICdjdXN0b21lcnNEYXRhU2VydmljZScsICckc3RhdGVQYXJhbXMnLCAndXNlckRhdGFTZXJ2aWNlJywgJyRzdGF0ZScsXG4gICAgICAgIGZ1bmN0aW9uKCRzY29wZSwgY3VzdG9tZXJzRGF0YVNlcnZpY2UsICRzdGF0ZVBhcmFtcywgdXNlckRhdGFTZXJ2aWNlLCAkc3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJzID0gY3VzdG9tZXJzRGF0YVNlcnZpY2UuY3VzdG9tZXJzO1xuICAgICAgICAgICAgdGhpcy5lbWFpbFBhdHRlcm4gPSAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcblxuICAgICAgICAgICAgaWYgKCRzdGF0ZVBhcmFtcy5pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Bhc3N3b3JkRmllbGRzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lciA9IGN1c3RvbWVyc0RhdGFTZXJ2aWNlLmVkaXRpbmdDdXN0b21lcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbmV3IGNsaWVudCBtb2RlXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFzc3dvcmRGaWVsZHMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNldFBlcm1pc3Npb25Nb2RlbCA9IChwZXJtaXNzaW9ucykgPT57XG4gICAgICAgICAgICAgICAgaWYgKCFwZXJtaXNzaW9ucykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWxsb3dlZFBlcm1pc3Npb25zID0gcGVybWlzc2lvbnM7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxvd2VkUGVybWlzc2lvbiA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsb3dlZFBlcm1pc3Npb25zLmZvckVhY2goKHBlcm1pc3Npb24pID0+eyBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxvd2VkUGVybWlzc2lvbltwZXJtaXNzaW9uLnBlcm1pc3Npb25dID0gcGVybWlzc2lvbi5hbGxvd2VkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zZXRQZXJtaXNzaW9uTW9kZWwodXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLnBlcm1pc3Npb25zKTtcblxuICAgICAgICAgICAgdGhpcy5zYXZlUGVybWlzc2lvbnMgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBlcm1pc3Npb25zID0gW107XG4gICAgICAgICAgICAgICAgXy5mb3JFYWNoKHRoaXMuYWxsb3dlZFBlcm1pc3Npb24sIChhbGxvd2VkLCBwZXJtaXNzaW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwZXJtaXNzaW9uT2JqID0gXy5maW5kKHRoaXMuYWxsb3dlZFBlcm1pc3Npb25zLCB7cGVybWlzc2lvbjogcGVybWlzc2lvbn0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGVybWlzc2lvbk9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbk9iai5hbGxvd2VkID0gYWxsb3dlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zLnB1c2gocGVybWlzc2lvbk9iaik7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9ucy5wdXNoKHtwZXJtaXNzaW9uOiBwZXJtaXNzaW9uLCBhbGxvd2VkOiBhbGxvd2VkfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjdXN0b21lcnNEYXRhU2VydmljZS5zZXRQZXJtaXNzaW9ucyh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsIHBlcm1pc3Npb25zKS50aGVuKChwZXJtaXNzaW9ucykgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBlcm1pc3Npb25Nb2RlbChwZXJtaXNzaW9ucyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmFkZE5ld0N1c3RvbWVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJzRGF0YVNlcnZpY2UuZWRpdEN1c3RvbWVyKHRoaXMuY3VzdG9tZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2N1c3RvbWVyTGlzdCcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4gdGhpcy5sb2FkaW5nID0gZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyc0RhdGFTZXJ2aWNlLmFkZE5ld0N1c3RvbWVyKHRoaXMuY3VzdG9tZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2N1c3RvbWVyTGlzdCcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmFsbHkoKCkgPT4gdGhpcy5sb2FkaW5nID0gZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZHJpdmVyc1Bob25lTnVtYmVycyA9IHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5xdWlja0NhbGxOdW1iZXJzO1xuXG4gICAgICAgICAgICB0aGlzLnNhdmVOdW1iZXJzID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGZpdGxlciBvdXQgZW1wdHkgb2JqZWN0cyBpbiB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5kcml2ZXJzUGhvbmVOdW1iZXJzXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoeCA9PiB4Lm5hbWUubGVuZ3RoID4gMCAmJiB4Lm51bWJlci5sZW5ndGggPiAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VzdG9tZXJzRGF0YVNlcnZpY2Uuc2F2ZVF1aWNrQ2FsbE51bWJlcnModXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkLCB7IG51bWJlcnM6IGRhdGEgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnJlbW92ZU51bWJlciA9IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGhvbmVOdW1iZXJzRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyaXZlcnNQaG9uZU51bWJlcnMgPSB0aGlzLmRyaXZlcnNQaG9uZU51bWJlcnNcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcih4ID0+IHRoaXMuZHJpdmVyc1Bob25lTnVtYmVyc1tpbmRleF0gIT09IHgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5hZGROZXdOdW1iZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHJpdmVyc1Bob25lTnVtYmVycy5sZW5ndGggPCAxMikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyaXZlcnNQaG9uZU51bWJlcnMucHVzaCh7IG5hbWU6ICcnLCBudW1iZXI6ICcnIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGhvbmVOdW1iZXJzRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3VzcGVuZEN1c3RvbWVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXIuYWN0aXZlID0gIXRoaXMuY3VzdG9tZXIuYWN0aXZlO1xuICAgICAgICAgICAgICAgIGN1c3RvbWVyc0RhdGFTZXJ2aWNlLnN1c3BlbmRDdXN0b21lcih0aGlzLmN1c3RvbWVyKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMudG9nZ2xlUGFzc3dvcmRGaWVsZHMgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFzc3dvcmRGaWVsZHMgPSAhdGhpcy5zaG93UGFzc3dvcmRGaWVsZHM7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgXSk7XG5cbi8qIFxyXG4gICAgQFN1bW1hcnk6IERhc2hib2FyZCBjb250cm9sbGVyIFxyXG4gICAgQERlc2NyaXB0aW9uOiBpbiBjaGFyZ2Ugb2YgYWxsIGxvZ2ljIGFjdGlvbnMgcmVsYXRlZCB0byB0aGUgRGFzaGJvYXJkIGFuZCBldmVyeSBjaGlsZCBzdGF0ZSBvZiB0aGUgZGFzaGJvYXJkLlxyXG4qL1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcclxuICAgIC5jb250cm9sbGVyKCdEYXNoYm9hcmRDb250cm9sbGVyJywgWyckc2NvcGUnLCAnZGFzaGJvYXJkU2VydmljZScsXHJcbiAgICAgICAgZnVuY3Rpb24oJHNjb3BlLCBkYXNoYm9hcmRTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHMgPSBkYXNoYm9hcmRTZXJ2aWNlLnN0YXRzO1xyXG4gICAgICAgIH1cclxuICAgIF0pO1xuLyogXG4gICAgQFN1bW1hcnk6IERyaXZlcnMgY29udHJvbGxlciBcbiAgICBARGVzY3JpcHRpb246IGluIGNoYXJnZSBvZiBhbGwgbG9naWMgYWN0aW9ucyByZWxhdGVkIHRvIERyaXZlcnMsIFxuICAgIHN1Y2ggYXMgYWRkaW5nIG5ldyBkcml2ZXJzIGFuZCBkaXNwbGF5IGRyaXZlcnMgbGlzdC5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0RyaXZlcnNDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJHN0YXRlUGFyYW1zJywgJ2RyaXZlcnNEYXRhU2VydmljZScsICckc3RhdGUnLCAndXNlckRhdGFTZXJ2aWNlJywgJ2N1c3RvbWVyc0RhdGFTZXJ2aWNlJywgJ0NPTkZJRycsXG4gICAgICAgIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBkcml2ZXJzRGF0YVNlcnZpY2UsICRzdGF0ZSwgdXNlckRhdGFTZXJ2aWNlLCBjdXN0b21lcnNEYXRhU2VydmljZSwgQ09ORklHKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRNb2RlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmRyaXZlcnMgPSBkcml2ZXJzRGF0YVNlcnZpY2UuZHJpdmVycztcbiAgICAgICAgICAgIHRoaXMucGVybWlzc2lvbnMgPSBDT05GSUcuRFJJVkVSX1BFUk1JU1NJT05TO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hRdWVyeSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDA7XG5cbiAgICAgICAgICAgIC8qKiBcbiAgICAgICAgICAgICAqIHdlIGNhbiBoYXZlIGEgJHN0YXRlUGFyYW1zLmlkIGluIDIgY2FzZXM6XG4gICAgICAgICAgICAgKiBlZGl0aW5nIGEgZHJpdmVyIG9yIGdldHRpbmcgbGlzdCBvZiBkcml2ZXJzIHBlciBzcGVjaWZpYyBjdXN0b21lciAoYXMgc3VwZXJhZG1pbikgIFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAoJHN0YXRlUGFyYW1zLmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lciA9IGN1c3RvbWVyc0RhdGFTZXJ2aWNlLmVkaXRpbmdDdXN0b21lcjsgLy8gd2UncmUgZGlzcGxheWluZyB0aGUgbGlzdCBvZiBkcml2ZXJzIGZvciBhIHNwZWNpZmljIGN1c3RvbWVyLlxuICAgICAgICAgICAgICAgIHRoaXMuaWQgPSAkc3RhdGVQYXJhbXMuaWQ7XG4gICAgICAgICAgICAgICAgaWYgKCRzdGF0ZS5jdXJyZW50Lm5hbWUgPT09ICdlZGl0RHJpdmVyJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRNb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcml2ZXIgPSBkcml2ZXJzRGF0YVNlcnZpY2UuZWRpdGluZ0RyaXZlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBuZXcgZHJpdmVyIG1vZGVcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGUgPSAn15TXldeh16Mg16DXlNeSINeX15PXqSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYWRkTmV3RHJpdmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdE1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZHJpdmVyc0RhdGFTZXJ2aWNlLmVkaXREcml2ZXIodXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkLCB0aGlzLmRyaXZlcikudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZHJpdmVyc0xpc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZHJpdmVyc0RhdGFTZXJ2aWNlLmFkZE5ld0RyaXZlcih1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsIHRoaXMuZHJpdmVyKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdkcml2ZXJzTGlzdCcpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmdvVG9FZGl0Q3VzdG9tZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdlZGl0Q3VzdG9tZXInLCB7IGlkOiB0aGlzLmN1c3RvbWVyLmlkIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy52aWV3TG9nID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnYWN0aXZpdHlMb2cnLCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLmRyaXZlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN1c3BlbmREcml2ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcml2ZXIuYWN0aXZlID0gIXRoaXMuZHJpdmVyLmFjdGl2ZTtcbiAgICAgICAgICAgICAgICBkcml2ZXJzRGF0YVNlcnZpY2Uuc3VzcGVuZERyaXZlcih1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsIHRoaXMuZHJpdmVyKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZ29UbyA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKCEkc2NvcGUuaXNBZG1pbikge1xuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2VkaXREcml2ZXInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogdGhpcy5kcml2ZXJzLmNvbnRlbnRbaW5kZXhdLmlkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQFRPRE8gLSBtb3ZlIHRvIGhlbHBlclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnRvdGFsUGFnZXMgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5XG4gICAgICAgICAgICAgICAgICAgIC5hcHBseSgwLCBBcnJheSh0aGlzLmRyaXZlcnMudG90YWxQYWdlcykpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoaW5kZXggPT4gaW5kZXgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5nb1RvUGFnZSA9IChwYWdlTnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogZGVmaW5lIHdoaWNoIGlkIHRvIHVzZSBmb3IgQVBJXG4gICAgICAgICAgICAgICAgICogaWYgd2UncmUgbG9va2luZyBhdCBhIGxpc3Qgb2YgZHJpdmVycyBhcyBhIGN1c3RvbWVyIC0gd2UgbmVlZCBvdXIgb3duIGlkXG4gICAgICAgICAgICAgICAgICogaWYgd2UncmUgbG9va2luZyBhdCBhIGxpc3Qgb2YgZHJpdmVycyBhcyBhIHN1cGVyIGFkbWluIGZvciBzcGVjaWZpYyBjdXN0b21lciAtIHdlIG5lZWQgdGhlIGN1c3RvbWVyJ3MgaWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9ICRzdGF0ZVBhcmFtcy5pZCB8fCB1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQ7XG4gICAgICAgICAgICAgICAgZHJpdmVyc0RhdGFTZXJ2aWNlLmdldERyaXZlcnMoaWQsIHBhZ2VOdW1iZXIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJpdmVycyA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlTnVtYmVyO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2VhcmNoID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gJHN0YXRlUGFyYW1zLmlkIHx8IHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZDtcbiAgICAgICAgICAgICAgICBkcml2ZXJzRGF0YVNlcnZpY2Uuc2VhcmNoKGlkLCB0aGlzLnNlYXJjaFF1ZXJ5KS50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJpdmVycyA9IHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgXSk7XG5cbi8qIFxuICAgIEBTdW1tYXJ5OiBMb2dpbiBjb250cm9sbGVyIFxuICAgIEBEZXNjcmlwdGlvbjogaW4gY2hhcmdlIG9mIGFsbCBsb2dpYyBhY3Rpb25zIHJlbGF0ZWQgdG8gTG9naW5cbiovXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5jb250cm9sbGVyKCdMb2dpbkNvbnRyb2xsZXInLCBbJyRzdGF0ZScsICdhdXRoU2VydmljZScsICd1c2VyRGF0YVNlcnZpY2UnLFxuICAgICAgICBmdW5jdGlvbigkc3RhdGUsIGF1dGhTZXJ2aWNlLCB1c2VyRGF0YVNlcnZpY2UpIHtcblxuICAgICAgICAgICAgdGhpcy5zdWJtaXQgPSAoaXNWYWxpZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogdGhpcy5wYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiB0aGlzLmVtYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVjYXB0Y2hhUmVzcG9uc2U6IHRoaXMucmVjYXB0Y2hhUmVzcG9uc2VcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBhdXRoU2VydmljZS5sb2dpbih1c2VyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdXNlckRhdGFTZXJ2aWNlLnNldFVzZXJEYXRhKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5tYWluU3RhdGVTY3JlZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXSk7XG5cbi8qIFxuICAgIEBTdW1tYXJ5OiBNb2RhbCBjb250cm9sbGVyIFxuICAgIEBEZXNjcmlwdGlvbjogaW4gY2hhcmdlIG9mIGFsbCBsb2dpYyBhY3Rpb25zIHJlbGF0ZWQgdG8gTW9kYWxcbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ01vZGFsQ29udHJvbGxlcicsIFsnY2xvc2UnLFxuICAgICAgICBmdW5jdGlvbihjbG9zZSkge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSA9IChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjbG9zZSwgYnV0IGdpdmUgNTAwbXMgZm9yIGJvb3RzdHJhcCB0byBhbmltYXRlXG4gICAgICAgICAgICAgICAgY2xvc2UocmVzdWx0LCA1MDApOyBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbl0pO1xuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuZGlyZWN0aXZlKCdjb25maXJtUGFzc3dvcmQnLCBjb25maXJtUGFzc3dvcmRDb25maWcpO1xuXG5mdW5jdGlvbiBjb25maXJtUGFzc3dvcmRDb25maWcoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgcmVxdWlyZTogJ25nTW9kZWwnLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgb3RoZXJNb2RlbFZhbHVlOiAnPWNvbXBhcmVUbydcbiAgICAgICAgfSxcbiAgICAgICAgbGluazogKHNjb3BlLCBlbGVtZW50LCBhdHRyaWJ1dGVzLCBuZ01vZGVsKSA9PiB7XG4gICAgICAgICAgICBuZ01vZGVsLiR2YWxpZGF0b3JzLmNvbXBhcmVUbyA9IChtb2RlbFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGVsVmFsdWUgPT09IHNjb3BlLm90aGVyTW9kZWxWYWx1ZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaCgnb3RoZXJNb2RlbFZhbHVlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5nTW9kZWwuJHZhbGlkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG4vKioqXHJcbkdMb2JhbCBEaXJlY3RpdmVzXHJcbioqKi9cclxuXHJcbi8vIFJvdXRlIFN0YXRlIExvYWQgU3Bpbm5lcih1c2VkIG9uIHBhZ2Ugb3IgY29udGVudCBsb2FkKVxyXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxyXG4gICAgLmRpcmVjdGl2ZSgnbmdTcGlubmVyQmFyJywgWyckcm9vdFNjb3BlJywgJyRzdGF0ZScsXHJcbiAgICAgICAgZnVuY3Rpb24oJHJvb3RTY29wZSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBieSBkZWZ1bHQgaGlkZSB0aGUgc3Bpbm5lciBiYXJcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdoaWRlJyk7IC8vIGhpZGUgc3Bpbm5lciBiYXIgYnkgZGVmYXVsdFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBkaXNwbGF5IHRoZSBzcGlubmVyIGJhciB3aGVuZXZlciB0aGUgcm91dGUgY2hhbmdlcyh0aGUgY29udGVudCBwYXJ0IHN0YXJ0ZWQgbG9hZGluZylcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnaGlkZScpOyAvLyBzaG93IHNwaW5uZXIgYmFyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIHNwaW5uZXIgYmFyIG9uIHJvdW50ZSBjaGFuZ2Ugc3VjY2VzcyhhZnRlciB0aGUgY29udGVudCBsb2FkZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdoaWRlJyk7IC8vIGhpZGUgc3Bpbm5lciBiYXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdwYWdlLW9uLWxvYWQnKTsgLy8gcmVtb3ZlIHBhZ2UgbG9hZGluZyBpbmRpY2F0b3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgTGF5b3V0LnNldEFuZ3VsYXJKc1NpZGViYXJNZW51QWN0aXZlTGluaygnbWF0Y2gnLCBudWxsLCBldmVudC5jdXJyZW50U2NvcGUuJHN0YXRlKTsgLy8gYWN0aXZhdGUgc2VsZWN0ZWQgbGluayBpbiB0aGUgc2lkZWJhciBtZW51XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhdXRvIHNjb3JsbCB0byBwYWdlIHRvcFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwLnNjcm9sbFRvcCgpOyAvLyBzY3JvbGwgdG8gdGhlIHRvcCBvbiBjb250ZW50IGxvYWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgJHJvb3RTY29wZS5zZXR0aW5ncy5sYXlvdXQucGFnZUF1dG9TY3JvbGxPbkxvYWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGUgZXJyb3JzXHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZU5vdEZvdW5kJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2hpZGUnKTsgLy8gaGlkZSBzcGlubmVyIGJhclxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGUgZXJyb3JzXHJcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZUVycm9yJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2hpZGUnKTsgLy8gaGlkZSBzcGlubmVyIGJhclxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIF0pO1xyXG5cclxuLy8gSGFuZGxlIGdsb2JhbCBMSU5LIGNsaWNrXHJcbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXHJcbiAgICAuZGlyZWN0aXZlKCdhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0sIGF0dHJzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXR0cnMubmdDbGljayB8fCBhdHRycy5ocmVmID09PSAnJyB8fCBhdHRycy5ocmVmID09PSAnIycpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IGxpbmsgY2xpY2sgZm9yIGFib3ZlIGNyaXRlcmlhXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4vLyBIYW5kbGUgRHJvcGRvd24gSG92ZXIgUGx1Z2luIEludGVncmF0aW9uXHJcbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXHJcbiAgICAuZGlyZWN0aXZlKCdkcm9wZG93bk1lbnVIb3ZlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtLmRyb3Bkb3duSG92ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcbi8qIFxuICAgIEBTdW1tYXJ5OiBBdXRoZW50aWNhdGlvbiBzZXJ2aWNlIFxuICAgIEBEZXNjcmlwdGlvbjogaW4gY2hhcmdlIG9mIEFQSSByZXF1ZXN0cyBhbmQgZGF0YSByZWxhdGVkIHRvIHVzZXIgYXV0aGVudGljYXRpb24uXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5zZXJ2aWNlKCdhdXRoU2VydmljZScsIFsnJGh0dHAnLCAnQ09ORklHJywgJ3N3YW5ndWxhcicsICdlcnJvckhhbmRsZXJTZXJ2aWNlJyxcbiAgICAgICAgZnVuY3Rpb24oJGh0dHAsIENPTkZJRywgc3dhbmd1bGFyLCBlcnJvckhhbmRsZXJTZXJ2aWNlKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHNlcnZlciA9IENPTkZJRy5TRVJWRVI7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGxvZ2luKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KHNlcnZlciArICcvYXV0aGVudGljYXRlJywgY3JlZGVudGlhbHMpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQ6JyxyZXN1bHQsJ2F1dGgnLHJlc3VsdC5oZWFkZXJzKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IHJlc3VsdC5oZWFkZXJzKCkuYXV0aG9yaXphdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dhbmd1bGFyLnN3YWwoJ9ek16jXmNeZINeU15TXqteX15HXqNeV16og16nXkteV15nXmdedJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ9eQ16DXkCDXkdeT15XXpyDXkNeqINeU16DXqteV16DXmdedINep15TXlteg16ouJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luZm8nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JIYW5kbGVyU2VydmljZS5oYW5kbGUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrQ3VycmVudFVzZXIoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoc2VydmVyICsgJy91c2Vycy9jdXJyZW50Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGxvZ2luLFxuICAgICAgICAgICAgICAgIGNoZWNrQ3VycmVudFVzZXJcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcblxuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5mYWN0b3J5KCdhdXRoSW50ZXJjZXB0b3InLCAoKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXNwb25zZTogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Rva2VuID0gcmVzLmhlYWRlcnMoKS5hdXRob3JpemF0aW9uO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUb2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5ld1Rva2VuICYmIG5ld1Rva2VuICE9PSBjdXJyZW50VG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rva2VuJywgbmV3VG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuXG4vKiBcbiAgICBAU3VtbWFyeTogQmVhY29ucyBEYXRhIFNlcnZpY2UgXG4gICAgQERlc2NyaXB0aW9uOiBJbiBjaGFyZ2Ugb2YgQVBJIHJlcXVlc3RzIGFuZCBkYXRhIHJlbGF0ZWQgdGhlIGJlYWNvbnNcbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLnNlcnZpY2UoJ2JlYWNvbnNEYXRhU2VydmljZScsIFsnJHEnLCAnJGh0dHAnLCAnQ09ORklHJywgJyRpbmplY3RvcicsXG4gICAgICAgIGZ1bmN0aW9uKCRxLCAkaHR0cCwgQ09ORklHLCAkaW5qZWN0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlcnZlciA9IENPTkZJRy5TRVJWRVI7XG4gICAgICAgICAgICBjb25zdCBzd2FuZ3VsYXIgPSAkaW5qZWN0b3IuZ2V0KCdzd2FuZ3VsYXInKTsgLy8gYXZvaWQgY2lyY3VsYXIgZGVwZW5kZW5jeVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRCZWFjb25zKGlkLCBwYWdlTnVtYmVyID0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IGA/cGFnZT0ke3BhZ2VOdW1iZXJ9YDtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLmdldChgJHtzZXJ2ZXJ9L2N1c3RvbWVycy8ke2lkfS9iZWFjb25zJHtwYXJhbXN9YClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWFjb25zID0gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlYWNvbnMuY29udGVudCA9IHRoaXMuYmVhY29ucy5jb250ZW50Lm1hcCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmxhc3RBY3Rpdml0eSA9IG1vbWVudC51dGMob2JqLmxhc3RBY3Rpdml0eSkuY2FsZW5kYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmxhc3RBY3Rpdml0eSA9PT0gJ0ludmFsaWQgZGF0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmxhc3RBY3Rpdml0eSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGF0dGFjaEJlYWNvbihjdXN0b21lcklkLCB7IHNlcmlhbCwgdXVpZCwgbGljZW5zZVBsYXRlTnVtYmVyLCBleHBpcnlEYXRlIH0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBvc3QoYCR7c2VydmVyfS9jdXN0b21lcnMvJHtjdXN0b21lcklkfS9iZWFjb25zYCwgeyBzZXJpYWwsIHV1aWQsIGxpY2Vuc2VQbGF0ZU51bWJlciwgZXhwaXJ5RGF0ZSB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gNDA5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dhbmd1bGFyLm9wZW4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sVGVtcGxhdGU6ICdiYWNrb2ZmaWNlL3RwbC9zZW5zb3ItNDA5Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TG9hZGVyT25Db25maXJtOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAoKSA9PiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gdG9nZ2xlQmVhY29uKGN1c3RvbWVySWQsIHsgaWQsIGFjdGl2ZSB9KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wYXRjaChgJHtzZXJ2ZXJ9L2N1c3RvbWVycy8ke2N1c3RvbWVySWR9L2JlYWNvbnMvJHtpZH0vYWN0aXZlYCwgeyBhY3RpdmUgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBnZXRCZWFjb25zLFxuICAgICAgICAgICAgICAgIGF0dGFjaEJlYWNvbixcbiAgICAgICAgICAgICAgICB0b2dnbGVCZWFjb25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcblxuLyogXG4gICAgQFN1bW1hcnk6IEN1c3RvbWVycyBEYXRhIFNlcnZpY2UgXG4gICAgQERlc2NyaXB0aW9uOiBJbiBjaGFyZ2Ugb2YgQVBJIHJlcXVlc3RzIGFuZCBkYXRhIHJlbGF0ZWQgdGhlIGN1c3RvbWVyc1xuKi9cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuc2VydmljZSgnY3VzdG9tZXJzRGF0YVNlcnZpY2UnLCBbJyRodHRwJywgJ0NPTkZJRycsICdzd2FuZ3VsYXInLFxuICAgICAgICBmdW5jdGlvbigkaHR0cCwgQ09ORklHLCBzd2FuZ3VsYXIpIHtcblxuICAgICAgICAgICAgY29uc3Qgc2VydmVyID0gQ09ORklHLlNFUlZFUjtcblxuICAgICAgICAgICAgZnVuY3Rpb24gbWFwQ3VzdG9tZXJzKGRhdGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmUgPyBpdGVtLnN0YXR1cyA9ICdDVVNUT01FUl9MSVNULkFDVElWRScgOiBpdGVtLnN0YXR1cyA9ICdDVVNUT01FUl9MSVNULk5PVF9BQ1RJVkUnO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0Q3VzdG9tZXJzKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAuZ2V0KHNlcnZlciArICcvY3VzdG9tZXJzJylcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lcnMgPSBtYXBDdXN0b21lcnMocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkTmV3Q3VzdG9tZXIobmV3Q3VzdG9tZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3Q3VzdG9tZXIuY29tcGFueUxvZ28pIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3Q3VzdG9tZXIuY29tcGFueUxvZ28gPSBuZXdDdXN0b21lci5jb21wYW55TG9nby5iYXNlNjQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAucG9zdChzZXJ2ZXIgKyAnL2N1c3RvbWVycycsIG5ld0N1c3RvbWVyKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVyci5zdGF0dXMgPT09IDQwOSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3YW5ndWxhci5vcGVuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbFRlbXBsYXRlOiAnYmFja29mZmljZS90cGwvY3VzdG9tZXItNDA5Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TG9hZGVyT25Db25maXJtOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICgpID0+IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBlZGl0Q3VzdG9tZXIoeyBjb21wYW55TmFtZSwgZGlzcGxheU5hbWUsIHBhc3N3b3JkLCBlbWFpbCwgaWQsIGFjdGl2ZSwgY29tcGFueUxvZ28sIGNvbXBhbnlSb2xlLCBwaG9uZU51bWJlciB9KSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbXBhbnlMb2dvKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhbnlMb2dvID0gY29tcGFueUxvZ28uYmFzZTY0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBhdGNoKHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBpZCwgeyBjb21wYW55TmFtZSwgZGlzcGxheU5hbWUsIHBhc3N3b3JkLCBlbWFpbCwgYWN0aXZlLCBjb21wYW55TG9nbywgY29tcGFueVJvbGUsIHBob25lTnVtYmVyIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRDdXN0b21lckJ5SUQoaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLmdldChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgaWQpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdGluZ0N1c3RvbWVyID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzYXZlUXVpY2tDYWxsTnVtYmVycyhpZCwgZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAucGF0Y2goc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGlkICsgJy9udW1iZXJzJywgZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gc3VzcGVuZEN1c3RvbWVyKHsgaWQsIGFjdGl2ZSB9KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wYXRjaChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgaWQgKyAnL2FjdGl2ZScsIHsgYWN0aXZlIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFBlcm1pc3Npb25zKGlkLCBwZXJtaXNzaW9ucykge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAucGF0Y2goc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGlkICsgJy9wZXJtaXNzaW9ucycsIHsgcGVybWlzc2lvbnMgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBnZXRDdXN0b21lcnMsXG4gICAgICAgICAgICAgICAgYWRkTmV3Q3VzdG9tZXIsXG4gICAgICAgICAgICAgICAgZWRpdEN1c3RvbWVyLFxuICAgICAgICAgICAgICAgIGdldEN1c3RvbWVyQnlJRCxcbiAgICAgICAgICAgICAgICBzYXZlUXVpY2tDYWxsTnVtYmVycyxcbiAgICAgICAgICAgICAgICBzdXNwZW5kQ3VzdG9tZXIsXG4gICAgICAgICAgICAgICAgc2V0UGVybWlzc2lvbnNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcbi8qIFxuICAgIEBTdW1tYXJ5OiBEYXNoYm9hcmQgRGF0YSBTZXJ2aWNlIFxuICAgIEBEZXNjcmlwdGlvbjogSW4gY2hhcmdlIG9mIERhc2hib2FyZCBkYXRhIHN1Y2ggYXMgU3RhdGlzdGljc1xuKi9cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuc2VydmljZSgnZGFzaGJvYXJkU2VydmljZScsIFsnJGh0dHAnLCAnQ09ORklHJyxcbiAgICAgICAgZnVuY3Rpb24oJGh0dHAsIENPTkZJRykge1xuICAgICAgICAgICAgY29uc3Qgc2VydmVyID0gQ09ORklHLlNFUlZFUjtcblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0U3RhdHMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoYCR7c2VydmVyfS9hZG1pbi9zdGF0aXN0aWNzYClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0cyA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0cy55ZXN0ZXJkYXlBY3Rpdml0eVNlY29uZHMgPSBtb21lbnQoKS5ob3VycygwKS5taW51dGVzKDApLnNlY29uZHModGhpcy5zdGF0cy55ZXN0ZXJkYXlBY3Rpdml0eVNlY29uZHMpLmZvcm1hdCgnSEg6bW06c3MnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRzO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBnZXRTdGF0c1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIF0pO1xuXG4vKiBcbiAgICBAU3VtbWFyeTogRHJpdmVycyBEYXRhIFNlcnZpY2UgXG4gICAgQERlc2NyaXB0aW9uOiBJbiBjaGFyZ2Ugb2YgQVBJIHJlcXVlc3RzIGFuZCBkYXRhIHJlbGF0ZWQgdGhlIGRyaXZlcnNcbiovXG5cbi8vIGltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuc2VydmljZSgnZHJpdmVyc0RhdGFTZXJ2aWNlJywgWyckaHR0cCcsICdDT05GSUcnLFxuICAgICAgICBmdW5jdGlvbigkaHR0cCwgQ09ORklHKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHNlcnZlciA9IENPTkZJRy5TRVJWRVI7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hcERyaXZlcnMoZGF0YSkge1xuICAgICAgICAgICAgICAgIGRhdGEuY29udGVudC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5hY3RpdmVIb3VycyA9IG1vbWVudCgpLmhvdXJzKDApLm1pbnV0ZXMoMCkuc2Vjb25kcyhpdGVtLnllc3RlcmRheUFjdGl2aXR5U2Vjb25kcykuZm9ybWF0KCdISDptbTpzcycpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXREcml2ZXJzKGlkLCBwYWdlTnVtYmVyID0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IGA/cGFnZT0ke3BhZ2VOdW1iZXJ9YDtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLmdldChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgaWQgKyAnL2RyaXZlcnMnICsgcGFyYW1zKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRyaXZlcnMgPSBtYXBEcml2ZXJzKHJlc3VsdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRyaXZlcnM7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXREcml2ZXJCeUlEKGN1c3RvbWVySWQsIGlkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGN1c3RvbWVySWQgKyAnL2RyaXZlcnMvJyArIGlkKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdEcml2ZXIgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdGluZ0RyaXZlci5wZXJtaXNzaW9uTGV2ZWwgPSBDT05GSUcuRFJJVkVSX1BFUk1JU1NJT05TXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgob2JqKSA9PiBvYmoudHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuaW5kZXhPZih0aGlzLmVkaXRpbmdEcml2ZXIucGVybWlzc2lvbkxldmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGFkZE5ld0RyaXZlcihjdXN0b21lcklkLCB7IGRpc3BsYXlOYW1lLCBpZE51bWJlciwgcGhvbmVOdW1iZXIsIHBlcm1pc3Npb25MZXZlbCwgbGljZW5zZU51bWJlciB9KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBjdXN0b21lcklkICsgJy9kcml2ZXJzJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZE51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbkxldmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGljZW5zZU51bWJlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZWRpdERyaXZlcihjdXN0b21lcklkLCB7IGRpc3BsYXlOYW1lLCBpZE51bWJlciwgcGhvbmVOdW1iZXIsIGlkLCBwZXJtaXNzaW9uTGV2ZWwsIGFjdGl2ZSwgbGljZW5zZU51bWJlciB9KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wYXRjaChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgY3VzdG9tZXJJZCArICcvZHJpdmVycy8nICsgaWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWROdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwaG9uZU51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25MZXZlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpY2Vuc2VOdW1iZXJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHN1c3BlbmREcml2ZXIoY3VzdG9tZXJJZCwgeyBpZCwgYWN0aXZlIH0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBhdGNoKHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBjdXN0b21lcklkICsgJy9kcml2ZXJzLycgKyBpZCArICcvYWN0aXZlJywgeyBhY3RpdmUgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldExvZyhjdXNvdG1lcklkLCBpZCwgbW9udGgsIHllYXIpIHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB0b1NlY29uZHModGltZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGFydHMgPSB0aW1lLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoK3BhcnRzWzBdKSAqIDYwICogNjAgKyAoK3BhcnRzWzFdKSAqIDYwICsgKCtwYXJ0c1syXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IG1vbWVudCgpLmRheSgwKS5tb250aChtb250aCkueWVhcih5ZWFyKS5mb3JtYXQoJ1lZWVkvTU0vREQnKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAuZ2V0KGAke3NlcnZlcn0vY3VzdG9tZXJzLyR7Y3Vzb3RtZXJJZH0vZHJpdmVycy8ke2lkfS9hY3Rpdml0eS8/ZGF0ZT0ke2RhdGV9YClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cgPSByZXMuZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKG9iaikgPT4gb2JqLmVuZGVkQXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5kYXRlID0gYCR7bW9tZW50KG9iai5zdGFydGVkQXQpLmZvcm1hdCgnREQvTU0vWVlZWScpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5zdGFydGVkQXQgPSBgJHttb21lbnQudXRjKG9iai5zdGFydGVkQXQpLmZvcm1hdCgnREQvTU0vWVlZWSBISDptbTpzcycpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5lbmRlZEF0ID0gYCR7bW9tZW50LnV0YyhvYmouZW5kZWRBdCkuZm9ybWF0KCdERC9NTS9ZWVlZIEhIOm1tOnNzJyl9YDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmRyaXZlclN0YXR1c0xvZ3MgJiYgb2JqLmRyaXZlclN0YXR1c0xvZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZHJpdmVyU3RhdHVzTG9ncyA9IG9iai5kcml2ZXJTdGF0dXNMb2dzLm1hcCgoc3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmRhdGUgPSBgJHttb21lbnQudXRjKHN0YXR1cy5zdGFydGVkQXQpLmZvcm1hdCgnREQvTU0vWVlZWScpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLnN0YXJ0ZWRBdCA9IGAke21vbWVudC51dGMoc3RhdHVzLnN0YXJ0ZWRBdCkuY2FsZW5kYXIoKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1cy5lbmRlZEF0ID0gYCR7bW9tZW50LnV0YyhzdGF0dXMuZW5kZWRBdCkuY2FsZW5kYXIoKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0dXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQWN0aXZpdHkgPSB0aGlzLmxvZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnRvdGFsVGltZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRvU2Vjb25kcyhvYmoudG90YWxUaW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZWR1Y2UoKGEsIGIpID0+IHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhICsgYjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbEFjdGl2aXR5ID0gbW9tZW50KCkuaG91cnMoMCkubWludXRlcygwKS5zZWNvbmRzKHRoaXMudG90YWxBY3Rpdml0eSkuZm9ybWF0KCdISDptbTpzcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWFyY2goaWQsIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGlkICsgJy9kcml2ZXJzJyArICcvP3E9JyArIHF1ZXJ5KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFwRHJpdmVycyhyZXMuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdldERyaXZlcnMsXG4gICAgICAgICAgICAgICAgYWRkTmV3RHJpdmVyLFxuICAgICAgICAgICAgICAgIGVkaXREcml2ZXIsXG4gICAgICAgICAgICAgICAgc3VzcGVuZERyaXZlcixcbiAgICAgICAgICAgICAgICBnZXRMb2csXG4gICAgICAgICAgICAgICAgZ2V0RHJpdmVyQnlJRCxcbiAgICAgICAgICAgICAgICBzZWFyY2hcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcblxuLyogXG4gICAgQFN1bW1hcnk6IEVycm9yIEhhbmRsaW5nIEludGVyY2VwdG9yIFxuICAgIEBEZXNjcmlwdGlvbjogSW4gY2hhcmdlIG9mIGludGVyY2VwdGluZyByZXNwb25zZXMgYW5kIGRldGVybWluZSBpZiB0aGVpciBhbiBlcnJvci5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLmZhY3RvcnkoJ2Vycm9ySGFuZGxlckludGVyY2VwdG9yJywgWydlcnJvckhhbmRsZXJTZXJ2aWNlJyxcbiAgICAgICAgZnVuY3Rpb24oZXJyb3JIYW5kbGVyU2VydmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZUVycm9yOiAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnJvckhhbmRsZXJTZXJ2aWNlLmhhbmRsZShlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBQcm9taXNlLnJlc29sdmUoZXJyKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiBQcm9taXNlLnJlamVjdChlcnIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5dKTtcblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuc2VydmljZSgnZXJyb3JIYW5kbGVyU2VydmljZScsIFsnJGluamVjdG9yJyxcbiAgICAgICAgZnVuY3Rpb24oJGluamVjdG9yKSB7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGhhbmRsZShlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzd2FuZ3VsYXIgPSAkaW5qZWN0b3IuZ2V0KCdzd2FuZ3VsYXInKTsgLy8gYXZvaWQgY2lyY3VsYXIgZGVwZW5kZW5jeVxuICAgICAgICAgICAgICAgIGNvbnN0ICRzdGF0ZSA9ICRpbmplY3Rvci5nZXQoJyRzdGF0ZScpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChlcnIuc3RhdHVzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgndW5hdXRob3JpemVkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3YW5ndWxhci5vcGVuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbFRlbXBsYXRlOiAnYmFja29mZmljZS90cGwvNDAzLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TG9hZGVyT25Db25maXJtOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAoKSA9PiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dhbmd1bGFyLm9wZW4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sVGVtcGxhdGU6ICcvYmFja29mZmljZS90cGwvNDA0Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TG9hZGVyT25Db25maXJtOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAoKSA9PiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgnbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDA5OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgnZHVwbGljYXRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1MDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDUwMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2FuZ3VsYXIub3Blbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxUZW1wbGF0ZTogJ2JhY2tvZmZpY2UvdHBsLzUwMi5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0xvYWRlck9uQ29uZmlybTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogKCkgPT4ge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcbi8qIFxuICAgIEBTdW1tYXJ5OiBVc2VyIERhdGEgU2VydmljZSBcbiAgICBARGVzY3JpcHRpb246IEluIGNoYXJnZSBvZiBBUEkgcmVxdWVzdHMgYW5kIGRhdGEgcmVsYXRlZCB0aGUgdXNlciB0aGF0IGlzIG5vdyBsb2dnZWQgaW4gdG8gdGhlIGFwcC5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLnNlcnZpY2UoJ3VzZXJEYXRhU2VydmljZScsIFsnYXV0aFNlcnZpY2UnLCAnJHN0YXRlJywgJyRodHRwJywgJ0NPTkZJRycsXG4gICAgICAgIGZ1bmN0aW9uKGF1dGhTZXJ2aWNlLCAkc3RhdGUsICRodHRwLCBDT05GSUcpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlcnZlciA9IENPTkZJRy5TRVJWRVI7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFVzZXJEYXRhKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhdXRoU2VydmljZS5jaGVja0N1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VXNlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ21haW5TdGF0ZVNjcmVlbic6J2xvZ2luJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5jdXJyZW50VXNlcixyZXMuZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9pc0FkbWluID0gaXNBZG1pbi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pc0FkbWluKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyLm1haW5TdGF0ZVNjcmVlbiA9ICdjdXN0b21lckxpc3QnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyLm1haW5TdGF0ZVNjcmVlbiA9ICdkcml2ZXJzTGlzdCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiAkc3RhdGUuZ28oJ2xvZ2luJykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBpc0N1c3RvbWVyKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRVc2VyLnJvbGVzLmluY2x1ZGVzKCdDVVNUT01FUicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBpc0FkbWluKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRVc2VyLnJvbGVzLmluY2x1ZGVzKCdBRE1JTicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiB1cGRhdGVVc2VyTGFuZ3VhZ2UobGFuZykge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wYXRjaChzZXJ2ZXIgKyAnL3VzZXJzL2N1cnJlbnQnLCB7bGFuZ3VhZ2U6IGxhbmd9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzZXRVc2VyRGF0YSxcbiAgICAgICAgICAgICAgICBpc0N1c3RvbWVyLFxuICAgICAgICAgICAgICAgIGlzQWRtaW4sXG4gICAgICAgICAgICAgICAgdXBkYXRlVXNlckxhbmd1YWdlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgXSk7XG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLmRpcmVjdGl2ZSgnYWN0aXZpdHlMb2cnLCBhY3Rpdml0eUxvZ0NvbmZpZyk7XG5cbmZ1bmN0aW9uIGFjdGl2aXR5TG9nQ29uZmlnKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL2pzL2RpcmVjdGl2ZXMvYWN0aXZpdHlMb2cvYWN0aXZpdHlMb2cuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6IFsnJHN0YXRlJywgJyRzdGF0ZVBhcmFtcycsICdkcml2ZXJzRGF0YVNlcnZpY2UnLCBhY3Rpdml0eUxvZ0NvbnRyb2xsZXJdLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBhY3Rpdml0eUxvZ0NvbnRyb2xsZXIoJHN0YXRlLCAkc3RhdGVQYXJhbXMsIGRyaXZlcnNEYXRhU2VydmljZSkge1xuICAgIGNvbnN0IG1vbnRocyA9IFtcbiAgICAgICAgJ9eZ16DXldeQ16gnLFxuICAgICAgICAn16TXkdeo15XXkNeoJyxcbiAgICAgICAgJ9ee16jXpScsXG4gICAgICAgICfXkNek16jXmdecJyxcbiAgICAgICAgJ9ee15DXmScsXG4gICAgICAgICfXmdeV16DXmScsXG4gICAgICAgICfXmdeV15zXmScsXG4gICAgICAgICfXkNeV15LXldeh15gnLFxuICAgICAgICAn16HXpNeY157XkdeoJyxcbiAgICAgICAgJ9eQ15XXp9eY15XXkdeoJyxcbiAgICAgICAgJ9eg15XXkdee15HXqCcsXG4gICAgICAgICfXk9em157XkdeoJ1xuICAgIF07XG5cbiAgICAkc3RhdGVQYXJhbXMubW9udGggPSBOdW1iZXIoJHN0YXRlUGFyYW1zLm1vbnRoKTtcbiAgICAkc3RhdGVQYXJhbXMueWVhciA9IE51bWJlcigkc3RhdGVQYXJhbXMueWVhcik7XG5cbiAgICB0aGlzLmxvZyA9IGRyaXZlcnNEYXRhU2VydmljZS5sb2c7XG4gICAgdGhpcy50b3RhbEFjdGl2aXR5ID0gZHJpdmVyc0RhdGFTZXJ2aWNlLnRvdGFsQWN0aXZpdHk7XG5cbiAgICB0aGlzLmN1cnJlbnREYXRlID0gYCR7bW9udGhzWyRzdGF0ZVBhcmFtcy5tb250aF19ICR7JHN0YXRlUGFyYW1zLnllYXJ9YDtcbiAgICB0aGlzLmlzRnV0dXJlRGF0ZSA9ICRzdGF0ZVBhcmFtcy5tb250aCA+PSBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgJiYgJHN0YXRlUGFyYW1zLnllYXIgPj0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuICAgIHRoaXMuaXNQYXN0RGF0ZSA9ICRzdGF0ZVBhcmFtcy55ZWFyIDw9IDIwMTU7XG4gICAgdGhpcy5leHBhbmRlZFJvd3MgPSB7fTtcblxuICAgIHRoaXMubmV4dCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZCA9IG5ldyBEYXRlKCRzdGF0ZVBhcmFtcy55ZWFyLCAkc3RhdGVQYXJhbXMubW9udGggKyAxLCAxKTtcbiAgICAgICAgJHN0YXRlLmdvKCdhY3Rpdml0eUxvZycsIHsgbW9udGg6IGQuZ2V0TW9udGgoKSwgeWVhcjogZC5nZXRGdWxsWWVhcigpIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnByZXYgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgkc3RhdGVQYXJhbXMueWVhciwgJHN0YXRlUGFyYW1zLm1vbnRoIC0gMSwgMSk7XG4gICAgICAgICRzdGF0ZS5nbygnYWN0aXZpdHlMb2cnLCB7IG1vbnRoOiBkLmdldE1vbnRoKCksIHllYXI6IGQuZ2V0RnVsbFllYXIoKSB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5leHBhbmQgPSAobG9nKSA9PiB7XG4gICAgICAgIGxvZy5leHBhbmRlZCA9ICFsb2cuZXhwYW5kZWQ7XG4gICAgfTtcbn1cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuZGlyZWN0aXZlKCdhcHBEYXRhdGFibGUnLCBhcHBEYXRhdGFibGVDb25maWcpO1xuXG5mdW5jdGlvbiBhcHBEYXRhdGFibGVDb25maWcoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIGRhdGE6ICc9JyxcbiAgICAgICAgICAgIHRhYmxldGl0bGU6ICc9JyxcbiAgICAgICAgICAgIHRodGl0bGVzOiAnPScsXG4gICAgICAgICAgICB0ZGRhdGE6ICc9JyxcbiAgICAgICAgICAgIGdvdG86ICc9JyxcbiAgICAgICAgICAgIHR5cGU6ICc9JyxcbiAgICAgICAgICAgIHBhZ2luYXRpb246ICc9JyxcbiAgICAgICAgICAgIHVzZXJJZDogJz0nLFxuICAgICAgICAgICAgdHJhbnNsYXRlRGF0YTogJz0nXG4gICAgICAgIH0sXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS9qcy9kaXJlY3RpdmVzL2FwcERhdGF0YWJsZS9hcHBEYXRhdGFibGUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgJyRzdGF0ZScsICckdGltZW91dCcsICdkcml2ZXJzRGF0YVNlcnZpY2UnLCAnYmVhY29uc0RhdGFTZXJ2aWNlJywgYXBwRGF0YXRhYmxlQ29udHJvbGxlcl0sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGFwcERhdGF0YWJsZUNvbnRyb2xsZXIoJHNjb3BlLCAkc3RhdGUsICR0aW1lb3V0LCBkcml2ZXJzRGF0YVNlcnZpY2UsIGJlYWNvbnNEYXRhU2VydmljZSkge1xuXG4gICAgLy8gUHV0IHByb3BlcnRpZXMgb24gdGhlIGNvbnRyb2xsZXJcbiAgICB0aGlzLmRhdGEgPSAkc2NvcGUuZGF0YTtcbiAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmRhdGEuY29udGVudCB8fCB0aGlzLmRhdGE7XG4gICAgdGhpcy50aHRpdGxlcyA9ICRzY29wZS50aHRpdGxlcztcbiAgICB0aGlzLnRkZGF0YSA9ICRzY29wZS50ZGRhdGE7XG4gICAgdGhpcy50YWJsZXRpdGxlID0gJHNjb3BlLnRhYmxldGl0bGU7XG4gICAgdGhpcy50cmFuc2xhdGVEYXRhID0gJHNjb3BlLnRyYW5zbGF0ZURhdGE7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgJHNjb3BlLiR3YXRjaCgndGFibGV0aXRsZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnRhYmxldGl0bGUgPSAkc2NvcGUudGFibGV0aXRsZTtcbiAgICB9KTtcblxuICAgICRzY29wZS4kd2F0Y2goJ3RodGl0bGVzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQudGh0aXRsZXMgPSAkc2NvcGUudGh0aXRsZXM7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBAVE9ETyBtb3ZlIHRvIGhlbHBlclxuICAgICAqL1xuICAgIHRoaXMudG90YWxQYWdlcyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIEFycmF5XG4gICAgICAgICAgICAuYXBwbHkoMCwgQXJyYXkodGhpcy5kYXRhLnRvdGFsUGFnZXMpKVxuICAgICAgICAgICAgLm1hcChpbmRleCA9PiBpbmRleCk7XG4gICAgfTtcblxuICAgIHRoaXMuZ29UbyA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgIGlmICgkc2NvcGUuZ290bykge1xuICAgICAgICAgICAgJHN0YXRlLmdvKCRzY29wZS5nb3RvLnN0YXRlLCB7XG4gICAgICAgICAgICAgICAgWyRzY29wZS5nb3RvLmtleV06IHRoaXMuY29udGVudFtpbmRleF1bJHNjb3BlLmdvdG8ua2V5XVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5nb1RvUGFnZSA9IChwYWdlTnVtYmVyKSA9PiB7XG4gICAgICAgIHN3aXRjaCAoJHNjb3BlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2RyaXZlcnMnOlxuICAgICAgICAgICAgICAgICAgICBkcml2ZXJzRGF0YVNlcnZpY2UuZ2V0RHJpdmVycygkc2NvcGUudXNlcklkLCBwYWdlTnVtYmVyKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2JlYWNvbnMnOlxuICAgICAgICAgICAgICAgICAgICBiZWFjb25zRGF0YVNlcnZpY2UuZ2V0QmVhY29ucygkc2NvcGUudXNlcklkLCBwYWdlTnVtYmVyKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xufSJdfQ==
