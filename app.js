const path = require('path');

//express
const express = require('express');

//session
const session = require('express-session');

//create instance
const app = express();

//middleware to process POST data
const bodyParser = require('body-parser');

//routes
const routes = require('./routes');

//import settings
const { Database } = require('./lib');

const helmet = require('helmet')
app.use(helmet())

Database.connect();

//set the template engine into ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// serve the files out of ./public as our main files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets/js/axios', express.static(path.join(__dirname, 'node_modules/axios/dist/axios.min.js')));


//declare session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'this.is.super.secret.key', //make this unique and keep it somewhere safe
    saveUninitialized: false,
    resave: false
}));


app.use('/', routes);

module.exports = app;