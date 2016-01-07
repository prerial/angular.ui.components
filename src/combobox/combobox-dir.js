(function (document, angular) {
    'use strict';

    function ComboBoxDirective($parse) {

        return {
            restrict: 'E',
            require: ['?ngModel'],
            scope: {
                src: '='
            },
            templateUrl: 'src/combobox/combobox.html',
            controller: 'ComboBoxController',
            replace: true,
            link: function (scope, elem, attrs, controllers) {

                var input = elem.find('input').val(attrs.placeholder),
                    list = $parse( attrs.src ),
                    displayText = $parse( attrs.display),
                    ngModelController = controllers[0];

                ngModelController.$render = renderCurrentValue;
                elem.find('.pre-dropdown-menu').width(elem.find('.pre-combobox').width()-2);

                scope.comboShow = false;
                elem.find('.pre-combobox-toggle').on("click", function handleClickEvent( event ) {
                    if (scope.comboShow){
                        scope.comboShow = false;
                    }else{
                        scope.comboShow = true;
                    }
                    scope.$apply();
                });

                scope.$watch(function (){ return ngModelController.$modelValue;}, function (newValue) {
                    ngModelController.$render();
                    console.log('Watching ngModel: ' + displayText(newValue));
                })

                scope.itemSelect = function (item) {
                    ngModelController.$setViewValue( item );
                    scope.comboShow = false;
                }

                function renderCurrentValue() {
                    scope.matches.length = 0;
                    if(ngModelController.$viewValue && ngModelController.$viewValue[attrs.field]) {
                        scope.matches.push(ngModelController.$viewValue);
                        scope.selectedValue = ngModelController.$viewValue[attrs.field];
                        input.val(displayText(ngModelController.$viewValue));
                    }else {
                        input.val(attrs.placeholder);
                    }
                }
            }
        };
    }

    angular.module('prerial').directive({preCombobox: ComboBoxDirective});

})(document, angular);

