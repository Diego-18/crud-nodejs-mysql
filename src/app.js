const express = require('express');
const { Router } = express;
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();

// Import routes
const customerRoutes = require('./routes/customer'); //importing route

// Settings
app.set('port', process.env.PORT || 3000); //setting port
app.set('view engine', 'ejs'); //setting view engine
app.set('views', path.join(__dirname, 'views')); //setting views folder

// Middleware
app.use(morgan('dev')); //logging
app.use(express.urlencoded({ extended: false })); //parsing data

//connecting to database
const dbConfig = {
	host: 'localhost',
	user: 'root',
	password: '',
	port: 3306,
	database: 'crud-nodejs',
};

app.use(myConnection(mysql, dbConfig, 'single'));

// Routes
app.use('/', customerRoutes);

// Statics Files
app.use(express.static(path.join(__dirname, 'public')));

// Error management
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ error: 'Error interno del servidor' });
});

// Server Start
app.listen(app.get('port'), () => {
	console.log(
		'El servidor está en funcionamiento en el puerto',
		app.get('port')
	);
});
