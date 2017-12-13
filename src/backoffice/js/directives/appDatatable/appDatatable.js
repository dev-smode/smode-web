angular.module('MetronicApp')
    .directive('appDatatable', appDatatableConfig);

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

    // Put properties on the controller
    this.data = $scope.data;
    this.content = this.data.content || this.data;
    this.thtitles = $scope.thtitles;
    this.tddata = $scope.tddata;
    this.tabletitle = $scope.tabletitle;
    this.translateData = $scope.translateData;
    var that = this;

    $scope.$watch('tabletitle', function() {
        that.tabletitle = $scope.tabletitle;
    });

    $scope.$watch('thtitles', function() {
        that.thtitles = $scope.thtitles;
    });

    /**
     * @TODO move to helper
     */
    this.totalPages = () => {
        return Array
            .apply(0, Array(this.data.totalPages))
            .map(index => index);
    };

    this.goTo = function(index) {
        if ($scope.goto) {
            $state.go($scope.goto.state, {
                [$scope.goto.key]: this.content[index][$scope.goto.key]
            });
        }
    };

    this.goToPage = (pageNumber) => {
        switch ($scope.type) {
            case 'drivers':
                    driversDataService.getDrivers($scope.userId, pageNumber).then((result) => {
                        this.data = result;
                    });
                break;

            case 'beacons':
                    beaconsDataService.getBeacons($scope.userId, pageNumber).then((result) => {
                        this.data = result;
                    });
                break;
        }
    };
}