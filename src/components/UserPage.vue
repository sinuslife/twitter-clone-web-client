<template>
  <div>
    {{getProfile}}
    <br>
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
      ...mapGetters(['getProfile', 'getFeed'])
    },
    created() {
      this.$store.dispatch('getProfile', this.$route.params.username)
    }
  }
</script>

<style scoped>

</style>
