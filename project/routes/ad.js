var express = require('express');
var router = express.Router();

var Ad=require("../model/ad");
var multer = require("multer");

var upload = multer({ dest: 'uploads/' });
var single = upload.single("adCover");


/* GET users listing. */
router.get('/',  function(req, res) {
  
  if(!req.session.user){
  	return res.redirect("/user/login")
  }
 	res.locals.user=req.session.user||undefined;
	// try {

	Ad.find({},function(err,data){

		res.render("ad",{adList:data})
	})

});
router.post('/add', single,  function(req, res) {

  if(!req.session.user){
  	return res.redirect("/user/login")
  }
  var date=new Date();
	var ad=new Ad({
		adDesc:req.body.adDesc,
		adUrl:req.body.adUrl,
		adCover:req.file.filename,
		addTime:date.toLocaleDateString()+" "+date.toLocaleTimeString()
	})
	 ad.save();
	
	res.send({status:0,msg:"添加成功"})
	
	

	

});

router.get('/del', async function(req, res) {
  
  if(!req.session.user){
  	return res.redirect("/user/login")
  }
	var rs=await Ad.remove({_id:req.query.adId});
	if(rs.n>0){
		res.redirect("back")
	}else{
		res.send({status:0,msg:"移除失败，改记录不存在，请刷新后再尝试"})
	}
	
});


//api 

router.get('/list',  function(req, res) {

 

	Ad.find({},function(err,data){

		res.send({status:0,adList:data})
	})

});


module.exports = router;
