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

jQuery(document).on('ready',function($){
	//console.log('validation');

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

	//Detectar cambios en select registro fecha
	var birthSelects = jQuery('[name="birth_day"],[name="birth_month"],[name="birth_year"]', 'form');
	birthSelects.on('change', function(event){
		event.preventDefault();
		var form = jQuery(event.target).closest('form');
		var d_fecha=birthSelects.filter('[name="birth_day"]').val();
		var m_fecha=birthSelects.filter('[name="birth_month"]').val();
		var y_fecha=birthSelects.filter('[name="birth_year"]').val();
		if(d_fecha!="" && m_fecha!="" && y_fecha!="" ){
			//Comprobamos si es menor de 14 años
			var final_date = new Date(y_fecha+"-"+m_fecha+"-"+d_fecha);
			var isUnderConsent = getAge(final_date) < 14;
			form.find('[data-underage="true"]').toggle(isUnderConsent);
			// #DEPRECATED
			form.find('label[data-label-underage]').each(function(){
				var me = jQuery(this);
				me.text( me.data(isUnderConsent ? 'label-underage' : 'label') );
			});
		}
	}).trigger('change');

	//Validación de formularios de contacto
	jQuery('form[data-validate="true"]').on('submit', function(event){
		var form = jQuery(event.target);
		if( validateForm.validate(event) ) {
			form.find('input[type="submit"]').prop("disabled", true);
		} else {
			event.preventDefault();
		}
	});

});

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

		var elem = jQuery(e);

		var rules = elem.data('validation-rule').split('|');

		for (var i = 0; i < rules.length; i++) {

			var params = rules[i].split(':');
			var rule   = params.shift();
			var error  = false;

			// console.log(elem.attr('name'), 'RULE', rules[i])

			if( 'email' == rule ) {error = ! this.ruleIsEmail(elem);}
			if( 'repeat' == rule ) {error = ! this.ruleRepeat(elem, params[0]);}
			if( 'different' == rule ) {error = ! this.ruleDifferent(elem, params[0]);}
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

				if( rule == 'different' && elem.data('error-different-msg')) {
					this.errors.push( elem.data('error-different-msg') );
				} else if(elem.data('error-msg')) {
					this.errors.push( elem.data('error-msg') );
				}

				break;
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

	ruleDifferent: function(e, otherSelector) {
		return e.val() !== jQuery(otherSelector, this.form).val();
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
		var zipLength = e.attr('maxlength') || 5;
		return e.val().length == zipLength;
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