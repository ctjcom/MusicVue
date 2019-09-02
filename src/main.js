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
axios.defaults.baseURL='http://localhost:3000';
//设置请求头
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
Vue.prototype.axios=axios;

//引入vant
import {Icon} from 'vant';
import 'vant/lib/icon/local.css';
Vue.use(Icon);

//引入时间格式化组件
import moment from 'moment'
//定义全局的时间过滤器
Vue.filter('timeformat', function(dataStr, pattern = 'mm:ss') {
  return moment(dataStr).format(pattern)

})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
