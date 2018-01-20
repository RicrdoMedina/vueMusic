<template lang="pug">
  main
    section.section-main(v-bind:class="{ 'is-loaded': isLoading }")
      vm-loader
      .columns
        .column
          .container
            .wrapper-search(v-bind:class="{ 'is-loaded': isLoadingTracks }")
              nav.nav-search
                .content-box  Track
                .content-box
                  input#boxSearch.search(
                    type="text",
                    autofocus,
                    autocomplete="off",
                    v-model='searchQuery',
                    v-on:keyup.enter="search"
                    v-focus="true"
                  )
                  a.button(@click="search")
                    icon(name="question" scale="2")
              .content-select-countries
                  label Popular right now
                  .box-select-countries
                    select.countries(v-model="selectedCountry")
                      option(v-for="country in countries", v-bind:value="country.value") {{ country.name }}
              .box-result(v-if="showTotal") {{ total }} results found
              .loader
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
      countries: [
        {name: 'Argentina', value: 'argentina'},
        {name: 'Colombia', value: 'colombia'},
        {name: 'Mexico', value: 'mexico'},
        {name: 'España', value: 'spain'},
        {name: 'Portugal', value: 'portugal'}
      ],
      selectedCountry: 'spain',
      total: 0,
      showTotal: false,
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
    focus: function (el) {
      el.focus()
    }
  },
  watch: {
    selectedCountry () {
      this.tracksPopular()
    }
  },
  methods: {
    tracksPopular () {
      this.isLoadingTracks = true
      this.showTotal = false
      trackService.geoGetTopTracks(this.selectedCountry)
        .then(res => {
          this.tracks = res.tracks.track
          this.isLoadingTracks = false
          this.isLoading = true
        })
    },
    search () {
      if (this.searchQuery === '') {
        console.log('vacio')
        return
      }
      if (/^\s/.test(this.searchQuery)) {
        console.log('comienza con spaces')
        return
      }
      this.isLoadingTracks = true
      this.showTotal = false
      trackService.search(this.searchQuery)
        .then(res => {
          let respon = res
          if (respon['results']['opensearch:totalResults'] > 0) {
            this.tracks = respon.results.trackmatches.track
            this.total = this.tracks.length
            setTimeout(() => {
              this.isLoadingTracks = false
              this.showTotal = true
            }, 3000)
          } else {
            this.isLoadingTracks = false
            this.total = 0
            this.showTotal = true
          }
        })
    }
  }
}
</script>

<style lang="scss">

@import 'src/scss/loader-box-search.scss';

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
.wrapper-search{
  background: #de5a22cc;
  color: #fff;
  text-align: center;
  padding: 35px 20px 20px;
  min-height: 150px;
  position: relative;
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
.content-select-countries{
  display: flex;
  width: 300px;
  float: right;
  justify-content: flex-end;
  height: 25px;
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-size: .9rem;
}
.content-select-countries label{
  margin-right: .5rem;
  display: inline-block;
}
.content-select-countries .box-select-countries{
 display: inline-block; 
 width: 142px;
 padding: 0;
 margin: 0;
}
.content-select-countries .box-select-countries select{
 border: none;
 display: inline-block; 
 width: 140px;
  padding: 0;
 margin: 0;
 background:rgba(0, 0, 0, 0.7);
 color: #fff;
 outline: 0;
 font-size: 1rem;
}
.box-result{
  margin-top:20px;
  transition:all 0.6s ease-out;
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