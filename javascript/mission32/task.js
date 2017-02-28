var form = document.getElementById("form");
var cfgs = [{
        name: '名称', 
        key:'name',                   // 表单标签
        type: ['input','text'],                   // 表单类型
        valifun: function(vali){
        	var result = {
        		status: "ok",
        		msg: "验证成功"
        	};
        	var result = {
        		status: "ok",
        		msg: "验证成功"
        	};
			if(vali.isnull()){
				result["status"] = "err";
				result["msg"] = vali.isnull();
				return result;
			}
			if(vali.islen()){
				result["status"] = "err";
				result["msg"] = vali.islen();
				return result;
			}
			return result;
		},    // 表单验证规
        rules: '必填，长度为4-16个字符',    // 填写规则提示

        min:  4,
        max: 16 
               // 验证失败提示
    },{
    	name:'密码',
    	key:'psw',
    	type:['input','password'],
    	valifun:function(vali){
    		var result = {
        		status: "ok",
        		msg: "验证成功"
        	};
		var pw = document.querySelectorAll(`input[data-key="${vali.key}"]`);
		var val1 = pw[0].value;
		var val2 = pw[1].value; if(vali.isnull()){
				 result["status"] = "err";
				result["msg"] = vali.isnull();
				return result;
			}
			if(vali.checkPsw()){
				result["status"] = "err";
				result["msg"] = vali.checkPsw();
				return result;
			}
			if(val1.trim().length !== 0 && val2.trim().length !== 0 && vali.checkDiff(val1,val2)){
				result["status"] = "err";
				result["msg"] = vali.checkDiff(val1,val2);
				return result;
			}
			 return result;
			
		},
		rules:'请输入密码'  
    },{
    	name:'密码确认',
    	key:'psw',
    	type:['input','password'],
    	valifun:function(vali){
    		var result = {
        		status: "ok",
        		msg: "验证成功"
        	};
		var pw = document.querySelectorAll(`input[data-key="${vali.key}"]`);
		var val1 = pw[0].value;
		var val2 = pw[1].value;
			if(vali.isnull()){
				 result["status"] = "err";
				result["msg"] = vali.isnull();
				return result;
			}
			if(vali.checkPsw()){
				result["status"] = "err";
				result["msg"] = vali.checkPsw();
				return result;
			}
			if(val1.trim().length !== 0 && val2.trim().length !== 0 && vali.checkDiff(val1,val2)){
				result["status"] = "err";
				result["msg"] = vali.checkDiff(val1,val2);
				return result;
			}
			 return result;
			
		},
		rules:'请再一次输入密码'  
    },{
    	name:'邮箱',
    	key:'mail',
    	type:['input','text'],
    	valifun:function(vali){
    		var result = {
        		status: "ok",
        		msg: "验证成功"
        	};
			if(vali.isnull()){
				result["status"] = "err";
				result["msg"] = vali.isnull();
				return result;
			}
			if(vali.checkMail()){
				result["status"] = "err";
				result["msg"] = vali.checkMail();
				return result;
			}
			 return result;
		},
		rules:'请输入邮箱地址' 
    },{
    	name:'手机',
    	key:'phone',
    	type:['input','text'],
    	valifun:function(vali){
    		var result = {
        		status: "ok",
        		msg: "验证成功"
        	};
			if(vali.isnull()){
				result["status"] = "err";
				result["msg"] = vali.isnull();
			}
			if(vali.checkMobile()){
				result["status"] = "err";
				result["msg"] = vali.checkMobile();
			}
			 return result;
		},
		rules:'请输入电话号码' 
    }];    
cfgs.forEach(function(cfg){
	 var ele =    makeitem(cfg);
	 var input = ele.querySelector('input');
	 input.addEventListener("focus",function(){
			var about = this.parentNode.querySelector('div');
			about.style.visibility = "visible";
		});
		input.addEventListener("blur",function(e){
			main(e.target,cfg);
		});
});

	function main (ele,cfg){
		var item = ele.parentNode;
		var txt = item.getElementsByTagName("input")[0].value;
		cfg["val"]= txt;
		var validate = new Validate(cfg);
		var result = cfg["valifun"](validate);
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

    function makeitem(cfg){
    	var dom = document.createElement("div");
    	dom.classList.add("item");
    	form.append(dom);
    	var name = document.createElement("span");
    	name.innerText = cfg.name;
    	var ele = document.createElement(cfg.type[0]);
    	ele.setAttribute("data-key",cfg.key);
    	ele.type = cfg.type[1];
    	var about = document.createElement("div");
    	about.classList.add("about");
    	about.innerText = cfg.rules;
    	dom.append(name);
    	dom.append(ele);
    	dom.append(about);
    return dom;
    }


