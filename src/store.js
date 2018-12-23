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
      logged: localStorage.getItem('token'),

      //user feed
      feed: [],
      //channel profile
      profile: '',
      subscribers: [],
      subscriptions: [],

      myProfile: '',

      //show tweet add dialog
      dialog: false,
      loading: false,

      //user search string
      searchQuery: '',
      //user profile
      users: []

    },
    getters: {
      isLogged: state => state.logged,
      getFeed: state => state.feed,
      getProfile: state => state.profile,
      getSubscribers: state => state.subscribers,
      getSubscriptions: state => state.subscriptions,
      getMyProfile: state => state.myProfile,
      dialog: state => state.dialog,
      searchQuery: state => state.searchQuery,
      loading: state => state.loading,
      users: state => state.users
    },
    mutations: {
      login: state => state.logged = 1,
      logout: state => state.logged = 0,
      set: (state, {type, items}) => state[type] = items,
      deleteTweet: (state, tweet) => state.feed.splice(state.feed.indexOf(tweet), 1),
      addTweet: (state, tweet) => state.feed.push(tweet),
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
      },
      subscribe(state) {
        if (state.profile.meSubscribed) {
          state.profile.meSubscribed = false;
          state.profile.subscribers -= 1;
        } else {
          state.profile.meSubscribed = true;
          state.profile.subscribers += 1;
        }
      },

    },
    actions:
      {
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
            //commit('addTweet', response.data)
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
            if (response.status === 200) {
              commit('subscribe')
            }
          })
        },
        getProfile({commit}, username) {
          Vue.axios.get(`/api/${username}`).then(response => {
            commit('set', {type: 'profile', items: response.data})
          });
          Vue.axios.get(`/api/${username}/tweets`).then(response => {
            commit('set', {type: 'feed', items: response.data})
          })
        },
        getSubscribers({commit}, username) {
          Vue.axios.get(`/api/${username}/subscribers`).then(response => {
            commit('set', {type: 'subscribers', items: response.data})
          })
        },
        getSubscriptions({commit}, username) {
          Vue.axios.get(`/api/${username}/subscriptions`).then(response => {
            commit('set', {type: 'subscriptions', items: response.data})
          })
        },
        getMyProfile({commit}) {
          Vue.axios.get('/api/my-profile').then(response => {
            commit('set', {type: 'myProfile', items: response.data})
          })
        },
        showDialog({commit}, flag) {
          commit('set', {type: 'dialog', items: flag})
        },
        updateSearchQuery({commit}, value) {
          commit('set', {type: 'searchQuery', items: value})
        },
        search({commit, getters}) {
          commit('set', {type: 'loading', items: true});
          Vue.axios.get(`/api/search/${getters.searchQuery}`).then(response => {
            commit('set', {type: 'users', items: response.data});
            commit('set', {type: 'loading', items: false});
          })
        },
        searchUser({commit}, searchQuery) {
          commit('set', {type: 'loading', items: true});
          Vue.axios.get(`/api/search/${searchQuery}`).then(response => {
            commit('set', {type: 'users', items: response.data});
            commit('set', {type: 'loading', items: false});
          })
        }
      }
  })
;

export default store
