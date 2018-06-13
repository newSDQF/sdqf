<template>
  <div class="hello">
     <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-loading"></i> 表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
   <article>
       
    <el-table :data="tableData"  
    tooltip-effect="dark"
      style="width:100%;min-height:200px">
         <el-table-column
        label="标题"
        align="center"
        sortable
        prop="title"
        ></el-table-column>
         <el-table-column
        label="内容"
        align="center"
        sortable
        prop="body"
        >
          <template slot-scope="scope">{{scope.row.body|substring}}</template>
        </el-table-column>
         <el-table-column
        label="类别"
        width="120"  
        align="center"
        sortable
        prop="type"
        ></el-table-column>
         <el-table-column
        label="作者"
        width="120"  
        align="center"
        sortable
        prop="author"
        ></el-table-column>
          <el-table-column
        label="时间"
        width="120"  
        align="center"
        sortable
        prop="publicTime"
        ></el-table-column>


    </el-table>
        <button @click="add(msg)"> aaaa</button>
            <span v-pre>{{ this will not be compiled }}</span>
                <h1>manage-system</h1>
                <p>基于Vue.js 2.x系列 + Element UI 的后台管理系统解决方案</p>
                <h2>前言</h2>
                <p>用了Vue + Element组件库做了个简单后台管理系统的基本框架 ，icon,表格，表单等这些在后台管理系统中很常见的设计。</p>
                <p>该方案作为一套多功能的后台框架模板，适用于绝大部分的后台管理系统（Web Management System）开发。基于vue.js,使用vue-cli脚手架快速生成项目目录，引用Element UI组件库，方便开发快速简洁好看的组件。</p>
                <h2>功能</h2>
                <el-checkbox disabled checked>hello vue，在离开当前路由会提醒你是否离开</el-checkbox>
                <br>
                <el-checkbox disabled checked>登录/注销(不做验证)</el-checkbox>
                <br>
                <el-checkbox disabled checked>表格</el-checkbox>
                <br>
                <el-checkbox disabled checked>表单</el-checkbox>
                <br>
                <el-checkbox disabled checked>图表</el-checkbox>
                <br>
                <el-checkbox disabled checked>富文本编辑器</el-checkbox>
                <br>
                <el-checkbox disabled checked>markdown编辑器</el-checkbox>
                <br>
                <el-checkbox disabled checked>图片拖拽/裁剪上传</el-checkbox>
                <br>
                <el-checkbox disabled checked>支持切换主题色</el-checkbox>
                <br>
                <el-checkbox disabled checked>列表拖拽排序</el-checkbox>
                <br>
            </article>
  </div>
</template>

<script>
 
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      tableData:[],
      loading:true
    }
  },
  methods:{

    add:function(msg){
      console.log(msg)
      this.$router.push("/")
    }
  },
  mounted:function(){
    this.$axios.get('./ts/story/list').then(data=>{
      console.log(data.data.story);

      this.tableData=data.data.story;
      // this.loading=false;
    })
  },
    beforeDestroy:function(){
      console.log(this.$data)
    },
    destoryed:function(){

    },
    beforeRouteLeave (to, from , next) {

      next(false);
      this.$confirm("确定离开当前页?").then(_=>{
        if(_==='confirm'){
          next()
        }else{
          next(false)
        }
      });
      // console.log(r)
    // const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    //   if (answer) {
    //     next()
    //   } else {
    //     next(false)
    //   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
[v-cloak]{
  display: none;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
 .hello article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .hello article h1{
        font-size:32px;
        padding-bottom: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .hello article h2 {
        margin: 24px 0 16px;
        font-weight: 600;
        line-height: 1.25;
        padding-bottom: 7px;
        font-size: 24px;
        border-bottom: 1px solid #eee;
    }
    .hello article p{
        margin-bottom: 15px;
        line-height: 1.5;
    }
    .hello article .el-checkbox{
        margin-bottom: 5px;
    }
</style>
