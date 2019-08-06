'use strict';
var express = require('express');
var odController = require('../Controllers/ODController');

module.exports = function(app) {
  	// var odController = require('../Controllers/ODController');
	var apiRoutes =  express.Router();

	app.get('/', function(req, res) {
    	//res.send(req.body);
    	console.log('Received webhook-get request:' + req);

    });

	app.get('/webhook-get', function(req, res) {
    	//res.send(req.body);
    	console.log('Received webhook-get request : ' + req + req.query);

    	let responseObj = odController.getDate(req, res);

    	return (responseObj); 
    	// res.send(":D:D:D:D");
	});

// registerUser Route
	//app.route('/').post(odController.processRequest);
	app.post('/webhook-post', function(req, res) {
		console.log("got a post");

		if (req.body.queryResult.action == "date") {
    		odController.getDate(req, res);
  		} 
  		if (req.body.queryResult.action == "address") {
    		odController.getLocation(req, res);
  		}
  		if (req.body.queryResult.action == "shippingmethod") {
    		odController.getShipping(req, res);
		}

	});

	//app.route('/').put(odController.changeRequest);
};


