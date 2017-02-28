
window.onload = function(){
	changeschool();
}

var school = {
	"北京":["北京大学","清华大学"],
	"上海":["上海交通大学","复旦大学"],
	"南京":["南京航空航天大学","南京审计"],
	"须弥山":["熊咪大学","喵喵大学"]
};
var citysch = document.getElementById("citysch");
citysch.onchange = function(){
	changeschool();
};
function changeschool(){
	var now = document.getElementById("citysch").value;
	var schsel = document.getElementById("schsel");
	schsel.innerHTML = "";
	makeoption(schsel,now);
}
function makeoption (ele,val){
	var datas = school[val];
	datas.forEach(function(data){
		var option = document.createElement("option");
		option.innerText = data;
		ele.append(option);
	});
}

var student = document.querySelectorAll(`input[name="student"]`);
student.forEach(function(stu){

	stu.addEventListener("click",function(e){
		var stukey = stu.getAttribute("data-key");
		if(stukey=="insch"){
		disorhide("insch","social");
		}else{
		disorhide("social","insch");
		}
	});
	
	
});
function disorhide(key1,key2){
	var part2 = document.querySelector(`div[data-key="${key2}"]`);
	part2.classList.add("hide");
	var part1 = document.querySelector(`div[data-key="${key1}"]`);
	part1.classList.remove("hide");
}
