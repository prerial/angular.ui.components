/**
 * Created by Mikhail on 1/16/2016.
 */
/**
 * Created by Mikhail on 1/16/2016.
 */
(function() {
    'use strict';

    angular.module('prerial').controller('modalCtrl', ['$scope', 'prerialModal',

        function (scope, prerialModal) {
            var modalWindow = null;
            scope.showModal = function () {
                modalWindow = new prerialModal();
                modalWindow.show();
            };
            scope.$on("destroy:modal", function handleDestroyEvent() {
                modalWindow = null;
            });
        }]);

})();