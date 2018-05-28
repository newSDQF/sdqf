var express = require('express');
var router = express.Router();

var Car=require("../model/car");
var Goods=require("../model/goods");


/* GET users listing. */
router.get('/',  function(req, res) {
  
  if(!req.session.user){
  	return res.redirect("/")
  }
 res.locals.user=req.session.user||"";
	// try {

	Car.find({customerId:req.session.user._id}).populate("goodsId").exec(function(err,data){
		console.log(data)
		res.render("html/carlist",{carList:data})

	})




});
router.post('/go_car', async function(req, res) {
  
  if(!req.session.user){
  	return res.send({status:1,msg:"请登陆"})
  }

  var rs=await Goods.findOne({_id:req.body.goodsId});

  if(rs.count<=0){
  	return res.send({status:1,msg:"抱歉，该商品没有库存了"})
  }

  var date=new Date();
  var car=new Car({
  	goodsId:req.body.goodsId,
	goodsName:req.body.goodsName,
	goodsPrice:req.body.goodsPrice,
	goodsCover:req.body.goodsCover,
	addTime:date.toLocaleDateString()+" "+date.toLocaleTimeString(),
	customerId:req.session.user._id,
	customerName:req.session.user.userName
  })
	
	await car.save();
	res.send({status:0,msg:"添加购物车成功"})



});
router.get('/remove_car', async function(req, res) {
  
  if(!req.session.user){
  	return res.redirect("/user/login")
  }
var rs=await Car.remove({_id:req.query.carId});
if(rs.n>0){
	res.redirect("back")
}else{
	res.send({status:0,msg:"移除失败，改记录不存在，请刷新后再尝试"})
}
	



});

module.exports = router;
