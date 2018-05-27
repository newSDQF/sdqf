var mongoose=require("mongoose");
var Schema=mongoose.Schema;


var _user=new Schema({
	userName:{
		type:String,
		unique:true
	},
	reallyName:String,
	passWord:String,
	sex:String,
	age:Number,
	registerTime:String,
	telphone:String,
	describle:String,
	headIcon:String
})

module.exports=mongoose.model("user",_user);