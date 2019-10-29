import { getViews, setViews } from '@/utils/view'
import { message } from 'ant-design-vue'
import _ from 'lodash'

const state = {
  views: getViews() || {}
}

const mutations = {
  SAVE_VIEW: (state, { route, view }) => {
    if (!state.views[route] || state.views[route].length < 1) {
      message.info('请先新增一个视图')
      return
    }
    for (let i = 0; i < state.views[route].length; i++) {
      if (state.views[route][i].id === view.id) {
        const newViews = _.cloneDeep(state.views)
        newViews[route][i] = view
        state.views = newViews
        setViews(state.views)
        message.success('保存视图成功')
        return
      }
    }
    message.info('请先选择一个视图')
  },
  CREATE_VIEW: (state, { route, view }) => {
    if (!state.views[route] || state.views[route].length < 1) {
      state.views[route] = []
    }
    const newViews = _.cloneDeep(state.views)
    newViews[route] = newViews[route].concat(view)
    state.views = newViews
    setViews(state.views)
    message.success('新增视图成功')
  },
  DELETE_VIEW: (state, { route, view }) => {
    state.views[route] = state.views[route].filter(v => v.id !== view.id)
    setViews(state.views)
  }
}

const actions = {
  saveView({ commit }, { route, view }) {
    return new Promise(resolve => {
      commit('SAVE_VIEW', { route, view })
      resolve()
    })
  },
  createView({ commit }, payload) {
    console.log(payload)
    const { route, view } = payload
    return new Promise(resolve => {
      commit('CREATE_VIEW', { route, view })
      resolve()
    })
  },
  deleteView({ commit }, { route, view }) {
    return new Promise(resolve => {
      commit('DELETE_VIEW', { route, view })
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
