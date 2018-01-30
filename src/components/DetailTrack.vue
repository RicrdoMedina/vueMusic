<template lang="pug">
  section#sectionMain.section-main(v-bind:class="{ 'is-loaded': isLoading }")
    vm-loader
    .box-hero
      h1.tittle 
        span {{ infoTrack.name }}
    .container.detail-track
      .columns
        .column.is-12-mobile.is-12-tablet.is-6-desktop
          .content-info-track.detail
            article
              figure(class='content-image')
                img(v-if="infoArtist && infoArtist.name", v-bind:src="infoArtist.image[5]['#text']", alt="Placeholder image")
                figcaption
                  p.artist {{ infoArtist.name }}
                  p.track {{ infoTrack.name }}
                  span.listeners {{ infoTrack.listeners | int-to-dec }} listeners
                  span.playcount {{ infoTrack.playcount | int-to-dec }} playcount
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

export default {
  name: 'app',
  data () {
    return {
      infoTrack: {},
      infoArtist: {},
      topAlbums: {},
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
    VmLoader
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      const artist = this.$route.params.artist
      const track = this.$route.params.track
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
.box-hero.tittle span,
.content-info-track article,
.content-bio > *
{
  opacity: 0;
  transition:all 1s ease-out;
  will-change: auto;
}
.fadeIn .box-hero .tittle span,
.fadeIn .content-info-track article,
.fadeIn .content-bio > *
{
  opacity: 1;
  transition:all 1s ease-in;
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
  }
  .section-main .content-info-track.detail{
    margin: 4rem auto 1rem;
  }
}
</style>