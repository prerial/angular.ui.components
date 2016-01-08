(function (angular) {
    'use strict';

    angular.module('prerial').directive('prerialColumn', function() {
		return {
			restrict: 'E',
			replace: true,
			require: '^prerialGrid',
			link: function(scope, elem, attrs, parentCtrl) {
				parentCtrl.columns.push( {title: attrs.title, field: attrs.field, width: attrs.width, format: attrs.format});
			}
		};
	});

}(angular));


