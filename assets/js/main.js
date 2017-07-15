
$(function(){

	// RESPONSIVE +
		if (typeof $.responsive == "function") {
			$.responsive({
						width: [340, 400, 640, 980, 1280],
						prefix: "width",
						viewport: "width=device-width",
					afterResize: function(opt) {
					}
				});
			};
	// RESPONSIVE -

	// global scroll var +
		var wScroll = $(this).scrollTop();

		$(window).scroll(function(){
			wScroll = $(this).scrollTop();
		});
	// global scroll var -

});


$(document).ready(function() {


	// SMOOTH SCROLL +
		// docs https://greensock.com/docs/#/HTML5/GSAP/Plugins/ScrollToPlugin/
		// Init here: smoothScroll Init

		function smoothScroll() {

			var $window = $(window);

			var scrollTime = .4;
			var scrollDistance = 300;

			$(window).on("mousewheel DOMMouseScroll touchstart", function(event){

				var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
				var scrollTop = $window.scrollTop();
				var finalScroll = scrollTop - parseInt(delta*scrollDistance);

				TweenMax.to($window, scrollTime, {
					scrollTo : { y: finalScroll, autoKill:false },
						ease: Power1.easeOut,
						autoKill: false,
						overwrite: 5
					});
			});
		}
	// SMOOTH SCROLL -


	// IE and EDGE DETECTION +
		var version = detectIE();

		function ieDetectionSmoothScroll () {
			if (version === false && $(window).width() >= 980) {

				// SAFARI DETECTION +
					var ua = navigator.userAgent.toLowerCase();
					if (ua.indexOf("safari") != -1) {
					  if (ua.indexOf("chrome") > -1) {

							$("body").addClass("chrome");

							// smoothScroll Init
								smoothScroll();

					  } else {
					    $("body").addClass("safari");
					  }
					}
				// SAFARI DETECTION -

			} else if (version === false && $(window).width() <= 980) {
			} else if (version >= 12) {
				$("body").addClass("edge");
			} else {
				$("body").addClass("ie");
			}
		}
		ieDetectionSmoothScroll();

		$(window).resize(function(){
			ieDetectionSmoothScroll();
		});

		/**
		* detect IE
		* returns version of IE or false, if browser is not Internet Explorer
		*/
		function detectIE() {
			var ua = window.navigator.userAgent;

			var msie = ua.indexOf("MSIE ");
			if (msie > 0) {
				// IE 10 or older => return version number
				return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
			}

			var trident = ua.indexOf("Trident/");
			if (trident > 0) {
				// IE 11 => return version number
				var rv = ua.indexOf("rv:");
				return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
			}

			var edge = ua.indexOf("Edge/");
			if (edge > 0) {
				// Edge (IE 12+) => return version number
				return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
			}

			// other browser
			return false;
		}
	// IE and EDGE DETECTION +


	// GLOBAL VARS +
		// global scroll var +
		var wScroll = $(this).scrollTop();
		// global scroll var -
	// GLOBAL VARS +


	// HEADINGS +

		var headings = $("h1").add(".h1");

		headings.each(function (index) {

			var chars = $(this).text().length;

			if (chars >= 15)
				$(this).addClass("long");

		});

	// HEADINGS -


	// EASE IN +

		var easeItems = $(".ease-item");

		function easeIn() {

			var wScroll = $(this).scrollTop();

			function easing(delayedEasing) {
				easeItems.each(function(){

					var delay = $(this).data("ease-delay");

					if (wScroll > (($(this).offset().top) - $(window).height() + 20)) {

						if (delayedEasing)
							$(this).addClass("is-visible").css("transition-delay", delay);
						else
							$(this).addClass("is-visible").css("transition-delay", 200);
					}
					else {
						$(this).removeClass("is-visible");
					}

				});
			}
			easing(true);

			$(document).scroll(function(){
				wScroll = $(this).scrollTop();
				easing(false);
			});
		} // easeIn -

		easeIn();

		$(window).resize(function(){
			easeIn();
		});
	// EASE IN -


	// SCROLL DOWN ARROW +

		var scrollDownArrow = $(".scroll-down-arrow-cont");

		scrollDownArrow.click(function(){
			var scrollLength = $(this).offset().top + 100;
			$("html, body").animate({ scrollTop: scrollLength }, 800);
		});

	// SCROLL DOWN ARROW -


	// INACTIVE TAB TITLE +
		var message = "Dont forget to tip :)";
		var original;

		$(window).focus(function() {
			if (original) {
				document.title = original;
			}
		}).blur(function() {
			var title = $("title").text();
			if (title != message) {
				original = title;
			}
			document.title = message;
		});
// INACTIVE TAB TITLE -

});
