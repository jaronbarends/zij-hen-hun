;(function($) {

	'use strict';

	//define semi-globals (variables that are "global" in this file's anounymous function's scope)
	//prefix them with sg so we can distinguish them from normal function-scope vars
	//var sgSomeVar = '';


	/**
	* 
	* @returns {undefined}
	*/
	var initDiscloseLink = function() {
		$('#toggle--hinted').on('click', function(e) {
			e.preventDefault();
			$('body').toggleClass('hinted');
		});
		$('#toggle--disclosed').on('click', function(e) {
			e.preventDefault();
			$('body').toggleClass('disclosed');
		});
	};
	


	/**
	* initialize all
	* @param {string} varname Description
	* @returns {undefined}
	*/
	var init = function() {
		initDiscloseLink();
	};


	$(document).ready(init);

})(jQuery);
