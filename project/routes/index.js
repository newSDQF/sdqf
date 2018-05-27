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

router.get("/data",function(req,res){
	res.send("data待开发。。。")
})
router.get("/orderlist",async function(req,res){
	if(!req.session.user){
		return res.redirect("/user/login");
	}

	var orderList=await Order.find();
  	res.render('orderlist',{"orderList":orderList});
})
router.get("/userlist", async function(req,res){

	if(!req.session.user){
		return res.redirect("/user/login");
	}
	var rs=await User.find();
	res.render("userlist",{"userList":rs});
})

module.exports = router;
