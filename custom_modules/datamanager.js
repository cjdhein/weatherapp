/*****************************************************************************************************
 *
 * Name:	datamanager.js
 *
 * Desc:	This module holds the instantiated city objects and has methods to trigger the city
 *			objects to update their data and also to return themselves to a caller.
 *
 *****************************************************************************************************/



/* To create the cities */
const City = require('./city.js');

/* Used as a dictionary to hold all city objects as the value, under the cityId key */
var cityHolder = {};

// Add and instantiate each city
cityHolder['5263045']= new City(5263045);	// Milwaukee
cityHolder['4275586'] = new City(4275586);	// Minneapolis
cityHolder['3582383']= new City(3582383);	// Chicago
cityHolder['4684888']= new City(4684888);	// Dallas

/* Method:	updateSingle	
 * Desc:	Updates the weather and forecast data for the specified city.
 * Params:	cityId - the key the city is held in cityHolder as. This also
 *			represents the unique OpenWeatherMap API id for the city.
 *
 * Pre:		There is a city in cityHolder under the cityId key.
 * Post:	The specified city will have had its data updated.
 */ 
module.exports.updateSingle = (cityId) => {
	return new Promise((resolve,reject) => {
		// Call update on the city
		cityHolder[cityId].update()

			// resolve promise
			.then(() => {
				resolve(true)
			})

			.catch( (error) => {
				reject(error);
		 });
	});

}

/* Method:	updateAll	
 * Desc:	Updates the weather and forecast data for all cities in cityHolder.
 * Params:	None.
 *
 * Pre:		cityHolder has instantiated city objects held as values.
 * Post:	All cities in cityHolder will have had their data updated.
 */ 
module.exports.updateAll = () => {
	return new Promise((resolve,reject) => {
		
		// obtain the keys (cityIds) for each city
		var keys = Object.keys(cityHolder);
		
		// hold all the promises from update calls to ensure all updates have resolved
		var allPromises = [];

		// call updateSingle for each city and add the response to allPromises
		for (var i = 0; i < keys.length; i++) {
			allPromises.push(module.exports.updateSingle(keys[i]));
		}

		// Once all promises have been returned, resolve this method's promise
		Promise.all(allPromises)
			.then( () => {
				resolve(true);
			})
			.catch( (error) => {
				reject(error);
		});

	});
}

/* Method:	getAll	
 * Desc:	Returns all cities held in cityHolder so their data can be used.	
 * Params:	None.	
 *
 * Pre:		cityHolder has instantiated city objects held as values, otherwise an empty object is returned.		
 * Post:	The cityHolder object will have been returned to the caller.
 */ 
module.exports.getAll = () => {
	return new Promise((resolve,reject) => {
		resolve(cityHolder);
	});
}

