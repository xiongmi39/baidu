
var troot = document.getElementById('tree');

// function maketreenode(treeroot,level){

// 	while(level > 0){
// 		--level;
// 		var rootnodes = treeroot.children;
// 		if(rootnodes.length == 0){
// 			treeroot.innerHTML += "<div class='node'></div><div class='node'></div>" ;
			
// 		}else{
// 			for(var i=0;i<rootnodes.length;i++){
// 				maketreenode(rootnodes[i],level);
// 			}
// 		}

		
// 	}
// }

// maketreenode(troot,3);

var nodedata = [];
var btn = document.getElementById('btn');
btn.addEventListener('click',function(event){
	if(event.target.nodeName.toLowerCase() == "button"){
		nodedata = [];
		switch(event.target.id){
			case "inorder":
				inOrder(troot);
				changeColor();
				break;
			case "preorder":
				preOrder(troot);
				changeColor();
				break;
			case "postorder":
				postOrder(troot);
				changeColor();
				break;
			default:
		}
	}
});

function inOrder(rootnode){
	if(!(rootnode == null)){
		inOrder(rootnode.firstElementChild);
		nodedata.push(rootnode);
		inOrder(rootnode.lastElementChild);
	}
}

function preOrder(rootnode){
	if(!(rootnode == null)){
		nodedata.push(rootnode);
		preOrder(rootnode.firstElementChild);
		preOrder(rootnode.lastElementChild);
	}
}

function postOrder(rootnode){
	if(!(rootnode == null)){
		postOrder(rootnode.firstElementChild);
		postOrder(rootnode.lastElementChild);
		nodedata.push(rootnode);
	}
}

var changeColor = function(){
	var i=0;
	var timer = setInterval(function(){
		if(i !== 0){
			nodedata[i-1].style.borderColor = "#507883";
		}
		if(i == nodedata.length){
			clearInterval(timer);
		}
		if(i !== nodedata.length){

		nodedata[i].style.borderColor = "#C40000";
		}
		i++;

	},500);
}