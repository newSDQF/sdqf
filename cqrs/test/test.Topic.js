"use strict";

var  Topic=require("../lib/core/Topic");
var  User=require("../lib/core/User");
var Domain=require("cqrs");
var should=require('should');

describe("Topic",function(done){
	var domain=new Domain();

	domain.register(User).register(Topic);
	var userId;
	var topicId;
	it("#create Topic",  function(done){
		domain.create("User",{loginname:"liutianfu",password:"123"},function(err,json){
			userId=json.id;
			domain.create("Topic",{authorId:userId,title:"我是一个标题",body:"我是内容哈哈哈哈"},function(err,data){
				// console.log(data)
				topicId=data.id;
				domain.get("Topic",topicId,function(data){
					
					data.title.should.eql('我是一个标题')
					data.body.should.eql('我是内容哈哈哈哈')
					done()
				})
				
			})
			


		})
		
	})

	it("#update",  function(done){
	  domain.call(`Topic.${topicId}.update`,{title:"刘天福标题",body:"邮箱时675020659@qq.com"});
		domain.get("Topic",topicId).then(json=>{
				json.title.should.eql("刘天福标题")
				done()
			})
		
	})
	it("#reader",  function(done){
	  domain.call(`Topic.${topicId}.reader`);

	  domain.get("Topic",topicId).then(json=>{
		json.reader.should.eql(1)
		done()
	 	})
	})
	it("#fine",  function(done){
	  domain.call(`Topic.${topicId}.fine`);

	  domain.get("Topic",topicId).then(json=>{
		json.fine.should.eql(true)
		done()
	 	})
	})
	it("#unfine",  function(done){
	  domain.call(`Topic.${topicId}.unfine`);

	  domain.get("Topic",topicId).then(json=>{
		json.fine.should.eql(false)
		done()
	 	})
	})
	it("#top",  function(done){
	  domain.call(`Topic.${topicId}.top`);

	  domain.get("Topic",topicId).then(json=>{
		json.top.should.eql(true)
		done()
	 	})
	})
	it("#untop",  function(done){
	  domain.call(`Topic.${topicId}.untop`);

	  domain.get("Topic",topicId).then(json=>{
		json.top.should.eql(false)
		done()
	 	})
	})

})