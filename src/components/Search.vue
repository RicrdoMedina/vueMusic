<template lang="pug">
  main
    section#sectionMain.section-main(v-bind:class="{ 'is-loaded': isLoading }")
      vm-loader
      .columns
        .column
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
                  a.button(@click="search") ?
              .content-select-countries
                  label Popular right now
                  .box-select-countries
                    select.countries#countries(v-model="selectedCountry")
                      option(v-for="country in countries", v-bind:value="country.value") {{ country.name }}
              .box-result
              .loader

      .container
        .wrapper-results
          .title-main 
            h2
              icon(name="share" scale="1") 
              | &nbsp; {{ titleMain | capitalize-first-letter }}
          .show-results
            .wrapper-card(v-for="t in tracks", v-bind:class="{ 'is-loaded': isLoadingTracks }")
              vm-card-tracks-popular(v-bind:track="t")


          nav.pagination(role="navigation" aria-label="pagination")
            paginate(
              v-bind:page-count="100",
              ref="paginate",
              v-bind:click-handler="goToPage",
              v-bind:prev-text="'Prev'",
              v-bind:next-text="'Next'",
              v-bind:container-class="'pagination-list'",
              v-bind:page-link-class="'pagination-link'",
              v-bind:disabled-class="'pagination-ellipsis'",
              v-bind:active-class="'is-current'",
              v-bind:prevLinkClass="'pagination-previous'",
              v-bind:nextLinkClass="'pagination-next'")
</template>

<script>

import trackService from '@/services/Tracks'

import fadeInMixin from '@/mixins/FadeIn'

import closeMenuMixin from '@/mixins/CloseMenu'

import Paginate from 'vuejs-paginate'

import VmLoader from '@/components/shared/Loader.vue'

import VmCardTracksPopular from '@/components/CardTracks.vue'

export default {
  name: 'app',
  data () {
    return {
      searchQuery: '',
      tracks: [],
      titleMain: 'Tracks Populars Spain',
      countries: [
        {name: ' Seleccione ', value: false},
        {name: 'Argentina', value: 'argentina'},
        {name: 'Colombia', value: 'colombia'},
        {name: 'Mexico', value: 'mexico'},
        {name: 'Spain', value: 'spain'},
        {name: 'Portugal', value: 'portugal'}
      ],
      selectedCountry: 'spain',
      isLoading: false,
      isLoadingTracks: false
    }
  },
  mixins: [fadeInMixin, closeMenuMixin],
  components: {
    VmCardTracksPopular,
    VmLoader,
    Paginate
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
      if (this.selectedCountry) {
        this.tracksPopular()
        this.searchQuery = ''
        this.$refs.paginate.selected = 0
      }
    }
  },
  methods: {
    tracksPopular (pageNum) {
      this.isLoadingTracks = true
      trackService.geoGetTopTracks(this.selectedCountry, pageNum)
        .then(res => {
          this.tracks = res.tracks.track
          this.isLoadingTracks = false
          this.isLoading = true
          this.fadeIn()
          this.titleMain = `Tracks Populars ${this.selectedCountry}`
        })
    },
    goToPage (pageNum) {
      if (this.searchQuery === '') {
        this.tracksPopular(pageNum)
      } else {
        this.getTracks(pageNum)
      }
    },
    search (event) {
      if ((this.searchQuery === '') || (/^\s/.test(this.searchQuery))) return
      if (event.key === 'Enter') this.selectedCountry = false
      this.$refs.paginate.selected = 0
      this.getTracks()
    },
    getTracks (pageNum) {
      this.isLoadingTracks = true
      trackService.search(this.searchQuery, pageNum)
        .then(res => {
          let respon = res
          if (respon['results']['opensearch:totalResults'] > 0) {
            this.tracks = respon.results.trackmatches.track
            this.titleMain = `Results found ${this.searchQuery}`
            setTimeout(() => {
              this.isLoadingTracks = false
            }, 3000)
          } else {
            this.isLoadingTracks = false
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
  margin-bottom: 2rem;
  border-top: 1px solid #de5a22cc;
}
.title-main{
  width: 100%;
  padding: 1.2rem 1rem .8rem;
  font-size: 1.2rem;
  margin:0;
}
.title-main h2{
  color: #de5a22cc;
}
.wrapper-results{
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem 1rem 1.2rem;
  margin: 2.5rem auto 2rem;
  -ms-transition:all 1s ease-out;
  -moz-transition:all 1s ease-out;
  -o-transition:all 1s ease-out;
  -webkit-transition:all 1s ease-out;
  transition:all 1s ease-out;
}
.show-results .wrapper-card{
  width: 250px;
  margin-top: 1.2rem;
  cursor: pointer;
}
.wrapper-search{
  background: #de5a22cc;
  color: #fff;
  text-align: center;
  padding: 35px 20px 20px;
  min-height: 170px;
  position: relative;
}
.nav-search
,.title-main h2
,.show-results
,.content-select-countries
,.pagination{
  opacity: 0;
  -ms-transition:all 1s ease-out;
  -moz-transition:all 1s ease-out;
  -o-transition:all 1s ease-out;
  -webkit-transition:all 1s ease-out;
  transition:all 1s ease-out;
}
.fadeIn .nav-search
,.fadeIn .title-main h2
,.fadeIn .show-results
,.fadeIn .content-select-countries
,.fadeIn .pagination{
  opacity: 1;
  -ms-transition:all 1s ease-in;
  -moz-transition:all 1s ease-in;
  -o-transition:all 1s ease-in;
  -webkit-transition:all 1s ease-in;
  transition:all 1s ease-in;
}
.fadeIn .wrapper-results{
  background-image: url("../assets/45-degree-fabric-dark-body.png");
  -ms-transition:all 1s ease-in;
  -moz-transition:all 1s ease-in;
  -o-transition:all 1s ease-in;
  -webkit-transition:all 1s ease-in;
  transition:all 1s ease-in
}
.fadeIn .nav-search{
  background-image: url("../assets/green-dust-and-scratches.png");
}

.nav-search{
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.content-box{
  margin: 0 .8rem;
  font-size: 2.2rem;
  font-family: 'Dancing Script', cursive, "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
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
  font-size: 1rem;
}
.content-select-countries label{
  margin-right: .5rem;
  display: inline-block;
  font-size: 1.2rem;
  font-family: 'Dancing Script', cursive, "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
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
 padding: 0 0 0 .3rem;
 margin: 0;
 background:rgba(0, 0, 0, 0.205);
 color: #fff;
 outline: 0;
 font-size: 1rem;
 cursor: pointer;
 -ms-transition:all 0.6s ease-out;
-moz-transition:all 0.6s ease-out;
-o-transition:all 0.6s ease-out;
-webkit-transition:all 0.6s ease-out;
transition:all 0.6s ease-out;
}
.content-select-countries .box-select-countries select:hover, 
.content-select-countries .box-select-countries select:focus{
  background:rgba(0, 0, 0, 0.7);
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
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
.search:focus,.nav-search:hover .search{
  background: rgba(0, 0, 0, 0.7);
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
.wrapper-search:hover .content-box .button{
  color: rgba(0, 0, 0, 0.7);
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
.content-box .button{
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
  font-size: 2.2rem;
  font-weight: bold;
}
.content-box .button:hover,.content-box .button:focus{
  border: unset; 
}
.pagination-list li.is-current a{
  color: #fff;
  background: #de5a22cc;
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
.pagination-list .pagination-ellipsis .pagination-previous,
.pagination-list .pagination-ellipsis .pagination-next{
  color: #b5b5b5;
  background: rgba(109, 106, 106, 0.801);
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
.pagination-previous:hover, .pagination-next:hover{
  color: #fff;
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
.pagination-list li a{
  background: rgba(0, 0, 0, 0.5);
  -ms-transition:all 0.6s ease-out;
  -moz-transition:all 0.6s ease-out;
  -o-transition:all 0.6s ease-out;
  -webkit-transition:all 0.6s ease-out;
  transition:all 0.6s ease-out;
}
.pagination-list li a.pagination-link:hover{
  color: #fff;
  background: #de5a229d;
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
</style>