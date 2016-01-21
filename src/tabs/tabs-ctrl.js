/**
 * Created by Mikhail on 1/18/2016.
 */
(function () {
    'use strict';

    function TabsContainerController(scope, elem) {
        scope.tabsitems = [];

        this.setTab = function(tab) {
            scope.tabsitems.push(tab);
        };

        scope.selectTab = function(tab){
            var tabArray =  angular.element(elem).find('.tab-content').children();
            tabArray.each(function(idx, item){
                scope.tabsitems[idx].selected = tab.index === scope.tabsitems[idx].index;
                angular.element(item).scope().hidePane();
                if(idx === tabArray.length-1){
                    angular.element(tabArray[tab.index]).scope().selectPane();
                }
            });
        };
    }

    TabsContainerController.$inject = ['$scope', '$element'];

    angular.module('prerial').controller('TabsContainerController', TabsContainerController);

})();