/**
 * Created by Mikhail on 1/17/2016.
 */
(function () {
    'use strict';

    function AccordionPaneDirective(accordionService) {

        return {
            restrict: 'E',
            scope: {
                src: '='
            },
            templateUrl: 'src/accordion/accordion-pane.html',
            replace: true,
            transclude: true,
            link: function (scope, elem, attrs) {

                scope.title = attrs.title;
                scope.idx = attrs.idx;
                scope.accordionPaneShow = false;

                accordionService.addPane({
                    scope: scope,
                    idx: attrs.idx
                });

                scope.toggle = function(idx){
                    accordionService.togglePane(idx);
                };
            }
        }
    }

    AccordionPaneDirective.$inject = ['accordionService'];

    angular.module('prerial').directive({preAccordionPane: AccordionPaneDirective});

})();