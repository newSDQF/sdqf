"use strict";
var Domain=require("cqrs");
module.exports=function(domain){

	
	

//监听话题创建，
	var eventname=Domain.Alias().actorType("Topic").name('create').get();

	domain.on(eventname,function handle(event){
		console.log("event")
		domain.get("Topic",event.actorId).then(json=>{
			domain.get("User",json.authorId).then(function(data){})
			domain.call(`User.${json.authorId}.plus`,{num:3})
		})
		
	})






}