(function(window, angular) {
	'use strict';

	angular.module('prerial')
	.config( ['$routeProvider', 'navigation', function($routeProvider, navigation) {
			var navArray = navigation;
debugger
			$routeProvider

				.when(navigation['Home'].route, navigation['Home'].config)
				.when(navigation['DataProvider'].route, navigation['DataProvider'].config)
				.when(navigation['Modal'].route, navigation['Modal'].config)
				.when(navigation['ViewportResizer'].route, navigation['ViewportResizer'].config)
				.when(navigation['Notifications'].route, navigation['Notifications'].config)
				.when(navigation['Combobox'].route, navigation['Combobox'].config)
				.when(navigation['Tooltip'].route, navigation['Tooltip'].config)
				.when(navigation['GridTag'].route, navigation['GridTag'].config)

/*
				.when('/data-provider', {controller:'dataProviderController', templateUrl:'partials/data-provider.html'})
				.when('/modal', {controller:'modalCtrl', templateUrl:'partials/modal.html'})
				.when('/viewport-resizer', {controller:'viewPortResizeCtrl', templateUrl:'partials/viewport-resizer.html'})
				.when('/notifications', {controller:'notificationsCtrl', templateUrl:'partials/notifications.html'})
				.when('/combobox', {controller:'comboboxCtrl', templateUrl:'partials/combobox.html'})
				.when('/tooltip', {controller:'tooltipCtrl', templateUrl:'partials/tooltip.html'})
				.when('/gridtag', {controller:'gridtagCtrl', templateUrl:'partials/gridtag.html'})
*/

				.otherwise({
					redirectTo: navigation['Home'].route
				});

    }]);

})(window, window.angular);



