import axios from 'axios'

export function login(data) {
  return axios({
    url: '/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  })
}

export function getInfo() {
  return axios({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return axios({
    url: '/logout',
    method: 'post'
  })
}

export function page(params) {
  return axios({
    url: '/user',
    method: 'get',
    params
  })
}

export function get(id) {
  return axios({
    url: `/user/${id}`,
    method: 'get'
  })
}

export function save(data) {
  return axios({
    url: '/user',
    method: 'post',
    data
  })
}

export function update(id, data) {
  return axios({
    url: `/user/${id}`,
    method: 'put',
    data
  })
}

export function remove(id) {
  return axios({
    url: `/user/${id}`,
    method: 'delete'
  })
}

export function setRoles(id, data) {
  return axios({
    url: `/user/${id}/role`,
    method: 'put',
    data
  })
}

export function getCode() {
  return axios({
    url: '/login',
    method: 'get'
  })
}

export function sendCode(mobile) {
  return axios({
    url: '/sms/login',
    method: 'get',
    params: {mobile}
  })
}

export function smsLogin(data) {
  return axios({
    url: '/sms/login',
    method: 'post',
    params: data
  })
}
