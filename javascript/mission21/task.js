
var tags = [];
var hobbies = [];
var tagtxt = document.getElementById("tagtxt");
var txttags = document.getElementById("txttags");
var showtag = document.getElementById('showtag');
var multitags = document.getElementById('multitags');


tagtxt.onkeydown = function(e){
	if(e && (e.keyCode ==13 ||e.keyCode == 32 || e.keyCode == 188)){
		maketags(event.target);
		tagtxt.value = "";
	}
}
var intag = document.getElementById("intag");
intag.addEventListener('click',function(event){
	if(event.target.nodeName.toLowerCase() == "button"){
		maketags(event.target);
		txttags.value = "";
	}
	if(event.target.nodeName.toLowerCase() == "span"){
		maketags(event.target);
	}
	if(event.target.nodeName.toLowerCase() == "i"){
		maketags(event.target.parentNode);
	}
});
var maketags = function(event){
	switch(event.id){
		case "tagtxt":
		    var val = tagtxt.value.trim();
		    if(val.length == 0){
		    	return ;
		    }
		    var tmparr = [];
		    tmparr.push(val);
			val = filter(tmparr,tags);
			if(val.length == 0){
				tagtxt.value = "";
				return;
			}
			tags.push(val+"");
			makehtml(showtag,tags);
			break;
		case "crmbtn" :
			var arrtag = txttags.value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/);
			if(arrtag.length == 0){
				return;
			}
			arrtag = filter(arrtag,hobbies);
			hobbies = hobbies.concat(arrtag);
			makehtml(multitags,hobbies);
			break;
		default:
			var fathernode = event.parentNode;
			if(fathernode.id == "showtag"){
				tags.splice(event.id,1);
				makehtml(showtag,tags);
			}
			if(fathernode.id == "multitags"){
				hobbies.splice(event.id,1);
			    makehtml(multitags,hobbies);

			}

	}

};
var makehtml = function(element,arrs){
	element.innerHTML = "";
	for(var i=0;i<arrs.length;i++){
		element.innerHTML += "<span class='tag' id = '"+i+"'><i >删除</i>"+arrs[i]+"</span>"
	}
}
var filter = function(val,vals){
	if(vals.length == 0){
		return val;
	}
	var tmpval = [];
	var tmpvals = vals.join();
	for(var i=0;i<val.length;i++){
		if(tmpvals.indexOf(val[i]) < 0){
			tmpval.push(val[i]);
		}
	}
	return tmpval;
}
