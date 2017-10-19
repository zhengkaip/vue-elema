import Vue from 'vue'
import Router from 'vue-router'
import myHeader from '../components/Header'
import Index from '../components/Index'
import vueResource from 'vue-resource'

Vue.use(vueResource)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/home',
      name: 'myHeader',
      component: myHeader
    }
  ],
  mode: 'history'
})
