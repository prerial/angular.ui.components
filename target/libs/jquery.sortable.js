var sortable = function(el) {

	return el.each(function() {

		var index, dragging, placeholders = $();
		var items = $(this).children();
		var placeholder = $('<' + (/^ul|ol$/i.test(this.tagName) ? 'li' : 'div') + ' class="sortable-placeholder">');
		placeholders = placeholders.add(placeholder);

		items.attr('draggable', 'true')
		.on('dragstart', function(e) {
			index = (dragging = $(this)).addClass('sortable-dragging').index();
		}).on('dragend', function() {
			dragging.removeClass('sortable-dragging').show();
			placeholders.detach();
			if (index != dragging.index()) {
				var newindex = $(this).parent().find("[title='" + dragging.attr('title') + "']").index();
				var where = index > newindex? 'before' : 'after';
				items.parent().trigger('sortupdate', {from:index, to: newindex, where: where});
			}
			dragging = null;
		})
		.not()
		.add([this, placeholder])
		.on('dragover dragenter drop', function(e) {
			if (e.type == 'drop') {
				e.stopPropagation();
				placeholders.filter(':visible').after(dragging);
				return false;
			}
			e.preventDefault();
			if (items.is(this)) {
				dragging.hide();
				$(this)[placeholder.index() < $(this).index() ? 'after' : 'before'](placeholder);
				placeholders.not(placeholder).detach();
			} else if (!placeholders.is(this) && !$(this).children().length) {
				placeholders.detach();
				$(this).append(placeholder);
			}
			return false;
		});
	});
};
