"use strict";
var Domain=require("cqrs");
module.exports=function(domain){

	
	


	var eventname=Domain.Alias().actorType("User").name('create').get();

	domain.on(eventname,function handle(event){
		
		domain.call("UserRecorder.recordid.record",event.data)
		
	})






}