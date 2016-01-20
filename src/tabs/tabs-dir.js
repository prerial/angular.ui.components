/**
 * Created by Mikhail on 1/18/2016.
 */

(function () {
    'use strict';

    function TabsContainer() {

        return {
            restrict: 'E',
            require: ['preTabsContainer'],
            scope: {
                src: '='
            },
            templateUrl: 'src/tabs/tabs.html',
            controller: 'TabsContainerController',
            replace: true,
            transclude: true
        }
    }

    angular.module('prerial').directive({preTabsContainer: TabsContainer});

})();

