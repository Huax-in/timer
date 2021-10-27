let num_m = 0;		//时间-分
let num_s = 0;		//时间-秒
let num_ms = 0;		//时间-毫秒（*10）

let time_id = null; //计时器

const XDD = 0xDD;	//色域-up
const XBB = 0xBB;	//色域-down

let num_r = XDD;	//背景色-red
let num_g = XDD;	//背景色-green
let num_b = XDD;	//背景色-blue

let ranr = 0;		//随机数-r
let rang = 0;		//随机数-g
let ranb = 0;		//随机数-b

let index = 1;		//截取-序列号

window.onload = function(){
	ranr = Math.random();
	rang = Math.random();
	ranb = Math.random();
	num_r = XBB+ranr*(XDD-XBB);
	num_g = XBB+rang*(XDD-XBB);
	num_b = XBB+ranb*(XDD-XBB);
	bg_time();
	setInterval("bg_time()",250);
	document.addEventListener('click', enableNoSleep, false);
}
var noSleep = new NoSleep();
//防息屏
function enableNoSleep() {
	noSleep.enable();
	document.removeEventListener('click', enableNoSleep, false);
}
//背景随机渐变
function bg_time(){
	ranr = Math.random();
	rang = Math.random();
	ranb = Math.random();
	
	num_r = (ranr < 0.5) ? num_r+1:num_r-1;
	num_g = (rang < 0.5) ? num_g+1:num_g-1;
	num_b = (ranb < 0.5) ? num_b+1:num_b-1;
	
	num_r = num_check(num_r);
	num_g = num_check(num_g);
	num_b = num_check(num_b);
	
	document.getElementById("div_body").style.backgroundColor = "rgb("+
	+num_r+","
	+num_g+","
	+num_b
	+")";
}
//色域检查
function num_check(num_x){
	return (num_x > XDD)? XDD : ((num_x < XBB)? XBB : num_x);
}
//开始与暂停-点击事件
function start_click(){
	if(time_id != null){
		clearInterval(time_id);
		time_id = null;
		document.getElementById("btn_start").innerText="开 始";
		document.getElementById("btn_time").disabled = "disabled";
		document.getElementById("btn_time").classList.add("btn_time_disable");
		
		document.getElementById("btn_reset").disabled = "";
		document.getElementById("btn_reset").classList.remove("btn_time_disable");
	}else{
		document.getElementById("btn_start").innerText="暂 停";
		document.getElementById("btn_time").disabled = "";
		document.getElementById("btn_time").classList.remove("btn_time_disable");
		
		document.getElementById("btn_reset").disabled = "disabled";
		document.getElementById("btn_reset").classList.add("btn_time_disable");
		time();
	}
}
//重置-点击事件
function reset_click(){
	num_m = 0;
	num_s = 0;
	num_ms = 0;
	index = 1;
	document.getElementById("div_la").innerHTML = "";
	if(time_id == null){
		set_time();
	}
}
//计时核心
function time(){
	time_id = setInterval(function(){
		setTimeout(function(){
			set_time();
			if(num_m == 99 && num_s == 59 && num_ms == 99){
				clearInterval(time_id);
				time_id = null;
			}
			num_ms+=1;
			if(num_ms == 100){
				num_ms = 0;
				num_s+=1;
			}
			if(num_s == 60){
				num_s=0;
				num_m+=1
			}
		},0);
	},10);
}
//时间显示刷新
function set_time(){
	document.getElementById('ifr_type').contentWindow.document.getElementById('s_m').innerText=num_m;
	document.getElementById('ifr_type').contentWindow.document.getElementById('s_s').innerText=num_s;
	document.getElementById('ifr_type').contentWindow.document.getElementById('s_ms').innerText=num_ms<10?'0'+num_ms:num_ms;
}
//截取时间-点击事件
function get_time_click(){
	let n_s = num_s;
	let n_ms = num_ms;
	if(n_s < 10){
		n_s = "0"+n_s;
	}
	if(n_ms < 10){
		n_ms = "0"+n_ms;
	}
	let p_time = "<p>"
		+(index++)+"："
		+num_m+"分"
		+n_s+"秒"
		+n_ms
		+"</p>";
	document.getElementById("div_la").innerHTML+=p_time;
}