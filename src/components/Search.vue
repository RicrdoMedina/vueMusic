<template lang="pug">
  main
    section.section-main
      .columns
        .column
          nav.nav-search
            form
              input.search(
                type="text",
                placeholder="Buscar canciones",
                v-model='searchQuery'
              )
              a.button(@click="search")
                icon(name="search" scale="1")
      .container
        .show-results
          .wrapper-card(v-for="t in tracks")
             vm-card-tracks-popular(v-bind:track="t")
</template>

<script>

import trackService from '@/services/Tracks'

import VmMenuOptions from '@/components/MenuOptions.vue'
import VmCardTracksPopular from '@/components/CardTracks.vue'

export default {
  name: 'app',
  data () {
    return {
      searchQuery: '',
      tracks: []
    }
  },
  components: {
    VmMenuOptions,
    VmCardTracksPopular
  },
  created () {
    this.tracksPopular()
  },
  methods: {
    tracksPopular () {
      trackService.geoGetTopTracks()
        .then(res => {
          this.tracks = res.tracks.track
        })
    },
    search () {
      if (this.searchQuery === '') {}
      trackService.search(this.searchQuery)
        .then(res => {
          this.tracks = res.results.trackmatches.track
        })
    }
  }
}
</script>

<style lang="scss">
.container{
  margin-top:1rem;
}
.section-main form{
  text-align: center;
}
.show-results{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; 
}
.show-results .wrapper-card{
  width: 250px;
  margin-top: 2rem;
  cursor: pointer;
}
.search{
  height: 35px;
  border-left: solid rgb(222,89,34) 1px;
  border-bottom: solid rgb(222,89,34) 1px;
  border-top: solid rgb(222,89,34) 1px;
  outline: 0;
  width: 400px;
  padding: 0 .5rem;
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.7);
  color: rgb(222,89,34);
}
.button{
  border-radius: unset;
  background: rgb(222,89,34);
  border: unset;
  position: relative;
  left: -2px;
  height: 35px;
}
.button:hover,.button.focus{
  border: unset; 
}
</style>