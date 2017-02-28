
// var rail1 = document.getElementById('rail1');
// var rail2 = document.getElementById('rail2');
var control = document.getElementById('control');
control.addEventListener('click',function(event){
    if(event.target.nodeName.toLowerCase() === 'button'){
      Planet.commander(event.target.parentNode.id,event.target,event.target.parentNode.children[4].value);
      Planet.sendsignal();
    }
});

var Ship ={
    status : 'stop',
    dom : "",
    rail: "",
    speed:1,
    //飞船初始角度
    num:270
}
Ship.start = function(){
    var ship = this.dom;
    var circle = document.getElementById('circle');
    var r = this.rail.offsetWidth/2; // 半径
    var x = circle.offsetLeft + circle.offsetWidth/2; // 园的中心点 x 坐标
    var y = circle.offsetTop + circle.offsetHeight/2; // 园的中心点 y 坐标
    
    var num = this.num; // 起始角度
    this.status = "fly";
    this.energy();
    var self = this;
    var speed = 40/self.speed;
    var speednow = self.speed;
   var timer =  setInterval(function(){
        //能量用完时停止
        if(self.status == "stop"){
            self.num = num;
            clearInterval(timer);
        }
        //变速
        if(self.speed !== speednow){
            self.num = num;
            clearInterval(timer);
            self.start();
        }
        if(num > 360){
            num = 0;
        }
        num++
        
        //Math.sin( num*Math.PI/180 ) = a/r;
        //Math.cos( num*Math.PI/180 ) = b/r;
        
        // 算出圆周上每一个 A 的 x,y 轴
        var a = Math.sin( num*Math.PI/180 ) * r -20;
        var b = Math.cos( num*Math.PI/180 ) * r -10;
        var now = num-90;
        
        // 算出 圆周上每一个 A 的坐标
        ship.style.transform = 'rotate('+now+'deg)';
        ship.style.left = x + b + 'px';
        ship.style.top = y + a + 'px';
        
   },speed);
};
Ship.energy = function(){
    var speed = this.speed;
    var energy = this.dom.children[0];
    var total = energy.offsetWidth;
    var self = this;
    var per = total/40*speed;
   var timer = setInterval(function(){
        if(self.status ==  "stop"){
            clearInterval(timer);
        }
        if( total < 0){
            self.status = "stop";
            self.power();
            clearInterval(timer);
        }
        total = total - per;
        energy.style.width = total +"px";
    },500);
};
Ship.power = function(){
    var self = this;
    var energy = this.dom.children[0];
    var total = energy.offsetWidth;
    var per = this.dom.offsetWidth/20;
    var powerup = setInterval(function(){
        if(total > self.dom.offsetWidth){
            clearInterval(powerup);
        }
        total = total + per;
        energy.style.width = total +"px";
    },500);
};
// Ship.getsignal = function(){};
Ship.makenew = function(rail){
    var x = rail.offsetLeft +rail.offsetWidth/2 -20;
    var y = rail.offsetTop -10;

    var ship = document.createElement('div');
    var energy = document.createElement('div');
    energy.className = 'energy';
    ship.className = 'ship';
    ship.id = rail.id+'ship';
    ship.setAttribute('style','position:absolute;left:'+x+'px;top:'+y+'px');
    ship.append(energy);
    document.body.appendChild(ship);

    return ship;
};
Ship.explode = function(){
    this.dom.outerHTML = "";
};
Ship.stop = function(){
    this.status = "stop";
};
Ship.setspeed = function(speed){
    this.speed = speed;
};




var Planet ={
    shipNo: 0,
    ships : {},
    signal : {
        id:"",
        command:"",
        speed:1
    }
}
Planet.addship = function(rail){
    if(this.ships[rail.id] !== undefined){
        return;
    }
    var ship = Object.create(Ship);
    ship.dom = ship.makenew(rail);
    ship.rail = rail;
    this.ships[rail.id] = ship;
    this.shipNo ++;
};
Planet.delship = function(rail){
    delete this.ships[rail.id];
};
Planet.sendsignal = function(){
    if(!this.sendpackage()){
        return;
    }
    var signal = this.signal;
    var rail = document.getElementById("rail" + signal["id"]);
    if(signal["command"] == "make"){
        this.addship(rail);
        return ;
    }
    var ship = this.ships[rail.id];
    if(ship === undefined){
        return;
    }
    var met = signal["command"];
    
    ship[met](this.signal["speed"]); 

    if(signal["command"] == "explode"){
        this.delship(rail);
    } 
}
Planet.sendpackage = function(){
    var ran = Math.random()*100;
    var conpanel = document.getElementById('console');
    var log = document.createElement("div");
    if (ran > 30){
        log.innerText = "success";
        conpanel.append(log);
        conpanel.scrollTop = conpanel.scrollHeight; 
        return true;
    }else{
        log.innerText = "fail";
        log.style.color = "#C40000";
        conpanel.append(log);
        conpanel.scrollTop = conpanel.scrollHeight; 
        return false;
    }
}
Planet.commander = function(id,btn,speed){
        this.signal["id"] = id;
        this.signal['command'] = btn.className;
        if(speed !== undefined){
            this.signal["speed"] = speed;
        }
}