(function(window, angular, undefined) {
	'use strict';

	angular.module('prerial')
	.directive('dtTest', function(dataActionService) {

		return {
			restrict: 'E',
			template: '<ul ng-click="setLeftMenu($event)"><li ng-repeat="item in pizzaData"><div>{{item.Title}}</div></li></ul>',
			link: function(scope){


			}
		}
    });


})(window, window.angular);



