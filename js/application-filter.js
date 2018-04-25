/**********************
FUNCIONES JQUERY
Autor:Pedro de la Cruz
Fecha: 25-4-2018
Cliente: Inglés en Casa
***********************/


/**********************
VARIABLES
**********************/


jQuery.noConflict();

jQuery(window).on('load',function(){

});

jQuery(document).on('ready',function(){

	
	
});


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