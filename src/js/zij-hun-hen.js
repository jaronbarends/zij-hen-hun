;(function($) {

	'use strict';

	//define semi-globals (variables that are "global" in this file's anounymous function's scope)
	//prefix them with sg so we can distinguish them from normal function-scope vars
	var timer,
		sgDefaultDiscloseDelay = 1000,//delay for disclosing next item
		sgDefaultExplanationDelay = 700,//delay for showing explanation after disclosing item
		sgMoreDelay = 1000;//delay for showing more-links

	// sgDefaultDiscloseDelay = 1;
	// sgDefaultExplanationDelay = 1;
	// sgMoreDelay = 1;



	/**
	* show lesson content
	* @returns {undefined}
	*/
	var startLesson = function(evt) {
		evt.preventDefault();
		var $tgt = $(evt.currentTarget),
			href = $tgt.attr('href'),
			$destination = $(href),
			$container;

		if ($destination.length) {
			$destination.show(0);

			if (href !== '#hun-hebben') {
				$container = $destination.find('.o-content-width');
				setTimeout(function() {
					discloseHandler($container);
				}, sgDefaultDiscloseDelay);
			}
		}
	};
	

	/**
	* make more-links reveal content
	* @returns {undefined}
	*/
	var initMoreLinks = function() {
		$('.more').on('click', startLesson);
	};
	

	/**
	* show the first more-link that is still hidden
	* @returns {undefined}
	*/
	var showNextMoreLink = function() {
		// show the first .u-is-transparent - that's the one in the last lesson that's visible
		$('nav .u-is-transparent').first().removeClass('u-is-transparent');
	};


	/**
	* explain an item, and set timer for next item or lesson
	* @returns {undefined}
	*/
	var explainItem = function($item) {

		// show current item's explanation
		$item.addClass('explained');

		// determine what to do next: show next item, or link to next rule
		var $items = $item.siblings('.item').not('.disclosed'),
			callback,
			delay;

		//each possibility has its own callback function; determine which one sto call
		if ($items.length > 0) {
			callback = function() {
				showNextItem($items);
			};
			delay = parseInt($item.attr('data-disclose-next-delay'), 10) || sgDefaultDiscloseDelay;
		} else {
			callback = showNextMoreLink;
			delay = sgMoreDelay;
		}

		timer = setTimeout(callback, delay);
	};
	

	
	/**
	* show one item
	* @returns {undefined}
	*/
	var showNextItem = function($items) {
		$items = $items.not('.disclosed');
		
		var $item = $items.eq(0),//first undisclosed item
			callback,
			delay;

		$item.addClass('disclosed');

		// check if this item's explanation has to be shown automatically
		var autoExplain = $item.attr('data-auto-explain') === 'true',
			explanationDelay = parseInt($item.attr('data-explanation-delay'), 10) || sgDefaultExplanationDelay;// set to 0 if NaN
			// discloseNextDelay = parseInt($item.attr('data-disclose-next-delay'), 10) || sgDefaultDiscloseDelay;

		if (autoExplain) {
			// call timer
			timer = setTimeout(function() {
				explainItem($item);
			}, explanationDelay);
		}

	};
	


	/**
	* show items for one rule
	* @returns {undefined}
	*/
	var showItems = function($container) {
		var $items = $container.find('.item');
		showNextItem($items);
	};


	/**
	* disclose items in container
	* @returns {undefined}
	*/
	var discloseHandler = function($container) {
		showItems($container);
	};
	
	


	/**
	* initialize disclosing links
	* @returns {undefined}
	*/
	var initDiscloseLinks = function() {
		$('.toggle--example').on('click', function(e) {
			e.preventDefault();

			var $tgt = $(e.currentTarget),
				$container = $tgt.closest('.o-content-width');

			if ($tgt.attr('id') !== 'toggle--hun-hebben') {
				$tgt.addClass('u-is-transparent');
			} else {
				$tgt.find('.persistent').unwrap();
			}
			showItems($container);

		});
	};




	/**
	* 
	* @returns {undefined}
	*/
	var showNextExplanation = function(e) {
		e.preventDefault();
		var $tgt = $(e.currentTarget),
			$item = $tgt.closest('.item');

		 explainItem($item);
	};
	

	/**
	* initialize links for explaining an item
	* @returns {undefined}
	*/
	var initExplanationLinks = function() {
		$('.toggle--explanation').on('click', showNextExplanation);
	};



	/**
	* copy and initialize verbose hun definition
	* @returns {undefined}
	*/
	var initHunDefinition = function() {
		var definition = $('#definition--hun').html(),
			html = '(<a class="unclip" href="#">&hellip;</a><span class="clipped u-hidden">'+definition+'</span>)';
		$('.definition--hun').html(html);
		$('.unclip').on('click', function(e) {
			e.preventDefault();
			var $tgt = $(e.currentTarget),
				$clippedElm = $tgt.siblings('.clipped');

			$tgt.addClass('u-hidden');
			$clippedElm.removeClass('u-hidden');
		});
	};
	
	


	/**
	* init links for debugging
	* @returns {undefined}
	*/
	var initDebug = function() {
		$('.debug-disclose-container').show();
		$('#toggle--disclosed').on('click', function(e) {
			e.preventDefault();
			// $('body').toggleClass('disclosed');
			$('.lesson').show();
			$('.item').addClass('disclosed');
		});
		$('#toggle--explained').on('click', function(e) {
			e.preventDefault();
			// $('body').toggleClass('explained');
			$('.lesson').show();
			$('.item').addClass('disclosed explained');
			$('.toggle--example').addClass('u-is-transparent');
		});
	};
	
	
	
	/**
	* hide address bar on mobile
	* @returns {undefined}
	*/
	var hideAddressbar = function() {
		window.addEventListener("load",function() {
			// Set a timeout...
			setTimeout(function(){
				// Hide the address bar!
				window.scrollTo(0, 1);
			}, 0);
		});
	};


	/**
	* hide toggle behaviour for footer
	* @returns {undefined}
	*/
	var initFooter = function() {
		$('.toggle--footer').on('click', function() {
			$('#main-footer').addClass('disclosed');
		});
	};
	


	/**
	* start the app
	* @returns {undefined}
	*/
	var startApp = function() {
		$('#loading').addClass('done');
	};
	


	/**
	* initialize stuff for external image loading
	* @returns {undefined}
	*/
	var initLoading = function() {
		$(window).on('load', startApp);
	};
	
	


	/**
	* initialize all
	* @param {string} varname Description
	* @returns {undefined}
	*/
	var init = function() {
		initLoading();
		initMoreLinks();
		initDiscloseLinks();
		initExplanationLinks();
		initHunDefinition();
		hideAddressbar();
		initFooter();
		//initDebug();
	};


	$(document).ready(init);

	window.addEventListener("load",function() {
		// Set a timeout...
		setTimeout(function(){
			// Hide the address bar!
			window.scrollTo(0, 1);
		}, 0);
	});

})(jQuery);
