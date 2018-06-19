function loadCities() {

	$.get('/log', function(data){
		console.log('returned');
		console.log(data);
	});
}

$(document).ready( function(){
	loadCities();
});
