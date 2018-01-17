<template lang="pug">
  main
    section.section-main(v-bind:class="{ 'is-loaded': isLoading }")
      vm-loader
      .columns
        .column
          .container
            .wrapper-search
              nav.nav-search
                .content-box  Track
                form
                  input#boxSearch.search(
                    type="text",
                    autofocus,
                    autocomplete="off",
                    v-model='searchQuery',
                    v-on:keyup="search",
                    v-focus="true"
                  )
                  a.button
                    icon(name="question" scale="2")
                .content-box Top geo
              .box-result(v-if="total > 0") {{ total }} results found
      .container
        .show-results
          .wrapper-card(v-for="t in tracks", v-bind:class="{ 'is-loaded': isLoadingTracks }")
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
      total: 0,
      isLoading: false,
      isLoadingTracks: false
    }
  },
  components: {
    VmCardTracksPopular,
    VmLoader
  },
  created () {
    this.tracksPopular()
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    tracksPopular () {
      trackService.geoGetTopTracks()
        .then(res => {
          this.tracks = res.tracks.track
          this.isLoading = true
        })
    },
    search () {
      if (this.searchQuery === '') return
      this.isLoadingTracks = true
      trackService.search(this.searchQuery)
        .then(res => {
          this.tracks = res.results.trackmatches.track
          this.total = this.tracks.length
          setTimeout(() => {
            this.isLoadingTracks = false
          }, 3000)
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
.wrapper-search{
  background: #de5a22cc;
  color: #fff;
  text-align: center;
  padding: 20px ;
}
.nav-search{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}
.content-box{
  margin: 0 .8rem;
}
.box-result{
  margin-top:20px;
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
.search:focus,.wrapper-search:hover .search{
  background: rgba(0, 0, 0, 0.7);
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
.wrapper-search:hover .button{
  color: rgba(0, 0, 0, 0.7);
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
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
  -ms-transition:all 0.6s ease-out;
  -moz-transition:all 0.6s ease-out;
  -o-transition:all 0.6s ease-out;
  -webkit-transition:all 0.6s ease-out;
  transition:all 0.6s ease-out;
}
.button:hover,.button:focus{
  border: unset; 
}

</style>