(function() {

	var sub = {

	initialize: function() {
		this.modules();
		this.setUpListeners();
	},

	modules: function() {
		
	},

	setUpListeners: function() {
		$('form').on('submit', sub.submitForm);  //Прослушка на отправление формы
	},

	submitForm: function(e) {
		e.preventDefault();   //отменяем стандартный сценарий отправки формы
		
		var submitBtn = $("form").find('button[type="submit"]');
		
		if( sub.validateForm() === false) return false;  //проверяем валидность введенного адреса и если e-mail введен верно, то диактивируем кнопку

		submitBtn.attr('disabled', 'disabled');

		$.ajax({
			url: 'mailpost/process.php',
			type: 'POST',
			data: str,
		})
		.done(function (msg) {
			if(msg === "OK"){
				$("#js-submitEmail").append("<span class='form_group-done'>Код красивой кнопочки уже летит на ваш e-mail</span>");
			}
			else{
				submitBtn.remove('disable');
			}
			
		})
		.always(function(){
			submitBtn.removeAttr('disable');
		});
	},

	validateForm: function(){
		var validate = true,
			inputEmail = $("#email"),
			val = inputEmail.val();

		if(val.length === 0) {    //e-mail пустой?
			inputEmail.addClass("form_group-error").removeClass("form_group-success");
			$(".form_group-tooltip-success").remove();
			$("#form_email").append("<span class='form_group-tooltip-error'>Error</span>");
			validate = false;
		}
		else {          
			inputEmail.addClass("form_group-success").removeClass("form_group-error");
			$(".form_group-tooltip-error").remove();
			$("#form_email").append("<span class='form_group-tooltip-success'>Success</span>");
		}

		return validate;
	}
	

	}

	sub.initialize();
}());