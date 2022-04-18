import request from '@/utils/request'
// 获取字典的全部数据
export function getDictionariesData() {
  return request({
    url: '/bi/dict/all',
    method: 'get'
  })
}
