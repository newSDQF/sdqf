var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var  _order=new Schema({
	
	goodsModel:{
		type:mongoose.Schema.ObjectId,
		ref:'goods'
	},
	isPay:Boolean,
	createTime:Date,
	customerId:String,//用户id
	customerName:String,//用户名字
	payWay:String,//支付方式
	payTime:Date,
	isActive:Boolean,//订单是否有效
	address:String,//收货信息
	telphone:String,
	userName:String,
	userDesc:String,//备注
	orderStatus:String//订单状态

})
module.exports=mongoose.model("order",_order);