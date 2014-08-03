(function(){

	var app = {
		initialize: function() {
			this.updateResultHTML();
			this.updateResultCss();
			this.init_ui();
			this.setUpListeners();
		},
		setUpListeners: function () {
			//Нормальное состояние кнопки
			$("#jsOptionText").on("change", $.proxy(this.updateResultHTML, this));
			$("#jsOptionColorBorder").on("change", $.proxy(this.borderColor, this));
			$("#jsOptionColorBg").on("change", $.proxy(this.backgroundColor, this));
			$("#jsOptionColorFont").on("change", $.proxy(this.fontColor, this));
		},

		max_radius : 20, 
		max_border : 10,
		max_height : 60,
		max_width  : 250,
		min_height : 20,
		min_width  : 110,
		max_fontSize: 48,
		min_fontSize: 14,
		
		updateResultHTML : function() {
			var valuetext = $("#jsOptionText").val(),
				htmlcode = "<div class='button'>"+valuetext+"</div>";
			$("#js-button").text($("#jsOptionText").val());
			$("#js-htmlCode").text(htmlcode);
		},

		backgroundColor: function() {            // Цвет кнопки
				bgColor = $("#jsOptionColorBg").val();
				bgColor = "#"+bgColor;
				
				$("#js-button").css("background", bgColor);
				this.updateResultCss();
		},

		fontColor: function() {            // Цвет кнопки
				fontColor = $("#jsOptionColorFont").val();
				fontColor = "#"+fontColor;
				
				$("#js-button").css("color", fontColor);
				this.updateResultCss();
		},

		borderColor: function()	{                // Цвет обводки
				borderColor = $("#jsOptionColorBorder").val();
				borderColor = "#"+borderColor

				$("#js-button").css("border-color", borderColor);
				this.updateResultCss();
		},


		init_ui : function() {
			$("#jsOptionWidth").slider({          // Ширина кнопки
			animate: true,
			max: this.max_width,
			min: this.min_width,
			value: 140,
			step: 1,
			range: "min",
			slide: function(event, ui) {
				   var a = ui.value;       
		
                   $("#js-button").css("width", a);
                      app.updateResultCss();
			}
		});

		$("#jsOptionHeight").slider({             // Высота кнопки
			animate: true,
			max: this.max_height,
			min: this.min_height,
			value: 45,
			step: 1,
			range: "min",
			slide: function(event, ui) {
				   var b = ui.value;

				   this.max_radius = b / 2;
                   $("#js-button").css("height", b);
                   //css передаёт line-height просто число, а не количество пикселей.
                   bPixcel = +b+"px";
                   $("#js-button").css("line-height", bPixcel);
                   app.updateResultCss();
			}
		});

		$("#jsOptionBorderRadius").slider({ 		// Радиус обводки
			animate: true,
			max: this.max_radius,
			step: 1,
			value: 3,
			range: "min",
			slide: function(event, ui) {
				   var a =  ui.value;       
				  
                   $("#js-button").css("border-radius", a); 
                     app.updateResultCss();
			}
		});

		$("#jsOptionBorderWidth").slider({           // Размер обводки
			animate: true,
			max: this.max_border,
			step: 1,
			value: 1,
			range: "min",
			slide: function(event, ui) {
				   var a =  ui.value;       
				  
				   this.max_radius = (this.max_radius + a/2);
                   $("#js-button").css("border-width", a);
                      app.updateResultCss();
			}
		});

		$("#jsOptionFontSize").slider({           // Размер обводки
			animate: true,
			max: this.max_fontSize,
			min: this.min_fontSize,
			step: 1,
			value: 16,
			range: "min",
			slide: function(event, ui) {
				   var a =  ui.value;       
				  
                   $("#js-button").css("font-size", a);
                      app.updateResultCss();
			}
		});

		},
		updateResultCss: function() {
			var button = $("#js-button"),
				borderWidth = button.css('border-width'),
				borderRadius =button.css('border-radius'),
				colorBorder = button.css('border-color'),
				colorBackground = button.css('background-color'),
				buttomWidth = button.css('width'),
				buttomHeight = button.css('height'),
				buttonFontSize = button.css('font-size'),
				buttonFontColor = button.css('color');
		
			if(borderRadius != '0px' && borderWidth != '0px') {  
				$("#js-cssCode").text(
					'.button { \n' +
					'background:' + colorBackground + ';\n' +
					'border:' + borderWidth+ ' solid ' + colorBorder + ';\n' +
					'-webkit-border-radius: ' + borderRadius + ';\n' +
					'-moz-border-radius: ' + borderRadius + ';\n'+
					'-ms-border-radius: ' + borderRadius + ';\n' +
					'-o-border-radius: ' + borderRadius + ';\n' +
					'border-radius:' +borderRadius+ ';\n' +
					'color:' +buttonFontColor+ '; \n' +
					'font-size:' +buttonFontSize+ ';\n' +
					'font-weight: bold; \n' +
					'height:' +buttomHeight+ ';\n' +
					'line-height:' +buttomHeight+ ';\n' +
					'text-align: center; \n' +
					'width:' +buttomWidth+ ';\n' +
					'}'

				);
			}

			else {
				if(borderRadius == '0px' && borderWidth != '0px') {
					$("#js-cssCode").text(
						'.button { \n' +
						'background:' + colorBackground + ';\n' +
						'border:' + borderWidth+ ' solid ' + colorBorder + ';\n' +
					 	'color:' +buttonFontColor+ '; \n' +
						'font-size:' +buttonFontSize+ ';\n' +
						'font-weight: bold; \n' +
						'height:' +buttomHeight+ ';\n' +
						'line-height:' +buttomHeight+ ';\n' +
						'text-align: center; \n' +
						'width:' +buttomWidth+ ';\n' +
						'}'
					);
				}

				else {
					if(borderWidth == '0px' && borderRadius != '0px') {
						$("#js-cssCode").text(
							'.button { \n' +
							'background:' + colorBackground + ';\n' +
							'-webkit-border-radius: ' + borderRadius + ';\n' +
							'-moz-border-radius: ' + borderRadius + ';\n'+
							'-ms-border-radius: ' + borderRadius + ';\n' +
							'-o-border-radius: ' + borderRadius + ';\n' +
							'border-radius:' +borderRadius+ ';\n' +
							'color:' +buttonFontColor+ '; \n' +
							'font-size:' +buttonFontSize+ ';\n' +
							'font-weight: bold; \n' +
							'height:' +buttomHeight+ ';\n' +
							'line-height:' +buttomHeight+ ';\n' +
							'text-align: center; \n' +
							'width:' +buttomWidth+ ';\n' +
							'}'
						);
					}

					if(borderWidth == '0px' && borderRadius == '0px') {
						$("#js-cssCode").text(
						'.button { \n' +
						'background:' + colorBackground + ';\n' +
						'color:' +buttonFontColor+ '; \n' +
						'font-size:' +buttonFontSize+ ';\n' +
						'font-weight: bold; \n' +
						'height:' +buttomHeight+ ';\n' +
						'line-height:' +buttomHeight+ ';\n' +
						'text-align: center; \n' +
						'width:' +buttomWidth+ ';\n' +
						'}'
					);
					}
				}
			}
		}
	}

	app.initialize();
}());
