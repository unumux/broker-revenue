$(document).ready(function () {
	$(".panelToggle").click( function (e) {
		e.preventDefault();
		$(".toggled-content").each( function () {
			$(this).removeClass("visible");
		});
		$(this).parent(".tile-heading").next(".tile-content").addClass("visible");
	});

});

