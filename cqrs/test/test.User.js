"use strict";

var  User=require("../lib/core/User");
var Domain=require("cqrs");
var should=require("should");

describe("User",function(done){
	var domain=new Domain();

	domain.register(User);
	var userId;
	it("#create", function(done){
		domain.create("User",{loginname:"liutianfu",password:"123"},function(err,data){
				
				userId=data.id;
				data.loginname.should.eql("liutianfu")
				data.password.should.eql("123")
				done()
		});
	
		
	})

	it("#update",  function(done){
	  domain.call(`User.${userId}.update`,{nickname:"刘天福",email:"675020659@qq.com"});

	  domain.get('User',userId).then(function(json){
	  			json.nickname.should.eql("刘天福")
				json.email.should.eql("675020659@qq.com")
	  		done()
	  })
		
		
	})
	it("#updatepassword",  function(done){
	  domain.call(`User.${userId}.updatePwd`,{password:"456789123"});

	  domain.get('User',userId).then(function(json){
	  	json.password.should.eql("456789123")
	  	done()
	  })
		
		
	})
	it("#plus self",function(done){
	  domain.call(`User.${userId}.plus`,{num:3});

	  // setTimeout(function(){
	  	domain.get('User',userId).then(function(json){
	  		// console.log(json)
		  	json.num.should.eql(3);
		  	done()
		  }).catch(err=>{
		  	console.log(err.stack)
		  })
	  // })
	  
		
		
	})
})