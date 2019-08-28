<template>
  <div>
    <video :src="music.url" ref="v3"></video>
    <mt-range v-model="rangeValue" :min="0" :max="music.size">
      <div slot="start">0.00</div>
      <div slot="end">{{music.size|timeformat}}</div>
    </mt-range>
  </div>
</template>

<script>
export default {
  data() {
    return {
      music:{},
      rangeValue:0,
    };
  },
  created() {
    console.log(this.$route.params.id)
    this.axios
      .get("/song/url", {
        params: {
          id: 33894312
        }
      })
      .then(res => {
        if (res.status == 200) {
          this.music = res.data.data[0];
          console.log(res);
        }
      });
  }
};
</script>

<style scoped>
</style>
