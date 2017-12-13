angular.module('MetronicApp')
    .directive('activityLog', activityLogConfig);

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
    const months = [
        'ינואר',
        'פברואר',
        'מרץ',
        'אפריל',
        'מאי',
        'יוני',
        'יולי',
        'אוגוסט',
        'ספטמבר',
        'אוקטובר',
        'נובמבר',
        'דצמבר'
    ];

    $stateParams.month = Number($stateParams.month);
    $stateParams.year = Number($stateParams.year);

    this.log = driversDataService.log;
    this.totalActivity = driversDataService.totalActivity;

    this.currentDate = `${months[$stateParams.month]} ${$stateParams.year}`;
    this.isFutureDate = $stateParams.month >= new Date().getMonth() && $stateParams.year >= new Date().getFullYear();
    this.isPastDate = $stateParams.year <= 2015;
    this.expandedRows = {};

    this.next = () => {
        const d = new Date($stateParams.year, $stateParams.month + 1, 1);
        $state.go('activityLog', { month: d.getMonth(), year: d.getFullYear() });
    };

    this.prev = () => {
        const d = new Date($stateParams.year, $stateParams.month - 1, 1);
        $state.go('activityLog', { month: d.getMonth(), year: d.getFullYear() });
    };

    this.expand = (log) => {
        log.expanded = !log.expanded;
    };
}
