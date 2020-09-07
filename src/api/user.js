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

export function logout() {
  return axios({
    url: '/logout',
    method: 'post'
  })
}
