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
            var tabarr =  angular.element(elem).find('.tab-content').children();
            tabarr.each(function(idx, item){
                angular.element(item).scope().hidePane();
            });
            angular.element(tabarr[tab.index]).scope().selectPane();
        };
    }

    TabsContainerController.$inject = ['$scope', '$element'];

    angular.module('prerial').controller('TabsContainerController', TabsContainerController);

})();