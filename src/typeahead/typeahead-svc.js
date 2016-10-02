/**
 * Created by Mikhail on 10/1/2016.
 */
(function (angular) {
    'use strict';

    function typeaheadService($http) {

        return {
            get: function(url) {
                return $http.get(url).then(function(resp) {
                    return resp.data;
                });
            }
        };
    }

    typeaheadService.$inject = ['$http'];

    angular.module('prerial').factory('typeaheadService', typeaheadService);

})(angular);
