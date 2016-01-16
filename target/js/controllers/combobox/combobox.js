/**
 * Created by Mikhail on 1/16/2016.
 */
(function() {
    'use strict';

    angular.module('prerial').controller('comboboxCtrl', ['$scope', '$log', function(scope, $log) {
        scope.employees = [
            {
                id: 1,
                name: "Sam",
                title: "VP"
            },
            {
                id: 2,
                name: "Felix",
                title: "Node MQ"
            },
            {
                id: 3,
                name: "Wess",
                title: "Charts Pro"
            },
            {
                id: 4,
                name: "Kevin",
                title: "JS Pro"
            }
        ];

        scope.onSelect = function (value, data) {
            $log.info('Combobox selected:', value, data);
        };

        scope.onChange = function (value) {
            $log.info('Combobox changed:', value);
        };

    }]);
})();
