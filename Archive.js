/**
function getDetails(req, res) {
	let parameters = req.body["result"];
	console.table(parameters);
	console.log('getDetails: orderid: ' + parameters["orderid"]);
	//console.log(parameters["username"]);

	//let orderToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.OrderDetails ? req.body.result.parameters.OrderDetails : 'Unknown';
	//OrderDetails.findOne({"orderid":req.body.result.parameters.orderid},function(err,orderExists)
    //OrderDetails.find({orderid: parameters["orderid"]}, function(err, orderExists) {
    OrderDetails.findOne({orderid:parameters["orderid"]}, function(err, orderExists) {
    	console.log('findOne: orderid: ' + parameters["orderid"]);
        if (err) {
        	return res.json({
              speech: 'Something went wrong!',
              displayText: 'Something went wrong!',
              source: 'order info 1'
          });
        }
        
        //while (orderExists.orderid === undefined) {
        //	sleep.sleep(100);
        //}

		if (orderExists) {
        	//console.log(orderExists);
          	return res.json({
                speech: orderExists.username,
                displayText: orderExists.username,
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
*/