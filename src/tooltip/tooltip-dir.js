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
                    e.preventDefault();
                    controller.showTooltip(e);
                });

                elem.on("mouseout", function(e) {
                    e.preventDefault();
                    controller.hideTooltip(e);
                });
            }
        }
    }
    angular.module('prerial').directive("preTooltip", TooltipDirective);

})();