/**
 * Created by Mikhail on 1/12/2016.
 */
(function () {
    'use strict';

    function DebounceProvider() {
        var timer;

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