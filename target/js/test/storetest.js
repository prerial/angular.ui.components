/**
 * Created by Mikhail on 1/27/2016.
 */
(function() {
    'use strict';

    angular.module('appStore', []);

})();

(function() {
    'use strict';

    angular.module('appStore')
        .controller('appStoreController', function($scope, productsFactory){

            $scope.products = productsFactory;

            $scope.saveProduct = function(){
                var product = {
                    name: $scope.productForm.name,
                    description: $scope.productForm.description,
                    price: $scope.productForm.price
                };
                productsFactory.save(product);
            };

            $scope.removeProduct = function(idx){
                productsFactory.remove(idx);
            };

        });

})();

(function() {
    'use strict';

    angular.module('appStore').factory('productsFactory', function($http) {

        var service = {};

        service.load = function() {
            var url = 'data/storetest.js';
            $http.get(url).
                success(function(resp) {
                    service.data = resp;
                })
                .error(function(data) {
                    console.log(data);
                });
        };

        service.save = function(product) {
            // Server call then load
            service.data.push(product);
        };

        service.remove = function(idx) {
            // Server call then load
            service.data.splice(idx, 1);
        };

        service.load();
        return service;
    })

})();


