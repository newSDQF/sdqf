var express = require('express');
var router = express.Router();

var  Order=require("../model/order");


//
router.get("/index",function(req,res){


 	res.locals.user=req.session.user||"";
 	if(req.session.user){
 		if(req.session.user.userName=="admin")
 		{
 			res.locals.user=req.session.user="";
 		}
	}

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
 	Order.find({customerId:req.session.user._id,goodsModel:{"$ne":undefined},isActive:{"$ne":false}}).sort({ '_id': -1 }).populate("goodsModel").exec(function(err,data){
		console.log(data.length)
		res.render("html/orderlist",{orderList:data})

	})
 	
   
})

router.get("/delorder", function(req,res){

 	res.locals.user=req.session.user||"";
 	if(!req.session.user){
 		return res.redirect("/")
 	}
 // 	Order.update({goodsModel:{"$eq":undefined}}, {"$set":{goodsModel:"5b0b6498353cc6264cd0a49a"}}, { multi: true }, function (err, data) {
	//  	console.log(data)
	// });
 	Order.update({_id:req.query.orderId},{"$set":{isActive:false}},function(err,data){
		console.log(data.length)
		res.redirect("../api/orderlist")

	})
 	
   
})
router.get("/orderdetail", function(req,res){

 	res.locals.user=req.session.user||"";
 	if(!req.session.user){
 		return res.redirect("/")
 	}
	 Order.findOne({ _id: req.query.orderId }).populate("goodsModel").exec(function(err,data){

    
    	if (data) {
        	res.render("html/orderdetail", { orderInfo: data });
	    } else {
	        res.send("该订单不存在或已经被删除");
	    }
    });
 	
   
})
router.get("/logout", function(req,res){

 	res.locals.user="";
 	req.session.user="";
 	res.redirect("../api/index")
 	
   
})




module.exports = router;