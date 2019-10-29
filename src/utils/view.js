import Vue from 'vue'
import VueStorage from 'vue-ls'

Vue.use(VueStorage, {
  name: 'ls',
  storage: 'local'
})

export const setViews = views => {
  return Vue.ls.set('VIEWS', views, 10 * 24 * 60 * 60 * 1000)
}

export const getViews = () => {
  return Vue.ls.get('VIEWS')
}
