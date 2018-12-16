<template>
  <v-layout column>
    <v-card>
      <v-list>
        <div v-for="sub in getSubscriptions" :key="sub.id">

          <v-list-tile @click="pushToProfile(sub)">
            <v-list-tile-content>
                {{sub.username}}
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </div>
      </v-list>
    </v-card>
  </v-layout>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "Subscriptions",
    computed: {
      ...mapGetters(['getSubscriptions'])
    },
    created() {
      this.$store.dispatch('getSubscriptions', this.$route.params.username);
    },
    methods:{
      pushToProfile(sub){
        this.$router.push({name: 'profile', params: {username: sub.username}})
      }
    }
  }
</script>

<style scoped>

</style>
