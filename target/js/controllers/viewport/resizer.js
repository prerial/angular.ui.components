/**
 * Created by Mikhail on 1/16/2016.
 */
(function() {
    'use strict';

    angular.module('prerial').controller('viewPortResizeCtrl',['$rootScope', function($rootScope) {

         $rootScope.$on('resized', function(){
            $rootScope.$broadcast('rootresized', []);
        });

        $rootScope.$watch(function (){ return $rootScope.resized;}, function (newValue) {
            $rootScope.$broadcast('rootresized', []);
        });

    }]);

})();
