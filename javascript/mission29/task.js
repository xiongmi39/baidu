
	var cfg = {};
	var subform = document.getElementById("form");
	subform.addEventListener("click", function(e){
		if(e.target.nodeName.toLowerCase() == "button"){
			main(e.target);
		}
		
	});
	function main (ele){
		var item = ele.parentNode;
		var txt = item.getElementsByTagName("input")[0].value;
		var input = item.getElementsByTagName("input")[0];
		var about = item.getElementsByTagName("div")[0];
		cfg={
			val:txt,
			max:16,
			min:4
		};
		var validate = new Validate(cfg);
		if(validate.isnull()){
			about.innerText = validate.isnull();
			about.classList.remove('clear');
			about.classList.add('error');
			input.classList.add("errorborder") ;
			return;
		}
		if(validate.islen()){
			about.innerText = validate.islen();
			about.classList.remove('clear');
			about.classList.add('error');
			input.classList.add("errorborder") ;
			return;
		}
		about.innerText = validate.success();
		about.classList.remove('error');
		about.classList.add('clear');
		input.classList.remove('errorborder');
		
	}
