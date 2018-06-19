var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser');

var cities = require('./custom_modules/city.js');

var app = express();
var hbs = exphbs.create({
	defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine','handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res,next) => {
	res.render('home');
});

app.get('/test', (req,res,next) => {
	cities.updateList(function() {
		res.send(cities.getWeather());
	});
	
});

app.get('/test2', (req,res,next) => {
	cities.printList();
});

app.listen(3000, () => {
	console.log("Started listening on 3000	");
});