// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "babel-polyfill";
import axios from 'axios';

Vue.prototype.$axios=axios;
Vue.use(ElementUI)

//自己定义的全局的过滤器
Vue.filter('substring', function (value) {
  // 返回处理后的值
  var str=value.substring(0,100);
  return "{{"+str+"}}"
})


/* eslint-disable no-new */
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
	//检测是否登陆
         const role = localStorage.getItem('userName')?localStorage.getItem('userName'):false;
       

         if(role)
         {
         		 if(navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor'){
		            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
		                confirmButtonText: '确定'
		            });
		        }else{
		        	if(to.path==="/permission"){
		        		
			             role != 'admin' ?  Vue.prototype.$alert("你不是管理员") : next();
			         }else{
			         	 next();
			         }
    
        		}

         }else{
         	if(to.path==="/login"){
         		next()
         	}else{
         		next('/login')
         	}
         	
         }


    
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
