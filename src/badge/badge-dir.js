/**
 * Created by Mikhail on 1/29/2016.
 */
(function () {
    'use strict';

    angular.module('prerial').directive('preBadge', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                notification: '=',
                className: '@',
                onClick: '&'
            },
            templateUrl: 'src/badge/badge.html',
            link: function(scope, element, attrs) {

                if (!attrs.notification) {
                    throw new Error('Badge Icon require an expression to bind to.');
                }

                scope.iconAlign = attrs.iconAlign;

                scope.notificationLabel = scope.notification > 9 ? "9+" : scope.notification;

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
