
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

}(angular, jQuery));