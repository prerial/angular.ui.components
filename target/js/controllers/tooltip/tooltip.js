/**
 * Created by Mikhail on 1/16/2016.
 */
(function() {
    'use strict';

    angular.module('prerial').controller('tooltipCtrl', ['$scope', '$log', function(scope, $log) {

        scope.items = [
            {text:'Scope array Item-1', description:'Item-1 Tooltip [1]'},
            {text:'Scope array Item-2', description:'Item-2 Tooltip [2]'}
        ];

    }]);
})();
