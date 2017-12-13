angular.module('MetronicApp')
    .directive('confirmPassword', confirmPasswordConfig);

function confirmPasswordConfig() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            otherModelValue: '=compareTo'
        },
        link: (scope, element, attributes, ngModel) => {
            ngModel.$validators.compareTo = (modelValue) => {
                return modelValue === scope.otherModelValue;
            };

            scope.$watch('otherModelValue', () => {
                ngModel.$validate();
            });
        }
    };
}