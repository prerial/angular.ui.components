/**
 * Created by Mikhail on 1/17/2016.
 */
(function () {
    'use strict';

    function AccordionPaneDirective() {

        return {
            restrict: 'E',
            require: ['^preAccordion'],
            scope: {
                src: '='
            },
            templateUrl: 'src/accordion/accordion-pane.html',
            replace: true,
            transclude: true,
            link: function (scope, elem, attrs, controllers) {

                scope.title = attrs.title;
                scope.idx = attrs.idx;
                scope.accordionPaneShow = false;

                scope.toggle = function(idx){
                    controllers[0].hide(elem, idx);
                };
            }
        }
    }

    angular.module('prerial').directive({preAccordionPane: AccordionPaneDirective});

})();