jQuery(document).on('ready',function(){

	var appid = jQuery('meta[property="app-id"]').attr('content'),
		cookie_consent_name = appid + '-cookies';

	if(jQuery.cookie(cookie_consent_name) == 'acepta'){
		jQuery('.block-cookies').hide();
		initAnalytics();
	}else{
		jQuery('.block-cookies').show();
	}

	jQuery(document).on('click','.close_c',function(event){
		event.preventDefault();
		jQuery('.block-cookies').fadeOut(300);
	});

	jQuery(document).on('click','.btn-accept',function(e){
		e.preventDefault();
		jQuery.cookie(cookie_consent_name, 'acepta', { expires: 365 * 10 ,path: '/' });
		jQuery('.block-cookies').fadeOut(300);
		initAnalytics();
	});
});

function initAnalytics() {

	var	ga_id = jQuery('meta[property="google-analytics-id"]').attr('content');
	var fb_id = jQuery('meta[property="facebook-pixel-id"]').attr('content');

	//GTM
	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-5F9T9CL');

	// Facebook Pixel
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
