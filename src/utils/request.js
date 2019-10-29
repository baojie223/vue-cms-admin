import axios from 'axios'
import { message } from 'ant-design-vue'
import store from '@/store'
import { getToken } from '@/utils/auth'
import i18n from '@/locales/index'

// create an axios instance
const service = axios.create({
  // baseURL: window.API_URL,
  baseURL: window.SERVER_URL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data.result
    return Promise.resolve(res)
  },
  error => {
    const err = error.response.data.error.message.slice(1, -1)
    const status = err.status
    if (err.length > 30) {
      message.error(status)
    } else {
      message.error(i18n.t(err))
    }
    return Promise.reject(error)
  }
)

export default service
