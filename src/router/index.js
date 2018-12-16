import Vue from 'vue'
import Router from 'vue-router'

import TweetList from '../components/tweets/TweetList'
import LoginForm from '../components/auth/LoginForm'
import UserPage from '../components/UserPage'
import Subscribers from '../components/profile/Subscribers'
import Subscriptions from '../components/profile/Subscriptions'
import RegistrationForm from '../components/auth/RegistrationForm'

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
      path: '/registration',
      name: 'registration',
      component: RegistrationForm
    },
    {
      path: '/:username',
      name: 'profile',
      component: UserPage
    },
    {
      path: '/:username/subscribers',
      name: 'subscribers',
      component: Subscribers
    },
    {
      path: '/:username/subscriptions',
      name: 'subscriptions',
      component: Subscriptions
    }
  ]
})
