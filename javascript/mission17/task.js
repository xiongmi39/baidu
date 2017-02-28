/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
var formselect = document.getElementById("form-gra-time");
var color = ["#e2738e","#d58f74","#8cac95","#965e2e","#a7dee3","#9072b6","#328ead","#f5b536","#51504f","#929254"];
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {
};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var parttenitems = formselect.getElementsByTagName('input');
  var chart = document.getElementById('aqi-chart-wrap');
  chart.innerHTML = "";
  var partennow = '';
  for(var i=0;i<parttenitems.length;i++){
    if(parttenitems[i].checked == true){
      partennow = parttenitems[i].value;
    }
  }
  var citynow = document.getElementById('city-select').value;
  var showdata = chartData[partennow][citynow];
  //柱子总数
  var count = 0;
  for(var i in showdata){
    count++;
  }
  //计算柱宽
  var chartwidth = chart.offsetWidth;
  var itemwidth = (chartwidth*0.9/count)/chartwidth*100;
  var marginwidth = ((chartwidth*0.1/count)/chartwidth*100)/2;
  var chartheight = chart.offsetHeight;
  var itemheight = 0;
  for(var singledata in showdata){
     //计算柱高
    var singleheight = showdata[singledata];
    itemheight = (chartheight/600)*singleheight;
    var item = "<a href='javascript:void(0)' title='"+singledata+" : "+showdata[singledata]+"'><div class='item'  style='width: "+itemwidth+"%;margin: 0 "+marginwidth+"%;'><div class='inner' style='height:"+itemheight+"px'><div class='bar' style='background-color: "+color[Math.floor(Math.random()*10)]+"'></div></div></div></a>";
    chart.innerHTML += item;
  }


}



/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
  // 确定是否选项发生了变化 
  // 设置对应数据
  if(event.value !== pageState.nowGraTime){
    // 调用图表渲染函数
    pageState.nowGraTime = event.value;
    renderChart();
  }
  else{
    return;
  }
  
  
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
 var selecteditem = document.getElementById('city-select')
 if(selecteditem.value !== pageState.nowSelectCity){
    // 调用图表渲染函数
    pageState.nowSelectCity = selecteditem.value;
    renderChart();
  }
  else{
    return;
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

    formselect.addEventListener('click',function(event){
    if(event.target.nodeName.toLowerCase() === "input"){
      graTimeChange.call(null,event.target)
    }

  })
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citysel = document.getElementById('city-select');
  for(var city in aqiSourceData){
     citysel.innerHTML +="<option>"+city+"</option>"
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citysel.onchange = function(){
    citySelectChange();
  }

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
      // 将原始的源数据处理成图表需要的数据格式
    var week = {}, count = 0, singleWeek = {},
        month = {}, mcount = 0, singleMonth = {};

    for (var key in aqiSourceData) {
        var tempCity = aqiSourceData[key]
        var keyArr = Object.getOwnPropertyNames(tempCity);
        var tempMonth = keyArr[0].slice(5, 7);
        // weekInit 累计一月总天数 ，weekCount 一个月内第几周
        var weekInit = 4, weekCount = 0;
        for (var i = 0; i < keyArr.length; i++, weekInit++) {
            //周空气指数累加
            count += tempCity[keyArr[i]];
            //月空气指数
            mcount += tempCity[keyArr[i]];
            weekCount++;
            //本周累计完毕，计算周平均值
            if ((weekInit+1) % 7 == 0 || i == keyArr.length - 1 || keyArr[i+1].slice(5, 7) !== tempMonth) {
                var tempKey = keyArr[i].slice(0, 7) + "月第" + (Math.floor(weekInit / 7) + 1) + "周";
                //计算周空气平均值（周累计空气指数/本周天数）
                singleWeek[tempKey] = Math.floor(count / weekCount);
                //如果进入下一个月份，累计数据清空
                if (i != keyArr.length - 1 && keyArr[i+1].slice(5, 7) !== tempMonth) {
                    weekInit = weekCount % 7;
                }
                //周平均值计算完毕，周空气指数清空
                count = 0;
                //本周累计天数清空
                weekCount = 0;
                //本月累计完毕，计算月平均值
                if (i == keyArr.length - 1 || keyArr[i+1].slice(5, 7) !== tempMonth) {
                    tempMonth = (i == keyArr.length - 1) ? keyArr[i].slice(5, 7) : keyArr[i+1].slice(5, 7);
                    var tempMKey = keyArr[i].slice(0, 7);
                    var tempDays = keyArr[i].slice(-2);
                    //计算月平均（月累计/本月天数）
                    singleMonth[tempMKey] = Math.floor(mcount / tempDays);
                    mcount = 0;
                }
            }
        }
        week[key] = singleWeek;
        month[key] = singleMonth;
        singleWeek = {};
        singleMonth = {};
    }
    // 处理好的数据存到 chartData 中
    chartData.day = aqiSourceData;
    chartData.week = week;
    chartData.month = month;
renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();