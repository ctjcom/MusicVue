<template>
  <div>
    <my-vadio ref="v3"></my-vadio>
    <!-- <video :src="url" ref="v3" @canplay="initAudio" @timeupdate="timeUp"></video> -->
    <!-- 进度条 -->
    <div class="progress">
      <span>{{currentTime*1000|timeformat}}</span>
      <div class="slider">
        <van-slider v-model="value" active-color="#f44" @change="onChang" />
      </div>
      <span>{{duration*1000|timeformat}}</span>
    </div>

    <!-- 控件 -->
    <div @click="isPlay">播放</div>
  </div>
</template>

<script>
import myVadio from "../components/my-vadio";
import { mapState, mapMutations, mapGetters } from "vuex";
import { Slider } from "vant";
export default {
  data() {
    return {
      value: 0
    };
  },
  computed: {
    ...mapState({
      duration: state => state.audio.duration,
      currentTime: state => state.audio.currentTime
    }),
    ...mapGetters(["getAudioProgress"])
  },
  watch: {
    getAudioProgress() {
      this.value = this.getAudioProgress;
    }
  },
  methods: {
    ...mapMutations(["setUrl","setCurrentTime"]),
    onChang(value) {
      //进度条发生改变时触发
      var currentTime = (value / 100) * this.duration;
      //console.log(currentTime)
      this.$refs.v3.addCurrentTime(currentTime);
      this.setCurrentTime(currentTime);
    },
    isPlay() {
      this.$refs.v3.isPlay();
    },
    getVideo(id) {
      //获取歌曲信息
      var id = id || this.$route.params.id || 33894312;
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
    //console.log(this.$route.params.id);
    this.getVideo();
  },
  components: {
    vanSlider: Slider,
    myVadio: myVadio
  }
};
</script>

<style scoped>
.progress {
  display: flex;
  align-items: center;
}
.slider {
  width: 65%;
  padding: 0 0.6rem;
}
</style>
