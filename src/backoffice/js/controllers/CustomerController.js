/* 
    @Summary: Customer controller 
    @Description: in charge of all logic actions related to the Customers.
*/
angular.module('MetronicApp')
    .controller('CustomerController', ['$scope', 'customersDataService', '$stateParams', 'userDataService', '$state',
        function($scope, customersDataService, $stateParams, userDataService, $state) {
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

            this.setPermissionModel = (permissions) =>{
                if (!permissions) {
                    return;
                }
                this.allowedPermissions = permissions;
                this.allowedPermission = {};
                this.allowedPermissions.forEach((permission) =>{ 
                    this.allowedPermission[permission.permission] = permission.allowed;
                });
            };

            this.setPermissionModel(userDataService.currentUser.permissions);

            this.savePermissions = () => {
                let permissions = [];
                _.forEach(this.allowedPermission, (allowed, permission) => {
                    let permissionObj = _.find(this.allowedPermissions, {permission: permission});
                    if (permissionObj) {
                        permissionObj.allowed = allowed;
                        permissions.push(permissionObj);
                    } else {
                        permissions.push({permission: permission, allowed: allowed});
                    }
                });
                customersDataService.setPermissions(userDataService.currentUser.id, permissions).then((permissions) => {
                    this.setPermissionModel(permissions);
                });
            };

            this.addNewCustomer = () => {
                this.loading = true;
                if (this.editMode) {
                    customersDataService.editCustomer(this.customer)
                        .then(() => $state.go('customerList'))
                        .finally(() => this.loading = false);
                } else {
                    customersDataService.addNewCustomer(this.customer)
                        .then(() => $state.go('customerList'))
                        .finally(() => this.loading = false);
                }
            };

            this.driversPhoneNumbers = userDataService.currentUser.quickCallNumbers;

            this.saveNumbers = () => {
                // fitler out empty objects in the array
                const data = this.driversPhoneNumbers
                    .filter(x => x.name.length > 0 && x.number.length > 0);
                return customersDataService.saveQuickCallNumbers(userDataService.currentUser.id, { numbers: data });
            };

            this.removeNumber = (index) => {
                this.phoneNumbersError = false;
                this.driversPhoneNumbers = this.driversPhoneNumbers
                    .filter(x => this.driversPhoneNumbers[index] !== x);
            };

            this.addNewNumber = () => {
                if (this.driversPhoneNumbers.length < 12) {
                    this.driversPhoneNumbers.push({ name: '', number: '' });
                } else {
                    this.phoneNumbersError = true;
                }
            };

            this.toggleSuspendCustomer = () => {
                this.customer.active = !this.customer.active;
                customersDataService.suspendCustomer(this.customer);
            };

            this.togglePasswordFields = () => {
                this.showPasswordFields = !this.showPasswordFields;
            };
        }
    ]);
