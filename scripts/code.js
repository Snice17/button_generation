$(document).ready(function(){

	//Объявление переменных
	var border_radius = $("#jsOptionBorderRadius"),
		border_size   = $("#jsOptionBorderWidth"),
		button_text   = $("#jsOptionText"),
		button        = $("#js-button"),
		button_height = $("#js-height"),
		button_width  = $("#js-width"),

		//Задаем максимальные значения для ui slider
		max_radius = 20; // В процессе пересчитывается. Равна половине высоты button.
		max_border = 10;


	//максимальный радиус половина высоты блока.

	//Функции

	//иницилизация UI компонент

	var init_ui  = function() {
		border_radius.slider({
			animate: true,
			max: max_radius,
			stop: function(event, ui) {
                   $("#js-button").css("border-radius", ui.value);
			}
		});

		border_size.slider({
			animate: true,
			max: max_border,
			stop: function(event, ui) {
				   var a = ui.value;
				   max_radius = (max_radius + a/2);
                   $("#js-button").css("border-width", ui.value);
			}
		});
	};

	//прослушка на изменение текста в форме
	button_text.on("change",function(){
			button.text(button_text.val());
	});

	// Следим за изменением текста, если изменился, то значение инпута button_text передает внутрь контейнера button

	// Если изменилась высота текста, то сохраняем её глобально, для просчёта максимального значения UI Slider;


	
	//инициализация
	init_ui();
});
