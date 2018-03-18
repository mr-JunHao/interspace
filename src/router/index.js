import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import upload from '@/components/upload'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    }
  ]
})
