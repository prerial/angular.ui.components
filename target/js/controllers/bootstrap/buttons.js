/**
 * Created by Mikhail on 1/16/2016.
 */
(function() {
    'use strict';

//    angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
    angular.module('prerial').controller('ButtonsCtrl', function ($scope) {

        $scope.singleModel = 1;

        $scope.radioModel = 'Middle';

        $scope.checkModel = {
            left: false,
            middle: true,
            right: false
        };

        $scope.checkResults = [];

        $scope.$watchCollection('checkModel', function () {
            $scope.checkResults = [];
            angular.forEach($scope.checkModel, function (value, key) {
                if (value) {
                    $scope.checkResults.push(key);
                }
            });
        });
    });


})();
