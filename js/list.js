// 列表页私有的js

addEvent(window, 'load', function(){
	

	//当用户鼠标单击列表页广告上叉号的时候，关闭广告
	var list_ad_btn = document.getElementById('list-ad-btn');
	addEvent(list_ad_btn, 'click', function(e){
		list_ad_btn.parentNode.style.display = 'none';
	});


	//最近浏览
	var recent_visit = document.getElementById('recent-visit');
	console.log( recent_visit.offsetParent, recent_visit.offsetTop );
	var recent_visit_top = recent_visit.offsetTop;
	var win_top;   //窗口滚动坐标值的纵坐标，即：页面隐藏在窗口上方部分的高度
	//recent_visit.offsetTop表示“最近浏览”距离页面body最上方的距离
	//当窗口滚动的时候，如果窗口的滚动坐标值的纵坐标>=recent-visit的文档坐标值纵坐标的时候，就应该吸顶；否则，就应该处于标准流
	addEvent(window, 'scroll', function(e){
		win_top = document.body.scrollTop || document.documentElement.scrollTop;
		// console.log(win_top);
		if(win_top>=recent_visit_top){  //如果上方隐藏部分的高度>=recent_visit_top，那么就应该吸顶
			recent_visit.style.position='fixed';    //固定定位
			recent_visit.style.top = 0; 
		}else{
			recent_visit.style.position='static';    //标准流
		}
	});

	/****************************************************
			价格区间
	***************************************************/
	var price_range = document.getElementById('price-range');
	//当鼠标移上价格区间的时候，显示下方的二级菜单(加on)
	addEvent(price_range, 'mouseover', function(e){
		this.className = 'on';
	});
	//当鼠标离开价格区间的时候，隐藏下方的二级菜单(去掉on)
	addEvent(price_range, 'mouseout', function(e){
		this.className = '';
	});
});