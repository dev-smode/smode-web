/* 
    @Summary: Dashboard controller 
    @Description: in charge of all logic actions related to the Dashboard and every child state of the dashboard.
*/

angular.module('MetronicApp')
    .controller('DashboardController', ['$scope', 'dashboardService',
        function($scope, dashboardService) {
            this.stats = dashboardService.stats;
        }
    ]);