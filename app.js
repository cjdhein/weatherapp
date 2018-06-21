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
	dataman.getAll()
		.then( (data) =>{
			res.render('home', {'cities' : data});
		})
		.catch(error => console.error(error.message));
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

	// Obtain city we are updating
	var toUpdate = req.query.city;
	
	console.log('1 app - Updating ' + toUpdate);
	
	dataman.updateSingle(toUpdate)
		.then(() => {
			res.redirect('/');
		})
		.catch(error => console.error(error));
});

app.listen(3000, () => {
	console.log("Started listening on 3000	");
});
