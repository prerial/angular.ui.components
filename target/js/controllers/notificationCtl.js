/**
 * Created by Mikhail on 1/3/2016.
 */
(function(window, angular) {
    'use strict';


    angular.module('prerial')
    .controller('myListCtrl', ['$scope', 'preNotificationService', function(scope, saNotificationService) {

        // Get, configure the notifications, and register to scope.
        // You can set the configuration in one shot like so:
        scope.notification1 = saNotificationService.create({
            title: 'Simple notice',
            text: 'A regular notice'
        });

        scope.notification2 = saNotificationService.create({
            title: 'Sticky notice',
            text: 'You have to click to close me yourself',
            hide: false
        });

        scope.notification3 = saNotificationService.create({
            title: 'See Through Notice',
            text: 'This is semi-transparent, opacity = 0.5',
            opacity: 0.5
        });

        scope.notification4 = saNotificationService.create({
            title: 'No Shadow Notice',
            text: 'I don\'t have a shadow. (It\'s cause I\'m a vampire or something. Or is that reflections...)',
            shadow: false
        });

        scope.notification5 = saNotificationService.create({
            title: 'Regular Success',
            text: 'That thing that you were trying to do worked!',
            type: 'success'
        });

    }]);

})(window, window.angular);
