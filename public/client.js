

function loadCities() {

	$.get('/log', function(data){
		console.log(data);
	});
}

$(document).ready( function(){
	loadCities();
	/* Register event listeners for buttons */

	$('.refresh-button').click(function(){
		$.ajax({
			url:'/refresh',
			data: {city: this.id}, 
			async: true
		}).done((data) => {
			$('.display-container').replaceWith(data);	
		});			
	});
});		

