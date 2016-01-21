(function () {
    'use strict';

    angular.module('prerial').directive('preContextMenu', ContextMenu);

    ContextMenu.$inject = ['TemplateService'];

    function ContextMenu(templateService) {

        var TEMPLATE_ERROR = 'Unable to load menu content';

        return {
            controller: function () {
                this.enabled = true;
            },
            require: ['preContextMenu'],
            compile: function (tElem, tAttrs) {

                var menuTemplateUrl = tAttrs.preContextMenu, menuTemplate = templateService.get(menuTemplateUrl);

                if (!menuTemplateUrl) {
                    throw new Error('Context menu is missing required template URL!');
                }

                return function link(scope, elem, attrs, ctrl) {
                    var mouseOffset = 10,
                        offset,
                        contextMenuController = ctrl[0],
                        menuContainer = null,
                        contextScope;

                    elem.bind('contextmenu.pre-context-menu', function (e) {

                        if (!contextMenuController.enabled) {
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
 //                           contextScope.$apply();
 //                           contextScope.$digest();
                        }, function () {
                            menuContainer.append(TEMPLATE_ERROR + ' from \'' + menuTemplateUrl + '\'');
                        }).finally(function () {
                             menuContainer.css({left: (e.clientX + mouseOffset),top: (e.clientY + mouseOffset)}).show();
                        });
                    });

                    function onDestroy(){
                        if (contextScope) {
                            contextScope.closeMenu();
                            contextScope.$destroy();
                            contextScope = null;
                        }
                    }

                    elem.on('$destroy', function () {
                        onDestroy();
                    });
					
                    scope.$on('$destroy', function () {
                        onDestroy();
                        elem.off('.pre-context-menu');
                    });
                };
            }
        };
    }
}());