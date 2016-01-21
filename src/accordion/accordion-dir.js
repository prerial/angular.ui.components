/**
 * Created by Mikhail on 1/17/2016.
 */
(function () {
    'use strict';

    function AccordionDirective() {

        return {
            restrict: 'E',
            require: ['preAccordion'],
            scope: {
                src: '=',
                field: '@'
            },
            templateUrl: 'src/accordion/accordion.html',
            controller: 'AccordionController',
            replace: true,
            transclude: true
        }
    }

    angular.module('prerial').directive({preAccordion: AccordionDirective});

})();