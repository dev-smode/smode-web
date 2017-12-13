/* 
    @Summary: Drivers Data Service 
    @Description: In charge of API requests and data related the drivers
*/

// import moment from 'moment';

angular.module('MetronicApp')
    .service('driversDataService', ['$http', 'CONFIG',
        function($http, CONFIG) {

            const server = CONFIG.SERVER;

            function mapDrivers(data) {
                data.content.map((item) => {
                    item.activeHours = moment().hours(0).minutes(0).seconds(item.yesterdayActivitySeconds).format('HH:mm:ss');
                    return item;
                });

                return data;
            }

            function getDrivers(id, pageNumber = 0) {
                const params = `?page=${pageNumber}`;
                return $http
                    .get(server + '/customers/' + id + '/drivers' + params)
                    .then((result) => {
                        this.drivers = mapDrivers(result.data);
                        return this.drivers;
                    });
            }

            function getDriverByID(customerId, id) {
                return $http
                    .get(server + '/customers/' + customerId + '/drivers/' + id)
                    .then((result) => {
                        this.editingDriver = result.data;
                        this.editingDriver.permissionLevel = CONFIG.DRIVER_PERMISSIONS
                            .map((obj) => obj.type)
                            .indexOf(this.editingDriver.permissionLevel);
                        return result.data;
                    });
            }

            function addNewDriver(customerId, { displayName, idNumber, phoneNumber, permissionLevel, licenseNumber }) {
                return $http
                    .post(server + '/customers/' + customerId + '/drivers', {
                        displayName,
                        idNumber,
                        phoneNumber,
                        permissionLevel,
                        licenseNumber
                    });
            }

            function editDriver(customerId, { displayName, idNumber, phoneNumber, id, permissionLevel, active, licenseNumber }) {
                return $http
                    .patch(server + '/customers/' + customerId + '/drivers/' + id, {
                        displayName,
                        idNumber,
                        phoneNumber,
                        permissionLevel,
                        active,
                        licenseNumber
                    });
            }

            function suspendDriver(customerId, { id, active }) {
                return $http
                    .patch(server + '/customers/' + customerId + '/drivers/' + id + '/active', { active })
                    .then((result) => {
                        return result;
                    });
            }

            function getLog(cusotmerId, id, month, year) {
                function toSeconds(time) {
                    let parts = time.split(':');
                    return (+parts[0]) * 60 * 60 + (+parts[1]) * 60 + (+parts[2]);
                }

                const date = moment().day(0).month(month).year(year).format('YYYY/MM/DD');

                return $http
                    .get(`${server}/customers/${cusotmerId}/drivers/${id}/activity/?date=${date}`)
                    .then((res) => {
                        this.log = res.data
                            .filter((obj) => obj.endedAt)
                            .map((obj) => {
                                obj.date = `${moment(obj.startedAt).format('DD/MM/YYYY')}`;
                                obj.startedAt = `${moment.utc(obj.startedAt).format('DD/MM/YYYY HH:mm:ss')}`;
                                obj.endedAt = `${moment.utc(obj.endedAt).format('DD/MM/YYYY HH:mm:ss')}`;

                                if (obj.driverStatusLogs && obj.driverStatusLogs.length) {
                                    obj.driverStatusLogs = obj.driverStatusLogs.map((status) => {
                                        status.date = `${moment.utc(status.startedAt).format('DD/MM/YYYY')}`;
                                        status.startedAt = `${moment.utc(status.startedAt).calendar()}`;
                                        status.endedAt = `${moment.utc(status.endedAt).calendar()}`;
                                        return status;
                                    });
                                }
                                return obj;
                            });

                        this.totalActivity = this.log
                            .map((obj) => {
                                if (obj.totalTime) {
                                    return toSeconds(obj.totalTime);
                                }
                                
                                return obj;
                            })
                            .reduce((a, b) => { 
                                return a + b;
                            }, 0);

                        this.totalActivity = moment().hours(0).minutes(0).seconds(this.totalActivity).format('HH:mm:ss');
                        return res.data;
                    });

            }

            function search(id, query) {
                return $http
                    .get(server + '/customers/' + id + '/drivers' + '/?q=' + query)
                    .then((res) => {
                        return mapDrivers(res.data);
                    });
            }

            return {
                getDrivers,
                addNewDriver,
                editDriver,
                suspendDriver,
                getLog,
                getDriverByID,
                search
            };
        }
    ]);
