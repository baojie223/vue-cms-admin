import request from '@/utils/request'

export function setTheme(data) {
  return request({
    url: '/tenant/settings/all',
    method: 'POST',
    data
  })
}

export function getTheme() {
  return request({
    url: '/tenant/settings/all',
    method: 'GET'
  })
}
