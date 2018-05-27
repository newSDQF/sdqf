var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var  _goodstype=new Schema({
	
	typeName:{
		type:String,
		unique:true
	},
	addTime:Date
	
})
module.exports=mongoose.model("goodstype",_goodstype);