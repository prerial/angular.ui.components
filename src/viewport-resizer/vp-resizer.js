angular.module('prerial')
    .directive('resizable', function() {

        return {
            restrict: 'A',
            scope: {
                rDirection: '@',
                rWidth: '@'
            },
            link: function(scope, element) {

                var body = $('body'), nextSibling, w, h, nsw, nsh, dir = scope.rDirection, start;
                element.addClass('resizable');
                element.css('width', scope.rWidth);
                nextSibling = element.next();

                function onResize() {
                    if(nextSibling.find('.section-content')) nextSibling.find('.section-content').css('width', nextSibling.width()-12).css('height', nextSibling.height()-12);
                    if(element.find('.section-content')) element.find('.section-content').css('width', element.width()-12).css('height', element.height()-12);
                }

                scope.$on('rootresized', function(){
                    onResize();
                });

                function dragging(e) {
                    if(dir === 'horizontal'){
                        element.css('width', (w - (start - e.clientX)));
                        nextSibling.css('left', (w - (start - e.clientX)))
                    }else{
                        element.css('height', (h - (start - e.clientY)));
                        nextSibling.css('top', (h - (start - e.clientY)));
                        nextSibling.css('height', (nsh + (start - e.clientY)));
                    }
                    onResize();
                }

                function dragEnd() {
                    body.off('mouseup', dragEnd);
                    body.off('mousemove', dragging);
                    element.removeClass('no-transition');
                    scope.$emit('resized', []);
                    scope.$digest();
                }

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
                }

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
