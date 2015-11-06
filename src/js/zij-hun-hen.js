;(function($) {

	'use strict';

	//define semi-globals (variables that are "global" in this file's anounymous function's scope)
	//prefix them with sg so we can distinguish them from normal function-scope vars
	var sgDiscloseTimer,
		sgDiscloseDelay = 3000,//delay for disclosing next item
		sgEplainTimer,
		sgExplainDelay = 1000;//delay for showing explanation after disclosing item


	/**
	* show one item
	* @returns {undefined}
	*/
	var showNextItem = function($items, idx) {
		$items = $items.not('.disclosed');
		var $item = $items.eq(0);

		$item.addClass('disclosed');
		sgEplainTimer = setTimeout(function() {
			$item.addClass('explained');
		}, sgExplainDelay);

		$items = $items.not('.disclosed');

		if ($items.length > 0) {
			sgDiscloseTimer = setTimeout(function() {
				showNextItem($items);
			}, sgDiscloseDelay);
		} else {
			var $nav = $item.closest('.o-content-width').addClass('explained')
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
	* 
	* @returns {undefined}
	*/
	var initDiscloseLinks = function() {
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
		$('.toggle--example').on('click', function(e) {
			e.preventDefault();
			var $container = $(e.currentTarget).closest('.o-content-width');
			showItems($container);

		});
	};
	
	
	


	/**
	* initialize all
	* @param {string} varname Description
	* @returns {undefined}
	*/
	var init = function() {
		initDiscloseLinks();
	};


	$(document).ready(init);

})(jQuery);


/*
zij (persoonlijk voornaamwoord)
1
derde persoon vrouwelijk enkelvoud: zij is rijk
2
derde persoon meervoud voor alle geslachten: zij zijn rijk
- See more at: http://www.vandale.nl/opzoeken?pattern=zij&lang=nn#.Vhffxfntmko



hen (persoonlijk voornaamwoord; 4e nvl mv bij zij) zie 1hun

2hen (de; v; meervoud: hennen; verkleinwoord: hennetje)
1
vrouwelijk hoen
- See more at: http://www.vandale.nl/opzoeken?pattern=hen&lang=nn#.Vhflsfntmko



hun (persoonlijk voornaamwoord; in geschreven taal 3e, in spreektaal 3e en 4e nvl van de 3e pers mv)
1
ik heb het hun gegeven

2hun (bezittelijk voornaamwoord)
1
van 1hen: dat is hun huis
- See more at: http://www.vandale.nl/opzoeken?pattern=hun&lang=nn#.VhfmR_ntmko
*/