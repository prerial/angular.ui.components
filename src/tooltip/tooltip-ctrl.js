/**
 * Created by Mikhail on 1/7/2016.
 */
(function () {
    'use strict';

    function TooltipController( attrs, elem, $templateCache, tooltipService) {

        var titleHold, template, dimensions;

        this.hideTooltip = function() {
            if (template) {
                elem.attr("title", titleHold);
                template.remove();
            }
        };

        this.showTooltip = function(e) {
            titleHold = elem.attr("title");
            elem.attr("title", "");
            if (!template) {
                template = $($templateCache.get('src/tooltip/tooltip.html'));
            }
            template.find('.tooltip-inner').html(attrs.title);
            template.addClass("pre-tooltip tooltip top").show();
            $('body').append(template);
//            dimensions = tooltipService.getDimensions(elem, $('.tooltip-container'), $('.tooltip-tooltip-arrow'), true);
            var top = elem.offset().top - ($('.tooltip-container').height() + elem.height());
            var left = e.clientX - elem.width()/2;
            template.css('left', left).css('top', top);
        };

    }

    TooltipController.$inject = ['$attrs', '$element', '$templateCache','TooltipService'];

    angular.module('prerial').controller('TooltipController', TooltipController);

})();