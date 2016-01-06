(function (document, angular) {
    'use strict';

    function ComboBoxDirective() {

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
                scope.comboShow = false;
                scope.inputModel = controllers[0];
                elem.find('.pre-dropdown-menu').width(elem.find('.pre-combobox').width()-2);
                elem.find('.pre-combobox-toggle').on('click', function () {
                    if(scope.comboShow){
                        scope.comboShow = false;
                    }else{
                        scope.comboShow = true;
                    }
                    scope.$apply();
                });
            }
        };
    }

    angular.module('prerial').directive({preCombobox: ComboBoxDirective});

})(document, angular);

