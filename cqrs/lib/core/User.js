"use strict";


var Actor=require("cqrs").Actor;

class  User extends Actor{
	constructor(data){
		super({
			loginname:data.loginname,
			password:data.password,
			regisitertime:Date.now(),
			email:data.email||null,
			num:0,
			nickname:data.loginname
		})
	}
	update(data,service){
		if(data.email!==""){
			service.apply("updateEmail",data.email)
		}
		if(data.nickname!==""){
			service.apply("updateNickName",data.nickname)
		}
	}
	updatePwd(data,service){
		service.apply("updatePassWord",data.password)
	}
	plus(data,service){
		service.apply("plus",data.num)
	}
	when(event){

		switch(event.name) {
			case 'updateEmail':
					this._data.email=event.data;
				break;
			case 'updateNickName':
					this._data.nickname=event.data;
				break;
			case 'updatePassWord':
					this._data.password=event.data;
					break;
			case 'plus':
				this._data.num+=event.data;
				break;
		}

	}
}

module.exports=User;