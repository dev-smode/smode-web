(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module('MetronicApp', ['ui.router', 'ui.bootstrap', 'ngSanitize', 'angular-jwt', 'naif.base64', 'angularModalService', 'angular-ladda', 'angular-progress-button-styles', 'swangular', 'ui.bootstrap.datetimepicker', 'ngAnimate', 'pascalprecht.translate', 'vcRecaptcha']);

MetronicApp.constant('CONFIG', {
    'SERVER': 'http://52.35.199.200:8080',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIudG1wL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7QUNBQTs7OztBQUtBO0FBQ0EsSUFBTSxjQUFjLFFBQVEsTUFBUixDQUFlLGFBQWYsRUFBOEIsQ0FDOUMsV0FEOEMsRUFFOUMsY0FGOEMsRUFHOUMsWUFIOEMsRUFJOUMsYUFKOEMsRUFLOUMsYUFMOEMsRUFNOUMscUJBTjhDLEVBTzlDLGVBUDhDLEVBUTlDLGdDQVI4QyxFQVM5QyxXQVQ4QyxFQVU5Qyw2QkFWOEMsRUFXOUMsV0FYOEMsRUFZOUMsd0JBWjhDLEVBYTlDLGFBYjhDLENBQTlCLENBQXBCOztBQWdCQSxZQUFZLFFBQVosQ0FBcUIsUUFBckIsRUFBK0I7QUFDM0IsY0FBVSx5QkFEaUI7QUFFM0IsMEJBQXNCLENBQ2xCO0FBQ0ksY0FBTSxTQURWO0FBRUksZUFBTyxDQUZYO0FBR0ksY0FBTTtBQUhWLEtBRGtCLEVBTWxCO0FBQ0ksY0FBTSxTQURWO0FBRUksZUFBTyxDQUZYO0FBR0ksY0FBTTtBQUhWLEtBTmtCLEVBV2xCO0FBQ0ksY0FBTSxTQURWO0FBRUksZUFBTyxDQUZYO0FBR0ksY0FBTTtBQUhWLEtBWGtCLEVBZ0JsQjtBQUNJLGNBQU0sU0FEVjtBQUVJLGVBQU8sQ0FGWDtBQUdJLGNBQU07QUFIVixLQWhCa0IsQ0FGSztBQXVCM0IsaUJBQWEsQ0FDVDtBQUNJLGVBQU8sT0FEWDtBQUVJLGNBQU0sY0FGVjtBQUdJLG1CQUFXO0FBSGYsS0FEUyxFQU1UO0FBQ0ksZUFBTyxPQURYO0FBRUksY0FBTSxjQUZWO0FBR0ksbUJBQVc7QUFIZixLQU5TLEVBV1Q7QUFDSSxlQUFPLE9BRFg7QUFFSSxjQUFNLFFBRlY7QUFHSSxtQkFBVztBQUhmLEtBWFMsRUFnQlQ7QUFDSSxlQUFPLE9BRFg7QUFFSSxjQUFNLFFBRlY7QUFHSSxtQkFBVztBQUhmLEtBaEJTO0FBdkJjLENBQS9COztBQStDQSxZQUFZ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QkFDSyxPQUFPLElBQVAsQ0FBWSxHQURqQixFQUN1QixLQUFLLE9BQUwsQ0FBYSxLQUFiLEVBQW9CLE9BQU8sSUFBUCxDQUFZLEdBQWhDLENBRHZCO0FBR0g7QUFDSixLQU5EOztBQVFBLFNBQUssUUFBTCxHQUFnQixVQUFDLFVBQUQsRUFBZ0I7QUFDNUIsZ0JBQVEsT0FBTyxJQUFmO0FBQ0ksaUJBQUssU0FBTDtBQUNRLG1DQUFtQixVQUFuQixDQUE4QixPQUFPLE1BQXJDLEVBQTZDLFVBQTdDLEVBQXlELElBQXpELENBQThELFVBQUMsTUFBRCxFQUFZO0FBQ3RFLDRCQUFLLElBQUwsR0FBWSxNQUFaO0FBQ0gsaUJBRkQ7QUFHSjs7QUFFSixpQkFBSyxTQUFMO0FBQ1EsbUNBQW1CLFVBQW5CLENBQThCLE9BQU8sTUFBckMsRUFBNkMsVUFBN0MsRUFBeUQsSUFBekQsQ0FBOEQsVUFBQyxNQUFELEVBQVk7QUFDdEUsNEJBQUssSUFBTCxHQUFZLE1BQVo7QUFDSCxpQkFGRDtBQUdKO0FBWFI7QUFhSCxLQWREO0FBZUgiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqKlxyXG5NZXRyb25pYyBBbmd1bGFySlMgQXBwIE1haW4gU2NyaXB0XHJcbioqKi9cclxuXHJcblxyXG4vKiBNZXRyb25pYyBBcHAgKi9cclxuY29uc3QgTWV0cm9uaWNBcHAgPSBhbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnLCBbXHJcbiAgICAndWkucm91dGVyJyxcclxuICAgICd1aS5ib290c3RyYXAnLFxyXG4gICAgJ25nU2FuaXRpemUnLFxyXG4gICAgJ2FuZ3VsYXItand0JyxcclxuICAgICduYWlmLmJhc2U2NCcsXHJcbiAgICAnYW5ndWxhck1vZGFsU2VydmljZScsXHJcbiAgICAnYW5ndWxhci1sYWRkYScsXHJcbiAgICAnYW5ndWxhci1wcm9ncmVzcy1idXR0b24tc3R5bGVzJyxcclxuICAgICdzd2FuZ3VsYXInLFxyXG4gICAgJ3VpLmJvb3RzdHJhcC5kYXRldGltZXBpY2tlcicsXHJcbiAgICAnbmdBbmltYXRlJyxcclxuICAgICdwYXNjYWxwcmVjaHQudHJhbnNsYXRlJyxcclxuICAgICd2Y1JlY2FwdGNoYSdcclxuXSk7XHJcblxyXG5NZXRyb25pY0FwcC5jb25zdGFudCgnQ09ORklHJywge1xyXG4gICAgJ1NFUlZFUic6ICdodHRwczovL2FwaS5pcmVoYXBwLmNvbScsXHJcbiAgICAnRFJJVkVSX1BFUk1JU1NJT05TJzogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ0xFVkVMX0EnLFxyXG4gICAgICAgICAgICB2YWx1ZTogMCxcclxuICAgICAgICAgICAgbmFtZTogJ0RSSVZFUl9GT1JNLkRSSVZFUl9QRVJNSVNTSU9OUy5MRVZFTF9BJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiAnTEVWRUxfQicsXHJcbiAgICAgICAgICAgIHZhbHVlOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiAnRFJJVkVSX0ZPUk0uRFJJVkVSX1BFUk1JU1NJT05TLkxFVkVMX0InXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdMRVZFTF9DJyxcclxuICAgICAgICAgICAgdmFsdWU6IDIsXHJcbiAgICAgICAgICAgIG5hbWU6ICdEUklWRVJfRk9STS5EUklWRVJfUEVSTUlTU0lPTlMuTEVWRUxfQydcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ0xFVkVMX0QnLFxyXG4gICAgICAgICAgICB2YWx1ZTogMyxcclxuICAgICAgICAgICAgbmFtZTogJ0RSSVZFUl9GT1JNLkRSSVZFUl9QRVJNSVNTSU9OUy5MRVZFTF9EJ1xyXG4gICAgICAgIH1dLFxyXG4gICAgJ0xBTkdVQUdFUyc6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlOiAnRU5fVVMnLFxyXG4gICAgICAgICAgICBuYW1lOiAnRW5nbGlzaCAodXMpJyxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiAnbHRyJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTogJ0VOX1VLJyxcclxuICAgICAgICAgICAgbmFtZTogJ0VuZ2xpc2ggKHVrKScsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2x0cidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWU6ICdIRV9JTCcsXHJcbiAgICAgICAgICAgIG5hbWU6ICdIZWJyZXcnLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb246ICdydGwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlOiAnREVfREUnLFxyXG4gICAgICAgICAgICBuYW1lOiAnR2VybWFuJyxcclxuICAgICAgICAgICAgZGlyZWN0aW9uOiAnbHRyJ1xyXG4gICAgICAgIH1cclxuICAgIF1cclxufSk7XHJcblxyXG5NZXRyb25pY0FwcC5jb25zdGFudCgndWlEYXRldGltZVBpY2tlckNvbmZpZycsIHtcclxuICAgIGRhdGVGb3JtYXQ6ICdkZC1NTS15eXl5JyxcclxuICAgIGRlZmF1bHRUaW1lOiAnMDA6MDA6MDAnLFxyXG4gICAgaHRtbDVUeXBlczoge1xyXG4gICAgICAgIGRhdGU6ICdkZC1NTS15eXl5JyxcclxuICAgICAgICAnZGF0ZXRpbWUtbG9jYWwnOiAneXl5eS1NTS1kZFRISDptbTpzcy5zc3MnLFxyXG4gICAgICAgICdtb250aCc6ICdNTS15eXl5J1xyXG4gICAgfSxcclxuICAgIGluaXRpYWxQaWNrZXI6ICdkYXRlJyxcclxuICAgIHJlT3BlbkRlZmF1bHQ6IGZhbHNlLFxyXG4gICAgZW5hYmxlRGF0ZTogdHJ1ZSxcclxuICAgIGVuYWJsZVRpbWU6IGZhbHNlLFxyXG4gICAgYnV0dG9uQmFyOiB7XHJcbiAgICAgICAgc2hvdzogZmFsc2UsXHJcbiAgICAgICAgbm93OiB7XHJcbiAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgIHRleHQ6ICdOb3cnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b2RheToge1xyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICB0ZXh0OiAnVG9kYXknXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjbGVhcjoge1xyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICB0ZXh0OiAnQ2xlYXInXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRlOiB7XHJcbiAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgIHRleHQ6ICdEYXRlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGltZToge1xyXG4gICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICB0ZXh0OiAnVGltZSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsb3NlOiB7XHJcbiAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgIHRleHQ6ICdDbG9zZSdcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2xvc2VPbkRhdGVTZWxlY3Rpb246IHRydWUsXHJcbiAgICBjbG9zZU9uVGltZU5vdzogdHJ1ZSxcclxuICAgIGFwcGVuZFRvQm9keTogZmFsc2UsXHJcbiAgICBhbHRJbnB1dEZvcm1hdHM6IFtdLFxyXG4gICAgbmdNb2RlbE9wdGlvbnM6IHt9LFxyXG4gICAgc2F2ZUFzOiBmYWxzZSxcclxuICAgIHJlYWRBczogZmFsc2UsXHJcbn0pO1xyXG5cclxuTWV0cm9uaWNBcHAuY29uZmlnKFsnand0T3B0aW9uc1Byb3ZpZGVyJywgJyRodHRwUHJvdmlkZXInLCAoand0T3B0aW9uc1Byb3ZpZGVyLCAkaHR0cFByb3ZpZGVyKSA9PiB7XHJcbiAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLndpdGhDcmVkZW50aWFscyA9IHRydWU7XHJcblxyXG4gICAgand0T3B0aW9uc1Byb3ZpZGVyLmNvbmZpZyh7XHJcbiAgICAgICAgYXV0aFByZWZpeDogJycsXHJcbiAgICAgICAgd2hpdGVMaXN0ZWREb21haW5zOidsb2NhbGhvc3QnLFxyXG4gICAgICAgIHRva2VuR2V0dGVyOiAoKSA9PiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKSxcclxuICAgICAgICB1bmF1dGhlbnRpY2F0ZWRSZWRpcmVjdG9yOiBbJyRzdGF0ZScsICgkc3RhdGUpID0+IHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xyXG4gICAgICAgIH1dXHJcbiAgICB9KTtcclxuXHJcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdqd3RJbnRlcmNlcHRvcicpO1xyXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnYXV0aEludGVyY2VwdG9yJyk7XHJcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdlcnJvckhhbmRsZXJJbnRlcmNlcHRvcicpO1xyXG59XSk7XHJcblxyXG5NZXRyb25pY0FwcC5jb25maWcoWyckdHJhbnNsYXRlUHJvdmlkZXInLCBmdW5jdGlvbigkdHJhbnNsYXRlUHJvdmlkZXIpIHtcclxuICAgICR0cmFuc2xhdGVQcm92aWRlci51c2VTdGF0aWNGaWxlc0xvYWRlcih7XHJcbiAgICAgICAgcHJlZml4OiAnYXNzZXRzL2xhbmd1YWdlcy8nLFxyXG4gICAgICAgIHN1ZmZpeDogJy5qc29uJ1xyXG4gICAgfSk7XHJcbiAgICAvKlxyXG4gICAgIEVOX1VTKFwiZW4tVVNcIiksXHJcbiAgICAgRU5fVUsoXCJlbi1HQlwiKSxcclxuICAgICBIRV9JTChcImhlLUlMXCIpLFxyXG4gICAgIERFX0RFKFwiZGUtREVcIik7XHJcbiAgICAgKi9cclxuICAgIGNvbnN0IGxhbmdNYXAgPSB7XHJcbiAgICAgICAgJ0VOX1VTJzogJ2VuLVVTJyxcclxuICAgICAgICAnRU5fVUsnOiAnZW4tR0InLFxyXG4gICAgICAgICdISV9JTCc6ICdoZS1pbCcsXHJcbiAgICAgICAgJ0RFX0RFJzogJ2RlLWRlJ1xyXG4gICAgfTtcclxuICAgICR0cmFuc2xhdGVQcm92aWRlci51c2VTYW5pdGl6ZVZhbHVlU3RyYXRlZ3kobnVsbCk7XHJcbiAgICAvLyR0cmFuc2xhdGVQcm92aWRlci5yZWdpc3RlckF2YWlsYWJsZUxhbmd1YWdlS2V5cyhbJ2VuLVVTJywgJ2VuLUdCJywgJ2hlLWlsJywgJ2RlLWRlJ10sIGxhbmdNYXApO1xyXG4gICAgJHRyYW5zbGF0ZVByb3ZpZGVyLnByZWZlcnJlZExhbmd1YWdlKCdlbi1VUycpO1xyXG4gICAgJHRyYW5zbGF0ZVByb3ZpZGVyLmZhbGxiYWNrTGFuZ3VhZ2UoJ2VuLVVTJyk7XHJcbn1dKTtcclxuXHJcbk1ldHJvbmljQXBwLmZhY3RvcnkoJ3NldHRpbmdzJywgWyckcm9vdFNjb3BlJywgKCRyb290U2NvcGUpID0+IHtcclxuICAgIC8vIHN1cHBvcnRlZCBsYW5ndWFnZXNcclxuICAgIGNvbnN0IHNldHRpbmdzID0ge1xyXG4gICAgICAgIGxheW91dDoge1xyXG4gICAgICAgICAgICBwYWdlU2lkZWJhckNsb3NlZDogZmFsc2UsIC8vIHNpZGViYXIgbWVudSBzdGF0ZVxyXG4gICAgICAgICAgICBwYWdlQ29udGVudFdoaXRlOiB0cnVlLCAvLyBzZXQgcGFnZSBjb250ZW50IGxheW91dFxyXG4gICAgICAgICAgICBwYWdlQm9keVNvbGlkOiBmYWxzZSwgLy8gc29saWQgYm9keSBjb2xvciBzdGF0ZVxyXG4gICAgICAgICAgICBwYWdlQXV0b1Njcm9sbE9uTG9hZDogMTAwMCAvLyBhdXRvIHNjcm9sbCB0byB0b3Agb24gcGFnZSBsb2FkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3NldHNQYXRoOiAnLi4vYXNzZXRzJyxcclxuICAgICAgICBnbG9iYWxQYXRoOiAnLi4vYXNzZXRzL2dsb2JhbCcsXHJcbiAgICAgICAgbGF5b3V0UGF0aDogJy4uL2Fzc2V0cy9sYXlvdXRzL2xheW91dCcsXHJcbiAgICB9O1xyXG5cclxuICAgICRyb290U2NvcGUuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgIFxyXG4gICAgcmV0dXJuIHNldHRpbmdzO1xyXG59XSk7XHJcblxyXG4vKiBTZXR1cCBBcHAgTWFpbiBDb250cm9sbGVyICovXHJcbk1ldHJvbmljQXBwLmNvbnRyb2xsZXIoJ0FwcENvbnRyb2xsZXInLCBbJyRzY29wZScsICckcm9vdFNjb3BlJywgKCRzY29wZSkgPT4ge1xyXG4gICAgJHNjb3BlLiRvbignJHZpZXdDb250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgICAgIC8vQXBwLmluaXRDb21wb25lbnRzKCk7IC8vIGluaXQgY29yZSBjb21wb25lbnRzXHJcbiAgICAgICAgLy9MYXlvdXQuaW5pdCgpOyAvLyAgSW5pdCBlbnRpcmUgbGF5b3V0KGhlYWRlciwgZm9vdGVyLCBzaWRlYmFyLCBldGMpIG9uIHBhZ2UgbG9hZCBpZiB0aGUgcGFydGlhbHMgaW5jbHVkZWQgaW4gc2VydmVyIHNpZGUgaW5zdGVhZCBvZiBsb2FkaW5nIHdpdGggbmctaW5jbHVkZSBkaXJlY3RpdmUgXHJcbiAgICB9KTtcclxufV0pO1xyXG5cclxuLyogU2V0dXAgTGF5b3V0IFBhcnQgLSBIZWFkZXIgKi9cclxuTWV0cm9uaWNBcHAuY29udHJvbGxlcignSGVhZGVyQ29udHJvbGxlcicsIFsnJHNjb3BlJywgKCRzY29wZSkgPT4ge1xyXG4gICAgJHNjb3BlLiRvbignJGluY2x1ZGVDb250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgICAgIExheW91dC5pbml0SGVhZGVyKCk7IC8vIGluaXQgaGVhZGVyXHJcbiAgICB9KTtcclxufV0pO1xyXG5cclxuXHJcbk1ldHJvbmljQXBwLmNvbnRyb2xsZXIoJ1NpZGViYXJDb250cm9sbGVyJywgWyckc2NvcGUnLCAndXNlckRhdGFTZXJ2aWNlJywgKCRzY29wZSkgPT4ge1xyXG4gICAgJHNjb3BlLiRvbignJGluY2x1ZGVDb250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgICAgIExheW91dC5pbml0U2lkZWJhcigpOyAvLyBpbml0IHNpZGViYXJcclxuICAgIH0pO1xyXG59XSk7XHJcblxyXG5NZXRyb25pY0FwcC5jb250cm9sbGVyKCdCYWNrb2ZmaWNlQ29udHJvbGxlcicsIFsndXNlckRhdGFTZXJ2aWNlJywgJyRzY29wZScsICckc3RhdGUnLCAnQ09ORklHJywgJyR0cmFuc2xhdGUnLCAodXNlckRhdGFTZXJ2aWNlLCAkc2NvcGUsICRzdGF0ZSwgQ09ORklHLCAkdHJhbnNsYXRlKSA9PiB7XHJcbiAgICAkc3RhdGUuZ28odXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLm1haW5TdGF0ZVNjcmVlbik7XHJcbiAgICAkc2NvcGUuaXNDdXN0b21lciA9IHVzZXJEYXRhU2VydmljZS5pc0N1c3RvbWVyKCk7XHJcbiAgICAkc2NvcGUuaXNBZG1pbiA9IHVzZXJEYXRhU2VydmljZS5pc0FkbWluKCk7XHJcbiAgICAkc2NvcGUuY3VycmVudFVzZXIgPSB1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXI7XHJcblxyXG4gICAgX3NldERpcmVjdGlvbigpO1xyXG4gICAgY29uc3QgbGFuZ01hcCA9IHtcclxuICAgICAgICAnRU5fVVMnOiAnZW4tVVMnLFxyXG4gICAgICAgICdFTl9VSyc6ICdlbi1HQicsXHJcbiAgICAgICAgJ0hFX0lMJzogJ2hlLUlMJyxcclxuICAgICAgICAnREVfREUnOiAnZGUtREUnXHJcbiAgICB9O1xyXG4gICAgJHRyYW5zbGF0ZS51c2UobGFuZ01hcFskc2NvcGUuY3VycmVudFVzZXIubGFuZ3VhZ2VdKTtcclxuICAgICRzY29wZS5sYW5ndWFnZXMgPSBDT05GSUcuTEFOR1VBR0VTO1xyXG4gICAgJHNjb3BlLmNob29zZUxhbmd1YWdlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICghbGFuZ01hcFskc2NvcGUuY3VycmVudFVzZXIubGFuZ3VhZ2VdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgJHRyYW5zbGF0ZS51c2UobGFuZ01hcFskc2NvcGUuY3VycmVudFVzZXIubGFuZ3VhZ2VdKS50aGVuKCgpPT4ge1xyXG4gICAgICAgICAgICBfc2V0RGlyZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIHVzZXJEYXRhU2VydmljZS51cGRhdGVVc2VyTGFuZ3VhZ2UoJHNjb3BlLmN1cnJlbnRVc2VyLmxhbmd1YWdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gX3NldERpcmVjdGlvbigpIHtcclxuICAgICAgICAkc2NvcGUuc2V0dGluZ3MuZGlyZWN0aW9uID0gQ09ORklHLkxBTkdVQUdFUy5maWx0ZXIoKGxhbmcpID0+IGxhbmcudmFsdWUgPT0gdXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmxhbmd1YWdlKTtcclxuICAgICAgICBpZiAoJHNjb3BlLnNldHRpbmdzLmRpcmVjdGlvbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZXR0aW5ncy5kaXJlY3Rpb24gPSAkc2NvcGUuc2V0dGluZ3MuZGlyZWN0aW9uWzBdLmRpcmVjdGlvbjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2V0dGluZ3MuZGlyZWN0aW9uID0gJ3J0bCc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufV0pO1xyXG5cclxuLyogU2V0dXAgUm91bnRpbmcgRm9yIEFsbCBQYWdlcyAqL1xyXG5NZXRyb25pY0FwcC5jb25maWcoWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLCAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikgPT4ge1xyXG4gICAgLy8gUmVkaXJlY3QgYW55IHVubWF0Y2hlZCB1cmxcclxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9iYWNrb2ZmaWNlJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gaXNTdGF0ZVBhcmFtcygkc3RhdGVQYXJhbXMsICRxKSB7XHJcbiAgICAgICAgaWYgKCRzdGF0ZVBhcmFtcy5pZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIC5zdGF0ZSgnbG9naW4nLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9sb2dpbicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdsb2dvdXQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9sb2dvdXQnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBbJyRzdGF0ZScsICckcScsICd1c2VyRGF0YVNlcnZpY2UnLCAoJHN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndG9rZW4nKTtcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcclxuICAgICAgICAgICAgfV1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYmFja29mZmljZScsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2JhY2tvZmZpY2UnLFxyXG4gICAgICAgICAgICAvLyBhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvYmFja29mZmljZS92aWV3cy9iYWNrb2ZmaWNlLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQmFja29mZmljZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVzTG9naW46IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTicsXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIHNldFVzZXJEYXRhOiB1c2VyRGF0YVNlcnZpY2UgPT4gdXNlckRhdGFTZXJ2aWNlLnNldFVzZXJEYXRhKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gRGFzaGJvYXJkXHJcbiAgICAgICAgLnN0YXRlKCdkYXNoYm9hcmQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9kYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICAgICAgcGFyZW50OiAnYmFja29mZmljZScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9kYXNoYm9hcmQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEYXNoYm9hcmRDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBnZXRTdGF0czogZGFzaGJvYXJkU2VydmljZSA9PiBkYXNoYm9hcmRTZXJ2aWNlLmdldFN0YXRzKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTicsXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnY3VzdG9tZXJMaXN0Jywge1xyXG4gICAgICAgICAgICB1cmw6ICcvY3VzdG9tZXJMaXN0JyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2N1c3RvbWVyTGlzdC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0N1c3RvbWVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgZ2V0Q3VzdG9tZXJzOiBjdXN0b21lcnNEYXRhU2VydmljZSA9PiBjdXN0b21lcnNEYXRhU2VydmljZS5nZXRDdXN0b21lcnMoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2FkZE5ld0N1c3RvbWVyJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvYWRkTmV3Q3VzdG9tZXInLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvYWRkTmV3Q3VzdG9tZXIuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDdXN0b21lckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnZWRpdEN1c3RvbWVyJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvZWRpdEN1c3RvbWVyLzppZCcsXHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9hZGROZXdDdXN0b21lci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0N1c3RvbWVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogbnVsbFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBpc1N0YXRlUGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgZ2V0Q3VzdG9tZXJzOiAoY3VzdG9tZXJzRGF0YVNlcnZpY2UsICRzdGF0ZVBhcmFtcykgPT4gY3VzdG9tZXJzRGF0YVNlcnZpY2UuZ2V0Q3VzdG9tZXJCeUlEKCRzdGF0ZVBhcmFtcy5pZCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnYWRkTmV3RHJpdmVyJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvYWRkTmV3RHJpdmVyJyxcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL2FkZE5ld0RyaXZlci5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0RyaXZlcnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0FETUlOJyxcclxuICAgICAgICAgICAgICAgICdDVVNUT01FUidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdlZGl0RHJpdmVyJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvZWRpdERyaXZlci86aWQnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvYWRkTmV3RHJpdmVyLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRHJpdmVyc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHBhcmFtOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogbnVsbFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBpc1N0YXRlUGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgZ2V0RHJpdmVyQnlJRDogKGRyaXZlcnNEYXRhU2VydmljZSwgJHN0YXRlUGFyYW1zLCB1c2VyRGF0YVNlcnZpY2UsIHNldFVzZXJEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRyaXZlcnNEYXRhU2VydmljZS5nZXREcml2ZXJCeUlEKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCwgJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTicsXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnZHJpdmVyc0xpc3QnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9kcml2ZXJzTGlzdC86aWQnLFxyXG4gICAgICAgICAgICBwYXJlbnQ6ICdkYXNoYm9hcmQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvZHJpdmVyc0xpc3QuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEcml2ZXJzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogbnVsbFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBnZXREcml2ZXJzOiAoZHJpdmVyc0RhdGFTZXJ2aWNlLCAkc3RhdGVQYXJhbXMsIHVzZXJEYXRhU2VydmljZSwgY3VzdG9tZXJzRGF0YVNlcnZpY2UsIHNldFVzZXJEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRzdGF0ZVBhcmFtcy5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJzRGF0YVNlcnZpY2UuZ2V0Q3VzdG9tZXJCeUlEKCRzdGF0ZVBhcmFtcy5pZCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcml2ZXJzRGF0YVNlcnZpY2UuZ2V0RHJpdmVycygkc3RhdGVQYXJhbXMuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkcml2ZXJzRGF0YVNlcnZpY2UuZ2V0RHJpdmVycyh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nLFxyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2FkZERyaXZlcnNQaG9uZU51bWJlcnMnLCB7XHJcbiAgICAgICAgICAgIHBhcmVudDogJ2Rhc2hib2FyZCcsXHJcbiAgICAgICAgICAgIHVybDogJy9waG9uZU51bWJlcnMnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvcGhvbmVOdW1iZXJzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQ3VzdG9tZXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJyxcclxuICAgICAgICAgICAgICAgICdBRE1JTidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdwcmVmZXJlbmNlcycsIHtcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdXJsOiAnL3ByZWZlcmVuY2VzJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL3ZpZXdzL3ByZWZlcmVuY2VzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQ3VzdG9tZXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJyxcclxuICAgICAgICAgICAgICAgICdBRE1JTidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdhY3Rpdml0eUxvZycsIHtcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdXJsOiAnL2FjdGl2aXR5TG9nLzppZC86bW9udGgvOnllYXInLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvYWN0aXZpdHlMb2cuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEcml2ZXJzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICBpZDogbnVsbCxcclxuICAgICAgICAgICAgICAgIG1vbnRoOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgeWVhcjogbnVsbFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICBnZXRMb2c6IChkcml2ZXJzRGF0YVNlcnZpY2UsICRzdGF0ZVBhcmFtcywgdXNlckRhdGFTZXJ2aWNlLCBzZXRVc2VyRGF0YSkgPT5cclxuICAgICAgICAgICAgICAgICAgICBkcml2ZXJzRGF0YVNlcnZpY2UuZ2V0TG9nKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCwgJHN0YXRlUGFyYW1zLmlkLCAkc3RhdGVQYXJhbXMubW9udGgsICRzdGF0ZVBhcmFtcy55ZWFyKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByb2xlczogW1xyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJyxcclxuICAgICAgICAgICAgICAgICdBRE1JTidcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdiZWFjb25zTGlzdCcsIHtcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdXJsOiAnL2JlYWNvbnNMaXN0LzppZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmFja29mZmljZS92aWV3cy9iZWFjb25zTGlzdC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0JlYWNvbnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIGlkOiBudWxsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIGdldEJlYWNvbnM6IChiZWFjb25zRGF0YVNlcnZpY2UsIHVzZXJEYXRhU2VydmljZSwgJHN0YXRlUGFyYW1zLCBzZXRVc2VyRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkc3RhdGVQYXJhbXMuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJlYWNvbnNEYXRhU2VydmljZS5nZXRCZWFjb25zKCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmV0dXJuIHVzZXJEYXRhU2VydmljZS5zZXRVc2VyRGF0YSgpLnRoZW4oKCkgPT4gYmVhY29uc0RhdGFTZXJ2aWNlLmdldEJlYWNvbnModXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBiZWFjb25zRGF0YVNlcnZpY2UuZ2V0QmVhY29ucyh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJvbGVzOiBbXHJcbiAgICAgICAgICAgICAgICAnQURNSU4nLFxyXG4gICAgICAgICAgICAgICAgJ0NVU1RPTUVSJ1xyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ2F0dGFjaEJlYWNvbicsIHtcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F0dGFjaEJlYWNvbi86aWQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvYXR0YWNoQmVhY29uLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQmVhY29uc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIGdldEJlYWNvbnM6IChiZWFjb25zRGF0YVNlcnZpY2UsIHVzZXJEYXRhU2VydmljZSwgc2V0VXNlckRhdGEpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlckRhdGFTZXJ2aWNlLnNldFVzZXJEYXRhKCkudGhlbigoKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIGJlYWNvbnNEYXRhU2VydmljZS5nZXRCZWFjb25zKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTicsXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnZWRpdEJlYWNvbicsIHtcclxuICAgICAgICAgICAgcGFyZW50OiAnZGFzaGJvYXJkJyxcclxuICAgICAgICAgICAgdXJsOiAnL2F0dGFjaEJlYWNvbi86aWQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2Uvdmlld3MvYXR0YWNoQmVhY29uLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQmVhY29uc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgaWQ6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm9sZXM6IFtcclxuICAgICAgICAgICAgICAgICdBRE1JTicsXHJcbiAgICAgICAgICAgICAgICAnQ1VTVE9NRVInXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxufV0pO1xyXG5cclxuLyogSW5pdCBnbG9iYWwgc2V0dGluZ3MgYW5kIHJ1biB0aGUgYXBwICovXHJcbk1ldHJvbmljQXBwLnJ1bihbJyRyb290U2NvcGUnLCAnc2V0dGluZ3MnLCAnJHN0YXRlJywgJ2F1dGhNYW5hZ2VyJywgJ3VzZXJEYXRhU2VydmljZScsICdhdXRoU2VydmljZScsICgkcm9vdFNjb3BlLCBzZXR0aW5ncywgJHN0YXRlLCBhdXRoTWFuYWdlciwgdXNlckRhdGFTZXJ2aWNlKSA9PiB7XHJcbiAgICAkcm9vdFNjb3BlLiRzdGF0ZSA9ICRzdGF0ZTsgLy8gc3RhdGUgdG8gYmUgYWNjZXNzZWQgZnJvbSB2aWV3XHJcbiAgICAkcm9vdFNjb3BlLiRzZXR0aW5ncyA9IHNldHRpbmdzOyAvLyBzdGF0ZSB0byBiZSBhY2Nlc3NlZCBmcm9tIHZpZXdcclxuXHJcbiAgICAvLyBjaGVjayBqd3Qgb24gcmVmcmVzaFxyXG4gICAgYXV0aE1hbmFnZXIuY2hlY2tBdXRoT25SZWZyZXNoKCk7XHJcbiAgICBhdXRoTWFuYWdlci5yZWRpcmVjdFdoZW5VbmF1dGhlbnRpY2F0ZWQoKTtcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbigndG9rZW5IYXNFeHBpcmVkJywgKCkgPT4gJHN0YXRlLmdvKCdsb2dvdXQnKSk7XHJcbn1dKTtcclxuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5jb250cm9sbGVyKCdCZWFjb25zQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRzdGF0ZVBhcmFtcycsICdiZWFjb25zRGF0YVNlcnZpY2UnLCAndXNlckRhdGFTZXJ2aWNlJywgJyRzdGF0ZScsXG4gICAgICAgIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBiZWFjb25zRGF0YVNlcnZpY2UsIHVzZXJEYXRhU2VydmljZSwgJHN0YXRlKSB7XG5cbiAgICAgICAgICAgIHRoaXMuYmVhY29ucyA9IGJlYWNvbnNEYXRhU2VydmljZS5iZWFjb25zO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IDA7XG5cbiAgICAgICAgICAgIGlmICgkc3RhdGVQYXJhbXMuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlkID0gJHN0YXRlUGFyYW1zLmlkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmF0dGFjaEJlYWNvbiA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBiZWFjb25zRGF0YVNlcnZpY2UuYXR0YWNoQmVhY29uKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCwgdGhpcy5iZWFjb24pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+ICRzdGF0ZS5nbygnYmVhY29uc0xpc3QnKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVN1c3BlbmRCZWFjb24gPSAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBiZWFjb24gPSB0aGlzLmJlYWNvbnMuY29udGVudFtpbmRleF07XG4gICAgICAgICAgICAgICAgYmVhY29uLmFjdGl2ZSA9ICFiZWFjb24uYWN0aXZlO1xuICAgICAgICAgICAgICAgIGJlYWNvbnNEYXRhU2VydmljZS50b2dnbGVCZWFjb24odXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkLCBiZWFjb24pO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICAvL0J1aWxkIGFycmF5IHdpdGggYHRvdGFsUGFnZXNgIGVsZW1lbnRzIGFuZCByZXR1cm4gaGlzIGluZGV4ZXNcbiAgICAgICAgICAgIC8vVXNlZCBmb3IgZGlzcGxheWluZyB0aGUgcGFnaW5hdG9yXG4gICAgICAgICAgICB0aGlzLnRvdGFsUGFnZXMgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5XG4gICAgICAgICAgICAgICAgICAgIC5hcHBseSgwLCBBcnJheSh0aGlzLmJlYWNvbnMudG90YWxQYWdlcykpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoaW5kZXggPT4gaW5kZXgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5nb1RvUGFnZSA9IChwYWdlTnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWQgPSAkc3RhdGVQYXJhbXMuaWQgfHwgdXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkO1xuICAgICAgICAgICAgICAgIGJlYWNvbnNEYXRhU2VydmljZS5nZXRCZWFjb25zKGlkLCBwYWdlTnVtYmVyKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlYWNvbnMgPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFnZU51bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLm9wZW5DYWxlbmRhciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcblxuLyogXG4gICAgQFN1bW1hcnk6IEN1c3RvbWVyIGNvbnRyb2xsZXIgXG4gICAgQERlc2NyaXB0aW9uOiBpbiBjaGFyZ2Ugb2YgYWxsIGxvZ2ljIGFjdGlvbnMgcmVsYXRlZCB0byB0aGUgQ3VzdG9tZXJzLlxuKi9cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0N1c3RvbWVyQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJ2N1c3RvbWVyc0RhdGFTZXJ2aWNlJywgJyRzdGF0ZVBhcmFtcycsICd1c2VyRGF0YVNlcnZpY2UnLCAnJHN0YXRlJyxcbiAgICAgICAgZnVuY3Rpb24oJHNjb3BlLCBjdXN0b21lcnNEYXRhU2VydmljZSwgJHN0YXRlUGFyYW1zLCB1c2VyRGF0YVNlcnZpY2UsICRzdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0TW9kZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jdXN0b21lcnMgPSBjdXN0b21lcnNEYXRhU2VydmljZS5jdXN0b21lcnM7XG4gICAgICAgICAgICB0aGlzLmVtYWlsUGF0dGVybiA9IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xuXG4gICAgICAgICAgICBpZiAoJHN0YXRlUGFyYW1zLmlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0TW9kZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UGFzc3dvcmRGaWVsZHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyID0gY3VzdG9tZXJzRGF0YVNlcnZpY2UuZWRpdGluZ0N1c3RvbWVyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBuZXcgY2xpZW50IG1vZGVcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQYXNzd29yZEZpZWxkcyA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0UGVybWlzc2lvbk1vZGVsID0gKHBlcm1pc3Npb25zKSA9PntcbiAgICAgICAgICAgICAgICBpZiAoIXBlcm1pc3Npb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxvd2VkUGVybWlzc2lvbnMgPSBwZXJtaXNzaW9ucztcbiAgICAgICAgICAgICAgICB0aGlzLmFsbG93ZWRQZXJtaXNzaW9uID0ge307XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxvd2VkUGVybWlzc2lvbnMuZm9yRWFjaCgocGVybWlzc2lvbikgPT57IFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbG93ZWRQZXJtaXNzaW9uW3Blcm1pc3Npb24ucGVybWlzc2lvbl0gPSBwZXJtaXNzaW9uLmFsbG93ZWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNldFBlcm1pc3Npb25Nb2RlbCh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIucGVybWlzc2lvbnMpO1xuXG4gICAgICAgICAgICB0aGlzLnNhdmVQZXJtaXNzaW9ucyA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGVybWlzc2lvbnMgPSBbXTtcbiAgICAgICAgICAgICAgICBfLmZvckVhY2godGhpcy5hbGxvd2VkUGVybWlzc2lvbiwgKGFsbG93ZWQsIHBlcm1pc3Npb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlcm1pc3Npb25PYmogPSBfLmZpbmQodGhpcy5hbGxvd2VkUGVybWlzc2lvbnMsIHtwZXJtaXNzaW9uOiBwZXJtaXNzaW9ufSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwZXJtaXNzaW9uT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uT2JqLmFsbG93ZWQgPSBhbGxvd2VkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbnMucHVzaChwZXJtaXNzaW9uT2JqKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcm1pc3Npb25zLnB1c2goe3Blcm1pc3Npb246IHBlcm1pc3Npb24sIGFsbG93ZWQ6IGFsbG93ZWR9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGN1c3RvbWVyc0RhdGFTZXJ2aWNlLnNldFBlcm1pc3Npb25zKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCwgcGVybWlzc2lvbnMpLnRoZW4oKHBlcm1pc3Npb25zKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGVybWlzc2lvbk1vZGVsKHBlcm1pc3Npb25zKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuYWRkTmV3Q3VzdG9tZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0TW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBjdXN0b21lcnNEYXRhU2VydmljZS5lZGl0Q3VzdG9tZXIodGhpcy5jdXN0b21lcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+ICRzdGF0ZS5nbygnY3VzdG9tZXJMaXN0JykpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluYWxseSgoKSA9PiB0aGlzLmxvYWRpbmcgPSBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tZXJzRGF0YVNlcnZpY2UuYWRkTmV3Q3VzdG9tZXIodGhpcy5jdXN0b21lcilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+ICRzdGF0ZS5nbygnY3VzdG9tZXJMaXN0JykpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZmluYWxseSgoKSA9PiB0aGlzLmxvYWRpbmcgPSBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5kcml2ZXJzUGhvbmVOdW1iZXJzID0gdXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLnF1aWNrQ2FsbE51bWJlcnM7XG5cbiAgICAgICAgICAgIHRoaXMuc2F2ZU51bWJlcnMgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gZml0bGVyIG91dCBlbXB0eSBvYmplY3RzIGluIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRyaXZlcnNQaG9uZU51bWJlcnNcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcih4ID0+IHgubmFtZS5sZW5ndGggPiAwICYmIHgubnVtYmVyLmxlbmd0aCA+IDApO1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXN0b21lcnNEYXRhU2VydmljZS5zYXZlUXVpY2tDYWxsTnVtYmVycyh1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsIHsgbnVtYmVyczogZGF0YSB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTnVtYmVyID0gKGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5waG9uZU51bWJlcnNFcnJvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJpdmVyc1Bob25lTnVtYmVycyA9IHRoaXMuZHJpdmVyc1Bob25lTnVtYmVyc1xuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHggPT4gdGhpcy5kcml2ZXJzUGhvbmVOdW1iZXJzW2luZGV4XSAhPT0geCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmFkZE5ld051bWJlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kcml2ZXJzUGhvbmVOdW1iZXJzLmxlbmd0aCA8IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJpdmVyc1Bob25lTnVtYmVycy5wdXNoKHsgbmFtZTogJycsIG51bWJlcjogJycgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waG9uZU51bWJlcnNFcnJvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy50b2dnbGVTdXNwZW5kQ3VzdG9tZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lci5hY3RpdmUgPSAhdGhpcy5jdXN0b21lci5hY3RpdmU7XG4gICAgICAgICAgICAgICAgY3VzdG9tZXJzRGF0YVNlcnZpY2Uuc3VzcGVuZEN1c3RvbWVyKHRoaXMuY3VzdG9tZXIpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy50b2dnbGVQYXNzd29yZEZpZWxkcyA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dQYXNzd29yZEZpZWxkcyA9ICF0aGlzLnNob3dQYXNzd29yZEZpZWxkcztcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcblxuLyogXHJcbiAgICBAU3VtbWFyeTogRGFzaGJvYXJkIGNvbnRyb2xsZXIgXHJcbiAgICBARGVzY3JpcHRpb246IGluIGNoYXJnZSBvZiBhbGwgbG9naWMgYWN0aW9ucyByZWxhdGVkIHRvIHRoZSBEYXNoYm9hcmQgYW5kIGV2ZXJ5IGNoaWxkIHN0YXRlIG9mIHRoZSBkYXNoYm9hcmQuXHJcbiovXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0Rhc2hib2FyZENvbnRyb2xsZXInLCBbJyRzY29wZScsICdkYXNoYm9hcmRTZXJ2aWNlJyxcclxuICAgICAgICBmdW5jdGlvbigkc2NvcGUsIGRhc2hib2FyZFNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0cyA9IGRhc2hib2FyZFNlcnZpY2Uuc3RhdHM7XHJcbiAgICAgICAgfVxyXG4gICAgXSk7XG4vKiBcbiAgICBAU3VtbWFyeTogRHJpdmVycyBjb250cm9sbGVyIFxuICAgIEBEZXNjcmlwdGlvbjogaW4gY2hhcmdlIG9mIGFsbCBsb2dpYyBhY3Rpb25zIHJlbGF0ZWQgdG8gRHJpdmVycywgXG4gICAgc3VjaCBhcyBhZGRpbmcgbmV3IGRyaXZlcnMgYW5kIGRpc3BsYXkgZHJpdmVycyBsaXN0LlxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuY29udHJvbGxlcignRHJpdmVyc0NvbnRyb2xsZXInLCBbJyRzY29wZScsICckc3RhdGVQYXJhbXMnLCAnZHJpdmVyc0RhdGFTZXJ2aWNlJywgJyRzdGF0ZScsICd1c2VyRGF0YVNlcnZpY2UnLCAnY3VzdG9tZXJzRGF0YVNlcnZpY2UnLCAnQ09ORklHJyxcbiAgICAgICAgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIGRyaXZlcnNEYXRhU2VydmljZSwgJHN0YXRlLCB1c2VyRGF0YVNlcnZpY2UsIGN1c3RvbWVyc0RhdGFTZXJ2aWNlLCBDT05GSUcpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdE1vZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZHJpdmVycyA9IGRyaXZlcnNEYXRhU2VydmljZS5kcml2ZXJzO1xuICAgICAgICAgICAgdGhpcy5wZXJtaXNzaW9ucyA9IENPTkZJRy5EUklWRVJfUEVSTUlTU0lPTlM7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFF1ZXJ5ID0gJyc7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMDtcblxuICAgICAgICAgICAgLyoqIFxuICAgICAgICAgICAgICogd2UgY2FuIGhhdmUgYSAkc3RhdGVQYXJhbXMuaWQgaW4gMiBjYXNlczpcbiAgICAgICAgICAgICAqIGVkaXRpbmcgYSBkcml2ZXIgb3IgZ2V0dGluZyBsaXN0IG9mIGRyaXZlcnMgcGVyIHNwZWNpZmljIGN1c3RvbWVyIChhcyBzdXBlcmFkbWluKSAgXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICgkc3RhdGVQYXJhbXMuaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyID0gY3VzdG9tZXJzRGF0YVNlcnZpY2UuZWRpdGluZ0N1c3RvbWVyOyAvLyB3ZSdyZSBkaXNwbGF5aW5nIHRoZSBsaXN0IG9mIGRyaXZlcnMgZm9yIGEgc3BlY2lmaWMgY3VzdG9tZXIuXG4gICAgICAgICAgICAgICAgdGhpcy5pZCA9ICRzdGF0ZVBhcmFtcy5pZDtcbiAgICAgICAgICAgICAgICBpZiAoJHN0YXRlLmN1cnJlbnQubmFtZSA9PT0gJ2VkaXREcml2ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdE1vZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyaXZlciA9IGRyaXZlcnNEYXRhU2VydmljZS5lZGl0aW5nRHJpdmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIG5ldyBkcml2ZXIgbW9kZVxuICAgICAgICAgICAgICAgIHRoaXMubW9kZSA9ICfXlNeV16HXoyDXoNeU15Ig15fXk9epJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hZGROZXdEcml2ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0TW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBkcml2ZXJzRGF0YVNlcnZpY2UuZWRpdERyaXZlcih1c2VyRGF0YVNlcnZpY2UuY3VycmVudFVzZXIuaWQsIHRoaXMuZHJpdmVyKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdkcml2ZXJzTGlzdCcpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkcml2ZXJzRGF0YVNlcnZpY2UuYWRkTmV3RHJpdmVyKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCwgdGhpcy5kcml2ZXIpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2RyaXZlcnNMaXN0Jyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZ29Ub0VkaXRDdXN0b21lciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2VkaXRDdXN0b21lcicsIHsgaWQ6IHRoaXMuY3VzdG9tZXIuaWQgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnZpZXdMb2cgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdhY3Rpdml0eUxvZycsIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuZHJpdmVyLmlkLFxuICAgICAgICAgICAgICAgICAgICBtb250aDogbmV3IERhdGUoKS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMudG9nZ2xlU3VzcGVuZERyaXZlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRyaXZlci5hY3RpdmUgPSAhdGhpcy5kcml2ZXIuYWN0aXZlO1xuICAgICAgICAgICAgICAgIGRyaXZlcnNEYXRhU2VydmljZS5zdXNwZW5kRHJpdmVyKHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZCwgdGhpcy5kcml2ZXIpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5nb1RvID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoISRzY29wZS5pc0FkbWluKSB7XG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZWRpdERyaXZlcicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLmRyaXZlcnMuY29udGVudFtpbmRleF0uaWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAVE9ETyAtIG1vdmUgdG8gaGVscGVyXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMudG90YWxQYWdlcyA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXlcbiAgICAgICAgICAgICAgICAgICAgLmFwcGx5KDAsIEFycmF5KHRoaXMuZHJpdmVycy50b3RhbFBhZ2VzKSlcbiAgICAgICAgICAgICAgICAgICAgLm1hcChpbmRleCA9PiBpbmRleCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmdvVG9QYWdlID0gKHBhZ2VOdW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBkZWZpbmUgd2hpY2ggaWQgdG8gdXNlIGZvciBBUElcbiAgICAgICAgICAgICAgICAgKiBpZiB3ZSdyZSBsb29raW5nIGF0IGEgbGlzdCBvZiBkcml2ZXJzIGFzIGEgY3VzdG9tZXIgLSB3ZSBuZWVkIG91ciBvd24gaWRcbiAgICAgICAgICAgICAgICAgKiBpZiB3ZSdyZSBsb29raW5nIGF0IGEgbGlzdCBvZiBkcml2ZXJzIGFzIGEgc3VwZXIgYWRtaW4gZm9yIHNwZWNpZmljIGN1c3RvbWVyIC0gd2UgbmVlZCB0aGUgY3VzdG9tZXIncyBpZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gJHN0YXRlUGFyYW1zLmlkIHx8IHVzZXJEYXRhU2VydmljZS5jdXJyZW50VXNlci5pZDtcbiAgICAgICAgICAgICAgICBkcml2ZXJzRGF0YVNlcnZpY2UuZ2V0RHJpdmVycyhpZCwgcGFnZU51bWJlcilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcml2ZXJzID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2VOdW1iZXI7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zZWFyY2ggPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWQgPSAkc3RhdGVQYXJhbXMuaWQgfHwgdXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLmlkO1xuICAgICAgICAgICAgICAgIGRyaXZlcnNEYXRhU2VydmljZS5zZWFyY2goaWQsIHRoaXMuc2VhcmNoUXVlcnkpLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcml2ZXJzID0gcmVzdWx0cztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcblxuLyogXG4gICAgQFN1bW1hcnk6IExvZ2luIGNvbnRyb2xsZXIgXG4gICAgQERlc2NyaXB0aW9uOiBpbiBjaGFyZ2Ugb2YgYWxsIGxvZ2ljIGFjdGlvbnMgcmVsYXRlZCB0byBMb2dpblxuKi9cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0xvZ2luQ29udHJvbGxlcicsIFsnJHN0YXRlJywgJ2F1dGhTZXJ2aWNlJywgJ3VzZXJEYXRhU2VydmljZScsXG4gICAgICAgIGZ1bmN0aW9uKCRzdGF0ZSwgYXV0aFNlcnZpY2UsIHVzZXJEYXRhU2VydmljZSkge1xuXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdCA9IChpc1ZhbGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHRoaXMuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWNhcHRjaGFSZXNwb25zZTogdGhpcy5yZWNhcHRjaGFSZXNwb25zZVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGF1dGhTZXJ2aWNlLmxvZ2luKHVzZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB1c2VyRGF0YVNlcnZpY2Uuc2V0VXNlckRhdGEoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28odXNlckRhdGFTZXJ2aWNlLmN1cnJlbnRVc2VyLm1haW5TdGF0ZVNjcmVlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5dKTtcblxuLyogXG4gICAgQFN1bW1hcnk6IE1vZGFsIGNvbnRyb2xsZXIgXG4gICAgQERlc2NyaXB0aW9uOiBpbiBjaGFyZ2Ugb2YgYWxsIGxvZ2ljIGFjdGlvbnMgcmVsYXRlZCB0byBNb2RhbFxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuY29udHJvbGxlcignTW9kYWxDb250cm9sbGVyJywgWydjbG9zZScsXG4gICAgICAgIGZ1bmN0aW9uKGNsb3NlKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlID0gKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNsb3NlLCBidXQgZ2l2ZSA1MDBtcyBmb3IgYm9vdHN0cmFwIHRvIGFuaW1hdGVcbiAgICAgICAgICAgICAgICBjbG9zZShyZXN1bHQsIDUwMCk7IFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXSk7XG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5kaXJlY3RpdmUoJ2NvbmZpcm1QYXNzd29yZCcsIGNvbmZpcm1QYXNzd29yZENvbmZpZyk7XG5cbmZ1bmN0aW9uIGNvbmZpcm1QYXNzd29yZENvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICBvdGhlck1vZGVsVmFsdWU6ICc9Y29tcGFyZVRvJ1xuICAgICAgICB9LFxuICAgICAgICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJpYnV0ZXMsIG5nTW9kZWwpID0+IHtcbiAgICAgICAgICAgIG5nTW9kZWwuJHZhbGlkYXRvcnMuY29tcGFyZVRvID0gKG1vZGVsVmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kZWxWYWx1ZSA9PT0gc2NvcGUub3RoZXJNb2RlbFZhbHVlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCdvdGhlck1vZGVsVmFsdWUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbmdNb2RlbC4kdmFsaWRhdGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cbi8qKipcclxuR0xvYmFsIERpcmVjdGl2ZXNcclxuKioqL1xyXG5cclxuLy8gUm91dGUgU3RhdGUgTG9hZCBTcGlubmVyKHVzZWQgb24gcGFnZSBvciBjb250ZW50IGxvYWQpXHJcbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXHJcbiAgICAuZGlyZWN0aXZlKCduZ1NwaW5uZXJCYXInLCBbJyRyb290U2NvcGUnLCAnJHN0YXRlJyxcclxuICAgICAgICBmdW5jdGlvbigkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGJ5IGRlZnVsdCBoaWRlIHRoZSBzcGlubmVyIGJhclxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2hpZGUnKTsgLy8gaGlkZSBzcGlubmVyIGJhciBieSBkZWZhdWx0XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRpc3BsYXkgdGhlIHNwaW5uZXIgYmFyIHdoZW5ldmVyIHRoZSByb3V0ZSBjaGFuZ2VzKHRoZSBjb250ZW50IHBhcnQgc3RhcnRlZCBsb2FkaW5nKVxyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdoaWRlJyk7IC8vIHNob3cgc3Bpbm5lciBiYXJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaGlkZSB0aGUgc3Bpbm5lciBiYXIgb24gcm91bnRlIGNoYW5nZSBzdWNjZXNzKGFmdGVyIHRoZSBjb250ZW50IGxvYWRlZClcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2hpZGUnKTsgLy8gaGlkZSBzcGlubmVyIGJhclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ3BhZ2Utb24tbG9hZCcpOyAvLyByZW1vdmUgcGFnZSBsb2FkaW5nIGluZGljYXRvclxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMYXlvdXQuc2V0QW5ndWxhckpzU2lkZWJhck1lbnVBY3RpdmVMaW5rKCdtYXRjaCcsIG51bGwsIGV2ZW50LmN1cnJlbnRTY29wZS4kc3RhdGUpOyAvLyBhY3RpdmF0ZSBzZWxlY3RlZCBsaW5rIGluIHRoZSBzaWRlYmFyIG1lbnVcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGF1dG8gc2NvcmxsIHRvIHBhZ2UgdG9wXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcHAuc2Nyb2xsVG9wKCk7IC8vIHNjcm9sbCB0byB0aGUgdG9wIG9uIGNvbnRlbnQgbG9hZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAkcm9vdFNjb3BlLnNldHRpbmdzLmxheW91dC5wYWdlQXV0b1Njcm9sbE9uTG9hZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlTm90Rm91bmQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnaGlkZScpOyAvLyBoaWRlIHNwaW5uZXIgYmFyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBlcnJvcnNcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlRXJyb3InLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnaGlkZScpOyAvLyBoaWRlIHNwaW5uZXIgYmFyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgXSk7XHJcblxyXG4vLyBIYW5kbGUgZ2xvYmFsIExJTksgY2xpY2tcclxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcclxuICAgIC5kaXJlY3RpdmUoJ2EnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbSwgYXR0cnMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhdHRycy5uZ0NsaWNrIHx8IGF0dHJzLmhyZWYgPT09ICcnIHx8IGF0dHJzLmhyZWYgPT09ICcjJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgbGluayBjbGljayBmb3IgYWJvdmUgY3JpdGVyaWFcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbi8vIEhhbmRsZSBEcm9wZG93biBIb3ZlciBQbHVnaW4gSW50ZWdyYXRpb25cclxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcclxuICAgIC5kaXJlY3RpdmUoJ2Ryb3Bkb3duTWVudUhvdmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW0pIHtcclxuICAgICAgICAgICAgICAgIGVsZW0uZHJvcGRvd25Ib3ZlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xuLyogXG4gICAgQFN1bW1hcnk6IEF1dGhlbnRpY2F0aW9uIHNlcnZpY2UgXG4gICAgQERlc2NyaXB0aW9uOiBpbiBjaGFyZ2Ugb2YgQVBJIHJlcXVlc3RzIGFuZCBkYXRhIHJlbGF0ZWQgdG8gdXNlciBhdXRoZW50aWNhdGlvbi5cbiovXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLnNlcnZpY2UoJ2F1dGhTZXJ2aWNlJywgWyckaHR0cCcsICdDT05GSUcnLCAnc3dhbmd1bGFyJywgJ2Vycm9ySGFuZGxlclNlcnZpY2UnLFxuICAgICAgICBmdW5jdGlvbigkaHR0cCwgQ09ORklHLCBzd2FuZ3VsYXIsIGVycm9ySGFuZGxlclNlcnZpY2UpIHtcblxuICAgICAgICAgICAgY29uc3Qgc2VydmVyID0gQ09ORklHLlNFUlZFUjtcblxuICAgICAgICAgICAgZnVuY3Rpb24gbG9naW4oY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBvc3Qoc2VydmVyICsgJy9hdXRoZW50aWNhdGUnLCBjcmVkZW50aWFscylcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdDonLHJlc3VsdCwnYXV0aCcscmVzdWx0LmhlYWRlcnMoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuID0gcmVzdWx0LmhlYWRlcnMoKS5hdXRob3JpemF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIuc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2FuZ3VsYXIuc3dhbCgn16TXqNeY15kg15TXlNeq15fXkdeo15XXqiDXqdeS15XXmdeZ150nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAn15DXoNeQINeR15PXldenINeQ16og15TXoNeq15XXoNeZ150g16nXlNeW16DXqi4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5mbydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvckhhbmRsZXJTZXJ2aWNlLmhhbmRsZShlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tDdXJyZW50VXNlcigpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChzZXJ2ZXIgKyAnL3VzZXJzL2N1cnJlbnQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbG9naW4sXG4gICAgICAgICAgICAgICAgY2hlY2tDdXJyZW50VXNlclxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIF0pO1xuXG5cbmFuZ3VsYXIubW9kdWxlKCdNZXRyb25pY0FwcCcpXG4gICAgLmZhY3RvcnkoJ2F1dGhJbnRlcmNlcHRvcicsICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VG9rZW4gPSByZXMuaGVhZGVycygpLmF1dGhvcml6YXRpb247XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAobmV3VG9rZW4gJiYgbmV3VG9rZW4gIT09IGN1cnJlbnRUb2tlbikge1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCBuZXdUb2tlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG5cbi8qIFxuICAgIEBTdW1tYXJ5OiBCZWFjb25zIERhdGEgU2VydmljZSBcbiAgICBARGVzY3JpcHRpb246IEluIGNoYXJnZSBvZiBBUEkgcmVxdWVzdHMgYW5kIGRhdGEgcmVsYXRlZCB0aGUgYmVhY29uc1xuKi9cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuc2VydmljZSgnYmVhY29uc0RhdGFTZXJ2aWNlJywgWyckcScsICckaHR0cCcsICdDT05GSUcnLCAnJGluamVjdG9yJyxcbiAgICAgICAgZnVuY3Rpb24oJHEsICRodHRwLCBDT05GSUcsICRpbmplY3Rvcikge1xuICAgICAgICAgICAgY29uc3Qgc2VydmVyID0gQ09ORklHLlNFUlZFUjtcbiAgICAgICAgICAgIGNvbnN0IHN3YW5ndWxhciA9ICRpbmplY3Rvci5nZXQoJ3N3YW5ndWxhcicpOyAvLyBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmN5XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEJlYWNvbnMoaWQsIHBhZ2VOdW1iZXIgPSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gYD9wYWdlPSR7cGFnZU51bWJlcn1gO1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAuZ2V0KGAke3NlcnZlcn0vY3VzdG9tZXJzLyR7aWR9L2JlYWNvbnMke3BhcmFtc31gKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlYWNvbnMgPSByZXMuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVhY29ucy5jb250ZW50ID0gdGhpcy5iZWFjb25zLmNvbnRlbnQubWFwKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoubGFzdEFjdGl2aXR5ID0gbW9tZW50LnV0YyhvYmoubGFzdEFjdGl2aXR5KS5jYWxlbmRhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoubGFzdEFjdGl2aXR5ID09PSAnSW52YWxpZCBkYXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoubGFzdEFjdGl2aXR5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gYXR0YWNoQmVhY29uKGN1c3RvbWVySWQsIHsgc2VyaWFsLCB1dWlkLCBsaWNlbnNlUGxhdGVOdW1iZXIsIGV4cGlyeURhdGUgfSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAucG9zdChgJHtzZXJ2ZXJ9L2N1c3RvbWVycy8ke2N1c3RvbWVySWR9L2JlYWNvbnNgLCB7IHNlcmlhbCwgdXVpZCwgbGljZW5zZVBsYXRlTnVtYmVyLCBleHBpcnlEYXRlIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIuc3RhdHVzID09PSA0MDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2FuZ3VsYXIub3Blbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxUZW1wbGF0ZTogJ2JhY2tvZmZpY2UvdHBsL3NlbnNvci00MDkuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dMb2FkZXJPbkNvbmZpcm06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICgpID0+IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiB0b2dnbGVCZWFjb24oY3VzdG9tZXJJZCwgeyBpZCwgYWN0aXZlIH0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBhdGNoKGAke3NlcnZlcn0vY3VzdG9tZXJzLyR7Y3VzdG9tZXJJZH0vYmVhY29ucy8ke2lkfS9hY3RpdmVgLCB7IGFjdGl2ZSB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdldEJlYWNvbnMsXG4gICAgICAgICAgICAgICAgYXR0YWNoQmVhY29uLFxuICAgICAgICAgICAgICAgIHRvZ2dsZUJlYWNvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIF0pO1xuXG4vKiBcbiAgICBAU3VtbWFyeTogQ3VzdG9tZXJzIERhdGEgU2VydmljZSBcbiAgICBARGVzY3JpcHRpb246IEluIGNoYXJnZSBvZiBBUEkgcmVxdWVzdHMgYW5kIGRhdGEgcmVsYXRlZCB0aGUgY3VzdG9tZXJzXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5zZXJ2aWNlKCdjdXN0b21lcnNEYXRhU2VydmljZScsIFsnJGh0dHAnLCAnQ09ORklHJywgJ3N3YW5ndWxhcicsXG4gICAgICAgIGZ1bmN0aW9uKCRodHRwLCBDT05GSUcsIHN3YW5ndWxhcikge1xuXG4gICAgICAgICAgICBjb25zdCBzZXJ2ZXIgPSBDT05GSUcuU0VSVkVSO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBDdXN0b21lcnMoZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZSA/IGl0ZW0uc3RhdHVzID0gJ0NVU1RPTUVSX0xJU1QuQUNUSVZFJyA6IGl0ZW0uc3RhdHVzID0gJ0NVU1RPTUVSX0xJU1QuTk9UX0FDVElWRSc7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRDdXN0b21lcnMoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoc2VydmVyICsgJy9jdXN0b21lcnMnKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVycyA9IG1hcEN1c3RvbWVycyhyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBhZGROZXdDdXN0b21lcihuZXdDdXN0b21lcikge1xuICAgICAgICAgICAgICAgIGlmIChuZXdDdXN0b21lci5jb21wYW55TG9nbykge1xuICAgICAgICAgICAgICAgICAgICBuZXdDdXN0b21lci5jb21wYW55TG9nbyA9IG5ld0N1c3RvbWVyLmNvbXBhbnlMb2dvLmJhc2U2NDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wb3N0KHNlcnZlciArICcvY3VzdG9tZXJzJywgbmV3Q3VzdG9tZXIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyLnN0YXR1cyA9PT0gNDA5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dhbmd1bGFyLm9wZW4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sVGVtcGxhdGU6ICdiYWNrb2ZmaWNlL3RwbC9jdXN0b21lci00MDkuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dMb2FkZXJPbkNvbmZpcm06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd3YXJuaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogKCkgPT4ge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGVkaXRDdXN0b21lcih7IGNvbXBhbnlOYW1lLCBkaXNwbGF5TmFtZSwgcGFzc3dvcmQsIGVtYWlsLCBpZCwgYWN0aXZlLCBjb21wYW55TG9nbywgY29tcGFueVJvbGUsIHBob25lTnVtYmVyIH0pIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcGFueUxvZ28pIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFueUxvZ28gPSBjb21wYW55TG9nby5iYXNlNjQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAucGF0Y2goc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGlkLCB7IGNvbXBhbnlOYW1lLCBkaXNwbGF5TmFtZSwgcGFzc3dvcmQsIGVtYWlsLCBhY3RpdmUsIGNvbXBhbnlMb2dvLCBjb21wYW55Um9sZSwgcGhvbmVOdW1iZXIgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEN1c3RvbWVyQnlJRChpZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAuZ2V0KHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBpZClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0aW5nQ3VzdG9tZXIgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNhdmVRdWlja0NhbGxOdW1iZXJzKGlkLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wYXRjaChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgaWQgKyAnL251bWJlcnMnLCBkYXRhKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzdXNwZW5kQ3VzdG9tZXIoeyBpZCwgYWN0aXZlIH0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBhdGNoKHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBpZCArICcvYWN0aXZlJywgeyBhY3RpdmUgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0UGVybWlzc2lvbnMoaWQsIHBlcm1pc3Npb25zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5wYXRjaChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgaWQgKyAnL3Blcm1pc3Npb25zJywgeyBwZXJtaXNzaW9ucyB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdldEN1c3RvbWVycyxcbiAgICAgICAgICAgICAgICBhZGROZXdDdXN0b21lcixcbiAgICAgICAgICAgICAgICBlZGl0Q3VzdG9tZXIsXG4gICAgICAgICAgICAgICAgZ2V0Q3VzdG9tZXJCeUlELFxuICAgICAgICAgICAgICAgIHNhdmVRdWlja0NhbGxOdW1iZXJzLFxuICAgICAgICAgICAgICAgIHN1c3BlbmRDdXN0b21lcixcbiAgICAgICAgICAgICAgICBzZXRQZXJtaXNzaW9uc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIF0pO1xuLyogXG4gICAgQFN1bW1hcnk6IERhc2hib2FyZCBEYXRhIFNlcnZpY2UgXG4gICAgQERlc2NyaXB0aW9uOiBJbiBjaGFyZ2Ugb2YgRGFzaGJvYXJkIGRhdGEgc3VjaCBhcyBTdGF0aXN0aWNzXG4qL1xuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5zZXJ2aWNlKCdkYXNoYm9hcmRTZXJ2aWNlJywgWyckaHR0cCcsICdDT05GSUcnLFxuICAgICAgICBmdW5jdGlvbigkaHR0cCwgQ09ORklHKSB7XG4gICAgICAgICAgICBjb25zdCBzZXJ2ZXIgPSBDT05GSUcuU0VSVkVSO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRTdGF0cygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLmdldChgJHtzZXJ2ZXJ9L2FkbWluL3N0YXRpc3RpY3NgKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRzID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRzLnllc3RlcmRheUFjdGl2aXR5U2Vjb25kcyA9IG1vbWVudCgpLmhvdXJzKDApLm1pbnV0ZXMoMCkuc2Vjb25kcyh0aGlzLnN0YXRzLnllc3RlcmRheUFjdGl2aXR5U2Vjb25kcykuZm9ybWF0KCdISDptbTpzcycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdHM7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdldFN0YXRzXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgXSk7XG5cbi8qIFxuICAgIEBTdW1tYXJ5OiBEcml2ZXJzIERhdGEgU2VydmljZSBcbiAgICBARGVzY3JpcHRpb246IEluIGNoYXJnZSBvZiBBUEkgcmVxdWVzdHMgYW5kIGRhdGEgcmVsYXRlZCB0aGUgZHJpdmVyc1xuKi9cblxuLy8gaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5zZXJ2aWNlKCdkcml2ZXJzRGF0YVNlcnZpY2UnLCBbJyRodHRwJywgJ0NPTkZJRycsXG4gICAgICAgIGZ1bmN0aW9uKCRodHRwLCBDT05GSUcpIHtcblxuICAgICAgICAgICAgY29uc3Qgc2VydmVyID0gQ09ORklHLlNFUlZFUjtcblxuICAgICAgICAgICAgZnVuY3Rpb24gbWFwRHJpdmVycyhkYXRhKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5jb250ZW50Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmFjdGl2ZUhvdXJzID0gbW9tZW50KCkuaG91cnMoMCkubWludXRlcygwKS5zZWNvbmRzKGl0ZW0ueWVzdGVyZGF5QWN0aXZpdHlTZWNvbmRzKS5mb3JtYXQoJ0hIOm1tOnNzJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldERyaXZlcnMoaWQsIHBhZ2VOdW1iZXIgPSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gYD9wYWdlPSR7cGFnZU51bWJlcn1gO1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAuZ2V0KHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBpZCArICcvZHJpdmVycycgKyBwYXJhbXMpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZHJpdmVycyA9IG1hcERyaXZlcnMocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHJpdmVycztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldERyaXZlckJ5SUQoY3VzdG9tZXJJZCwgaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLmdldChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgY3VzdG9tZXJJZCArICcvZHJpdmVycy8nICsgaWQpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdGluZ0RyaXZlciA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0aW5nRHJpdmVyLnBlcm1pc3Npb25MZXZlbCA9IENPTkZJRy5EUklWRVJfUEVSTUlTU0lPTlNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChvYmopID0+IG9iai50eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5pbmRleE9mKHRoaXMuZWRpdGluZ0RyaXZlci5wZXJtaXNzaW9uTGV2ZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gYWRkTmV3RHJpdmVyKGN1c3RvbWVySWQsIHsgZGlzcGxheU5hbWUsIGlkTnVtYmVyLCBwaG9uZU51bWJlciwgcGVybWlzc2lvbkxldmVsLCBsaWNlbnNlTnVtYmVyIH0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBvc3Qoc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGN1c3RvbWVySWQgKyAnL2RyaXZlcnMnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uTGV2ZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlTnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBlZGl0RHJpdmVyKGN1c3RvbWVySWQsIHsgZGlzcGxheU5hbWUsIGlkTnVtYmVyLCBwaG9uZU51bWJlciwgaWQsIHBlcm1pc3Npb25MZXZlbCwgYWN0aXZlLCBsaWNlbnNlTnVtYmVyIH0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLnBhdGNoKHNlcnZlciArICcvY3VzdG9tZXJzLycgKyBjdXN0b21lcklkICsgJy9kcml2ZXJzLycgKyBpZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZE51bWJlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGVybWlzc2lvbkxldmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGljZW5zZU51bWJlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gc3VzcGVuZERyaXZlcihjdXN0b21lcklkLCB7IGlkLCBhY3RpdmUgfSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFxuICAgICAgICAgICAgICAgICAgICAucGF0Y2goc2VydmVyICsgJy9jdXN0b21lcnMvJyArIGN1c3RvbWVySWQgKyAnL2RyaXZlcnMvJyArIGlkICsgJy9hY3RpdmUnLCB7IGFjdGl2ZSB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TG9nKGN1c290bWVySWQsIGlkLCBtb250aCwgeWVhcikge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRvU2Vjb25kcyh0aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJ0cyA9IHRpbWUuc3BsaXQoJzonKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgrcGFydHNbMF0pICogNjAgKiA2MCArICgrcGFydHNbMV0pICogNjAgKyAoK3BhcnRzWzJdKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gbW9tZW50KCkuZGF5KDApLm1vbnRoKG1vbnRoKS55ZWFyKHllYXIpLmZvcm1hdCgnWVlZWS9NTS9ERCcpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoYCR7c2VydmVyfS9jdXN0b21lcnMvJHtjdXNvdG1lcklkfS9kcml2ZXJzLyR7aWR9L2FjdGl2aXR5Lz9kYXRlPSR7ZGF0ZX1gKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyA9IHJlcy5kYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigob2JqKSA9PiBvYmouZW5kZWRBdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKChvYmopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmRhdGUgPSBgJHttb21lbnQob2JqLnN0YXJ0ZWRBdCkuZm9ybWF0KCdERC9NTS9ZWVlZJyl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnN0YXJ0ZWRBdCA9IGAke21vbWVudC51dGMob2JqLnN0YXJ0ZWRBdCkuZm9ybWF0KCdERC9NTS9ZWVlZIEhIOm1tOnNzJyl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmVuZGVkQXQgPSBgJHttb21lbnQudXRjKG9iai5lbmRlZEF0KS5mb3JtYXQoJ0REL01NL1lZWVkgSEg6bW06c3MnKX1gO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouZHJpdmVyU3RhdHVzTG9ncyAmJiBvYmouZHJpdmVyU3RhdHVzTG9ncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5kcml2ZXJTdGF0dXNMb2dzID0gb2JqLmRyaXZlclN0YXR1c0xvZ3MubWFwKChzdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuZGF0ZSA9IGAke21vbWVudC51dGMoc3RhdHVzLnN0YXJ0ZWRBdCkuZm9ybWF0KCdERC9NTS9ZWVlZJyl9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMuc3RhcnRlZEF0ID0gYCR7bW9tZW50LnV0YyhzdGF0dXMuc3RhcnRlZEF0KS5jYWxlbmRhcigpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzLmVuZGVkQXQgPSBgJHttb21lbnQudXRjKHN0YXR1cy5lbmRlZEF0KS5jYWxlbmRhcigpfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxBY3Rpdml0eSA9IHRoaXMubG9nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgob2JqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudG90YWxUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9TZWNvbmRzKG9iai50b3RhbFRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSgoYSwgYikgPT4geyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsQWN0aXZpdHkgPSBtb21lbnQoKS5ob3VycygwKS5taW51dGVzKDApLnNlY29uZHModGhpcy50b3RhbEFjdGl2aXR5KS5mb3JtYXQoJ0hIOm1tOnNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNlYXJjaChpZCwgcXVlcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBcbiAgICAgICAgICAgICAgICAgICAgLmdldChzZXJ2ZXIgKyAnL2N1c3RvbWVycy8nICsgaWQgKyAnL2RyaXZlcnMnICsgJy8/cT0nICsgcXVlcnkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXBEcml2ZXJzKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZ2V0RHJpdmVycyxcbiAgICAgICAgICAgICAgICBhZGROZXdEcml2ZXIsXG4gICAgICAgICAgICAgICAgZWRpdERyaXZlcixcbiAgICAgICAgICAgICAgICBzdXNwZW5kRHJpdmVyLFxuICAgICAgICAgICAgICAgIGdldExvZyxcbiAgICAgICAgICAgICAgICBnZXREcml2ZXJCeUlELFxuICAgICAgICAgICAgICAgIHNlYXJjaFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIF0pO1xuXG4vKiBcbiAgICBAU3VtbWFyeTogRXJyb3IgSGFuZGxpbmcgSW50ZXJjZXB0b3IgXG4gICAgQERlc2NyaXB0aW9uOiBJbiBjaGFyZ2Ugb2YgaW50ZXJjZXB0aW5nIHJlc3BvbnNlcyBhbmQgZGV0ZXJtaW5lIGlmIHRoZWlyIGFuIGVycm9yLlxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuZmFjdG9yeSgnZXJyb3JIYW5kbGVySW50ZXJjZXB0b3InLCBbJ2Vycm9ySGFuZGxlclNlcnZpY2UnLFxuICAgICAgICBmdW5jdGlvbihlcnJvckhhbmRsZXJTZXJ2aWNlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlclNlcnZpY2UuaGFuZGxlKGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IFByb21pc2UucmVzb2x2ZShlcnIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IFByb21pc2UucmVqZWN0KGVycikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbl0pO1xuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5zZXJ2aWNlKCdlcnJvckhhbmRsZXJTZXJ2aWNlJywgWyckaW5qZWN0b3InLFxuICAgICAgICBmdW5jdGlvbigkaW5qZWN0b3IpIHtcblxuICAgICAgICAgICAgZnVuY3Rpb24gaGFuZGxlKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN3YW5ndWxhciA9ICRpbmplY3Rvci5nZXQoJ3N3YW5ndWxhcicpOyAvLyBhdm9pZCBjaXJjdWxhciBkZXBlbmRlbmN5XG4gICAgICAgICAgICAgICAgY29uc3QgJHN0YXRlID0gJGluamVjdG9yLmdldCgnJHN0YXRlJyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGVyci5zdGF0dXMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDE6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCd1bmF1dGhvcml6ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dhbmd1bGFyLm9wZW4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sVGVtcGxhdGU6ICdiYWNrb2ZmaWNlL3RwbC80MDMuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dMb2FkZXJPbkNvbmZpcm06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICgpID0+IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQwNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2FuZ3VsYXIub3Blbih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxUZW1wbGF0ZTogJy9iYWNrb2ZmaWNlL3RwbC80MDQuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dMb2FkZXJPbkNvbmZpcm06IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICgpID0+IHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdkdXBsaWNhdGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0MDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDUwMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3YW5ndWxhci5vcGVuKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbFRlbXBsYXRlOiAnYmFja29mZmljZS90cGwvNTAyLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TG9hZGVyT25Db25maXJtOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAoKSA9PiB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGhhbmRsZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIF0pO1xuLyogXG4gICAgQFN1bW1hcnk6IFVzZXIgRGF0YSBTZXJ2aWNlIFxuICAgIEBEZXNjcmlwdGlvbjogSW4gY2hhcmdlIG9mIEFQSSByZXF1ZXN0cyBhbmQgZGF0YSByZWxhdGVkIHRoZSB1c2VyIHRoYXQgaXMgbm93IGxvZ2dlZCBpbiB0byB0aGUgYXBwLlxuKi9cblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuc2VydmljZSgndXNlckRhdGFTZXJ2aWNlJywgWydhdXRoU2VydmljZScsICckc3RhdGUnLCAnJGh0dHAnLCAnQ09ORklHJyxcbiAgICAgICAgZnVuY3Rpb24oYXV0aFNlcnZpY2UsICRzdGF0ZSwgJGh0dHAsIENPTkZJRykge1xuICAgICAgICAgICAgY29uc3Qgc2VydmVyID0gQ09ORklHLlNFUlZFUjtcblxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0VXNlckRhdGEoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhTZXJ2aWNlLmNoZWNrQ3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFpblN0YXRlU2NyZWVuJzonbG9naW4nXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmN1cnJlbnRVc2VyLHJlcy5kYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgX2lzQWRtaW4gPSBpc0FkbWluLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2lzQWRtaW4oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFVzZXIubWFpblN0YXRlU2NyZWVuID0gJ2N1c3RvbWVyTGlzdCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFVzZXIubWFpblN0YXRlU2NyZWVuID0gJ2RyaXZlcnNMaXN0JztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+ICRzdGF0ZS5nbygnbG9naW4nKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzQ3VzdG9tZXIoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXIucm9sZXMuaW5jbHVkZXMoJ0NVU1RPTUVSJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGlzQWRtaW4oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFVzZXIucm9sZXMuaW5jbHVkZXMoJ0FETUlOJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVVzZXJMYW5ndWFnZShsYW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLnBhdGNoKHNlcnZlciArICcvdXNlcnMvY3VycmVudCcsIHtsYW5ndWFnZTogbGFuZ30pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNldFVzZXJEYXRhLFxuICAgICAgICAgICAgICAgIGlzQ3VzdG9tZXIsXG4gICAgICAgICAgICAgICAgaXNBZG1pbixcbiAgICAgICAgICAgICAgICB1cGRhdGVVc2VyTGFuZ3VhZ2VcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICBdKTtcblxuYW5ndWxhci5tb2R1bGUoJ01ldHJvbmljQXBwJylcbiAgICAuZGlyZWN0aXZlKCdhY3Rpdml0eUxvZycsIGFjdGl2aXR5TG9nQ29uZmlnKTtcblxuZnVuY3Rpb24gYWN0aXZpdHlMb2dDb25maWcoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2JhY2tvZmZpY2UvanMvZGlyZWN0aXZlcy9hY3Rpdml0eUxvZy9hY3Rpdml0eUxvZy5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogWyckc3RhdGUnLCAnJHN0YXRlUGFyYW1zJywgJ2RyaXZlcnNEYXRhU2VydmljZScsIGFjdGl2aXR5TG9nQ29udHJvbGxlcl0sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGFjdGl2aXR5TG9nQ29udHJvbGxlcigkc3RhdGUsICRzdGF0ZVBhcmFtcywgZHJpdmVyc0RhdGFTZXJ2aWNlKSB7XG4gICAgY29uc3QgbW9udGhzID0gW1xuICAgICAgICAn15nXoNeV15DXqCcsXG4gICAgICAgICfXpNeR16jXldeQ16gnLFxuICAgICAgICAn157XqNelJyxcbiAgICAgICAgJ9eQ16TXqNeZ15wnLFxuICAgICAgICAn157XkNeZJyxcbiAgICAgICAgJ9eZ15XXoNeZJyxcbiAgICAgICAgJ9eZ15XXnNeZJyxcbiAgICAgICAgJ9eQ15XXkteV16HXmCcsXG4gICAgICAgICfXodek15jXnteR16gnLFxuICAgICAgICAn15DXlden15jXldeR16gnLFxuICAgICAgICAn16DXldeR157XkdeoJyxcbiAgICAgICAgJ9eT16bXnteR16gnXG4gICAgXTtcblxuICAgICRzdGF0ZVBhcmFtcy5tb250aCA9IE51bWJlcigkc3RhdGVQYXJhbXMubW9udGgpO1xuICAgICRzdGF0ZVBhcmFtcy55ZWFyID0gTnVtYmVyKCRzdGF0ZVBhcmFtcy55ZWFyKTtcblxuICAgIHRoaXMubG9nID0gZHJpdmVyc0RhdGFTZXJ2aWNlLmxvZztcbiAgICB0aGlzLnRvdGFsQWN0aXZpdHkgPSBkcml2ZXJzRGF0YVNlcnZpY2UudG90YWxBY3Rpdml0eTtcblxuICAgIHRoaXMuY3VycmVudERhdGUgPSBgJHttb250aHNbJHN0YXRlUGFyYW1zLm1vbnRoXX0gJHskc3RhdGVQYXJhbXMueWVhcn1gO1xuICAgIHRoaXMuaXNGdXR1cmVEYXRlID0gJHN0YXRlUGFyYW1zLm1vbnRoID49IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSAmJiAkc3RhdGVQYXJhbXMueWVhciA+PSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gICAgdGhpcy5pc1Bhc3REYXRlID0gJHN0YXRlUGFyYW1zLnllYXIgPD0gMjAxNTtcbiAgICB0aGlzLmV4cGFuZGVkUm93cyA9IHt9O1xuXG4gICAgdGhpcy5uZXh0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBkID0gbmV3IERhdGUoJHN0YXRlUGFyYW1zLnllYXIsICRzdGF0ZVBhcmFtcy5tb250aCArIDEsIDEpO1xuICAgICAgICAkc3RhdGUuZ28oJ2FjdGl2aXR5TG9nJywgeyBtb250aDogZC5nZXRNb250aCgpLCB5ZWFyOiBkLmdldEZ1bGxZZWFyKCkgfSk7XG4gICAgfTtcblxuICAgIHRoaXMucHJldiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgZCA9IG5ldyBEYXRlKCRzdGF0ZVBhcmFtcy55ZWFyLCAkc3RhdGVQYXJhbXMubW9udGggLSAxLCAxKTtcbiAgICAgICAgJHN0YXRlLmdvKCdhY3Rpdml0eUxvZycsIHsgbW9udGg6IGQuZ2V0TW9udGgoKSwgeWVhcjogZC5nZXRGdWxsWWVhcigpIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmV4cGFuZCA9IChsb2cpID0+IHtcbiAgICAgICAgbG9nLmV4cGFuZGVkID0gIWxvZy5leHBhbmRlZDtcbiAgICB9O1xufVxuXG5hbmd1bGFyLm1vZHVsZSgnTWV0cm9uaWNBcHAnKVxuICAgIC5kaXJlY3RpdmUoJ2FwcERhdGF0YWJsZScsIGFwcERhdGF0YWJsZUNvbmZpZyk7XG5cbmZ1bmN0aW9uIGFwcERhdGF0YWJsZUNvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgZGF0YTogJz0nLFxuICAgICAgICAgICAgdGFibGV0aXRsZTogJz0nLFxuICAgICAgICAgICAgdGh0aXRsZXM6ICc9JyxcbiAgICAgICAgICAgIHRkZGF0YTogJz0nLFxuICAgICAgICAgICAgZ290bzogJz0nLFxuICAgICAgICAgICAgdHlwZTogJz0nLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjogJz0nLFxuICAgICAgICAgICAgdXNlcklkOiAnPScsXG4gICAgICAgICAgICB0cmFuc2xhdGVEYXRhOiAnPSdcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdiYWNrb2ZmaWNlL2pzL2RpcmVjdGl2ZXMvYXBwRGF0YXRhYmxlL2FwcERhdGF0YWJsZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogWyckc2NvcGUnLCAnJHN0YXRlJywgJyR0aW1lb3V0JywgJ2RyaXZlcnNEYXRhU2VydmljZScsICdiZWFjb25zRGF0YVNlcnZpY2UnLCBhcHBEYXRhdGFibGVDb250cm9sbGVyXSxcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYXBwRGF0YXRhYmxlQ29udHJvbGxlcigkc2NvcGUsICRzdGF0ZSwgJHRpbWVvdXQsIGRyaXZlcnNEYXRhU2VydmljZSwgYmVhY29uc0RhdGFTZXJ2aWNlKSB7XG5cbiAgICAvLyBQdXQgcHJvcGVydGllcyBvbiB0aGUgY29udHJvbGxlclxuICAgIHRoaXMuZGF0YSA9ICRzY29wZS5kYXRhO1xuICAgIHRoaXMuY29udGVudCA9IHRoaXMuZGF0YS5jb250ZW50IHx8IHRoaXMuZGF0YTtcbiAgICB0aGlzLnRodGl0bGVzID0gJHNjb3BlLnRodGl0bGVzO1xuICAgIHRoaXMudGRkYXRhID0gJHNjb3BlLnRkZGF0YTtcbiAgICB0aGlzLnRhYmxldGl0bGUgPSAkc2NvcGUudGFibGV0aXRsZTtcbiAgICB0aGlzLnRyYW5zbGF0ZURhdGEgPSAkc2NvcGUudHJhbnNsYXRlRGF0YTtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAkc2NvcGUuJHdhdGNoKCd0YWJsZXRpdGxlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQudGFibGV0aXRsZSA9ICRzY29wZS50YWJsZXRpdGxlO1xuICAgIH0pO1xuXG4gICAgJHNjb3BlLiR3YXRjaCgndGh0aXRsZXMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC50aHRpdGxlcyA9ICRzY29wZS50aHRpdGxlcztcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEBUT0RPIG1vdmUgdG8gaGVscGVyXG4gICAgICovXG4gICAgdGhpcy50b3RhbFBhZ2VzID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gQXJyYXlcbiAgICAgICAgICAgIC5hcHBseSgwLCBBcnJheSh0aGlzLmRhdGEudG90YWxQYWdlcykpXG4gICAgICAgICAgICAubWFwKGluZGV4ID0+IGluZGV4KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nb1RvID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgaWYgKCRzY29wZS5nb3RvKSB7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJHNjb3BlLmdvdG8uc3RhdGUsIHtcbiAgICAgICAgICAgICAgICBbJHNjb3BlLmdvdG8ua2V5XTogdGhpcy5jb250ZW50W2luZGV4XVskc2NvcGUuZ290by5rZXldXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmdvVG9QYWdlID0gKHBhZ2VOdW1iZXIpID0+IHtcbiAgICAgICAgc3dpdGNoICgkc2NvcGUudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnZHJpdmVycyc6XG4gICAgICAgICAgICAgICAgICAgIGRyaXZlcnNEYXRhU2VydmljZS5nZXREcml2ZXJzKCRzY29wZS51c2VySWQsIHBhZ2VOdW1iZXIpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnYmVhY29ucyc6XG4gICAgICAgICAgICAgICAgICAgIGJlYWNvbnNEYXRhU2VydmljZS5nZXRCZWFjb25zKCRzY29wZS51c2VySWQsIHBhZ2VOdW1iZXIpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH07XG59Il19
