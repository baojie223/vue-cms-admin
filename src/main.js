import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import '@/styles/index.less'

import App from './App'
import store from './store'
import router from './router'

import VueStorage from 'vue-ls'

Vue.use(VueStorage, {
  name: 'ls',
  storage: 'local'
})

import './permission' // permission control

import permission from './directive/permission'
Vue.use(permission)
import * as filters from './filters' // global filters

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import './antd' // ant-design-vue 按需引入
import './element' // element-ui 按需引入
import './components'

import i18n from './locales'
import './utils/filter'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
