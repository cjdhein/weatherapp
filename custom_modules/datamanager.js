/* To create the cities */
var City = require('./city.js');
var fs = require('fs');

var mke = {};
var mpls = {};
var chi = {};
var dal = {};
/* Create object for each pertinent city */
fs.readFile('./raw','utf8',function(err,success){
	if (err) {
		console.log(err);
	} else {
		success = JSON.parse(success);
		mke = success[0];
		mpls = success[1];
		chi = success[2];
		dal = success[3];
	}
});

/*
var mke = new City(5263045);
var mpls = new City(4275586);
var chi = new City(3582383);
var dal = new City(4684888);
*/

/* Triggers the updating of each city.
 * @param callback - a callback function that will return
 *			(err, success).
 */ 
module.exports.updateAllWeather = (callback) => {

	updateSingleWeather(mke.cityName, callback);
	updateSingleWeather(mpls.cityName, callback);
	updateSingleWeather(chi.cityName, callback);
	updateSingleWeather(dal.cityName, callback);
	mke.update(function(err,success){
		if (err) {
			callback(err);
		} else {
			callback(null,success);
		}
	});
}

module.exports.updateSingleWeather = (cityName, callback) => {

	var toUpdate = null;
	switch (cityName) {
		case 'Milwaukee':
			toUpdate = mke;
			break;
		case 'Minneapolis':
			toUpdate = mpls;
			break;
		case 'Chicago':
			toUpdate = chi;
			break;
		case 'Dallas':
			toUpdate = dal;
			break;
		default:
			callback("No city found.");
	}

	toUpdate.updateWeather(function(err,success){
		if (err) {
			callback(err);
		} else {
			callback(null,success);
		}
	});

}

module.exports.getAllWeather = (callback) => {
	var data = [mke,mpls,chi,dal];
	callback(null,data);
}

module.exports.getSingleWeather= (cityName, callback) => {
	var toReturn = null;
	switch (cityName) {
		case 'Milwaukee':
			toReturn = mke;
			break;
		case 'Minneapolis':
			toReturn = mpls;
			break;
		case 'Chicago':
			toReturn = chi;
			break;
		case 'Dallas':
			toReturn = dal;
			break;
		default:
			callback("No city found.");
	}

	callback(null, toReturn);
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
