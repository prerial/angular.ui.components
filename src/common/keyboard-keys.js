/**
 * Created by Mikhail on 1/5/2016.
 */
(function (angular) {
    'use strict';

    var alpha = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase(),
        numeric = '0123456789';
    var keys = {
        Backspace: 8,
        Tab: 9,
        Enter: 13,
        Shift: 16,
        Ctrl: 17,
        Alt: 18,
        Pause: 19,
        CapsLock: 20,
        Esc: 27,
        PageUp: 33,
        PageDn: 34,
        End: 35,
        Home: 36,
        Left: 37,
        Up: 38,
        Right: 39,
        Down: 40,
        Insert: 45,
        Delete: 46,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        NumLock: 114,
        ScrollLock: 145
    };

    var i, j, max;
    /**
     * Add alpha characters
     */
    for (i = 0, j = 65, max = alpha.length; i < max; i++) {
        keys[alpha[i]] = i + j;
    }
    /**
     * Add numeric characters
     */
    for (i = 0, j = 48, max = numeric.length; i < max; i++) {
        keys[numeric[i]] = i + j;
    }

    angular.module('prerial').constant('KeyboardKeys', keys);
})(angular);