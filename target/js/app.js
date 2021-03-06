(function(window, angular) {
	'use strict';

	angular.module('prerial')
	.config( ['$locationProvider', '$routeProvider', 'Navigation', function($locationProvider, $routeProvider, navigation) {

			$locationProvider.hashPrefix('');
			$routeProvider

				.when(navigation['Home'].route, navigation['Home'].config)
				.when(navigation['DataProvider'].route, navigation['DataProvider'].config)
				.when(navigation['Modal'].route, navigation['Modal'].config)
				.when(navigation['ViewportResizer'].route, navigation['ViewportResizer'].config)
				.when(navigation['Notifications'].route, navigation['Notifications'].config)
				.when(navigation['Combobox'].route, navigation['Combobox'].config)
				.when(navigation['Tooltip'].route, navigation['Tooltip'].config)
				.when(navigation['Typeahead'].route, navigation['Typeahead'].config)
				.when(navigation['GridTag'].route, navigation['GridTag'].config)
				.when(navigation['Buttons'].route, navigation['Buttons'].config)
				.when(navigation['Form'].route, navigation['Form'].config)
				.when(navigation['Form1'].route, navigation['Form1'].config)
				.when(navigation['Form2'].route, navigation['Form2'].config)
				.when(navigation['Accordion'].route, navigation['Accordion'].config)
				.when(navigation['Tabs'].route, navigation['Tabs'].config)
				.when(navigation['ContextMenu'].route, navigation['ContextMenu'].config)
				.when(navigation['Switch'].route, navigation['Switch'].config)
				.when(navigation['Badge'].route, navigation['Badge'].config)
				.when(navigation['Icons'].route, navigation['Icons'].config)
				.when(navigation['Transitions'].route, navigation['Transitions'].config)
				.otherwise({
					redirectTo: navigation['Home'].route
				});

    }]);

})(window, window.angular);



