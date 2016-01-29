/**
 * Created by Mikhail on 1/28/2016.
 */
(function() {
    'use strict';

    angular.module('prerial').directive('diceSwitch', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            require: ['diceSwitch', 'ngModel'],
            scope: {
                diceSwitchOnText: '@',
                diceSwitchOffText: '@',
                diceSwitchAnimated: '@',
                ngModel: '='
            },
            template: '<div class="toggle-switch"' +
            'data-ng-class="{\'toggle-switch-animated\': diceSwitchAnimated !== undefined && diceSwitchAnimated !== \'false\',' +
            '{{switchCtrl.activeClass}}: ngModel === getTrueValue()}">' +
            '<div class="toggle-switch-track">' +
            '<div class="toggle-switch-label-on" data-ng-bind="diceSwitchOnText"></div>' +
            '<div class="toggle-switch-label-off" data-ng-bind="diceSwitchOffText"></div>' +
            '</div>' +
            '<div tabindex="0" data-dice-switch-handle class="toggle-switch-handle"></div>' +
            '</div>',
            replace: true,
            controller: 'DiceSwitchController',
            controllerAs: 'switchCtrl',
            link: {
                pre: function (scope, element, attributes, controllers) {
                    var switchCtrl = controllers[0],
                        ngModelCtrl = controllers[1],
                        handle = element.children()[1];

                    if (angular.isDefined(attributes.diceSwitchDraggable)) {
                        scope.diceSwitchDraggable = attributes.diceSwitchDraggable;
                    }

                    scope.getTrueValue = function () {
                        return getCheckboxValue('diceTrueValue', attributes.diceTrueValue, true);
                    }

                    scope.getFalseValue = function () {
                        return getCheckboxValue('diceFalseValue', attributes.diceFalseValue, false);
                    };

                    function getCheckboxValue(attributeName, attributeValue, defaultValue) {
                        return parseConstantExpr($parse, scope, attributeName, attributeValue, defaultValue)
                        //var val = scope.$eval(attributeValue);
                        //return angular.isDefined(val) ? val : defaultValue;
                    }

                    switchCtrl.toggleValue = function (value) {
                        var newViewValue;
                        if (typeof value === 'boolean') {
                            newViewValue = value ? scope.getTrueValue() : scope.getFalseValue();
                        } else {
                            newViewValue = element.hasClass(switchCtrl.activeClass) ? scope.getFalseValue() : scope.getTrueValue();
                        }
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(newViewValue);
                            //ngModelCtrl.$render();
                        });
                    };

                    //model -> UI
                    ngModelCtrl.$render = function () {
                        //element.toggleClass(switchCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.getTrueValue()));
                    };

                    //ui -> model
                    element.on(switchCtrl.toggleEvent, function () {
                        //console.log(switchCtrl.toggleEvent + ' events fired for switch');
                        switchCtrl.toggleValue();
                        handle.focus();
                    });
                }
            }
        };
    }]);





}());


