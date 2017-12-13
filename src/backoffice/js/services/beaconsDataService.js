/* 
    @Summary: Beacons Data Service 
    @Description: In charge of API requests and data related the beacons
*/

angular.module('MetronicApp')
    .service('beaconsDataService', ['$q', '$http', 'CONFIG', '$injector',
        function($q, $http, CONFIG, $injector) {
            const server = CONFIG.SERVER;
            const swangular = $injector.get('swangular'); // avoid circular dependency

            function getBeacons(id, pageNumber = 0) {
                const params = `?page=${pageNumber}`;
                return $http
                    .get(`${server}/customers/${id}/beacons${params}`)
                    .then((res) => {
                        this.beacons = res.data;
                        this.beacons.content = this.beacons.content.map((obj) => {
                            obj.lastActivity = moment.utc(obj.lastActivity).calendar();
                            if (obj.lastActivity === 'Invalid date') {
                                obj.lastActivity = null;
                            }
                            return obj;
                        });
                        return res.data;
                    });
            }

            function attachBeacon(customerId, { serial, uuid, licensePlateNumber, expiryDate }) {
                return $http
                    .post(`${server}/customers/${customerId}/beacons`, { serial, uuid, licensePlateNumber, expiryDate })
                    .then((res) => {
                        return res.data;
                    })
                    .catch((err) => {
                        if (err.status === 409) {
                            swangular.open({
                                htmlTemplate: 'backoffice/tpl/sensor-409.html',
                                showLoaderOnConfirm: true,
                                type: 'error',
                                controller: () => {}
                            });
                        }
                    });
            }

            function toggleBeacon(customerId, { id, active }) {
                return $http
                    .patch(`${server}/customers/${customerId}/beacons/${id}/active`, { active })
                    .then((res) => {
                        return res.data;
                    });
            }

            return {
                getBeacons,
                attachBeacon,
                toggleBeacon
            };
        }
    ]);
