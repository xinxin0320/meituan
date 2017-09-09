// 公用的js文件

addEvent(window, 'load', function(){
	var favorite = document.getElementById('favorite');
	var favorite_span = favorite.getElementsByTagName('span')[0];
	//当鼠标移上收藏美团的时候，星星变实星
	addEvent(favorite, 'mouseover', function(){
		favorite_span.innerHTML = '&#xe61a;';
		favorite_span.style.color = '#f76120';
	});

	//当鼠标离开收藏美团的时候，星星变空心星星
	addEvent(favorite, 'mouseout', function(){
		favorite_span.innerHTML = '&#xe656;';
		favorite_span.style.color = '#666';
	});

	//当鼠标单击收藏美团的时候，收藏该网站
	addEvent(favorite, 'click', function(e){
		var title = '美团网';   //网站的标题
		var url = 'http://www.meituan.com';   //网站的url

		try {
		    window.external.addFavorite(url, title);
		}catch (e) {
		    try {
		       window.sidebar.addPanel(title, url, "");
		    }catch (e) {
		         alert("抱歉，您的浏览器不支持此操作。\n\n请按Ctrl+D收藏美团！");
		    }
		}

		// return false;
		/*var evt = e || window.event;   //对事件对象做兼容
		if(evt.preventDefault){   //能力检测
			evt.preventDefault();   //标准浏览器取消默认事件的方法
		}else{
			evt.returnValue = false;  //IE低版本浏览器中取消默认事件的方法
		}*/
		
		
	});

	//当鼠标移上用户导航右侧菜单的时候，给它加on类
	//鼠标离开的时候去掉on类
	var user_nav_right = document.getElementById('user-nav-right');
	var user_nav_right_lis = user_nav_right.getElementsByTagName('li');
	for(var i=0; i<user_nav_right_lis.length; i++){
		//先判断：如果该li下方有二级菜单，那么才给它添加事件
		// console.log( user_nav_right_lis[i].getElementsByTagName('ul').length );
		if( user_nav_right_lis[i].getElementsByTagName('ul').length>0 ){  //说明下方有二级菜单
			addEvent(user_nav_right_lis[i], 'mouseover', function(e){
				this.className = 'dropdown on';
			});
			addEvent(user_nav_right_lis[i], 'mouseout', function(e){
				this.className = 'dropdown';
			});
		}
	}

	var q = document.getElementById('q');
	//当搜索框获取焦点时
	addEvent(q, 'focus', function(e){
		//判断：只有一种情况会变空，就是当内容为“请输入商家名称、地址等”
		if(q.value=='请输入商家名称、地址等'){
			q.value = '';
			q.style.color = '#000';
		}
	});
	//当搜索框失去焦点时
	addEvent(q, 'blur', function(e){
		if(q.value==''){
			q.value='请输入商家名称、地址等';
			q.style.color= '#a9a9a9';
		}
	});

	var search_select = document.getElementById('search-select');
	//当鼠标移上搜索选项的时候，应该显示所有的选项
	addEvent(search_select, 'mouseover', function(e){
		this.className='fl on';
	});

	//当鼠标离开搜索选项的时候，只显示第一个选项
	addEvent(search_select, 'mouseout', function(e){
		this.className='fl';
	});

	//当鼠标单击搜索选项的时候，该搜索选项为成为其父母的第一个孩子
	var search_select_lis = search_select.getElementsByTagName('li');  //得到search-select后代中的li
	for(var i=0;i<search_select_lis.length; i++){
		addEvent(search_select_lis[i], 'click', function(e){
			this.parentNode.insertBefore(this, this.parentNode.firstChild);    //添加到他大哥之前
		});
	}

	//在全部分类的列表中，
	//当鼠标移上某个li的时候，给它加on
	//当鼠标离开某个li的时候，给它去掉on类
	var category = document.getElementById('category');
	var category_lis = category.getElementsByTagName('li');
	for(var i=0; i<category_lis.length; i++){
		addEvent(category_lis[i], 'mouseover', function(e){
			this.className = 'on';
		});
		addEvent(category_lis[i], 'mouseout', function(e){
			this.className = '';
		});
	}

	//当鼠标移上分类的时候，给ul添加active类；
	//当鼠标离开分类的时候，给ul去掉active类
	addEvent(category, 'mouseover', function(e){
		category.className = 'active';
	});
	addEvent(category, 'mouseout', function(e){
		category.className = '';
	});


	/**********************************************************
				页脚导航：里面的li和里面的div，通过索引值一一对应
	**********************************************************/
	var footer_nav      = document.getElementById('footer-nav');
	var footer_nav_lis  = footer_nav.getElementsByTagName('li');
	var footer_nav_divs = footer_nav.getElementsByTagName('div');
	//当单击某个li的时候，让该li处于当前状态（加cur类）
	for(var i=0; i<footer_nav_lis.length; i++){
		footer_nav_lis[i].idx = i;

		addEvent(footer_nav_lis[i], 'click', function(e){
			//只给它加cur类，让它的兄弟姐妹都不加cur
			//先排除，指排除所有
			for(var j=0; j<footer_nav_lis.length; j++){
				footer_nav_lis[j].className = '';
				
				footer_nav_divs[j].className = '';
			}

			//再确立，指确立自己
			this.className = 'cur';

			//div的工作
			//div通过索引值和li一一对应。只要找到了当前li的索引值，就是找到了对应的div的索引值
			
			//只让和当前li对应的div显示(加cur类)，其他都不显示(去掉cur)
			//先排除，排除所有
			// for(var j=0; j<footer_nav_lis.length; j++){
			// 	footer_nav_divs[j].className = '';
			// }

			//再确立：确立所有
			var index = this.idx;  //用户单击li的索引值
			//当前div的索引值也是index
			footer_nav_divs[index].className = 'cur';
		});
	}


	//当窗口滚动的时候，判断：如果窗口上方隐藏部分的高度>=一屏高度的时候，“回到顶部”显示；否则，就隐藏
	var toTop = document.getElementById('toTop');
	var win_top;   //窗口上方隐藏部分的高度
	var win_height = document.documentElement.clientHeight;   //一屏的高度
	// alert(win_height);
	addEvent(window, 'scroll', function(e){
		win_top = document.body.scrollTop || document.documentElement.scrollTop;

		if(win_top>=win_height){  //如果窗口上方隐藏部分的高度>=一屏高度的时候
			toTop.style.display = 'block';
		}else{
			toTop.style.display = 'none';
		}
	});



	// 图片的延迟加载
	var imgs = document.getElementsByTagName('img');   //网页中所有的插入图片
	// console.log(imgs);
	//需要延迟加载的图片，都有data-src属性
	var lazy_imgs = new Array();    //需要延迟加载的图片构成的数组
	//console.log( imgs[0].getAttribute('data-src') );    //获取自定义属性
	//console.log( imgs[47].getAttribute('data-src') );    //获取自定义属性
	for(var i=0; i<imgs.length; i++){
		if( imgs[i].getAttribute('data-src')!=null ){   //有data-src属性，需要延迟加载
			lazy_imgs.push( imgs[i] );   //往数组的最后添加一个新的项
			// lazy_img.unshift();  //往数组的最前添加一个新的项
		}
	}

	// console.log( lazy_imgs );
	//当窗口滚动的时候，如果图片位于窗口中，那么就需要将它的data-src属性给了它的src属性
	var win_top;    //窗口隐藏在上方部分的高度，窗口滚动坐标值的纵坐标
	var win_height = document.documentElement.clientHeight;  //窗口的高度
	var scroll_fn = function(){
		win_top = document.body.scrollTop || document.documentElement.scrollTop;
		//如果图片到body上侧的距离>=窗口滚动坐标值的纵坐标，并且<=窗口滚动坐标值的纵坐标+窗口的高度，那么图片就是位于窗口中的
		
		// console.log( lazy_imgs[0].offsetParent, lazy_imgs[0].offsetTop );
		//经测试，发现图片的offsetParent是它的父级，因为它的父级有定位。
		//我们发现图片和它的父级的实体范围是一样的。我们可以将它父级的offsetTop作为它到body上侧部分的高度使用。
		// console.log( lazy_imgs[0].parentNode.offsetParent, lazy_imgs[0].parentNode.offsetTop );

		/*if(lazy_imgs[0].parentNode.offsetTop>=win_top && lazy_imgs[0].parentNode.offsetTop<=(win_top+win_height) ){
			lazy_imgs[0].src = lazy_imgs[0].getAttribute('data-src');
		}

		if(lazy_imgs[1].parentNode.offsetTop>=win_top && lazy_imgs[1].parentNode.offsetTop<=(win_top+win_height) ){
			lazy_imgs[1].src = lazy_imgs[1].getAttribute('data-src');
		}*/

		for(var j=0; j<lazy_imgs.length; j++){
			if(lazy_imgs[j].parentNode.offsetTop>=win_top && lazy_imgs[j].parentNode.offsetTop<=(win_top+win_height) ){
				lazy_imgs[j].src = lazy_imgs[j].getAttribute('data-src');
			}
		}
	}
	addEvent(window, 'scroll', scroll_fn);

	scroll_fn();   //一上来就先调用这个函数，让这个函数执行一下
});