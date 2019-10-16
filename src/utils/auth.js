// import Vue from 'vue'
// import Storage from 'vue-ls'

// Vue.use(Storage, {
//   name: 'ls',
//   storage: 'local'
// })

// const TokenKey = 'ACCESS_TOKEN'

// export function getToken() {
//   return Vue.ls.get(TokenKey)
// }

// export function setToken(token) {
//   return Vue.ls.set(TokenKey, token, 24 * 60 * 60 * 1000)
// }

// export function removeToken() {
//   return Vue.ls.remove(TokenKey)
// }

const TokenKey = 'ACCESS_TOKEN'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
