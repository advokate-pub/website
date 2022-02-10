var isDevice = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ),
	bp_menu = 1300, s;



function get_header_height(){
	/*if( $(".s-header-wrapper .container-lg").outerHeight() > 0 )
		return  $(".s-header-wrapper .container-lg").outerHeight();
	else
		return  $(".logo-wrapper").outerHeight();*/

	if( $(window).width() < bp_menu )
		return 60;
	else
		return 120;
}

function can_skrollr(){

	var orientation = window.outerWidth / window.outerHeight;

	//var min_height = $box_20a_intro.height();;

	/*var bool_can_skrollr = ( !isDevice &&
		   	$(window).width() >= 768 &&
		   	$(window).height() >= min_height &&
		   	orientation > 1);*/

	var bool_can_skrollr = !isDevice &&
		   	$(window).width() >= 991;

	bool_can_skrollr ?
		$("html").removeClass("can-not-skrollr").addClass("can-skrollr") :
		$("html").removeClass("can-skrollr").addClass("can-not-skrollr");

	return bool_can_skrollr;
}

function init_common(){
	// init nav
	$(".s-header .btn-menu").click(function(e){
		$(this).toggleClass("active");
		$(this).hasClass("active") ?  $("html").addClass("_open_menu") : $("html").removeClass("_open_menu");
		$("html").removeClass("_open_search _open_filter");
	});

	$(".s-header .has-sub > a").click(function(e){
		$(this).next().collapse("toggle");
		return false;
	});


	//.b-collapse
	$(".collapse").on('show.bs.collapse hide.bs.collapse', function (e) {
		e.type=="show"? $(this).parent().addClass("expand"): $(this).parent().removeClass("expand");
	});

	$(".b-collapse-toggle").click(function(e){
		$(this).next().collapse("toggle");
	});

	// form-select
	/*$('select').not(".s-purchase select").selectric({
		disableOnMobile: false,
		nativeOnMobile: true
	});*/

}

function init_submmenu(){
	if( $("#nav_submenu").length <= 0)
		return;

	var offset = get_header_height() + ($(window).width() < bp_menu ? + 80 : 120);	// 80 & 121: section padding-top

	$(window).on("activate.bs.scrollspy", function(){
		var index = $($("#nav_submenu").find(".active")).parent().index();
		$('#select-submenu').prop('selectedIndex', index).selectric('refresh');

	}).scrollspy({ target: '#nav_submenu', offset: offset });	//, offset: 0

	$('.selectric-select-submenu').on('selectric-change', function(event, element, selectric) {
		$($("#nav_submenu > li").eq( selectric.state.selectedIdx ).find("a")).trigger("click");
	});

	$('#select-submenu').on('change', function(e) {
		$("#nav_submenu a[href='#"+this.value+"']").trigger("click");
	});
}

function init_scroll(){

	var $header = $(".s-header"), $footer = $(".s-footer"),

		$s_submenu = $(".s-submenu"),
		$s_submenu_wrapper = $(".s-submenu .nav-submenu-wrapper"),

		$box_fix = $(".box-fix"), $b_sticky = $(".b-sticky .box-ctx"),
		pos_header_shrink = 200,  // window.innerHeight,
		pos_show_fix_btn = window.innerHeight / 4;

	$(window).scroll(function () {
		var scrollTop = window.scrollY;

		// header shrink
		scrollTop > pos_header_shrink ? $header.addClass("_shrink") : $header.removeClass("_shrink");

		// s-submenu
		if ($s_submenu.length > 0)
			if (scrollTop > $s_submenu.offset().top - get_header_height() + parseInt( $s_submenu.css("padding-top")) ) {
				$s_submenu.height($s_submenu_wrapper.outerHeight());
				$s_submenu_wrapper.addClass("is-sticky");
			} else {
				$s_submenu.removeAttr("style");
				$s_submenu_wrapper.removeClass("is-sticky")
			}

		// show / hide sticky buttons


		if( scrollTop > pos_show_fix_btn){
			$box_fix.addClass("_show");
			$b_sticky.addClass("_show");
		} else {
			$box_fix.removeClass("_show");
			$b_sticky.removeClass("_show")
		}

		$("#txt-temp1").val( scrollTop );
		$("#txt-temp2").val( scrollTop + window.innerHeight );
		$("#txt-temp3").val( $(".s-footer").offset().top );

		//document.body.offsetHeight - 100
		if( scrollTop + window.innerHeight > $(".s-footer").offset().top )
			$(".box-fix").addClass("_bottom");
		else
			$(".box-fix").removeClass("_bottom");

		// b-sticky
		if( $b_sticky.length > 0){
			if ( scrollTop + window.innerHeight - $b_sticky.outerHeight() < $b_sticky.parent().offset().top ) {
				$b_sticky.parent().height($b_sticky.outerHeight());
				$b_sticky.addClass("is-sticky");
				$(".box-fix").addClass("is-up");
			} else {
				$b_sticky.removeClass("is-sticky")
				$b_sticky.parent().removeAttr("style");
				$(".box-fix").removeClass("is-up");
			}
		}

	}).trigger("scroll");
}

function init_slider(){
	var mobile_view = 1.2;


	var b_swiper_upcoming = new Swiper ('.b-slider-upcoming', {
		loop: true,
		//allowTouchMove: false,
		effect: 'fade', fadeEffect: { crossFade: true },
		navigation: {
			nextEl: '.btn-next',
			prevEl: '.btn-prev',
		},
	});

	var b_swiper_game_mode = new Swiper ('.b-slider-game-mode', {
		loop: true,
		autoHeight: true,
		allowTouchMove: false,
		effect: 'fade', fadeEffect: { crossFade: true },
		navigation: {
			nextEl: '.btn-next',
			prevEl: '.btn-prev',
		},

		pagination: {
			el: '.b-pagination',
			clickable: true
		},
	});

	var b_swiper_purchase = new Swiper ('.b-slider-purchase', {
		loop: true,
		effect: 'fade', fadeEffect: { crossFade: true },
		navigation: {
			nextEl: '.btn-next',
			prevEl: '.btn-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
	});

	var b_swiper_nft = new Swiper(".b-slider-nft", {
		effect: "coverflow",
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: "auto",
		//initialSlide: 2,
		loop: true,
		coverflowEffect: {
			rotate: 30,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows: true,
		},
		navigation: {
			nextEl: '.btn-next',
			prevEl: '.btn-prev',
		},

	});
}

function init_scrollto(){

	var $root = $('html, body');

	$('a[href^="#"]').not('[href="#"]').not(".no-scroll").click(function(e){
		e.preventDefault();

		var currPos = $(window).scrollTop(),
			target = $(this).attr("href"),
			targetPos;

		if( target == "#top" ){
			targetPos = 0;
		} else {

			targetPos = $(target).offset().top;

			if( $(".nav-submenu-wrapper").length > 0)
				targetPos -= $(".nav-submenu-wrapper").outerHeight()
			targetPos -= get_header_height();
		}

		$root.animate({ scrollTop: targetPos }, 800 );
		return false;
	});
}

function win_resize(){
	if(s != null ){
		if( can_skrollr() ){
			if( !$("html").hasClass("skrollr"))
				s = skrollr.init({ forceHeight: false });
				//s.skrollr.init({ forceHeight: false })
		} else {
			s.destroy();
		}
	}

}

document.addEventListener("DOMContentLoaded", function(event) {

	$("html").addClass("_doc_ready");
	isDevice ? $("html").addClass("_mobile"): $("html").addClass("_desktop");

	var sticky = new Sticky('.sticky');

	new WOW().init({ offset: 200 });

	init_common();

	//init_submmenu();

	init_scroll();

	//init_scrollto();

	init_slider();

	$(".b-video").click(function(e){
		$(this).toggleClass("is-playing");
		$video = $(this).find("video");
		if( $(this).hasClass("is-playing") )
			$video[0].play();
		else
			$video[0].pause();
	});


	$(".b-select-hexa").not(".b-select-null").click(function(e){

		$(this).addClass("active").siblings().removeClass("active");

		if( $(this).parents(".box-select-hexa").length > 0){
			$(".box-selected-hexa .img-selected"+ ($(this).index()+1)).addClass("active").siblings().removeClass("active");
			$(".txt-selected-hexa .txt"+ ($(this).index()+1)).addClass("active").siblings().removeClass("active");
		}
		else{
			$(".box-selected-hero .img-selected"+ ($(this).index()+1)).addClass("active").siblings().removeClass("active");
			$(".txt-selected-hero .txt"+ ($(this).index()+1)).addClass("active").siblings().removeClass("active");
		}


	});

	s = skrollr.init({ forceHeight: false });

	if( !can_skrollr() )
		s.destroy();

	$(window).resize(win_resize);

	$(".faq-box .b-bar").click(function(){
		$(this).toggleClass("open");
		$(this).find(".faq-ans").slideToggle("fast")
	});
	setTimeout(function(){
		$(".faq-box .b-bar").eq(0).addClass("open");
		$(".faq-box .b-bar").eq(0).find(".faq-ans").slideToggle("fast")
	},500);

	if(getCookie("hideWhiteList")===undefined){
		$(".b-popup-whitelist").fadeIn();
		$(".b-popup-whitelist .btn-close, .b-popup-whitelist .txt-continue").click(function(e){
			$(".b-popup-whitelist").fadeOut();
			setCookie('hideWhiteList', '1', 999999)
		});
	}
	
	if( $(".b-ppl").length > 0){
		$(".b-ppl").click(function(e){
			$(this).toggleClass("active");
		});
		
		$(".b-ppl .ico-close").click(function(e){
			$(this).removeClass("active");
		});
	}
});



window.onload = function() {
	$("html").addClass("_win_load");
	
	if( $(".b-ppl").length > 0){
		$(".b-ppl .box-txt").mCustomScrollbar();
	}
};

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}
var popupBox;
// click connect wallet whit button tips message
function popupConnectWallet() {
	popupBox = lity("#myModalTips");
}
