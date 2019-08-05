'use strict';
var mongoose = require('mongoose');
var sleep = require('sleep');
var OrderDetails = require('../Models/ODModel');
var globalorderid = 0;
// var OrderDetails = mongoose.model('OrderDetails', orderDetailsSchema);

exports.processRequest = function(req, res) {
  if (req.body.queryResult.action == "date") {
    getDate(req,res)
  } 
  if (req.body.queryResult.action == "address") {
    getLocation(req,res)
  }
  if (req.body.queryResult.action == "shippingmethod") {
    getShipping(req,res)
  }
}

/**exports.changeRequest = function(req, res) {
  //if (req.body.result.action == "changedate") {
    //changeDate(req,res)
  //} 
  //if (req.body.result.action == "changeaddress") {
    //changeAddress(req,res)
  //} 
  if (req.body.result.action == "changeshippingmethod") {
    changeShipping(req,res);
  } 
}*/

//Return the scheduled delivery date
function getDate(req, res) {
  let parameters = req.body.queryResult.parameters;

  OrderDetails.findOne({orderid:parameters["orderid"]}, function(err, orderExists) {
    if (err) {
      return res.json({
        speech: 'Something went wrong!',
        displayText: 'Something went wrong!',
        source: 'order info 1'
      });
    }
    if (orderExists) {
      globalorderid = parameters["orderid"];
      return res.json({
        speech: "Your order is scheduled for " + orderExists.deliverydate + ". When would you like to reschedule your order for?",
        displayText: "Your order is scheduled for " + orderExists.deliverydate + ". When would you like to reschedule your order for?",
        source: 'order info 2'
      });
    } else {
      return res.json({
        speech: 'Sorry, we couldn\'t find your order',
        displayText: 'Sorry, we couldn\'t find your order',
        source: 'order info 3'
      });
    }
  });
}

//Return the scheduled shipping address
function getLocation(req, res) {
  let parameters = req.body.queryResult.parameters;

  OrderDetails.findOne({orderid:parameters["orderid"]}, function(err, orderExists) {
    if (err) {
      return res.json({
        speech: 'Something went wrong!',
        displayText: 'Something went wrong!',
        source: 'order info 1'
      });
    }
    if (orderExists) {
      globalorderid = parameters["orderid"];
      return res.json({
        speech: "Your current delivery address is " + orderExists.shippingaddress + ". Please enter the new address you want your package dropped off at.",
        displayText: "Your current delivery address is " + orderExists.shippingaddress + ". Please enter the new address you want your package dropped off at.",
        source: 'order info 2'
      });
    } else {
      return res.json({
        speech: 'Sorry, we couldn\'t find your order',
        displayText: 'Sorry, we couldn\'t find your order',
        source: 'order info 3'
      });
    }
  });
}

//Return the current shipping method
function getShipping(req, res) {
  let parameters = req.body.queryResult.parameters;

  OrderDetails.findOne({orderid:parameters["orderid"]}, function(err, orderExists) {
    if (err) {
      return res.json({
        speech: 'Something went wrong!',
        displayText: 'Something went wrong!',
        source: 'order info 1'
      });
    }
    if (orderExists) {
      globalorderid = parameters["orderid"];
      return res.json({
        speech: "Your current shipping method is " + orderExists.shippingmethod + ". What would you like to change your shipping method to?",
        displayText: "Your current shipping method is " + orderExists.shippingmethod + ". What would you like to change your shipping method to?",
        source: 'order info 2'
      });
    } else {
      return res.json({
        speech: 'Sorry, we couldn\'t find your order',
        displayText: 'Sorry, we couldn\'t find your order',
        source: 'order info 3'
      });
    }
  });
}

//Update the delivery date
/**function changeDate(req, res) {
  let date = req.body["result"];

  console.log(date)
  return res.json({
        speech: "Your order has been rescheduled for " + date + ". When would you like to reschedule your order for?",
        displayText: "Your order is scheduled for " + orderExists.deliverydate + ". When would you like to reschedule your order for?",
        source: 'order info'
  });
}*/

//Update shipping method
function changeShipping(req, res) {
  let shipping = req.body["result"];

  OrderDetails.findOne({orderid:10001}, function(err, orderExists) {
    if (err) {
      return res.json({
        speech: 'Something went wrong!',
        displayText: 'Something went wrong!',
        source: 'order info 1'
      });
    }
    if (orderExists) {
      req.shippingmethod = shipping.shippingmethod;
      console.log(orderExists);
      //orderExists.save();
      //res.json(orderExists);
      
      return res.json({
        speech: 'Change shipping' + req.shippingmethod,
        displayText: 'Change shipping' + req.shippingmethod,
        source: 'order info 2'
      });
    } else {
      return res.json({
        speech: 'Sorry, we couldn\'t find your order',
        displayText: 'Sorry, we couldn\'t find your order',
        source: 'order info 3'
      });
    }
  });
}

