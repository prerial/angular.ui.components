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

                var blnShow = false;
                scope.title = attrs.title;
                scope.accordionPaneShow = false;

                var accordionController = controllers[0];

                scope.toggle = function(){
                    blnShow = scope.accordionPaneShow;
                    accordionController.hide();
                    blnShow === false? scope.accordionPaneShow = true : scope.accordionPaneShow = false;
                };

                scope.hidePane = function(){
                    scope.accordionPaneShow = false;
                };

            }
        }
    }

    angular.module('prerial').directive({preAccordionPane: AccordionPaneDirective});

})();