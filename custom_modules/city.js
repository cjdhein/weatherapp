var weatherman = require('./weatherman.js');

class City {
	constructor(id){
		this.cityId = id;
		this.cityName = null;
		this.weather = null;
		this.main = null;
		this.visibility = null;
		this.wind = null;
		this.clouds = null;
	}

	update(){
		//console.log(this.cityId);
		weatherman.singleCity(this.cityId, (apiResult)=>{
			this.cityName = apiResult.name;
			this.weather = apiResult.weather;
			this.main = apiResult.main;
			this.visibility = apiResult.visibility;
			this.wind = apiResult.wind;
			this.clouds = apiResult.clouds;		
		});
	}

	print(){
		console.log(JSON.stringify(this,null,2));
	}

	getWeather(){
		return this;
	}
}

var cityList = {};
cityList['Milwaukee'] = new City(5263045);
cityList['Minneapolis'] = new City(4275586);
cityList['Chicago'] = new City(3582383);
cityList['Dallas'] = new City(4684888);

module.exports.updateList = function(callback) {
//	console.log(cityList);
	keys = Object.keys(cityList);
	
	for(var i = 0; i < keys.length; i++) {
		cityList[keys[i]].update();
	}

	callback('done');
}

module.exports.printList = function(callback) {

	keys = Object.keys(cityList);
	
	for(var i = 0; i < keys.length; i++) {
		cityList[keys[i]].print();
	}

}

module.exports.getWeather = function() {
	return cityList;
}