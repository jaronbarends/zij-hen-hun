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
	* initialize smooth scrolling
	* @returns {undefined}
	*/
	var initSmoothLinks = function() {
		$('.more').on('click', function(e) {
		console.log('klik');
			e.preventDefault();
			var $link = $(e.currentTarget),
				href = $link.attr('href'),
				$dest = $(href),
				destTop = $dest.scrollTop();

			$('body').scrollTop(destTop);
		});
	};
	
	


	/**
	* initialize all
	* @param {string} varname Description
	* @returns {undefined}
	*/
	var init = function() {
		initDiscloseLink();
		// initSmoothLinks();
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