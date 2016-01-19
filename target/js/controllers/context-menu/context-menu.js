(function () {
    'use strict';

    angular.module('prerial').controller('ContextMenuCtrl', ContextMenuController);


    ContextMenuController.$inject = ['$scope'];

    function ContextMenuController(scope) {

        scope.Test = "Hello world!";
        scope.Test1 = "Hello world from Context menu!";
    }

})();