/**********************
FUNCIONES JQUERY
Autor:Pedro de la Cruz
Fecha: 13-4-2018
Cliente: Inglés en Casa
***********************/


/**********************
VARIABLES
**********************/
var resources, filterValues;
var n_load=1;
var n_elems=12;
var touch_control=0;
var ACEPTA_COOKIES_NAME  = 'cambridge-para-ti-acepta-cookies';
var RECURSOS_COOKIE_NAME = 'cambridge-para-ti-recursos';


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
	
	jQuery('#scroll-pane').scrollpanel({
		prefix: 'sp-'
	});

	n_elems = jQuery('.contenedor-recursos').data('num-elems') ?
			  jQuery('.contenedor-recursos').data('num-elems') :
			  12;

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
	if (jQuery('.body-filtros').is(":visible") ) {
		jQuery('.body-filtros input[type=checkbox]').attr('checked',false);
		jQuery('.body-filtros label').removeClass('active');
	}


	if (jQuery('.bxslider').is(":visible") ) {
	//Galería cabecera home
	var slider=jQuery('.bxslider').bxSlider({
						  pager: true,
						  infiniteLoop: true,
						  useCSS: false,
						  auto: true,
					  	  autoHover: true,
						  controls: false,
						  pause: 4000,
						  speed:2000,
						  easing:'easeInOutCubic',
						  adaptiveHeight:true,
						  onSlideBefore: function(slideElement, oldIndex, newIndex){
						  },
						  onSlideAfter: function(slideElement, oldIndex, newIndex){
						  },
						  onSlideNext: function(slideElement, oldIndex, newIndex){
						  },
						  onSlidePrev: function(slideElement, oldIndex, newIndex){
						  },
						});

	//Galería opiniones home
	var slider_opinion=jQuery('.bxslider_opiniones').bxSlider({
						  pager: true,
						  infiniteLoop: true,
						  useCSS: false,
						  auto: true,
					  	  autoHover: true,
						  controls: false,
						  pause: 5000,
						  speed:800,
						  adaptiveHeight:true,
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

	//Cuando quieres ver video del slider home
	jQuery(document).on('click','.enl_video',function(e){
		e.preventDefault();

	});

	//Desplegable Languages
	jQuery(document).on('click',".enl_language", function(e) {
		e.preventDefault();
		if(!jQuery(this).parent().hasClass('active')){
			jQuery(this).parent().addClass('active');
		}else{
			jQuery(this).parent().removeClass('active');
		}
	});

	//Menú mobile eventos táctiles
	jQuery(document).on('touchend',".enl_language", function(e) {
		e.preventDefault();
		if(!jQuery(this).parent().hasClass('active')){
			jQuery(this).parent().addClass('active');
		}else{
			jQuery(this).parent().removeClass('active');
		}
	});

	//Desplegable de recursos
	jQuery(document).on('click',".act_filtros", function(e) {
		e.preventDefault();
		if(!jQuery(this).hasClass('active')){
			var txt_btn=jQuery(this).attr('data-close');
			jQuery(this).addClass('active');
			jQuery(this).html(txt_btn);
			jQuery('.body-filtros').slideToggle(600);
		}else{
			var txt_btn=jQuery(this).attr('data-open');
			jQuery(this).removeClass('active');
			jQuery(this).html(txt_btn);
			jQuery('.body-filtros').slideToggle(600,function(){
				if(w_win<768){
					jQuery('.body_f_mobile').stop().clearQueue().slideUp(0).removeClass('active');
					jQuery('.header_f_mobile a').removeClass('active');
				}
			});
		}
	});

	//Desplegable de recursos
	jQuery(document).on('click',".header_f_mobile a", function(e) {
		e.preventDefault();
		if(!jQuery(this).hasClass('active')){
			jQuery('.header_f_mobile a').removeClass('active');
			jQuery(this).addClass('active');
			/*var opc_despl=jQuery(this);*/
			if(jQuery('.body_f_mobile.active').length>0){
				jQuery('.body_f_mobile.active').stop().clearQueue().slideUp(400,function(){
					jQuery(this).removeClass('active');
					jQuery('.header_f_mobile a.active').parents('.filter').find('.body_f_mobile').stop().clearQueue().slideDown(400,function(){
						jQuery(this).addClass('active');
					});
				});
			}else{
				jQuery('.header_f_mobile a.active').parents('.filter').find('.body_f_mobile').stop().clearQueue().slideDown(400,function(){
					jQuery(this).addClass('active');
				});
			}
		}else{
			jQuery('.header_f_mobile a').removeClass('active');
			jQuery(this).removeClass('active');
			//jQuery(this).parents('.filter').find('.body_f_mobile').slideToggle(600);
			/*var opc_despl=jQuery(this);*/
			if(jQuery('.body_f_mobile.active').length>0){
				jQuery('.body_f_mobile.active').stop().clearQueue().slideUp(400,function(){
					jQuery(this).removeClass('active');
					jQuery('.header_f_mobile a.active').parents('.filter').find('.body_f_mobile').stop().clearQueue().slideDown(400,function(){
						jQuery(this).addClass('active');
					});
				});
			}else{
				jQuery('.header_f_mobile a.active').parents('.filter').find('.body_f_mobile').stop().clearQueue().slideDown(400,function(){
					jQuery(this).addClass('active');
				});
			}
		}
	});


	//Mostrar Video a pantalla completa
	jQuery(document).on('click',".enl_video", function(e) {
		e.preventDefault();
		var url_video=jQuery(this).attr('href');
		jQuery('<div class="fullview"><span class="btn-close-player">Close</span><iframe src="'+url_video+'?autoplay=1&amp;rel=0&amp;fs=0&amp;showinfo=0" frameborder="0"></iframe></div>').appendTo('body');
	});

	//Eliminamos el player
	jQuery(document).on('click',".btn-close-player", function(e) {
		e.preventDefault();
		jQuery('.fullview').remove();
	});

	//Galería de recursos
	if (jQuery('.carrusel_recursos').is(":visible") ) {
		jQuery('.carrusel-destacados').slick({
		  dots: false,
		  infinite: false,
		  speed: 300,
		  slidesToShow: 1,
		  centerMode: false,
		  variableWidth: true,
		  arrows:false,
		  slidesToScroll: 2
		});

	}
	
	if ( jQuery(".vid_youtube").is(":visible") ) {
		jQuery(".vid_youtube").fitVids();
	}
	

	/*if (jQuery('.box-body-recursos').is(":visible") ) {
		//Funciones para el cambio de bloques

		resources = jQuery('.box_recurso');
		if ( resources.length == 0  ) {
			jQuery('.more-box-recursos h4').show();
			jQuery('.more-box-recursos .all_recursos').hide();
		}else{
			if(resources.length<=n_elems){
				jQuery('.more-box-recursos .all_recursos').hide();
			}
			n_load=1;
			calc_pagination();
		}

	}*/

	//Checkbox recursos
	jQuery(document).on('change','.body-filtros input[type=checkbox]',function(event){
		event.preventDefault();
			//alert(jQuery(this).attr('class'));
			if(jQuery(this).parent().hasClass('active')){
				jQuery(this).parent().removeClass('active');
			}else{
				jQuery(this).parent().addClass('active');
			}

			filterChange();
	});

	//Limpiar filtros
	jQuery(document).on('click','.clear_all_filters',function(event){
		event.preventDefault();
			//alert(jQuery(this).attr('class'));
			jQuery('.body-filtros input[type=checkbox]').attr('checked',false);
			jQuery('.body-filtros label').removeClass('active');
			//Falta mostrar todos los bloques
			jQuery('.contenedor-recursos .item').removeClass('hide');
			n_load=1;
			calc_pagination();

	});

	//Más recursos en la páginación
	jQuery(document).on('click','.more-box-recursos .all_recursos',function(event){
		event.preventDefault();
			n_load++;
			calc_pagination();
	});

	//Más recursos en la páginación
	jQuery(document).on('click','.opc_recursos a',function(event){
		event.preventDefault();
			jQuery('.opc_recursos a').removeClass('active');
			var clase_enl=jQuery(this).attr('class');
			switch(clase_enl){
				case 'recursos_r':
					jQuery('.carrusel-recientes').show();
					jQuery('.carrusel-app').hide();
					jQuery('.carrusel-visitados').hide();
				break;
				case 'recursos_a':
					jQuery('.carrusel-recientes').hide();
					jQuery('.carrusel-app').show();
					jQuery('.carrusel-visitados').hide();
				break;
				case 'recursos_v':
					jQuery('.carrusel-recientes').hide();
					jQuery('.carrusel-app').hide();
					jQuery('.carrusel-visitados').show();
				break;
			}
			jQuery(this).addClass('active');
	});

	//Cuando pulsamos sobre un recurso
	jQuery(document).on('click','a.box_recurso',function(event){
		event.preventDefault();
		if(device!='yes'){
			/*var url_recurso = jQuery(this).attr('href');
			var id_recurso  = jQuery(this).attr('data-id');
			openResource(url_recurso, id_recurso);*/
		}
	});
	
	//Cerrar Lighbox Recurso
	jQuery(document).on('click','.close_pop',function(event){
		event.preventDefault();
		jQuery('.light_box_recursos').fadeOut(600);
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


	//Eliminar marco de error cuando se hace click sobre un input con error
	jQuery(document).on('focus','form input,form textarea,form select',function(event){
		event.preventDefault();
		if(jQuery(this).attr('type')!='submit'){
			if(jQuery(this).attr('data-validation-rule')=='select-option'){
				if(jQuery(this).parent().hasClass('error')){
					jQuery(this).parent().removeClass('error');
				}
			}else{
				//alert('no-select');
				if(jQuery(this).hasClass('error')){
					jQuery(this).removeClass('error');
				}
			}
		}
	});

	//Detectar cambios en checkbox
	jQuery(document).on('change','form input[type=checkbox]',function(event){
		event.preventDefault();
			if(jQuery(this).hasClass('error')){
				jQuery(this).parents('.form-group').find('input[type=checkbox]').removeClass('error');
			}
	});

	//Validación de formularios de contacto
	jQuery('form[data-validate="true"]').on('submit', function(event){
		if( ! validateForm.validate(event) ) {
			event.preventDefault();
		}
	});

	//Evento para capturar el resize de la ventana
	jQuery( window ).resize(function() {

	});

});


/*************************
FUNCIONES JAVASCRIPT
**************************/

function load_recurso(id,tipo,url){
	
} 

	function filterChange() {

			filterValues = {};

			//Get cambridgequalifications filter:
			filterValues.cambridgequalifications = [];

			jQuery('input[name="cambridgequalifications[]"]:checked').each(function(){
				filterValues.cambridgequalifications.push( jQuery(this).val() )
			});

			//Get mcer filter:
			filterValues.mcer = [];

			jQuery('input[name="mcer[]"]:checked').each(function(){
				filterValues.mcer.push( jQuery(this).val() )
			});

			//Get abilities filter:
			filterValues.abilities = [];

			jQuery('input[name="abilities[]"]:checked').each(function(){
				filterValues.abilities.push( jQuery(this).val() )
			});

			//Get other filters:
			filterValues.is_new = jQuery('input[name="is_new"]').is(':checked')
			filterValues.is_app = jQuery('input[name="is_app"]').is(':checked')
			filterValues.is_beta = jQuery('input[name="is_beta"]').is(':checked')

			var count = 0;

			resources.each(function(){
				var item = jQuery(this);

				var hide = shouldHide(item);

				if( ! hide) count++;

				item.parent().toggleClass('hide', hide );
			});

			if(count==0){
				//No hay elementos
				jQuery('.more-box-recursos h4').show();
				jQuery('.more-box-recursos .all_recursos').hide();
			}else{
				//Miramos si hay que paginar
				n_load=1;
				calc_pagination();
			}

			//jQuery('span.count').text(count);

		}

		function shouldHide(item) {

			var itemData = item.data();

			if( itemData.alwaysVisible ) {
				return false;
			}

			if ( filterValues.is_new && ! itemData.isNew) { return true; }
			if ( filterValues.is_app && ! itemData.isApp) { return true; }
			if ( filterValues.is_beta && ! itemData.isBeta) { return true; }


			if( filterValues.cambridgequalifications.length && ! findOne(filterValues.cambridgequalifications, itemData.cambridgequalifications)) {
				return true;
			}

			if( filterValues.mcer.length && ! findOne(filterValues.mcer, itemData.mcer)) {
				return true;
			}

			if( filterValues.abilities.length && ! findOne(filterValues.abilities, itemData.abilities) ) {
				return true;
			}

			return false;
		}

		function findOne(haystack, arr) {
			//alert(filterValues.cambridgequalifications.toString()+'--'+arr.toString());
			return arr.some(function (v) {
				return haystack.indexOf(v) >= 0;
			});
		}

function calc_pagination(){
	elems_show = jQuery('.item').not(".hide");
	var all_elems=elems_show.length;
	var count=0;
	elems_show.each(function(){
			if(count>=(n_load*n_elems)){
				jQuery(this).addClass('hide-page');
				//Mostramos botón de más
				jQuery('.more-box-recursos .all_recursos').show();
			}else{
				jQuery(this).removeClass('hide-page');
				count++;
			}
	});
	//ELiminamos si alguna de las páginas
	if(count==all_elems){jQuery('.more-box-recursos .all_recursos').hide();}
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

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// Checks a string, a valid date format of DD/MM/YYYY
function isValidDate(s) {
    var dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;

    if ( ! dateFormat.test(s) ) {
        return false;
    }

    // remove any leading zeros from date values
    s = s.replace(/0*(\d*)/gi,"$1");
    var dateArray = s.split(/[\.|\/|-]/);

  	// correct month value
    dateArray[1] = dateArray[1]-1;

    var testDate = new Date(dateArray[2], dateArray[1], dateArray[0]);

    if (testDate.getDate()!=dateArray[0] || testDate.getMonth()!=dateArray[1] || testDate.getFullYear()!=dateArray[2]) {
        return false;
    }

    return true;
}

function getAge(birthDate) {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function recaptchaCallback(response) {
	jQuery('div[data-validation-rule="recaptcha"]').data('is-verified', true);
}

var validateForm = {

	form: null,
	fields: [],
	errors: [],
	hasErrors: false,

	validate: function( event ) {

		this.form      = jQuery(event.target);
		this.errors    = [];
		this.hasErrors = false;
		jQuery('.error', this.form).removeClass('error');
		jQuery('.errores', this.form).html('');

		this.fields = jQuery('*[data-validation-rule]:visible:not([readonly])', this.form);
		this.fields.each( jQuery.proxy( this.checkField , this ) );

		if( this.hasErrors ) {
			this.errors.unshift( this.form.data('error-msg') );
			this.showErrors();
			return false;
		}

		return true;
	},

	checkField: function(i,e) {

		var elem   = jQuery(e);
		var params = elem.data('validation-rule').split('|');
		var rule   = params.shift();
		var error  = false;

		//console.log('RULE:',rule);

		if( 'email' == rule ) {error = ! this.ruleIsEmail(elem);}
		if( 'repeat' == rule ) {error = ! this.ruleRepeat(elem, params[0]);}
		if( 'checkbox' == rule ) {error = ! this.ruleCheckbox(elem);}
		if( 'recaptcha' == rule ) {error = ! this.ruleValidRecaptcha(elem);}
		if( 'not-empty' == rule ) {error = ! this.ruleValidNotEmpty(elem);}
		if( 'zip' == rule ) {error = ! this.ruleValidZip(elem);}
		if( 'select-option' == rule ) {error = ! this.ruleValidSelectOption(elem);}
		if( 'multi-checkbox' == rule ) {error = ! this.ruleMultiCheckbox(elem);}
		if( 'min' == rule ) {error = ! this.ruleMinimumChars(elem, parseInt(params[0]));}
		if( 'screenshot' == rule ) {error = ! this.ruleValidScreenshot(elem, params);}
		if( 'birth-date' == rule ) {error = ! this.ruleValidBirthDate(elem, params);}


		if( error ) {
			if(rule == 'select-option') {
				elem.parent().addClass('error');
			} else if (rule == 'multi-checkbox') {
				elem.find('input[type="checkbox"]').addClass('error');
			} else {
				elem.addClass('error');
			}

			this.hasErrors = true;

			if( elem.data('error-msg') ) {
				this.errors.push( elem.data('error-msg') );
			}
		}
	},

	showErrors: function() {

		var errorList = jQuery.map(
			this.errors,
			function( value, index ){
				return jQuery('<p>').text(value);
			}
		);

		jQuery('.errores', this.form).html('').append( errorList );
	},

	ruleIsEmail: function(e) {
		return validateEmail(e.val());
	},

	ruleRepeat: function(e, repeatSelector) {
		return e.val() === jQuery(repeatSelector, this.form).val();
	},

	ruleCheckbox: function(e) {
		return e.is(":checked");
	},

	ruleValidRecaptcha: function(e) {
		return e.data('is-verified');
	},

	ruleValidNotEmpty: function(e) {
		return e.val() != '';
	},

	ruleValidZip: function(e) {
		return e.val().length == 5;
	},

	ruleValidSelectOption: function(e) {
		return e.prop('selectedIndex') != 0;
	},

	ruleMultiCheckbox: function(e) {
		return e.find('input[type="checkbox"]:checked').length > 0;
	},

	ruleMinimumChars: function(e, minChars) {
		return e.val().length >= minChars;
	},

	ruleValidScreenshot: function(e, params) {
		if( e.val() == '' ) {
			return true;
		}

		var fileExtension = e.val().split('.').pop().toLowerCase();

		return (jQuery.inArray(fileExtension, ['jpg','jpeg','png','gif']) !== -1 );
	},

	ruleValidBirthDate: function(e, params) {

		if( ! isValidDate( e.val() ) ) {
			return false;
		}

		var dateParts = e.val().split("/");

		var birthDate = new Date(dateParts[2], dateParts[1]-1, dateParts[0])

		var age = getAge(birthDate);

		if( age < 14 ) {
			return false;
		}

		return true;
	},

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

function openResource(url_recurso, id_recurso) {

	var windowReference = window.open();

	//Si el GA está cargado, registramos el click en la url externa
	if( typeof gtag === 'function' ) {
		gtag('event', 'click', {
			'event_category': 'outbound',
			'event_label': url_recurso,
			'transport_type': 'beacon',
			'event_callback': function(){ windowReference.location = url_recurso; }
		});
	} else {
		windowReference.location = url_recurso;
	}


	//Si no está definido el id (el click viene de la home), terminamos aqui
	if( typeof id_recurso === 'undefined') {
		return;
	}

	var recursos = (typeof jQuery.cookie(RECURSOS_COOKIE_NAME) !== 'undefined')
					? jQuery.cookie(RECURSOS_COOKIE_NAME).split(',')
					: [];

	//Si ya existe el id en el array lo eliminamos
	if( recursos.indexOf(id_recurso) != -1 ) {
		var index = recursos.indexOf(id_recurso);
		recursos.splice(index, 1);
	}

	//Añadimos el id al principio del array
	recursos.unshift(id_recurso);

	if( recursos.length > 15 ) { recursos.pop(); }

	jQuery.cookie(RECURSOS_COOKIE_NAME, recursos.toString(), {expires: 365 * 10, path: '/'});
}
