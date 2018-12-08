import Vue from 'vue'
import Vuex from 'vuex'

import router from './router'

Vue.use(Vuex);

function getIndex(list, id) {
  if (typeof list !== 'undefined') {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return i
      }
    }
    return -1
  }
}

const store = new Vuex.Store({
  state: {
    feed: [],
    logged: localStorage.getItem('token'),
    profile: ''
  },
  getters: {
    isLogged: state => state.logged,
    getFeed: state => state.feed,
    getProfile: state => state.profile
  },
  mutations: {
    login(state) {
      state.logged = 1
    },
    logout(state) {
      state.logged = 0
    },
    set(state, {type, items}) {
      state[type] = items
    },
    deleteTweet(state, tweet) {
      state.feed.splice(state.feed.indexOf(tweet), 1)
    },
    like(state, id) {
      let index = getIndex(state.feed, id);
      const tweet = state.feed[index];
      if (tweet.meLiked === true) {
        tweet.meLiked = false;
        tweet.likes -= 1;
      } else {
        tweet.meLiked = true;
        tweet.likes += 1;
      }
    }

  },
  actions: {
    login({commit}, credential) {
      Vue.axios.post('login', credential).then(response => {
        localStorage.setItem('token', response.headers['authorization']);
        commit('login');
        router.push({path: '/'})
      })
    },
    logout({commit}) {
      localStorage.removeItem('token');
      commit('logout');
      router.push({path: '/login'})
    },
    registration({commit, dispatch}, credential) {
      Vue.axios.post('/sign-up', credential).then(response => {
        if (response.status === 200) {
          dispatch('login', credential)
        }
      })
    },
    fetchFeed({commit}) {
      Vue.axios.get('/api/feed').then(response => {
        commit('set', {type: 'feed', items: response.data})
      })
    },
    saveTweet({commit, dispatch}, tweet) {
      Vue.axios.post('/api/tweet', tweet).then(response => {

      })
    },
    deleteTweet({commit}, tweet) {
      Vue.axios.delete(`/api/tweet/${tweet.id}`).then(response => {
        if (response.status === 200) {
          commit('deleteTweet', tweet)
        }
      })
    },
    like({commit}, id) {
      Vue.axios.get(`/api/tweet/${id}/like`).then(response => {
        if (response.status === 200) {
          commit('like', id)
        }
      })
    },
    subscribe({commit}, username) {
      Vue.axios.get(`/api/${username}/subscribe`).then(response => {

      })
    },
    getProfile({commit}, username) {
      Vue.axios.get(`/api/${username}`).then(response => {
        commit('set', {type: 'profile', items: response.data})
      });
      Vue.axios.get(`/api/${username}/tweets`).then(response => {
        commit('set', {type: 'feed', items: response.data})
      })
    }
  }
});

export default store
