import axios from 'axios'
import { message } from 'ant-design-vue'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: window.API_URL,
  baseURL: 'http://192.168.1.39:8001/api-v1',
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
    const res = response.data
    return Promise.resolve(res)
  },
  error => {
    const err = error.response
    const status = err.status
    /**
     * 错误处理预留位
    **/
    message.error(`错误码：${status}`)
    return Promise.reject(error)
  }
)

export default service
