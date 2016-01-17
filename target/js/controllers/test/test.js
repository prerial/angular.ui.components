/**
 * Created by Mikhail on 1/4/2016.
 */
(function() {
    'use strict';

    angular.module('prerial')
        .directive('dtTest', function() {

            return {
                restrict: 'E',
                template: '<ul ng-click="setLeftMenu($event)"><li ng-repeat="item in pizzaData"><div>{{item.Title}}</div></li></ul>',
                link: function(scope){

                }
            }
        });

})();

function disableSelection(target){
    if (typeof target.onselectstart!="undefined") //IE route
        target.onselectstart=function(){return false}
    else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
        target.style.MozUserSelect="none"
    else //All other route (ie: Opera)
        target.onmousedown=function(){return false}
    target.style.cursor = "default"
}

function getElementLeft(el){
    var ol = el.offsetLeft;
    while ((el = el.offsetParent) != null) { ol += el.offsetLeft; }
    return ol;
}
