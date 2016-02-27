/**
 * Created by Mikhail on 2/27/2016.
 */
(function () {
    'use strict';

    angular.module('prerial').directive('preRating', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                isRated: '='
            },
            templateUrl: 'src/badge/rating.html',
            link: function(scope, elem, attrs) {

                scope.setRating = function (evt) {
                    var idx = evt.target.dataset.index;
                    scope.isRated.forEach(function(value, index){
                        if(index <= +idx){
                            scope.isRated[index] = true;
                        }else{
                            scope.isRated[index] = false;
                        }
                    })
                };
            }
        }
    });

})();
