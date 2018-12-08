import Vue from 'vue'
import Router from 'vue-router'

import TweetList from '../components/tweets/TweetList'
import LoginForm from '../components/auth/LoginForm'
import UserPage from '../components/UserPage'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: TweetList
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm
    },
    {
      path: '/:username',
      name: 'profile',
      component: UserPage
    }
  ]
})
