const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();

// IMPORTING ROUTES
const customerRoutes = require('./routes/customer'); //importing route

//SETTINGS
app.set('port', process.env.PORT || 3000); //setting port
app.set('view engine', 'ejs'); //setting view engine
app.set('views', path.join(__dirname, 'views')); //setting views folder


//MIDDLEWARES
app.use(morgan('dev')); //logging
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'crud-nodejs'
}, 'single')); //connecting to database
app.use(express.urlencoded({extended: false})); //parsing data


//ROUTES
app.use('/', customerRoutes); //using routes

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public'))); //setting static files


// STARTING SERVER
app.listen(app.get('port'), () => {
    console.log('Server is running on port 3000');
});