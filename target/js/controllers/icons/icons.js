/**
 * Created by Mikhail on 2/26/2016.
 */
(function() {
    'use strict';

    angular.module('prerial').controller('IconsCtrl', ['$scope',

        function (scope) {
            scope.hamburgerCtr = 0;
            scope.toggleHamburger = function(){
                scope.hamburgerCtr++;
            }
        }]);

})();