/**
 * Created by Mikhail on 1/29/2016.
 */
(function() {
    'use strict';

    angular.module('prerial')
        .controller('BadgeCtrl', ['$scope','$log', function(scope, $log) {

            scope.notification1 = 0;
            scope.notification2 = 10;
            scope.notification3 = 5;

            scope.customClick = function() {
                $log.log('Custom click event handler fired');
            };

        }]);

})();
