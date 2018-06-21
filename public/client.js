

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

	$(window).resize( function(){
		if ($('.high-low-grid').width() < 250) {
			if ($('.high-low-grid').hasClass('slds-grid_vertical')){
				$('.high-low-val').removeClass('slds-size_1-of-2');
				$('.high-low-val').addClass('slds-size_1-of-1');	
			} else {
				$('.high-low-grid').toggleClass('slds-grid_vertical');
				$('.high-low-val').removeClass('slds-size_1-of-1');
				$('.high-low-val').addClass('slds-size_1-of-2');
			}
		} else {
			if ($('.high-low-grid').hasClass('slds-grid_vertical')){
				$('.high-low-grid').toggleClass('slds-grid_vertical');
				$('.high-low-val').removeClass('slds-size_1-of-2');
				$('.high-low-val').addClass('slds-size_1-of-1');				
			} else {
				return;
			}			
		}
	});

});		

