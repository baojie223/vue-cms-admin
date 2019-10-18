import { loadLanguageAsync } from '@/locales'

const state = {
  lang: 'zh-CN'
}

const mutations = {
  SET_LANG: (state, lang) => {
    state.lang = lang
  }
}

const actions = {
  setLang({ commit }, lang) {
    return new Promise(resolve => {
      commit('SET_LANG', lang)
      loadLanguageAsync(lang)
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
