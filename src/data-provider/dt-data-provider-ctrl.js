(function (w, angular) {
    'use strict';

    angular.module('prerial').controller('dtDataProviderController', DataProviderController);

    function DataProviderController($scope) {
        var scope = $scope;

		this.setData = function(params){
			scope.$parent[scope.dataProviderId] = params.data.output;
		}
    }

})(window, window.angular);


