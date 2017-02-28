
	var cfg = {};
	var subform = document.getElementById("form");
	var inputs = document.querySelectorAll('input');
	var btn = document.getElementById('checkbtn');
	inputs.forEach(function(input){
		input.addEventListener("focus",function(){
			var about = this.parentNode.querySelector('div');
			about.style.visibility = "visible";
		});
		input.addEventListener("blur",function(e){
			main(e.target);
		});
	});
	btn.onclick = function(){
		var items = document.querySelectorAll("input");
		var alt = true;
		items.forEach(function(item){
			var res = main(item);
			if(res == "err"){
				alt = false;
			}
		});
		if(!alt){
			alert("输入有错误");
		}else{
			alert("校验成功");
		}
	};
	
	function main (ele){
		var item = ele.parentNode;
		var name = item.getElementsByTagName("span")[0].innerText;
		var txt = item.getElementsByTagName("input")[0].value;
		var key = ele.getAttribute("data-key");
		cfg={
			key:key,
			name:name,
			val:txt,
			max:16,
			min:4
		};
		var validate = new Validate(cfg);
		var check = new allcheck(validate);
		var result = eval(`check.${key}(validate);`);
		setStyle(item,result);
		return result.status;	
	}
	function setStyle(item,result){

		var input = item.getElementsByTagName("input")[0];
		var about = item.getElementsByTagName("div")[0];
		about.innerText = result.msg;
		if(result.status == "ok"){
		about.classList.remove('error');
		about.classList.add('clear');
		input.classList.remove('errorborder');
		return;
		}
		if(result.status == "err"){
			about.classList.remove('clear');
			about.classList.add('error');
			input.classList.add("errorborder") ;
			return ;
		}
	}
	var allcheck = function(vali) {
		this.result={
			status:"ok",
			msg:vali.success()
		};


	};
	allcheck.prototype.name=function(vali){
			if(vali.isnull()){
				this.result.status = "err";
				this.result.msg = vali.isnull();
				return this.result;
			}
			if(vali.islen()){
				this.result.status = "err";
				this.result.msg = vali.islen();
				return this.result;
			}
			return this.result;
		};
	allcheck.prototype.psw=function(vali){
		var pw = document.querySelectorAll(`input[data-key="${vali.key}"]`);
		var val1 = pw[0].value;
		var val2 = pw[1].value;
			if(vali.isnull()){
				 this.result.status = "err";
				this.result.msg = vali.isnull();
				return this.result;
			}
			if(vali.checkPsw()){
				this.result.status = "err";
				this.result.msg = vali.checkPsw();
				return this.result;
			}
			if(val1.trim().length !== 0 && val2.trim().length !== 0 && vali.checkDiff(val1,val2)){
				this.result.status = "err";
				this.result.msg = vali.checkDiff(val1,val2);
				return this.result;
			}
			 return this.result;
			
		};
allcheck.prototype.mail=function(vali){
			if(vali.isnull()){
				this.result.status = "err";
				this.result.msg = vali.isnull();
				return this.result;
			}
			if(vali.checkMail()){
				this.result.status = "err";
				this.result.msg = vali.checkMail();
				return this.result;
			}
			 return this.result;
		};
	allcheck.prototype.phone=function(vali){
			if(vali.isnull()){
				this.result.status = "err";
				this.result.msg = vali.isnull();
			}
			if(vali.checkMobile()){
				this.result.status = "err";
				this.result.msg = vali.checkMobile();
			}
			 return this.result;
		};
