"use strict";

var Actor=require("cqrs").Actor;


class Topic extends Actor{

	constructor(data){

		super({
			authorId:data.authorId,
			title:data.title,
			body:data.body,
			createtime:Date.now(),
			updatetime:Date.now(),
			reader:0,//阅读人数
			fine:false,//加精
			top:false//置顶
		})
	}
	top(data,server){
		server.apply("top")
	}
	untop(data,server){
		server.apply("untop")
	}
	fine(data,server){
		server.apply("fine")
	}
	unfine(data,server){
		server.apply("unfine")
	}
	reader(data,server){
		server.apply("reader")
	}
	update(data,server){
		server.apply("update",{title:data.title,body:data.body})
	}
	when(event){
		switch(event.name) {
			case "top":
				this._data.top=true;
				break;
			case "untop":
				this._data.top=false;
				break;
			case "fine":
				this._data.fine=true;
			break;
			case "unfine":
				this._data.fine=false;
			break;
			case "reader":
				++this._data.reader;
			break;
			case "update":
				this._data.title=event.data.title;
				this._data.body=event.data.body;
				this._data.updatetime=Date.now();
			break;

		}
	}

}

module.exports=Topic;