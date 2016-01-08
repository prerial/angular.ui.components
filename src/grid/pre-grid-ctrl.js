'use strict';

angular.module('prerial').controller('preGridController', ['$scope', '$http', '$log', function ($scope, $http, log) {
    this.columns = [];
    this.elid = $scope.id;
    this.buildTable = function (elid, cols) {
        var responsePromise = $http.get("data/griddata.js");
        responsePromise.success(function (data, status, headers, config) {
            $scope.$parent.buildGrid(elid, cols, data)
        });
        responsePromise.error(function (data, status, headers, config) {
            alert("AJAX failed!");
        });
    };
}]);