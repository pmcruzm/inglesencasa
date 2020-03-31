var ACEPTA_COOKIES_NAME  = 'cambridge-inglesencasa-acepta-cookies';

jQuery(document).on('ready',function(){

	//Miramos si la cookie de aceptación está creada
	/*if(jQuery.cookie(ACEPTA_COOKIES_NAME) == 'acepta'){
		//Ocultamos info cookies
		jQuery('.block-cookies').hide();
		//Inicializamos GoogleAnalytics
		initGoogleAnalytics();
	}else{
		jQuery('.block-cookies').show();
	}

	//Cerrar cuadro info cookies
	jQuery(document).on('click','.close_c',function(event){
		event.preventDefault();
		jQuery('.block-cookies').fadeOut(300);
	});

	//Aceptar cookies en el cuadro
	jQuery(document).on('click','.btn-accept',function(e){
		e.preventDefault();
		jQuery.cookie(ACEPTA_COOKIES_NAME, 'acepta', { expires: 365 * 10 ,path: '/' });
		jQuery('.block-cookies').fadeOut(300);
		//Inicializamos GoogleAnalytics
		initGoogleAnalytics();
	});*/

	//Miramos si la cookie de aceptación está creada
	__cmp('getGooglePersonalization', function(consent, isSuccess) {

	// do we have a cookie?
	if(!isSuccess)
	 return;

	// check for given consent
	if(consent.googlePersonalizationData.consentValue) {
	  //
	  // You have consent from the user:
	  // add your code here to call google’s admanager or adsense
	  //
	  initGoogleAnalytics();
	} else {
	  //
	  // No consent for personalized ads from the user:
	  // either no call to google’s admanger / adsense or
	  // call admanager and adsense using the appropriate
	  // method to set ‘requestNonPersonalizedAds’ accordingly.
	  //
	}
	});


});


function initGoogleAnalytics() {

	var GA_ID = jQuery('meta[property="google-analytics-id"]').attr('content');

	if(GA_ID && GA_ID != '') {
		var s = document.createElement("script");
			s.type = "text/javascript";
			s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
			s.setAttribute('async','');
			jQuery("head").append(s);

		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', GA_ID);
	}
}
