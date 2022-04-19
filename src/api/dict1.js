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
//  删除字典中数据通过idArr
export function deleteDataByIdArr(data) {
  return request({
    url: '/bi/dict/delete/batch',
    method: 'post',
    baseURL: process.env.VUE_APP_BASE_API2,
    data
  })
}
// 新增一条字典数据
export function addOneData(data) {
  return request({
    url: '/bi/dict',
    method: 'post',
    baseURL: process.env.VUE_APP_BASE_API2,
    data
  })
}
// 编辑字典数据
export function editOneData(data) {
  return request({
    url: '/bi/dict',
    method: 'put',
    baseURL: process.env.VUE_APP_BASE_API2,
    data
  })
}
//根据id删除一条数据
export function deleteDataById(id){
  return request({
    url: `/bi/dict/${id}`,
    method: 'delete',
    baseURL: process.env.VUE_APP_BASE_API2,
  })
}

