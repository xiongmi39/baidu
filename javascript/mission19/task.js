
var inbtn = document.getElementById('inbtn');
var outbtn = document.getElementById('outbtn');
var datastr = document.getElementById('datastr');
var list = document.getElementById('list');
var ranklist = [];

inbtn.addEventListener('click',function(event){
	if(event.target.nodeName.toLowerCase() == "button"){
		makelist(event);
	}
});

outbtn.addEventListener('click',function(event){
	if(event.target.nodeName.toLowerCase() == "button"){
		makelist(event);
	}
});

list.addEventListener('click',function(event){
	if(event.target.nodeName.toLowerCase() == "div"){
		makelist(event);
	}
	
});
datastr.addEventListener('click',function(event){
	if(event.target.nodeName.toLowerCase() == "button"){
		makelist(event);
	}
})

var makelist = function(event){
	var newno = document.getElementById("inno").value;
	if(!newno.match(/^\d+$/)){
		alert('请输入整数');
		return;
	}
	if(newno < 10 || newno >100){
		alert("请输入10到100之间的数字");
		return;
	}
	if(ranklist.length > 60 && (event.target.id == "leftin" || event.target.id == "rightin")){
		alert("队列已到上限");
		return;
	}
	takeno(newno,event.target);
	chart(ranklist);
}

var takeno = function(newno,etar){

	switch (etar.id){
		case "leftin":
			ranklist.unshift(newno);
			break;
		case "rightin":
			ranklist.push(newno);
			break;
		case "leftout":
			ranklist.shift();
			break;
		case "rightout":
			ranklist.pop();
			break;
		case "shuffle":
			shuffle(ranklist);
			break;
		case "bubble":
			bubble(ranklist);
			break;
		case "quick":
			quicksort(0,ranklist.length-1);
			break;
		default:
			ranklist.splice(etar.id,1);
	}

}

var shuffle = function(){
	for(var i=0;i<ranklist.length;i++){
		ranklist[i] = Math.floor(Math.random()*100);
	}
}

//冒泡
var bubble = function(){
	var i=0,len = ranklist.length-1;
	var timer =setInterval(function(){
		if(i> len-1){
			clearInterval(timer);
		}
		for(var j=0;j<ranklist.length-1;j++){
			if(ranklist[j]>ranklist[j+1]){
				var t = ranklist[j];
				ranklist[j] = ranklist[j+1];
				ranklist[j+1] = t;
			}
			
		}
		//重绘后延迟50毫秒进入下一轮
		chart(ranklist);
		i++;

	}, 50);	
}

var chart = function(ranklist){
	list.innerHTML = "";
	for(var i=0;i<ranklist.length;i++){
		var outheight = list.offsetHeight;
		var singleheight = Math.floor(outheight*0.9/100*ranklist[i]);
		var outWidth = list.offsetWidth;
		var singleWidth = Math.floor((outWidth*0.9/ranklist.length)/outWidth*100);
		var singlemargin = (outWidth*0.1/ranklist.length)/outWidth*100/2;


		list.innerHTML += "<div class='item' id='"+i+"' style = 'margin: 0 "+singlemargin+"%;width:"+singleWidth+"%'><div class='bar' style ='height:"+singleheight+"px;'><div class='per'></div></div></div>"
	}
}

var quicksort = function(left,right){
	var i,j,t,temp;
	if(left>right){
		return;
	}
	temp = ranklist[left];
	i = left;
	j= right;
	while(i != j){
		//从右往左找到比ranklist[left]小的数位置
		while(ranklist[j] >= temp && i<j){
			j--;
		}
		//从左往右找到比ranklist[left]大的数的位置
		while(ranklist[i] <= temp && i<j){
			i++;
		}
		if(i<j){
			//交换
			t=ranklist[i];
			ranklist[i] = ranklist[j];
			ranklist[j] = t;
			chart(ranklist);
		}
	}
	
	//i和j相同时，和基准数ranklist[left]交换
	ranklist[left] = ranklist[i];
	ranklist[i] = temp;
	
	//基准数左边的二分继续计算，递归
	quicksort(left,i-1);
	//基准数右边的二分继续计算，递归
	quicksort(i+1,right);

}


