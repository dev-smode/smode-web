/* 
    @Summary: Drivers controller 
    @Description: in charge of all logic actions related to Drivers, 
    such as adding new drivers and display drivers list.
*/

angular.module('MetronicApp')
    .controller('DriversController', ['$scope', '$stateParams', 'driversDataService', '$state', 'userDataService', 'customersDataService', 'CONFIG',
        function($scope, $stateParams, driversDataService, $state, userDataService, customersDataService, CONFIG) {
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
            } else { // new driver mode
                this.mode = 'הוסף נהג חדש';
            }

            this.addNewDriver = () => {
                this.loading = true;
                if (this.editMode) {
                    driversDataService.editDriver(userDataService.currentUser.id, this.driver).then(() => {
                        this.loading = false;
                        $state.go('driversList');
                    });
                } else {
                    driversDataService.addNewDriver(userDataService.currentUser.id, this.driver).then(() => {
                        this.loading = false;
                        $state.go('driversList');
                    });
                }
            };

            this.goToEditCustomer = () => {
                $state.go('editCustomer', { id: this.customer.id });
            };

            this.viewLog = () => {
                $state.go('activityLog', {
                    id: this.driver.id,
                    month: new Date().getMonth(),
                    year: new Date().getFullYear()
                });
            };

            this.toggleSuspendDriver = () => {
                this.driver.active = !this.driver.active;
                driversDataService.suspendDriver(userDataService.currentUser.id, this.driver);
            };

            this.goTo = function(index) {
                if (!$scope.isAdmin) {
                    $state.go('editDriver', {
                        id: this.drivers.content[index].id
                    });
                }
            };

            /**
             * @TODO - move to helper
             */
            this.totalPages = () => {
                return Array
                    .apply(0, Array(this.drivers.totalPages))
                    .map(index => index);
            };

            this.goToPage = (pageNumber) => {
                /**
                 * define which id to use for API
                 * if we're looking at a list of drivers as a customer - we need our own id
                 * if we're looking at a list of drivers as a super admin for specific customer - we need the customer's id
                 */
                const id = $stateParams.id || userDataService.currentUser.id;
                driversDataService.getDrivers(id, pageNumber)
                    .then((result) => {
                        this.drivers = result;
                        this.currentPage = pageNumber;
                    });
            };

            this.search = () => {
                const id = $stateParams.id || userDataService.currentUser.id;
                driversDataService.search(id, this.searchQuery).then((results) => {
                    this.drivers = results;
                });
            };
        }
    ]);
