<template lang="pug">
  main
    vue-headful(title='Find and Browse Music', description="Library of songs most populars, Find and Browse your favorite music, Top tracks and artists most populars of moment")
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
            span.number-page {{numberPage}} / 100
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

import vueHeadful from 'vue-headful'

export default {
  name: 'app',
  data () {
    return {
      searchQuery: '',
      tracks: [],
      titleMain: 'Tracks Populars Spain',
      numberPage: 1,
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
    Paginate,
    vueHeadful
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
        this.numberPage = 1
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
        this.numberPage = pageNum
      } else {
        this.getTracks(pageNum)
        this.numberPage = pageNum
      }
    },
    search (event) {
      if ((this.searchQuery === '') || (/^\s/.test(this.searchQuery))) return
      if (event.key === 'Enter') this.selectedCountry = false
      this.$refs.paginate.selected = 0
      this.numberPage = 1
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
.number-page{
  position: absolute;
  right: 20px;
  top: 35px;
  color: #fff;
}
.wrapper-results{
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem 1rem 1.2rem;
  margin: 2.5rem auto 2rem;
  transition:all 1s ease-out;
  will-change: auto;
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
,.pagination
,.number-page{
  opacity: 0;
  transition:all 1s ease-out;
  will-change: auto;
}
.fadeIn .nav-search
,.fadeIn .title-main h2
,.fadeIn .show-results
,.fadeIn .content-select-countries
,.fadeIn .pagination,
.fadeIn .number-page{
  opacity: 1;
  transition:all 1s ease-in;
}
.fadeIn .wrapper-results{
  background-image: url("https://ricrdomedina.github.io/vueMusic/dist/45-degree-fabric-dark-body.png");
  transition:all 1s ease-in
}
.fadeIn .nav-search{
  background-image: url("https://ricrdomedina.github.io/vueMusic/dist/green-dust-and-scratches.png");
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
 transition:all 0.6s ease-out;
 will-change: auto;
}
.content-select-countries .box-select-countries select:hover, 
.content-select-countries .box-select-countries select:focus{
 background:rgba(0, 0, 0, 0.7);
 transition:all 0.6s ease-in;
}
.box-result{
 margin-top:20px;
 transition:all 0.6s ease-out;
 will-change: auto;
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
  transition:all 0.6s ease-out;
  will-change: auto;
}
.search:focus,.nav-search:hover .search{
  background: rgba(0, 0, 0, 0.7);
  transition:all 0.6s ease-in;
}
.wrapper-search:hover .content-box .button{
  color: rgba(0, 0, 0, 0.7);
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
  transition:all 0.6s ease-out;
  will-change: auto;
  font-size: 2.2rem;
  font-weight: bold;
}
.content-box .button:hover,.content-box .button:focus{
  border: unset; 
}
.pagination-list li.is-current a{
  color: #fff;
  background: #de5a22cc;
  transition:all 0.6s ease-in;
}
.pagination-list .pagination-ellipsis .pagination-previous,
.pagination-list .pagination-ellipsis .pagination-next{
  color: #b5b5b5;
  background: rgba(109, 106, 106, 0.801);
  transition:all 0.6s ease-in;
}
.pagination-previous:hover, .pagination-next:hover{
  color: #fff;
  transition:all 0.6s ease-in;
}
.pagination-list li a{
  background: rgba(0, 0, 0, 0.5);
  transition:all 0.6s ease-out;
  will-change: auto;
}
.pagination-list li a.pagination-link:hover{
  color: #fff;
  background: #de5a229d;
  transition:all 0.6s ease-in;
}

@media only screen 
and (min-width : 320px) 
and (max-width : 540px) {
  .nav-search .content-box:first-child,
  .wrapper-search .box-result{
    display: none;
  }
  .nav-search .search{
    width: 84%;
  }
  .nav-search .content-box .button{
    background:#fff;
    color:rgba(0, 0, 0, 0.7);
    height: 50px;
    top:0;
  }
  .section-main .content-select-countries{
    bottom: 20px;
  }
  .section-main .title-main{
    margin-bottom: 2rem;
  }
  .section-main .wrapper-results .number-page {
    position: static;
    right: unset;
    top: unset;
    text-align: right;
    color: #fff;
    display: block;
    height: 0;
    padding: 0;
  }
  .section-main .show-results .wrapper-card{
    margin: 2.5rem auto 1rem;
    width: 70%;
  }
}

@media only screen 
and (min-width : 541px) 
and (max-width : 960px) {
  .section-main .show-results {
    justify-content: space-around;
  }

}
@media only screen 
and (max-width : 767px) {
  .section-main .wrapper-search{
    min-height: 200px;
    padding: 3rem .3rem 1.4rem;
  }
  .nav-search .content-box{
    display: flex;
  }
  .nav-search .search{
    width: 90%;
  }
}

</style>