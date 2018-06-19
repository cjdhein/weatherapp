var weatherman = require('./weatherman.js');


/*************************************************************
 * Name:	City
 * Desc:	Holds the data returned by API calls for 
 *			each city. Has functions to update data
 *			and a print function used in debug to 
 *			print object's current data to the console
 *************************************************************/
/* Represent's each City's weather data */
class City {
	/**
	 * Create a city.
	 * @param {number} id - The OpenWeatherMap API id associated with the city.
	 **/
	constructor(id){
		this.cityId = id;
		this.cityName = null;
		this.weather = null;
		this.main = null;
		this.visibility = null;
		this.wind = null;
		this.clouds = null;

		/* Trigger the initial pull / update of data on object creation */
		this.update(function(err,success){
			if (err) {
				console.log(err);
			} else {
			}
			console.log(success);
		});

	}

	/**
	 * Update the weather data for the city.
	 */
	update(callbackb){
		weatherman.singleCity(this.cityId, (error, apiResult)=>{
			if (error) {
				callbackb(error);
			} else {

				this.cityName = apiResult.name;
				this.weather = apiResult.weather;
				this.main = apiResult.main;
				this.visibility = apiResult.visibility;
				this.wind = apiResult.wind;
				this.clouds = apiResult.clouds;		

				callbackb(null,'Updated ' + this.cityName);
			}
		});
	}

	/**
	 * Print the city's weather data to the console.
	 */
	print(){
		var jso = JSON.stringify(this,null,2);
	}
}

module.exports = City;
