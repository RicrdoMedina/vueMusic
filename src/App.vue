<template lang="pug">
  #app
    .wrapper
      vue-header
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
        menu-options
        .container
          article.show-results
            .wrapper-card(v-for="t in tracks")
              card-tracks-popular(v-bind:track="t")
      vue-footer
</template>

<script>

import trackService from '@/services/Tracks'

import VueHeader from '@/components/layout/Header.vue'
import VueFooter from '@/components/layout/Footer.vue'

import MenuOptions from '@/components/MenuOptions.vue'
import CardTracksPopular from '@/components/CardTracksPopular.vue'

export default {
  name: 'app',
  data () {
    return {
      searchQuery: '',
      tracks: []
    }
  },
  components: {
    VueHeader,
    VueFooter,
    MenuOptions,
    CardTracksPopular
  },
  created () {
    this.tracksPopular()
  },
  methods: {
    tracksPopular () {
      trackService.tracks()
        .then(res => {
          this.tracks = res.lovedtracks.track
        })
    },
    search () {
      if (this.searchQuery === '') {}
      console.log('hola')
      trackService.search(this.searchQuery)
        .then(res => {
          console.dir(res.results.trackmatches.track)
          this.tracks = res.results.trackmatches.track
        })
    }
  }
}
</script>

<style lang="scss">
@import 'src/scss/main.scss';
@import url("https://fonts.googleapis.com/css?family=Roboto");

$color-vue : rgb(222,89,34);
$background-vue : #ffffff36;

body{
  font-family:'Roboto', Times, serif;
}
a,a:link,a:active,a:visited,a:focus,a:hover{
  color: $color-vue;
}
#app{
  // background: url('https://images.unsplash.com/photo-1477346611705-65d1883cee1e?dpr=0.800000011920929&auto=format&fit=crop&w=1199&h=800&q=80&cs=tinysrgb&crop=') fixed no-repeat;
  // background-size: cover;
  background: $black;
}
.wrapper{
  min-height: 100vh;
  padding: 0;
  margin: 0;
  border: 0;
  display: flex;
  flex-direction: column;
}
.container{
  margin-top:1rem;
}
.section-main{
  flex: 1;
  padding-top: 6.5rem;
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
  background: #ffffff36;
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
