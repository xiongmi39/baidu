(function(){
	function Msg(val){
		this.val = val;
	}
	Msg.prototype = {
		isnull:function(){
			return `${this.val.name}不能为空`;
		},
		islen: function(){
			return "请输入"+this.val.min+"位到"+this.val.max+"位的字符";
		},
		inputwrong: function(){
			return `${this.val.name}格式不正确`;
		},
		pwdDiff: function(){
			return "密码不一致";
		},
		success: function(){
			return "验证通过";
		}
	}
	window.Msg = Msg;
})();