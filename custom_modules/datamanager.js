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
module.exports.updateAll = (callback) => {

	mke.update(function(err,success){
		if (err) {
			callback(err);
		} else {
			callback(null,success);
		}
	});
}

module.exports.getAll = (callback) => {
	var data = [mke,mpls,chi,dal];
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
