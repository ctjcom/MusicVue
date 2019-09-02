import Vue from 'vue'
import Vuex from 'vuex'
import playMode from './utils/playMode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    audio: {
      url: null, // audio音乐数据
      play: false, // audio播放状态
      duration: 0, // audio总时长
      currentTime: 0 // audio当前秒数
  },
  playMode: playMode.default.value, // 播放模式
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
  getters:{
    getAudioProgress(state){
      //获取播放进度
      return parseInt(state.audio.currentTime / state.audio.duration * 100)
    }
  },
  actions: {

  }
})
