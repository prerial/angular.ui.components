
(function(window, angular) {
    'use strict';

    angular.module('prerial', ['ngRoute', 'ngResource']);

})(window, window.angular);
;(function (document, angular) {
    'use strict';

    function ComboBoxController(scope, attrs, elem, parse) {
        var ngModel, matches = [],
            input = elem.find('input'),
            displayText = parse(attrs.display);

        this.init = function(ctrl) {
            ngModel = ctrl;
            ngModel.$render = onRender;
        };

        scope.isActive = function (item) {
            var isActive = false;
            if (matches.length === 1 && scope.selectedValue === item[attrs.field] ) {
                isActive = true;
            }
            return isActive;
        };

        scope.$watch(function (){ return ngModel.$viewValue;}, function (newValue) {
            ngModel.$render();
            console.log('Watching ngModel: ' + displayText(newValue));
        });

        scope.itemSelect = function (item) {
            ngModel.$setViewValue(item);
            scope.comboShow = false;
        };

        function onRender() {
            matches.length = 0;
            if(ngModel.$viewValue && ngModel.$viewValue[attrs.field]) {
                matches.push(ngModel.$viewValue);
                scope.selectedValue = ngModel.$viewValue[attrs.field];
                input.val(displayText(ngModel.$viewValue));
            }else {
                input.val(attrs.placeholder);
            }
        }

    }

    ComboBoxController.$inject = ['$scope', '$attrs', '$element', '$parse'];

    angular.module('prerial').controller('ComboBoxController', ComboBoxController);

})(document, angular);;(function (document, angular) {
    'use strict';

    function ComboBoxDirective($parse) {

        return {
            restrict: 'E',
            require: ['?ngModel','preCombobox'],
            scope: {
                src: '=',
                field: '@'
            },
            templateUrl: 'src/combobox/combobox.html',
            controller: 'ComboBoxController',
            replace: true,
            link: function (scope, elem, attrs, controllers) {

                var ngModelController = controllers[0],
                    comboboxController = controllers[1];

                comboboxController.init(ngModelController);
                scope.comboShow = false;
                elem.find('.pre-combobox-toggle').on("click", function handleClickEvent() {
                    scope.comboShow = !scope.comboShow;
                    scope.$apply();
                });
                elem.find('.pre-dropdown-menu').width(elem.find('.pre-combobox').width() - 2);

            }
        }
    }

    angular.module('prerial').directive({preCombobox: ComboBoxDirective});

})(document, angular);;(function (angular, _) {
    "use strict";

    angular.module('prerial').service('ContainerService', ContainerService);

    ContainerService.$inject = ['$document'];

    var DATA_KEY = 'pre-container-id',
        POOL_SIZE = 3;

    var $body,
        containerBase = document.createElement('div');

    /**
     * Expands containers pool on demand
     * @param {Array} pool Array of containers
     * @returns {{container: Object, inUse: boolean, id: string, rel: null}}
     */
    function expandPool(pool) {
        var $elem = angular.element(containerBase.cloneNode(false)),
            uid = _.uniqueId('pre-container-'),
            newContainer = {container: $elem, inUse: false, id: uid, rel: null};

        $elem.appendTo($body).data(DATA_KEY, uid);
        pool.push(newContainer);

        return newContainer;
    }

    /**
     * Initializes containers pool
     * @param {Array} pool Array of containers
     */
    function initPool(pool) {
        var i = POOL_SIZE;
        $body = angular.element(document.body);

        /**
         * Pre-populate the pool of containers
         */
        while (i > 0) {
            expandPool(pool);
            i--;
        }
    }

    function ContainerService() {
        /**
         * Holds an array of available containers
         * @type {Array}
         */
        this.containers = [];
    }

    ContainerService.prototype = {
        /**
         * Returns next available container
         * @param {Element|jQuery} [rel] Related element which requests the container
         * Related element can be used to create a temporary relationship between the component which requests a container and
         * a container itself. It can be used to prevent container hiding when clicking over the rel component.
         * @returns {jQuery}
         */
        getContainer: function (rel) {
            /**
             * Pre-populate pool of containers on first use
             */
            if (!this.containers.length) {
                initPool(this.containers);
            }

            var context = _.find(this.containers, {inUse: false});
            if (!context) {
                context = expandPool(this.containers);
            }
            context.inUse = true;
            context.rel = rel;

            return context.container;
        },
        /**
         * Releases container from use and marks it as available
         * Returns element to pristine state by removing event bindings, in-line styles and CSS classes (data preserved)
         * @param {Element} elem DOM element of the container
         * @returns {ContainerService}
         */
        releaseContainer: function (elem) {
            var $elem = angular.element(elem),
                uid = $elem.data(DATA_KEY),
                context = this.getContainerContext(uid);

            if (context) {
                context.inUse = false;
                context.rel = null;
                $elem.removeAttr('style').removeAttr('class').off().empty();
            }
            return this;
        },
        /**
         * Returns an array of all containers currently in-use
         * @param {Element|jQuery} [rel] Related element used to obtain active container only related to the given object
         * @returns {Array} Array of containers
         */
        getActiveContainers: function (rel) {
            var filter = {inUse: true};
            if (rel !== undefined) {
                filter.rel = rel;
            }

            return _.chain(this.containers).filter(filter).map(function (n) {
                return n.container;
            }).valueOf();
        },
        /**
         * Return container context object by container id
         * @param {string|Element|jQuery} id Unique container id or element.
         * @returns {Object}
         */
        getContainerContext: function (id) {
            var context, uid;
            if (_.isString(id)) {
                context = _.find(this.containers, {id: id});
            } else {
                uid = angular.element(id).data(DATA_KEY);
                context = uid ? _.find(this.containers, {id: uid}) : undefined;
            }
            return context;
        },
        /**
         * Releases all containers
         * @returns {ContainerService}
         */
        releaseAll: function () {
            var me = this, active = this.getActiveContainers();
            _.each(active, function (container) {
                me.releaseContainer(container);
            });
            return this;
        }
    };

}(angular, _));;/**
 * @author Akhlesh Tiwari
 * @name Typeahead-combobox data filter service
 * Date: 06/10/2015
 */

(function (angular) {
    'use strict';

    function filterService($filter) {
        var filterProperties, filterQuery, _isStartsWith, $$filter;

        filterProperties = 'name';
        filterQuery = '';
        _isStartsWith = false;
        $$filter = $filter('filter');


        function isStringStartsWithQuery(stringToSearchIn, query) {
            return stringToSearchIn.indexOf(query) === 0;
        }

        function isStringContainsSearchText(stringToSearchIn, searchtext) {
            return stringToSearchIn.search(searchtext) !== -1;
        }

        function getComparator(customComparator) {
            var properties = filterProperties.split(','), objValue,
                searchText = filterQuery.toLowerCase();
            return function (value) {
                var out = _.some(properties, function (item) {
                    item = item.trim();
                    objValue = ('' + value[item]).toLowerCase();
                    return isStringContainsSearchText(objValue, searchText) && customComparator(objValue, searchText);
                });
                return out;
            };
        }

        function returnTrue() {
            return true;
        }

        /*
         comparator function to search in all data with startWith Constraint
         */
        function startsWithSearchInAll(actual, expected) {
            var stringToSearch = ('' + actual).toLowerCase();
            return isStringStartsWithQuery(stringToSearch, expected.toLowerCase());
        }


        function getFilteredData(obj) {
            var out, comparatorFunction, customComparator;
            if (filterProperties === "*") {
                if (!_isStartsWith) {
                    out = $$filter(obj.data, {$: filterQuery});
                } else {
                    out = $$filter(obj.data, filterQuery, startsWithSearchInAll);
                }
            } else {
                comparatorFunction = getComparator(_isStartsWith ? isStringStartsWithQuery : returnTrue);
                out = $$filter(obj.data, comparatorFunction);
            }
            return out;
        }

        function _filterData(obj, isStartsWith) {
            if (!angular.isObject(obj) || (obj && !obj.data)) {
                return;
            }
            filterProperties = obj.fields || filterProperties;
            filterQuery = obj.query;
            _isStartsWith = isStartsWith;
            return getFilteredData(obj);
        }

        function _findExactMatch(data, matchWith) {
            var lowerMatchWith = matchWith.toLowerCase(), result;

            result = _.find(data, function (item) {
                var isMatching = false;
                angular.forEach(item, function (value) {
                    if (value.toLowerCase() === lowerMatchWith) {
                        isMatching = true;
                    }
                });
                return isMatching === true;
            });
            return result;
        }

        return {
            filterData: _filterData,
            findExactMatch: _findExactMatch
        };
    }

    filterService.$inject = ['$filter'];
    angular.module('prerial')
        .factory('saFilterService', filterService);

})(angular);;/**
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
})(angular);;(function (angular) {
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
})(angular);;(function (angular, _) {
    'use strict';

    function skipCompile(template) {
        var out = false;
        if (_.templateSettings) {
            out = _.templateSettings.interpolate.test(template);
            if (!out) {
                out = _.templateSettings.evaluate.test(template);
            }
            if (!out) {
                out = _.templateSettings.escape.test(template);
            }
        }
        return out;
    }

    angular.module('prerial').factory('TemplateService', TemplateService);

    TemplateService.$inject = ['$templateCache', '$http', '$compile', '$log'];

    function TemplateService($templateCache, $http, $compile, $log) {

    	var queuedRequests = {};

    	return {
            get: function (templateUrl) {
                var def = $.Deferred(),
                	compiled = null;
                if (templateUrl) {
                    if (queuedRequests.hasOwnProperty(templateUrl)) {
                        return queuedRequests[templateUrl].promise();
                    }
                    var rQueue = queuedRequests[templateUrl] = def;
                    var template = $templateCache.get(templateUrl);
                    if (!template) {

                        $http.get(templateUrl, { cache: true }).then(function (resp) {

                            if (resp.data) {
                                $templateCache.put(resp.config.url, resp.data);
                                if (!skipCompile(resp.data)) {
                                    compiled = $compile(resp.data);
                                }
                                compiled.contents = resp.data;
                                queuedRequests[resp.config.url].resolve(compiled);
                            }
                        }, function (resp) {

                            queuedRequests[resp.config.url].reject();
                            $log.error('Template service failed to fetch remote url: ' + resp.config.url);
                        });
                    } else {
                        if (!skipCompile(template)) {
                            compiled = $compile(template);
                        }
                        compiled.contents = template;
                        rQueue.resolve(compiled);
                    }

                    return rQueue.promise();
                } else {
                    def.reject();
                    $log.error('Template service requires URL to work');
                    return def.promise();
                }
            }
        };
    }
})(angular, _);
;
(function (angular, window) {
    'use strict';
    /**
     * Function which returns window scroll offset
     * @param w
     * @returns {*}
     */
    function getScrollOffsets(w) {
        // Use the specified window or the current window if no argument
        w = w || window;
        // This works for all browsers except IE versions 8 and before
        if (w.pageXOffset != null) return {
            x: w.pageXOffset,
            y: w.pageYOffset
        };
        // For IE (or any browser) in Standards mode
        var d = w.document;
        if (document.compatMode === "CSS1Compat") {
            return {
                x: d.documentElement.scrollLeft,
                y: d.documentElement.scrollTop
            };
        }
        // For browsers in Quirks mode
        return {
            x: d.body.scrollLeft,
            y: d.body.scrollTop
        };
    }

    function getElementScrollOffsets(e) {
        return {
            x: e.prop('scrollLeft'),
            y: e.prop('scrollTop')
        };
    }

    function getBounds(elem) {
        var out = {}, offset = elem.offset();

        angular.extend(out, offset);

        out.width = elem.width();
        out.height = elem.height();

        return out;
    }

    angular.module('prerial').provider('ViewportService', ViewportService);
    function ViewportService() {
        var $window = angular.element(window),
            vWidth,
            vHeight,
            scrollOffset = getScrollOffsets(window);


        function update() {
            vWidth = $window.width();
            vHeight = $window.height();
            scrollOffset = getScrollOffsets(window);
        }

        this.threshold = 0;
        this.container = window;

        this.setThreshold = function (t) {
            this.threshold = t || 0;
        };

        this.setContainer = function (c) {
            $window.unbind('scroll resize');
            this.container = (c && c.nodeType === 1) ? c : window;
            $window.bind('scroll resize', update);
        };

        this.$get = function () {
            $window.bind('scroll resize', update);
            var me = this, relativeTo;
            update();

            return {
                /**
                 * Detects if element is above the fold
                 * @param elem
                 * @param container
                 * @returns {boolean}
                 */
                aboveTheFold: function (elem, container) {
                    var fold, cBcr, eBcr = getBounds(elem),
                        cSo, yOffset;

                    relativeTo = container || me.container;

                    if (relativeTo === window) {
                        fold = scrollOffset.y;
                        yOffset = scrollOffset.y;
                    } else {
                        cSo = getElementScrollOffsets(container);
                        yOffset = cSo.y;
                        cBcr = getBounds(relativeTo);
                        fold = cBcr.top + cSo.y;
                    }

                    return fold > (eBcr.top + yOffset + me.threshold);
                },
                /**
                 * Detects if element is below a visible fold
                 * @param elem
                 * @param container
                 * @returns {boolean}
                 */
                belowTheFold: function (elem, container) {
                    var fold, cBcr, eBcr = getBounds(elem),
                        cSo, yOffset;

                    relativeTo = container || me.container;

                    if (relativeTo === window) {
                        fold = vHeight + scrollOffset.y;
                        yOffset = scrollOffset.y;
                    } else {
                        cSo = getElementScrollOffsets(container);
                        yOffset = cSo.y;
                        cBcr = getBounds(relativeTo);
                        fold = cBcr.top + cBcr.height + cSo.y;
                    }

                    return fold <= eBcr.top + yOffset - me.threshold;
                },
                /**
                 * Detects if element is to the right of the fold
                 * @param elem
                 * @param container
                 * @returns {boolean}
                 */
                rightOffFold: function (elem, container) {
                    var fold, cBcr, eBcr = getBounds(elem);
                    relativeTo = container || me.container;

                    if (relativeTo === window) {
                        fold = vWidth + scrollOffset.x;
                    } else {
                        cBcr = getBounds(relativeTo);
                        fold = cBcr.left + cBcr.width;
                    }

                    return fold <= eBcr.left - me.threshold;
                },
                /**
                 * Detects is element is to the left off the fold
                 * @param elem
                 * @param container
                 * @returns {boolean}
                 */
                leftOffFold: function (elem, container) {
                    var fold, cBcr, eBcr = getBounds(elem);
                    relativeTo = container || me.container;

                    if (relativeTo === window) {
                        fold = scrollOffset.x;
                    } else {
                        cBcr = getBounds(relativeTo);
                        fold = cBcr.left;
                    }

                    return fold >= eBcr.left + me.threshold + eBcr.width;
                },
                /**
                 * Checks if element is in view
                 * @param elem
                 * @param container
                 * @returns {boolean}
                 */
                inView: function (elem, container) {
                    return !this.rightOffFold(elem, container) && !this.leftOffFold(elem, container) && !this.belowTheFold(elem, container) && !this.aboveTheFold(elem, container);
                },
                /**
                 * Checks if elements' height fits within a window or container
                 * @param elem
                 * @param container
                 * @returns {boolean}
                 */
                fitsHeight: function (elem, container) {
                    update();

                    var fold, cBcr, eBcr = getBounds(elem);
                    relativeTo = container || me.container;

                    if (relativeTo === window) {
                        fold = vHeight + scrollOffset.y;
                    } else {
                        cBcr = getBounds(relativeTo);
                        fold = cBcr.height + scrollOffset.y;
                    }
                    return fold > eBcr.top + eBcr.height + me.threshold;
                },
                /**
                 * Checks if elements' width fits within a window or container
                 * @param elem
                 * @param container
                 * @returns {boolean}
                 */
                fitsWidth: function (elem, container) {
                    update();

                    var fold, cBcr, eBcr = getBounds(elem);
                    relativeTo = container || me.container;

                    if (relativeTo === window) {
                        fold = vWidth + scrollOffset.x;
                    } else {
                        cBcr = getBounds(relativeTo);
                        fold = cBcr.width + scrollOffset.x;
                    }
                    return fold > eBcr.left + eBcr.width + me.threshold;
                },
                /**
                 * Returns an offset relative to the container
                 * @param {jQuery} elem
                 * @param {jQuery} [container]
                 */
                getRelativeBounds: function (elem, container) {
                    relativeTo = container || me.container;
                    var cBcr = getBounds(relativeTo), eBcr = getBounds(elem);

                    eBcr.top = ~(cBcr.top - eBcr.top) + 1;
                    eBcr.left = ~(cBcr.left - eBcr.left) + 1;

                    return eBcr;
                },

                /**
                 * Returns true if an element positioned at X,Y will fit entirely in the view, else returns false.
                 * @param x - X coordinate to test
                 * @param y - y coodinate to test
                 * @param elem - {jQuery} element being positioned
                 * @param container - {jQuery} container for the element
                 */

                coordinatesInView: function(x, y, elem, container) {

                    var relativeTo = container || $(me.container), cBcr, eBcr=getBounds(elem), left, top;

                    if (relativeTo[0] === window) {
                        left = scrollOffset.x;
                        top = scrollOffset.y;
                    } else {
                        cBcr = getElementScrollOffsets(relativeTo);
                        left = cBcr.x;
                        top = cBcr.y;
                        y = y+top;
                        x = x+left;
                    }

                    var tl = {x: left, y: top}; // top left of container
                    var tr = {x: tl.x + relativeTo.innerWidth(), y: tl.y}; //top right of container
                    var bl = {x: tl.x, y: tl.y + relativeTo.innerHeight()}; // bottom left of container


                    if (y < tl.y || y > bl.y) return false; // is the proposed top left y coordinate in view
                    if (x < tl.x || x > tr.x) return false; // is the proposed top left x coordinate in view
                    if (((y + eBcr.height) < tl.y) || ((y + eBcr.height) > bl.y)) return false; // will the bottom of the element still be in view
                    if (((x + eBcr.width) < tl.x) || ((x + eBcr.width) > tr.x)) return false; // will the far right of the element still be in view

                    return true;

                },

                /**
                 * Returns window scroll offset
                 */
                getScrollOffsets: getScrollOffsets
            };
        };
    }
})(angular, window);;(function(window, angular) {
	'use strict';

	angular.module('prerial')
	.directive('dtAction', function(dataActionService) {

		return {
			restrict: 'E',
            require: ['?^dtDataProvider'],
            scope: {
                name: '@',
                method: '@',
                url: '@',
                schema: '@',
                params: '@query',
                pageSize: '@',
                remoteProcessing: '@',
                restful: '@',
                onLoad: '&',
                onBeforeLoad: '&',
                onError: '&'
            },
            link: function(scope, elem, attr, ctl){
				var param = {
					name: attr.name || null,
					method: attr.method || null,
					type: attr.type || null,
					url: attr.url || null,
					schema: attr.schema || null,
					params: attr.query || null,
					pageSize: attr.pageSize || null,
					remoteProcessing: attr.remoteProcessing || null,
					restful: attr.restful || null
				};
				scope.items = dataActionService.load(param)
				.then(function (args) {
					var out = args.data;
					if (param.schema) {
						var arr = param.schema.split('.');
						for (var i = 0; i < arr.length; i++){
							out = out[arr[i]]
						}
					}
					ctl[0].setData({data: {action: attr.name, output: out}});
//					scope.onLoad({data: {name: attr.name, data: out}});
				})
			}
		}
    });


})(window, window.angular);



;(function(window, angular) {
	'use strict';

    angular.module('prerial').service('dataActionService', function($http) {

    	this.load = function(param){

			if(param.params && param.method === 'JSONP'){
				param.url = param.url + '?' + param.params + '&callback=JSON_CALLBACK';
			}
			return $http({method: param.method, url: param.url})

			.success(function(data) {
				return data;
			});
    	};
/*
      return $resource('/tweets/:id',
        {},
        {
          load: { method: 'GET' }
        });
*/
    });

})(window, window.angular);


;(function (w, angular) {
    'use strict';

    angular.module('prerial').controller('dtDataProviderController', DataProviderController);

    function DataProviderController($scope) {
        var scope = $scope;

		this.setData = function(params){
			scope.$parent[scope.dataProviderId] = params.data.output;
		}
    }

})(window, window.angular);


;(function(window, angular) {
	'use strict';

	angular.module('prerial')
	.directive('dtDataProvider', function() {

		return {
			restrict: 'E',
            scope: true,
            controller: 'dtDataProviderController',

			link: function(scope, elem, attr){

				scope.$parent.dataProviderId = attr.id;
				scope.$parent[attr.id] = null;

			}
		}
    });

})(window, window.angular);



;
(function (angular, $) {
    'use strict';

    prerialModalFactory.$inject = ['$rootScope', '$window', '$compile', '$templateCache', 'TemplateService', 'PositioningService'];

    function prerialModalFactory($rootScope, $window, $compile, $templateCache, templateService, positioningService) {


        function PrerialModal() {

            var _this = this,
				modalEl,
				shieldEl,
				contentEl,
				bodyEl = angular.element('body'),
				windowEl = $window;

            function compileTemplate(tmpl) {
                return $compile($templateCache.get(tmpl));
            };

            function centerModal() {
                var win = modalEl.children();
                positioningService.centerElement(modalEl, windowEl, -win.prop('offsetHeight') / 2, -win.prop('offsetWidth') / 2);
            };

            this.show = function () {
                var scope = $rootScope.$new();
                shieldEl = $('<div class="pre-window-backdrop"></div>');
                shieldEl.addClass('is-shown');
                bodyEl.append(shieldEl);

                compileTemplate('src/modal/modal.html')(scope, function (clone) {
                    bodyEl.append(clone);
                    scope.wrapper = modalEl = clone;
                    scope.container = scope.wrapper.find('.pre-window');
                    scope.windowBody = scope.wrapper.find('.pre-window-body');
                });

                compileTemplate('src/modal/modalbody.html')(scope, function (clone) {
                    scope.content = contentEl = clone;
                    scope.windowBody.append(clone);
                });

                scope.hide = function () {
                    destroy();
                    scope.content = null;
                    scope.wrapper = null;
                    scope.container = null;
                    scope.windowBody = null;
                    $rootScope.$broadcast('destroy:modal');
                    scope = null;
                    _this = null;
                };

                centerModal(scope.wrapper);
                $(window).on('resize', centerModal);
            }

            function destroy() {
                $(window).off('resize', centerModal);
                contentEl.remove();
                shieldEl.remove();
                modalEl.remove();
            }

        }

        return PrerialModal;
    }

    angular.module('prerial').factory({ 'prerialModal': prerialModalFactory });

}(angular, jQuery));;(function(angular) {
    'use strict';

    angular.module('prerial').factory('preNotificationService', function() {
        return {
            create: function(config) {
                var Notification = function(config) {
                    this.config = config;

                    // Pops up the notification bassed on the configuration specified.
                    this.show = function() {
                        $.pnotify(this.config);
                    };
                };

                return new Notification(config);
            }
        };
    });
})(angular);;(function (angular) {
    'use strict';

    function PopoverDirective(){
        return {
            restrict: 'A',

            controller:'TooltipController',
            require: ['saPopover'],
            compile: function (tElement, tAttrs) {

                // remove title attribute so default browser behavior doesn't pick it up.
                tAttrs.saTitle = tAttrs.title;

                tAttrs.title = "";

                tElement.attr("title","");

                var customContent = tElement.find(".custom-content")

                if (customContent.length>0) {
                    tAttrs.customContent = customContent[0].outerHTML;
                    customContent.remove();
                }

                return function(scope, elem, attrs, ctrls){
                    var popoverCtrl = ctrls[0];

                    attrs.tooltipTemplate = 'assets/d/sa-tooltip/sa-popover.html';
                    attrs.tooltipArrowClass = "popover-arrow";
                    attrs.toolTipContentClass = "popover-inner";
                    attrs.isPopover = true;
                    attrs.toolTipClasses = "sa-popover popover " + (( attrs.popoverClass ) ? attrs.popoverClass : "");

                    popoverCtrl.init(elem, attrs);

                    function showTooltip(e){
                        var containerEl;
                        containerEl = popoverCtrl.showTooltip(e);

                    }

                    if (attrs.toggleMode === 'click') {

                        elem.on("click.poEvents", showTooltip);

                    } else {

                        elem.on("mouseover.poEvents", showTooltip);

                        elem.on("mouseout.poEvents", popoverCtrl.hideTooltip);
                    }

                    elem.on("$destroy", function(e){
                        elem.off(".poEvents");
                        popoverCtrl.cleanUp();
                    });
                }
            }
        }
    }

    angular.module('prerial').directive('saPopover', PopoverDirective)
}(angular));;/**
 * Created by Mikhail on 1/7/2016.
 */
(function () {
    'use strict';

    function TooltipController( attrs, elem, $templateCache, tooltipService) {

        var titleHold, template, dimensions;

        this.hideTooltip = function() {
            if (template) {
                elem.attr("title", titleHold);
                template.remove();
            }
        };

        this.showTooltip = function(e) {
            titleHold = elem.attr("title");
            elem.attr("title", "");
            if (!template) {
                template = $($templateCache.get('src/tooltip/tooltip.html'));
            }
            template.find('.tooltip-inner').html(attrs.title);
            template.addClass("pre-tooltip tooltip top").show();
            $('body').append(template);
//            dimensions = tooltipService.getDimensions(elem, $('.tooltip-container'), $('.tooltip-tooltip-arrow'), true);
            var top = elem.offset().top - ($('.tooltip-container').height() + elem.height());
            var left = e.clientX - elem.width()/2;
            template.css('left', left).css('top', top);
        };

    }

    TooltipController.$inject = ['$attrs', '$element', '$templateCache','TooltipService'];

    angular.module('prerial').controller('TooltipController', TooltipController);

})();;(function () {
    'use strict';

    function TooltipDirective() {

        return {
            restrict: 'A',
            require: ['preTooltip'],
            controller: 'TooltipController',
            link: function (scope, elem, attrs, controllers) {

                var comboboxController = controllers[0];

                elem.on("mouseover", function(e) {
                    comboboxController.showTooltip(e);
                });

                elem.on("mouseout", function(e) {
                    comboboxController.hideTooltip(e);
                });
            }
        }
    }

    angular.module('prerial').directive({preTooltip: TooltipDirective});

})();;(function () {
    "use strict";

    angular.module('prerial').service('TooltipService', TooltipService);

    function TooltipService(){

        this.getDimensions = function(elem, container, tooltipArrow, isVisible){

            var offset = elem.offset();

            var linkWidth = elem.prop('offsetWidth');

            var linkHeight = elem.prop('offsetHeight');

            if (!isVisible) container.css({display: "block", position: "absolute", visibility: "hidden"});

            var tipWidth = container.prop('offsetWidth');

            var tipHeight = container.prop('offsetHeight');

            var tooltipArrowOffsetLeft = tooltipArrow.prop("offsetLeft");

            var tooltipArrowWidth = tooltipArrow.prop("offsetWidth");

            var tooltipArrowHeight = tooltipArrow.prop("offsetHeight");

            if (!isVisible) container.css({display: "none", position: "", visibility: ""});

            return {
                "offset" : offset,
                "linkWidth" : linkWidth,
                "linkHeight" : linkHeight,
                "tipWidth" : tipWidth,
                "tipHeight" : tipHeight,
                "tooltipArrowOffsetLeft" : tooltipArrowOffsetLeft,
                "tooltipArrowWidth" : tooltipArrowWidth,
                "tooltipArrowHeight" : tooltipArrowHeight
            };
        }

    }
}());
;(function(window, angular) {
	'use strict';

angular.module('prerial')
  .directive('resizable', function() {

	return {
		restrict: 'A',
		scope: {
			rDirection: '@',
			rWidth: '@'
		},
		link: function(scope, element) {

			var body = $('body'), w, h, dir = scope.rDirection, start;

			element.addClass('resizable');
			element.css('width', scope.rWidth);

			function dragging(e) {
				dir === 'horizontal'? element.css('flexBasis', (w - (start - e.clientX))) : element.css('flexBasis', (h - (start - e.clientY)));
			}

			function dragEnd() {
				body.off('mouseup', dragEnd);
				body.off('mousemove', dragging);
				element.removeClass('no-transition');
			}

			function dragStart(e, direction) {
				start = direction === 'horizontal' ? e.clientX : e.clientY;
				w = parseInt(element.css('width'));
				h = parseInt(element.css('height'));
				element.addClass('no-transition');
				body.on('mouseup', dragEnd);
				body.on('mousemove', dragging);
				if (e.stopPropagation) e.stopPropagation();
				if (e.preventDefault) e.preventDefault();
				e.cancelBubble = true;
				e.returnValue = false;
			}

			var draghandle = $('<div />').attr('class', 'rg-' + dir).html('<span></span>');
			element.append(draghandle);
			draghandle.on('mousedown', function(e) {
				if (e.which === 1) {
					dragStart(e, dir);
				}
			})
		}
	};
});


})(window, window.angular);



;angular.module('prerial').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/combobox/combobox.html',
    "<div><div><div class=\"pre-dropdown pre-combobox\"><div class=\"input-append pre-input-container\"><input class=\"pre-combobox-input\" type=\"text\" value=\"\"> <span class=\"add-on pre-combobox-toggle pre-icon-arrow-down\" ng-click=\"toggleDropdown()\"></span></div><div><ul ng-show=\"comboShow\" class=\"pre-dropdown-menu pre-combobox-menu\" style=\"max-height:100px\"><li ng-class=\"{'active':isActive(item)}\" ng-repeat=\"item in src\"><a ng-click=\"itemSelect(item)\">{{item.name}}</a></li></ul></div></div><div style=\"margin:10px;font-weight:bold\">Selected item: {{selectedValue}}</div></div></div>"
  );


  $templateCache.put('src/modal/modal.html',
    "<div class=\"pre-window-wrapper\"><div class=\"pre-window\"><button ng-click=\"hide()\" class=\"close pre-icon-close-box\" type=\"button\"></button><div class=\"pre-window-header\"><h3>Modal window</h3></div><div class=\"pre-window-body\"></div><div class=\"pre-window-footer\" ng-click=\"hide()\" style=\"height:50px\"><button class=\"btn apply btn-primary\">OK</button> <button class=\"btn cancel btn-secondary\">Cancel</button></div></div></div>"
  );


  $templateCache.put('src/modal/modalbody.html',
    "<div style=\"width:200px;height:60px;margin:20px\">Hello Modal!</div>"
  );


  $templateCache.put('src/tooltip/popover.html',
    "<div class=\"pre-popover-wrapper\"><div class=\"popover-arrow\"></div><button class=\"close pre-icon-close-box\" type=\"button\"></button><div class=\"popover-inner\"><h3 class=\"popover-title\"></h3><div class=\"popover-content\"></div></div></div>"
  );


  $templateCache.put('src/tooltip/tooltip.html',
    "<div class=\"tooltip-container\"><span class=\"tooltip-arrow\"></span><p class=\"tooltip-inner\"></p></div>"
  );

}]);
