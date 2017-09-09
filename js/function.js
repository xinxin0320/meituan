// 通用的函数库

/******************************************************************************
			功能：兼容多浏览器的事件绑定方式
			三个参数：
					事件源  obj
					事件类型 type    需要是字符串，前面不加on
					事件处理函数  handler
******************************************************************************/
function addEvent(obj, type, handler){
	//能力检测
	if(obj.addEventListener){   //标准浏览器 事件源.addEventListener(事件类型, 处理函数)
		obj.addEventListener(type, handler);
	}else if(obj.attacheEvent){   //IE低版本浏览器  事件源.attachEvent('on'+事件类型, 事件处理函数)
		obj.attacheEvent('on'+type, handler);
	}else{   //以上都不支持，
		//我们用DOM0级的事件绑定方式：事件源.on事件类型=事件处理函数
		//当事件类型是变量的时候，需要写为数组的形式：事件源['on'+事件类型]=事件处理函数
		obj['on'+type]=handler;
	}
}

/******************************************************************************
			功能：兼容多浏览器的事件解绑方式
			三个参数：
					事件源  obj
					事件类型 type    需要是字符串，前面不加on
					事件处理函数  handler
******************************************************************************/
function removeEvent(obj, type, handler){
	//能力检测
	if(obj.removeEventListener){   //标准浏览器 事件源.addEventListener(事件类型, 处理函数)
		obj.removeEventListener(type, handler);
	}else if(obj.detachEvent){   //IE低版本浏览器  事件源.attachEvent('on'+事件类型, 事件处理函数)
		obj.detachEvent('on'+type, handler);
	}else{   //以上都不支持，
		//我们用DOM0级的事件绑定方式：事件源.on事件类型=事件处理函数
		//当事件类型是变量的时候，需要写为数组的形式：事件源['on'+事件类型]=事件处理函数
		obj['on'+type]=null;
	}
}


/**********************************************************
			功能：让box在一秒的时间，left值运动到dest的位置
			参数：box   表示运动的元素
				  dest   表示要运动到的位置
*********************************************************/
function move(box, dest){
	var init_position = box.offsetLeft;    //盒子的初始位置
	// alert(init_position);
	//需要运动的距离
	var distance = dest-init_position;     //要运动的距离
	//用一秒（1000毫秒）的时候，运动到终点；每隔10毫秒运动一次；那么一共运动多少步？
	var total_num = 1000/10;     //总共要走的步数
	var num=0;    //当前走了多少步

	//一步走多长？
	var step = distance/total_num;  //步长 
	// alert(step);
	
	//每隔10毫秒运动一次，即：每隔10毫秒走一步
	var timer =  setInterval(function(){
		num++;

		// console.log( init_position + num*step );
		
		box.style.left = (init_position + num*step) + 'px';

		if(num>=total_num){   //达到了总共要走的步数，需要停下来
			clearInterval(timer);    //停止定时器
			//强制让元素停在终点
			box.style.left = dest+'px';
		}
	}, 10);
}