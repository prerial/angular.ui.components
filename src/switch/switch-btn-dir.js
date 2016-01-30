/**
 * Created by Mikhail on 1/28/2016.
 */
(function() {
    'use strict';

    angular.module('prerial').directive('preSwitchButton',function () {

        return {
            restrict: "E",
            replace: true,
            require: "ngModel",
            scope: {
                textOn: "@",
                textOff: "@"
            },
            templateUrl: 'src/switch/switch-btn.html',
            link: function(scope, element, attributes, ngModelController) {

                scope.switchIsOn = false;

                ngModelController.$render = function() {
                    scope.switchIsOn = ngModelController.$viewValue;
                };

                element.on( "click", function( event ) {
                    var target = angular.element( event.target );
                    scope.switchIsOn = target.parent().hasClass( "label-on" );
                    ngModelController.$setViewValue( scope.switchIsOn );
                    scope.$apply()
                });

            }
        }

    });

}());

