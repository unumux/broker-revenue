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
$('#account-input-slider').on('slide', function(){
  updateCommission();
});


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
$('#employee-input-slider').on('slide', function(){
  updateCommission();
});

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

/* this function handles rounding the calculated numbers and adding commas and dollar signs. */
function displayPrettyAmount(amount) {
    var amt = Math.round(amount / 100) * 100;
    var strValue = "";
    strValue += amt;
    var objRegExp = new RegExp('(-?[0-9]+)([0-9]{3})');
    while (objRegExp.test(strValue)) {
        strValue = strValue.replace(objRegExp, '$1,$2');
    }
    return "$" + strValue;
}



var updateCommission = function() {

  slider.employees = $('#number-of-employees').val();
  slider.accounts = $('#number-of-accounts').val();
  console.log($('#number-of-accounts'))
  
  var commission = slider.accounts * 
                      slider.employees * 
                      slider.premiumPerEmployee * 
                      slider.participation * 
                      slider.grossCommissions * 
                      slider.persistencyAdjustment;
  console.log(slider);
  commission = displayPrettyAmount(commission);
  $("#personalCommission").html(commission);
};

