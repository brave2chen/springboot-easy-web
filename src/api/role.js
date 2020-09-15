import axios from 'axios'

export function get(id) {
  return axios({
    url: `/role/${id}`,
    method: 'get'
  })
}

export function page(params) {
  return axios({
    url: '/role',
    method: 'get',
    params
  })
}

export function save(data) {
  return axios({
    url: '/role',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return axios({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

export function remove(id) {
  return axios({
    url: `/role/${id}`,
    method: 'delete'
  })
}
