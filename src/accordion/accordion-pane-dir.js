/**
 * Created by Mikhail on 1/17/2016.
 */
(function () {
    'use strict';

    function AccordionPaneDirective($timeout) {

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
                scope.accordionPaneShow = false;

                var accordionController = controllers[0];

                scope.toggle = function(evt, item){
                    accordionController.hide();
                    scope.accordionPaneShow = true;
                };

                scope.hidePane = function(){
                    scope.accordionPaneShow = false;
                };

            }
        }
    }

    AccordionPaneDirective.$inject = ['$timeout'];

    angular.module('prerial').directive({preAccordionPane: AccordionPaneDirective});

})();