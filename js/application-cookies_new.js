jQuery(document).on('ready',function(){
	window.__cmp('getGooglePersonalization', function(consent, isSuccess) {
		if(!isSuccess)
	 		return;

		if(consent.googlePersonalizationData.consentValue) {
		  //
		  // You have consent from the user:
		  // add your code here to call google’s admanager or adsense
		  //
		  	var ga_id = jQuery('meta[property="google-analytics-id"]').attr('content');
			var s = document.createElement("script");
				s.type = "text/javascript";
				s.src = "https://www.googletagmanager.com/gtag/js?id=" + ga_id;
				s.setAttribute('async','');
				jQuery("head").append(s);
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', ga_id);
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
