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

const clientManagement = {
  getCustomer(data) {
    return request({
      url: '/customer',
      method: 'POST',
      data
    })
  },
  apply(data) {
    return request({
      url: '/cooperation/apply',
      method: 'POST',
      data
    })
  },
  handle(id, flag) {
    return request({
      url: `/customer/${id}/cooperation/${flag}`,
      method: 'GET'
    })
  },
  myApply(data) {
    return request({
      url: '/cooperation/my-apply',
      method: 'POST',
      data
    })
  },
  deleteApply(id) {
    return request({
      url: `/cooperation/${id}`,
      method: 'DELETE'
    })
  },
  clientApply(data) {
    return request({
      url: '/cooperation/customer-applys/page',
      method: 'POST',
      data
    })
  }
}

const tenantService = {
  tenant(data) {
    return request({
      url: '/tenant/searches',
      method: 'POST',
      data
    })
  },
  create(data) {
    return request({
      url: '/tenant',
      method: 'POST',
      data
    })
  },
  detail(id) {
    return request({
      url: `/tenant/${id}/detail`,
      method: 'GET'
    })
  }
}

export { clientManagement, tenantService }
