(function(window, angular) {
	'use strict';

	angular.module('prerial')
	.config( function($routeProvider) {

			$routeProvider
				.when('/home', {controller:'appController', template:'<h2 class="examples-pane">Controllers Home</h2>'})
				.when('/data-provider', {controller:'dataProviderController', templateUrl:'partials/data-provider.html'})
				.when('/modal', {controller:'modalCtrl', templateUrl:'partials/modal.html'})
				.when('/viewport-resizer', {controller:'viewPortResizeCtrl', templateUrl:'partials/viewport-resizer.html'})
				.when('/notifications', {controller:'notificationsCtrl', templateUrl:'partials/notifications.html'})
				.when('/combobox', {controller:'comboboxCtrl', templateUrl:'partials/combobox.html'})
				.when('/tooltip', {controller:'tooltipCtrl', templateUrl:'partials/tooltip.html'})
				.when('/gridtag', {controller:'gridtagCtrl', templateUrl:'partials/gridtag.html'})
				.otherwise({
					redirectTo: '/home'
				});

    });

})(window, window.angular);



