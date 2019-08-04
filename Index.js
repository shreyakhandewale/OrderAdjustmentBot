'use strict';

var express  = require('express'),
bodyParser   = require('body-parser'),
http         = require('http'),
config       = require('./Config'),
server       = express(),
mongoose     = require('mongoose'),

//created model loading here
ODModel = require('./API/Models/ODModel');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.dbUrl);

// Let's make sure we are connected
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
	console.log('We are connected to the MUNGI database!');
});

// console.log(config.dbUrl)

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

var routes = require('./API/Routes/Router'); //importing route
routes(server); //register the route

server.listen((8000), function () {
	console.log("Server is up and listening on port 8000");
});
