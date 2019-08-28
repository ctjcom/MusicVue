<template>
  <div class="home">
    <router-link to="/play/33894312">跳转</router-link>
    
  </div>
</template>

<script>



export default {
  name: 'home',
  data(){
    return{

    }
  },
  methods:{
    to(){
      //this.$router.push({path:"/play",params:{id:1}})
      //this.$router.push({name:"play",params:{id:1}})
      //this.$router.push({path:"/play",query:{id:1}})
      //this.$router.push({name:"play",query:{id:1}})
    }
  },
  components: {
    
  }
}
</script>
