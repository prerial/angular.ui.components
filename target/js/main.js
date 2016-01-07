
(function(window, angular) {
    'use strict';

    angular.module('prerial', ['ngRoute', 'ngResource']);

})(window, window.angular);
;(function (document, angular) {
    'use strict';

    function ComboBoxController(scope, attrs) {
        scope.matches = [];

        scope.isActive = function (item) {
            var isActive = false;
            if (scope.matches.length === 1 && scope.selectedValue === item[attrs.field] ) {
                isActive = true;
            }
            return isActive;
        };

        scope.$on('$destroy', function () {
//            $scope.someElement.remove();
//            currentWindow.off('resize.' +  $scope.$id);
        });
    }

    ComboBoxController.$inject = ['$scope', '$attrs'];

    angular.module('prerial').controller('ComboBoxController', ComboBoxController);

})(document, angular);;(function (document, angular) {
    'use strict';

    function ComboBoxDirective($parse) {

        return {
            restrict: 'E',
            require: ['?ngModel'],
            scope: {
                src: '='
            },
            templateUrl: 'src/combobox/combobox.html',
            controller: 'ComboBoxController',
            replace: true,
            link: function (scope, elem, attrs, controllers) {

                var input = elem.find('input').val(attrs.placeholder),
                    list = $parse( attrs.src ),
                    displayText = $parse( attrs.display),
                    ngModelController = controllers[0];

                ngModelController.$render = renderCurrentValue;
                elem.find('.pre-dropdown-menu').width(elem.find('.pre-combobox').width()-2);

                scope.comboShow = false;
                elem.find('.pre-combobox-toggle').on("click", function handleClickEvent( event ) {
                    if (scope.comboShow){
                        scope.comboShow = false;
                    }else{
                        scope.comboShow = true;
                    }
                    scope.$apply();
                });

                scope.$watch(function (){ return ngModelController.$modelValue;}, function (newValue) {
                    ngModelController.$render();
                    console.log('Watching ngModel: ' + displayText(newValue));
                })

                scope.itemSelect = function (item) {
                    ngModelController.$setViewValue( item );
                    scope.comboShow = false;
                }

                function renderCurrentValue() {
                    scope.matches.length = 0;
                    if(ngModelController.$viewValue && ngModelController.$viewValue[attrs.field]) {
                        scope.matches.push(ngModelController.$viewValue);
                        scope.selectedValue = ngModelController.$viewValue[attrs.field];
                        input.val(displayText(ngModelController.$viewValue));
                    }else {
                        input.val(attrs.placeholder);
                    }
                }
            }
        };
    }

    angular.module('prerial').directive({preCombobox: ComboBoxDirective});

})(document, angular);

;/**
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
;(function(window, angular) {
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
})(angular);;(function(window, angular) {
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

}]);
