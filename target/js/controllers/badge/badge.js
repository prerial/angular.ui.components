/**
 * Created by Mikhail on 1/29/2016.
 */
(function() {
    'use strict';

    angular.module('prerial')
        .controller('BadgeCtrl', ['$scope','$log', function(scope, $log) {

            scope.notification3 = 0;
            scope.notification1 = 5;
            scope.notification2 = 11;

            scope.rate = 0;
            scope.rate1 = 0;
            scope.rate2 = 0;
            scope.isRated = [ true, true, true, true, false ];
            scope.isRated1 = [ true, true, false, false ];
            scope.isRated2 = [ true, true, true, true, true, true, true, true, true, true ];

            scope.setRating = function(evt) {
                var idx = evt.target.dataset.index;
                scope.isRated.forEach(function(value, index){
                    index <= +idx? scope.isRated[index] = true : scope.isRated[index] = false;
                })
            };

            scope.getRate = function(arr, disval) {
                if(!arr) return;
                scope[disval] = arr.length;
                arr.forEach(function(value, index){
                    if(value === true){
                        scope[disval] = index + 1;
                    }
                });
            };

            scope.customClick = function() {
                $log.log('Custom click event handler fired');
            };
            function getRandomIntInclusive(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            scope.setNotifications = function() {
                scope.notification3 = getRandomIntInclusive(0, 20);
                scope.notification1 = getRandomIntInclusive(0, 8);
                scope.notification2 = getRandomIntInclusive(0, 10);

            };

        }]);

})();
