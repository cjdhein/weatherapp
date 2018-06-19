function loadCities() {

	$.get('/test', function(data){
		console.log('returned');
		console.log(data);
	});
}

$(document).ready( function(){
	loadCities();
});