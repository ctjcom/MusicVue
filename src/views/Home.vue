<template>
  <div class="home">
    <!-- 歌单列表 -->
    <div class="palylist">
      <div class="list-content" v-for="(item,i) of playlist" :key="i">
        <img :src="item.coverImgUrl" alt="">
        <div class="author">
          <van-icon name="contact"/>
          {{item.name}}
        </div>
        <div class="playCount">
          <van-icon name="service-o"/>
          {{item.playCount}}
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>



export default {
  name: 'home',
  data(){
    return{
      playlist:[],
    }
  },
  methods:{
    getPlaylist(){
      this.axios.get("/top/playlist",{params:{
        limit:10,
        order:'new',
      }}).then(res=>{
        console.log(res.data);
        this.playlist=res.data.playlists
      })
    }
  },
  created() {
    this.getPlaylist();
  },
  components: {
    
  }
}
</script>

<style scoped>
  .palylist{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .list-content{
    position: relative;
    width:48%;
    margin-top: 0.4rem;
  }
  .list-content>img{
  width: 100%;
  border-radius:5px;
  }
  .author{
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    position: absolute;
    bottom: 5px;
    left: 2px;
    color: #eaeaea;
    word-wrap: none;
    text-overflow: ellipsis;
  }
  .playCount{
    display: flex;
    align-items: center;
    position: absolute;
    top: 4px;
    right: 4px;
    color: #eaeaea;
  }
</style>
