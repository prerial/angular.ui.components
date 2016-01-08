
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
})(angular, window);