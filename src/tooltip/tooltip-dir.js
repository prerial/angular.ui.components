(function () {
    'use strict';

    angular.module('prerial').directive('myTooltip', function TooltipDirective($templateCache) {
         return {
            restrict: 'A',
            template: '<span ng-transclude style="border:2px solid blue"></span><p></p><div ng-show="isShow" style="top:0;position:absolute;border:2px solid red">{{toool}}{{title}}</div>',
            transclude:true,
            scope:{
                title:'@title',
                toool:'=tooltip'
            },
            link: function(scope, elem, attr){
                scope.isShow = false;
                elem.on('mouseover', function(){
                    scope.isShow = true;
                    scope.$apply();
                });
                elem.on('mouseout', function(){
                    scope.isShow = false;
                    scope.$apply();

                });
            }
        }
    })
})();


(function () {
    'use strict';

    function TooltipDirective($compile, $templateCache) {

        return {
            restrict: 'A',
            scope:{
                tooltip:'=tooltip',
                title:'@title'
            },
            link: function (scope, elem, attrs) {

                var titleHold, template;
                scope.isShow = false;
                elem.on("mouseover", function(e) {
                    e.preventDefault();
                    if (!template) {
                        template = $compile($templateCache.get('src/tooltip/tooltip.html'))(scope);
                    }
                    var title = scope.title? scope.title : scope.tooltip;
                    template.find('.tooltip-inner').html(title);
                    template.addClass("pre-tooltip tooltip top").show();
                    $('body').append(template);
                    var top = elem.offset().top - ($('.tooltip-container').height() + elem.height());
                    var left = e.clientX - elem.width()/2;
                    template.css('left', left).css('top', top).stop(true,true);
                });

                elem.on("mouseout", function(e) {
                    e.preventDefault();
                    if (template) {
                        template.remove();
                        template = null;
                    }
                });
            }
        }
    }

    TooltipDirective.$inject = ['$compile', '$templateCache'];

    angular.module('prerial').directive("preTooltip", TooltipDirective);

})();