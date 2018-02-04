<template lang="pug">
  section#sectionMain.section-main(v-bind:class="{ 'is-loaded': isLoading }")
    vue-headful(:title="title", description="Library of songs most populars, Find and Browse your favorite music, Top tracks and artists most populars of moment")
    vm-loader
    .box-hero
      figure(class='content-image')
        img(v-if="infoArtist && infoArtist.name", v-bind:src="infoArtist.image[5]['#text']", v-bind:alt="infoArtist.name")
        figcaption
          p.track {{ infoTrack.name }}
          p.artist {{ infoArtist.name }}
          span.listeners {{ infoTrack.listeners | int-to-dec }} listeners
          span.playcount {{ infoTrack.playcount | int-to-dec }} playcount
    .container.detail-track
      .columns
        .column.is-12-mobile.is-12-tablet.is-6-desktop
          .content-info-track.detail
            article.content-wiki
              h3 Wiki
              p.wiki {{ wiki}}

            article
              figure(class='content-image')
                img(v-bind:src="photoAlbum", alt="Placeholder image")
                figcaption
                  p.artist Album
                  p.track {{ album && album.name ? album.name : 'No avalaible' }}
                  span.listeners {{ albumListeners | int-to-dec }} listeners
                  span.playcount {{ albumPlaycount | int-to-dec }} playcount
            article
              h3 Tracks
              vm-table-tracks(v-bind:tracks="trackAlbum", v-bind:table="isTableTracks")
            
        .column.is-12-mobile.is-12-tablet.is-6-desktop
          .content-bio.detail
            article
              h3 Biography
              p.bio {{ bio }}
            article
              h3 Top Albums
              vm-albums(v-bind:albums="topAlbums")

            article
              h3 Top Tracks
              vm-table-tracks(v-bind:tracks="topTracks", v-bind:table="isTableTopTracks")
</template>

<script>

import trackService from '@/services/Tracks'

import fadeInMixin from '@/mixins/FadeIn'

import closeMenuMixin from '@/mixins/CloseMenu'

import VmLoader from '@/components/shared/Loader.vue'

import VmTableTracks from '@/components/TableTracks.vue'

import VmAlbums from '@/components/Albums.vue'

import vueHeadful from 'vue-headful'

export default {
  name: 'app',
  data () {
    return {
      infoTrack: {},
      infoArtist: {},
      topAlbums: {},
      title: '',
      wiki: 'No avalaible',
      bio: 'No avalaible',
      photoAlbum: '',
      topTracks: {},
      trackAlbum: {},
      isTableTopTracks: 0,
      isTableTracks: 1,
      isLoading: false,
      album: {},
      albumListeners: 0,
      albumPlaycount: 0,
      nameAlbum: 'No avalaible'
    }
  },
  mixins: [fadeInMixin, closeMenuMixin],
  components: {
    VmTableTracks,
    VmAlbums,
    VmLoader,
    vueHeadful
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      const artist = this.$route.params.artist
      const track = this.$route.params.track
      this.title = `${track} - ${artist}`
      trackService.trackGetInfo(artist, track)
        .then(res => {
          this.nameAlbum = res.track.album === undefined ? 'No found' : res.track.album.title
          this.infoTrack = res.track
          if (this.infoTrack.wiki && this.infoTrack.wiki.summary) {
            this.wiki = this.infoTrack.wiki.summary
          }
          return trackService.albumGetInfo(artist, this.nameAlbum)
        })
        .then(res => {
          if (res.album && res.album.tracks) {
            this.album = res.album
            this.albumListeners = this.album.listeners
            this.albumPlaycount = this.album.playcount
            this.trackAlbum = res.album.tracks.track
            this.photoAlbum = res.album.image[3]['#text']
          }
          return trackService.artistGetInfo(artist)
        })
        .then(res => {
          this.infoArtist = res.artist
          if (this.infoArtist.bio && this.infoArtist.bio.summary) {
            this.bio = this.infoArtist.bio.summary
          }
          return trackService.artistGetTopAlbums(artist)
        })
        .then(res => {
          this.topAlbums = res.topalbums.album
          return trackService.artistGetTopTracks(artist)
        })
        .then(res => {
          this.topTracks = res.toptracks.track
          this.isLoading = true
          this.fadeIn()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss">

@import 'src/scss/general.scss';
@import 'src/scss/TopArtists/GalleryTopAlbums.scss';
@import 'src/scss/media-queries.scss';
.box-hero .content-image,
.content-info-track article,
.content-bio > *
{
  opacity: 0;
  transition:all 1s ease-out;
  will-change: auto;
}
.fadeIn .box-hero .content-image,
.fadeIn .content-info-track article,
.fadeIn .content-bio > *
{
  opacity: 1;
  transition:all 1s ease-in;
}
.section-main .content-info-track.detail,
.section-main .content-bio.detail{
  min-height: 1300px;
}
.section-main .content-info-track.detail .content-wiki{
  margin-top: 0;
}
.content-info-track article{
  margin-top: 1.5rem;
}
.content-info-track figure{
  width: 90%;
  display: block;
  margin: 0 auto;
  text-align: center;
}
.content-info-track .listeners,.content-info-track .playcount{
  font-size: 1rem;
  margin-right: .6rem;
  color: rgb(181, 181, 181);
  font-style:oblique;
}
.box-hero{
  padding-bottom: 1rem;
}
.box-hero .content-image{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box-hero .content-image figcaption{
  margin-left: 2rem;
}
.box-hero .content-image  p.track,
.box-hero .content-image  span.listeners,
.box-hero .content-image span.playcount{
  color:#ccc;
  font-size: 1.2rem;
}
.box-hero .content-image  span.listeners{
  margin-right: .5rem;
}
.box-hero .content-image  span.listeners,
.box-hero .content-image span.playcount{
  font-style: oblique;
}
.box-hero .content-image  p.track{
  font-size: 2.6rem;
  color: #ffdd57f1;
  font-family: 'Dancing Script', cursive, "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
}
.box-hero .content-image p.artist{
  color: rgba(253, 181, 80, 0.877);
  font-family: 'Dancing Script', cursive, "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
}
.box-hero .content-image img {
  width: 20%;
  border: solid 6px rgba(253, 181, 80, 0.795);
}
.content-wiki p{
  text-align: justify;
}
.album figure{
  height: 300px;
}
.album figcaption{
  position: relative;
  top: -70px;
  height: 64px;
  background: rgba(0, 0, 0, 0.58);
  width: 300px;
  padding: .2rem .4rem;
}
.album figcaption .name{
  color: #fff;
}
.album figcaption .name{
  font-size: 1.2rem;
}
.album figcaption .listeners, .album figcaption .playcount{
  color:#fff;
  font-size: .9rem;
  margin: 0 .5rem 0 0;
}

@media only screen 
and (min-width : 320px) 
and (max-width : 540px) {
  #sectionMain.section-main .content-info-track.detail,
  #sectionMain.section-main .content-bio.detail{
    width: 100%;
  }
  .content-image .track{
    font-size: 1.3rem;
  }
  .section-main .content-bio.detail{
    margin: 4rem 0 0;
  }
  .section-main .content-info-track{
    margin: 3rem 0 1rem;
  }
  #sectionMain.section-main  .box-hero .content-image img {
    width: 60%;
  }
}
@media only screen 
and (max-width : 767px) {
  .section-main  .box-hero .content-image img {
    width: 40%;
  }
  #sectionMain.section-main  .box-hero .content-image {
    flex-direction: column;
  }
  .box-hero .content-image figcaption {
    margin-left: 0;
    width: 100%;
  }
  .box-hero .content-image  p.track{
    font-size: 2.4rem;
  }
  .box-hero .content-image  p.artist{
    font-size: 1.8rem;
  }
}
@media only screen 
and (min-width : 767px)
and (max-width : 1024px) {
  .section-main  .box-hero .content-image img {
    width: 36%;
  }
}
@media only screen 
and (max-width : 1024px) {
  .box-hero .tittle{
    width: 90%;
  }
  .section-main .container.detail-track .columns{
    display: block;
  }
  .section-main .content-info-track.detail,
  .section-main .content-bio.detail{
    width: 80%;
    margin: 2rem auto 1rem;
    position: static;
    height: auto;
    min-height: unset;
  }
  .section-main .content-info-track.detail{
    margin: 4rem auto 1rem;
  }
}
</style>