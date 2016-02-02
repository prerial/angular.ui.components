(function () {
    'use strict';

    function TooltipDirective($templateCache) {

        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {

                var titleHold, template;

                elem.on("mouseover", function(e) {
                    e.preventDefault();
                    titleHold = elem.attr("title");
                    elem.attr("title", "");
                    if (!template) {
                        template = $($templateCache.get('src/tooltip/tooltip.html'));
                    }
                    template.find('.tooltip-inner').html(attrs.title);
                    template.addClass("pre-tooltip tooltip top").show();
                    $('body').append(template);
                    var top = elem.offset().top - ($('.tooltip-container').height() + elem.height());
                    var left = e.clientX - elem.width()/2;
                    template.css('left', left).css('top', top).stop(true,true);
                });

                elem.on("mouseout", function(e) {
                    e.preventDefault();
                    if (template) {
                        elem.attr("title", titleHold);
                        template.remove();
                    }
                });
            }
        }
    }

    TooltipDirective.$inject = ['$templateCache'];

    angular.module('prerial').directive("preTooltip", TooltipDirective);

})();