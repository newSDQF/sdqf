var express = require('express');
var router = express.Router();


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



module.exports = router;