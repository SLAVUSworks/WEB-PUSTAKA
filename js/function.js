$(function(){
	$('.nav__icon').on('click', function() {
		$(this).toggleClass('active');
		$('nav ul').slideToggle();
	});

	$(window).on('load resize',function(){
		var w = $(window).width();
		var h = $(window).height();
		var x = 700;
		if (w >= x) {
			$('nav ul').css({ display: 'flex',height: 'auto' });
		}else {
			$('nav ul').css({ display: 'none',height: h + 'px'});
		}
	});
});