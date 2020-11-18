import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Add from '@/views/Add'
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
      path: '/add',
      name: 'Add',
      component: Add
    },
    {
      path: '/vip',
      name: 'Vip',
      component: Vip
    }
  ]
})
