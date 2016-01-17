/**
 * Created by Mikhail on 1/16/2016.
 */
(function(angular) {
    'use strict';

    angular.module('prerial').controller('Form1Ctrl', ['$scope', '$log', function (scope, $log) {

        function Example() {
            this.name = '';
            this.email = '';
            this.branchNo = '';
            this.feedbackCat = '';
            this.gender = '';
            this.message = '';
        }

        scope.formExample = new Example();

        scope.chkLabel = {'male': 'Male', 'female': 'Female'};

        scope.saveRecord = function () {
            scope.formExample.message = " Calling saved record";
            $log.log('Calling saved record');
        };

        scope.items = [
            {value: 0, label: 'Will', guid: 5, name: 'Will override'},
            {value: 1, label: 'Tim', guid: 8, name: 'Tim override'},
            {value: 2, label: 'John', guid: 9, name: 'John override'}
        ];

        scope.setPristine = function (form) {
                form.$setPristine();
        }

        scope.clearModel = function () {
            scope.formExample = new Example();
            scope.formExample.message = " Model Cleared";
            scope.setPristine(scope.demoForm);
        }

        scope.customEnterFunc = function () {
            scope.formExample.message = "This is a custom function, called on click on Enter button................";
            $log.info("This is a custom function, called on click on Enter button................");
        }

    }]);

})(angular);
