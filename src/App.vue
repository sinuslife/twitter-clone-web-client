<template>
  <v-app>
    <v-toolbar>

      <div v-if="!isLogged">
        <router-link to="/login">Login</router-link>
      </div>

    </v-toolbar>
    <v-content>

      <router-view/>

    </v-content>
  </v-app>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters(['isLogged'])
    }
  }
</script>
