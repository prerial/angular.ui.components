(function() {
	'use strict';

	angular.module('prerial')
	.directive('dtAction', function(dataActionService) {

		return {
			restrict: 'E',
            require: ['?^dtDataProvider'],
            scope: {
                name: '@',
                method: '@',
                url: '@',
                schema: '@',
                params: '@query',
                pageSize: '@',
                remoteProcessing: '@',
                restful: '@',
                onLoad: '&',
                onBeforeLoad: '&',
                onError: '&'
            },
            link: function(scope, elem, attr, ctl){
				var param = {
					name: attr.name || null,
					method: attr.method || null,
					type: attr.type || null,
					url: attr.url || null,
					schema: attr.schema || null,
					params: attr.query || null,
					pageSize: attr.pageSize || null,
					remoteProcessing: attr.remoteProcessing || null,
					restful: attr.restful || null
				};
				scope.items = dataActionService.load(param)
				.then(function (args) {
					var out = args.data;
					if (param.schema) {
						var arr = param.schema.split('.');
						for (var i = 0; i < arr.length; i++){
							out = out[arr[i]]
						}
					}
					ctl[0].setData({data: {action: attr.name, output: out}});
//					scope.onLoad({data: {name: attr.name, data: out}});
				})
			}
		}
    });


})();



