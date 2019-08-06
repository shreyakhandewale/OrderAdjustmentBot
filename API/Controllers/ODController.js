'use strict';
var mongoose = require('mongoose');
var sleep = require('sleep');
var OrderDetails = require('../Models/ODModel');
var globalorderid = 0;

// var OrderDetails = mongoose.model('OrderDetails', orderDetailsSchema);

/**
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
**/

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
exports.getDate = function(orderid, res) {
  
  console.log('getDate() : req : orderid : ' + orderid);
  
  res.setHeader('Content-Type', 'application/json');

  OrderDetails.findOne({'orderid' : orderid}, function(err, orderExists) {
    if (err) {
      //console.log("error")
      return res.json({
        "fulfillmentText":"Something went wrong!",
        // "fulfillmentMessages":[{"text": {"text": "Something went wrong!"}}],
        "source": 'order info 1'
      });
    }
    if (orderExists) {
      //console.log("orderExists")
      globalorderid = orderid;
      return res.json({
        "fulfillmentText": "Your order is scheduled for " + orderExists.deliverydate + ". When would you like to reschedule your order for?",
        // "fulfillmentMessages": [{"text": {"text": [orderExists.deliverydate] + ". When would you like to reschedule your order for?"}}],
        "source": "order info 2"
      });
    } else {
      //console.log("couldn't find order")
      return res.json({
        "fulfillmentText": "Sorry, we couldn't find your order : " + orderid,
        // "fulfillmentMessages": [{"text": {"text": "Sorry, we couldn't find your order"}}],
        "source": "order info 3"
      });
    }
  });
}

//Return the scheduled shipping address
exports.getLocation = function(req, res) {
  
  let parameters = req.body.queryResult.parameters;
  console.log('getDate() : req : orderid : ' + req.body.queryResult.parameters["orderid"] + parameters);
  
  res.setHeader('Content-Type', 'application/json');


  OrderDetails.findOne({'orderid' : parameters["orderid"]}, function(err, orderExists) {
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
exports.getShipping = function(req, res) {

  let parameters = req.body.queryResult.parameters;
  console.log('getDate() : req : orderid : ' + req.body.queryResult.parameters["orderid"] + parameters);
  
  res.setHeader('Content-Type', 'application/json');

  OrderDetails.findOne({'orderid' : parameters["orderid"]}, function(err, orderExists) {
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
exports.changeShipping = function(req, res) {
  // let shipping = req.body["result"];


  let parameters = req.body.queryResult.parameters;
  console.log('getDate() : req : orderid : ' + req.body.queryResult.parameters["orderid"] + parameters);
  
  var shipping = parameters["result"];
  res.setHeader('Content-Type', 'application/json');

  OrderDetails.findOne({'orderid' : parameters["orderid"]}, function(err, orderExists) {
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

