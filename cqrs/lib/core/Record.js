"use strict";

var Actor=require("cqrs").Actor;

class UserRecorder extends Actor{
	constructor(data){
		super({
			id："recorderid",
			loginname_map:{},
			email_map:{}
		})
	}
	record(data,service){
		service.apply("record",data)
	}
	when(event){
		switch(event.name) {
			case "record":
				this._data.loginname_map[event.data.loginname]=event.data;
				this._data.email_map[event.data.email]=event.data
				break;
			
		}
	}
}
module.exports=UserRecorder;