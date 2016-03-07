/**
 * Created by Mikhail on 3/6/2016.
 */
(function() {
    'use strict';

    angular.module('prerial').directive('preSwitchCheckbox',function () {

        return {
            restrict: "E",
            replace: true,
            require: "ngModel",
            scope: {
                textOn: "@",
                textOff: "@"
            },
            templateUrl: 'src/switch/switch-checkbox.html',
            link: function(scope, element, attributes, ngModelController) {

                scope.internalSwitchOn = false;
                ngModelController.$render = function() {
                    scope.internalSwitchOn = scope.switchOn = ngModelController.$viewValue;

                };

                element.on( "click", function( event ) {
                    var target = angular.element( event.target).parent().find('input[type=checkbox]');
                    ngModelController.$setViewValue( target[0].checked );
                });

            }
        }

    });

}());
