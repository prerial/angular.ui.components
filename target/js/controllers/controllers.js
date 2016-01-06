/**
 * Created by Mikhail on 1/4/2016.
 */
(function(window, angular) {
    'use strict';

    angular.module('prerial')
        .controller('appController', function($scope) {

    });

    angular.module('prerial')
        .controller('dataProviderController', function($scope) {

            $scope.onDataLoad = function(params){

            }

    });

    angular.module('prerial')
        .directive('dtTest', function(dataActionService) {

            return {
                restrict: 'E',
                template: '<ul ng-click="setLeftMenu($event)"><li ng-repeat="item in pizzaData"><div>{{item.Title}}</div></li></ul>',
                link: function(scope){

                }
            }
    });

    angular.module('prerial').controller('modalCtrl', ['$scope', 'prerialModal',

        function (scope, prerialModal) {
            var modalWindow = null;
            scope.showModal = function () {
                modalWindow = new prerialModal();
                modalWindow.show();
            };
            scope.$on("destroy:modal", function handleDestroyEvent() {
                modalWindow = null;
            });
    }]);

    angular.module('prerial').controller('viewPortResizeCtrl', ['$scope',  function (scope) {

    }]);

    angular.module('prerial')
        .controller('notificationsCtrl', ['$scope', 'preNotificationService', function(scope, saNotificationService) {

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

(function(angular) {
    'use strict';

    angular.module('prerial').controller('comboboxCtrl', ['$scope', '$log', function(scope, $log) {
        scope.employees = [
            {
                name: "Sam",
                title: "VP",
                shortkey: "S"
            },
            {
                name: "Felix",
                title: "Node MQ"
            },
            {
                name: "Wess",
                title: "Charts Pro"
            },
            {
                name: "Niranjan",
                title: "JS Pro"
            },
            {
                name: "Chris",
                title: "JS Pro"
            },
            {
                name: "Jennifer",
                title: "JS Pro"
            },
            {
                name: "Aaron",
                title: "JS Pro"
            },
            {
                name: "Kanwaljeet",
                title: "JS Pro"
            },
            {
                name: "Beth",
                title: "CSS Pro"
            },
            {
                name: "Lior",
                title: "JS Pro"
            },
            {
                name: "Raghu",
                title: "JS Pro"
            },
            {
                name: "John",
                title: "JS Pro"
            },
            {
                name: "Akhlesh",
                title: "JS Pro"
            },
            {
                name: "Kevin",
                title: "JS Pro"
            }
        ];
        scope.myLookup = "";
        scope.myLookup1 = "";
        scope.onSelect = function (value, data) {
            $log.info('Combobox selected:', value, data);
        };

        scope.onChange = function (value) {
            $log.info('Combobox changed:', value);
        };

    }]);
})(angular);



