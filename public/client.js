

function loadCities() {

	$.get('/log', function(data){
		console.log(data);
	});
}

$(document).ready( function(){
	loadCities();
	/* Register event listeners for buttons */

	$('.refresh-button').click(function(){
		$.get('/refresh',{city: this.id}, function(data){
			$('.display-container').replaceWith(data);	
		});
	});	
});
