<template lang="pug">
  main
    section.section-main(v-bind:class="{ 'is-loaded': isLoading }")
      vm-loader
      .columns
        .column
          .container
            nav.nav-search
              .content-box  Track
              form
                input#boxSearch.search(
                  type="text",
                  autofocus,
                  v-model='searchQuery',
                  v-focus
                )
                a.button(@click="search")
                  icon(name="question" scale="2")
              .content-box Top geo
      .container
        .show-results
          .wrapper-card(v-for="t in tracks")
             vm-card-tracks-popular(v-bind:track="t")
</template>

<script>

import trackService from '@/services/Tracks'

import VmLoader from '@/components/shared/Loader.vue'

import VmCardTracksPopular from '@/components/CardTracks.vue'

export default {
  name: 'app',
  data () {
    return {
      searchQuery: '',
      tracks: [],
      isLoading: false
    }
  },
  components: {
    VmCardTracksPopular,
    VmLoader
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  created () {
    this.tracksPopular()
  },
  methods: {
    tracksPopular () {
      console.log('hola')
      trackService.geoGetTopTracks()
        .then(res => {
          this.tracks = res.tracks.track
          this.isLoading = true
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
  min-height: 65vh; 
}
.show-results .wrapper-card{
  width: 250px;
  margin-top: 2rem;
  cursor: pointer;
}
.nav-search{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  background: rgba(219, 88, 0, 0.774);
  color: #fff;
  font-size: 2rem;
}
.content-box{
  margin: 0 .8rem;
}
.search{
  height:50px;
  outline: 0;
  width: 400px;
  padding: 0 .5rem;
  font-size: 2rem;
  color: #fff;
  text-align: center;
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  -ms-transition:all 0.6s ease-out;
  -moz-transition:all 0.6s ease-out;
  -o-transition:all 0.6s ease-out;
  -webkit-transition:all 0.6s ease-out;
  transition:all 0.6s ease-out;
}
.search:focus{
  background: rgba(255, 255, 255, 0.219);
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
  color: #fff;
}
.button{
  border-radius: unset;
  background:transparent;
  color: #fff;
  border: unset;
  position: relative;
  height: 52px;
  top: -1px;
  width: 51px;
}
.button:hover,.button.focus{
  border: unset; 
}

</style>