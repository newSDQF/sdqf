"use strict";

const plus=require("../lib/core/listener/plus");
var Domain=require("cqrs");
	// var domain=new Domain();
	var  Topic=require("../lib/core/Topic");
	var  User=require("../lib/core/User");
	var should=require("should")

	var domain=new Domain();
		plus(domain);
		domain.register(User).register(Topic);
		var userId;
		var topicId;
			domain.create("User",{loginname:"liutianfu",password:"123"}).then(json=>{
				userId=json.id;
			});
			

	describe("Plus",function(){

		
		it("#plus create",function(done){
		
			// console.log(userId)
			domain.create("Topic",{authorId:userId,title:"我是一个标题",body:"我是内容哈哈哈哈"},function(err,data){
				setTimeout(function(){
					domain.get("User",userId,function(data){
						data.num.should.eql(3)
						done()
					})

				
				},200)

			


			})


		})

	})
