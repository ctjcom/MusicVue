<template>
  <div>
    <video :src="url" ref="v3" @canplay="initAudio" @timeupdate="timeUp"></video>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState({
      url: state => state.audio.url,
      play: state => state.audio.play,
      duration: state => state.audio.duration,
      currentTime: state => state.audio.currentTime
    })
  },
  methods: {
    ...mapMutations(["setUrl", "setPlay", "setDuration", "setCurrentTime"]),
    ...mapGetters(["getAudioProgress"]),
    initAudio() {
      //在音频就绪后初始化参数
      //设置音频的时长
      this.setDuration(this.$refs.v3.duration);
    },
    timeUp() {
      //播放时记录当前秒数
      var currentTime = this.$refs.v3.currentTime;
      this.setCurrentTime(currentTime);
    },
    addCurrentTime(currentTime) {//改变播放进度
      this.$refs.v3.currentTime = currentTime;
    },
    isPlay() {
      //开关
      this.setPlay(!this.play);
      if (this.play) {
        this.$refs.v3.play();
      } else {
        this.$refs.v3.pause();
      }
    }
  }
};
</script>

<style scoped>
</style>