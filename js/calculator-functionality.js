Array.prototype.has = function (x) {
    for (i = 0; i < this.length; i+=1){
        if (this[i] == x) {
            return true;
        }
    }
    return false;
}

var kslidez = {
    "currentSlide": 0,
    "menuMarkup": "",
    "createMenu": function (kslidezList) {
        kslidez.menuMarkup = "<div class='kslidezMenu'>";
        kslidez.menuMarkup += "<a href='#' class='kslidezPrevious' title='Previous slide'>Previous</a>";
        kslidez.menuMarkup += "<a href='#' class='kslidezNext' title='Next slide'>Next</a>";
        kslidez.menuMarkup += "<div class='kslidezIndicators'>";
        $(kslidezList).find('.kslidez > li').each(function () {
            kslidez.menuMarkup += "<a href='#' class='kslidezIndicator' title='" + $(this).find('h1').text() + "'></a>";
            //$(this).remove();
        });
        kslidez.menuMarkup += "</div>";
        kslidez.menuMarkup += "</div>";
        $(kslidezList).html(kslidez.menuMarkup + $(kslidezList).html());
        $(kslidezList).find('.kslidezIndicator').each(function () {
            $(this).click(function (e) {
                kslidez.slideTo(kslidezList, $(this).index());
                e.preventDefault();
            });
        });
        $(kslidezList).find('.kslidezPrevious').click(function (e) {
            kslidez.previousSlide(kslidezList);
            e.preventDefault();
        });
        $(kslidezList).find('.kslidezNext').click(function (e) {
            kslidez.nextSlide(kslidezList);
            e.preventDefault();
        });
    },
    "slideTo": function (kslidezList, slide) {
        if (slide < $(kslidezList).find('.kslidez > li').size() && slide >= 0) {
            $(kslidezList).find('.kslidez').animate({
                left: (slide * $(kslidezList).width() * -1)
            },
                400,
                function () {
                    //Finished sliding
                });
            kslidez.currentSlide = slide;
            $(kslidezList).find('.kslidezIndicator').removeClass("kslidezCurrent");
            $(kslidezList).find('.kslidezIndicator:eq(' + kslidez.currentSlide + ')').addClass("kslidezCurrent");
        }
    },
    "nextSlide": function (kslidezList) {
        if (kslidez.currentSlide >= 0 && kslidez.currentSlide < $(kslidezList).find('.kslidez > li').size() - 1) {
            kslidez.slideTo(kslidezList, kslidez.currentSlide + 1);
        }
    },
    "previousSlide": function (kslidezList) {
        if (kslidez.currentSlide > 0 && kslidez.currentSlide < $(kslidezList).find('.kslidez > li').size()) {
            kslidez.slideTo(kslidezList, kslidez.currentSlide - 1);
        }
    },
    "init": function (i, width) {
        //alert(i + ": " + width);
        switch (i) {
            case 0:
                $('.kslidez').width(width-40 + "px");
                break;
            case 1:
                $('.kslidez').width("700px");
                break;
            case 2:
                $('.kslidez').width("940px");
                break;
            case 3:
                $('.kslidez').width("1180px");
                break;
            default:
                alert("this is default");
                break;
        }
        $('.kslidez').wrap('<div class="kslidezWrapper" />');
        $('.kslidezWrapper').css("overflow", "hidden");
        $('.kslidezWrapper').each(function () {
            var kslidezWidth = $(this).find('.kslidez').width();
            //alert(kslidezWidth);
            $(this).width(kslidezWidth);
            $(this).find('.kslidez > li').width(kslidezWidth);
            $(this).find('.kslidez').width(kslidezWidth * $(this).find('.kslidez > li').size());
            kslidez.createMenu(this);
        });
        $('.kslidez > li').css("float", "left");
        $('.kslidez').css({ "position": "relative", "overflow": "hidden" });

        // kslidez.createMenu();
        $('.kslidezMenu .kslidezIndicator:first-child').addClass('kslidezCurrent');
    }
};

/* footer/contact form */
    
function footerInit(i, width) {
    var element = $("#footerWrapper");
    var header = $("#callToAction");
    var elementHeight;
    var headerHeight;
    var timer;

    function positionFooter() {
        if (i > 2) { // No fixed footer for three lowest resolutions
            elementHeight = element.outerHeight();
            headerHeight = header.outerHeight();

            element.css({"position": "fixed", "bottom": "-" + (elementHeight - headerHeight) + "px"});
            element.hover(function () {
                element.stop().animate({
                    bottom: "0"
                    }, 500, function() {
                    // Animation complete.
                });
            },
            function () {
                element.stop().animate({
                    bottom: "-" + (elementHeight - headerHeight) + "px"
                    }, 1000, function() {
                    // Animation complete.
                });
            });
        }
        else {
            element.css({"position": "static", "bottom": "auto"}).unbind("hover");
        }
    }
    clearTimeout(timer);
    timer = setTimeout(positionFooter, 1000);
}

$(document).ready(function () {

    $("#numberOfAccounts").val(12);
    $("#numberOfEmployees").val(100);

    /* create text size controls */
    var textControls = {
        "textControlMarkup": "<ul class='horizontalList'>" +
                                    "<li class='textSmall'><a href='#' title='Small text'>A</a></li>" +
    	                            "<li class='textMedium'><a href='#' title='Medium text'>A</a></li>" +
                                    "<li class='textLarge'><a href='#' title='Large text'>A</a></li>" +
                                "</ul>",
        "currentState": "small",
        "changeTextSize": function (size) {
            $(".changeTextSize li").removeClass("current");
            switch (size) {
                case "small":
                    $("body").css("font-size", "51%").find(".textSmall").addClass("current");
                    textControls.currentState = size;
                    break;
                case "medium":
                    $("body").css("font-size", "59%").find(".textMedium").addClass("current");
                    textControls.currentState = size;
                    break;
                case "large":
                    $("body").css("font-size", "70%").find(".textLarge").addClass("current");
                    textControls.currentState = size;
                    break;
                default:
                    alert("Error in changeTextSize: font-size must be set to small, medium, or large.");
                    break;
            }
        },
        "createTextControl": function () {
            $(".changeTextSize").html(textControls.textControlMarkup);
            textControls.changeTextSize("small");
            $(".textSmall").click(function () {
                textControls.changeTextSize("small");
            });
            $(".textMedium").click(function () {
                textControls.changeTextSize("medium");
            });
            $(".textLarge").click(function () {
                textControls.changeTextSize("large");
            });
        }
    };

    /* Input Sliders */
    var slider = {
        premiumPerEmployee: 707,
        participation: 0.50,
        grossCommissions: 0.214,
        persistencyAdjustment: .75,
        accounts: null,
        employees: null,
        commission: null,
        addCommas: function (x) {
            return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
        },
        updateCommission: function () {
            slider.commission = Math.round(Math.ceil(slider.accounts * slider.employees * slider.premiumPerEmployee * slider.participation * slider.grossCommissions * slider.persistencyAdjustment)/100)*100;
            if(isNaN(slider.commission)) {
                slider.commission = 0;
            }
            $("#personalCommission").val("$" + slider.addCommas(slider.commission));
            $("#easterEggInput").val("$" + slider.addCommas(slider.commission));
        },
        init: function () {
            slider.accounts = $("#accountsSlider").slider("value");
            slider.employees = $("#employeesSlider").slider("value");
            slider.updateCommission();
        }
    };

    $("#accountsSlider").slider({
        min: 1,
        max: 99,
        value: $("#numberOfAccounts").val(),
        animate: true,
        range: "min",
        slide: function (e, ui) {
            slider.accounts = ui.value;
            $("#numberOfAccounts").val(slider.accounts);
            slider.updateCommission();
        }
    });

    $("#employeesSlider").slider({
        min: 1,
        max: 999,
        value: $("#numberOfEmployees").val(),
        animate: true,
        range: "min",
        step: 1,
        slide: function (e, ui) {
            slider.employees = ui.value;
            $("#numberOfEmployees").val(slider.employees);
            slider.updateCommission();
        }
    });

    /* Content Slider */


    /* Create controls */
    slider.init();
    //textControls.createTextControl();

    /* Hide articles */
    $("#personalEquationContent > :not(:first)").hide();
    $(".personalEquationPiece").click(function () {
        var index = $(".personalEquationPiece").index(this);
        $('html,body').animate({ scrollTop: $("#detailedContentWrapper").offset().top }, '400');
        $("#personalEquationContent > :visible").fadeOut("fast", function () {
            $("#personalEquationContent > :eq(" + index + ")").fadeIn("fast");
        });
    });

    $("#backToTopContent").click(function () {
        $('html,body').animate({ scrollTop: $("#headerWrapper").offset().top }, '600');
    });

    $("#backToTopBenefitsSelling").click(function () {
        $('html,body').animate({ scrollTop: $("#headerWrapper").offset().top }, '600');
    });

    $("#contactUsButton").click(function () {
        $('html,body').animate({ scrollTop: $("#backToTopContent").offset().top }, '700');
    });

    $("#benefitsSellingWrapper").click(function () {
        $('html,body').animate({ scrollTop: $("#benefitsSellingDetailWrapper").offset().top }, '800');
    });

    

    var accountsClockIsRunning = 0;
    var employeesClockIsRunning = 0;
    var accountsTimer;
    var employeesTimer;

    function startTheClock(field) {
        if (field === "accounts") {
            if (accountsClockIsRunning) {
                clearTimeout(accountsTimer);
            }

            else {
                accountsClockIsRunning = 1;
            }

            accountsTimer = setTimeout(function () {
                var min = $("#accountsSlider").slider("option", "min");
                var max = $("#accountsSlider").slider("option", "max");
                var currentValue = $("#numberOfAccounts").val();

                clockIsRunning = 0;

                if(currentValue < min) {
                    currentValue = min;
                }
                if (currentValue > max) {
                    currentValue = max;
                }
                slider.accounts = currentValue;
                $("#numberOfAccounts").val(currentValue);
                $("#accountsSlider").slider("value", currentValue);
                slider.updateCommission();
            }, 1500);
        }

        if (field === "employees") {
            if (employeesClockIsRunning) {
                clearTimeout(employeesTimer);
            }

            else {
                employeesClockIsRunning = 1;
            }

            employeesTimer = setTimeout(function () {
                var min = $("#employeesSlider").slider("option", "min");
                var max = $("#employeesSlider").slider("option", "max");
                var currentValue = $("#numberOfEmployees").val();

                clockIsRunning = 0;

                if(currentValue < min) {
                    currentValue = min;
                }
                if (currentValue > max) {
                    currentValue = max;
                }
                slider.employees = currentValue;
                $("#numberOfEmployees").val(currentValue);
                $("#employeesSlider").slider("value", currentValue);
                slider.updateCommission();
            }, 1500);
        }

    }

    $("#numberOfAccounts, #numberOfEmployees").keydown(function (e) {
        var allowedKeys = [123, 122, 121, 120, 119, 118, 117, 115, 114, 113, 112, 116, 9, 8, 46, 38, 39, 40, 37, 33, 38, 36, 39, 12, 37, 34, 40, 35, 45, 48, 57, 56, 55, 54, 53, 52, 51, 50, 49, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];

        if (!allowedKeys.has(e.keyCode)) {
            return false;
        }
    });

    $("#numberOfAccounts").keyup(function () {
        var currentValue = $("#numberOfAccounts").val();

        slider.accounts = currentValue;
        $("#numberOfAccounts").val(currentValue);
        $("#accountsSlider").slider("value", currentValue);
        slider.updateCommission();
        startTheClock("accounts");
    });

    $("#numberOfEmployees").keyup(function () {
        var currentValue = $("#numberOfEmployees").val();

        slider.employees = currentValue;
        $("#numberOfEmployees").val(currentValue);
        $("#employeesSlider").slider("value", currentValue);
        slider.updateCommission();
        startTheClock("employees");
    });

    $("#numberOfAccounts").change(function () {
        var minAccounts = $("#accountsSlider").slider("option", "min");
        var maxAccounts = $("#accountsSlider").slider("option", "max");
        var currentValue = $("#numberOfAccounts").val();

        if(currentValue < minAccounts) {
            currentValue = minAccounts;
        }
        if (currentValue > maxAccounts) {
            currentValue = maxAccounts;
        }
        slider.accounts = currentValue;
        $("#numberOfAccounts").val(currentValue);
        $("#accountsSlider").slider("value", currentValue);
        slider.updateCommission();
    });

    $("#numberOfEmployees").change(function () {
        var minEmployees = $("#employeesSlider").slider("option", "min");
        var maxEmployees = $("#employeesSlider").slider("option", "max");
        var currentValue = $("#numberOfEmployees").val();

        if(currentValue < minEmployees) {
            currentValue = minEmployees;
        }
        if (currentValue > maxEmployees) {
            currentValue = maxEmployees;
        }
        slider.employees = currentValue;
        $("#numberOfEmployees").val(currentValue);
        $("#employeesSlider").slider("value", currentValue);
        slider.updateCommission();
    });

    /* footer/contact form */
    function silverpopNames() {
        $('#BrokerFirstName').attr('name', 'BrokerFirstName');
        $('#BrokerLastName').attr('name', 'BrokerLastName');
        $('#BrokerPhone').attr('name', 'BrokerPhone');
        $('#BrokerZipCode').attr('name', 'BrokerZipCode');
        $('#BrokerNumberofClients').attr('name', 'BrokerNumberofClients');
        $('#BrokerAverageClientSize').attr('name', 'BrokerAverageClientSize');
        $('#BrokerComments').attr('name', 'BrokerComments');
    }
    function Names() {
        $('#BrokerFirstName').attr('name', 'Broker First Name');
        $('#BrokerLastName').attr('name', 'Broker Last Name');
        $('#BrokerPhone').attr('name', 'Broker Phone');
        $('#BrokerZipCode').attr('name', 'Broker Zip Code');
        $('#BrokerNumberofClients').attr('name', 'Broker Number of Clients');
        $('#BrokerAverageClientSize').attr('name', 'Broker Average Client Size');
        $('#BrokerComments').attr('name', 'Broker Comments');
    }
    silverpopNames();

    // validation for the forms 
    jQuery.validator.addMethod("postalcode", function (postalcode, element) {
        return this.optional(element) || postalcode.match(/(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXYabceghjklmnpstvxy]{1}\d{1}[A-Za-z]{1} ?\d{1}[A-Za-z]{1}\d{1})$/);
    }, "Enter a zip code");

    $('.revValidation').validate({
        rules: {
            Email: {
                required: true,
                email: true
            },
            BrokerFirstName: {
                required: true
            },
            BrokerLastName: {
                required: true
            },
            BrokerPhone: {
                required: true,
                number: true,
                minlength: 7

            },
            BrokerZipCode: {
                required: true,
                postalcode: true
            },
            BrokerNumberofClients: {
                required: true,
                number: true
            },
            BrokerAverageClientSize: {
                required: true,
                number: true
            },
        },
         submitHandler: function (form) {
            Names();
            $('.revValidation').submit();
        },
        errorElement: 'p',
        wrapper: "div",  // a wrapper around the error message
        errorPlacement: function (error, element) {
            offset = element.offset();
            error.insertBefore(element);
            error.addClass('helper');  // add a class to the wrapper
        }
    });

});