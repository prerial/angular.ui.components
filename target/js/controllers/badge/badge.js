/**
 * Created by Mikhail on 1/29/2016.
 */
(function() {
    'use strict';

    angular.module('prerial')
        .controller('BadgeCtrl', ['$scope','$log', function(scope, $log) {

            scope.notification3 = 0;
            scope.notification1 = 5;
            scope.notification2 = 11;

            scope.customClick = function() {
                $log.log('Custom click event handler fired');
            };
            function getRandomIntInclusive(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            scope.setNotifications = function() {
                scope.notification3 = getRandomIntInclusive(0, 20);
                scope.notification1 = getRandomIntInclusive(0, 8);
                scope.notification2 = getRandomIntInclusive(0, 10);

            };

        }]);

})();
