'use strict';
var express = require('express');
module.exports = function(app) {
  	var odController = require('../Controllers/ODController');
	var apiRoutes =  express.Router();

	app.get('/',function(req,res) {
    	res.send(req.body);
	});

// registerUser Route
	app.route('/').post(odController.processRequest);

	app.route('/').put(odController.changeRequest);
};


