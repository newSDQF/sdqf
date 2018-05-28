var express = require('express');
var router = express.Router();
var Order = require("../model/order");
var Car=require("../model/car");
var Goods=require("../model/goods")

/* GET users listing. */
router.get('/', async function(req, res) {
    if (!req.session.user) {
        return res.redirect("/user/login")
    }

    var id = req.query.orderId;

    Order.findOne({ _id: id }).populate("goodsModel").exec(function(err,data){

    	console.log(data);
    	if (data) {
        	res.render("order", { oderInfo: data });
	    } else {
	        res.send("该订单不存在或已经被删除");
	    }
    });
    
    


});


router.get("/del", function(req, res) {
    if (!req.session.user) {
        return res.redirect("/user/login")
    }
    Order.remove({ _id: req.query.orderId }, function(err, data) {
        if (data.n > 0) {
            res.redirect("/orderlist")
        } else {
            res.send("该订单不存在或已经被删除")
        }
    });


})
router.post("/addorder", async function(req, res) {
    if (!req.session.user) {
        return res.redirect("/user/login")
    }
    var date=new Date();

    var rs=await Goods.findOne({_id:req.body.goodsModel});

    if(rs.goodsCount<=0){
        return res.send({status:1,msg:"该商品已经售罄,库存不足"})
    }else{
        Goods.update({_id:req.body.goodsModel},{"$set":{goodsCount:rs.goodsCount-1}},function(err,data){

            if(err){
                console.log(err);
            }
            if(data.n>0){
                console.log("修改成功")
            }

        })
    }

    if(req.body.carId){
        //如果是从购物车进来，需要删除购物车记录
         var rs=await Car.remove({_id:req.body.carId});
         console.log(rs)
         if(rs.n===0){
            return res.send({status:1,msg:"改记录已被删除，请刷新后重试"});
         }
    }

    var order = new Order({
        goodsModel:req.body.goodsModel,
        isPay: false,
        createTime: date.toLocaleDateString()+" "+ date.toLocaleTimeString(),
        customerId: req.session.user._id, //用户id
        customerName: req.session.user.userName, //用户名字
        payWay: null, //支付方式微信支付,支付宝支付，线下支付
        payTime: null,
        isActive: true, //订单是否有效
        address: null, //收货信息
        telphone: null,
        userName: null,
        userDesc: null, //备注
        orderStatus:"0", //订单状态,0，1，0代表完成，1代表未完成
    })

    
   

    try {
    	var rs=await order.save();
    	
    	res.send({status:0,msg:"添加订单成功"})
    	
    } catch(e) {
    	// statements
    	res.send({status:1,msg:e})
    }
    

   




})

module.exports = router;