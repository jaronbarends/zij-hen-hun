;(function($) {

	'use strict';

	// define semi-global variables (vars that are "global" in this file's scope) and prefix them
	// with sg so we can easily distinguish them from "normal" vars
	
	var init = function(){
		$('a[href*="#"]:not([href="#"])').click(function(event) {
			if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
				//Filter target element
				var $target = $(this.hash);
				$target = $target.length ? $target : $('[name=' + this.hash.slice(1) +']');

				if ($target.length) {
					//Prevent page load
					event.preventDefault();
					
					//Calculate distance between target offset and current scroll offset, for animation timing (distance *  0.6 = time in ms).
					var scrollDuration = (Math.abs(($(window).scrollTop()) - $target.offset().top) * 0.6);
					scrollDuration = Math.min(scrollDuration, 500);

					//Stop running animations to prevent stacking, start a new scrolling animation.
					$('html,body').stop().animate(
						{scrollTop: $target.offset().top}, 
						scrollDuration
					);

					//Prevent page load (Firefox)
					return false;
				}
			}
		});

		//Cancel animation after manual scrolling/interaction
		$('html,body').on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
			$('html,body').stop();
  		});

	};

	$(document).ready(init);

})(jQuery);