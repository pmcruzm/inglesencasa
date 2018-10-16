var ACEPTA_COOKIES_NAME  = 'cambridge-inglesencasa-acepta-cookies';

jQuery(document).on('ready',function(){

	//Miramos si la cookie de aceptación está creada
	if(jQuery.cookie(ACEPTA_COOKIES_NAME) == 'acepta'){
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
	});


});


function initGoogleAnalytics() {

	var GA_ID = jQuery('meta[property="google-analytics-id"]').attr('content');

	if(GA_ID && GA_ID != '') {
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', GA_ID);
	}
}
