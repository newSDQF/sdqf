import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/page/HelloWorld'
import Home from '@/components/common/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:"index",
      component: Home,
      children:[
      	{
      		path:"/hello",
      		name:"hello",
      		meta:"我是一个帅比",
      		component:resolve=>require(['../components/page/HelloWorld.vue'], resolve)
      	},
      	{
      		path:"/permission",
      		name:"permission",
      		meta:"permission",
      		component:resolve=>require(['../components/page/Pession.vue'], resolve)
      	},
      	{
      		path:"/table",
      		name:"basetable",
      		meta:"basetable",
      		component:resolve=>require(['../components/page/BaseTable.vue'], resolve)
      	},
      	{
      		path:"/form",
      		name:"form",
      		meta:"form",
      		component:resolve=>require(['../components/page/BaseForm.vue'], resolve)
      	},
      	{
      		path:"/editor",
      		name:"editor",
      		meta:"editor",
      		component:resolve=>require(['../components/page/VueEdit.vue'], resolve)
      	},
      	{
      		path:"/chart",
      		name:"chart",
      		meta:"chart",
      		component:resolve=>require(['../components/page/BaseChart.vue'], resolve)
      	}
      ]
    },
     {
      path: '/login',
     component:resolve=>require(['../components/page/Login.vue'], resolve)
    }
  ]
})
