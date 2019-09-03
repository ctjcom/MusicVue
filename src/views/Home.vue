<template>
  <div class="home">
    <!-- 歌单列表 -->
    <van-tabs sticky @click="onClick">
      <van-tab v-for="(cat,i) of catlist" :key="i" :title="cat.name">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error"
  error-text="请求失败，点击重新加载" @load="onLoad">
             <div class="palylist">
            <router-link
              tag="div"
              :to="`/detail/${item.id}`"
              class="list-content"
              v-for="(item,i) of playlist"
              :key="i"
            >
              <img v-lazy="item.coverImgUrl" alt />
              <!-- 作者 -->
              <div class="author">{{item.name}}</div>
              <!-- 播放量 -->
              <div class="playCount">
                <van-icon name="service-o" />
                {{item.playCount}}
              </div>
            </router-link>
            </div>
          </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {Tab,Tabs,List} from "vant";
export default {
  name: "home",
  data() {
    return {
      playlist: [],
      catlist: [],
      loading: false,
      finished: false,
      error: false,
    };
  },
  methods: {
    getPlaylist(cat = "全部") {
      //获取歌单列表，默认获取全部
      if(this.playlist.length>0){//如果已有歌单，则获取下一页歌单数据
        var before=this.playlist[this.playlist.length-1].updateTime;
      }
      this.axios
        .get("/top/playlist/highquality", {
          params: {
            limit: 21,
            cat: cat,
            before:before
          }
        })
        .then(res => {
          console.log(res.data);
          this.playlist=this.playlist.concat(res.data.playlists);
          this.loading=false;
        }).catch(err=>{
          this.error=true;
        })
    },
    getCatList() {
      //获取歌单分类
      this.axios.get("/playlist/hot").then(res => {
        console.log(res.data.tags);
        this.catlist = res.data.tags;
      });
    },
    onClick(name, title) {
      //选项卡导航
      //console.log(name,title)
      this.getPlaylist(title);
    },
    onLoad(){
      //上拉刷新事件默认加载一次
      //console.log(1)
      this.getPlaylist();
    }
  },
  created() {
    //调用歌单分类
    this.getCatList();
  },
  components: {
    vanTab: Tab,
    vanTabs: Tabs,
    vanList:List
  }
};
</script>

<style scoped>
.palylist {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.list-content {
  position: relative;
  width: 32%;
  height: 100%;
  margin-top: 0.4rem;
}
.list-content > img {
  width: 100%;
  height: 100%;
  min-height: 7.5rem;
  border-radius: 5px;
}
.author {
  font-size: 0.14rem;
  margin-top: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.3rem;
}
.playCount {
  display: flex;
  align-items: center;
  position: absolute;
  top: 4px;
  right: 4px;
  color: #eaeaea;
}
</style>
