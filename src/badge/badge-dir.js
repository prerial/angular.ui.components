/**
 * Created by Mikhail on 1/29/2016.
 */
(function () {
    'use strict';

    angular.module('prerial').directive('preBadge', function () {
        return {
            restrict: 'E',
            scope: {
                notification: '=',
                className: '@',
                onClick: '&'
            },
            templateUrl: 'src/badge/badge.html',
            compile: function (tElement, tAttrs) {
                if (!tAttrs.notification) {
                    throw new Error('Sambuca Badge Icon require an expression to bind to.');
                }
                return function (scope, element, attrs) {

                    scope.iconAlign = attrs.iconAlign;

                    scope.notificationLabel = scope.notification > 9 ? "9+" : scope.notification;

                    scope.handleClick = function () {
                        scope.notification = 0;
                        if (scope.onClick) {
                            scope.onClick();
                        }
                    };
                };
            }
        };
    });

})();
