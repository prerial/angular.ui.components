(function(window, angular) {
	'use strict';

	angular.module('prerial')
	.directive('dtDataProvider', function() {

		return {
			restrict: 'E',
            scope: true,
            controller: 'dtDataProviderController',

			link: function(scope, elem, attr){

				scope.$parent.dataProviderId = attr.id;
				scope.$parent[attr.id] = null;

			}
		}
    });

})(window, window.angular);



