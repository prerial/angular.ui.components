(function () {
    'use strict';

    function TooltipDirective() {

        return {
            restrict: 'A',
            require: ['preTooltip'],
            controller: 'TooltipController',
            link: function (scope, elem, attrs, controllers) {

                var comboboxController = controllers[0];

                elem.on("mouseover", function(e) {
                    comboboxController.showTooltip(e);
                });

                elem.on("mouseout", function(e) {
                    comboboxController.hideTooltip(e);
                });
            }
        }
    }

    angular.module('prerial').directive({preTooltip: TooltipDirective});

})();