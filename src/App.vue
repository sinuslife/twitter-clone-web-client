<template>
  <v-app>
    <v-toolbar>
      <router-link to="/">Home</router-link>

      <v-btn @click="addTweet">
        ADD TWEET
      </v-btn>

      <search/>

      <v-spacer></v-spacer>

      <div v-if="!isLogged">
        <router-link to="/login">Login</router-link>
        <router-link to="/registration">Registration</router-link>
      </div>
      <div v-else>
        <v-btn icon @click="logout">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </div>

    </v-toolbar>
    <v-content>

      <router-view/>
      <tweet-form-dialog/>

    </v-content>
  </v-app>
</template>

<script>
  import {mapGetters} from 'vuex'
  import TweetFormDialog from "./components/tweets/TweetFormDialog";
  import Search from "./components/Search";

  export default {
    components: {Search, TweetFormDialog},
    computed: {
      ...mapGetters(['isLogged'])
    },
    created(){
      this.$store.dispatch('getMyProfile')
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      },
      addTweet(){
        this.$store.dispatch('showDialog', true)
      }
    }
  }
</script>
