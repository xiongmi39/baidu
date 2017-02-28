(function(){
	function Validate(cfg){
		this.length = this.turntobit(cfg.val);
		this.msg = new Msg(cfg);
		this.cfg = cfg;
		this.key = cfg.key;
	}
	Validate.prototype = {
		turntobit: function(val){
			var str = val;
			var len = 0;
			if(val.trim().length == 0){
				return 0;
			}
			for(var i=0;i<str.length;i++){  
            //对每一位字符串进行判断，如果Unicode编码在0-127，计数器+1；否则+2  
            if(str.charCodeAt(i)<128 && str.charCodeAt(i)>=0 ){  
                	len++; //一个英文在Unicode表中站一个字符位  
                }else{   
                	len+=2; //一个中文在Unicode表中站二个字符位  
                }  
            }
            return len;
        },
        isnull: function(){
        	if(this.length == 0 || this.cfg.val === undefined){
        		return this.msg.isnull();
        	}
        	return false;
        },
        islen: function(){
        	if(this.length < this.cfg.min || this.length > this.cfg.max){
        		return this.msg.islen();
        	}
        	return false;
        },
        checkPsw: function(){
        	var re = /^[a-zA-Z0-9!"\#$%&'()*+,-./:;<=>?@\[\\\]^_`\{\|\}\~]{10,16}$/;
        	if(!re.test(this.cfg.val)){
        		return this.msg.inputwrong();
        	}
        	return false;
        },
        checkDiff: function(val1,val2){
        	if(val1 !== val2){
        		return this.msg.pwdDiff();
        	}
        	return false;
        },
        checkMail: function(){
        	var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        	if(!re.test(this.cfg.val)){
        		return this.msg.inputwrong();
        	}
        	return false;
        },
        checkMobile: function(){
        	var re = /^1\d{10}$/;
        	if(!re.test(this.cfg.val)){
        		return this.msg.inputwrong();
        	}
        	return false;
        },
        success:function(){
        	return this.msg.success();
        }

    };

    window.Validate = Validate;
})();