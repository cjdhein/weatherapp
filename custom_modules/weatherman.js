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
		console.log('4 weatherman - Calling current');
		ax.get(call)
		.then(function(response){
			console.log('5 weatherman - resolving current');
			resolve(response.data);
		})
		.catch(function(error){
			reject(error);
		});
	});
}

module.exports.forecast = function(cityID) {

	return new Promise((resolve,reject) => {
		var call = 'forecast/daily?id=' + cityID + '&units=imperial' + apiKey;
		
		console.log('7  weatherman - Calling forecast');

		ax.get(call)
		.then(function(response){
			console.log('8 weatherman - resolving forecast');
			resolve(response.data);
		})
		.catch(function(error) {
			reject((error));
		});
	});
}


