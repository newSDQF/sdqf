var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var  _car=new Schema({
	
	goodsId:{
		type:Schema.ObjectId,
		ref:"goods",
	},
	addTime:Date,
	customerId:String,
	customerName:String

})
module.exports=mongoose.model("car",_car);