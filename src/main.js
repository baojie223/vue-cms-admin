import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

// import Storage from 'vue-ls'

// Vue.use(Storage, {
//   name: 'ls',
//   storage: 'local'
// })

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
import './antd' // ant-design-vue 按需引入
import './element'

import i18n from './locales'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
