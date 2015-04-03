$(document).ready(function () {
	$(".element-toggle, .form-toggle").click(function () {
		if($(this).next().hasClass("in")) {
			$(this).next().collapse("toggle");
		} else {
			$(".collapse.in").collapse("hide");
			$(this).next().collapse("show");
		}
	});


	// $("#sliderAccount").noUiSlider({
	// 	start: [ 20000 ],
	// 	step: 1000,
	// 	range: {
	// 		'min': [ 20000 ],
	// 		'max': [ 80000 ]
	// 	},
	// 	format: wNumb({
	// 		decimals: 3,
	// 		thousand: '.',
	// 		postfix: ' (US $)',
	// 	})
	// });

	// $("#sliderAccount").noUiSlider({
	// 	start: [ 20 ],
	// 	step: 10,
	// 	range: {
	// 		'min': [ 20 ],
	// 		'max': [ 80 ]
	// 	},
	// 	format: {
	// 	  to: function ( value ) {
	// 		return value + ',-';
	// 	  },
	// 	  from: function ( value ) {
	// 		return value.replace(',-', '');
	// 	  }
	// 	}
	// });

	// console.log($("#sliderAccount").val());

	//$("#sliderAccount").Link("lower").to($("#numberOfAccounts"));

	
});