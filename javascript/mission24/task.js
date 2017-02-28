
var nodedata = [];
var lastfound = -1;
var selected = 0;
var nodebox = document.getElementById('box');
var btn = document.getElementById('btn');
btn.addEventListener('click',function(event){
	if(event.target.nodeName.toLowerCase() == "button"){
		takenode(event.target.id);
	}
});
nodebox.addEventListener('click',function(event){
	if(event.target.nodeName.toLowerCase() == "div"){
		if(selected != 0){
			selected.style.backgroundColor = "";
		}
		selected = event.target;
		selected.style.backgroundColor = "#507883";
	}
});
var gdfs = new Graph();
var gbfs = new Graph();
function takenode(id){
	if(nodedata.length !== 0){
		reset();
	}
	
	switch (id){
		case "dfs":
			nodedata = [];
			gdfs.dfs(nodebox);
			changeColor();
			break;
		case "bfs":
			nodedata = [];
			gbfs.bfs(nodebox);
			changeColor();
			break;
		case "deletenode":
			deletenode();
			break;
		case "insertnode":
			insertnode(document.getElementById('srhtxt').value);
			break;
		case "srhbtn":
			changeColor(document.getElementById('srhtxt').value);
		default:

	}
	
}

function Graph(v){
	this.dfs = dfs;
	this.bfs = bfs;
	this.marked = {};
}
function deletenode(){
	if(selected == 0){
		alert("请选择一个节点");
		return ;
	}
	selected.outerHTML = "";
	selected = 0;
	gbfs.bfs(nodebox);
	gdfs.dfs(nodebox);
}
function insertnode(inval){
	if(inval.length == 0){
		alert("请输入节点内容");
		return;
	}
	if(selected == 0){
		alert("请选择节点");
		return;
	}
	selected.innerHTML += "<div class='in'>"+inval.trim()+"</div>";
	selected.style.backgroundColor = "#fff";
	selected = 0;
	gbfs.bfs(nodebox);
	gdfs.dfs(nodebox);
}

function dfs(v){
	this.marked[v.firstChild.nodeValue.trim()] = {};
	this.marked[v.firstChild.nodeValue.trim()]["true"] = v;
 	if(v !== undefined){
		nodedata.push(v);
	}
	var attr = v.children;
	for(var w in attr){
		if(attr[w].firstChild !== undefined  && (this.marked[attr[w].firstChild.nodeValue.trim()] == undefined || this.marked[attr[w].firstChild.nodeValue.trim()] !== "true" )){
			this.dfs(attr[w]);
		}
		
	}
}

function bfs(s){
	var queue = [];
	this.marked[s.firstChild.nodeValue.trim()] = true;
	queue.push(s);
	nodedata.push(s);
	while(queue.length> 0){
		var v = queue.shift();
		var attr = v.children;
		for(var w in attr){
			if(attr[w].firstChild !== undefined && !this.marked[attr[w].firstChild.nodeValue.trim()]){
				this.marked[attr[w].firstChild.nodeValue.trim()] = true;
				queue.push(attr[w]);
				nodedata.push(attr[w]);
			}
		}
	}
}
function reset(){

	if(lastfound > -1){
		nodedata[lastfound].style.borderColor = "#C40000";
		nodedata[lastfound].style.borderWidth = "1px";
		lastfound = -1;
	}
}
function changeColor(srhtxt){
	
	if(nodedata.length == 0){
		gbfs.bfs(nodebox);
	}
	reset();
	var i=0;
	var timer = setInterval(function(){
		i++;
		nodedata[i-1].style.borderColor = "#C40000";
		nodedata[i-1].style.borderWidth = "1px";
		if(i == nodedata.length){
			clearInterval(timer);
		}
		if( i !== nodedata.length){

		nodedata[i].style.borderColor = "#507883";
		nodedata[i].style.borderWidth = "5px";
		}
		if(srhtxt !== "" && nodedata[i] !== undefined && nodedata[i].firstChild.nodeValue.trim() == srhtxt ){
			nodedata[i].style.borderColor = "#000";
			nodedata[i].style.borderWidth = "5px";
			lastfound = i;
			clearInterval(timer);
		}
		
		
	},500)
}