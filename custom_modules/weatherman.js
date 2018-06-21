/*****************************************************************************************************
 *
 * Name:	weatherman.js
 *
 * Desc:	This module performs the actual API calls to retrieve the weather from OpenWeatherMap and
 *			returns the data from those calls.
 *
 *****************************************************************************************************/

// Used for making the API calls
const axios = require('axios');

// OpenWeatherMap API key and base URL
const apiKey = '&APPID=dbf5bbbaeef83b5dccc8aa6dab999515';
const url = 'http://api.openweathermap.org/data/2.5/';


// instantiate an axios object tied to our url
const ax = axios.create({
	baseURL: url
});


/* Method:	currentWeather
 * Desc:	Calls API to get the current weather for the provided cityID.
 * Params:	cityID - the unique OpenWeatherMap API id for a city.
 *
 * Pre:		Have a valid cityID.
 * Post:	Returns data from the API response.
 */
module.exports.currentWeather = function(cityID) {

	return new Promise((resolve,reject) => {
		// set up the query
		var call = 'weather?id=' + cityID + '&units=imperial' + apiKey;

		// Perform api call
		performCall(call)
			.then( (response) => {
				resolve(response.data);
			})
			.catch( (error) => {
				reject(error);
		});


	});
}

/* Method:	forecast	
 * Desc:	Calls API to get 16 day forecast for the provided city.
 * Params:	cityID - the unique OpenWeatherMap API id for a city.
 *
 * Pre:		Have a valid cityID.
 * Post:	Returns data from the API response.
 */ 
module.exports.forecast = (cityID) => {

	return new Promise((resolve,reject) => {
		// set up the query
		var call = 'forecast/daily?id=' + cityID + '&units=imperial' + apiKey;

		// Perform api call
		performCall(call)
			.then( (response) => {
				resolve(response.data);
			})
			.catch( (error) => {
				reject(error);
		});
	});
}

/* Method:	performCall
 * Desc:	Performs the actual API call with axios.
 * Params:	call - A string representing the api query.
 *
 * Pre:		call already constructed.
 * Post:	Returns the respones from the API call.
 */ 
function performCall(call) {
	
	return new Promise((resolve,reject) => {
		// perform API call
		ax.get(call)

			// resolve promise and return the data
			.then( (response) =>{
				// resolve with response data
				resolve(response);
			})
			.catch( (error) =>{
				return reject(error.response.data);
			});
	});

}


