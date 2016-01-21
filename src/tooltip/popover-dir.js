(function (angular) {
    'use strict';

    function PopoverDirective(){
        return {
            restrict: 'A',

            controller:'TooltipController',
            require: ['saPopover'],
            compile: function (tElement, tAttrs) {

                // remove title attribute so default browser behavior doesn't pick it up.
                tAttrs.saTitle = tAttrs.title;

                tAttrs.title = "";

                tElement.attr("title","");

                var customContent = tElement.find(".custom-content");

                if (customContent.length>0) {
                    tAttrs.customContent = customContent[0].outerHTML;
                    customContent.remove();
                }

                return function(scope, elem, attrs, ctrls){
                    var popoverCtrl = ctrls[0];

                    attrs.tooltipTemplate = 'assets/d/sa-tooltip/sa-popover.html';
                    attrs.tooltipArrowClass = "popover-arrow";
                    attrs.toolTipContentClass = "popover-inner";
                    attrs.isPopover = true;
                    attrs.toolTipClasses = "sa-popover popover " + (( attrs.popoverClass ) ? attrs.popoverClass : "");

                    popoverCtrl.init(elem, attrs);

                    function showTooltip(e){
                        popoverCtrl.showTooltip(e);
                    }

                    if (attrs.toggleMode === 'click') {
                        elem.on("click.poEvents", showTooltip);
                    } else {
                        elem.on("mouseover.poEvents", showTooltip);
                        elem.on("mouseout.poEvents", popoverCtrl.hideTooltip);
                    }

                    elem.on("$destroy", function(){
                        elem.off(".poEvents");
                        popoverCtrl.cleanUp();
                    });
                }
            }
        }
    }

    angular.module('prerial').directive('saPopover', PopoverDirective)
}(angular));