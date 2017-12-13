/* 
    @Summary: Customers Data Service 
    @Description: In charge of API requests and data related the customers
*/

angular.module('MetronicApp')
    .service('customersDataService', ['$http', 'CONFIG', 'swangular',
        function($http, CONFIG, swangular) {

            const server = CONFIG.SERVER;

            function mapCustomers(data) {
                return data.map((item) => {
                    item.active ? item.status = 'CUSTOMER_LIST.ACTIVE' : item.status = 'CUSTOMER_LIST.NOT_ACTIVE';
                    return item;
                });
            }

            function getCustomers() {
                return $http
                    .get(server + '/customers')
                    .then((result) => {
                        this.customers = mapCustomers(result.data);
                        return result.data;
                    });
            }

            function addNewCustomer(newCustomer) {
                if (newCustomer.companyLogo) {
                    newCustomer.companyLogo = newCustomer.companyLogo.base64;
                }
                return $http
                    .post(server + '/customers', newCustomer)
                    .then(result => result)
                    .catch((err) => {
                        if (err.status === 409) {
                            swangular.open({
                                htmlTemplate: 'backoffice/tpl/customer-409.html',
                                showLoaderOnConfirm: true,
                                type: 'warning',
                                controller: () => {}
                            });
                            return Promise.reject(err);
                        }
                    });
            }

            function editCustomer({ companyName, displayName, password, email, id, active, companyLogo, companyRole, phoneNumber }) {
                if (companyLogo) {
                    companyLogo = companyLogo.base64;
                }
                return $http
                    .patch(server + '/customers/' + id, { companyName, displayName, password, email, active, companyLogo, companyRole, phoneNumber })
                    .then(result => result);
            }

            function getCustomerByID(id) {
                return $http
                    .get(server + '/customers/' + id)
                    .then((result) => {
                        this.editingCustomer = result.data;
                        return result.data;
                    });
            }

            function saveQuickCallNumbers(id, data) {
                return $http
                    .patch(server + '/customers/' + id + '/numbers', data)
                    .then(res => res.data);
            }

            function suspendCustomer({ id, active }) {
                return $http
                    .patch(server + '/customers/' + id + '/active', { active })
                    .then(res => res.data);
            }

            function setPermissions(id, permissions) {
                return $http
                    .patch(server + '/customers/' + id + '/permissions', { permissions })
                    .then(res => res.data);
            }

            return {
                getCustomers,
                addNewCustomer,
                editCustomer,
                getCustomerByID,
                saveQuickCallNumbers,
                suspendCustomer,
                setPermissions
            };
        }
    ]);