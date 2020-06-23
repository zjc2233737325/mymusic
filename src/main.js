import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'
import VConsole from 'vconsole'
Vue.use(VueLazyload, {
  // 可以通过配置loading来设置图片还未加载好之前的站位图片
  loading: require('./assets/images/loading.png')
})

fastclick.attach(document.body)
Vue.config.productionTip = false

const vconsole = new VConsole()
Vue.use(vconsole)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
