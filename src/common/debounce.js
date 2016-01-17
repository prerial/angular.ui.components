/**
 * Created by Mikhail on 1/12/2016.
 */
/**

 * @description Debounces event untill all dependencies are addressed within a time window
 */
(function (angular) {
    'use strict';

    function DebounceProvider() {
        var timer;

        /**
         * Debounce Provider service
         * @param {number}   delay    Delay in milliseconds
         * @param {Function} callback Callback function to execute at the end of debounce
         * @param {Any}   payload  Any additional data to be forwarded-along to the callback
         */

        function Debounce(delay, callback, payload) {
            if (timer) {
                window.clearTimeout(timer);
            }

            timer = setTimeout(function () {
                callback(payload);
            }, delay);
        }

        return Debounce;
    }

    angular.module('prerial').factory('Debounce', DebounceProvider);
})(angular);