angular.module('prerial', [])
  .directive('preResizer', function() {

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


