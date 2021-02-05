import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../views/layout/Layout.vue'

export const constantRoutes = [
  { path: '/login', name: 'login', component: () => import('views/login/index'), hidden: true },
  { path: '/404', component: () => import('views/error/404'), meta: { title: '404' }, hidden: true },
  { path: '/401', component: () => import('views/error/401'), meta: { title: '401' }, hidden: true }
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    hidden: true,
    meta: { title: '快速导航', icon: 'fa-circle-o-notch' },
    children: [
      { name: 'home', path: '/home', component: () => import('views/fq/home/index.vue'), meta: { title: '首页' }}
    ]
  },
  {
    path: '/basicFunction',
    name: 'basicFunction',
    component: Layout,
    meta: { title: '基础功能', icon: 'fa-cog' },
    children: [
      { name: 'formPage', path: '/formPage', component: () => import('views/fq/basicFunction/formPage/index.vue'), meta: { title: '表单查询', parent: 'basicFunction' }}
    ]
  },
  {
    path: '/example',
    name: 'example',
    component: Layout,
    meta: { title: 'Vue3 Example', icon: 'fa-reorder' },
    children: [
      { name: 'variable', path: '/variable', component: () => import('views/fq/example/variable/index.vue'), meta: { title: 'ref reactive变量定义', parent: 'example' }},
      { name: 'vModel', path: '/vModel', component: () => import('views/fq/example/vModel/index.vue'), meta: { title: 'v-model双向绑定', parent: 'example' }},
      { name: 'cptCommunication', path: '/cptCommunication', component: () => import('views/fq/example/cptCommunication/index.vue'), meta: { title: '组件通信', parent: 'example' }},
      { name: 'watch', path: '/watch', component: () => import('views/fq/example/watch/index.vue'), meta: { title: 'watch的使用', parent: 'example' }},
      { name: 'slot', path: '/slot', component: () => import('views/fq/example/slot/index.vue'), meta: { title: 'slot的使用', parent: 'example' }},
      { name: 'menu', path: '/menu', component: () => import('views/fq/example/menu/index.vue'), meta: { title: '递归组件', parent: 'example' }}
    ]
  },
  { path: '/*', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoutes, ...asyncRoutes]
})

export default router
