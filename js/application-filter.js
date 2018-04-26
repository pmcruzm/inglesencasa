/**********************
FUNCIONES JQUERY
Autor:Pedro de la Cruz
Fecha: 25-4-2018
Cliente: Inglés en Casa
***********************/


/**********************
VARIABLES
**********************/
var resources, filterValues;
var n_load=1;
var n_elems=24;
var touch_control=0;

jQuery.noConflict();

jQuery(window).on('load',function(){

});

jQuery(document).on('ready',function(){
	//console.log('filter');
	
	n_elems = jQuery('.contenedor-recursos').data('num-elems') ?
			  jQuery('.contenedor-recursos').data('num-elems') :
			  24;
	
	//Comprobación de los recursos a mostrar
	if (jQuery('.contenedor-recursos').is(":visible") ) {
		//Funciones para el cambio de bloques

		resources = jQuery('.contenedor-recursos .box_recurso');
		//console.log(resources.length)
		if ( resources.length == 0  ) {
			jQuery('.box_more_r h4').show();
			jQuery('.box_more_r .more_recursos').hide();
		}else{
			if(resources.length<=n_elems){
				jQuery('.box_more_r .more_recursos').hide();
			}
			n_load=1;
			calc_pagination();
		}

	}
	
	//Más recursos en la páginación
	jQuery(document).on('click','.box_more_r .more_recursos',function(event){
		event.preventDefault();
			n_load++;
			calc_pagination();
	});
	
	//Abrir Bloque de Filtros
	jQuery(document).on('click','.filter_nivel a,.filter_tipo a,.filter_producto a',function(event){
		event.preventDefault();
		var tipo_f=jQuery(this).attr('rel');
		if(!jQuery(this).hasClass('active')){
			jQuery('.filter_nivel a').removeClass('active');
			jQuery('.filter_tipo a').removeClass('active');
			jQuery('.filter_producto a').removeClass('active');
			jQuery(this).addClass('active');
			jQuery('.over_filtros').slideUp(400, function() {
				switch(tipo_f){
					case 'nivel':
						jQuery('.opc_nivel').show();
						jQuery('.opc_tipo').hide();
						jQuery('.opc_producto').hide();
					break;
					case 'tipo':
						jQuery('.opc_nivel').hide();
						jQuery('.opc_tipo').show();
						jQuery('.opc_producto').hide();
					break;
					case 'producto':
						jQuery('.opc_nivel').hide();
						jQuery('.opc_tipo').hide();
						jQuery('.opc_producto').show();
					break;
				}
				jQuery('.over_filtros').slideDown(400);
			});
		}else{
			jQuery(this).removeClass('active');
			jQuery('.over_filtros').slideUp(400);
		}
	});
	
	//Abrir Bloque de Filtros
	jQuery(document).on('click','.filter_mob a',function(event){
		event.preventDefault();
		var tipo_f=jQuery(this).attr('rel');
		if(!jQuery(this).hasClass('active')){
			jQuery(this).addClass('active');
			jQuery('.over_filtros').slideUp(400, function() {
				jQuery('.over_filtros').slideDown(400);
			});
		}else{
			jQuery(this).removeClass('active');
			jQuery('.over_filtros').slideUp(400);
		}
	
	});
	
	//Checkbox recursos
	jQuery(document).on('change','.over_filtros input[type=checkbox]',function(event){
		event.preventDefault();
			//alert(jQuery(this).attr('class'));
			if(jQuery(this).parent().hasClass('active')){
				jQuery(this).parent().removeClass('active');
			}else{
				jQuery(this).parent().addClass('active');
			}
			
			//Borramos la barra de banner del listado de filtros
			jQuery('.cover_b_recursos').hide();
			filterChange();
	});


	//Abrir Over Search
	jQuery(document).on('click','.search_filter a',function(event){
		event.preventDefault();
		jQuery('.over_filtros').slideUp(400, function() {
			jQuery('.filter_nivel a').removeClass('active');
			jQuery('.filter_tipo a').removeClass('active');
			jQuery('.filter_producto a').removeClass('active');
			jQuery('.over_buscador').fadeIn(600);
		});
	});

	//Cerrar Over Search
	jQuery(document).on('click','.close_search',function(event){
		event.preventDefault();
		jQuery('.over_buscador').fadeOut(600)
	});
	
	//Limpiar filtros
	jQuery(document).on('click','.clear_all_filters',function(event){
		event.preventDefault();
			//alert(jQuery(this).attr('class'));
			jQuery('.over_filtros input[type=checkbox]').attr('checked',false);
			jQuery('.over_filtros label').removeClass('active');
			//Falta mostrar todos los bloques
			jQuery('.contenedor-recursos .item').removeClass('hide');
			n_load=1;
			calc_pagination();

	});
	
	
	
});


	function filterChange() {

			filterValues = {};

			//Get nivelprimaria filter:
			filterValues.nivelinfantil = [];

			jQuery('input[name="nivelinfantil[]"]:checked').each(function(){
				filterValues.nivelinfantil.push( jQuery(this).val() )
			});

			//Get mcer filter:
			filterValues.nivelprimaria = [];

			jQuery('input[name="nivelprimaria[]"]:checked').each(function(){
				filterValues.nivelprimaria.push( jQuery(this).val() )
			});

			//Get formato filter:
			filterValues.formato = [];

			jQuery('input[name="formato[]"]:checked').each(function(){
				filterValues.formato.push( jQuery(this).val() )
			});
		
			//Get tipo filter:
			filterValues.tipo = [];

			jQuery('input[name="tipo[]"]:checked').each(function(){
				filterValues.tipo.push( jQuery(this).val() )
			});
		
			//Get productoprimaria filter:
			filterValues.productoprimaria = [];

			jQuery('input[name="productoprimaria[]"]:checked').each(function(){
				filterValues.productoprimaria.push( jQuery(this).val() )
			});
		
			//Get productoinfantil filter:
			filterValues.productoinfantil = [];

			jQuery('input[name="productoinfantil[]"]:checked').each(function(){
				filterValues.productoinfantil.push( jQuery(this).val() )
			});

			console.log(filterValues);

			var count = 0;

			resources.each(function(){
				var item = jQuery(this);

				var hide = shouldHide(item);

				if( ! hide) count++;

				item.parent().toggleClass('hide', hide );
			});

			if(count==0){
				//No hay elementos
				jQuery('.box_more_r h4').show();
				jQuery('.box_more_r .more_recursos').hide();
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


			if( filterValues.nivelinfantil.length && ! findOne(filterValues.nivelinfantil, itemData.nivelinfantil)) {
				return true;
			}

			if( filterValues.nivelprimaria.length && ! findOne(filterValues.nivelprimaria, itemData.nivelprimaria)) {
				return true;
			}

			if( filterValues.formato.length && ! findOne(filterValues.formato, itemData.formato) ) {
				return true;
			}
			
			if( filterValues.tipo.length && ! findOne(filterValues.tipo, itemData.tipo) ) {
				return true;
			}
			
			if( filterValues.productoprimaria.length && ! findOne(filterValues.productoprimaria, itemData.productoprimaria) ) {
				return true;
			}
			
			if( filterValues.productoinfantil.length && ! findOne(filterValues.productoinfantil, itemData.productoinfantil) ) {
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
	elems_show = jQuery('.contenedor-recursos .item').not(".hide");
	var all_elems=elems_show.length;
	var count=0;
	elems_show.each(function(){
			if(count>=(n_load*n_elems)){
				jQuery(this).addClass('hide-page');
				//Mostramos botón de más
				jQuery('.box_more_r .more_recursos').show();
			}else{
				jQuery(this).removeClass('hide-page');
				count++;
			}
	});
	//ELiminamos si alguna de las páginas
	if(count==all_elems){jQuery('.box_more_r .more_recursos').hide();}
}