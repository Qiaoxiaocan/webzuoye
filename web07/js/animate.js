
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}

window.onload = function(){
    var notice = document.getElementById("notice");
    var notice1 = document.getElementById("notice1");
    var notice11 = document.getElementById("notice11");
    var totation = document.getElementById("totation");
    var numArray = document.getElementById("number").children;
    var currents = document.getElementById("currents");
    var leftButton = document.getElementById("leftButton");
    var rightButton = document.getElementById("rightButton");
    var current = document.getElementById('current');
    var index = 1;
    var move = false;
    var timer;
    
    //通知栏
    function theNotice(){
        var it = parseInt(getStyle(notice11, 'right'));
        notice11.style.right = it + 3 + 'px';
        if(it + 50 >= 500){
            notice11.style.right = '-850px';
        }
    }
    setInterval(theNotice, 50);
    
    function toRight(){
        if(!move){
            move = true;
            index ++;
            change();
            animate(currents, {left:-1200 * index}, function(){
                if(index == 6){
                    currents.style.left = "-1200px";
                    index = 1;
                }
                move = false;
            });
        }
    }
    function toLeft(){
        if(!move){
            move = true;
            index --;
            change();
            animate(currents, {left:-1200 * index}, function(){
                if(index == 0){
                    currents.style.left = "-6000px";
                    index = 5;
                }
                move = false;
            });
        }
    }
    var timer = setInterval(toRight, 3000);
    //鼠标划入
    totation.onmouseover = function(){
        animate(leftButton, {opacity: 50});
        animate(rightButton, {opacity: 50});
        clearInterval(timer);
    }
    //鼠标离开
    totation.onmouseout = function(){
        animate(leftButton, {opacity: 0});
        animate(rightButton, {opacity: 0});
        timer = setInterval(toRight, 3000);
    }
    rightButton.onclick = toRight;
    leftButton.onclick = toLeft;
    //数字点击事件
    for(var i = 0; i < numArray.length; i ++){
        numArray[i].idx = i;
        numArray[i].onclick = function(){
            index = this.idx + 1;
            change();
            animate(currents, {left: -1200 * index});
        }
    }
    //红灰切换
    numArray[0].style.color = 'white';
    function change(){
        for(var i = 0; i < numArray.length; i++){
            numArray[i].className= '';
            numArray[0].style.color = 'red';
        }
        if(index == 6){
            numArray[0].className = 'active';
            numArray[0].style.color = 'white';
        }
        else if(index == 0){
            numArray[4].className = 'active';
        }
        else{
            numArray[index - 1].className = 'active';
            if(index - 1 == 0){
                numArray[0].style.color = 'white';
            }
        }
    }
}