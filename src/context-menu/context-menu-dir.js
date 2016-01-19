(function () {
    'use strict';

    angular.module('prerial').directive('preContextMenu', ContextMenu);

    ContextMenu.$inject = ['TemplateService'];

    function ContextMenu(templateService) {

        var TEMPLATE_ERROR_MESSAGE = 'Unable to load menu content';

        return {
            controller: function () {
                this.enabled = true;
            },
            require: ['preContextMenu'],
            compile: function (tElem, tAttrs) {

                var menuTemplateUrl = tAttrs.preContextMenu,
                    menuTemplate = templateService.get(menuTemplateUrl);

                if (!menuTemplateUrl) {
                    throw new Error('Context menu is missing required template URL!');
                }

                return function link(scope, elem, attrs, ctrl) {
                    var mouseOffset = 10, offset,
                        saContextMenu = ctrl[0],
                        menuContainer = null,
                        contextScope,
                        containerConfig = {
                            closeOnBlur: {
                                ignoreChildren: true
                            },
                            closeOnScroll: true,
                            closeOnResize: true,
                            onClose: function () {
                                contextScope.$destroy();
                            }
                        };

                    elem.bind('contextmenu.pre-context-menu', function (e) {

                        if (!saContextMenu.enabled) {
                            return;
                        }
                        e.preventDefault();
                        contextScope = scope.$new();
                        contextScope.closeMenu = function () {
                            if(menuContainer){
                                menuContainer.empty();
                                menuContainer.remove();
                                menuContainer = null;
                            }
                        };
                        offset = elem.offset();
                        menuTemplate.then(function (template) {
                            template(contextScope, function (contents) {
                                if(menuContainer && menuContainer.first){
                                    menuContainer.empty();
                                }else{
                                    menuContainer = $('<div class="context-menu-container"></div>').appendTo($('body'));
                                }
                                menuContainer.append(contents);
                            });
                            contextScope.$digest();
                        }, function () {
                            menuContainer.append(TEMPLATE_ERROR_MESSAGE + ' from \'' + menuTemplateUrl + '\'');
                        }).always(function () {
                             menuContainer.css({left: (e.clientX + mouseOffset),top: (e.clientY + mouseOffset)}).show();
                        });
                     });

                    /**
                     * Close menu and cleanup the scope when originating element is destroyed
                     */
                    elem.on('$destroy', function () {
                        if (contextScope) {
                            contextScope.closeMenu();
                            contextScope.$destroy();
                            contextScope = null;
                        }
                    });
					
                    /**
                     * Cleanup memory on Scope.$destroy
                     */
                    scope.$on('$destroy', function () {
                        if (contextScope) {
                            contextScope.closeMenu();
                            contextScope.$destroy();
                            contextScope = null;
                        }
                        elem.off('.pre-context-menu');
                    });
                };
            }
        };
    }
}());