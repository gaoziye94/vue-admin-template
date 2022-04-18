import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getListPage(params) {
  return request({
    url: 'bi/datasource/pageList',
    method: 'get',
    baseURL: process.env.VUE_APP_BASE_API2, // 直接通过覆盖的方式
    params
  })
}
