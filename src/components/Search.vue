<template>
  <v-text-field
    v-model="searchQuery"
    @input="debounceSearch"

    flat
    solo-inverted
    hide-details
    prepend-inner-icon="search"
    label="Search"
    class="hidden-sm-and-down"
  ></v-text-field>

</template>

<script>
  import debounce from 'lodash/debounce'
  import {mapGetters} from 'vuex'

  export default {
    name: "Search",
    computed: {
      ...mapGetters(['loading', 'users']),
      searchQuery: {
        get() {
          return this.$store.getters.searchQuery
        },
        set(value) {
          this.$store.dispatch('updateSearchQuery', value)
        }
      }
    },
    methods: {
      debounceSearch: debounce(function () {
        this.$store.dispatch('search')
      }, 500)
    }
  }
</script>

<style scoped>

</style>
