import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Vip from '@/views/Vip'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/vip',
      name: 'Vip',
      component: Vip
    }
  ]
})
