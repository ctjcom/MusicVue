<template>
  <div>
    <video :src="audio.url" ref="v3" @loadedmetadata="init"></video>
    <mt-range v-model="rangeValue" :min="0" :max="audio.duration">
      <div slot="start">0.00</div>
      <div slot="end">{{audio.duration|timeformat}}</div>
    </mt-range>
    <div @click="play">播放</div>
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
    ...mapState(['audio'])
  },
  methods: {
    ...mapMutations([
      'setUrl'
    ]),
    play() {
      this.$refs.v3.play();
    },
    getVideo() {
      //获取歌曲信息
      this.axios
        .get("/song/url", {
          params: {
            id: 33894312
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
