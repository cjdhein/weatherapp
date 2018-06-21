 
const Weatherman = require('./weatherman.js');

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
	 * parameter: "value",  {number} id - The OpenWeatherMap API id associated with the city.
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
		this.update();

	}

	/**
	 * Update the current weather and forecast data for the city.
	 * @param {requestCallback} callback - response handler
	 */
	update(){
		return new Promise((resolve,reject) => {
			console.log('3 city - Inside update for ' + this.cityId);
			Weatherman.currentWeather(this.cityId)
				.then((currentResult) => {
					console.log('6 city - current retrieved');
					this.cityName = currentResult.name;
					this.weather = currentResult.weather;
					this.main = currentResult.main;
					this.visibility = currentResult.visibility;
					this.wind = currentResult.wind;
					this.clouds = currentResult.clouds;		
				})

				.then(() => {
					return Weatherman.forecast(this.cityId)
				})
				
				.then((forecastResult) => {
					this.forecast = forecastResult.list;
					console.log('9 forecast set');
					return;
				})

				.then(()=> {
					resolve(true)
				})
				
				.catch(error => console.error(error));
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
