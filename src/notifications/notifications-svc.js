(function(angular) {
    'use strict';

    angular.module('prerial').factory('preNotificationService', function() {
        return {
            create: function(config) {
                var Notification = function(config) {
                    this.config = config;

                    // Pops up the notification bassed on the configuration specified.
                    this.show = function() {
                        $.pnotify(this.config);
                    };
                };

                return new Notification(config);
            }
        };
    });
})(angular);