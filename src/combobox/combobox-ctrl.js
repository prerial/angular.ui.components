(function (document, angular) {
    'use strict';

    function ComboBoxController($scope, $attr) {

        $scope.matches = [];
        /**
         * Selects an item from the menu
         */
        $scope.itemSelect = function (item) {
            $scope.selectedValue = item[$attr.field];
            $scope.matches.length = 0;
            $scope.matches.push(item);
            $scope.comboShow = false;
        };

        $scope.isActive = function (item) {
            var isActive = false;
            if ($scope.matches.length === 1 && $scope.selectedValue === item[$attr.field] ) {
                isActive = true;
            }
            return isActive;
        };

        $scope.$on('$destroy', function () {
//            $scope.menuElement.remove();
//            currentWindow.off('resize.' +  $scope.$id);
        });
     }

    ComboBoxController.$inject = ['$scope', '$attrs'];

    angular.module('prerial').controller('ComboBoxController', ComboBoxController);
})(document, angular);