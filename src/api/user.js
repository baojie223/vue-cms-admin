import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/passport/authenticate',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: 'tenant/settings/startup',
    method: 'get'
  })
}
