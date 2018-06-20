/************************************************************
 * Name:	weatherman.js
 * Desc:	This module performs the actual API 
 *		calls to retrieve the weather from OpenWeatherMap.
 ***********************************************************/

// OpenWeatherMap API key and base URL
var apiKey = '&APPID=dbf5bbbaeef83b5dccc8aa6dab999515';
var url = 'http://api.openweathermap.org/data/2.5/';

// Used for making the API calls
var axios = require('axios');

const ax = axios.create({
	baseURL: url
});


module.exports.currentWeather = function(cityID) {

	return new Promise((resolve,reject) => {
		var call = 'weather?id=' + cityID + '&units=imperial' + apiKey;
	
		//console.log('Calling ' + callUrl);

		ax.get(call)
		.then(function(response){
			//console.log(JSON.stringify(response.data,null,2));
			resolve(response.data);
		})
		.catch(function(error){
			reject(error); return;
		});
	});
}

module.exports.forecast = function(cityID) {

	return new Promise((resolve,reject) => {
		var call = 'forecast/daily?id=' + cityID + '&units=imperial' + apiKey;
	
		//console.log('Calling ' + callUrl);

		ax.get(call)
		.then(function(response){
			resolve(response.data);
		})
		.catch(function(error) {
			reject((error));
		});
	});
}


