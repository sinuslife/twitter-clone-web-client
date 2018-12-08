<template>
  <v-container>
    <div v-for="tweet in getFeed" :key="tweet.id">
      <tweet-row :tweet="tweet"/>
    </div>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex'
  import TweetRow from "./TweetRow";

  export default {
    name: "TweetList",
    components: {TweetRow},
    computed: {
      ...mapGetters(['getFeed','isLogged'])
    },
    created(){
      if (this.isLogged){
        this.$store.dispatch('fetchFeed')
      }
    }
  }
</script>

<style scoped>

</style>
