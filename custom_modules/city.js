/* 
var weatherman = require('./weatherman.js');

/**
* @callback requestCallback
* @param {function} error - null if request was successful, or an error if an error occurred.
* @param {Object | string} success - an object containing requested data, or a success message.
*/

/**
 * @class	City
 * Desc:	Holds the data returned by API calls for 
 *			each city. Has functions to update data
 *			and a print function used in debug to 
 *			print object's current data to the console
 */
class City {
	/**
	 * Create a city.
	 * @param {number} id - The OpenWeatherMap API id associated with the city.
	 */
	constructor(id){
		this.cityId = id;
		this.cityName = null;
		this.weather = null;
		this.main = null;
		this.visibility = null;
		this.wind = null;
		this.clouds = null;
		this.forecast = [];
		/* Trigger the initial pull / update of data on object creation */
		this.updateWeather(function(err,success){
			if (err) {
				console.log(err);
			} else {
			}
			console.log(success);
		});

	}

	/**
	 * Update the current weather data for the city.
	 * @param {requestCallback} callback - response handler
	 */
	updateWeather(callback){
		weatherman.currentWeather(this.cityId, (error, apiResult)=>{
			if (error) {
				callback(error);
			} else {

				this.cityName = apiResult.name;
				this.weather = apiResult.weather;
				this.main = apiResult.main;
				this.visibility = apiResult.visibility;
				this.wind = apiResult.wind;
				this.clouds = apiResult.clouds;		

				callback(null,'Updated ' + this.cityName);
			}
		});
	}

	/**
	 * Update the forecast data for the city.
	 * @param {requestCallback} callback - response handler
	 */	
	 updateForecast(callback){
	 	weatherman.forecast(this.cityId, (error, apiResult) =>{
	 		if (error) {
	 			callback(error);
	 		} else {
	 			console.log(JSON.stringify(apiResult.list,null,2))
	 			this.forecast = apiResult.list;
	 		}
	 	});
	 }
	/**
	 * Print the city's weather data to the console. Used for debug / dev.
	 */
	print(){
		var jso = JSON.stringify(this,null,2);
	}
}

/* Export the class to be used elsewhere */
module.exports = City;
