<template lang="pug">
  #app
    .wrapper
      vue-header
      section.section-main
        search
        menu-options
        .container
          article.show-results
            .wrapper-card(v-for="t in tracks")
              card-tracks-popular(v-bind:track="t")
      vue-footer
</template>

<script>

import trackService from '@/services/PopularTrack'

import VueHeader from '@/components/layout/Header.vue'
import VueFooter from '@/components/layout/Footer.vue'

import MenuOptions from '@/components/MenuOptions.vue'
import Search from '@/components/Search.vue'
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
    Search,
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
}
</style>
