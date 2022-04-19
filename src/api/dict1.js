import request from '@/utils/request'
// 获取字典的全部数据
export function getDictionariesData(params) {
  return request({
    url: '/bi/dict/all',
    method: 'get',
    baseURL: process.env.VUE_APP_BASE_API2,
    params
  })
}
// 获取字典的分页数据
export function getPagingData(params) {
  return request({
    url: '/bi/dict/pageList',
    method: 'get',
    baseURL: process.env.VUE_APP_BASE_API2,
    params
  })
}
// 根据字典中数据的id获取数据
export function getPaginDataById(id) {
  return request({
    url: `/bi/dict/${id}`,
    method: 'get',
    baseURL: process.env.VUE_APP_BASE_API2
  })
}

