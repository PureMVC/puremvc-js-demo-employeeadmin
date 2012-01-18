// Author: Marko Šantić
// Web: http://www.omnisdata.com/omnigrid
// Email: marko@omnisdata.com
// Company: Omnisdata Ltd.
// Licence: Creative Commons Attribution 3.0 Unported License, http://creativecommons.org/licenses/by/3.0/
//			If you copy, distribute or transmit the source code please retain the above copyright notice, author name and project URL. 
// Required: Mootools 1.2
// Version: OmniGrid 1.2.5
// ****************************************************************************

var omniGrid = new Class({
	Implements: [Events,Options],
				  
	getOptions: function(){
		return {
			alternaterows: true,	
			showHeader:true,
			sortHeader:false,
			resizeColumns:true,
			selectable:true,
			serverSort:true,
			sortOn: null,
			sortBy: 'ASC',
			filterHide: true,
			filterHideCls: 'hide',
			filterSelectedCls: 'filter',
			multipleSelection:true,
			// accordion
			accordion:false,
			accordionRenderer:null,
			autoSectionToggle:true, // if true just one section can be open/visible
			// pagination
			url:null,
			pagination:false,
			page:1,
			perPageOptions: [10, 20, 50, 100, 200],
			perPage:10
		};
	},
	
	initialize: function(container, options){
		this.setOptions(this.getOptions(), options);
		this.container = $(container);
		
		if (!this.container)
			return;
			
		this.draw();
		
		this.reset();
		
		this.loadData();
	},
	
	// API	
	reset: function(){
		
		this.renderData();
		
		this.refreshDelayID = null;
		this.dragging = false;
		this.selected = new Array();
		
		if (this.options.accordion)	
			this.elements = this.ulBody.getElements('li:nth-child(2n+1)') // all li el. except accordian sections
		else
			this.elements = this.ulBody.getElements('li');

		this.filtered = false;
		this.lastsection = null;
		
		if (this.options.alternaterows)	this.altRow();		

		this.elements.each(function(el,i){
			
			el.addEvent('click', this.onRowClick.bind(this));
			el.addEvent('dblclick', this.onRowDblClick.bind(this));		
			el.addEvent('mouseover', this.onRowMouseOver.bind(this) );
			el.addEvent('mouseout',  this.onRowMouseOut.bind(this) );
			
		}, this);

		// ******************************************************************
		// **************************** Setup header ************************
		// ******************************************************************
		this.container.getElements('.th').each(function(el,i){
			//alert(el.dataType);
			var dataType = el.retrieve('dataType');
			if(dataType){

				el.getdate = function(str){
					// inner util function to convert 2-digit years to 4
					function fixYear(yr) {
						yr = +yr;
						if (yr<50) { yr += 2000; }
						else if (yr<100) { yr += 1900; }
						return yr;
					};
					var ret;
					//
					if (str.length>12){
						strtime = str.substring(str.lastIndexOf(' ')+1);
						strtime = strtime.substring(0,2)+strtime.substr(-2)
					}else{
						strtime = '0000';
					}
					//
					// YYYY-MM-DD
					if (ret=str.match(/(\d{2,4})-(\d{1,2})-(\d{1,2})/)) {
						return (fixYear(ret[1])*10000) + (ret[2]*100) + (+ret[3]) + strtime;
					}
					// DD/MM/YY[YY] or DD-MM-YY[YY]
					if (ret=str.match(/(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})/)) {
						return (fixYear(ret[3])*10000) + (ret[2]*100) + (+ret[1]) + strtime;
					}
					return 999999990000; // So non-parsed dates will be last, not first
				};
				
				//
				el.findData = function(elem){
					var child = elem.getFirst();
					if(child){
						return el.findData(child);
					}else{
						return elem.innerHTML.trim();
					}
				};
				
				//
				el.compare = function(a, b){
					// a i b su LI elementi

					var var1 = a.getChildren()[i].innerHTML.trim();
					var var2 = b.getChildren()[i].innerHTML.trim();
					
					//console.log(el.sortBy);
					
					//var1 = a.getChildren()[i].firstChild.data;
					//var2 = b.getChildren()[i].firstChild.data;
					
					if(dataType == 'number'){
						var1 = parseFloat(var1);
						var2 = parseFloat(var2);
						
						if(el.sortBy == 'ASC'){
							return var1-var2;
						}else{
							return var2-var1;
						}
						
					}else if(dataType == 'string'){
						var1 = var1.toUpperCase();
						var2 = var2.toUpperCase();
						
						if(var1==var2){return 0};
						if(el.sortBy == 'ASC'){
							if(var1<var2){return -1};
						}else{
							if(var1>var2){return -1};
						}
						return 1;
						
					}else if(dataType == 'date'){
						var1 = parseFloat(el.getdate(var1));
						var2 = parseFloat(el.getdate(var2));
						
						if(el.sortBy == 'ASC'){
							return var1-var2;
						}else{
							return var2-var1;
						}
						
					}else if(dataType == 'currency'){
						var1 = parseFloat(var1.substr(1).replace(',',''));
						var2 = parseFloat(var2.substr(1).replace(',',''));
						
						if(el.sortBy == 'ASC'){
							return var1-var2;
						}else{
							return var2-var1;
						}
						
					}
					
				}

			}
		}, this);
	},
			
	toggle: function(el){
		if ( el.getStyle('display') == 'block' )
		{
			el.setStyle('display', 'none');
		}else{
			el.setStyle('display', 'block');
		}
	},
	
	// API
	getSection: function(row){
		return this.ulBody.getElement('.section-'+row);
	},
	
	getLiParent: function (target){
		// ! ako se koristi labelFunction onda neki html elem. moze hvatati event, detektiraj pravi li
		target = $(target);

		while ( target && !target.hasClass('td') ){
			target = target.getParent();
		}
		
		if (target)
			return target.getParent();
	},
	
	onRowMouseOver: function (evt){
		var li = this.getLiParent(evt.target);
		if (!li) return;
		
		if (!this.dragging)
			li.addClass('over');
			
		this.fireEvent("mouseover", {target:this, row:li.retrieve('row'), element:li });
	},
	
	onRowMouseOut: function (evt){
		var li = this.getLiParent(evt.target);
		if (!li) return;
		
		if (!this.dragging)
			li.removeClass('over');
			
		this.fireEvent("mouseout", {target:this, row:li.retrieve('row'), element:li });
	},
	
	onRowClick: function (evt){
	
		var li = this.getLiParent(evt.target);
		
		if (!li) return;
		
		if ( (!evt.control || !this.options.multipleSelection) && this.options.selectable )
		{
			// ocisti stari selection
			this.elements.each(function(el, i){ el.removeClass('selected') }, this);
			
			//for (var i=0; i<this.selected.length; i++) this.elements[ this.selected[i] ].removeClass('selected');
			
			this.selected = new Array();
		}
		
		if (this.options.selectable)
		{
			li.addClass('selected');
			this.selected.push(li.retrieve('row'));
		}
		
		if (this.options.accordion)
		{
			var section = this.getSection(li.retrieve('row'));
		
			if (this.options.autoSectionToggle)
			{
				if (this.lastsection)
					if (this.lastsection != section)
						this.lastsection.setStyle('display', 'none');
				
				if (!this.options.accordionRenderer)
					section.setStyle('display', 'block');
			}
			
			if (this.options.accordionRenderer){
				this.toggle( section );
			}
			
			this.lastsection = section;
		}
		
		this.fireEvent("click", {indices:this.selected, target:this, row:li.retrieve('row'), element:li });
	},
	
	onRowDblClick: function (evt){
		var li = this.getLiParent(evt.target);
		if (!li) return;
		
		this.fireEvent("dblclick", {row:li.retrieve('row'), target:this, element:li});
	},
	
	onLoadData: function (data)
	{
		if ( this.container.getElement('.gBlock') )
			this.container.getElement('.gBlock').dispose();
		
		
		var pReload = this.container.getElement('div.pDiv .pReload');
		if (pReload)
			pReload.removeClass('loading'); 
		
		this.setData(data);
		
		// API
		this.fireEvent("loaddata", {target:this});
	},
	
	// API
	loadData: function (url)
	{
		if (!this.options.url)
			return;
		
		var data = {};
		
		// ************* pagination *************************
		if (this.options.pagination)
			data = {page:this.options.page, perpage:this.options.perPage};
		
		// ************* server sorting *********************
		if (this.options.serverSort){
			data.sorton = this.options.sortOn;
			data.sortby = this.options.sortBy;
		}
			
		// ************* white overflow & loader ************
		if ( this.container.getElement('.gBlock') )
			this.container.getElement('.gBlock').dispose();
			
		var gBlock = new Element('div', {style:'top: 0px; left: 0px;   background: white none repeat scroll 0% 0%;  -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; position: absolute; z-index: 999; opacity: 0.5; filter: alpha(opacity=50'} ) ;
		var bDiv = this.container.getElement('.bDiv');
		
		var top = 1;
		top += this.container.getElement('.tDiv') ? this.container.getElement('.tDiv').getSize().y : 0;
		top += this.container.getElement('.hDiv') ? this.container.getElement('.hDiv').getSize().y : 0;
		
		gBlock.setStyles({width:this.options.width, height: (bDiv ? bDiv.getSize().y:0), top:top});
		gBlock.addClass('gBlock');
		
		this.container.appendChild(gBlock);
		
		var pReload = this.container.getElement('div.pDiv .pReload');
		if (pReload)
			pReload.addClass('loading'); 
		// **************************************************
		
		var url = (url != null) ? url : this.options.url;
		var request = new Request.JSON({url:url, data:data});

		request.addEvent("complete", this.onLoadData.bind(this) ) ;

		request.send();
	},
	
	// API
	refresh: function(){
		this.loadData();
	},
		
	// API
	setData: function(data, cm){
		
		if (this.options.pagination){
			this.options.data = data.data;
			
			this.options.page =  data.page*1;
			this.options.total =  data.total;
			this.options.maxpage = Math.ceil(this.options.total/this.options.perPage);
			
			this.container.getElement('div.pDiv input').value = data.page;
			var to = (data.page*this.options.perPage) > data.total ? data.total : (data.page*this.options.perPage);
			this.container.getElement('div.pDiv .pPageStat').set('html', ((data.page-1)*this.options.perPage+1)+'..'+to+' / '+data.total);
			this.container.getElement('div.pDiv .pcontrol span').set('html', this.options.maxpage);
		}else
			this.options.data = data.data;
		
		if (cm) {
			// first check is new columnModel different from active one
			if (this.options.columnModel != cm) {
				this.options.columnModel = cm;
				// if we change columnModel then we must redraw entire component
				this.draw();
			}
		}
		
		this.reset();
	},
	
	// API
	getData: function(){
		return this.options.data;
	},
	
	// API
	getDataByRow: function(row){
		if (row >=0 && row<this.options.data.length)
			return this.options.data[row];
	},
	
	// API
	setDataByRow: function(row, data){
		if (row >=0 && row<this.options.data.length)
		{	
			this.options.data[row] = data;
			
			this.reset();
		}
	},
	
	// API
	addRow: function(data, row){
		if (row >=0)
		{	
			// ako podataci nisu inic. napravi novi array
			if (!this.options.data)
				this.options.data = [];

			this.options.data.splice(row, 0, data);

			this.reset();
		}
	},
	
	// API
	deleteRow: function(row){
		if (row >=0 && row<this.options.data.length)
		{	
			this.options.data.splice(row, 1);
			this.reset();
		}
	},
	
	isHidden: function(i){
		return this.elements[i].hasClass( this.options.filterHideCls );
	},
	
	showLoader: function(){
		if (this.loader)
			return;
			
		this.loader = new Element('div');
		
		this.loader.addClass('elementloader');
		this.loader.inject(this.container);
	},
	
	hideLoader: function(){
		if (!this.loader)
			return;
			
		this.loader.dispose();
		this.loader = null;
		
	},
	
	// API
	selectAll: function(){

		this.elements.each(function(el, i){ 
			this.selected.push(el.retrieve('row'));
			el.addClass('selected'); 
		}, this);
	},
	
	// API
	unselectAll: function(){
		this.elements.each(function(el, i){ 
			el.removeClass('selected'); 
		}, this);
		
		this.selected = [];
	},
	
	// API
	getSelectedIndices: function(){
		return this.selected;
	},
	
	// API
	setSelectedIndices: function(arr){
		this.selected = arr;
		
		for (var i = 0; i < arr.length; i++) 
		{
			var li = this.elements[arr[i]];
			//el.addClass('selected');
			// simulate user click
			this.onRowClick({target:li.getFirst(), control:false}); 
		}

	},

	// mislim da je visak
	onMouseOver: function(obj){
		//alert(3);
		obj.columnModel.onMouseOver(obj.element, obj.data);
	},
	
	// API
	removeAll: function(){
		if (this.ulBody)
			this.ulBody.empty();
		
		this.selected = new Array();
		
		//this.options.data = null;
	},	
	
	// API
	setColumnModel: function(cmu){
		if ( !cmu )
			return;
				
		this.options.columnModel = cmu;	
		
		this.draw();
	},
	
	// Automatsko odredivanje column modela ako nije zadan
	setAutoColumnModel: function(){
		if ( !this.options.data )
			return;
			
		var rowCount = this.options.data.length;
		
		if ( !(rowCount>0) )
			return;
			
		this.options.columnModel = [];
		
		// uzmi schemu od prvog podatka
		for ( var cn in this.options.data[0] )
		{
			this.options.columnModel.push({header:cn, dataIndex:cn});
		}
		
		
	},
	
	onBodyScroll: function(){
		var hbox = this.container.getElement('.hDivBox');
		
		var bbox = this.container.getElement('.bDiv');
		
		var xs = bbox.getScroll().x;
		
		//hbox.setStyle('position', 'relative');
		hbox.setStyle('left', -xs);

		this.rePosDrag();
		//console.debug(xs);
	},
	
	onBodyClick: function(){
		
	},	
	
	onBodyMouseOver: function(){
		//console.debug(this.onBodyScrollID);
		
	},	
	
	onBodyMouseOut: function(){
		
	},	
	
	// ************************************************************************
	// ************************* Drag columns events **************************
	// ************************************************************************
	
	rePosDrag: function(){
		if (!this.options.resizeColumns)
			return;
			
		var dragTempWidth = 0;
		var cDrags = this.container.getElements('.cDrag div');
		
		var scrollX = this.container.getElement('div.bDiv').getScroll().x;
		
		for (var c = 0; c < this.options.columnModel.length; c++) {
			var columnModel = this.options.columnModel[c];
			
			//if (columnModel.hidden) continue;
			
			// hidden-1
			var dragSt = cDrags[c];
		
			dragSt.setStyle('left', dragTempWidth+columnModel.width+(Browser.Engine.trident ? 1 : 1 )-scrollX);
			//console.log(dragTempWidth+columnModel.width+2);
			
			if (!columnModel.hidden)
				dragTempWidth += columnModel.width;
		}
	},
	
	onColumnDragComplete: function(target){
		this.dragging = false;
		
		var colindex = target.retrieve('column');
		
		// nadi poziciju prvo
		var cDrag = this.container.getElement('div.cDrag');
		var dragSt = cDrag.getElements('div')[colindex];
		var scrollX = this.container.getElement('div.bDiv').getScroll().x;
		
		// izracunaj nove ukupne duljine 
		this.sumWidth = 0;
		for (var c = 0; c < this.options.columnModel.length; c++) {
			var columnModel = this.options.columnModel[c];
			
			//if (columnModel.hidden) continue;

			if (c == colindex)
			{
				// nova vrijednost pomaknute kolone
				var pos = dragSt.getStyle('left').toInt()+scrollX-this.sumWidth-(Browser.Engine.trident ? -1 : 1 ); // zato sto je u dragSt.left +2
			}else if (!columnModel.hidden)			
				this.sumWidth += columnModel.width;
		}
		//console.log(pos);
		
		if (pos<30) // minimalna velicina kolone
			pos = 30
		
		this.options.columnModel[colindex].width = pos;
		
		this.sumWidth += pos;
		//console.log(this.sumWidth);
		
		this.ulBody.setStyle('width', this.sumWidth+this.visibleColumns*(Browser.Engine.trident ? 1 : 1 ));
		var hDivBox = this.container.getElement('div.hDivBox');
		
		hDivBox.setStyle('width', this.sumWidth+this.visibleColumns*2);
	
		// header
		var columns = hDivBox.getElements('div.th');
		var columnObj = columns[colindex];
		
		columnObj.setStyle('width', pos-(Browser.Engine.trident ? 6 : 6 ));

		var visibleColumns = this.visibleColumns; // radi this. u each-u
		
		// radi accordiana
		var elements = this.ulBody.getElements('li');

		// sve kolone u body
		elements.each(function(el, i){
			el.setStyle('width', this.sumWidth+2*visibleColumns); // inace se Div-ovi wrapaju
			
			if (!el.hasClass('section'))	
			{
				var columns = el.getElements('div.td');
				var columnObj = columns[colindex];
				columnObj.setStyle('width', pos-(Browser.Engine.trident ? 6 : 6 ));
			}
			
		});
		
		this.rePosDrag();		
	},
	
	onColumnDragStart: function(target){
		this.dragging = true;
	},
	
	onColumnDragging: function(target){
		target.setStyle('top', 1);
	},
	
	overDragColumn: function(evt){
		evt.target.addClass('dragging');
	},
	
	outDragColumn: function(evt){
		evt.target.removeClass('dragging');
	},
	
	// ************************************************************************
	// ************************* Header events ********************************
	// ************************************************************************

	clickHeaderColumn: function(evt){
		if (this.dragging) return;
		
		var colindex = evt.target.retrieve('column');
		var columnModel = this.options.columnModel[colindex];
		
		evt.target.removeClass(columnModel.sort);
		columnModel.sort = (columnModel.sort == 'ASC') ? 'DESC' : 'ASC';
		evt.target.addClass(columnModel.sort);

		//hidden-1
		this.sort(colindex);
	},
	
	overHeaderColumn: function(evt){
		if (this.dragging) return;
		
		var colindex = evt.target.retrieve('column');
		var columnModel = this.options.columnModel[colindex];

		evt.target.addClass(columnModel.sort);
	},
	
	outHeaderColumn: function(evt){
		if (this.dragging) return;
		
		var colindex = evt.target.retrieve('column');
		var columnModel = this.options.columnModel[colindex];
		
		evt.target.removeClass(columnModel.sort);
	},
	
	renderData: function(){
		this.ulBody.empty();
	
		if (this.options.data)
		{
			var columnCount = this.options.columnModel.length;
			var rowCount = this.options.data.length;
			
			for (var r=0; r<rowCount; r++)
			{
				var li = new Element('li');
				li.setStyle('width', this.sumWidth+2*this.visibleColumns); // inace se Div-ovi wrapaju, a u IE nastaje cudan 1px border ispod LI el.
				li.store('row', r);

				
				this.ulBody.appendChild(li);
				
				if (this.options.tooltip)
				{
					this.options.tooltip.attach( tr );											
				}
				
				for (var c=0; c<columnCount; c++)
				{
					var columnModel = this.options.columnModel[c];
					
					//if (columnModel.hidden)
					//	continue;
					
					var div = new Element('div');
					div.addClass('td');
					div.setStyle('width', columnModel.width-(Browser.Engine.trident ? 6 : 6 )); // zbog paddinga u ff
					//div.setStyle('overflow-x', 'hidden');
						
					li.appendChild(div);
					
					if (columnModel.hidden) div.setStyle('display', 'none');
					
					if (columnModel.onMouseOver)
					{
						div.onmouseover = this.onMouseOver.bind(this, {element:div, columnModel:columnModel, data:this.options.data[r] });												
					}
					
					if (columnModel.type == "checkbox")
					{
						/*
						var input = new Element('input');
						input.type = "checkbox";

							
						td.bgcolor = "#ff0000";
						
						if (columnModel.onChange)
						{
							input.onclick = this.onSelect.bind(this, {columnModel:columnModel, row:r, input:input});												
						}
						
						if (this.options.fancyForm) {
							label.appendChild(input);
							td.appendChild(label);
						}else
							td.appendChild(input);
						
						if (this.options.data[r][columnModel.dataIndex] == 1) {
							input.set('checked', true);
						}
						*/
					}else if (columnModel.type == "image") {
					/*	var img = new Element('img');
						img.src = this.options.data[r][columnModel.dataIndex];
						td.appendChild(img);*/
						
					}else if (columnModel.type == 'custom') {
						//columnModel.labelFunction(td, this.options.data[r], r);
					}else if (columnModel.labelFunction != null) {
							div.innerHTML = columnModel.labelFunction(this.options.data[r], r);
					}else {
							var str = new String(this.options.data[r][columnModel.dataIndex]); // mora biti string, jer ako dode 0 kao broj error

							if (str == null || str == "" ) str = '&nbsp;';

							var trimmed = str.replace(/^\s+|\s+$/g, ''); // ako je prazan string
							if(trimmed.length==0) str = '&nbsp;';
							
							// Column text align propert.
							// moram prije srediti racunanje width radi padding:0 kad se aling
							//if (columnModel.align) div.setStyles({'text-align': columnModel.align, 'padding-left':0});
							
							div.innerHTML = str;
					}
					
				} // for column
				
				// ***********************
				
				if (this.options.accordion)
				{
				/*	var div = new Element('div');
					div.addClass('section');
					
					li.appendChild(div);
				*/
					var li2 = new Element('li');
					li2.addClass('section');
					li2.addClass('section-'+r);
					li2.setStyle('width', this.sumWidth+2*this.visibleColumns); // inace se Div-ovi wrapaju, a u IE nastaje cudan 1px border ispod LI el.
					
					this.ulBody.appendChild(li2);
					
					if (this.options.accordionRenderer)	
						this.options.accordionRenderer({parent:li2, row:r, grid:this});
				}
				
			}
		}
	},
	
	// ************************************************************************
	// ************************* Main draw function ***************************
	// ************************************************************************
	draw: function(){	
		this.removeAll(); // reset variables and only empty ulBody 
		this.container.empty(); // empty all 
		
		// ************************************************************************
		// ************************* Common ***************************************
		// ************************************************************************
		var width = this.options.width - (Browser.Engine.trident ? 2 : 2 ); //-2 radi bordera
		var columnCount = this.options.columnModel.length;
		
		// ************************************************************************
		// ************************* Container ************************************
		// ************************************************************************
		if (this.options.width)
			this.container.setStyle('width', this.options.width);
		this.container.addClass('omnigrid');

		// ************************************************************************
		// ************************* Toolbar **************************************
		// ************************************************************************
		
		if (this.options.buttons)
		{
			var tDiv = new Element('div');
			tDiv.addClass('tDiv');
			tDiv.setStyle('width', width); 
			tDiv.setStyle('height', 25+(Browser.Engine.trident ? 2 : 0 ));// borderi u FF
			this.container.appendChild(tDiv);
			
			var bt = this.options.buttons;
			for (var i = 0; i < bt.length; i++) {
				var fBt = new Element('div');
				tDiv.appendChild(fBt);
				if (bt[i].separator)
				{
					fBt.addClass('btnseparator');
					continue;
				}
				
				fBt.addClass('fbutton');
				
				var cBt = new Element('div');
				cBt.addEvent('click', bt[i].onclick.bind(this, [bt[i].bclass, this])); 
				cBt.addEvent('mouseover', function(){this.addClass('fbOver'); }); 
				cBt.addEvent('mouseout', function(){this.removeClass('fbOver'); }); 
				
				fBt.appendChild(cBt);
				
				var spanBt = new Element('span');
				spanBt.addClass(bt[i].bclass);
				spanBt.setStyle('padding-left', 20 );
				spanBt.set('html', bt[i].name);
				cBt.appendChild(spanBt);
			}
		}
		
		// ************************************************************************
		// ************************* Header ***************************************
		// ************************************************************************
		var hDiv = new Element('div');
		hDiv.addClass('hDiv');
		hDiv.setStyle('width', width ); // borderi u FF
		this.container.appendChild(hDiv);
		
		var hDivBox = new Element('div');
		hDivBox.addClass('hDivBox');
		
		hDiv.appendChild(hDivBox);
		
		this.sumWidth = 0;
		this.visibleColumns = 0; // razlikuje se od columnCount jer podaci za neke kolone su ocitani ali se ne prikazuju, npr. bitno kod li width
		for (var c = 0; c < columnCount; c++) {
			var columnModel = this.options.columnModel[c];
			
			var div = new Element('div');
			// ******************************************
			// ****** default postavke columnModela *****
			if (columnModel.width == null)  this.options.columnModel[c].width = 100; 
			columnModel.sort = 'ASC'; 
			// ******************************************

			
			// ********************** Header events **************************
			if (this.options.sortHeader)
			{
				div.addEvent('click', this.clickHeaderColumn.bind(this));
				div.addEvent('mouseout', this.outHeaderColumn.bind(this));
				div.addEvent('mouseover', this.overHeaderColumn.bind(this));
			}
			
			div.store('column', c);
			div.store('dataType', columnModel.dataType);
			div.addClass('th');
			div.setStyle('width', columnModel.width-(Browser.Engine.trident ? 6 : 6 ));
			hDivBox.appendChild(div);
	
			if (columnModel.hidden) 
				div.setStyle('display', 'none');
			else{
				this.sumWidth += columnModel.width;
				this.visibleColumns++;
			}
			
			var header = columnModel.header;
			
			if (header)
				div.innerHTML = header;		
		}
		hDivBox.setStyle('width', this.sumWidth+this.visibleColumns*2);
		if (!this.options.showHeader)
			hDiv.setStyle('display', 'none');
		// ************************************************************************
		// ************************* Column size drag *****************************
		// ************************************************************************
		
		// odredivanje visine body dijela
		if (this.options.height)
		{
			// da ukupna visina cijelog grida bude this.options.height za body moramo oduzeti header
			if (!this.options.showHeader)
				var headerHeight = 0;
			else
				var headerHeight = 24+(Browser.Engine.trident ? 2 : 2 ); // header, +2 radi bordera
			
			if (this.options.buttons)
				var toolbarHeight = tDiv.getStyle('height').toInt(); // toolbar
			else
				var toolbarHeight = 0;
			
			if (this.options.pagination)
				var paginationToolbar = 26; // pagination toolbar height 25px + 1px bottom border
			else
				var paginationToolbar = 0;
				
			var bodyHeight = this.options.height-headerHeight-toolbarHeight-paginationToolbar-(Browser.Engine.trident ? 2 : 2 ); //+2 radi bordera
			
			this.container.setStyle('height', this.options.height);
		}
		
		if (this.options.resizeColumns)
		{
			var cDrag = new Element('div');
			cDrag.addClass('cDrag');
			cDrag.setStyle('top', toolbarHeight);
			this.container.appendChild(cDrag);
			
			var dragTempWidth = 0;
			for (var c = 0; c < columnCount; c++) {
				var columnModel = this.options.columnModel[c];
				
				//if (columnModel.hidden) continue;
					
				var dragSt = new Element('div');
				
				//alert(dragTempWidth+' '+columnModel.width);
				// -(Browser.Engine.trident ? 10 : 0 )
				
				dragSt.setStyles({top:1,left: dragTempWidth+columnModel.width+(Browser.Engine.trident ? 2 : 2 ), height: bodyHeight+headerHeight, display:'block'});
				dragSt.store('column', c);
				cDrag.appendChild(dragSt);
				
				// Events
				dragSt.addEvent('mouseout', this.outDragColumn.bind(this));
				dragSt.addEvent('mouseover', this.overDragColumn.bind(this));
				
				var dragMove = new Drag(dragSt, {snap:0}); // , {container: this.container.getElement('.cDrag') }
				dragMove.addEvent('drag', this.onColumnDragging.bind(this) );
				dragMove.addEvent('start', this.onColumnDragStart.bind(this) );
				dragMove.addEvent('complete', this.onColumnDragComplete.bind(this) );
				
				
				if (columnModel.hidden) 
					dragSt.setStyle('display', 'none');
				else
					dragTempWidth += columnModel.width;
			}
		}
		
		// ************************************************************************
		// ************************* Body *****************************************
		// ************************************************************************
		
		var bDiv = new Element('div');
		bDiv.addClass('bDiv');
		
		if (this.options.width)
			bDiv.setStyle('width', width);

		bDiv.setStyle('height', bodyHeight);	
		this.container.appendChild(bDiv);

		//  scroll event
		this.onBodyScrollBind = this.onBodyScroll.bind(this);
		bDiv.addEvent('scroll', this.onBodyScrollBind);
		//alert(this.visibleColumns);
		this.ulBody = new Element('ul');
		this.ulBody.setStyle('width', this.sumWidth+this.visibleColumns*(Browser.Engine.trident ? 1 : 1 )); // da se ne vidi visak, ul je overflow hidden
		bDiv.appendChild(this.ulBody);


		if (this.options.pagination && !this.container.getElement('div.pDiv') )
		{
			var pDiv = new Element('div');
			pDiv.addClass('pDiv');
			pDiv.setStyle('width', width); 
			pDiv.setStyle('height', 25);
			this.container.appendChild(pDiv);
			
			var pDiv2 = new Element('div');
			pDiv2.addClass('pDiv2');
			pDiv.appendChild(pDiv2);
			
			var h = '<div class="pGroup"><select class="rp" name="rp">';
			
			// *****
			var optIdx;
			var setDefaultPerPage = false;
			for (optIdx=0; optIdx<this.options.perPageOptions.length; optIdx++)
			{
				if (this.options.perPageOptions[optIdx] != this.options.perPage)
					h += '<option value="' + this.options.perPageOptions[optIdx] + '">' + this.options.perPageOptions[optIdx] +'</option>';
				else{
					setDefaultPerPage = true;
					h += '<option selected="selected" value="' + this.options.perPageOptions[optIdx] + '">' + this.options.perPageOptions[optIdx] +'</option>' ;
				}
			}
			// *****

			h += '</select></div>';
			
			h += '<div class="btnseparator"></div><div class="pGroup"><div class="pFirst pButton"></div><div class="pPrev pButton"></div></div>';
			h += '<div class="btnseparator"></div><div class="pGroup"><span class="pcontrol"><input type="text" value="1" size="4" style="text-align:center"/> / <span></span></span></div>';
			h += '<div class="btnseparator"></div><div class="pGroup"><div class="pNext pButton"></div><div class="pLast pButton"></div></div>';
			h += '<div class="btnseparator"></div><div class="pGroup"><div class="pReload pButton"></div></div>';
			h += '<div class="btnseparator"></div><div class="pGroup"><span class="pPageStat"></div>';
			
			pDiv2.innerHTML = h;

			// set this.options.perPage value from this.options.perPageOptions array
			var rpObj = pDiv2.getElement('.rp');
			if (!setDefaultPerPage && rpObj.options.length>0){
				this.options.perPage = rpObj.options[0].value;
				rpObj.options[0].selected = true;
			}
			// ********

			pDiv2.getElement('.pFirst').addEvent('click', this.firstPage.bind(this) );
			pDiv2.getElement('.pPrev').addEvent('click', this.prevPage.bind(this) );
			pDiv2.getElement('.pNext').addEvent('click', this.nextPage.bind(this) );
			pDiv2.getElement('.pLast').addEvent('click', this.lastPage.bind(this) );
			pDiv2.getElement('.pReload').addEvent('click', this.refresh.bind(this) );
			pDiv2.getElement('.rp').addEvent('change', this.perPageChange.bind(this));
			pDiv2.getElement('input').addEvent('keyup', this.pageChange.bind(this) );
		}

	},
	
	firstPage: function(){
		this.options.page = 1;		
		this.refresh();
	},
	
	prevPage: function(){
		if (this.options.page>1){
			this.options.page--;		
			this.refresh();
		}
	},
	
	nextPage: function(){

		if( (this.options.page+1) > this.options.maxpage)
			return;
		
		this.options.page++;		
		this.refresh();
	},
		
	lastPage: function(){
		this.options.page = this.options.maxpage;		
		this.refresh();
	},
	
	perPageChange: function(){
		this.options.page = 1;
		this.options.perPage = this.container.getElement('.rp').value;		
		this.refresh();
	},
		
	pageChange: function(){
		
		var np = this.container.getElement('div.pDiv2 input').value;
		
		if (np>0 && np<=this.options.maxpage)
		{
			if (this.refreshDelayID)
				$clear(this.refreshDelayID)
			
			this.options.page = np;
			
			this.refreshDelayID = this.refresh.delay(1000, this);
		}
	},
	
	// API
	gotoPage: function(p){
		if (p>0 && p<=this.options.maxpage)
		{
			this.options.page = p;
			
			this.refresh();
		}
	},
	
	setPerPage: function(p){
		if (p>0)
		{
			this.options.perPage = p;
			
			this.refresh();
		}
	},
	
	// API, not doc
	sort: function(index, by){
		
		if ( index<0 || index>=this.options.columnModel.length )
			return;

		if(this.options.onStart){
			this.fireEvent('onStart');
		}
		
		//
		var header = this.container.getElements('.th');
		var el = header[index];
		
		if (by != null)
			el.addClass(by.toLowerCase());
		
		if(el.hasClass('ASC')){
			el.sortBy = 'ASC';
		}else if(el.hasClass('DESC')){
			el.sortBy = 'DESC';
		}
		
		if (this.options.serverSort){
			this.options.sortOn = this.options.columnModel[index].dataIndex;
			this.options.sortBy = el.sortBy;
			
			this.refresh();
		}else{
			// Sorting...
			this.elements.sort(el.compare);
			this.elements.injectInside(this.ulBody);
			
			// Update selection array because indices has been changed
			this.selected = new Array();
			this.elements.each(function(el ,i){
				if(el.hasClass('selected')){
					this.selected.push(el.retrieve('row'));
				}
			}, this);
			
			// Filter
			if(this.filtered){
				this.filteredAltRow();
			}else{
				this.altRow();
			}
		}	
	},
	
	altRow: function(){
		this.elements.each(function(el,i){
			
			if(i % 2){
				el.removeClass('erow');
			}else{
				el.addClass('erow');
			}
		});
	},
	
	filteredAltRow: function(){

		this.ulBody.getElements('.'+this.options.filterSelectedCls).each(function(el,i){
			if(i % 2){
				el.removeClass('erow');
			}else{
				el.addClass('erow');
			}
		});
	},
	
	// API
	filter: function(form){
		//var form = $(form);
		var col = 0;
		var key = '';
		
		if ( !(form.length>0) )
			this.clearFilter();
		
		
		key = form;
		
		if(key)
		{			
			for (var i=0; i<this.options.data.length; i++)
			{
				var dat = this.options.data[i];
			
				for (var c=0; c<this.options.columnModel.length; c++)
				{
					var columnModel = this.options.columnModel[c];
					
					if ( columnModel.type == "checkbox")
						continue;
					
					var el = this.elements[i];
					
					if(this.options.filterHide){
						el.removeClass('erow');
					}
					
					if(dat[columnModel.dataIndex] != null && dat[columnModel.dataIndex].toLowerCase().indexOf(key) > -1)
					{
						el.addClass(this.options.filterSelectedCls);
						if(this.options.filterHide){
							el.removeClass(this.options.filterHideCls);
						}
						
						break;
					}else{
						el.removeClass(this.options.filterSelectedCls);
						if(this.options.filterHide){
							el.addClass(this.options.filterHideCls);
						}
					}
				}				
			}
			
			if(this.options.filterHide){
				this.filteredAltRow();
				this.filtered = true;
			}
		}
	},
	
	// API
	clearFilter: function(){
		this.elements.each(function(el,i){
			el.removeClass(this.options.filterSelectedCls);
			if(this.options.filterHide){
				el.removeClass(this.options.filterHideCls);
			}
		}, this);
		if(this.options.filterHide){
			this.altRow();
			this.filtered = false;
		}
	}

});


/*************************************************************/
