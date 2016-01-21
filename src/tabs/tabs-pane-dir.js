/**
 * Created by Mikhail on 1/18/2016.
 */
(function () {
    'use strict';

    function TabsPaneDirective() {

        return {
            restrict: 'E',
            require: ['^preTabsContainer'],
            templateUrl: 'src/tabs/tabs-pane.html',
            replace: true,
            scope:true,
            transclude: true,
            link: function (scope, elem, attrs, controllers) {

                scope.title = attrs.title;
                scope.selected = attrs.selected === 'true';
                var tabsController = controllers[0];
                var tabitem =  {
                    title:attrs.title,
                    index:attrs.index,
                    content:elem.html(),
                    disabled:attrs.disabled,
                    selected:scope.selected
                };

                tabsController.setTab(tabitem);

                scope.hidePane = function(){
                    scope.selected = false;
                };

                scope.selectPane = function(){
                    scope.selected = true;
                };
            }
        }
    }

    angular.module('prerial').directive({preTabsPane: TabsPaneDirective});

})();
