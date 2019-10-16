import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  apps: [],
  permissions: [],
  settings: {},
  user: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_APPS: (state, apps) => {
    state.apps = apps
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  },
  SET_SETTINGS: (state, settings) => {
    state.settings = settings
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  ALL_CLEAR: (state) => {
    state.token = ''
    state.apps = []
    state.permissions = []
    state.settings = {}
    state.user = {}
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { tenant, username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        tenantCode: tenant ? tenant.trim() : '',
        code: username.trim(),
        password: password
      })
        .then(response => {
          const { accessToken } = response.result
          commit('SET_TOKEN', accessToken)
          setToken(accessToken)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { result } = response

          if (!result) {
            reject('获取账户信息失败，请重新登录')
          }

          const { apps, grantedPermissions, settings, user } = result

          // roles must be a non-empty array
          if (!apps || apps.length <= 0) {
            reject('用户没有权限，请通知管理员')
          }

          commit('SET_APPS', apps)
          commit('SET_PERMISSIONS', grantedPermissions)
          commit('SET_SETTINGS', settings)
          commit('SET_USER', user)
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, dispatch }) {
    commit('ALL_CLEAR')
    removeToken()
    resetRouter()
    dispatch('tagsView/delAllViews', null, { root: true })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('ALL_CLEAR')
      removeToken()
      resolve()
    })
  }

  // dynamically modify permissions
  // changeRoles({ commit, dispatch }, role) {
  //   return new Promise(async resolve => {
  //     const token = role + '-token'

  //     commit('SET_TOKEN', token)
  //     setToken(token)

  //     const { grantedPermissions } = await dispatch('getInfo')

  //     resetRouter()

  //     // generate accessible routes map based on roles
  //     const accessRoutes = await dispatch('permission/generateRoutes', grantedPermissions, {
  //       root: true
  //     })

  //     // dynamically add accessible routes
  //     router.addRoutes(accessRoutes)

  //     // reset visited views and cached views
  //     dispatch('tagsView/delAllViews', null, { root: true })

  //     resolve()
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
