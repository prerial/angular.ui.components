/**
 * Created by Mikhail on 10/1/2016.
 */
(function (angular) {
    'use strict';
debugger
    angular.module('prerial').directive('preTypeahead',['$timeout', function ($timeout) {
debugger
//        typeAhead.directive('typeahead', function($timeout) {
        return {
            restrict: 'AEC',
            templateUrl: 'src/typeahead/typeahead.html',
//            controller:'TypeAheadController',
            require: ['?ngModel'],
//            replace:true,
            scope: {
                items: '=',
                prompt:'@',
                title: '@',
                subtitle:'@',
                model: '=',
                onSelect:'&'
            },
            link:function(scope,elem,attrs){
debugger
                scope.handleSelection=function(selectedItem){
                    scope.model=selectedItem;
                    scope.current=0;
                    scope.selected=true;
                    $timeout(function(){
                        scope.onSelect();
                    },200);
                };
                scope.current=0;
                scope.selected=true;
                scope.isCurrent=function(index){
                    return scope.current==index;
                };
                scope.setCurrent=function(index){
                    scope.current=index;
                };
            }
        }
    }]);

    })(angular);
