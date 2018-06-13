<template>
  <div class="wrapper">
      <v-header></v-header>
       <v-side></v-side>
       <div class="content" :class="{'content-collapse':collapse}">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>

  </div>
</template>

<script>
import VHeader from "./Header.vue";
import VSide from "./Side.vue";
import bus from "../common/bus.js"
export default {
  data () {
    return {
      collapse: false 
    }
  },
   components:{
     VHeader, VSide
   },
    created(){
      
        bus.$on('collapse', msg => {
          console.log(msg)

            this.collapse = msg;
        })
    }
}
</script>
<style scoped>

</style>
