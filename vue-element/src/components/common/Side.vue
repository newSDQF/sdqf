<template>
  <div id="side">
  
       <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus.js"
export default {
  data () {
    return {
      collapse:false,
      items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'hello',
                        title: 'hell word'
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'table',
                        title: '表格',
                       
                    },
                    {
                        icon: 'el-icon-date',
                        index: '3',
                        title: '表单相关',
                        subs: [
                            {
                                index: 'form',
                                title: '基本表单'
                            },
                            {
                                index: 'editor',
                                title: '富文本编辑器'
                            },
                            {
                                index: 'upload',
                                title: '文件上传'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'chart',
                        title: 'schart图表'
                    },
                    {
                        icon: 'el-icon-rank',
                        index: 'drag',
                        title: '拖拽列表'
                    },
                    {
                        icon: 'el-icon-warning',
                        index: 'permission',
                        title: '权限测试'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
              
                return this.$route.path.replace('/','');
            }
        },
         created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
}
</script>

<style scoped>
  #side{
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
  }
  .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    #side > ul {
        height:100%;
        background-color: rgb(50, 65, 87);
    }
</style>
