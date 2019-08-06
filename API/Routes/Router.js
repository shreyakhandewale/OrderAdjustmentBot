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
    	var orderid = req.query.orderid;
    	console.log('Received webhook-get request req : ' + req.originalUrl + ' req.query : ' + req.query + ' order id : ' + orderid);

    	let responseObj = odController.getDate(orderid, res);

    	return (responseObj); 
	});

// registerUser Route
	//app.route('/').post(odController.processRequest);
	app.post('/webhook-post', function(req, res) {
		console.log("got a post");
		var orderid = req.body.queryResult.parameters["orderid"];

		if (req.body.queryResult.action == "date") {
    		odController.getDate(orderid, res);
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


