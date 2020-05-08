jQuery(document).on('ready',function(){

	var appid = jQuery('meta[property="app-id"]').attr('content'),
		ga_id = jQuery('meta[property="google-analytics-id"]').attr('content'),
		fb_id = jQuery('meta[property="facebook-pixel-id"]').attr('content'),
		cookie_consent_name = appid + '-cookies';

	//Miramos si la cookie de aceptación está creada
	if(jQuery.cookie(cookie_consent_name) == 'acepta'){
		//Ocultamos info cookies
		jQuery('.block-cookies').hide();
		//Inicializamos GoogleAnalytics
		initGoogleAnalytics(ga_id);
		initFacebookPixel(fb_id);
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
		initFacebookPixel(fb_id);
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


	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-5F9T9CL');

	return;

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', ga_id, 'auto');
	ga('send', 'pageview');
}

function initFacebookPixel(fb_id) {
	!function(f,b,e,v,n,t,s)
	{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
	n.callMethod.apply(n,arguments):n.queue.push(arguments)};
	if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
	n.queue=[];t=b.createElement(e);t.async=!0;
	t.src=v;s=b.getElementsByTagName(e)[0];
	s.parentNode.insertBefore(t,s)}(window,document,'script',
	'https://connect.facebook.net/en_US/fbevents.js');
	fbq('init', fb_id);
	fbq('track', 'PageView');
}
