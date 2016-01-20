/**
 * Created by Mikhail on 1/17/2016.
 */
(function () {
    'use strict';

    function AccordionPaneDirective(timeout) {

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
                    timeout(function(){
                            blnShow === false? scope.accordionPaneShow = true : scope.accordionPaneShow = false;
                        },200
                    )};

                scope.hidePane = function(){
                    scope.accordionPaneShow = false;

                };

            }
        }
    }

    AccordionPaneDirective.$inject = ['$timeout'];

    angular.module('prerial').directive({preAccordionPane: AccordionPaneDirective});

})();