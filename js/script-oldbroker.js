/* Will contain any url variables */
var $_GET = {};

/* global variables */
var accounts = new Array();
var noAccounts = 1;
var noEmployees = 10;
var population = 0;

/* Constants */
var participation = new Array(.26,.26,.39,.38,.5);
var premiumPerEmployee = new Array(216,432,432,707,707);
var expY1 = .75;
var y1Factor = 1.02075;
var y25Factor = 3.0907333333333;
var y1CommissionRate = new Array(.12,.12,.12,.637,.214);
var y1EnrollmentCost = new Array(0,0,0,-.7,0);
var y25CommissionRate = new Array(.12,.12,.12,.0903,.0322);
var y25EnrollmentCost = new Array(0, 0, 0, -.7, 0);

/* Arrays to hold the commission values */
var y1Commissions = new Array(0,0,0,0,0);
var y25Commissions = new Array(0,0,0,0,0);

/* Maximum height for the bar charts */
var maxHeight = 160;

/* Variable to keep track if we've generated the report */
var reportGenerated = false;

/* Regex to guaruntee sane inputs */
var regex = /^\d+$/;


/* This function calculates the first and fifth year commission amounts based on which column it's intended for using the constants above.  */
/* col indicates which column it's meant to populate and output is a boolean that says if it should populate the text in the tabbed area.   */
function calculate(col,output) {
    var year1Sales = 0;
    var year1Premium = 0;
    var year1Premium25 = 0;
    var year25Premium = 0;
    var y1TotalCommissionRate = 0;
    var y25TotalCommissionRate = 0;

    /*  figure out average population */
    population = noAccounts * noEmployees;

    /* calculate premiums for year 1 and years 2-5 */
    year1Sales = population * participation[col] * premiumPerEmployee[col];
    year1Premium = year1Sales * expY1;
    year1Premium25 = year1Premium * y1Factor;
    year25Premium = year1Premium * y25Factor;

    /* calculate commission rates */
    y1TotalCommissionRate = y1CommissionRate[col] * (1 + y1EnrollmentCost[col]);
    y25TotalCommissionRate = y25CommissionRate[col] * (1 + y25EnrollmentCost[col]);

    y1Commissions[col] = year1Premium * y1TotalCommissionRate;
    y25Commissions[col] = y1Commissions[col] + (year1Premium25 * y1TotalCommissionRate) + (year25Premium * y25TotalCommissionRate);
    if (output) {
        $(".firstYearRevenue").html(displayPrettyAmount(Math.round(y1Commissions[col])));
    }
}

/* on document load function.  This handles dealing with url variables and setting up the controls. */
$(function () {
    var generate = false;
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        $_GET[decode(arguments[1])] = decode(arguments[2]);
    });
    if ($_GET["accounts"] != undefined) {
        if (regex.test($_GET["accounts"])) {
            noAccounts = parseInt($_GET["accounts"]);
            if (!isNaN(noAccounts)) {
                if (noAccounts > 99) {
                    noAccounts = 99;
                }
                generate = true;
                $("#noAccounts").html(noAccounts);
            }
        }
    }
    if ($_GET["employees"] != undefined) {
        if (regex.test($_GET["employees"])) {
            noEmployees = parseInt($_GET["employees"]);
            if (!isNaN(noEmployees)) {
                if (noEmployees > 99999) {
                    noEmployees = 99999;
                }
                generate = true;
                $("#noEmployees").html(noEmployees);
            }
        }
    }
    //$("#slider1").slider({ min: 1, max: 99, value: noAccounts, range: "min", animate: true, slide: slider1Slide});
    //$("#slider2").slider({ min: 1, max: 999, value: noEmployees, range: "min", animate: true, slide: slider2Slide });
    //$("#tabs").tabs({ selected: 0, select:changeTab });
    //$("button").button();
    
    $("#addAcct").keydown(function (e) { if (e.which == undefined) { e.which = e.keycode; } if (e.which == '13') { addAccount(); } });
    calculate(4, true);
    if (generate) {
        generateReport();
    }
});

/* this event fires when a user clicks the one of the tabs.  If the user hasn't added any accounts the total doesn't appear. */
function changeTab(event, ui) {
    if (accounts.length == 0) {
        $('#revenue-col').addClass('hide');
    }
}


/* This function handles the slide event for the Accounts Slider.  If the user has added accounts manually it clears those. */
// function slider1Slide(event, ui) {
//     accounts = new Array();
//     noAccounts = ui.value;
//     $("#noAccounts").html(ui.value);
//     $("#accounts li.customAcct").remove();
//     $("#addAccount span.accountName").html("Account 1");
//     $("#addAccount").show();
//     $("#addAccount span.errorMsg").hide();
//     $("#addAcct").removeClass("error");
//     calculate(4, true);
//     if (reportGenerated) {
//         //  If the report has been generated. Grey it out so that it doesn't get confusing.
//         $("#reportHolder>div div").addClass("transparent");
//         $("#reportHolder>div p").addClass("transparent");
//         $("#reportHolder>div h4").addClass("transparent");
//         $("#reportHolder>div h3").addClass("transparent");
//         $("button").removeClass("disabled");

//     }
// }
/* This function handles the slide event for the Employees Slider.  If the user has added accounts manually it clears those. */
// function slider2Slide(event, ui) {
//     accounts = new Array();
//     noEmployees = ui.value;
//     $("#noEmployees").html(ui.value);
//     $("#accounts li.customAcct").remove();
//     $("#addAccount span.accountName").html("Account 1");
//     $("#addAccount").show();
//     $("#addAccount span.errorMsg").hide();
//     $("#addAcct").removeClass("error");
//     calculate(4, true);
//     if (reportGenerated) {
//         //  If the report has been generated. Grey it out so that it doesn't get confusing.
//         $("#reportHolder>div div").addClass("transparent");
//         $("#reportHolder>div p").addClass("transparent");
//         $("#reportHolder>div h4").addClass("transparent");
//         $("#reportHolder>div h3").addClass("transparent");
//         $("button").removeClass("disabled");
//     }
// }
/* This function averages the accounts the user entered and updates the sliders */
// function calculatePopulation() {
//     var pop = 0;
//     for (var i = 0; i < accounts.length; i++) {
//         pop += accounts[i];
//     }
//     if (accounts.length > 0) {
//         noAccounts = accounts.length;
//         var emps = Math.round(pop / accounts.length);
//         if(emps > 99999) {
//             emps = 99999;
//         }
//         noEmployees = emps;
//     } else {
//         noAccounts = 1;
//         noEmployees = 10;
//     }
//     try {
//     $("#slider1").slider("value", noAccounts);
//     } catch(e) { }
//     $("#noAccounts").html(noAccounts);
//     try {
//     $("#slider2").slider("value", noEmployees);
//     } catch(e) {}
//     $("#noEmployees").html(noEmployees);
// }

/* this function handles manually adding an account. */
function addAccount() {
    if (accounts.length < 15) {
        if (regex.test($("#addAcct").val())) {
            var emps = parseInt($("#addAcct").val());
            if (!isNaN(emps)) {
                if (emps < 1) {
                    emps = 1;
                }
                $(".errorMsg").addClass('hide');
                $("#addAcct").removeClass("error");
                // Create a new account row.
                var newacct = "<li id=\"account_" + (accounts.length + 1) + "\" class=\"customAcct\"><span class=\"errorMsg\">Please enter a number.</span><span class=\"removeBtn\" onclick=\"removeAccount(" + (accounts.length + 1) + ");\">X</span><span class=\"accountName\">Account " + (accounts.length + 1) + "</span> <input type=\"text\" id=\"employees_" + (accounts.length + 1) + "\" maxlength=\"5\" value=\"" + emps + "\"/><button href=\"javascript:void(0);\" onclick=\"updateAccount(" + (accounts.length + 1) + ");\" class=\"addAcctBtn\">Update</></li>";
                accounts.push(emps);
                $("#addAccount span.accountName").html("Account " + (accounts.length + 1));
                $("#addAccount").before(newacct);
                $("#account_" + accounts.length + " .errorMsg").addClass('hide');
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
                                $('#revenue-col').removeClass('hide');
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
                $("#calculateBtn2").removeClass("disabled");
                calculatePopulation();
                calculate(4, true);
                $('#revenue-col').removeClass('hide');
            } else {
                $("#addAccount span.errorMsg").removeClass('hide');
                $("#addAcct").addClass("error");
                $("#calculateBtn2").addClass("disabled");
            }
        }
        else {
            $("#addAccount span.errorMsg").removeClass('hide');
            $("#addAcct").addClass("error");
            $("#calculateBtn2").addClass("disabled");
        }
    }
}

/* This function handles updating existing accounts and regenerating the total. */
function updateAccount(acctNo) {
        if (regex.test($("#employees_" + acctNo).val())) {
            var emps = parseInt($("#employees_" + acctNo).val());
            if (!isNaN(emps)) {
                if (emps < 1) {
                    emps = 1;
                }
                if (emps > 99999) {
                    emps = 99999;
                }
                $("#account_" + acctNo + " span.errorMsg").addClass('hide');
                $("#employees_" + acctNo).removeClass("error");
                accounts[acctNo - 1] = emps;
                if (reportGenerated) {
                    $("#reportHolder>div div").addClass("transparent");
                    $("#reportHolder>div p").addClass("transparent");
                    $("#reportHolder>div h4").addClass("transparent");
                    $("#reportHolder>div h3").addClass("transparent");
                }
                $("#calculateBtn2").removeClass("disabled");
                calculatePopulation();
                calculate(4, true);
            } else {
                $("#account_" + acctNo + " span.errorMsg").removeClass('hide');
                $("#employees_" + acctNo).addClass("error");
                $("#calculateBtn2").addClass("disabled");
            }
        } else {
            $("#account_" + acctNo + " span.errorMsg").removeClass('hide');
            $("#employees_" + acctNo).addClass("error");
            $("#calculateBtn2").addClass("disabled");
        }
}

/* this function handles removing a custom account from the list. */
function removeAccount(acctNo) {

    for (var i = 1; i <= accounts.length; i++) {
        if (i != acctNo) {
            if ((i) > acctNo) {
                $("#account_" + i + " span.accountName").html("Account " + (i - 1));
                $("#account_" + i + " span.removeBtn").attr("onclick", "removeAccount(" + (i - 1) + ");");
                $("#account_" + i).attr("id", "account_" + (i - 1));
            }
        }
    }
    accounts.splice(acctNo-1, 1);
    $("#account_" + acctNo).fadeOut("slow").remove();
    $("#addAccount span.accountName").html("Account " + (accounts.length + 1));
    if (accounts.length < 15) {
        $("#addAccount").show();
        $("#addAccount span.errorMsg").addClass('hide');
        $("#addAcct").removeClass("error");
    }
    if (reportGenerated) {
        $("#reportHolder>div div").addClass("transparent");
        $("#reportHolder>div p").addClass("transparent");
        $("#reportHolder>div h4").addClass("transparent");
        $("#reportHolder>div h3").addClass("transparent");
        $("#calculateBtn2").removeClass("disabled");
    }
    calculatePopulation();
    calculate(4,true);
}

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

/* this function handles generating all the values for the report pane. It runs through a calculation for every row and the height of the graphs. */
function generateReport() {
    if (!(reportGenerated == false && $("#calculateBtn2").hasClass("disabled"))) {
        $("#introHolder").hide();
        for (var i = 4; i >= 0; i--) {
            var y1percentage = .01;
            var y5percentage = .01;
            switch (i) {
                case 0:
                    calculate(0, false);
                    $("#secondCol div.chartValue").html(displayPrettyAmount(Math.round(y1Commissions[0])));
                    $("#secondCol div.secondChartValue").html(displayPrettyAmount(Math.round(y25Commissions[0])));
                    y1percentage = y1Commissions[0] / y25Commissions[4];
                    y5percentage = y25Commissions[0] / y25Commissions[4];
                    $("#secondCol div.chart").height((y1percentage * maxHeight));
                    $("#secondCol div.secondChart").height((y5percentage * maxHeight));
                    $("#secondCol div.chartValue").css('bottom', ((y1percentage * maxHeight) + 20) + "px");
                    $("#secondCol div.secondChartValue").css('bottom', ((y5percentage * maxHeight) + 20) + "px");
                    break;
                case 1:
                    calculate(1, false);
                    $("#thirdCol div.chartValue").html(displayPrettyAmount(Math.round(y1Commissions[1])));
                    $("#thirdCol div.secondChartValue").html(displayPrettyAmount(Math.round(y25Commissions[1])));
                    y1percentage = y1Commissions[1] / y25Commissions[4];
                    y5percentage = y25Commissions[1] / y25Commissions[4];
                    $("#thirdCol div.chart").height((y1percentage * maxHeight));
                    $("#thirdCol div.secondChart").height((y5percentage * maxHeight));
                    $("#thirdCol div.chartValue").css('bottom', ((y1percentage * maxHeight) + 20) + "px");
                    $("#thirdCol div.secondChartValue").css('bottom', ((y5percentage * maxHeight) + 20) + "px");
                    break;
                case 2:
                    calculate(2, false);
                    $("#fourthCol div.chartValue").html(displayPrettyAmount(Math.round(y1Commissions[2])));
                    $("#fourthCol div.secondChartValue").html(displayPrettyAmount(Math.round(y25Commissions[2])));
                    y1percentage = y1Commissions[2] / y25Commissions[4];
                    y5percentage = y25Commissions[2] / y25Commissions[4];
                    $("#fourthCol div.chart").height((y1percentage * maxHeight));
                    $("#fourthCol div.secondChart").height((y5percentage * maxHeight));
                    $("#fourthCol div.chartValue").css('bottom', ((y1percentage * maxHeight) + 20) + "px");
                    $("#fourthCol div.secondChartValue").css('bottom', ((y5percentage * maxHeight) + 20) + "px");
                    break;
                case 3:
                    calculate(3, false);
                    $("#fifthCol div.chartValue").html(displayPrettyAmount(Math.round(y1Commissions[3])));
                    $("#fifthCol div.secondChartValue").html(displayPrettyAmount(Math.round(y25Commissions[3])));
                    y1percentage = y1Commissions[3] / y25Commissions[4];
                    y5percentage = y25Commissions[3] / y25Commissions[4];
                    $("#fifthCol div.chart").height((y1percentage * maxHeight));
                    $("#fifthCol div.secondChart").height((y5percentage * maxHeight));
                    $("#fifthCol div.chartValue").css('bottom', ((y1percentage * maxHeight) + 20) + "px");
                    $("#fifthCol div.secondChartValue").css('bottom', ((y5percentage * maxHeight) + 20) + "px");
                    break;
                case 4:
                    calculate(4, false);
                    $("#colonialCol div.chartValue").html(displayPrettyAmount(Math.round(y1Commissions[4])));
                    $("#colonialCol div.secondChartValue").html(displayPrettyAmount(Math.round(y25Commissions[4])));
                    y1percentage = y1Commissions[4] / y25Commissions[4];
                    y5percentage = y25Commissions[4] / y25Commissions[4];
                    $("#colonialCol div.chart").height((y1percentage * maxHeight));
                    $("#colonialCol div.secondChart").height((y5percentage * maxHeight));
                    $("#colonialCol div.chartValue").css('bottom', ((y1percentage * maxHeight) + 20) + "px");
                    $("#colonialCol div.secondChartValue").css('bottom', ((y5percentage * maxHeight) + 20) + "px");
                    break;
            }
        }
        reportGenerated = true;
        $("h1.title").html("Your Revenue Potential");
        $("#reportHolder").show();
        $("#reportHolder>div .transparent").removeClass("transparent");
        $("button span.ui-button-text").html("Update Earnings Chart");
        $("#calculateBtn2").addClass("disabled");
    }
}