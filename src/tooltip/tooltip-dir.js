(function () {
    'use strict';

    function TooltipDirective() {

        return {
            restrict: 'A',
            require: ['preTooltip'],
            controller: 'TooltipController',
            link: function (scope, elem, attrs, controllers) {

                var controller = controllers[0];

                elem.on("mouseover", function(e) {
                    controller.showTooltip(e);
                });

                elem.on("mouseout", function(e) {
                    controller.hideTooltip(e);
                });
            }
        }
    }
    angular.module('prerial').directive("preTooltip", TooltipDirective);

})();