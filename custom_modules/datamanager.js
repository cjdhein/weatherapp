/* To create the cities */
var City = require('./city.js');
var fs = require('fs');

/* Functions as a dictionary and holds all city objects as the value, under the cityId key */
var cities = {};


/* Create object for each pertinent city */
/*fs.readFile('./raw','utf8',function(err,success){
	if (err) {
		console.log(err);
	} else {
		success = JSON.parse(success);
		cities['5263045'] = success[0]; 
		cities['4275586'] = success[1];
		cities['3582383'] = success[2];
		cities['4684888'] = success[3];
	}
});
*/

cities['5263045']= new City(5263045);
//cities['4275586'] = new City(4275586);
//cities['3582383']= new City(3582383);
//cities['4684888']= new City(4684888);


/* Triggers the updating of each city.
 * @param callback - a callback function that will return
 *			(err, success).
 */ 
module.exports.updateAll = (callback) => {

	/* Will hold a response object for each call to updateSingle
	 * goodUpdate - boolean value indicating of error occured
	 * errMsg - string if there was an error, otherwise null
	 */
	var responses = [];

	/* Call updateSingle for each city and append callbacks to responses */
	for (var i = 0; i < cities.length; i++) {
		updateSingle(cities[i],function(err,success){
			if (err) {
				// Error occurred for this city
				response.append({goodUpdate : false, errMsg : err});
			} else {
				// Update was successful for this city
				response.append({goodUpdate : success, errMsg : null});
			}
		});
	}
	
	/* If there were errors in updating the cities, append error messages for single callback,
	 * and set allGood = false */
	var allGood = true;

	// hold appended error messages
	var callbackError = null;

	// check responses
	for (var i = 0; i < responses.length; i++) {
		if (!responses[i].goodUpdate){
			callbackError += res.errMsg + '; ';		
		}
	}
	
	// if overall request was successful, send callback with success flag, otherwise send error
	if (allGood) {
		callback(null,true);
	} else {
		callback(callbackError);
	}
}

module.exports.updateSingle = (cityId, callback) => {
	return new Promise((resolve,reject) => {
		cities[cityId].update().then(() => {
				resolve(true);
			}).catch(reject(err));
		});

}

module.exports.getAll = (callback) => {
	var data = cities;
	callback(null,data);
}

module.exports.storeAll = (callback) => {

	var data = [mke,mpls,chi,dal];
	data = JSON.stringify(data,null,2);
	fs.writeFile("./raw",data, function(err,success){
		if(err){
			callback(new Error(err));
		} else {
			callback(null,'written');
		}
	});
}
