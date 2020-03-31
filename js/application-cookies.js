jQuery(document).on('ready',function(){

	var app_id = jQuery('meta[property="app-id"]').attr('content');
	var ga_id = jQuery('meta[property="google-analytics-id"]').attr('content');
	var cookie_consent_name = app_id + '-cookies';

	//Miramos si la cookie de aceptación está creada
	if(jQuery.cookie(cookie_consent_name) == 'acepta'){
		//Ocultamos info cookies
		jQuery('.block-cookies').hide();
		//Inicializamos GoogleAnalytics
		initGoogleAnalytics(ga_id);
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
		jQuery.cookie(cookie_consent_name, 'acepta', { expires: 365 * 10 ,path: '/' });
		jQuery('.block-cookies').fadeOut(300);
		//Inicializamos GoogleAnalytics
		initGoogleAnalytics(ga_id);
	});

});


function initGoogleAnalytics(ga_id) {

	var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = "https://www.googletagmanager.com/gtag/js?id=" + ga_id;
		s.setAttribute('async','');
		jQuery("head").append(s);

	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', ga_id);
}
