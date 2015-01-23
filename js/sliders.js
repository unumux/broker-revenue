// FOR ACCOUNT SLIDER
var accSlider = $('#account-input-slider');
var accInput = $('#number-of-accounts');
// FOR EMPLOYEES SLIDER
var empSlider = $('#employee-input-slider');
var empInput = $('#number-of-employees');

//ACCOUNT SLIDER
$('#account-input-slider').noUiSlider({
  start: 12,
  step: 1,
  range: {
    'min': 1,
    'max': 99
  },
  format: {
    to: function (value) {
      return Math.round(value);
    },
    from: function (value) {
      return value;
    }
  }

});

$('#account-input-slider').Link('lower').to($('#number-of-accounts'));

// EMPLOYEE SLIDER
$('#employee-input-slider').noUiSlider({
  start: 100,
  step: 1,
  range: {
    'min': 1,
    'max': 999
  },
  format: {
    to: function (value) {
      return Math.round(value);
    },
    from: function (value) {
      return value;
    }
  }

});

$('#employee-input-slider').Link('lower').to($('#number-of-employees'));

// THE MATH!
var slider = {
  premiumPerEmployee: 707,
  participation: 0.50,
  grossCommissions: 0.214,
  persistencyAdjustment: .75,
  accounts: null,
  employees: null,
  commission: null
};



var updateCommission = function () {

  slider.employees = $('#number-of-employees').val();
  slider.accounts = $('#number-of-accounts').val();
  
  slider.commission = slider.accounts * 
                      slider.employees * 
                      slider.premiumPerEmployee * 
                      slider.participation * 
                      slider.grossCommissions * 
                      slider.persistencyAdjustment;
  // if(isNaN(slider.commission)) {
  //   slider.commission = 0;
  // }
  // slider.commission = 30;
  $("#personalCommission").val(slider.commission);
  console.log(slider.commission);
};

