'use strict';
var express = require('express');
var odController = require('../Controllers/ODController');

module.exports = function(app) {
  	// var odController = require('../Controllers/ODController');
	var apiRoutes =  express.Router();

	app.get('/',function(req,res) {
    	//res.send(req.body);
    	res.send(":D:D:D:D");
	});

// registerUser Route
	//app.route('/').post(odController.processRequest);
	app.post('/', function(req, res) {
		res.send("got a post")
		if (req.body.queryResult.action == "date") {
    		odController.getDate(req,res);
  		} 
  		if (req.body.queryResult.action == "address") {
    		odController.getLocation(req,res);
  		}
  		if (req.body.queryResult.action == "shippingmethod") {
    		getShipping(req,res);
		}
	});

	//app.route('/').put(odController.changeRequest);
};


