(function(window, angular) {
	'use strict';

	angular.module('prerial')
	.config( ['$routeProvider', 'navigation', function($routeProvider, navigation) {

			$routeProvider

				.when(navigation['Home'].route, navigation['Home'].config)
				.when(navigation['DataProvider'].route, navigation['DataProvider'].config)
				.when(navigation['Modal'].route, navigation['Modal'].config)
				.when(navigation['ViewportResizer'].route, navigation['ViewportResizer'].config)
				.when(navigation['Notifications'].route, navigation['Notifications'].config)
				.when(navigation['Combobox'].route, navigation['Combobox'].config)
				.when(navigation['Tooltip'].route, navigation['Tooltip'].config)
				.when(navigation['GridTag'].route, navigation['GridTag'].config)
                .otherwise({
					redirectTo: navigation['Home'].route
				});

    }]);

})(window, window.angular);



