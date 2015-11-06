;(function($) {

	'use strict';

	//define semi-globals (variables that are "global" in this file's anounymous function's scope)
	//prefix them with sg so we can distinguish them from normal function-scope vars
	var timer,
		sgDiscloseDelay = 1000,//delay for disclosing next item
		sgExplainDelay = 1000,//delay for showing explanation after disclosing item
		sgMoreDelay = 1000;//delay for showing more-links



	/**
	* show the first more-link that is still hidden
	* @returns {undefined}
	*/
	var showNextMoreLink = function() {
		$('.more.u-is-transparent').first().removeClass('u-is-transparent');
	};

	
	/**
	* show one item
	* @returns {undefined}
	*/
	var showNextItem = function($items, idx) {
		$items = $items.not('.disclosed');
		
		var $item = $items.eq(0),
			callback,
			delay;

		$item.addClass('disclosed');
		timer = setTimeout(function() {
			$item.addClass('explained');

			$items = $items.not('.disclosed');

			//determine which callback function to call
			if ($items.length > 0) {
				callback = function() {
					showNextItem($items);
				}
				delay = sgDiscloseDelay;
			} else {
				callback = showNextMoreLink;
				delay = sgMoreDelay;
			}
			timer = setTimeout(callback, delay);

		}, sgExplainDelay);

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
	* initialize disclosing links
	* @returns {undefined}
	*/
	var initDiscloseLinks = function() {
		$('.toggle--example').on('click', function(e) {
			e.preventDefault();

			var $tgt = $(e.currentTarget),
				$container = $tgt.closest('.o-content-width');

			$tgt.addClass('u-is-transparent');
			showItems($container);

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
			$('body').toggleClass('disclosed');
			$('.lesson').show();
		});
		$('#toggle--explained').on('click', function(e) {
			e.preventDefault();
			$('body').toggleClass('explained');
			$('.lesson').show();
		});
	};
	
	
	


	/**
	* initialize all
	* @param {string} varname Description
	* @returns {undefined}
	*/
	var init = function() {
		initDiscloseLinks();
		//initDebug();
	};


	$(document).ready(init);

})(jQuery);
