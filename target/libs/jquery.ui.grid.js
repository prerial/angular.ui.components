Array.prototype.move = function(from, to){
	var element = this[from];
	this.splice(from, 1);
	return this.splice(to, 0, element);
};
var Grid  =  function () {
	var _this = this,
		gridwidth = 0,
		gridheight = 0,
		hiliteHold = null,
		dataArray = [],
		sortIndex = -1,
		headerArray = [],
		typeArray = [],
		widthArray = [],
		element = null,
		_id = '',
		_table = null,
		_header = null,
		_tbody = null;

	this.init = function (params) {
		element = $('#' + params.elid);
		_this.options = params;
		_id = params.elid;
		headerArray = _this.options.headers;
		typeArray = _this.options.coltypes;
		widthArray = _this.options.colwidth;
		dataArray = _this.options.data;
		gridwidth = element.width();
		gridheight = element.height();
		buildTable(element);
		_this.sort = new GridSort();
		var params = { element: element, id: _id, table: _table[0], header: _header[0],	tablecells: _table.find("TH"), headercells: _header.find("TH"), celllength: headerArray.length - 1,	hScrollArea: _header.parent()[0], scrollArea: _table.parent()[0] };
		_this.colresize = new ColumnResize();
		_this.colresize.initialize(params);
		setGridEvents();
	};

	var getTable = function(id, arr){
		var tablewidth = 0;
		arr.map(function(cellwidth){tablewidth += cellwidth;})
		return $("<table class='obj' id='" + id + "' style='table-layout:fixed;width:" + parseInt(tablewidth + 20) + "px' cellspacing='0' cellpadding='0' border='0'></table>");
	};

	var getHeader = function(bln){
		var thead = $("<thead/>"), tr = $("<tr/>");
		headerArray.map(function(row, idx){
				var th = $("<th class='hdrcell' style='width:" + widthArray[idx] + "px;padding:0;margin:0'></th>");
				bln? th.html("<span class='text-span sort-" + _id +"' style='cursor:pointer' title='" + row + "' idx='" + idx + "'>" + row + "</span>") : th.addClass("tblcell");
				tr.append(th);
			}
		);
		var th = $("<th/>").width("100%");
		bln? th.html("<span class='text-span'>&nbsp;</span>") : tr.css("visibility","hidden");
		tr.append(th);
		thead.append(tr);
		return thead;
	};

	var writeDataTable = function(dataArr){
		var trArr = [];
		jQuery.each(dataArr, function(i, row){
				trArr.push("<tr class='jqRow' id='" + row.rowAttributes.id + "'>");
				var tdArr = [];
				jQuery.each(row.rowData, function(i, cell){
						var tdclass = "";
						if(typeArray[i] === "num" || typeArray[i] === "dte") { tdclass=" class='cell-right'"};
						tdArr.push("<td" + tdclass + "><span class='text-span'>" + cell + "</span></td>");
					}
				);
				trArr.push(tdArr.join("") + "</tr>");
			}
		);
		return _tbody.html(trArr.join(""));
	};

	var buildTable = function(_parent){
		_tbody = $("<tbody id='" + _id + "MainTbody"+"'></tbody>");
		var hScrollArea = $("<div class='HScrollArea' id='" + _id + "HScrollArea'></div>").css('position','relative').css('top','0').css('left','0').css('width','100%');
		_header = getTable(_id + "HeadTable", widthArray).css('background', "#D1CCC3").css('border-bottom', "1px solid #666");
		var headerThead = getHeader(true);
		_header.append(headerThead).css('width', "100%");
		hScrollArea.append(_header);
		var bodyScrollArea = $("<div class='ScrollArea' id='" + _id + "ScrollArea' style='width:" + gridwidth + "px;overflow:auto'></div>");
		_table = getTable(_id + "MainTable", widthArray);
		_table.append(getHeader(false));
		_table.append(writeDataTable(dataArray));
		bodyScrollArea.append(_table);
		_parent.append(hScrollArea);
		_parent.append(bodyScrollArea);
		bodyScrollArea.css('height', parseInt(gridheight - $(headerThead).height())-2);
	};

	var resize = function(){
		$('#gridbox').css('width','100%');
		$('.ScrollArea').css('width','100%');
		$('.HScrollArea').css('width','100%');
	};

	var moveColumn = function (gridparams, from, to, where) {
		var cols = gridparams.headercells;
		where === 'after'? cols.eq(from).detach().insertAfter(cols.eq(to)) :  cols.eq(from).detach().insertBefore(cols.eq(to));
		var rows = jQuery('tr', gridparams.table);
		rows.each(function() {
			tcols = jQuery(this).children('th, td');
			where === 'after'? tcols.eq(from).detach().insertAfter(tcols.eq(to)) : tcols.eq(from).detach().insertBefore(tcols.eq(to));
		});
		var newcols = [];
		_header.find("TH").each(function(idx, row) {
			$(row).children().attr('idx', idx);
			if($(row).children().attr('title')) newcols.push($(row).children().attr('title'));
		});
		headerArray = newcols;
		typeArray.move(from, to);
		widthArray.move(from, to);
	};

	var highlight = function(){
		if (hiliteHold != null){hiliteHold.style.background = "";}
		this.style.background = "#eee";
		hiliteHold = this;
		$('body').trigger('jrowclick',$(this).attr('id'));
	};
	var onscroll = function(){
		$("#" + _id + "HScrollArea").css('left', -$('#' + _id + 'ScrollArea').scrollLeft());
	};
	var onsort = function(){
		var arr = $.makeArray(_tbody[0].rows);
		var blnReverse = sortIndex === this.getAttribute('idx')? true : false;
		sortIndex  = this.getAttribute('idx');
		blnReverse? arr.reverse() : arr = _this.sort.dosort(arr, typeArray, sortIndex);
		$.each(arr, function(i,row){
			_tbody[0].appendChild(row);
		});
	};
	var oncontextmenu = function(e){
		if(e.preventDefault != undefined)
			e.preventDefault();
		if(e.stopPropagation != undefined)
			e.stopPropagation();
	};
	var onmousedown = function(evt){
		var headarr = [];
		if(evt.button === 2){
			if(!$('#gridcontextmenu').length){
				var el = evt.target;
				headarr = $(el).closest('table').find('.hdrcell');
				var liarr = [];
				for (var i = 0; i < headerArray.length; i++){
					liarr.push('<li title="' + headerArray[i] + '">' + headerArray[i] + '</li>');
				}
				var contextMenuTmpl = '<button ng-click="hide()" class="close pre-icon-close-box" type="button"></button><ul class="sortable list">' + liarr.join('') + '</ul>';
				var mask = $('<div id="gridcontextmenu"></div>');
				element.append(mask);
				$('#gridcontextmenu').html(contextMenuTmpl);
				_this.sortable = new sortable($('.sortable'));
				$('.sortable').on('sortupdate', function(){
					var params = { element: element, id: _id, table: _table[0], header: _header[0],	tablecells: _table.find("TH"), headercells: _header.find("TH"), celllength: headerArray.length - 1,	hScrollArea: _header.parent()[0], scrollArea: _table.parent()[0] };
					moveColumn(params, arguments[1].from, arguments[1].to, arguments[1].where);
					var params = { element: element, id: _id, table: _table[0],	header: _header[0],	tablecells: _table.find("TH"), headercells: _header.find("TH"), celllength: headerArray.length - 1,	hScrollArea: _header.parent()[0], scrollArea: _table.parent()[0] };
					_this.colresize.initialize(params);
				});
				$('.pre-icon-close-box').on('click',function(evt){
					$('.sortable').off('sortupdate');
					$('#gridcontextmenu').remove();
				})
			}
		}
	};

	var setGridEvents = function(){
		$('body').bind("contextmenu",oncontextmenu);
		$('.jqRow').bind('click', highlight);
		$('#' + _id + 'ScrollArea').bind('scroll', onscroll);
		$('.sort-' + _id).bind('click', onsort)
		$('.hdrcell').on('mousedown',onmousedown);
	};

	this.destroy = function() {
		$('body').unbind("contextmenu",oncontextmenu);
		$('.jqRow').unbind('click', highlight);
		$('#' + _id + 'ScrollArea').unbind('scroll', onscroll);
		$('.sort-' + _id).unbind('click', onsort)
		$('.hdrcell').off('mousedown',onmousedown);
	}
};

var GridSort = function(){
	var cellindex = null;
	this.dosort = function(arr, arrtype, idx){
		cellindex = idx;
		return arr.sort(sortype[arrtype[idx]]);
	};
	var getCellContent = function(row){
		return $(row).children('td')[cellindex].childNodes[0].innerHTML.toUpperCase();
	};
	var getCellsContent = function(row1, row2){
		return {
			one:$(row1).children('td')[cellindex].childNodes[0].innerHTML.toUpperCase(),
			two:$(row2).children('td')[cellindex].childNodes[0].innerHTML.toUpperCase()
		}
	};
	var sortype = {
		str: function(row1,row2){
			var cells = getCellsContent(row1,row2);
			return (cells.one < cells.two) ? -1 : (cells.one > cells.two) ? 1 : 0;
		},
		num: function(row1,row2){
			var cells = getCellsContent(row1,row2);
			return cells.one.replace(/[^0-9.\-]/g,"") - cells.two.replace(/[^0-9.\-]/g,"");
		},
		dte: function(row1,row2){
			return Date.parse(getCellContent(row1)) - Date.parse(getCellContent(row2));
		}
	};
};

var ColumnResize = function(){

	var blnResizeActive = false,
		blnResizeAction = false,
		cellActive = null,
		mouseOverCell = null,
		container = null,
		containerOffset = null,
		containerOffsetLeft = null,
		scrollLeft = null,
		id = null,
		table = null,
		header = null,
		tablecells = null,
		headercells = null,
		celllength = null,
		hScrollArea = null,
		scrollArea  = null;

	this.initialize = function(gridparams){
		blnResizeActive = false;
		blnResizeAction = false;
		cellActive = null;
		mouseOverCell = null;
		container = gridparams.element[0];
		containerOffset = gridparams.element.offset(),
			containerOffsetLeft = containerOffset.left,
			scrollLeft = 0,
		id = gridparams._id;
		table = gridparams.table;
		header = gridparams.header;
		tablecells = gridparams.tablecells;
		headercells = gridparams.headercells;
		celllength = gridparams.celllength;
		hScrollArea = gridparams.hScrollArea;
		scrollArea  = gridparams.scrollArea;
		setColumnResizeEvents();
	};
	function changeCursor(event){
		if(mouseOverCell.cellIndex < celllength){
			if(event.pageX > $(mouseOverCell).offset().left + mouseOverCell.offsetWidth - 5){
//				if(event.pageX > $(mouseOverCell).offset().left + mouseOverCell.offsetWidth + scrollArea.scrollLeft - 5){
				mouseOverCell.style.cursor = "e-resize";
				blnResizeActive = true;
			}else{
				mouseOverCell.style.cursor = "default";
				blnResizeActive = false;
			}
		}
	}
	var resetHeaderWidth = function(){
		hScrollArea.style.width = (container.offsetWidth > table.offsetWidth)? parseInt(container.offsetWidth)+"px" : parseInt(table.offsetWidth)+"px";
	};
	function doScroll(){
		scrollLeft = scrollArea.scrollLeft;
		hScrollArea.style.left = - scrollLeft + "px";
		resetHeaderWidth();
	}
	var mousemove = function(event){
		blnHeader = false;
		evt = window.event || event;
		var el = evt.srcElement || evt.target;
		if(el.nodeName!="TH"){el = el.parentNode;}
		if(el.nodeName == "TH" && !blnResizeAction){
			mouseOverCell = el;
			blnHeader = true;
		}
		if(blnHeader){
			changeCursor(event);
		}
		if(blnResizeActive && blnResizeAction){
			var thcell = headercells[cellActive.cellIndex];
			var tblcell = tablecells[cellActive.cellIndex];
			var width = event.pageX - $(thcell).position().left + scrollArea.scrollLeft - containerOffsetLeft;
			tblcell.style.width =  (width < 20)? "20px" : width + "px";
			thcell.style.width = (width < 20)? "20px" : width + "px";
			doScroll();
			disableSelection(document.body);
		}
	};
	var mousedown = function(event){
		if(blnResizeActive){
			if(mouseOverCell.cellIndex < celllength){
				blnResizeAction = true;
				cellActive = mouseOverCell;
				cellActive.style.backgroundColor = "#bcb";
			}
		}
	};
	var mouseup = function(event){
		if(cellActive) cellActive.style.backgroundColor = "";
		cellActive = null;
		blnResizeAction = false;
		blnResizeActive = false;
		resetHeaderWidth();
	};
	var setColumnResizeEvents = function(){
		$(header).unbind("mousemove",mousemove);
		$(header).unbind("mousedown",mousedown);
		$('body').unbind("mouseup",mouseup);
		$(header).bind("mousemove",mousemove);
		$(header).bind("mousedown",mousedown);
		$('body').bind("mouseup",mouseup);
	};

};

