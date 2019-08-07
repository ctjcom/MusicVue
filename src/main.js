import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入公共样式
import './assets/css/normalize.css'
import './assets/css/base.css'

//引入axios
import axios from 'axios'
//设置请求的基本路径
axios.defaults.baseURL='http://127.0.0.1:3000';
//设置请求头
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
Vue.proptotype.axios=axios;

//引入mint-ui
import Mintui from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mintui)

//引入字体图标
import './assets/font/iconfont'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
