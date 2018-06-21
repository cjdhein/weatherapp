const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

/* Bring in data manager */
const dataman = require('./custom_modules/datamanager.js');

const app = express();
const hbs = exphbs.create({
	defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine','handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

/* Main route */
app.get('/', (req,res,next) => {
	
	// refresh weather for all cities
	dataman.updateAll()
		// retrieve the data for all cities
		.then( () => {
			return dataman.getAll();
		})
		// render home page with cities' data
		.then( (data) =>{
			res.render('home', {'cities' : data});
		})
		.catch( (error) => {
			console.error(error);
	});
});


/* Used to refresh a single city's weather */
app.get('/refresh', (req,res,next) => {

	// Obtain city we are updating from the request
	var toUpdate = req.query.city;
	
	// Call dataman to update the city	
	dataman.updateSingle(toUpdate)
		// once updated, redirect to main route
		.then(() => {
			res.redirect('/');
		})
		.catch( (error) => {
			console.error(error);
	});
});

app.listen(3000, () => {
	console.log("Started listening on 3000	");
});
