/**
 * Created by Mikhail on 10/1/2016.
 */
(function () {
    'use strict';

    angular.module('prerial').controller('TypeAheadController',function($scope,dataFactory){
        dataFactory.get('data/states.js').then(function(data){
            $scope.items=data;
        });
        $scope.name="";
        $scope.onItemSelected=function(){
            console.log('selected='+$scope.name);
        }
    });

})();