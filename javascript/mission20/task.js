

var btns = document.getElementById('btn');
var indata = [];

btns.addEventListener('click',function(event){
	if(event.target.nodeName.toLowerCase() == "button"){
		takedata(event.target);
	}
});

var takedata = function(event){
	if(event.id == "insert"){
		insertinto();
	}
	else{
		searchword();
	}
}

var insertinto = function(){
	var textin = document.getElementById('in');
	var show = document.getElementById('show');
	show.innerHTML = "";
	var tmpdata = textin.value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
	for(var i=0;i<tmpdata.length;i++){
		indata.push(tmpdata[i]);
		show.innerHTML += "<span>"+tmpdata[i]+"</span>";
	}
}
var searchword = function(){
	var srhinput = document.getElementById('srhinput').value; 
	var show = document.getElementById('show');
	show.innerHTML = "";
	for(var i=0;i<indata.length;i++){
		if(indata[i].indexOf(srhinput)> -1){
			show.innerHTML += "<span class = 'color'>"+indata[i]+"</span>";
		}else{
			show.innerHTML += "<span>"+indata[i]+"</span>";
		}
	}
}
