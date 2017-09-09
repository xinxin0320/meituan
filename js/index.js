// 首页私有的js

addEvent(window, 'load', function(){
	
	//mouseover与mouseout事件类型是有bug的，微软首先发现了这个问题，于是提出了解决方案：引入了两个新的事件类型mouseenter与mouseleave，这两个新的事件类型是没有bug。其他浏览器也觉得mouseenter与mouseleave也很好，所以对这两个事件类型也进行了支持。
	//当鼠标移上“更多”的时候，显示所有的选项（给它的爷爷div加on类）
	var show_all = document.getElementById('show-all');
	addEvent(show_all, 'mouseenter', function(e){
		show_all.parentNode.parentNode.className = 'on';
	});

	//当鼠标离开“更多”外侧div的时候，给它去掉on类
	addEvent(show_all.parentNode.parentNode, 'mouseleave', function(e){
		this.className = '';
	});

	//名店抢购的倒计时
	//每隔一秒，让名店抢购的时间减小一秒
	var brand_timer = document.getElementById('brand-timer');
	var brand_timer_spans = brand_timer.getElementsByTagName('span');
	// console.log(brand_timer_spans);
	var left_hours =  parseInt( brand_timer_spans[0].innerHTML+brand_timer_spans[1].innerHTML);   //parseInt()会将字符串转化为number类型
	// console.log( typeof left_hours);
	// console.log('剩余的小时数为：'+left_hours);

	var left_minutes = parseInt( brand_timer_spans[2].innerHTML + brand_timer_spans[3].innerHTML);
	// console.log('剩余的分钟数为：'+left_minutes);

	var left_seconds = parseInt( brand_timer_spans[4].innerHTML + brand_timer_spans[5].innerHTML);
	// console.log('剩余的秒数为：'+left_seconds);

	var total_seconds;   //表示总共剩余的秒数
	total_seconds = left_hours*60*60 + left_minutes*60 + left_seconds;
	// console.log('总共剩余的秒数为：'+total_seconds);

	// 每隔一秒，让名店抢购的时间减小一秒
	var brand_timing = setInterval(function(){
		//要做的事
		total_seconds--;

		// console.log(total_seconds);
		// 
		// 如果剩余的秒数<=0，那么就隐藏名店抢购
		if(total_seconds<=0){
			clearInterval(brand_timing);
			document.getElementById('brand-title').style.display = 'none';
			document.getElementById('brand').style.display = 'none';
		}

		//剩余的小时数
		left_hours = Math.floor( total_seconds/(60*60) );
		// console.log('剩余的小时数为：'+left_hours);

		left_seconds = total_seconds - left_hours*(60*60);   //不足一小时的秒数（分钟数和秒数）

		//剩余的整分钟数
		left_minutes = Math.floor(left_seconds/60);
		// console.log('剩余的分钟数为：'+left_minutes);

		left_seconds = left_seconds - left_minutes*60;
		// console.log('剩余的秒数为：'+left_seconds);


		brand_timer_spans[0].innerHTML = Math.floor(left_hours/10);   //放小时的十位数
		brand_timer_spans[1].innerHTML = left_hours%10;   //放小时的个位数

		brand_timer_spans[2].innerHTML = Math.floor(left_minutes/10);   //放分钟的十位数
		brand_timer_spans[3].innerHTML = left_minutes%10;   //放分钟的个位数

		brand_timer_spans[4].innerHTML = Math.floor(left_seconds/10);   //放秒的十位数
		brand_timer_spans[5].innerHTML = left_seconds%10;   //放秒的个位数
	}, 1000);
});

// 焦点图js
addEvent(window, 'load', function(){
	var banner       = document.getElementById('banner');
	var banner_ul    = banner.getElementsByTagName('ul')[0];
	var banner_spans = banner.getElementsByTagName('span');   //向前和向后按钮
	var banner_li_length = banner.getElementsByTagName('li').length;   //图片的组数
	var index=0;    //当前播放的图片组的索引值
	var timer;    //定时器

	//当页面加载完毕的时候，修改图片的信息
	banner_spans[1].innerHTML = (index+1)+'/'+banner_li_length;

	//当鼠标移上焦点图的时候，显示向前和向后按钮
	//当鼠标移上焦点图的时候，停止图片的自动播放
	addEvent(banner, 'mouseover', function(e){
		for(var i=0; i<banner_spans.length; i++){
			banner_spans[i].style.display = 'inline';  /*改为默认显示模式*/
		}

		// 停止图片的自动播放:只要清除定时器即可
		clearInterval(timer);
	});

	//当鼠标离开焦点图的时候，隐藏向前和向后按钮
	//当鼠标离开焦点图的时候，让图片继续自动播放
	addEvent(banner, 'mouseout', function(e){
		for(var i=0; i<banner_spans.length; i++){
			banner_spans[i].style.display = 'none';
		}

		// 让图片继续自动播放
		//每隔三秒(3000毫秒)，自动播放下一组图片
		timer = setInterval(function(){
			//要做的事
			//播放下一组图片
			index++;
			if(index>=banner_li_length){   //播放第一组，索引值为0
				index=0;
			}

			// banner_ul.style.left = '-'+(689*index)+'px';
			move(banner_ul, -689*index);

			//更改向后按钮中的文字
			banner_spans[1].innerHTML = (index+1)+'/'+banner_li_length;
		}, 3000);
	});

	// 当用户单击向后按钮的时候，播放下一组图片
	addEvent(banner_spans[1], 'click', function(e){
		//播放下一组图片
		index++;
		if(index>=banner_li_length){   //播放第一组，索引值为0
			index=0;
		}

		/************************************************
				图片组的索引值index      ul的left值
					0                        0
					1                        -689px
					2                        -(689*2)px
					3                        -(689*3)px
					4                        -(689*4)px

					index                    -(689*index)px
		************************************************/
		// banner_ul.style.left = '-'+(689*index)+'px';
		move(banner_ul, -689*index);

		//更改向后按钮中的文字
		banner_spans[1].innerHTML = (index+1)+'/'+banner_li_length;
	});

	//当用户单击向前按钮的时候，播放上一组图片
	addEvent(banner_spans[0], 'click', function(e){
		index--;
		if(index<0){  //如果当前是第一组图片，那么就播放最后一组
			index = banner_li_length-1;
		}

		// banner_ul.style.left = '-'+(689*index)+'px';
		move(banner_ul, -689*index);

		//更改向后按钮中的文字
		banner_spans[1].innerHTML = (index+1)+'/'+banner_li_length;
	});

	//每隔三秒(3000毫秒)，自动播放下一组图片
	timer = setInterval(function(){
		//要做的事
		//播放下一组图片
		index++;
		if(index>=banner_li_length){   //播放第一组，索引值为0
			index=0;
		}

		/************************************************
				图片组的索引值index      ul的left值
					0                        0
					1                        -689px
					2                        -(689*2)px
					3                        -(689*3)px
					4                        -(689*4)px

					index                    -(689*index)px
		************************************************/
		// banner_ul.style.left = '-'+(689*index)+'px';
		move(banner_ul, -689*index);

		//更改向后按钮中的文字
		banner_spans[1].innerHTML = (index+1)+'/'+banner_li_length;
	}, 3000);
});