/* 
    @Summary: Dashboard Data Service 
    @Description: In charge of Dashboard data such as Statistics
*/

angular.module('MetronicApp')
    .service('dashboardService', ['$http', 'CONFIG',
        function($http, CONFIG) {
            const server = CONFIG.SERVER;

            function getStats() {
                return $http
                    .get(`${server}/admin/statistics`)
                    .then((result) => {
                        this.stats = result.data;
                        this.stats.yesterdayActivitySeconds = moment().hours(0).minutes(0).seconds(this.stats.yesterdayActivitySeconds).format('HH:mm:ss');
                        return this.stats;
                    });
            }

            return {
                getStats
            };
        }
    ]);
