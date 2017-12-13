/* 
    @Summary: Modal controller 
    @Description: in charge of all logic actions related to Modal
*/

angular.module('MetronicApp')
    .controller('ModalController', ['close',
        function(close) {
            this.close = (result) => {
                // close, but give 500ms for bootstrap to animate
                close(result, 500); 
            };
        }
]);