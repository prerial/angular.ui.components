/**
 * Created by Mikhail on 1/16/2016.
 */
/**
 * Created by Mikhail on 1/16/2016.
 */
/////////// aaaaaaaa  Form Start  //////////////////////////////
(function () {

    angular.module('prerial').controller('FormCtrl', ['$scope', '$log', function (scope, $log) {

    }]);
    angular.module('prerial').controller('FormValidateCtrl', ['$scope', '$log', function (scope, $log) {

    }]);

})();

/*
(function () {
    var Employee = function (firstName, lastName, bio, orientation) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.bio = bio;
        this.orientation = orientation;
    };

    angular.module('prerial').controller('FormCtrl', ['$scope', '$log', function (scope, $log) {
        scope.firstName = 'John';
        scope.lastName = 'Smith';
        scope.bio = 'An employee at Morgan Stanley for 10 years';
        scope.orientation = 'male';
        scope.selectedDate;

        scope.chkLabel = {'male': 'Male', 'female': 'Female'}

        scope.cloneRecord = new Employee(scope.firstName, scope.lastName, scope.bio, scope.orientation);

        scope.saveRecord = function () {
            $log.log('Calling saved record')
            var clone = scope.cloneRecord;

            scope.firstName = clone.firstName;
            scope.lastName = clone.lastName;
            scope.bio = clone.bio;
            scope.orientation = clone.orientation;
        };

        scope.employeeId = 1;

        scope.items = [
            {value: 0, label: 'Will', guid: 5, name: 'Will override'},
            {value: 1, label: 'Simon', guid: 6, name: 'Simon override'},
            {value: 2, label: 'Ambika', guid: 7, name: 'Ambika override'},
            {value: 3, label: 'Tim', guid: 8, name: 'Tim override'},
            {value: 4, label: 'Jeet', guid: 9, name: 'Jeet override'}
        ];


    }]);
})();

(function(angular) {
    'use strict';

    angular.module('prerial').controller('FormValidateCtrl', ['$scope', '$log', function (scope, $log) {

        function Example() {
            this.anonymous = false;
            this.name = '';
            this.email = '';
            this.branchNo = '17';
            this.feedbackCat = '';
            this.selectedDate = '';
            this.refDiv = undefined;
            this.employeeId = '';
            this.myLookup = '';
            this.subject = '';
            this.curprocess = '';
            this.processimp = '';
            this.comments = '';
            this.radioValue = '';
            this.checkValue = '';
            this.checkValue1 = '';
            this.checkValue2 = '';

        }

        function Example2() {
            this.name = '';
            this.email2 = '';
            this.branchNo2 = '';
            this.feedbackCat2 = '';
        }

        scope.formExample = new Example();

        scope.form2Example - new Example2();


        scope.chkLabel = {'male': 'Male', 'female': 'Female'};


        scope.saveRecord = function () {
            $log.log('Calling saved record');
        };


        scope.items = [
            {value: 0, label: 'Will', guid: 5, name: 'Will override'},
            {value: 1, label: 'Simon', guid: 6, name: 'Simon override'},
            {value: 2, label: 'Ambika', guid: 7, name: 'Ambika override'},
            {value: 3, label: 'Tim', guid: 8, name: 'Tim override'},
            {value: 4, label: 'Jeet', guid: 9, name: 'Jeet override'}
        ];

        scope.clearModel = function () {

            scope.formExample = new Example();
            scope.setPristine(scope.demoForm);
        }

        scope.setPristine = function (form) {
            if (form.$setPristine) {//only supported from v1.1.x
                form.$setPristine();
            } else {

                form.$dirty = false;
                form.$pristine = true;
                //form.$invalid = false;
                _.each(form, function (input) {


                    if (input.$dirty) {
                        input.$dirty = false;
                        input.$pristine = true;
                    }

                });
            }
        }

        scope.clearModel2 = function () {

            scope.form2Example = new Example2();
            scope.setPristine(scope.demoForm2);
        }

        scope.customEnterFunc = function () {
            $log.info("This is a custom function, called on click on Enter button................");
//            saLog.info("This is a custom function, called on click on Enter button................");
        }


    }]);


})(angular);
*/
///////////   aaaaaaaaaa End Form Start  //////////////////////////////
