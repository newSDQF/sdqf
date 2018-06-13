<template>
  <div id="header" class="header">
       <div class="collapse-btn">
          
              <div class="icon-wrap">
                <i class="el-icon-menu"  @click="collapseChage" ></i>
           
                <div class="logo" style="display:inline-block" size="small">管理系统</div> 
                 <!-- <el-button type="primary" @click="handleClose">弹窗</el-button>     -->
              </div>   
       
           
               <el-dropdown trigger="click" @command="handleCommand">
                  <span class="el-dropdown-link">
                    <img src="../../../static/img/default.png" alt="" class="head-icon"/>
                    {{getUserName}}
                  </span>
                  <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                      <el-dropdown-item command="alert">出现alert弹窗</el-dropdown-item>
                       <el-dropdown-item command="person">个人中心</el-dropdown-item>
                        <el-dropdown-item command="changePass">修改密码</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
           
          
        </div>

        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <span>这是一段信息</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

  </div>
</template>

<script>

import bus from "../common/bus.js"

export default {
  data () {
    return {
       collapse: false,
       userName:"",
      dialogVisible: false
    }
  },
  computed:{
    getUserName:function(){
        var userName=localStorage.getItem("userName");
        return userName?userName:"未登录"
    }
  },
  methods:{
    collapseChage:function(){
      this.collapse=!this.collapse;
       bus.$emit('collapse', this.collapse);
    },
    logOut:function(){
      localStorage.removeItem("userName");
      this.$router.push("/login")
    },

     handleCommand(command) {
        if(command == 'loginout'){
           this.logOut();
        }else if(command=="alert"){
         this.$alert("出现alert弹窗")
        }else if(command=="person"){
          this.$alert("去个人中心")
        }else if(command=="changePass"){
          this.$alert("去修改密码")
        }
    },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {

            console.log("我现在要关闭咯")
            done();
          })
          .catch(_ => {});
      }
    }
   
 

}
</script>

<style scoped>
#header{
      position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 20px;
    line-height: 70px;
    color: #fff;
}
.header{
  background-color: #242f42;
}
.el-dropdown-link{
  position: relative;
}
.el-dropdown-link{
      position: relative;
      display: inline-block;
      padding-left: 50px;
      color: #fff;
      cursor: pointer;
      vertical-align: middle;
  }
.head-icon{
    position: absolute;
    left:0;
    top:50%;
    width:40px;
    height:40px;
    border-radius: 50%;
    margin-top: -20px;
}
.icon-wrap{
   height:70px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.el-icon-menu{
  height:70px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 50px;
}
.collapse-btn{
  padding: 0 20px;
  height:70px;
  display: flex;
  align-items: center;
  justify-content: space-between;

}


</style>
