(function(){
	function Validate(cfg){
		this.length = this.turntobit(cfg.val);
		this.msg = new Msg(cfg);
		this.cfg = cfg;
	}
	Validate.prototype = {
		turntobit: function(val){
			var str = val;
			var len = 0;
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
	if(this.length == 0 || this.cfg.val == undefined){
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
success:function(){
	return this.msg.success();
}

};

window.Validate = Validate;
})();