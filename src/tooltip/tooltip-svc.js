(function () {
    "use strict";

    angular.module('prerial').service('TooltipService', TooltipService);

    function TooltipService(){

        this.getDimensions = function(elem, container, tooltipArrow, isVisible){

            var offset = elem.offset();

            var linkWidth = elem.prop('offsetWidth');

            var linkHeight = elem.prop('offsetHeight');

            if (!isVisible) container.css({display: "block", position: "absolute", visibility: "hidden"});

            var tipWidth = container.prop('offsetWidth');

            var tipHeight = container.prop('offsetHeight');

            var tooltipArrowOffsetLeft = tooltipArrow.prop("offsetLeft");

            var tooltipArrowWidth = tooltipArrow.prop("offsetWidth");

            var tooltipArrowHeight = tooltipArrow.prop("offsetHeight");

            if (!isVisible) container.css({display: "none", position: "", visibility: ""});

            return {
                "offset" : offset,
                "linkWidth" : linkWidth,
                "linkHeight" : linkHeight,
                "tipWidth" : tipWidth,
                "tipHeight" : tipHeight,
                "tooltipArrowOffsetLeft" : tooltipArrowOffsetLeft,
                "tooltipArrowWidth" : tooltipArrowWidth,
                "tooltipArrowHeight" : tooltipArrowHeight
            };
        }

    }
}());
