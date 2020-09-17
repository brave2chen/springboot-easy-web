import axios from 'axios'

export function get(id) {
  return axios({
    url: `/authority/${id}`,
    method: 'get'
  })
}

export function page(params) {
  return axios({
    url: '/authority',
    method: 'get',
    params
  })
}

export function save(data) {
  return axios({
    url: '/authority',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return axios({
    url: `/authority/${id}`,
    method: 'put',
    data
  })
}

export function remove(id) {
  return axios({
    url: `/authority/${id}`,
    method: 'delete'
  })
}
