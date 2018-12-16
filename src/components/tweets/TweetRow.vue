<template>
  <v-card class="l-card ma-1" hover>
    <v-card-title>
      <router-link :to="{name:'profile', params:{username:tweet.author}}">
        {{tweet.author}}
      </router-link>
    </v-card-title>
    <v-card-text>
      <!--{{tweet.id}}-->
      {{tweet.text}}
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      {{tweet.likes}}
      <v-btn v-if="!tweet.meLiked" icon @click="like">
        <v-icon>favorite_border</v-icon>
      </v-btn>
      <v-btn v-else icon @click="like">
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-spacer></v-spacer>
      {{tweet.creationDate}}

      <v-btn v-if="getMyProfile.username === tweet.author" icon @click="deleteTweet">
        <v-icon>delete</v-icon>
      </v-btn>

    </v-card-actions>

  </v-card>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "TweetRow",
    props: ['tweet'],
    computed: {
      ...mapGetters(['getMyProfile'])
    },
    data() {
      return {
        username: ''
      }
    },
    methods: {
      like() {
        this.$store.dispatch('like', this.tweet.id)
      },
      deleteTweet(){
        this.$store.dispatch('deleteTweet', this.tweet)
      }
    }

  }
</script>

<style scoped>
  .l-card {
    padding: 15px;
    margin: 45px auto;
    /*min-width: 472px;*/
    max-width: 820px;
  }
</style>
