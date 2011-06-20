/*
 * jQuery Easy Slider plugin v0.5
 *
 * Copyright (C) 2011 HAMADA, Satoshi
 * 
 */

/* Load Map

- ページャー付ける事
$('.page')等に、aタグをappendしていく
a.page rel={page}

---- */

(function($){
	
	$.fn.slider = function(usr_opt) {
		var opt = jQuery.extend({
			easing:		'linear',
			speed:		400,
			view_per_page:	3,
			width : 0
		}, usr_opt);
		
		//スライダー部分
		var slide = $(this).find('ul');
		slide.w = 0;
		slide.l = 0;
		slide.n = 0;
		slide.find('li').each(function() {
			slide.w = slide.w + $(this).width();
			slide.l++;
			if (opt.width == 0) opt.width = slide.w;
		}).end().width(slide.w);
		
		var nav = $(this).find('.nav');
		nav.find('a.next').click(function() {
			if (slide.n != slide.l - opt.view_per_page) {
				slide.n++;
			} else {
				slide.n = 0;
			}
			slide.doSlide(opt, slide.n);
		});
		nav.find('a.prev').click(function() {
			if (slide.n != 0) {
				slide.n--;
			} else {
				slide.n = slide.l - opt.view_per_page;
			}
			slide.doSlide(opt, slide.n);
		});
		nav.find('a.page').each(function() {
			$(this).click(function() {
				if ($(this).attr('rel')) {
					slide.n = $(this).attr('rel') - 1;
				}
				slide.doSlide(opt, slide.n);
			});
		});
		
		return $(this);
	};
	
	$.fn.doSlide = function(opt, num) {
		return $(this).animate({marginLeft:num * (opt.width * -1)}, opt.speed, opt.easing);
	}
	
})(jQuery);