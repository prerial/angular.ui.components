/**
 * Created by Mikhail on 1/16/2016.
 */
(function() {
    'use strict';

    angular.module('prerial').controller('gridtagCtrl', ['$scope', function($scope) {

        $scope.buildGrid = function(elemid, options, data){
            var params = {
                elid:elemid,
                fields:[],
                headers:[],
                coltypes:[],
                colwidth:[],
                data:data.data.Deals
            };

            options.map(function(item) {
                params.fields.push(item.field);
                params.headers.push(item.title);
                params.coltypes.push(item.format);
                params.colwidth.push(parseInt(item.width));
            });

            var mygrid = new Grid();
            mygrid.init(params);
        }
    }]);

})();
