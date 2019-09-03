<template>
  <div class="detail">
      <!-- 歌单介绍 -->
    <van-card
      :desc="playlist.description"
      :title="playlist.name"
      :thumb="playlist.coverImgUrl"
    >
     <div slot="tags">
    <van-tag plain type="primary" v-for="(item,i) of playlist.tags" :key="i">{{item}}</van-tag>
  </div>
    </van-card>
    <!-- 歌曲列表 -->
    

  </div>
</template>

<script>
import { Card,Tag } from "vant";

export default {
  data() {
    return {
      tracks: [], //歌曲列表
      playlist: ""
    };
  },
  methods: {
    getPlayDetail() {
      //获取歌单详情(歌曲列表)
      var id = this.$route.params.id || 2166181332;
      console.log(id);
      this.axios
        .get("/playlist/detail", {
          params: {
            id
          }
        })
        .then(res => {
          console.log(res.data);
          this.playlist = res.data.playlist;
          this.tracks = res.data.playlist.tracks;
        })
        .catch(err => {});
    }
  },
  created() {
    this.getPlayDetail();
  },
  components: {
    vanCard: Card,
    vanTag :Tag 
  }
};
</script>

<style scoped>
.van-card__content{
    text-align: left;
}
.van-card__title{
    font-size: 1rem;
}
.van-card__desc{
    font-size:0.7rem;
    max-height: 40px;
}
.van-ellipsis{
    white-space:normal;
}
</style>