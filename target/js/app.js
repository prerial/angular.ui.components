(function(window, angular) {
	'use strict';

	angular.module('prerial')
	.config( function($routeProvider) {

			$routeProvider
				.when('/', {controller:'appController', template:'<h2>Controllers Home</h2>'})
				.when('/data-provider', {controller:'dataProviderController', templateUrl:'partials/data-provider.html'})
				.when('/modal', {controller:'modalCtrl', templateUrl:'partials/modal.html'})
				.when('/viewport-resizer', {controller:'viewPortResizeCtrl', templateUrl:'partials/viewport-resizer.html'})
				.when('/notifications', {controller:'notificationsCtrl', templateUrl:'partials/notifications.html'})
				.otherwise({
					redirectTo: '/data-provider'
				});

    });

})(window, window.angular);



