/**
 * Created by Mikhail on 1/28/2016.
 */
(function() {
    'use strict';

    angular.module('prerial')
        .controller('SwitchCtrl', ['$scope', function(scope) {

            scope.switchIsOn = false;
            scope.switchOn = false;

            scope.toggleSwitchCheck = function() {
                scope.switchOn = !scope.switchOn;
            };
            scope.toggleSwitchState = function() {
                scope.switchIsOn = !scope.switchIsOn;
            };

        }]);

})();

