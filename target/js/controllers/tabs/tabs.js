/**
 * Created by Mikhail on 1/18/2016.
 */
(function () {
    'use strict';

    angular.module('prerial').controller('TabsCtrl', ['$scope', '$log', function(scope, $log) {

        scope.showFlag = false;

        scope.onTabOpen = function(selectedTab){
            $log.log("Tab -> index: " + selectedTab.index + " , title: " + selectedTab.title);
        };

        scope.hideShowTab = function() {
            scope.showFlag? scope.showFlag = false : scope.showFlag = true;
        }

    }]);

})();
