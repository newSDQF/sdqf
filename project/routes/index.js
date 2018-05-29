var express = require('express');
var router = express.Router();
var fs=require("fs");

var User=require("../model/user");
var Order=require("../model/order");

/* GET home page. */
router.get('/', function(req, res, next) {
	if(!req.session.user){
	return res.redirect("/user/login");
	}
 	res.locals.user=req.session.user||"";
 	if(req.session.user.userName!="admin"){
 		return res.redirect("user/login")
 	}

   res.redirect("/goods")
});


//获取商品图片接口
router.get("/uploads/:id",function(req,res){

	var rs=fs.createReadStream("uploads/"+req.params.id);
	 rs.pipe(res);

})
//获取用户头像接口
router.get("/head/:id",function(req,res){

	var rs=fs.createReadStream("headIcon/"+req.params.id);
	 rs.pipe(res);

})


router.get("/orderlist",async function(req,res){
	res.locals.user=req.session.user||"";

	if(!req.session.user){
		return res.redirect("/user/login");
	}
	if(req.session.user.userName!="admin"){
 		return res.redirect("user/login")
 	}
 	Order.find({goodsModel:{"$ne":undefined}}).sort({ '_id': -1 }).populate("goodsModel").exec(function(err,data){
		console.log(data.length)
		res.render('orderlist',{"orderList":data});

	})
	// var orderList=await Order.find().sort({"_id":-1});
  	
})
router.get("/userlist", async function(req,res){

	if(!req.session.user){
		return res.redirect("/user/login");
	}
	if(req.session.user.userName!="admin"){
 		return res.redirect("user/login")
 	}
	var rs=await User.find();
	res.render("userlist",{"userList":rs});
})

module.exports = router;
