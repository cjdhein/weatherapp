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
	dataman.getAll((error,success) => {
		if (error) {
			console.log(error);
		} else {
			console.log(success);
			res.render('home',{'cities':success});
		}
	});
});

app.get('/log', (req,res,next) => {
	dataman.getAll((error,success) => {
		if (error) {
			console.log(error);
		} else {
			res.send(success);
		}
	});

});

app.get('/refresh', (req,res,next) => {
	var toUpdate = req.query.city;
	console.log('Updating ' + toUpdate);
	dataman.updateSingle(toUpdate, (error,success) => {
		if (error) {
			console.log(error);
		} else {
			res.redirect('/');
		}

	});
});

app.listen(3000, () => {
	console.log("Started listening on 3000	");
});
