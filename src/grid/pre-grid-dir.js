(function (angular) {
    'use strict';

	angular.module('prerial').run(['$templateCache', function($templateCache) {
		'use strict';

		$templateCache.put('templates/prerial-grid.html',
            '<div></div>'
		);
	}]);

    angular.module('prerial').directive('prerialGrid', function() {

		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			templateUrl: 'templates/prerial-grid.html',
			controller: 'preGridController',
			scope: {
                //Data
                data: '=src',
                //Properties
                id: '@',
                caption: '@',
                width: '@',
                height: '@',
                //Behavior
                sortable: '@', //true|false|multi
                editable: '@',
                resizable: '@',
                //UI features
                showTotals: '@',
                showPageSize: '@',
                showPagination: '@',
                showCaption: '@',
                pageSize: '@',
                page: '@',
                pagination: '@', //true|false
                rowCount: '@',
                resultsPerPage: '@',
                //Events
                onRowSelect: '&',
                onRowClick: '&',
                onRowUnselect: '&',
                onRowSelectionChange: '&',
                onCellClick: '&',
                onCellMouseover: '&',
                onCellMouseout: '&',
                onSort: '&',
                onPageChange: '&',
                onPageSizeChange: '&',
                onPrevPage: '&',
                onNextPage: '&',
                onColumnResize: '&'
            },
            compile: function () {

                return function link(scope, elem, attrs, Grid, linker) {
                    var transcludedContent;

                    linker(scope, function (clone) {
                        elem.append(clone);
                        transcludedContent = clone;
                    });

                   scope.$$postDigest(function () {
                        /**
                         * Because transcluded content is only used for configuration purposes, it needs to be explicitly
                         * cleaned up to avoid memory leaks. To clean up a compiled template we call remove method on it.
                         */
						$('#trans-temp').remove();
						transcludedContent.remove();
						transcludedContent = null;
                    });

                   Grid.buildTable(Grid.elid, Grid.columns);

                }
            }
		}
});

}(angular));


