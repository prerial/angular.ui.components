/**
 * Created by Mikhail on 1/12/2016.
 */
(function() {
    'use strict';

    angular.module('prerial') .constant('Navigation',

        {
            'Home': {
                    route: '/home',
                    config: {controller: 'appController', template:'<h2 class="examples-pane">Controllers Home</h2>'}
            },
            'DataProvider':
                {
                    route: '/data-provider',
                    config: {controller: 'dataProviderController', templateUrl:'partials/data-provider.html'}
            },
            'Modal':
                {
                    route: '/modal',
                    config: {controller: 'modalCtrl', templateUrl:'partials/modal.html'}
            },
            'ViewportResizer':
                {
                    route: '/viewport-resizer',
                    config: {controller: 'viewPortResizeCtrl', templateUrl:'partials/viewport-resizer.html'}
            },
            'Notifications':
                {
                    route: '/notifications',
                    config: {controller: 'notificationsCtrl', templateUrl:'partials/notifications.html'}
            },
            'Combobox':
                {
                    route: '/combobox',
                    config: {controller: 'comboboxCtrl', templateUrl:'partials/combobox.html'}
            },
            'Tooltip':
                {
                    route: '/tooltip',
                    config: {controller: 'tooltipCtrl', templateUrl:'partials/tooltip.html'}
                },
            'GridTag':
            {
                route: '/gridtag',
                config: {controller: 'gridtagCtrl', templateUrl:'partials/gridtag.html'}
            },
            'Buttons':
            {
                route: '/buttons',
                config: {controller: 'ButtonsCtrl', templateUrl:'partials/buttons.html'}
            },
            'Form':
            {
                route: '/form',
                config: {controller: 'FormCtrl', templateUrl:'partials/form.html'}
            },
            'Form1':
            {
                route: '/form1',
                config: {controller: 'Form1Ctrl', templateUrl:'partials/form/form1.html'}
            }
        });

})();
