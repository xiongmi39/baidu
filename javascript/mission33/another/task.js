
var chess = document.getElementById("chess");
var context = chess.getContext('2d');
context.strokeStyle = "#BFBFBF";
// var square= document.getElementById("square");
var orderbtn = document.querySelector("#orderbtn");
var getorder = document.querySelector("#getorder");
var sqa = {
	dom: document.getElementById("square"),
	direction: 0
};
var ordergroup = {
	GO:function(){
		var nowtop = sqa.dom.offsetTop;
		var nowleft = sqa.dom.offsetLeft;
	if(sqa.direction%360 == 0){
		sqa.dom.style.top = nowtop - 30 +"px";
		return "top";
	}
	if(sqa.direction%270 == 0){
		sqa.dom.style.left = nowleft + 30 +"px";
		return "left";
	}
	if(sqa.direction%180 == 0){
		sqa.dom.style.top = nowtop + 30 +"px";
		return "bottom";
	}
	if(sqa.direction%90 == 0){
		sqa.dom.style.left = nowleft - 30 +"px";
		return "right";
	}
	},
	LEF: -90,
	RIG: 90,
	BAC: 180,
	turn: function(ord){
	sqa.direction = sqa.direction +ord;
	if(sqa.direction > 360 || sqa.direction < 0){
		sqa.direction = sqa.direction%360;
	}
	sqa.dom.style.transform = `rotate(${sqa.direction}deg)`;
	console.log(sqa.direction);
}

};

orderbtn.onclick = function(){
	takeOrder(getorder.value);
};
function takeOrder(val){
	var ord = val.split(" ").length > 1 ? ordergroup["turn"](ordergroup[val.split(" ")[1]]) : ordergroup[val]();

}

    // GO：向蓝色边所面向的方向前进一格（一格等同于正方形的边长）
    // TUN LEF：向左转（逆时针旋转90度）
    // TUN RIG：向右转（顺时针旋转90度）
    // TUN BAC：向右转（旋转180度）


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


