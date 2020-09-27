import axios from 'axios'
import Vue from 'vue'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'
import Qs from 'qs'

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = process.env.VUE_APP_BASE_API || ''
axios.defaults.timeout = 5000

// 需要发送cookies，请修改为false
axios.defaults.withCredentials = false

// request interceptor
axios.interceptors.request.use(
  config => {
    // params 转 QueryString
    if (config.params) {
      const url = config.url || ''
      Object.entries(config.params).forEach(([k, v]) => {
        if (Array.isArray(v)) {
          config.params[k] = v.join(',')
        }
      })
      const queryString = Qs.stringify(config.params, {arrayFormat: 'brackets'})
      config.params = {}
      config.url = `${url}${url.includes('?') && '&' || '?'}${queryString}`
    }
    // post data Object 转为 FromData
    if (config.data && !(config.data instanceof FormData) && /application\/x-www-form-urlencoded/.test(config.headers['Content-Type'])) {
      const formData = new FormData()
      Object.entries(config.data).forEach(([key, value]) => {
        value !== undefined && value !== null && formData.append(key, String(value))
      })
      config.data = formData
    }
    // 添加TOKEN
    if (store.getters.token) {
      config.headers['Authorization'] = `${getToken()}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
axios.interceptors.response.use(
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    if (res.code !== 0) {
      if (res.code === 4001 || res.code === 4003) {
        // to re-login
        !response.config.url.endsWith('/user/info') &&
        MessageBox.confirm('Session已超时或没有访问权限，退出重新登录吗', '退出重新登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else {
        Message({
          message: res.msg || '服务异常',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.msg || '服务异常'))
      }
    }
    return res.code !== undefined ? res : response
  },
  error => {
    console.log('err' + error) // for debug

    const res = error.response
    if (res.status === 401 || res.status === 403) {
      // to re-login
      !error.config.url.endsWith('/user/info') &&
      MessageBox.confirm('Session已超时或没有访问权限，退出重新登录吗', '退出重新登录', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }

    return Promise.resolve({
      code: 500,
      msg: res.data && res.data.msg || res.statusText
    })
  }
)

const Plugin = {
  install: Vue => {
    Vue.$axios = axios
  }
}
Plugin.install = Vue => {
  Vue.$axios = axios
  window.axios = axios
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get() {
        return axios
      }
    }
  })
}

Vue.use(Plugin)
