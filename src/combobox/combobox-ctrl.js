(function () {
    'use strict';

    function ComboBoxController(scope, attrs, elem, parse) {
        var ngModel, matches = [],
            input = elem.find('input'),
            displayText = parse(attrs.display);

        this.init = function(ctrl) {
            ngModel = ctrl;
            ngModel.$render = onRender;
        };

        scope.isActive = function (item) {
            var isActive = false;
            if (matches.length === 1 && scope.selectedValue === item[attrs.field] ) {
                isActive = true;
            }
            return isActive;
        };

        scope.$watch(function (){ return ngModel.$viewValue;}, function (newValue) {
            ngModel.$render();
            console.log('Watching ngModel: ' + displayText(newValue));
        });

        scope.itemSelect = function (item) {
            ngModel.$setViewValue(item);
            scope.comboShow = false;
        };

        function onRender() {
            matches.length = 0;
            if(ngModel.$viewValue && ngModel.$viewValue[attrs.field]) {
                matches.push(ngModel.$viewValue);
                scope.selectedValue = ngModel.$viewValue[attrs.field];
                input.val(displayText(ngModel.$viewValue));
            }else {
                input.val(attrs.placeholder);
            }
        }

    }

    ComboBoxController.$inject = ['$scope', '$attrs', '$element', '$parse'];

    angular.module('prerial').controller('ComboBoxController', ComboBoxController);

})();