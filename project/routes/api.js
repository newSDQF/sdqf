var express = require('express');
var router = express.Router();

var  Order=require("../model/order");


//
router.get("/index",function(req,res){

 	res.locals.user=req.session.user||"";

   res.render("html/index")


})
router.get("/allgoods",function(req,res){

	console.log(req.query.name)
 	res.locals.user=req.session.user||"";

   res.render("html/allgoods")


})

//

router.get("/orderlist",async function(req,res){

 	res.locals.user=req.session.user||"";
 	if(!req.session.user){
 		return res.redirect("/")
 	}
 // 	Order.update({goodsModel:{"$eq":undefined}}, {"$set":{goodsModel:"5b0b6498353cc6264cd0a49a"}}, { multi: true }, function (err, data) {
	//  	console.log(data)
	// });
 	Order.find({customerId:req.session.user._id,goodsModel:{"$ne":undefined}}).populate("goodsModel").exec(function(err,data){
		console.log(data.length)
		res.render("html/orderlist",{orderList:data})

	})
 	
   
})



module.exports = router;