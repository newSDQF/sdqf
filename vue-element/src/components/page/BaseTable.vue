<template>
  <div >
    <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-document"></i> 常用表格/表格</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    <div class="container">
      <div>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
       <el-button type="warning" icon="el-icon-search" @click="search">搜索</el-button>
    </div>
    <el-table
      ref="multipleTable"
      border
      :data="data"
      tooltip-effect="dark"
      style="width: 100%"
       :default-sort="{prop:'date',order:'descending'}"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
        <!-- //sortable  允许排序，需要设置prop，如果不设置无效-->
      <el-table-column
        label="日期"
        width="120"  
        align="center"
        sortable
        prop="date"
        >
        <!-- //如果不用prop使用 slot-scope="scope" 插槽插值-->
       
        <template slot-scope="scope"> <i class="el-icon-time"></i>{{ scope.row.date }}</template>
      </el-table-column>

      <el-table-column
        prop="name"
        label="姓名"
        width="120"  align="center">
      </el-table-column>

      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip  align="center">
      </el-table-column>

       <el-table-column label="操作"  align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <!-- //编辑弹窗 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="current_rowdata">
        <el-form-item label="姓名" label-width="120px">
          <el-input v-model="current_rowdata.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="120px">
           <el-input v-model="current_rowdata.address" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
  </el-dialog>
    <!-- <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div> -->
    </div>
  </div>
</template>

<script>
  // import $axios from "axios";

  export default {
    data() {
      return {
        dialogFormVisible: false,
        tableData: [
        {
          id:"1",
          date: '2016-05-03',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
           id:"2",
          date: '2016-05-02',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
           id:"3",
          date: '2016-05-04',
          name: '王小虎3',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
           id:"4",
          date: '2016-05-01',
          name: '王小虎4',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
           id:"5",
          date: '2016-05-08',
          name: '王小虎5',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
           id:"6",
          date: '2016-05-06',
          name: '王小虎6',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"7",
          date: '2016-05-07',
          name: '王小虎7',
          address: '上海市普陀区金沙江路 1518 弄'
        }
        ],
        multipleSelection: [],
        select_word:'',
        is_search:'',
        current_rowdata:{}

      }
    },
    computed: {
          data(){
              return this.tableData.filter((d) => {
                  
                    if(d.name.indexOf(this.select_word) > -1 ||d.address.indexOf(this.select_word) > -1){
                        return d;
                    }
                 
              })
          }
        },
    methods: {
      

      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleDelete(index,row){
        console.log(row)//删除行的数据
        console.log(index)
       
        if(this.select_word){

          var currentIndex;
          this.tableData.filter((item,index)=>{
            if(item.id===row.id){
              currentIndex=index;
            }
          })
          if(currentIndex>=0){
            this.tableData.splice(currentIndex,1);
          }
          console.log(currentIndex);


        }else{
           this.tableData.splice(index,1);
        }
      },
      handleEdit(index,row){
        this.current_rowdata=row;
        this.dialogFormVisible=true;
        console.log(index,row)
      },
      search(){
        this.is_search = true;
      }
    }
  }
</script>
<style type="text/css" scoped>
 /* handle-input mr10*/
  .handle-input{
    width:300px;
    margin-bottom: 10px;
  }
</style>
