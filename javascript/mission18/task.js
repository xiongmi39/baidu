
var inbtn = document.getElementById('inbtn');
var outbtn = document.getElementById('outbtn');
var list = document.getElementById('list');

inbtn.addEventListener('click',function(event){
	if(event.target.nodeName.toLowerCase() == "button"){
		numberin(event);
	}
});

outbtn.addEventListener('click',function(event){
	if(event.target.nodeName.toLowerCase() == "button"){
		numberout(event);
	}
});

list.addEventListener('click',function(event){
	if(event.target.nodeName.toLowerCase() == "span"){
		numberout(event);
	}
	
});

var numberin = function(event){
	var no = document.getElementById('inno').value;
	if(!no.match(/^\d+$/)){
		alert('请输入整数');
		return;
	}
	var newno = document.createElement('span');
	newno.innerText = no;
	if(event.target.id == "rightin" || list.getElementsByTagName('span').length == 0){
		list.append(newno);
	}else{
		list.insertBefore(newno,list.firstChild);
	}
}
var numberout = function(event){
	if(list.getElementsByTagName('span').length == 0){
		return;
	}
	if(event.target.nodeName.toLowerCase() == "button"){
		if(event.target.id == 'leftout'){
			alert(list.firstChild.innerText);
			list.removeChild(list.firstChild);
		}else{
			alert(list.lastChild.innerText);
			list.removeChild(list.lastChild);
		}
	}else{
		list.removeChild(event.target);
	}
	
}