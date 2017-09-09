addEvent(window,'load',function(){

	var nav_wrapper = document.getElementById('nav-wrapper');
	var category    = document.getElementById('category');
	addEvent(nav_wrapper, 'mouseover', function(e){
		category.style.display = 'block';
	});

	addEvent(nav_wrapper, 'mouseout', function(e){
		category.style.display = 'none';
	});
});