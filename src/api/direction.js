import axios from 'axios'

export async function getItems(type, forceValueNumber = false) {
  if (!type) throw new Error('type 参数不能为空')
  const {data} = await axios.get(`/dictionary/items/${type}`)
  if (data && Array.isArray(data)) {
    return data.map(({k, v}) => ({label: k, value: forceValueNumber ? Number(v) : v}))
  }
  return []
}


export function get(id) {
  return axios({
    url: `/dictionary/${id}`,
    method: 'get'
  })
}

export function page(params) {
  return axios({
    url: '/dictionary',
    method: 'get',
    params
  })
}

export function save(data) {
  return axios({
    url: '/dictionary',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return axios({
    url: `/dictionary/${id}`,
    method: 'put',
    data
  })
}

export function remove(id) {
  return axios({
    url: `/dictionary/${id}`,
    method: 'delete'
  })
}
