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


	//Si estamos en la página de detalle de recurso, inicializamos el player de las actividades
	if (jQuery('.single_box_recursos').is(":visible") ) {
		load_player();
	}

	//Página single de recurso de video
	if (jQuery('.single_box_recursos').is(":visible") ) {
		jQuery('.single_box_recursos').css({'min-height':h_win});
	}

	//Página single de recurso de video
	if (jQuery('.vid_youtube').is(":visible") ) {
		jQuery(".vid_youtube").fitVids();
	}

	//Página single de recurso interactivo o pdf
	if (jQuery('.single_box_recursos iframe.iframe_dynamic').is(":visible") ) {
		//calc_iframe_height();
		if (jQuery('.pdf_recurso').is(":visible") ) {
			calc_iframe_height('pdf');
		}else{
			calc_iframe_height('interactivo');
		}
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
					sourcePath:jQuery("#awp-wrapper").data('source-path') || "",
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
					useDownload:false,
					facebookAppId:"",
					useNumbersInPlaylist: true,
					numberTitleSeparator: ".  ",
					artistTitleSeparator: " - ",
					playlistItemContent:"title",
					wavesurfer:{
						waveColor: '#50E3C2',
						progressColor: '#55BFC0',
						barWidth: 1,
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

	jQuery(window).scroll(control_scroll);

	//Reseteamos los checkbox si son visibles
	if (jQuery('.over_filtros').is(":visible") ) {
		jQuery('.over_filtros input[type=checkbox]').attr('checked',false);
		jQuery('.over_filtros label').removeClass('active');
	}

	//Over de las filtros en desktop
	jQuery(document).on("mouseenter",".filter_nivel a,.filter_tipo a,.filter_producto a,.filter_mob a", function(e) {
		e.preventDefault();
		if(device!='yes'){
			jQuery(this).addClass('over');
		}
	}).on("mouseleave",".filter_nivel a,.filter_tipo a,.filter_producto a,.filter_mob a", function(e) {
		e.preventDefault();
		if(device!='yes'){
			jQuery(this).removeClass('over');
		}
	});

	//Over de las flechas galeria
	jQuery(document).on("mouseenter",".carrusel-destacados .slick-prev,.carrusel-destacados .slick-next", function(e) {
		e.preventDefault();
		if(device!='yes'){
			jQuery(this).addClass('over');
		}
	}).on("mouseleave",".carrusel-destacados .slick-prev,.carrusel-destacados .slick-next", function(e) {
		e.preventDefault();
		if(device!='yes'){
			jQuery(this).removeClass('over');
		}
	});

	//Over menú
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

	//Tooltip de registro
	jQuery(document).on("mouseenter","[data-toggle-tooltip]", function(e) {
		e.preventDefault();
		jQuery(this).find('.tooltip').stop().fadeIn(100);
	}).on("mouseleave","[data-toggle-tooltip]", function(e) {
		e.preventDefault();
		jQuery(this).find('.tooltip').stop().fadeOut(100);
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

	//Forzamos la recarga de la página con los hash de las tags
	jQuery(document).on('click','.light_box_recursos .row_tags a',function(event){
		event.preventDefault();
	    window.location.href = jQuery(this).attr('href');
	    location.reload();
	});

	//Cuando pulsamos sobre un recurso
	jQuery(document).on('click','a.box_recurso[data-type]',function(event){
		event.preventDefault();
		load_recurso( jQuery(this).data('modal') || jQuery(this).attr('href'), jQuery(this).data('version'));
	});


	//Cerrar Lighbox Recurso
	jQuery(document).on('click','.close_pop',function(event){
		event.preventDefault();
		jQuery('.light_box_recursos').fadeOut(600,function(){
			jQuery('body').css({overflow:'auto'});
			jQuery('.resource-content').html('');
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
	/*jQuery(document).on('touchend',".box_recurso", function(e) {
		e.preventDefault();
		load_recurso( jQuery(this).data('modal') || jQuery(this).attr('href') );
	});*/



	//Evento para capturar el resize de la ventana
	jQuery( window ).resize(function() {
		h_win=jQuery(window).height();

		//Página single de recurso
		if (jQuery('.single_box_recursos').is(":visible") ) {
			jQuery('.single_box_recursos').css({'min-height':h_win});
		}

		//Recurso lightbox
		if (jQuery('.container_pop iframe.iframe_dynamic').is(":visible") ) {
			//calc_iframe_height();
			if (jQuery('.pdf_recurso').is(":visible") ) {
				calc_iframe_height('pdf');
			}else{
				calc_iframe_height('interactivo');
			}
		}

	});


	jQuery('.course-student-school-stage select').on('change', function(){
		var f = jQuery(this).closest('form');
		console.log(this)
		jQuery.ajax({
			type : f.attr('method'),
			url : f.attr('action'),
			data : f.serialize(),
			success: function (data) {
				// console.log(data)
			}
		});
	});

});


/*************************
FUNCIONES JAVASCRIPT
**************************/

function load_recurso(url, version){
	var Parameters = 'v='+(version ? version : 1);
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
					sourcePath:jQuery("#awp-wrapper").data('source-path') || "",
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
					useDownload:false,
					facebookAppId:"",
					useNumbersInPlaylist: true,
					numberTitleSeparator: ".  ",
					artistTitleSeparator: " - ",
					playlistItemContent:"title",
					wavesurfer:{
						waveColor: '#50E3C2',
						progressColor: '#55BFC0',
						barWidth: 1,
						cursorColor: '#ffffff',
						cursorWidth: 1,
						height: 100,
					}
				};
				awp_player = jQuery("#awp-wrapper").awp(settings);
				jQuery('.light_box_recursos').animate({opacity:1},300,function(){
					jQuery(this).css({overflowY:'auto'});
					jQuery('body').css({overflow:'hidden'});
					load_player();
				});
			break;
			case 'video':
				jQuery('.light_box_recursos').css({display:'block',opacity:0});
				jQuery(".vid_youtube").fitVids();
				jQuery('.light_box_recursos').animate({opacity:1},300,function(){
					jQuery(this).css({overflowY:'auto'});
					jQuery('body').css({overflow:'hidden'});
					load_player();
				});
			break;
			case 'interactivo':
				jQuery('.light_box_recursos').css({display:'block',opacity:0});
				calc_iframe_height('interactivo');
				jQuery('.light_box_recursos').animate({opacity:1},300,function(){
					jQuery(this).css({overflowY:'auto'});
					jQuery('body').css({overflow:'hidden'});
					load_player();
				});
			break;
			case 'pdf':
				jQuery('.light_box_recursos').css({display:'block',opacity:0});
				calc_iframe_height('pdf');
				jQuery('.light_box_recursos').animate({opacity:1},300,function(){
					jQuery(this).css({overflowY:'auto'});
					jQuery('body').css({overflow:'hidden'});
					load_player();
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
				jQuery('.light_box_recursos').animate({opacity:1},300,function(){
					jQuery(this).css({overflowY:'auto'});
					jQuery('body').css({overflow:'hidden'});
					load_player();
				});
			break;
		}

		}
	});

}

//Funcion para calcular el aspect_ratio iframe
function calc_iframe_height(tipo){
  //Obtenemos anchura del navegador
  var w_win=jQuery(window).width();
  jQuery('.container_pop iframe.iframe_dynamic').removeAttr('style');
	//console.log(jQuery('.container_pop iframe').width());

	  if(w_win<769){
		var w_iframe=jQuery('.container_pop iframe.iframe_dynamic').width();
		//console.log(w_win);
		if(tipo=='pdf' && w_win==768){
			var h_iframe= Math.round(w_iframe*(1.0772));
		}else{
			var h_iframe= Math.round(w_iframe*(1.3465));
		}
		jQuery('.container_pop iframe.iframe_dynamic').height(h_iframe);
		  /*if(){
			var w_iframe=jQuery('.container_pop iframe').width();
			var h_iframe= Math.round(w_iframe*(1.6617));
			jQuery('.container_pop iframe').height(h_iframe);
			 }*/
	  }else{
		var w_iframe=jQuery('.container_pop iframe.iframe_dynamic').width();
		var h_iframe= Math.round(w_iframe*(0.6083));
		//var h_iframe= Math.round(w_iframe*(0.6083));
		//if(tipo=='pdf'){
		//	h_iframe= Math.round(w_iframe*(0.4866));
		//}else{
			h_iframe= Math.round(w_iframe*(0.6083));
		//}
		jQuery('.container_pop iframe.iframe_dynamic').height(h_iframe);
	  }


}


//Función para cargar el player de audio
function load_player(){
	//Cargamos el player y el listado de audios

        var audioLinks = jQuery('.list_audios a').filter(function(index){
        	return ("mp3" == jQuery(this).attr('href').toLowerCase().split('.').pop());
        });

        if( audioLinks.length == 0 ) {
        	return;
        }

        audioLinks.addClass('link-audio')

        var audioTag = jQuery('.box_player audio').get(0);

        var audio = audiojs.newInstance(audioTag, {
          trackEnded: function() {
          }
        });

        // Load in the first track
        first = audioLinks.first();
        first.addClass('playing');
        audio.load(first.attr('href'));


        // Load in a track on click
        audioLinks.click(function(e) {
        	var me = jQuery(this);
          e.preventDefault();
			if(!jQuery('.box_player').hasClass('active')){
				jQuery('.box_player').css({visibility:'visible'}).animate({opacity:1},600,function(){
					jQuery('.box_player').addClass('active');
				});
			}
            audioLinks.removeClass('playing');
            me.addClass('playing');
            audio.load(me.attr('href'));
            audio.play();
        });
}

//Función para capturar eventos scroll
function control_scroll(e){
  //Variable de scroll
  var scrollAmount = jQuery(window).scrollTop();
  var h_foot=jQuery('#footer').height();

  //Obtenemos altura y anchura del navegador
  h_win=jQuery(window).height();
  w_win=jQuery(window).width();
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

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}