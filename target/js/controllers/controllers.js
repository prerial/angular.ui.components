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
        .directive('dtTest', function() {

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
                id: 1,
                name: "Sam",
                title: "VP"
            },
            {
                id: 2,
                name: "Felix",
                title: "Node MQ"
            },
            {
                id: 3,
                name: "Wess",
                title: "Charts Pro"
            },
            {
                id: 4,
                name: "Kevin",
                title: "JS Pro"
            }
        ];

        scope.onSelect = function (value, data) {
            $log.info('Combobox selected:', value, data);
        };

        scope.onChange = function (value) {
            $log.info('Combobox changed:', value);
        };

    }]);
})(angular);

(function(angular) {
    'use strict';

    angular.module('prerial').controller('tooltipCtrl', ['$scope', '$log', function(scope, $log) {

    }]);
})(angular);

(function(angular) {
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
            if (parent.document.getElementById("dlayerDiv")) parent.document.getElementById("dlayerDiv").style.visibility = "hidden";
        }
    }]);

})(angular);

function disableSelection(target){
    if (typeof target.onselectstart!="undefined") //IE route
        target.onselectstart=function(){return false}
    else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
        target.style.MozUserSelect="none"
    else //All other route (ie: Opera)
        target.onmousedown=function(){return false}
    target.style.cursor = "default"
}

function getElementLeft(el){
    var ol = el.offsetLeft;
    while ((el = el.offsetParent) != null) { ol += el.offsetLeft; }
    return ol;
}

(function(angular) {
    'use strict';

angular.module('prerial').controller('viewPortResizeCtrl',['$rootScope', function($rootScope) {

    $rootScope.$on('resized', function(){
        $rootScope.$broadcast('rootresized', []);
    });

    $rootScope.$watch(function (){ return $rootScope.resized;}, function (newValue) {
        $rootScope.$broadcast('rootresized', []);
    });

}]);

})(angular);


