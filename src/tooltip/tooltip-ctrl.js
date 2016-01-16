/**
 * Created by Mikhail on 1/7/2016.
 */
(function () {
    'use strict';

    function TooltipController( attrs, elem, $templateCache, tooltipService, Debounce) {

        var titleHold, template, dimensions;

        this.hideTooltip = function() {
            if (template) {
                Debounce(1000,function(){
                    elem.attr("title", titleHold);
                    template.remove();
                })
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
 //           Debounce(200,function(){
                $('body').append(template);
//            dimensions = tooltipService.getDimensions(elem, $('.tooltip-container'), $('.tooltip-tooltip-arrow'), true);
                var top = elem.offset().top - ($('.tooltip-container').height() + elem.height());
                var left = e.clientX - elem.width()/2;
                template.css('left', left).css('top', top).stop(true,true).fadeIn(2000);

//            })
        };

    }

    TooltipController.$inject = ['$attrs', '$element', '$templateCache','TooltipService', 'Debounce'];

    angular.module('prerial').controller('TooltipController', TooltipController);

})();