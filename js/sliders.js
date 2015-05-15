// FOR ACCOUNT SLIDER
var accSlider = $('#account-input-slider');
var accInput = $('#numberOfAccounts');
// FOR EMPLOYEES SLIDER
var empSlider = $('#employee-input-slider');
var empInput = $('#numberOfEmployees');

// FOR DEFAULT VALUES OF SLIDER
var intAccountNumber = 12;
var intEmployeesNumber = 100;

if ($.cookie('accountNumber')) {
  intAccountNumber = $.cookie('accountNumber');
}
if ($.cookie('employeesNumber')) {
  intAccountNumber = $.cookie('employeesNumber');
}

//ACCOUNT SLIDER
$('#account-input-slider').noUiSlider({
  start: intAccountNumber,
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

$('#account-input-slider').Link('lower').to($('#numberOfAccounts'));
$('#account-input-slider').Link('lower').to('-inline-');
$('#account-input-slider').on('slide', function(){
  updateCommission();
});


// EMPLOYEE SLIDER
$('#employee-input-slider').noUiSlider({
  start: intEmployeesNumber,
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

$('#employee-input-slider').Link('lower').to($('#numberOfEmployees'));
$('#employee-input-slider').Link('lower').to('-inline-');
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

  slider.employees = $('#numberOfEmployees').val();
  slider.accounts = $('#numberOfAccounts').val();
 // console.log($('#numberOfAccounts'))
  
  var commission = slider.accounts * 
                      slider.employees * 
                      slider.premiumPerEmployee * 
                      slider.participation * 
                      slider.grossCommissions * 
                      slider.persistencyAdjustment;
  commission = displayPrettyAmount(commission);
  $("#personalCommission").html(commission);
};


$('.step__down').on('click', function() {
    var slider = $(this).next();
    slider.val(parseInt(slider.val()) - 1);
});

$('.step__up').on('click', function() {
    var slider = $(this).prev();
    slider.val(parseInt(slider.val()) + 1);
});
