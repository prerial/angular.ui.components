(function() {
	'use strict';

	angular.module('prerial')
	.directive('dtTest', function() {

		return {
			restrict: 'E',
			template: '<ul ng-click="setLeftMenu($event)"><li ng-repeat="item in pizzaData"><div>{{item.Title}}</div></li></ul>',
			link: function(scope){


			}
		}
    })


})();



