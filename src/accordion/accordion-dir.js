/**
 * Created by Mikhail on 1/17/2016.
 */
(function () {
    'use strict';

    function AccordionDirective($timeout) {

        return {
            restrict: 'E',
            require: ['?ngModel','preAccordion'],
            scope: {
                src: '=',
                field: '@'
            },
            templateUrl: 'src/accordion/accordion.html',
            controller: 'AccordionController',
            replace: true,
            link: function (scope, elem, attrs, controllers) {
                scope.items = scope.src;
                scope.toggle = function(evt, item){
                    var el = evt.target;
                    scope.hide();
                    angular.element(el).scope().accordionShow = true;
                };
                scope.hide = function(){
                    angular.element(elem).children().each(function(idx, item){
                        angular.element(item).scope().accordionShow = false;
                    });
                };

                var ngModelController = controllers[0],
                    accordionController = controllers[1];

/*

                comboboxController.init(ngModelController);
                scope.comboShow = false;
                elem.find('.pre-combobox-toggle').on("click", function handleClickEvent() {
                    scope.comboShow = !scope.comboShow;
                    scope.$apply();
                });
                elem.find('.pre-dropdown-menu').width(elem.find('.pre-combobox').width() - 2);
*/
            }
        }
    }

    AccordionDirective.$inject = ['$timeout'];

    angular.module('prerial').directive({preAccordion: AccordionDirective});

})();