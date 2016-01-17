
(function(window, angular) {
    'use strict';

    angular.module('prerial', ['ngRoute', 'ngResource','ngAnimate', 'ui.bootstrap']);

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

})(document, angular);;/**
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
})(angular);;/**
 * Created by Mikhail on 1/12/2016.
 */
(function() {
    'use strict';

    angular.module('prerial') .constant('Navigation',

        {
            'Home': {
                    route: '/home',
                    config: {controller: 'appController', template:'<h2 class="examples-pane">Controllers Home</h2>'}
            },
            'DataProvider':
                {
                    route: '/data-provider',
                    config: {controller: 'dataProviderController', templateUrl:'partials/data-provider.html'}
            },
            'Modal':
                {
                    route: '/modal',
                    config: {controller: 'modalCtrl', templateUrl:'partials/modal.html'}
            },
            'ViewportResizer':
                {
                    route: '/viewport-resizer',
                    config: {controller: 'viewPortResizeCtrl', templateUrl:'partials/viewport-resizer.html'}
            },
            'Notifications':
                {
                    route: '/notifications',
                    config: {controller: 'notificationsCtrl', templateUrl:'partials/notifications.html'}
            },
            'Combobox':
                {
                    route: '/combobox',
                    config: {controller: 'comboboxCtrl', templateUrl:'partials/combobox.html'}
            },
            'Tooltip':
                {
                    route: '/tooltip',
                    config: {controller: 'tooltipCtrl', templateUrl:'partials/tooltip.html'}
                },
            'GridTag':
            {
                route: '/gridtag',
                config: {controller: 'gridtagCtrl', templateUrl:'partials/gridtag.html'}
            },
            'Buttons':
            {
                route: '/buttons',
                config: {controller: 'ButtonsCtrl', templateUrl:'partials/buttons.html'}
            },
            'Form':
            {
                route: '/form',
                config: {controller: 'FormCtrl', templateUrl:'partials/form.html'}
            },
            'Form1':
            {
                route: '/form1',
                config: {controller: 'Form1Ctrl', templateUrl:'partials/form/form1.html'}
            },
            'Form2':
            {
                route: '/form2',
                config: {controller: 'Form2Ctrl', templateUrl:'partials/form/form2.html'}
            }
        });

})();
;(function (angular) {
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
;(function() {
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


})();



;(function() {
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

})();


;(function () {
    'use strict';

    angular.module('prerial').controller('dtDataProviderController', DataProviderController);

    function DataProviderController($scope) {
        var scope = $scope;

		this.setData = function(params){
			scope.$parent[scope.dataProviderId] = params.data.output;
		}
    }

})();


;(function() {
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

})();



;(function (angular) {
    'use strict';

    angular.module('prerial').directive('prerialColumn', function() {
		return {
			restrict: 'E',
			replace: true,
			require: '^prerialGrid',
			link: function(scope, elem, attrs, parentCtrl) {
				parentCtrl.columns.push( {title: attrs.title, field: attrs.field, width: attrs.width, format: attrs.format});
			}
		};
	});

}(angular));


;'use strict';

angular.module('prerial').controller('preGridController', ['$scope', '$http', '$log', function ($scope, $http, log) {
    this.columns = [];
    this.elid = $scope.id;
    this.buildTable = function (elid, cols) {
        var responsePromise = $http.get("data/griddata.js");
        responsePromise.success(function (data, status, headers, config) {
            $scope.$parent.buildGrid(elid, cols, data)
        });
        responsePromise.error(function (data, status, headers, config) {
            alert("AJAX failed!");
        });
    };
}]);;(function (angular) {
    'use strict';

	angular.module('prerial').run(['$templateCache', function($templateCache) {
		'use strict';

		$templateCache.put('templates/prerial-grid.html',
            '<div></div>'
		);
	}]);

    angular.module('prerial').directive('prerialGrid', function() {

		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			templateUrl: 'templates/prerial-grid.html',
			controller: 'preGridController',
			scope: {
                //Data
                data: '=src',
                //Properties
                id: '@',
                caption: '@',
                width: '@',
                height: '@',
                //Behavior
                sortable: '@', //true|false|multi
                editable: '@',
                resizable: '@',
                //UI features
                showTotals: '@',
                showPageSize: '@',
                showPagination: '@',
                showCaption: '@',
                pageSize: '@',
                page: '@',
                pagination: '@', //true|false
                rowCount: '@',
                resultsPerPage: '@',
                //Events
                onRowSelect: '&',
                onRowClick: '&',
                onRowUnselect: '&',
                onRowSelectionChange: '&',
                onCellClick: '&',
                onCellMouseover: '&',
                onCellMouseout: '&',
                onSort: '&',
                onPageChange: '&',
                onPageSizeChange: '&',
                onPrevPage: '&',
                onNextPage: '&',
                onColumnResize: '&'
            },
            compile: function () {

                return function link(scope, elem, attrs, Grid, linker) {
                    var transcludedContent;

                    linker(scope, function (clone) {
                        elem.append(clone);
                        transcludedContent = clone;
                    });

                   scope.$$postDigest(function () {
                        /**
                         * Because transcluded content is only used for configuration purposes, it needs to be explicitly
                         * cleaned up to avoid memory leaks. To clean up a compiled template we call remove method on it.
                         */
						$('#trans-temp').remove();
						transcludedContent.remove();
						transcludedContent = null;
                    });

                   Grid.buildTable(Grid.elid, Grid.columns);

                }
            }
		}
});

}(angular));


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

    function TooltipController( attrs, elem, $templateCache, tooltipService, Debounce) {

        var titleHold, template, dimensions;

        this.hideTooltip = function() {
            if (template) {
                Debounce(1000,function(){
                    elem.attr("title", titleHold);
                    template.remove();
                })
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
 //           Debounce(200,function(){
                $('body').append(template);
//            dimensions = tooltipService.getDimensions(elem, $('.tooltip-container'), $('.tooltip-tooltip-arrow'), true);
                var top = elem.offset().top - ($('.tooltip-container').height() + elem.height());
                var left = e.clientX - elem.width()/2;
                template.css('left', left).css('top', top).stop(true,true).fadeIn(2000);

//            })
        };

    }

    TooltipController.$inject = ['$attrs', '$element', '$templateCache','TooltipService', 'Debounce'];

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
    angular.module('prerial').directive("preTooltip", TooltipDirective);

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
;angular.module('prerial')
    .directive('resizable', function() {

        return {
            restrict: 'A',
            scope: {
                rDirection: '@',
                rWidth: '@'
            },
            link: function(scope, element) {

                var body = $('body'), nextSibling, w, h, dir = scope.rDirection, start;

                element.addClass('resizable');
                element.css('width', scope.rWidth);
                nextSibling = element.next();

                function resize() {
                    if(nextSibling.find('.section-content')) nextSibling.find('.section-content').css('width', nextSibling.width()-12).css('height', nextSibling.height()-12);
                    if(element.find('.section-content')) element.find('.section-content').css('width', element.width()-12).css('height', element.height()-12);
                };

                scope.$on('rootresized', function(){
                    resize();
                });

                function dragging(e) {
                    if(dir === 'horizontal'){
                        element.css('width', (w - (start - e.clientX)))
                        nextSibling.css('left', (w - (start - e.clientX)))
                    }else{
                        element.css('height', (h - (start - e.clientY)));
                        nextSibling.css('top', (h - (start - e.clientY)));
                        nextSibling.css('height', (nsh + (start - e.clientY)));
                    }
                    if(nextSibling.find('.section-content')) nextSibling.find('.section-content').css('width', nextSibling.width()-12).css('height', nextSibling.height()-12);
                    if(element.find('.section-content')) element.find('.section-content').css('width', element.width()-12).css('height', element.height()-12);

                };

                function dragEnd(e) {
                    body.off('mouseup', dragEnd);
                    body.off('mousemove', dragging);
                    element.removeClass('no-transition');
                    scope.$emit('resized', []);
                    scope.$digest();
                };

                function dragStart(e, direction) {
                    start = direction === 'horizontal' ? e.clientX : e.clientY;
                    w = parseInt(element.css('width'));
                    h = parseInt(element.css('height'));
                    nsw = parseInt(nextSibling.css('width'));
                    nsh = parseInt(nextSibling.css('height'));
                    element.addClass('no-transition');
                    body.on('mouseup', dragEnd);
                    body.on('mousemove', dragging);
                    if (e.stopPropagation) e.stopPropagation();
                    if (e.preventDefault) e.preventDefault();
                    e.cancelBubble = true;
                    e.returnValue = false;
                };
                var draghandle = $('<div />').attr('class', 'rg-' + dir).html('<span></span>');
                element.append(draghandle);
                draghandle.on('mousedown', function(e) {
                    if (e.which === 1) {
                        dragStart(e, dir);
                    }
                });
            }
        };
    });
;/**
 * Created by Mikhail on 1/16/2016.
 */
(function() {
    'use strict';

    angular.module('prerial')
        .controller('appController', function($scope) {

        });

})();;/**
 * Created by Mikhail on 1/16/2016.
 */
(function() {
    'use strict';

//    angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
    angular.module('prerial').controller('ButtonsCtrl', function ($scope) {

        $scope.singleModel = 1;

        $scope.radioModel = 'Middle';

        $scope.checkModel = {
            left: false,
            middle: true,
            right: false
        };

        $scope.checkResults = [];

        $scope.$watchCollection('checkModel', function () {
            $scope.checkResults = [];
            angular.forEach($scope.checkModel, function (value, key) {
                if (value) {
                    $scope.checkResults.push(key);
                }
            });
        });
    });


})();
;/**
 * Created by Mikhail on 1/16/2016.
 */
(function() {
    'use strict';

    angular.module('prerial').controller('comboboxCtrl', ['$scope', '$log', function(scope, $log) {
        scope.employees = [
            {
                id: 1,
                name: "Sam",
                title: "VP"
            },
            {
                id: 2,
                name: "Felix",
                title: "Node MQ"
            },
            {
                id: 3,
                name: "Wess",
                title: "Charts Pro"
            },
            {
                id: 4,
                name: "Kevin",
                title: "JS Pro"
            }
        ];

        scope.onSelect = function (value, data) {
            $log.info('Combobox selected:', value, data);
        };

        scope.onChange = function (value) {
            $log.info('Combobox changed:', value);
        };

    }]);
})();
;/**
 * Created by Mikhail on 1/16/2016.
 */
(function() {
    'use strict';

    angular.module('prerial')
        .controller('dataProviderController', function($scope) {

            $scope.onDataLoad = function(params){

            }

        });

})();;/**
 * Created by Mikhail on 1/16/2016.
 */
(function() {
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
/*
        scope.items = [
            {value: 0, label: 'Will', guid: 5, name: 'Will override'},
            {value: 1, label: 'Tim', guid: 8, name: 'Tim override'},
            {value: 2, label: 'John', guid: 9, name: 'John override'}
        ];
*/
        scope.setPristine = function (form) {
                form.$setPristine();
        };

        scope.clearModel = function () {
            scope.formExample = new Example();
            scope.formExample.message = " Model Cleared";
            scope.setPristine(scope.demoForm);
        };

        scope.customEnterFunc = function () {
            scope.formExample.message = "This is a custom function, called on click on Enter button................";
            $log.info("This is a custom function, called on click on Enter button................");
        };

    }]);

})();
;/**
 * Created by Mikhail on 1/16/2016.
 */
/**
 * Created by Mikhail on 1/16/2016.
 */
/////////// aaaaaaaa  Form Start  //////////////////////////////
(function () {

    angular.module('prerial').controller('FormCtrl', ['$scope', '$log', function (scope, $log) {

    }])
    .controller('FormValidateCtrl', ['$scope', '$log', function (scope, $log) {

    }])

    .controller('Form2Ctrl', ['$scope', function($scope) {
            $scope.user1 = { name: 'John', data: '' };
            $scope.user2 = { name: 'Matt', data: '' };
            $scope.user3 = { name: 'Kevin', data: '' };

            var _name = 'Ann';
            $scope.user4 = {
                name: function(newName) {
                    // Note that newName can be undefined for two reasons:
                    // 1. Because it is called as a getter and thus called with no arguments
                    // 2. Because the property should actually be set to undefined. This happens e.g. if the
                    //    input is invalid
                    return arguments.length ? (_name = newName) : _name;
                }
            };

            $scope.cancel = function(e) {
                console.log(e.keyCode);
                if (e.keyCode == 27) {
                    $scope.user3Form.user3Name.$rollbackViewValue();
                }
            };
        }])

    .controller('Form3Ctrl', ['$scope', function($scope) {
        $scope.user = {};
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
;/**
 * Created by Mikhail on 1/16/2016.
 */
(function() {
    'use strict';

    angular.module('prerial').controller('gridtagCtrl', ['$scope', function($scope) {

        $scope.buildGrid = function(elemid, options, data){
            var params = {
                elid:elemid,
                fields:[],
                headers:[],
                coltypes:[],
                colwidth:[],
                data:data.data.Deals
            };

            options.map(function(item) {
                params.fields.push(item.field);
                params.headers.push(item.title);
                params.coltypes.push(item.format);
                params.colwidth.push(parseInt(item.width));
            });

            var mygrid = new Grid();
            mygrid.init(params);
        }
    }]);

})();
;/**
 * Created by Mikhail on 1/16/2016.
 */
/**
 * Created by Mikhail on 1/16/2016.
 */
(function() {
    'use strict';

    angular.module('prerial').controller('modalCtrl', ['$scope', 'prerialModal',

        function (scope, prerialModal) {
            var modalWindow = null;
            scope.showModal = function () {
                modalWindow = new prerialModal();
                modalWindow.show();
            };
            scope.$on("destroy:modal", function handleDestroyEvent() {
                modalWindow = null;
            });
        }]);

})();;/**
 * Created by Mikhail on 1/16/2016.
 */
(function() {
    'use strict';

    angular.module('prerial')
    .controller('notificationsCtrl', ['$scope', 'preNotificationService', function(scope, saNotificationService) {

        // Get, configure the notifications, and register to scope.
        // You can set the configuration in one shot like so:
        scope.notification1 = saNotificationService.create({
            title: 'Simple notice',
            text: 'A regular notice'
        });

        scope.notification2 = saNotificationService.create({
            title: 'Sticky notice',
            text: 'You have to click to close me yourself',
            hide: false
        });

        scope.notification3 = saNotificationService.create({
            title: 'See Through Notice',
            text: 'This is semi-transparent, opacity = 0.5',
            opacity: 0.5
        });

        scope.notification4 = saNotificationService.create({
            title: 'No Shadow Notice',
            text: 'I don\'t have a shadow. (It\'s cause I\'m a vampire or something. Or is that reflections...)',
            shadow: false
        });

        scope.notification5 = saNotificationService.create({
            title: 'Regular Success',
            text: 'That thing that you were trying to do worked!',
            type: 'success'
        });

    }]);

})();

;/**
 * Created by Mikhail on 1/4/2016.
 */
(function() {
    'use strict';

    angular.module('prerial')
        .directive('dtTest', function() {

            return {
                restrict: 'E',
                template: '<ul ng-click="setLeftMenu($event)"><li ng-repeat="item in pizzaData"><div>{{item.Title}}</div></li></ul>',
                link: function(scope){

                }
            }
        });

})();

function disableSelection(target){
    if (typeof target.onselectstart!="undefined") //IE route
        target.onselectstart=function(){return false}
    else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
        target.style.MozUserSelect="none"
    else //All other route (ie: Opera)
        target.onmousedown=function(){return false}
    target.style.cursor = "default"
}

function getElementLeft(el){
    var ol = el.offsetLeft;
    while ((el = el.offsetParent) != null) { ol += el.offsetLeft; }
    return ol;
}
;/**
 * Created by Mikhail on 1/16/2016.
 */
(function() {
    'use strict';

    angular.module('prerial').controller('tooltipCtrl', ['$scope', '$log', function(scope, $log) {

    }]);
})();
;/**
 * Created by Mikhail on 1/16/2016.
 */
(function() {
    'use strict';

    angular.module('prerial').controller('viewPortResizeCtrl',['$rootScope', function($rootScope) {

         $rootScope.$on('resized', function(){
            $rootScope.$broadcast('rootresized', []);
        });

        $rootScope.$watch(function (){ return $rootScope.resized;}, function (newValue) {
            $rootScope.$broadcast('rootresized', []);
        });

    }]);

})();
