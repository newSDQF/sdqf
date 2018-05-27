var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var  _ad=new Schema({
	
	adDesc:String,
	adUrl:String,
	adCover:String,
	addTime:Date
	

})
module.exports=mongoose.model("ad",_ad);