<template>
	<div class="form-wrapper">
		<div class="form">
			<h2>登陆</h2>
			<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0px" class="demo-ruleForm">
			  <el-form-item  prop="username">
			    <el-input type="text" v-model="ruleForm2.userName" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item  prop="pass">
			    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
			  </el-form-item>
			 <!--  <el-form-item label="确认密码" prop="checkPass">
			    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
			  </el-form-item> -->
			  <el-form-item style="text-align:center">
			    <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
			    <el-button @click="resetForm('ruleForm2')">重置</el-button>
			  </el-form-item>
			   <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>
			</el-form>
			
		</div>
	</div>
</template>

<script>
  export default {
    data() {
      var checUserName= (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          userName: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          userName: [
            { validator: checUserName, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            localStorage.setItem("userName",this.ruleForm2.userName);
           
            this.$router.push("/");
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style type="text/css" scoped>
	.form-wrapper{
		height:100%;
		width:100%;
		
		box-sizing: border-box;
		background-color:rgb(50, 65, 87);
		display: flex;
		align-items: center;
		justify-content: center;

	}
	.form{
		width:350px;
		height:auto;
		background-color: #fff;
		padding: 20px;
		border-radius:5px;
	}
	h2{
		text-align: center;
		height: 50px;
		color:#333;
	}
	.form-wrapper .el-form-item__label{
		color:#fff;
	}

</style>