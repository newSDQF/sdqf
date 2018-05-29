var express = require('express');
var router = express.Router();
var Goods = require("../model/goods");
var GoodsType = require("../model/goodstype");
var multer = require("multer");

var upload = multer({ dest: 'uploads/' });

var cpUpload = upload.fields([{ name: 'goodsCover', maxCount: 1 }, { name: 'goodsPhotos', maxCount: 9 }]);

var single = upload.single("goodsCover");
var uploadArray = upload.array("goodsPhotos", 9);

/* GET users listing. */
//商品列表页
router.get('/', async function(req, res) {
    res.locals.user = req.session.user || undefined;

    var rs=await GoodsType.find();
    res.locals.typeList=rs;
    

    if(req.session.user==""){
    	return res.redirect("/user/login")
    }
    if(req.session.user.userName!="admin"){
        return res.redirect("user/login")
    }
    if(req.query.isPublic=="false"){
    	Goods.find({isPublic:req.query.isPublic,isUse:{"$ne":"false"}},null,{ '_id': -1 },function(err,data){
    		console.log(data)
    		res.render("goods", { "goodsList": data })
    	});
    	
    }else if(req.query.isPublic=="true"){
    	var goodsList = await Goods.find({isPublic:Boolean(req.query.isPublic),isUse:{"$ne":"false"}}).sort({ '_id': -1 });
    	res.render("goods", { "goodsList": goodsList })
    	
    }else{
    	var goodsList = await Goods.find({isUse:{"$ne":"false"}}).sort({ '_id': -1 });
    	res.render("goods", { "goodsList": goodsList})
    }
    
});

//添加商品类别
router.post("/typeadd",  async function(req, res) {

    var goodsType=new GoodsType({
        typeName:req.body.typeName,
        addTime:new Date()
    })
    if(req.session.user.userName!="admin"){
        return res.send("你不是管理员")
    }

    try {
         await goodsType.save();
         return res.send({status:0,msg:"添加成功"})
    } catch(e) {
        // statements
         res.send({status:1,msg:"添加失败"})
    }
   

})

//添加商品
router.post("/add", cpUpload, async function(req, res) {

    console.log(req.files)
    var date = new Date();
    var goodsData = new Goods({
        goodsId: date.getTime(),
        goodsTypeName:req.body.goodsTypeName,
        goodsName: req.body.goodsName,
        goodsPrice: req.body.goodsPrice, //商品价格
        goodsCover: req.files['goodsCover'][0].filename, //商品封面
        goodsDesc: req.body.goodsDesc, //商品描述
        goodsCount: req.body.goodsCount, //商品数量
        goodsPhotos: req.files['goodsPhotos'], //商品图片
        createTime: date.toLocaleDateString() + " " + date.toLocaleTimeString(), //创建时间
        lastModified: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
        createor: "admin", //创建者名称
        isPublic: false
    })
    if(req.session.user.userName!="admin"){
        return res.send("你不是管理员")
    }

    try {
        var result = await goodsData.save();
        res.send({ status: 0, msg: "添加成功" })
    } catch (err) {
        console.log(err)
        res.send({ status: 1, msg: "添加失败" })
    }


})
router.get("/edit", async function(req, res) {
    if (!req.session.user) {
        return res.redirect("/user/login")
    }
    if (req.query.id == "") {
        return res.redirect("/goods")
    }
    if(req.session.user.userName!="admin"){
        return res.send("你不是管理员")
    }
    //获取修改的数据
    var goodsInfo = await Goods.findOne({ _id: req.query.id });

    res.render("edit", { "goodsInfo": goodsInfo });

})
//编辑商品信息
router.post("/edit", function(req, res) {
    console.log(req.body)
    if (!req.session.user) {
        return res.redirect("/user/login")
    }
    var date = new Date();
    var {
        goodsId,
        goodsName,
        goodsPrice, //商品价格
        goodsDesc, //商品描述
        goodsCount //商品数量
    } = req.body;

    var lastModified = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    var updates = { "$set": { goodsName: goodsName, goodsPrice: goodsPrice, goodsDesc: goodsDesc, goodsCount: goodsCount, lastModified: lastModified } }
    Goods.update({ _id: goodsId }, updates, function(err, data) {
        if (data.n > 0) {
            res.send({ status: 0, msg: "修改成功" })
        } else {
            res.send({ status: 1, msg: "修改失败" })
        }
    })

})
//删除商品
router.get("/goodsDel", async function(req, res) {
    if (!req.session.user) {
        return res.redirect("/user/login")
    }
    if (req.query.id == "") {
        return res.redirect("/goods")
    }
    //获取修改的数据
    var goodsInfo = await Goods.update({ _id: req.query.id },{"$set":{isUse:false,isPublic:false}});

    res.redirect("back");

})


//切换封面
router.post("/cover", single, async function(req, res) {
     if (!req.session.user) {
        return res.redirect("/user/login")
    }
    var date = new Date();
    var {
        goodsId
    } = req.body;
    var lastModified = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    var updates = { "$set": { goodsCover: req.file.filename, lastModified: lastModified } }
    Goods.update({ _id: goodsId }, updates, function(err, data) {
        if (data.n > 0) {
            res.send({ status: 0, msg: "修改成功" })
        } else {
            res.send({ status: 1, msg: "修改失败,该商品不存在" })
        }
    })

})
//添加详情图
router.post("/addpicture", uploadArray, function(req, res) {
     if (!req.session.user) {
        return res.redirect("/user/login")
    }
    // console.log()
    var date = new Date();

    var {
        goodsId

    } = req.body;
    var goodsPhotos = req.files;

    Goods.findOne({ _id: goodsId }, function(err, data) {
        // console.log(data)
        // console.log(goodsPhotos)
        goodsPhotos.forEach(item => {
            data.goodsPhotos.push(item);
        })
        try {
            data.save();
            res.send({ status: 0, msg: "上传成功" })
        } catch (err) {
            res.send({ status: 1, msg: "上传失败", err: err })
        }


    })


})

//删除详情图片单张
router.post("/removeimg", function(req, res) {
     if (!req.session.user) {
        return res.redirect("/user/login")
    }
    var date = new Date();
    var {
        goodsId,
        url,
    } = req.body;
    var lastModified = date.toLocaleDateString() + " " + date.toLocaleTimeString();


    Goods.findOne({ _id: goodsId }, function(err, data) {

        var doc = data.goodsPhotos.filter((item) => {
            if (item.filename === url) {

            } else {
                return item;
            }
        });
        data.set("goodsPhotos", doc);

        data.save();
        res.send({ status: 0, msg: "删除成功" })
    })

})
//设置上架下架
router.post("/public", async function(req, res) {
     if (!req.session.user) {
        return res.redirect("/user/login")
    }
    var date = new Date();
    var goodsData = {
        lastModified: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
        isPublic: req.body.isPublic
    };
    if (req.body.isPublic) {
        //如果是上架，添加上架时间
        goodsData.publicTime = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    }
    var updates = { '$set': { 'publicTime': goodsData.publicTime, 'lastModified': goodsData.lastModified, 'isPublic': goodsData.isPublic } }; //将用户名更新为“tiny” 

    Goods.update({ _id: req.body.goodsId }, updates, function(err, data) {
        if (data) {
            console.log(data)
            if (req.body.isPublic) {
                res.send({ status: 0, msg: "上架成功" })
            } else {
                res.send({ status: 0, msg: "下架成功" })
            }
        }
    })

})

//设置推荐
router.post("/recommend", async function(req, res) {

     if (!req.session.user) {
        return res.redirect("/user/login")
    }

    var date = new Date();
    var goodsData = {
        lastModified: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
        isRecommend: req.body.isRecommend
    };

   
    var updates = { '$set': {'lastModified': goodsData.lastModified, 'isRecommend': goodsData.isRecommend } }; //将用户名更新为“tiny” 

    Goods.update({ _id: req.body.goodsId }, updates, function(err, data) {
        if (data) {
            console.log(data)
            if (req.body.isPublic) {
                res.send({ status: 0, msg: "设置商品推荐成功" })
            } else {
                res.send({ status: 0, msg: "取消设置商品推荐" })
            }
        }
    })

})


//api
router.get("/getGoods",async function(req,res){

  
     var goodsList = await Goods.find({isPublic:true}).sort({ '_id': -1 });
   
  
    res.send({status:0,goodsList: goodsList})
})
//api
router.get("/getRecommend",async function(req,res){

  
     var goodsList = await Goods.find({isPublic:true,isRecommend:true}).sort({ '_id': -1 });
   
  
    res.send({status:0,goodsList: goodsList})
})


router.get("/getDetail", async function(req, res) {
  
    res.locals.user=req.session.user||"";
    //获取修改的数据
    var goodsInfo = await Goods.findOne({ _id: req.query.id });

    res.render("html/goodsdetail",{goodsInfo: goodsInfo });

})


router.get("/type",async function(req,res){

    try {
        var typeList=await GoodsType.find();
        res.send({ status:0,typeList: typeList });
    } catch(e) {
        res.send({ status:1,typeList:[],msg:"数据错误" })
    }
   

})





module.exports = router;