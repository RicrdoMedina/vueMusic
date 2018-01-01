<template lang="pug">
  #app
    .main
      vue-header
      section.section-main
        .columns
          .column
            nav.nav-search
              form
                input.search(
                  type="text",
                  placeholder="Buscar canciones",
                )
                a.button
                  icon(name="search" scale="1")
        menu-options
        .container
          article.show-results
            .wrapper-card(v-for="t in tracks")
              .card
                .card-image
                  figure.image.is-4by3
                    img(v-bind:src="t.image[2]['#text']", alt="Placeholder image")
                .card-content
                  .media
                    .media-content
                      p.title {{ t.name }}
                      p.subtitle {{ t.artist.name }}
                  .content
                    | Popular right now.

      vue-footer
</template>

<script>

import trackService from '@/services/PopularTrack'

import VueHeader from '@/components/layout/Header.vue'
import VueFooter from '@/components/layout/Footer.vue'

import MenuOptions from '@/components/MenuOptions.vue'

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
    MenuOptions
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
.main{
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
.show-results{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; 
}
.show-results .wrapper-card{
  width: 250px;
  margin-top: 2rem;
}
.wrapper-card .card{
  background-color: transparent;
}
.wrapper-card .card-content{
  padding: .2rem .9rem;
  height: 40px;
  background: $background-vue;
  color:$color-vue;
}
.wrapper-card .card-content .media{
  position: relative;
  top: -63px;
  width: 249px;
  left: -14px;
  box-sizing: border-box;
}
.media .media-content{
  height: 60px;
  background: #de592257;
  padding: .4rem 0 0 .5rem;
}
.wrapper-card .card-content .content{
  position: relative;
  top: -65px;
}
.wrapper-card .card-content .title{
  font-size: 1rem;
  color:$white;
  font-weight: 300;
}
.wrapper-card .card-content .subtitle{
  font-size: .9rem;
  color:$white;
}
.section-main{
  flex: 1;
  padding-top: 6.5rem;
}
.section-main form{
  text-align: center;
}

.search{
  height: 35px;
  border-left: solid $color-vue 1px;
  border-bottom: solid $color-vue 1px;
  border-top: solid $color-vue 1px;
  outline: 0;
  width: 400px;
  padding: 0 .5rem;
  font-size: 1rem;
  background: $background-vue;
}
.button{
  border-radius: unset;
  background: $color-vue;
  border: unset;
  position: relative;
  left: -2px;
  height: 35px;
}
.button:hover,.button.focus{
  border: unset; 
}
.nav-items ul{
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
.nav-items ul li{
  display: inline-block;
  vertical-align: top;
  padding: .4rem;
  margin: 0 .5rem;
  background: $background-vue;
  color:$color-vue;
  min-width: 140px;
  cursor:pointer;
}
.footer{
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 2rem;
  background: $background-vue;
  color:$color-vue;
}
</style>
