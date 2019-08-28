import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    audio: {
      url: null, // audio音乐数据
      play: false, // audio播放状态
      duration: 0, // audio总时长
      currentTime: 0 // audio当前秒数
  },
  playMode: "", // 播放模式
  playList: [] // 播放列表
  },
  mutations: {
    setUrl(state,val){
        state.audio.url=val;
    },
    setPlay(state,val){
      state.audio.play=val;
    },
    setDuration(state,val){
      state.audio.duration=val;
    },
    setCurrentTime(state,val){
      state.audio.currentTime=val;
    },
  },
  actions: {

  }
})
