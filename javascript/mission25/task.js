
var box = document.getElementById('box');
var srhbtn = document.getElementById('srhbtn');
var nodedata = {};
var oridata = {
	// "super":{
	// 	"ca":{
	// 		"Apple":{"pear":{},"pig":{},"cala":{},"soccor":{}},
	// 		"phone":{},
	// 		"miao":{"book":{},"school":{}}
	// 	},
	// 	"note":{
	// 		"human":{
	// 			"code":{},
	// 			"operate":{},
	// 			"man":{}
	// 		},
	// 		"program":{
	// 			"bement":{
	// 				"cat":{}
	// 			},
	// 			"glass":{}
	// 		}
	// 	},
	// 	"flash":{}
	// }
};

function readoridata(jsonadj){
	  
    var srh =    $.getJSON (jsonadj, function (data)  
        {  
        	oridata = data[0];
        	maketree(oridata,box); 
        });
    
}
function writeoridata(ori){
}


window.onload = function(){
	readoridata("data.txt");
};

box.addEventListener("click",function(event){
	if(event.target.className.indexOf("in") >-1){
		hideorshow(event.target);
	}
	if(event.target.className.indexOf("del") >-1){
		delnode(event.target.parentNode.parentNode);
	}
	if(event.target.className.indexOf("add") >-1){
		addnode(event.target.parentNode.parentNode);
	}
});
srhbtn.onclick = function(){
	findnode();
}

//初始化生成树
function maketree(parnode,parele,parname){

	for(var node in parnode){
		//初始化减号图标
		if(parele.className.indexOf("minus") <0 && parele.id !=="box"){
			parele.className += " minus";
		}
		var ele = document.createElement("div");
		ele.setAttribute("class","in");
		//保证节点的唯一性
		ele.setAttribute("id",parname + "." + node);
		ele.innerHTML = "<div class='out'>"+node+"<span class='del mark'></span><span class='add mark'></span></div>";
		if(parname == undefined){
			parname = "";
		}
		nodedata[parname + "." + node] = ele;
		// nodedata.push(obj);
		parele.appendChild(ele);
		maketree(parnode[node],ele,parname + "." + node);
	}

}

function findnode(){
	resettree();
	var srhtxt = document.getElementById('srhtxt').value;
	if(srhtxt !== undefined){
		var srhnode = selectenode(srhtxt);
		if(srhnode !== undefined){
		srhnode.firstChild.style.color = "#C40000";
		srhnode.firstChild.style.border = "1px solid #C40000";
		}
	}
}

function resettree(){
	//重新渲染树
	box.innerHTML = "";
	maketree(oridata,box);
}

function delnode(ele){
			var node = ele.id;
			delete nodedata[node];
			var name = node.split(".");
			name.splice(0,1);
			name = 'oridata'+'["'+name.join('"]["')+'"]';
			//删除oridata中对应数据
			eval('delete '+name);
			resettree();
}
function selectenode(ele){
		for(var node in nodedata){
			if(nodedata[node].firstChild.innerText.trim() == ele){
				return nodedata[node];
			}
		}
}

function addnode(ele){
	var str=prompt("请输入节点名","newnode");  
    if(str)
    {  
         var nodekey = ele.id.split(".");
         nodekey.splice(0,1);
         nodekey = 'oridata'+'["'+nodekey.join('"]["')+'"]';
         eval(nodekey+'["'+str+'"]'+ '  = {}');
         box.innerHTML = "";
         maketree(oridata,box);
    } 
}


function hideorshow(ele){
	if(ele.getAttribute("class").trim().indexOf("minus") > -1){
	
		var childnode = ele.children;
		// i=1 ,本节点的内容div不隐藏
		for(var i=1;i<childnode.length;i++){
			var attr = childnode[i].getAttribute("class") + " hid";
			childnode[i].setAttribute("class",attr);
		}
		ele.setAttribute("class","in plus");
	}else if(ele.getAttribute("class").trim().indexOf("plus") > -1){
		var childnode = ele.children;
		for(var i=1;i<childnode.length;i++){
			var attr = childnode[i].getAttribute("class").replace(/hid/,"");
			childnode[i].setAttribute("class",attr);
		}
		ele.setAttribute("class","in minus");
	}
}

