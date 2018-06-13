<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。
                访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
            </div>
            <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
        import {quillRedefine} from 'vue-quill-editor-upload'
    export default {
        data: function(){
            return {
                content: '',
                editorOption: {
                   
                 
                }
            }
        },
        created () {
          this.editorOption = quillRedefine(
            {
              // 图片上传的设置
              uploadConfig: {
                action:'http://192.168.0.104:3000',  // 必填参数 图片上传地址
                // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
                // 你必须把返回的数据中所包含的图片地址 return 回去
                res: (respnse) => {
                  return respnse.url // 这里切记要return回你的图片地址
                }
              }
            }
          )
         // console.log(this.editorOption)
        },
        components: {
            quillEditor
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
                console.log(this.content);
                this.$message.success('提交成功！');
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
    .quill-editor{
        min-height: 400px;
    }
   

   
</style>