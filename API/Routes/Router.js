'use strict';
var express = require('express');
module.exports = function(app) {
  	var odController = require('../Controllers/ODController');
	var apiRoutes =  express.Router();

	app.get('/',function(req,res) {
    	//res.send(req.body);
    	res.send(":D:D:D:D");
	});

// registerUser Route
	app.route('/').post(odController.processRequest);
	//app.post('/', function(req, res) {
	//	res.send("got a post")
	//})

	//app.route('/').put(odController.changeRequest);
};


