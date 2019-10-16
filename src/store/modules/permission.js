import { asyncRoutes, constantRoutes } from '@/router'

function hasAbility(apps, permissions, route) {
  if (route.meta) {
    if (route.meta.app) {
      return apps.some(app => route.meta.app.includes(app))
    }
    if (route.meta.permission) {
      return permissions.some(permission =>
        route.meta.permission.includes(permission)
      )
    }
  }
  return true
}

function filterAsyncRoutes(routes, { apps, permissions }) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasAbility(apps, permissions, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, { apps, permissions })
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, { apps, permissions }) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, {
        apps,
        permissions
      })
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
