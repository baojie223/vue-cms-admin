import Vue from 'vue'
import VueStorage from 'vue-ls'

Vue.use(VueStorage, {
  name: 'ls',
  storage: 'local'
})

export const setDrawer = drawer => {
  return Vue.ls.set('Drawer', drawer, 10 * 24 * 60 * 60 * 1000)
}

export const getDrawer = () => {
  return Vue.ls.get('Drawer')
}
