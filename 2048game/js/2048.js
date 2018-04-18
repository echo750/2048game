var locations;
var keys=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];

var colors=['#cdc1b3','#eee6db','#ede1cb','orange','#ede1cb','#deg432','#654gfd','#777fda','#555dea','#234cag','#444','#6gf','#0oj','#222','#fdr','#564','yellow'];

var score;
var max;


$(function(){
	score=0;
	max=0;
	locations=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	locations[createLocation()]=createFixedNum();
	locations[createLocation()]=createFixedNum();
	paint();
});

$(function(e){
	window.onkeydown=function(e){
		var keyCode;
		if(!e){
			e=window.event;
		}
		if(document.all){
			keyCode=e.keyCode;
		}else{
			keyCode=e.which;
		}
		if(keyCode==37||keyCode==65){
			toLeft();
			isEnd();
		}
		if(keyCode==38||keyCode==87){
			toUp();
			isEnd();
		}
		if(keyCode==39||keyCode==68){
			toRight();
			isEnd();
		}
		if(keyCode==40||keyCode==83){
			toDown();
			isEnd();
		}
	}
});


function isEnd(){
	var f=false;
	if(locations.indexOf(0)==-1){
		if(isEndX()&&isEndY()){
			clearTimeout();
			if(window.confirm('当前分数是：'+score+';\n用时：'+time+'\n是否开始新的游戏？')){
				init();
			}else{
				window.close();
			}
		}
	}
	return f;
}

function isEndX(){
	var f=false;
	var w=new Array();
	for(var j=0;j<4;j++){
		for(var i=0;i<4;i++){
			w[i]=locations[4*j+i];
		}
		f=(w[0]!=w[1]&&w[1]!=w[2]&&w[2]!=w[3]);
		if(!f){
			break;
		}
	}
	return f;
}

function isEndY(){
	var f=false;
	var w=new Array();
	for(var j=0;j<4;j++){
		for(var i=0;i<4;i++){
			w[i]=locations[4*i+j];
		}
		f=(w[0]!=w[1]&&w[1]!=w[2]&&w[2]!=w[3]);
		if(!f){
			break;
		}
	}
	return f;
}

function toDown(){
	for(var i=0;i<4;i++){
		var row=[locations[i+12],locations[i+8],locations[i+4],locations[i]];
		configurationD(i,row);
	}
	locations[createLocation()]=createFixedNum();
	paint();
}

function toRight(){
	for(var i=0;i<4;i++){
		var row=[locations[i*4+3],locations[i*4+2],locations[i*4+1],locations[i*4]];
		configurationR(i,row);
	}
	locations[createLocation()]=createFixedNum();
	paint();
}

function toLeft() {
	// 向左
	for (var i = 0; i < 4; i++) {
		// 判断每一行
		var row = [ locations[i * 4], locations[i * 4 + 1],
				locations[i * 4 + 2], locations[i * 4 + 3] ];
		configurationL(i, row);
	}
	locations[createLocation()] = createFixedNum();
	paint();
}

function toUp() {
	// 向上
	for (var i = 0; i < 4; i++) {
		var row = [ locations[i + 0], locations[i + 4], locations[i + 8],
				locations[i + 12] ];
		configurationU(i, row);
	}
	locations[createLocation()] = createFixedNum();
	paint();
}

function configurationD(i, r) {
	makeArray(r);

	for (var j = 0; j < 4; j++) {
		locations[4 * (3 - j) + i] = r[j];
	}
}

function configurationR(i, r) {
	// 向右
	makeArray(r);

	for (var j = 0; j < 4; j++) {
		locations[3 + 4 * i - j] = r[j];
	}
}

function configurationU(i, r) {
	makeArray(r);

	for (var j = 0; j < 4; j++) {
		locations[4 * j + i] = r[j];
	}
}

function configurationL(i, r) {
	makeArray(r);

	for (var j = 0; j < 4; j++) {
		locations[4 * i + j] = r[j];
	}
}

function makeArray(r) {
	if (!isZero(r)) {
		// 把数组中是0往后移动
		for (var m = 0; m < 4; m++) {
			for (var n = 0; n < 3; n++) {
				if (r[n] == 0) {
					r[n] = r[n + 1];
					r[n + 1] = 0;
				}
			}
		}
	}

	for (var m = 0; m < 3; m++) {
		if (r[m] == r[m + 1]) {
			var k = m;
			r[k] += r[k + 1];
			score += r[k];
			while (++k < 3) {
				r[k] = r[k + 1];
			}
			r[3] = 0;
		}
	}

	return r;
}

// 绘制点的位置
function paint() {
	for (var i = 0; i < 16; i++) {
		$("#box" + keys[i]).text((locations[i] == 0) ? "" : locations[i]);
		var index = (locations[i] == 0) ? 0
				: (locations[i].toString(2).length - 1);
		$("#box" + keys[i]).css("background", colors[index]);
		// 选出最大数
		if (locations[i] > max) {
			max = locations[i];
		}
	}
	$(".score-size").text(score);
	$(".besst-size").text(max);
}

// 随机生成两个数
function createFixedNum() {
	// 生成2/4;
	// 生成2的概率是0.8
	return Math.random() < 0.8 ? 2 : 4;
}
// 生成位置
function createLocation() {
	// 在空位置中随机生成
	var num = Math.floor(Math.random() * 16);
	// 如果该位置有值,就返回重新生成
	while (locations[num] != 0) {
		num = Math.floor(Math.random() * 16);
	}
	return num;
}

function isZero(m) {
	return m[0] == 0 && m[1] == 0 && m[2] == 0 && m[3] == 0;
}

// function showtime() {
// 	$("#time").text("当前用时 :" + (++time) + " s");
// }

$(function(){
	$('button').click(function(){
		// t=setInterval(showtime,1000);
		score=0;
		max=0;
		time=0;
		locations=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		locations[createLocation()]=createFixedNum();
		locations[createLocation()]=createFixedNum();
		paint();
	})
})

