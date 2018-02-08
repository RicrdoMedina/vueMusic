<template lang="pug">
  section#sectionMain.section-main(v-bind:class="{ 'is-loaded': isLoading }")
    vue-headful(title='Top tracks most populars of moment', description="Library of songs most populars, Find and Browse your favorite music, Top tracks and artists most populars of moment")
    vm-loader
    .box-hero
      h1.tittle 
        span Top Tracks
    .container
      .columns.is-mobile.is-table.is-desktop
        .column.is-12-mobile.is-12-tablet.is-5-desktop
          .content-top-ten
            article(v-for="(item, index) in tracks")
              vm-card-tops(
                            @select="setSelectedTrack", 
                            v-bind:item="item",
                            v-bind:index="index",
                            v-bind:class="{ 'is-active': item.url === selected }"
                          )
            
        #containerInfo.column.is-10-mobile.is-10-tablet.is-7-desktop
          .icon-bars(@click="closeModalInfo()", class="close") 
            icon(name="times" scale="2")
          .content-bio(v-bind:class="{ 'is-updated': isUpdated }")
            #loaderInfo.loader
            article.info.toptrack
              .wrapper-box
                figure(class='content-image')
                  img(v-bind:src="photoArtist", v-bind:alt="nameTrack", v-bind:title="nameTrack")
                  .number-top # {{ ranking }}
                p.track {{ nameTrack }}
                p.artist {{ nameArtist }}
  
            article
              h2 {{ info.tipo }}
              .wrapper-box
                p.bio {{ info.descripcion }}

            article
              h3 {{ descriptionAlbum }}
              .wrapper-box
                vm-albums(v-bind:albums="albums")

            article
              h3 {{ tableTrack }}
              .wrapper-box
                vm-table-tracks(v-bind:tracks="artistTracks", v-bind:table="isTable")
</template>

<script>

import trackService from '@/services/Tracks'

import fadeInMixin from '@/mixins/FadeIn'

import loaderMixin from '@/mixins/Loader'

import closeMenuMixin from '@/mixins/CloseMenu'

import dataTopsMixin from '@/mixins/DataTops'

import modalMixin from '@/mixins/Modal'

import updateBoxMixin from '@/mixins/updateBox'

import mediaQueryMixin from '@/mixins/MediaQuery'

import scrollTopElementMixin from '@/mixins/ScrollTopElement'

import VmLoader from '@/components/shared/Loader.vue'

import VmCardTops from '@/components/CardTops.vue'

import VmTableTracks from '@/components/TableTracks.vue'

import VmAlbums from '@/components/Albums.vue'

import vueHeadful from 'vue-headful'

export default {
  name: 'app',
  data () {
    return {
      nameTrack: '',
      nameArtist: '',
      nameAlbum: '',
      tableTrack: '',
      info: {},
      descriptionAlbum: '',
      infoTrack: [],
      infoAlbum: [],
      artistTracks: []
    }
  },
  mixins: [fadeInMixin, loaderMixin, dataTopsMixin, closeMenuMixin, modalMixin, mediaQueryMixin, updateBoxMixin, scrollTopElementMixin],
  components: {
    VmCardTops,
    VmTableTracks,
    VmAlbums,
    VmLoader,
    vueHeadful
  },
  created () {
    this.getAll()
  },
  methods: {
    getAll () {
      let limit = 15
      trackService.getTopTracks(limit)
        .then(res => {
          let track = res.tracks.track[0].name
          let artist = res.tracks.track[0].artist.name
          let photo = res.tracks.track[0].image[2]['#text']
          let ranking = 1
          this.tracks = res.tracks.track
          this.getData(artist, track, photo, ranking)
        })
    },
    setSelectedTrack (id, artist, track, photo, ranking) {
      this.selected = id
      this.getData(artist, track, photo, ranking)
      let maxWidth = 'max-width:1023px'
      let $contentBio = document.querySelector('.content-bio')
      if (this.mediaQuery(maxWidth)) {
        this.scrollTop($contentBio)
        this.openModal()
      }
      this.updateBox()
    },
    updateInfoSelected (artist, track, photo, ranking) {
      this.nameArtist = artist
      this.nameTrack = track
      this.photoArtist = photo
      this.ranking = ranking
    },
    getData (artist, track, photo, ranking) {
      trackService.trackGetInfo(artist, track)
        .then(res => {
          this.nameAlbum = res.track.album === undefined ? 'No found' : res.track.album.title
          this.infoTrack = res.track
          return trackService.albumGetInfo(artist, this.nameAlbum)
        })
        .then(res => {
          this.infoAlbum = res.album
          return trackService.artistGetTopAlbums(artist)
        })
        .then(res => {
          if (this.infoAlbum && this.infoAlbum.name) {
            let objAlbum = {}
            objAlbum.name = this.infoAlbum.name
            objAlbum.playcount = this.infoAlbum.playcount
            objAlbum.image = this.infoAlbum.image
            this.albums = new Array(objAlbum)
            this.descriptionAlbum = 'Album'
          } else {
            this.albums = res.topalbums.album
            this.descriptionAlbum = 'Top Albums'
          }
          return trackService.artistGetTopTracks(artist)
        })
        .then(res => {
          if (this.infoAlbum && this.infoAlbum.tracks.track[0]) {
            this.artistTracks = this.infoAlbum.tracks.track
            this.tableTrack = 'Tracks'
            this.isTable = 1
          } else {
            this.artistTracks = res.toptracks.track
            this.isTable = 0
            this.tableTrack = 'Top Tracks'
          }
          return trackService.artistGetInfo(artist)
        })
        .then(res => {
          if (this.infoTrack.wiki && this.infoTrack.wiki.summary) {
            this.info.tipo = 'Wiki'
            this.info.descripcion = this.infoTrack.wiki.summary
          } else {
            this.info.descripcion = res.artist.bio.summary
            this.info.tipo = 'Biography'
          }
          this.isLoading = true
          this.fadeIn()
          this.updateInfoSelected(artist, track, photo, ranking)
          this.updatedBox()
        })
    }
  }
}
</script>

<style lang="scss">

@import 'src/scss/general.scss';
@import 'src/scss/TopArtists/GalleryTopAlbums.scss';
@import 'src/scss/loader-card.scss';
@import 'src/scss/media-queries.scss';

.box-hero .tittle span,
.content-top-ten article,
.content-bio > *
{
  opacity: 0;
  transition:all 1s ease-out;
  will-change: auto;
}
.fadeIn .box-hero .tittle span,
.fadeIn .content-top-ten article,
.fadeIn .content-bio > *
{
  opacity: 1;
  transition:all 1s ease-in;
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
</style>