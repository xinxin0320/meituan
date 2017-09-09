// 详情页私有的js

addEvent(window,'load', function(){
	//当窗口滚动时，如果详情导航吸顶，那么就吸顶（加on）；否则，不吸顶（去掉on）
	var detail_nav = document.getElementById('detail-nav');
	var win_top;
	var detail_nav_top = detail_nav.offsetTop;
	addEvent(window, 'scroll', function(e){
		win_top = document.body.scrollTop || document.documentElement.scrollTop;
		if(win_top>=detail_nav_top){
			detail_nav.className = 'on';
		}else{
			detail_nav.className = '';
		}
	});

	/*******************************************************
			详情页的banner部分
	********************************************************/
	var banner = document.getElementById('banner');
	var banner_spans = banner.getElementsByTagName('span');
	var banner_ol = banner.getElementsByTagName('ol')[0];
	var banner_ol_lis = banner_ol.getElementsByTagName('li');
	var banner_datu = document.getElementById('datu');
	var index=0;     //当前小图的索引值
	//当鼠标移上焦点图的时候，显示向前和向后按钮
	addEvent(banner, 'mouseover', function(e){
		for(var i=0; i<banner_spans.length; i++){
			banner_spans[i].style.display = 'inline';
		}
	});
	//当鼠标离开焦点图的时候，隐藏向前和向后按钮
	addEvent(banner, 'mouseout', function(e){
		for(var i=0; i<banner_spans.length; i++){
			banner_spans[i].style.display = 'none';
		}
	});

	//当单击向后按钮的时候，显示下一张小图对应的大图
	addEvent(banner_spans[1], 'click', function(e){
		index++;
		if(index>=banner_ol_lis.length){
			index = 0;
		}
		console.log(index);

		//小图的工作:只让当前小图加蓝边(加cur)，其他都不加蓝边
		//先排除,排除所有
		for(var i=0; i<banner_ol_lis.length; i++){
			banner_ol_lis[i].className='';
		}

		//再确立,确立自己
		banner_ol_lis[index].className = 'cur';

		//大图的工作:把当前小图对应的大图地址给了大图
		banner_datu.src = banner_ol_lis[index].getAttribute('data-datu');
	});

	//当鼠标单击向前按钮的时候，显示上一张小图对应的大图
	addEvent(banner_spans[0], 'click', function(e){
		index--;
		if(index<0){
			index = banner_ol_lis.length-1;
		}

		//小图的工作:只让当前小图加蓝边(加cur)，其他都不加蓝边
		//先排除,排除所有
		for(var i=0; i<banner_ol_lis.length; i++){
			banner_ol_lis[i].className='';
		}

		//再确立,确立自己
		banner_ol_lis[index].className = 'cur';

		//大图的工作:把当前小图对应的大图地址给了大图
		banner_datu.src = banner_ol_lis[index].getAttribute('data-datu');
	});

	//当鼠标移上小图区域，显示对应的大图
	for(var i=0; i<banner_ol_lis.length; i++){
		banner_ol_lis[i].idx = i;   //将图片区域的索引值保存在它的自定义属性idx中

		addEvent(banner_ol_lis[i], 'mouseover', function(e){
			//鼠标移上的图片区域加蓝色边框(加cur)，其他都不加蓝色边框
			for(var j=0; j<banner_ol_lis.length; j++){
				banner_ol_lis[j].className = '';
			}
			this.className = 'cur';

			//大图的工作：让鼠标移上的小图对应的大图显示
			banner_datu.src = this.getAttribute('data-datu');

			//修改索引值
			// alert(this.idx);
			index = this.idx;
		});
	}
	
	/*******************************************************
			详情页的banner部分
	********************************************************/
});