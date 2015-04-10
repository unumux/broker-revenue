$(document).ready(function () {
	updateCommission();

	$(".element-toggle, .form-toggle").click(function () {
		if($(this).next().hasClass("in")) {
			$(this).next().collapse("toggle");
		} else {
			$(".collapse.in").collapse("hide");
			$(this).next().collapse("show");
		}
	});

	$("#calcBtn").click(function (e) {
        //$(this).attr("href", $(this).attr("href") + "?accounts=" + $("#numberOfAccounts").val() + "&employees=" + $("#numberOfEmployees").val());
        $.cookie('accountNumber', $("#numberOfAccounts").val());
        $.cookie('employeeNumber', $("#numberOfEmployees").val());
    });

    $('#calculateBtn2').click(function(e) {
    	generateReport();
    	calculatePopulation();
    	calculate(4, true);
    });

    $('.addAcctBtn').click(function(e) {
    	e.preventDefault();
    	addAccount();
    	calculatePopulation();
    	calculate(4, true);
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

// $("#addAcct").keydown(function (e) { if (e.which == undefined) { e.which = e.keycode; } if (e.which == '13') { addAccount(); } });
//     calculate(4, true);

/* this function handles manually adding an account. */
function addAccount() {
  //  if (accounts.length < 15) {
        if (regex.test($("#addAcct").val())) {
            var emps = parseInt($("#addAcct").val());
            if (!isNaN(emps)) {
                if (emps < 1) {
                    emps = 1;
                }
                $("#addAccount span.errorMsg").addClass('hide');
                $("#addAcct").removeClass("error");
                // Create a new account row.
                var newacct = "<li id=\"account_" + (accounts.length + 1) + "\" class=\"customAcct\"><span class=\"errorMsg\">Please enter a number.</span><span class=\"removeBtn\" onclick=\"removeAccount(" + (accounts.length + 1) + ");\">X</span><span class=\"accountName\">Account " + (accounts.length + 1) + "</span> <input type=\"text\" id=\"employees_" + (accounts.length + 1) + "\" maxlength=\"5\" value=\"" + emps + "\"/><a href=\"javascript:void(0);\" onclick=\"updateAccount(" + (accounts.length + 1) + ");\" class=\"addAcctBtn\">Update</a></li>";
                accounts.push(emps);
                $("#addAccount span.accountName").html("Account " + (accounts.length + 1));
                $("#addAccount").before(newacct);
                $("#account_" + accounts.length + " .errorMsg").hide();
                // Bind to the keydown event on the new text box for the update event.
                $("#employees_" + (accounts.length)).keydown(function (e) {
                    if (e.which == undefined) {
                        e.which = e.keycode;
                    }
                    if (e.which == '13') {
                        var acct = parseInt($(this).attr("id").replace("employees_", ""));
                        if (regex.test($(this).val())) {
                            var emps = parseInt($(this).val());
                            if (!isNaN(emps)) {
                                if (emps < 1) {
                                    emps = 1;
                                }
                                $("#account_" + acct + " span.errorMsg").addClass('hide');
                                $(this).removeClass("error");
                                accounts[acct - 1] = emps;
                                if (reportGenerated) {
                                    $("#reportHolder>div div").addClass("transparent");
                                    $("#reportHolder>div p").addClass("transparent");
                                    $("#reportHolder>div h4").addClass("transparent");
                                    $("#reportHolder>div h3").addClass("transparent");
                                    $("button").removeClass("disabled");
                                }
                                calculatePopulation();
                                calculate(4, true);
                                $("#byAccount div#titleText").show();
                                $(".firstYearRevenue").removeClass('hide');
                                $("#calculateBtn2").show();
                            } else {
                                $("#account_" + acct + " span.errorMsg").removeClass('hide');
                                $(this).addClass("error");
                            }
                        } else {
                            $("#account_" + acct + " span.errorMsg").removeClass('hide');
                            $(this).addClass("error");
                        }
                    }
                });
                $("#addAcct").val("");
                // if we've got the maximum number of accounts, hide the add account row.
                if (accounts.length == 15) {
                    $("#addAccount").hide();
                }
                if (reportGenerated) {
                    $("#reportHolder>div div").addClass("transparent");
                    $("#reportHolder>div p").addClass("transparent");
                    $("#reportHolder>div h4").addClass("transparent");
                    $("#reportHolder>div h3").addClass("transparent");
                }
                $("button").removeClass("disabled");
                calculatePopulation();
                calculate(4, true);
                $("#byAccount div#titleText").show();
                $(".firstYearRevenue").removeClass('hide');
                $("#calculateBtn2").show();
            } else {
                $("#addAccount span.errorMsg").removeClass('hide');
                $("#addAcct").addClass("error");
                $("button").addClass("disabled");
            }
        }
    //     else {
    //         $("#addAccount span.errorMsg").removeClass('hide');
    //         $("#addAcct").addClass("error");
    //         $("button").addClass("disabled");
    //     }
    // }
}

function calculatePopulation() {
    var pop = 0;
    for (var i = 0; i < accounts.length; i++) {
        pop += accounts[i];
    }
    if (accounts.length > 0) {
        noAccounts = accounts.length;
        var emps = Math.round(pop / accounts.length);
        if(emps > 99999) {
            emps = 99999;
        }
        noEmployees = emps;
    } else {
        noAccounts = 1;
        noEmployees = 10;
    }
    // try {
    // //$("#slider1").slider("value", noAccounts);
    // } catch(e) { }
    // $("#noAccounts").html(noAccounts);
    // try {
    // $("#slider2").slider("value", noEmployees);
    // } catch(e) {}
    // $("#noEmployees").html(noEmployees);
}