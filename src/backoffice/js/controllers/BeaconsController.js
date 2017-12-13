angular.module('MetronicApp')
    .controller('BeaconsController', ['$scope', '$stateParams', 'beaconsDataService', 'userDataService', '$state',
        function($scope, $stateParams, beaconsDataService, userDataService, $state) {

            this.beacons = beaconsDataService.beacons;
            this.currentPage = 0;

            if ($stateParams.id) {
                this.id = $stateParams.id;
            }

            this.attachBeacon = () => {
                beaconsDataService.attachBeacon(userDataService.currentUser.id, this.beacon)
                    .then(() => $state.go('beaconsList'));
            };

            this.toggleSuspendBeacon = (index) => {
                const beacon = this.beacons.content[index];
                beacon.active = !beacon.active;
                beaconsDataService.toggleBeacon(userDataService.currentUser.id, beacon);
            };


            //Build array with `totalPages` elements and return his indexes
            //Used for displaying the paginator
            this.totalPages = () => {
                return Array
                    .apply(0, Array(this.beacons.totalPages))
                    .map(index => index);
            };

            this.goToPage = (pageNumber) => {
                const id = $stateParams.id || userDataService.currentUser.id;
                beaconsDataService.getBeacons(id, pageNumber)
                    .then((result) => {
                        this.beacons = result;
                        this.currentPage = pageNumber;
                    });
            };

            this.isOpen = false;

            this.openCalendar = function(e) {
                e.preventDefault();
                e.stopPropagation();

                this.isOpen = true;
            };
        }
    ]);
