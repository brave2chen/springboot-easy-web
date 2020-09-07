import Vue from 'vue'
import store from '@/store'

const hasPermission = (role) => {
  const roles = store.getters && store.getters.roles
  return roles.some(_role => _role === role)
}

const permission = {
  inserted(el, binding, vnode) {
    const {value} = binding

    if (value && value.length > 0) {
      if (!hasPermission(value)) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}

const install = function(Vue) {
  Vue.directive('permission', permission)
  Vue.$hasPermission = hasPermission
  Object.defineProperties(Vue.prototype, {
    $hasPermission: {
      get() {
        return hasPermission
      }
    }
  })
}

Vue.use(install)
