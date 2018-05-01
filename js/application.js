/**********************
FUNCIONES JQUERY
Autor:Pedro de la Cruz
Fecha: 13-4-2018
Cliente: Inglés en Casa
***********************/


/**********************
VARIABLES
**********************/
var awp_player;
var ACEPTA_COOKIES_NAME  = 'cambridge-inglesencasa-acepta-cookies';


//Eventos para dispositivos móviles
var ua = navigator.userAgent,
event = (ua.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) ? "touchstart" : "click";
var device='none';
if(ua.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)){
	device='yes';
	//Event change orientation device
	window.addEventListener('orientationchange', doOnOrientationChange);
}

jQuery.noConflict();

jQuery(window).on('load',function(){

});

jQuery(document).on('ready',function(){

	//Obtenemos altura y anchura del navegador
	h_win=jQuery(window).height();
	w_win=jQuery(window).width();

	//Página single de recurso de video
	if (jQuery('.single_box_recursos').is(":visible") ) {
		jQuery('.single_box_recursos').css({'min-height':h_win});
	}

	//Página single de recurso de video
	if (jQuery('.vid_youtube').is(":visible") ) {
		jQuery(".vid_youtube").fitVids();
	}

	//Página single de recurso interactivo o pdf
	if (jQuery('.single_box_recursos iframe').is(":visible") ) {
		calc_iframe_height();
	}

	//Página single de recurso de imágenes
	if (jQuery('.galeria_modal').is(":visible") ) {
		jQuery('.bxslider_galeria').bxSlider({
									  pager: true,
									  infiniteLoop: true,
									  useCSS: false,
									  adaptiveHeight: false,
									  controls:true,
									  onSlideBefore: function(slideElement, oldIndex, newIndex){
									  },
									  onSlideAfter: function(slideElement, oldIndex, newIndex){
									  },
									  onSlideNext: function(slideElement, oldIndex, newIndex){
									  },
									  onSlidePrev: function(slideElement, oldIndex, newIndex){
									  },
									});
	}

	//Página single de recurso de audio
	if (jQuery('.player-audio').is(":visible") ) {

				var settings = {
					instanceName:"default2",
					sourcePath:"",
					playlistList:"#awp-playlist-list",
					activePlaylist:"playlist-audio1",
					activeItem:0,
					volume:0.5,
					autoPlay:true,
					drawWaveWithoutLoad:false,
					randomPlay:false,
					loopingOn:true,
					autoAdvanceToNextMedia:true,
					mediaEndAction:"loop",
					soundCloudAppId:"",
					gDriveAppId:"",
					useKeyboardNavigationForPlayback:true,
					usePlaylistScroll:true,
					playlistScrollOrientation:"vertical",
					playlistScrollTheme:"light",
					useDownload:true,
					facebookAppId:"",
					useNumbersInPlaylist: true,
					numberTitleSeparator: ".  ",
					artistTitleSeparator: " - ",
					playlistItemContent:"title",
					wavesurfer:{
						waveColor: '#00d0c6',
						progressColor: '#c0c07e',
						barWidth: 3,
						cursorColor: '#ffffff',
						cursorWidth: 1,
						height: 100,
					}
				};



                awp_player = jQuery("#awp-wrapper").awp(settings);
		}

	//Volver el scroll a top
	/*jQuery('body').scrollTo( "0px", 0,function(){
		//Pillar anclas de la url si las hay
		var hash = window.location.hash.substring(1);
		if(hash!=""){
			//alert(hash);
			if(hash.indexOf('segment') > -1){
				if (jQuery('#all-catalogo').is(":visible") ) {
					//Mirar si estamos en catalogo y es un filtro
					var array_hash=hash.split("-");
					filter_segmento=array_hash[1];
					//Filtramos
					filter_catalogo(filter_segmento,filter_type1,filter_type2);
					//Marcamos opcion en el filtro de primer nivel
					jQuery('.filter_cat a[data-filter-segment='+filter_segmento+']').addClass('active');
					jQuery('.tipo_cat a').removeClass('active');
					hash_active=1;
					//Activamos Lazyload para las imágenes
					//jQuery("img.lazy").lazyload({skip_invisible : false});
				}
			}else{
				jQuery('body').stop().clearQueue().scrollTo(jQuery('#'+hash),800,{axis:'y',easing:'easeInOutExpo'});
			}
		}
	});*/

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
		jQuery('.block-cookies').fadeOut(600);
	});

	//Aceptar cookies en el cuadro
	jQuery(document).on('click','.btn-accept',function(e){
		e.preventDefault();
		jQuery.cookie(ACEPTA_COOKIES_NAME, 'acepta', { expires: 365 * 10 ,path: '/' });
		jQuery('.block-cookies').fadeOut(600);
		//Inicializamos GoogleAnalytics
		initGoogleAnalytics();
	});

	jQuery(window).scroll(control_scroll);

	//Reseteamos los checkbox si son visibles
	if (jQuery('.over_filtros').is(":visible") ) {
		jQuery('.over_filtros input[type=checkbox]').attr('checked',false);
		jQuery('.over_filtros label').removeClass('active');
	}

	//Over de las fichas en desktop
	jQuery(document).on("mouseenter",".menu_header a", function(e) {
		e.preventDefault();
		if(device!='yes'){
			jQuery(this).addClass('over');
		}
	}).on("mouseleave",".menu_header a", function(e) {
		e.preventDefault();
		if(device!='yes'){
			jQuery(this).removeClass('over');
		}
	});


	//Galería de recursos
	if (jQuery('.carrusel_recursos').is(":visible") ) {
		jQuery('.carrusel-destacados').slick({
		  dots: false,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 4,
		  slidesToScroll: 4,
		  responsive: [
			{
			  breakpoint: 1023,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 3
			  }
			},
			{
			  breakpoint: 767,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
		  ]
		});

	}

	//Cuando pulsamos sobre un recurso
	jQuery(document).on('click','a.box_recurso',function(event){
		event.preventDefault();
		load_recurso( jQuery(this).data('modal') || jQuery(this).attr('href') );
	});


	//Cerrar Lighbox Recurso
	jQuery(document).on('click','.close_pop',function(event){
		event.preventDefault();
		jQuery('.light_box_recursos').fadeOut(600,function(){
			jQuery('body').css({overflow:'auto'});
		});
	});

	//Over de las fichas en desktop
	jQuery(document).on("mouseenter",".box_recurso", function(e) {
		e.preventDefault();
		if(device!='yes'){
			jQuery(this).addClass('over');
		}
	}).on("mouseleave",".box_recurso", function(e) {
		e.preventDefault();
		if(device!='yes'){
			jQuery(this).removeClass('over');
		}
	});

	//Over de las fichas mobile
	jQuery(document).on('touchend',".box_recurso", function(e) {
		e.preventDefault();
		/*if(jQuery(this).hasClass('over')){
			//Miramos si hay enlace de app si no abrimos enlace
			if(jQuery(this).find('a.btn-playstore').length==0 && jQuery(this).find('a.btn-applestore').length==0 ){
				var url_recurso = jQuery(this).attr('href');
				var id_recurso  = jQuery(this).attr('data-id');
				openResource(url_recurso, id_recurso);
			 }
			 jQuery(this).removeClass('over');
		}else{
			jQuery(this).addClass('over');
		}*/
	});


	//Evento para capturar el resize de la ventana
	jQuery( window ).resize(function() {
		h_win=jQuery(window).height();

		//Página single de recurso
		if (jQuery('.single_box_recursos').is(":visible") ) {
			jQuery('.single_box_recursos').css({'min-height':h_win});
		}

		//Recurso lightbox
		if (jQuery('.container_pop iframe').is(":visible") ) {
			calc_iframe_height();
		}

	});

});


/*************************
FUNCIONES JAVASCRIPT
**************************/

function load_recurso(url){

	var Parameters = 'q='+Math.random();
	jQuery.ajax({
		url: url,
		type: 'GET',
		dataType: 'html',
		data: Parameters,
		success: function(data){
	 		jQuery('.resource-content').html(data);
	 		var tipo = jQuery('.resource-content .content_recurso').data('type');
			//Mostramos el lightbox
			switch(tipo){
			case 'audio':
				jQuery('.light_box_recursos').css({display:'block',opacity:0});
				var settings = {
					instanceName:"default2",
					sourcePath:"",
					playlistList:"#awp-playlist-list",
					activePlaylist:"playlist-audio1",
					activeItem:0,
					volume:0.5,
					autoPlay:true,
					drawWaveWithoutLoad:false,
					randomPlay:false,
					loopingOn:true,
					autoAdvanceToNextMedia:true,
					mediaEndAction:"loop",
					soundCloudAppId:"",
					gDriveAppId:"",
					useKeyboardNavigationForPlayback:true,
					usePlaylistScroll:true,
					playlistScrollOrientation:"vertical",
					playlistScrollTheme:"light",
					useDownload:true,
					facebookAppId:"",
					useNumbersInPlaylist: true,
					numberTitleSeparator: ".  ",
					artistTitleSeparator: " - ",
					playlistItemContent:"title",
					wavesurfer:{
						waveColor: '#00d0c6',
						progressColor: '#c0c07e',
						barWidth: 3,
						cursorColor: '#ffffff',
						cursorWidth: 1,
						height: 100,
					}
				};
                awp_player = jQuery("#awp-wrapper").awp(settings);
				jQuery('.light_box_recursos').animate({opacity:1},600,function(){
					jQuery(this).css({overflowY:'auto'});
					jQuery('body').css({overflow:'hidden'});
				});
			break;
			case 'video':
				jQuery('.light_box_recursos').css({display:'block',opacity:0});
				jQuery(".vid_youtube").fitVids();
				jQuery('.light_box_recursos').animate({opacity:1},600,function(){
					jQuery(this).css({overflowY:'auto'});
					jQuery('body').css({overflow:'hidden'});
				});
			break;
			case 'interactivo':
				jQuery('.light_box_recursos').css({display:'block',opacity:0});
				calc_iframe_height();
				jQuery('.light_box_recursos').animate({opacity:1},600,function(){
					jQuery(this).css({overflowY:'auto'});
					jQuery('body').css({overflow:'hidden'});
				});
			break;
			case 'pdf':
				jQuery('.light_box_recursos').css({display:'block',opacity:0});
				calc_iframe_height();
				jQuery('.light_box_recursos').animate({opacity:1},600,function(){
					jQuery(this).css({overflowY:'auto'});
					jQuery('body').css({overflow:'hidden'});
				});
			break;
			case 'imagen':
				jQuery('.light_box_recursos').css({display:'block',opacity:0});
				jQuery('.bxslider_galeria').bxSlider({
									  pager: true,
									  infiniteLoop: true,
									  useCSS: false,
									  adaptiveHeight: false,
									  controls:true,
									  onSlideBefore: function(slideElement, oldIndex, newIndex){
									  },
									  onSlideAfter: function(slideElement, oldIndex, newIndex){
									  },
									  onSlideNext: function(slideElement, oldIndex, newIndex){
									  },
									  onSlidePrev: function(slideElement, oldIndex, newIndex){
									  },
									});
				jQuery('.light_box_recursos').animate({opacity:1},600,function(){
					jQuery(this).css({overflowY:'auto'});
					jQuery('body').css({overflow:'hidden'});
				});
			break;
		}

		}
	});

}

//Funcion para calcular el aspect_ratio iframe
function calc_iframe_height(){
  //Obtenemosanchura del navegador
  var w_win=jQuery(window).width();
  jQuery('.container_pop iframe').removeAttr('style');
	console.log(jQuery('.container_pop iframe').width());
  if(w_win<1024){
	  if(w_win<768){
		var w_iframe=jQuery('.container_pop iframe').width();
		var h_iframe= Math.round(w_iframe*(1.3465));
		jQuery('.container_pop iframe').height(h_iframe);
	  }else{
		var w_iframe=jQuery('.container_pop iframe').width();
		var h_iframe= Math.round(w_iframe*(1.6617));
		jQuery('.container_pop iframe').height(h_iframe);
	  }
  }else{
	var w_iframe=jQuery('.container_pop iframe').width();
	var h_iframe= Math.round(w_iframe*(0.6083));
	jQuery('.container_pop iframe').height(h_iframe);
  }

}


//Función para capturar eventos scroll
function control_scroll(e){
  //Variable de scroll
  var scrollAmount = jQuery(window).scrollTop();
  var h_foot=jQuery('#footer').height();

  //Obtenemos altura y anchura del navegador
  h_win=jQuery(window).height();
  w_win=jQuery(window).width();

  //Añadir Cookie si se hace scroll a +100px
  if(scrollAmount>100){
 		if(jQuery.cookie(ACEPTA_COOKIES_NAME) != 'acepta'){
			jQuery.cookie(ACEPTA_COOKIES_NAME, 'acepta', { expires: 365 * 10 ,path: '/' });
			jQuery('.block-cookies').fadeOut(600);
			//Inicializamos GoogleAnalytics
			initGoogleAnalytics();
		}
  }

}


//Función para eliminar hash
function removeHash () {
	var scrollV, scrollH, loc = window.location;
	if ("pushState" in history)
		history.pushState("", document.title, loc.pathname + loc.search);
	else {
		// Prevent scrolling by storing the page's current scroll offset
		scrollV = document.body.scrollTop;
		scrollH = document.body.scrollLeft;

		loc.hash = "";

		// Restore the scroll offset, should be flicker free
		document.body.scrollTop = scrollV;
		document.body.scrollLeft = scrollH;
	}
}


//Función para el cambio de orientación
function doOnOrientationChange()
  {
	switch(window.orientation)
	{
	  case -90:
	  case 90:


		break;
	  default:



		break;
	}
  }


function initGoogleAnalytics() {

	var GA_ID = jQuery('meta[property="google-analytics-id"]').attr('content');

	if(GA_ID && GA_ID != '') {
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', GA_ID);
	}
}
