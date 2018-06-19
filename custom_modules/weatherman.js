/************************************************************
 * Name:	weatherman.js
 * Desc:	This module performs the actual API 
 *		calls to retrieve the weather from OpenWeatherMap.
 ***********************************************************/

// OpenWeatherMap API key and base URL
var apiKey = '&APPID=41b3bed3ca536514bb564806999b1954';
var url = 'http://api.openweathermap.org/data/2.5/';

// Used for making the API calls
var axios = require('axios');

const ax = axios.create({
	baseURL: url
});

module.exports.singleCity = function(cityID, callback) {
	
	var call = 'weather?id=' + cityID + '&units=imperial' + apiKey;
	
	//console.log('Calling ' + callUrl);

	ax.get(call)
	.then(function(response){
		//console.log(JSON.stringify(response.data,null,2));
		callback(null, response.data);
	})
	.catch(function(error){
		callback(new Error(error));
	});
}
