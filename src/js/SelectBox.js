'use strict';

/**
 * @constructor SelectBox
 * Create a search box in given HTML container
 * @param {JSONEditor} editor    The JSON Editor to attach to
 * @param {Element} container               HTML container element of where to
 *                                          create the search box
 */
function SelectBox (editor, container, selectData, callback) {
  var selectBox = this;

  this.editor = editor;
  this.timeout = undefined;
  this.delay = 200; // ms
  this.lastText = undefined;

  this.dom = {};
  this.dom.container = container;

  var table = document.createElement('table');
  this.dom.table = table;
  table.className = 'jsoneditor-search';
  container.appendChild(table);
  var tbody = document.createElement('tbody');
  this.dom.tbody = tbody;
  table.appendChild(tbody);
  var tr = document.createElement('tr');
  tbody.appendChild(tr);

	var td = document.createElement('td');
  tr.appendChild(td);
  var all = document.createElement('div');
  this.dom.all = all;
  all.className = 'xiaoi-select-all';
	all.style.display = 'none';
  td.appendChild(all);
	
	var ul = document.createElement("ul");
	var first_flag = false;
	var first_val;
	for(var k in selectData){
		var li = document.createElement("li");
		li.innerHTML = selectData[k].name;
		li.setAttribute('data-id', k);
		ul.appendChild(li);
		li.onclick = function(event){
			selectBox.liClick(event);
			selectBox.hideAll();
		}
		if(!first_flag){
			first_val = k;
		}
		first_flag = true;
	}
	all.appendChild(ul);

  td = document.createElement('td');
  tr.appendChild(td);
  var divInput = document.createElement('div');
  this.dom.input = divInput;
  divInput.className = 'xiaoi-frame';
  divInput.title = '点击加载示例';
  td.appendChild(divInput);

  var tableInput = document.createElement('table');
  divInput.appendChild(tableInput);
  var tbodySearch = document.createElement('tbody');
  tableInput.appendChild(tbodySearch);
  tr = document.createElement('tr');
  tbodySearch.appendChild(tr);

  var search = document.createElement('button');
  search.type = 'button';
  search.innerHTML = default_config[first_val].name;
  search.id = 'xiaoi-slt-btn';
  search.setAttribute('data-id', first_val);
  this.dom.search = search;
	
  search.onclick = function(event){
	if(callback) callback(event);
	selectBox.hideAll();
  }

  td = document.createElement('td');
  td.appendChild(search);
  tr.appendChild(td);

  var showBtn = document.createElement('button');
  showBtn.type = 'button';
  showBtn.title = '点击切换示例';
  showBtn.className = 'jsoneditor-next';
  showBtn.onclick = function () {
    selectBox.toggleAll();
  };
  td = document.createElement('td');
  td.appendChild(showBtn);
  tr.appendChild(td);

}

SelectBox.prototype.showAll = function(){
	console.log(this);
	this.dom.all.style.display = 'block';
}
SelectBox.prototype.hideAll = function(){
	this.dom.all.style.display = 'none';
}

SelectBox.prototype.toggleAll = function(){
	if(this.dom.all.style.display == 'none'){
		this.dom.all.style.display = 'block';
	}else{
		this.dom.all.style.display = 'none';
	}
}
SelectBox.prototype._onClick = function(){
	this.hideAll();
}
SelectBox.prototype.liClick = function(e){
	var data_id = e.target.getAttribute('data-id');
	var data_name = e.target.innerText;
	this.dom.search.setAttribute('data-id', data_id);
	this.dom.search.innerHTML = data_name;
}

/**
 * Destroy the search box
 */
SelectBox.prototype.destroy = function () {
  this.editor = null;
  this.dom.container.removeChild(this.dom.table);
  this.dom = null;

  this.results = null;

};

module.exports = SelectBox;