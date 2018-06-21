/***********************************************************************************************
 *
 * Name:	city.js
 * Desc:	This module contains the class / object that holds the data for each pertinent city 
 *
 **********************************************************************************************/

// Bring in the Weatherman module 
const Weatherman = require('./weatherman.js');


/**
 * Object:	City
 * Desc:	Creates the city object that holds the data returned by API calls for each city and 
 *			has a method to update member variables.
 * Params:	id - unique OpenWeatherMap API id for the city
 */

function City(id) {

	// Create and instantiate member variables
	this.cityId = id;
	this.cityName = null;
	this.weather = null;
	this.main = null;
	this.visibility = null;
	this.wind = null;
	this.clouds = null;
	this.forecast = [];
	
	/* Method:	update
	 * Desc:	Updates the object's member variables with data retrieved from
	 *			Weatherman.
	 * Params:	None.
	 *
	 * Pre:		City object already instantiated with a valid unique id.
	 * Post:	City object's member variables will be updated with data from API.
	 */
	this.update = () => {
		return new Promise((resolve,reject) => {

			// Call Weatherman to retrieve current weather from API
			Weatherman.currentWeather(this.cityId)

				// Set pertinent variables to API results
				.then((apiResult) => {
					this.cityName = apiResult.name;
					this.weather = apiResult.weather;
					this.main = apiResult.main;
					this.visibility = apiResult.visibility;
					this.wind = apiResult.wind;
					this.clouds = apiResult.clouds;		
				})

				// Call Weatherman to retrieve forecasted weather from API
				.then(() => {
					return Weatherman.forecast(this.cityId)
				})
				
				// Set pertinent variables to API results
				.then((forecastResult) => {
					this.forecast = forecastResult.list;
				})
				
				// Resolve the promise
				.then(()=> {
					resolve(true)
				})
				
				.catch( (error) => {
					reject(error);
			});
		});
	}	

}

/* Export the object to be used elsewhere */
module.exports = City;
