import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import SignIn from '@/components/SignIn'
import Console from '@/components/Console'
import Query from '@/components/Query'
import Registration from '@/components/Registration'
import Gallary from '@/components/Gallary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {path: '', component: Gallary},
        {path: 'console', component: Console},
        {path: 'query', component: Query},
        {path: 'registration', component: Registration}
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: SignIn
    }
  ]
})
