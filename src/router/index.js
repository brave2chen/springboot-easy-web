import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/example/button',
        component: () => import('@/views/examples/VButtonExample'),
        name: 'VButtonExample',
        meta: {title: 'VButtonExample'}
      },
      {
        path: '/example/input',
        component: () => import('@/views/examples/VInputExample'),
        name: 'VInputExample',
        meta: {title: 'VInputExample'}
      },
      {
        path: '/example/form',
        component: () => import('@/views/examples/VFormExample'),
        name: 'VFormExample',
        meta: {title: 'VFormExample'}
      },
      {
        path: '/example/layout',
        component: () => import('@/views/examples/VLayoutExample'),
        name: 'VLayoutExample',
        meta: {title: 'VLayoutExample'}
      },
      {
        path: '/example/charts',
        component: () => import('@/views/examples/VChartsExample'),
        name: 'VChartsExample',
        meta: {title: 'VChartsExample'}
      },
      {
        path: '/example/table',
        component: () => import('@/views/examples/VTableExample'),
        name: 'VTableExample',
        meta: {title: 'VTableExample'}
      },
      {
        path: '/example/title',
        component: () => import('@/views/examples/VTitleExample'),
        name: 'VTitleExample',
        meta: {title: 'VTitleExample'}
      },
      {
        path: '/example/dialog',
        component: () => import('@/views/examples/VDialogExample'),
        name: 'VDialogExample',
        meta: {title: 'VDialogExample'}
      },
      {
        path: '/example/detail',
        component: () => import('@/views/examples/VDetailFormExample'),
        name: 'VDetailFormExample',
        meta: {title: 'VDetailFormExample'}
      }
    ]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/user',
    name: 'Manage',
    meta: {
      title: '后台管理',
      icon: 'nested'
    },
    children: [
      {
        path: '/manage/user',
        component: () => import('@/views/manage/user/UserManage'),
        name: 'UserManage',
        meta: {title: '用户管理', roles: ['SystemAdmin']}
      },
      {
        path: '/manage/role',
        component: () => import('@/views/manage/role/RoleManage'),
        name: 'RoleManage',
        meta: {title: '角色管理', roles: ['SystemAdmin']}
      },
      {
        path: '/manage/authority',
        component: () => import('@/views/manage/authority/AuthorityManage'),
        name: 'AuthorityManage',
        meta: {title: '权限管理', roles: ['SystemAdmin']}
      },
      {
        path: '/manage/direction',
        component: () => import('@/views/manage/direction/DirectionManage'),
        name: 'DirectionManage',
        meta: {title: '字典管理', roles: ['SystemAdmin']}
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
