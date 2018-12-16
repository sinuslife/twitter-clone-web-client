<template>
  <div>

    <v-btn small outline flat>
      Имя: {{getProfile.username}}
    </v-btn>

    <v-btn small outline @click="pushToSubscribers">
      Подписчики: {{getProfile.subscribers}}
    </v-btn>

    <v-btn small outline @click="pushToSubscriptions">
      Подписки: {{getProfile.subscriptions}}
    </v-btn>

    <span v-if="getMyProfile.username !== getProfile.username">
      <v-btn v-if="!getProfile.meSubscribed" @click="subscribe" small color="primary" outline>
      Subscribe
    </v-btn>
    <v-btn v-else @click="subscribe" small color="error" outline>
      Unsubscribe
    </v-btn>
    </span>


    <router-view/>

    <div v-for="tweet in getFeed" :key="tweet.id">
      <tweet-row :tweet="tweet"/>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import TweetRow from "./tweets/TweetRow";

  export default {
    name: "UserPage",
    components: {TweetRow},
    computed: {
      ...mapGetters(['getProfile', 'getFeed', 'getMyProfile'])
    },
    created() {
      this.$store.dispatch('getProfile', this.$route.params.username)
    },
    methods: {
      subscribe() {
        this.$store.dispatch('subscribe', this.getProfile.username)
      },
      pushToSubscribers() {
        this.$router.push({name: 'subscribers', params: {username: this.getProfile.username}})
      },
      pushToSubscriptions() {
        this.$router.push({name: 'subscriptions', params: {username: this.getProfile.username}})
      }
    },
    watch: {
      '$route'(to, from) {
        this.$store.dispatch('getProfile', this.$route.params.username)
      }
    }
  }
</script>

<style scoped>

</style>
