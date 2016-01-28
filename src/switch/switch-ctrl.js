/**
 * Created by Mikhail on 1/28/2016.
 */
(function() {
    'use strict';

    angular.module('prerial').constant('diceButtonConfig', {
        activeClass: 'on',
        toggleEvent: 'click tap'
    });

}());

function parseConstantExpr($parse, context, name, expression, fallback) {
    var parseFn;
    if (angular.isDefined(expression)) {
        parseFn = $parse(expression);
        if (!parseFn.constant) {
            throw angular.$$minErr('ngModel')('constexpr', 'Expected constant expression for `{0}`, but saw ' +
                '`{1}`.', name, expression);
        }
        return parseFn(context);
    }
    return fallback;
}

(function() {
    'use strict';

    angular.module('prerial').controller('DiceSwitchController', ['diceButtonConfig', function (diceButtonConfig) {
        this.activeClass = diceButtonConfig.activeClass || 'on';
        this.toggleEvent = diceButtonConfig.toggleEvent || 'click tap';
    }]);

}());

