var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderDetailsSchema = Schema({
	username:{
 		type:String,
 		required:false
	},
	orderid:{
 		type:Number,
 		required:true
	},
	deliverydate:{
 		type:Date,
 		required:false
	},
	shippingaddress:{
 		type:String,
 		required:false
	},
	shippingmethod:{
 		type:String,
 		required:false
	}
});

// var OrderDetails = mongoose.model('OrderDetails', orderDetailsSchema);
// module.exports = OrderDetails;

module.exports = mongoose.model('OrderDetails', orderDetailsSchema, 'OrderDetails');
