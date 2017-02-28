
var chess = document.getElementById("chess");
var context = chess.getContext('2d');
context.strokeStyle = "#BFBFBF";
var square= document.getElementById("square");
var item = {
	now: "bottom",
	turn: function(keycode){
		document.getElementById("blue").className = keycode;
		this.now = keycode;
	},
	38:function(){
		this.turn("top");
	},
	40:function(){
		this.turn("bottom");
	},
	37:function(){
		this.turn("left");
	},
	39:function(){
		this.turn("right");
	},
	13:function(){
		var nowtop = square.offsetTop;
		var nowleft = square.offsetLeft;
		if(this.now == "top" &&nowtop >33){
			square.style.top = nowtop - 30 +"px";
			return ;
		}
		if(this.now == "bottom" && nowtop < 303){
			square.style.top = nowtop + 30 +"px";
			return ;
		}
		if(this.now == "left" && nowleft>35 ){
			square.style.left = nowleft - 30 +"px";
			return;
		}
		if(this.now == "right" && nowleft<305){
			square.style.left = nowleft + 30 +"px";
			return ;
		}
	}

};

function drawBoard(){
	for(var i=0; i<11; i++){
		context.moveTo(15 + i*30,15);
		context.lineTo(15 + i*30, 330);
		context.stroke();

		context.moveTo(15,15 + i*30);
		context.lineTo(330, 15 + i*30);
		context.stroke();
	}
}
window.onload= function(){
	drawBoard();
}
window.addEventListener("keydown",function(e){
	if(item[`${e.keyCode}`] == undefined){
		return;
	}
	item[`${e.keyCode}`]();

});

