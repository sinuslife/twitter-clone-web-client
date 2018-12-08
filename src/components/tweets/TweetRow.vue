<template>
  <v-card class="l-card ma-1" hover>
    <v-card-title>
      {{tweet.author}}
    </v-card-title>
    <v-card-text>
      {{tweet.id}}
      {{tweet.text}}
      {{tweet.creationDate}}
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
    </v-card-actions>

  </v-card>
</template>

<script>
  export default {
    name: "TweetRow",
    props: ['tweet'],
    methods:{
      like(){
        this.$store.dispatch('like', this.tweet.id)
      }
    }

  }
</script>

<style scoped>
  .l-card {
    padding: 15px;
    margin: 45px auto;
    min-width: 472px;
    max-width: 820px;
  }
</style>
