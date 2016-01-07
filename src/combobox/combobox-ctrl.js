(function (document, angular) {
    'use strict';

    function ComboBoxController(scope, attrs) {
        scope.matches = [];

        scope.isActive = function (item) {
            var isActive = false;
            if (scope.matches.length === 1 && scope.selectedValue === item[attrs.field] ) {
                isActive = true;
            }
            return isActive;
        };

        scope.$on('$destroy', function () {
//            $scope.someElement.remove();
//            currentWindow.off('resize.' +  $scope.$id);
        });
    }

    ComboBoxController.$inject = ['$scope', '$attrs'];

    angular.module('prerial').controller('ComboBoxController', ComboBoxController);

})(document, angular);