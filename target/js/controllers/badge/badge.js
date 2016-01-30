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

        }]);

})();
