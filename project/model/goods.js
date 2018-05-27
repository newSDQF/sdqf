var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var  _goods=new Schema({
	goodsId:{
		type:String,
		unique:true
	},
	goodsName:String,
	goodsPrice:Number,
	goodsCover:String,//商品封面
	goodsDesc:String,//商品描述
	goodsCount:Number,//商品数量
	goodsPhotos:Array,//商品图片
	createTime:Date,//创建时间
	publicTime:Date,//上架时间
	lastModified:Date,
	createor:String,
	isPublic:Boolean//是否上架
})
module.exports=mongoose.model("goods",_goods);