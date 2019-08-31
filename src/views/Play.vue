<template>
  <div>
    <video :src="url" ref="v3" @canplay="initAudio" @timeupdate="timeUp"></video>
    <!-- 进度条 -->
    <mt-range v-model="rangeValue" :min="0" :max="duration">
      <div slot="start">{{currentTime*1000|timeformat}}</div>
      <div slot="end">{{duration*1000|timeformat}}</div>
    </mt-range>
    <!-- 控件 -->
    <div @click="isPlay">播放</div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  data() {
    return {
      rangeValue: 0
    };
  },
  computed: {
    ...mapState({
      url:state=>state.audio.url,
      play:state=>state.audio.play,
      duration:state=>state.audio.duration,
      currentTime:state=>state.audio.currentTime,
    })
  },
  watch: {
    rangeValue(){
      //通过进度条控制播放进度
      //this.$refs.v3.currentTime=this.rangeValue;
     // this.setCurrentTime(this.rangeValue);
    },
    
  },
  methods: {
    ...mapMutations([
      'setUrl',
      'setPlay',
      'setDuration',
      'setCurrentTime'
    ]),
    initAudio(){
      //在音频就绪后初始化参数
      //设置音频的时长
      this.setDuration(this.$refs.v3.duration);
    },
    timeUp(){
      //播放时记录当前秒数
      var currentTime=this.$refs.v3.currentTime;
      this.setCurrentTime(currentTime);
      //同步进度条
      this.rangeValue=currentTime;
    },
    isPlay(){
      //
      this.setPlay(!this.play)
      if(this.play){
        this.$refs.v3.play();
      }else{
        this.$refs.v3.pause();
      }
    },
    getVideo(id) {
      //获取歌曲信息
      var id = id||this.$route.params.id||33894312;
      this.axios
        .get("/song/url", {
          params: {
            id: id
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.setUrl(res.data.data[0].url);
            console.log(res);
          }
        });
    }
  },
  created() {
    console.log(this.$route.params.id);
    this.getVideo();
  }
};
</script>

<style scoped>
</style>
