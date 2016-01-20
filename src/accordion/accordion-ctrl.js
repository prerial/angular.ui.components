/**
 * Created by Mikhail on 1/17/2016.
 */
(function () {
    'use strict';

    function AccordionController(elem) {

        this.hide = function(el, index){
            var selectedScope = null;
            angular.element(elem).children().each(function(idx, item){
                console.log(angular.element(item.children[1]).scope().accordionPaneShow);
                if(index != idx) {
                    angular.element(item.children[1]).scope().accordionPaneShow = false;
                }else{
                    selectedScope = angular.element(item.children[1]).scope();
                }
            });
            selectedScope.accordionPaneShow = true;
         };
    }

    AccordionController.$inject = ['$element'];

    angular.module('prerial').controller('AccordionController', AccordionController);

})();
