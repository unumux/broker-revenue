$(document).ready(function () {
	$(".element-toggle, .form-toggle").click(function () {
		if($(this).next().hasClass("in")) {
			$(this).next().collapse("toggle");
		} else {
			$(".collapse.in").collapse("hide");
			$(this).next().collapse("show");
		}
	});

	$('#calcBtn').on('click', function(e) {
        $(this).attr("href", $(this).attr("href") + "?accounts=" + $("#numberOfAccounts").val() + "&employees=" + $("#numberOfEmployees").val());
    });
	
});