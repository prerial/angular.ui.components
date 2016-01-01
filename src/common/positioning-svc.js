(function (angular) {
    "use strict";

    angular.module('prerial').service('PositioningService', PositioningService);

    function getElementProperties(elem) {
        if (!elem[0]) return false;
        var bbRect = elem[0].getBoundingClientRect();
        var offset = elem.offset();
        return _.extend(bbRect, {absTop: offset.top, absLeft: offset.left});
    }

    function nudgePosition(elemProps, offsetTop, offsetLeft) {
        if (!_.isUndefined(offsetLeft)) {
            elemProps.left += offsetLeft;
        }
        if (!_.isUndefined(offsetTop)) {
            elemProps.top += offsetTop;
        }
    }

    var Positions = {
        SW: function (elemProps, relatedProps) {
            return {top: relatedProps.absTop + relatedProps.height, left: relatedProps.absLeft};
        },
        SE: function (elemProps, relatedProps) {
            return {
                top: relatedProps.absTop + relatedProps.height,
                left: (relatedProps.absLeft + relatedProps.width) - elemProps.width
            };
        },
        SC: function (elemProps, relatedProps) {
            return {
                top: relatedProps.absTop + relatedProps.height,
                left: (relatedProps.absLeft + (relatedProps.width / 2)) - (elemProps.width / 2)
            };
        },
        NW: function (elemProps, relatedProps) {
            return {top: relatedProps.absTop - elemProps.height, left: relatedProps.absLeft};
        },
        NE: function (elemProps, relatedProps) {
            return {
                top: relatedProps.absTop - elemProps.height,
                left: (relatedProps.absLeft + relatedProps.width) - elemProps.width
            };
        },
        NC: function (elemProps, relatedProps) {
            return {
                top: relatedProps.absTop - elemProps.height,
                left: (relatedProps.absLeft + (relatedProps.width / 2)) - (elemProps.width / 2)
            };
        },
        EN: function (elemProps, relatedProps) {
            return {
                top: (relatedProps.absTop + relatedProps.height) - elemProps.height,
                left: (relatedProps.absLeft + relatedProps.width)
            };
        },
        ES: function (elemProps, relatedProps) {
            return {
                top: relatedProps.absTop,
                left: (relatedProps.absLeft + relatedProps.width)
            };
        },
        EC: function (elemProps, relatedProps) {
            return {
                top: (relatedProps.absTop + (relatedProps.height / 2)) - (elemProps.height / 2),
                left: (relatedProps.absLeft + relatedProps.width)
            };
        },
        WN: function (elemProps, relatedProps) {
            return {
                top: (relatedProps.absTop + relatedProps.height) - elemProps.height,
                left: (relatedProps.absLeft - elemProps.width)
            };
        },
        WS: function (elemProps, relatedProps) {
            return {
                top: relatedProps.absTop,
                left: (relatedProps.absLeft - elemProps.width)
            };
        },
        WC: function (elemProps, relatedProps) {
            return {
                top: (relatedProps.absTop + (relatedProps.height / 2)) - (elemProps.height / 2),
                left: (relatedProps.absLeft - elemProps.width)
            };
        }
    };

    function PositioningService() {

        this.findBestPosition = function (positions, elem, container, getCoordinatesFunction) {

            var c = 0, l = positions.length, coords, preferredCoords;

            for (c; c < l; c++) {
                coords = getCoordinatesFunction(positions[c]);

//                if (ViewportService.coordinatesInView(coords.x, coords.y, elem, container)) {
//                    return angular.extend(positions[c], coords);
//                }

                if (c === 0) {
                    preferredCoords = angular.extend(positions[c], coords);
                }
            }

            console.warn('No good position found - returning default');

            return preferredCoords; 
        };

        this.positionElement = function (elem, related, opt) {
            if (!elem) {
                return;
            }

            elem = angular.element(elem);

            var defaultOptions = {
                position: 'SW'
            };

            var options = _.isPlainObject(related) ? related : (opt || _.defaults({}, defaultOptions)),
                relativeElem = arguments.length >= 2 && related && !_.isPlainObject(related);

            if (relativeElem) {
                var elemPosition = getElementProperties(elem);
                var referencePosition = getElementProperties(angular.element(relativeElem));
                var position = _.isString(options.position) && options.position.toUpperCase();

                if (position && Positions.hasOwnProperty(position)) {
                    var targetPosition = Positions[position](elemPosition, referencePosition);

                    _.extend(options, targetPosition);
                }
            }

            nudgePosition(options, options.offsetTop, options.offsetLeft);

            elem.css({top: options.top, left: options.left});

            return options;
        };

        this.centerElement = function (elem, related, offsetTop, offsetLeft) {
            if (elem) {
                var dimensions = {
                    offsetX: 0,
                    offsetY: 0
                };

                if (related && related !== window) {
                    var referencePosition = getElementProperties(related);

                    dimensions.width = referencePosition.width;
                    dimensions.height = referencePosition.height;
                    dimensions.offsetX = referencePosition.absLeft;
                    dimensions.offsetY = referencePosition.absTop;
                } else {
                    dimensions.width = window.innerWidth;
                    dimensions.height = window.innerHeight;
                }

                var centerX = dimensions.offsetX + (dimensions.width / 2),
                    centerY = dimensions.offsetY + (dimensions.height / 2);

                var elementProperties = getElementProperties(elem),
                    elemCenterX = elementProperties.width / 2,
                    elemCenterY = elementProperties.height / 2;

                var targetPosition = {
                    left: centerX - elemCenterX,
                    top: centerY - elemCenterY
                };

                nudgePosition(targetPosition, offsetTop, offsetLeft);

                elem.css(targetPosition);
            }
            return targetPosition;
        };
    }
})(angular);