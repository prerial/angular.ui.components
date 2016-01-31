(function (document, angular) {
    'use strict';

    function ComboBoxDirective() {

        return {
            restrict: 'E',
            require: ['?ngModel','preCombobox'],
            scope: {
                src: '=',
                field: '@'
            },
            templateUrl: 'src/combobox/combobox.html',
            controller: 'ComboBoxController',
            replace: true,
            link: function (scope, elem, attrs, controllers) {

                var ngModelController = controllers[0],
                    comboboxController = controllers[1];

                comboboxController.init(ngModelController);
                scope.comboShow = false;
                elem.find('.pre-dropdown-menu').width(elem.find('.pre-combobox').width() - 2);

            }
        }
    }

    angular.module('prerial').directive({preCombobox: ComboBoxDirective});

})(document, angular);