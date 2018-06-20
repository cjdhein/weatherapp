var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser');


var dataman = require('./custom_modules/datamanager.js');

var app = express();
var hbs = exphbs.create({
	defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine','handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req,res,next) => {
	console.log("loading...");
	dataman.getAllWeather((error,success) => {
		if (error) {
			console.log(error);
		} else {
			console.log(success);
			res.render('home',{'cities':success});
		}
	});
});

app.get('/log', (req,res,next) => {
	dataman.getAllWeather((error,success) => {
		if (error) {
			console.log(error);
		} else {
			console.log(success);
			res.send(success);
		}
	});

});

app.post('/updateWeather', (req,res,next) => {
	var toUpdate = req.body.city;
	dataman.updateSingleWeather(city, (error,success) => {
		if (error) {
			console.log(error);
		} else {
			console.log(success);
			res.send(success);
		}
	});
});

app.post('/getWeather', (req,res,next) => {
	var toGet = req.body.city;
	dataman.getSingleWeather(city, (error,success) => {
		if (error) {
			console.log(error);
		} else {
			console.log(success);
			res.send(success);
		}
	});
});

app.post('/updateForecast', (req,res,next) => {
	var toUpdate = req.body.city;
	//dataman.update
});

app.listen(3000, () => {
	console.log("Started listening on 3000	");
});
