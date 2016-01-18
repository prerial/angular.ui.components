/**
 * Created by Mikhail on 1/17/2016.
 */
(function () {
    'use strict';

    function AccordionDirective($timeout) {

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

    AccordionDirective.$inject = ['$timeout'];

    angular.module('prerial').directive({preAccordion: AccordionDirective});

})();