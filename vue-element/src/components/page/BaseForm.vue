<template>
  <div>
   <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-message"></i> 基本表单</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    {{msg}}
  <div class="form-wrap">
    <!-- //label-width="100px"  label-position="left"   设置当前下表格下面的label的宽度跟文字方向-->
    <el-form ref="form" :model="form" label-width="100px"  label-position="left">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="上海" value="上海"></el-option>
          <el-option label="北京" value="北京"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
       <el-form-item label="日期时间">
        <div class="block">
          <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
        
      </el-form-item>
      <el-form-item label="日期时间2">
          <span class="demonstration">带快捷选项</span>
        <div class="block">
        
          <el-date-picker
            v-model="value2"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </div>
      </el-form-item>
        <el-form-item label="日期时间3">
           <span class="demonstration">设置默认时间</span>
          <div class="block">
         
          <el-date-picker
            v-model="value3"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
        </div>
        </el-form-item>
     


      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery" active-color="#13ce66"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type" style="margin-left:0"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="自动高度">
           <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6}"
              placeholder=":autosize={minRows: 2, maxRows: 6}"
              v-model="form.desc" >
            </el-input>
       </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

    


</div>
</div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: ["美食/餐厅线上活动"],
          resource: '线上品牌商赞助',
          desc: ''
        },
         pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        value3: '',
        msg:""
      }
    },
    methods: {
      onSubmit() {
        this.$router.push("/form?id="+"66666")
      }
    },
    beforeRouteEnter(to,from,next){
      // console.log(vm)
      next(vm=>{vm.msg="我是刚进来的"})
    },
    beforeRouteUpdate(to,from,next){
      console.log(this.msg);
      console.log(to)
      this.msg="我是第二次提交过来的";
      next();
    }
  }
</script>
<style type="text/css" scoped>

.form-wrap{
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
}
.el-form{
  width:460px;
}
.el-checkbox-group{
  overflow: hidden;
}
.el-checkbox-group .el-checkbox {
    float: left;
    width: 160px;
    padding-right: 20px;
    margin: 0;
    padding: 0;
}
.block{
}
  
</style>