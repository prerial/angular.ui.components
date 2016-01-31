/**
 * Created by Mikhail on 1/18/2016.
 */
(function () {
    'use strict';

    function TabsContainerController(scope) {

        scope.tabsitems = [];

        this.setTab = function(tab) {
            scope.tabsitems.push(tab);
        };

        scope.selectTab = function(tab){
            scope.tabsitems.forEach(function(item, idx){
                scope.tabsitems[idx].selected = tab.index === scope.tabsitems[idx].index;
                if(tab.index == idx){
                    item.scope.selectPane();
                }else{
                    item.scope.hidePane();
                }
            });
        };
    }

    TabsContainerController.$inject = ['$scope'];

    angular.module('prerial').controller('TabsContainerController', TabsContainerController);

})();