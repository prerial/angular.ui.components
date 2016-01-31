/**
 * Created by Mikhail on 1/29/2016.
 */
(function () {
    'use strict';

    angular.module('prerial').directive('preBadge', function () {
        return {
            restrict: 'E',
            replace: true,
            require: 'ngModel',
            scope: {
                notification: '=',
                className: '@',
                onClick: '&'
            },
            templateUrl: 'src/badge/badge.html',
            link: function(scope, element, attributes, ngModelController) {

                ngModelController.$render = function() {
                    scope.notification = ngModelController.$viewValue;
                    scope.badgeLabel = scope.notification > 9 ? "9+" : scope.notification;
                };

                scope.handleClick = function () {
                    scope.notification = 0;
                    if (scope.onClick) {
                        scope.onClick();
                    }
                };
            }
        }
    });

})();
