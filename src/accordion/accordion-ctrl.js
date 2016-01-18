/**
 * Created by Mikhail on 1/17/2016.
 */
(function () {
    'use strict';

    function AccordionController(scope, attrs, elem, parse) {

        this.hide = function(){
            angular.element(elem).children().each(function(idx, item){
                angular.element(item.children[1]).scope().hidePane();
            });
        };
    }

    AccordionController.$inject = ['$scope', '$attrs', '$element', '$parse'];

    angular.module('prerial').controller('AccordionController', AccordionController);

})();
