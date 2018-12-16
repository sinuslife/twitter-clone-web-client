<template>
  <v-dialog persistent v-model="dialog">
    <v-card>
      <v-card-text>
        <v-textarea
          solo flat
          auto-grow
          v-model="tweet.text"
        ></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          flat="flat"
          @click="saveTweet"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "TweetFormDialog",
    computed: {
      ...mapGetters(['dialog'])
    },
    data() {
      return {
        tweet: {
          text: ''
        }
      }
    },
    methods:{
      saveTweet(){
        this.$store.dispatch('saveTweet', this.tweet).then(()=>{
          this.tweet.text = ''
        });
        this.$store.dispatch('showDialog', false)

      }
    }
  }
</script>

<style scoped>

</style>
