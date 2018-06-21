/* Checks the pixel width of the temp grid and returns 
 * whether it should be vertical or horizontal
 */
function checkForecastSize() {
		
	if ($('.temp-grid').width() < 250) {
		return 'vertical';
	} else {
		return 'horizontal';
	}
	
}

/* Switches css classes to keep best appearance for the current size */
function responsiveForecast(){
	switch (checkForecastSize()){
		case 'vertical':
			$('.temp-grid').removeClass('slds-grid_vertical').addClass('slds-grid_vertical');
			$('.temp-val').removeClass('slds-size_1-of-2').addClass('slds-size_1-of-1');	
			break;
		case 'horizontal':
			$('.temp-grid').removeClass('slds-grid_vertical');
			$('.temp-val').removeClass('slds-size_1-of-1').addClass('slds-size_1-of-2');	
			break;
		default:
			console.error('checkForecastSize is returning invalid response');
	}		
}

$(document).ready( function(){

	/* Ensure forecast side is properly sized at start */
	responsiveForecast();

	/* Register event listeners for refresh buttons */
	$('.refresh-button').click(function(){

		// Perform ajax call to server to trigger refresh and get the updated view
		$.ajax({
			url:'/refresh',
			data: {city: this.id} 
		}).done((data) => {
			$('.display-container').replaceWith(data);	
		});			
	});
	/* Register event listeners for refresh buttons */
	$('#refreshall').click(function(){

		// Perform ajax call to server to trigger refresh and get the updated view
		$.ajax({
			url:'/refreshall',
			data: {city: this.id} 
		}).done((data) => {
			$('.display-container').replaceWith(data);	
		});			
	});



	/* Ensure forecast side is more responsive on window resize*/
	$(window).resize( function(){
		responsiveForecast();
	});
});		

