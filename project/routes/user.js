var express = require('express');
var router = express.Router();
var User=require("../model/user");
var multer=require("multer");
var fs=require("fs");

var upload=multer({
	dest:"headIcon",
});
var single=upload.single("headIcon");

/* GET users listing. */
//获取用户列表
router.get('/', function(req, res) {
	res.locals.user=req.session.user||"";
	console.log(req.session.user)

	if(!req.session.user){
		return res.redirect("/user/login");
	}
	var id=req.query.userId||req.session.user;
	if(id==undefined||id==""){
		return res.send({status:1,msg:"请登陆"})
	}
	User.findOne({_id:id},function(err,data){
		if(err){
			console.log(err)
		}
		if(data){
			console.log(data);
			res.render("user",{userData:data})
		}else{
			res.send("该用户不存在")
		}
	})

});
//用户上传头像
router.post("/head",single,function(req,res){
	console.log(req.session)
	var id=req.body.userId;
	console.log(req.file)
	if(!req.session.user){
		return res.redirect("/user/login");
	}
	var updates={'$set':{"headIcon":req.file.filename}};

	User.update({_id:id},updates, function(err,data){
		req.session.user.headIcon=req.file.filename;
		if(data.n>0){
			
			res.send({status:0,msg:"修改成功"})
		}else{
			res.send({status:1,msg:"修改失败"})
		}
	})
})

//提交用户修改
router.post('/edit',  function(req, res) {
	console.log(req.body)
	if(!req.session.user){
		return res.redirect("/user/login");
	}
	var id=req.body.userId;
	var userData={
		reallyName:req.body.reallyName,
		age:req.body.age,
		sex:req.body.sex,
		describle:req.body.describle,
		telphone:req.body.telphone
	};
	User.update({_id:id},{'$set':{"telphone":userData.telphone,"reallyName":userData.reallyName,"sex":userData.sex,"age":userData.age,"describle":userData.describle}}
		,function(err,data){
		if(err){
			console.log(err)
		}
		if(data.n>0){
			return res.send({status:0,msg:"修改成功"})
		}else{
			return res.send({status:1,msg:"修改失败，用户不存在"})
		}
	})

});
//删除自己用户，或者管理员删除用户
router.post('/del', function(req, res) {
	console.log(req.session);
	var username=req.session.user.userName||"";
	var id=req.body.userId;
	if(!req.session.user){
		return res.redirect("/user/login");
	}
	if(username!="admin")
	{
		console.log("aaa");
		return res.send({status:1,msg:"你不是管理员或者你没有权限修改"})
	}

	User.remove({_id:id},function(err,data){
		if(err){
			console.log(err)
		}
		if(data.n>0){
			res.send({status:0,msg:"删除成功"});
		}else{
			res.send({status:1,msg:"删除失败，用户不存在,请刷新后重试"})
		}
	})

});
//用户登陆
router.get("/login",function(req,res){
	
	res.render("login")
})
//用户登陆
router.post("/login",function(req,res){

	var userData={
		userName:req.body.userName,
		passWord:req.body.passWord
	}
	User.findOne({userName:userData.userName},function(err,data){

		if(err){
			console.log(err)
		}
		if(data){
			if(data.passWord==userData.passWord){

				res.locals.user=req.session.user=data;
				res.redirect("/");
			}else{
				res.send("密码不正确")
			}
		}else{
			res.send("用户名不存在")
		}


	})
})
//用户注册
router.get("/reg",function(req,res){
	if(req.session.user){
		//用户已登陆,直接跳转回首页
		return res.redirect("/")

	}
	res.render("reg")
})

//用户注册
router.post("/reg",function(req,res){
	var date=new Date();

	var userData=new User({
		userName:req.body.userName,
		passWord:req.body.passWord,
		registerTime:date.toLocaleDateString()+" "+date.toLocaleTimeString(),
		headIcon:null,
		describle:null,
		age:null,
		sex:null
	})

	User.findOne({userName:userData.userName}, async function(err,data){
		if(err){
			console.log(err)
		}
		if(data){
			res.send({status:1,msg:"该用户已被注册"})
		}else{
			if(userData.passWord===req.body.rePassWord){
				await userData.save();
				res.redirect("/user/login")
			}else{
				res.send("密码不正确")
			}
		}
	})
	
})
//用户登出
router.get("/logout",function(req,res){
	req.session.user=null;
	res.locals.user=null;
	res.redirect("/")
})




module.exports = router;
