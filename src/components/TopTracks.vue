<template lang="pug">
  section#sectionMain.section-main(v-bind:class="{ 'is-loaded': isLoading }")
    vm-loader
    .box-hero
      h1.tittle 
        span Top Tracks
    .container
      .columns
        .column.is-6
          .content-top-ten
            article(v-for="(item, index) in tracks")
              vm-card-tops(
                            @select="setSelectedTrack", 
                            v-bind:item="item",
                            v-bind:index="index",
                            v-bind:class="{ 'is-active': item.url === selected }"
                          )
            
        .column.is-6
          .content-bio(v-bind:class="{ 'is-updated': isUpdated }")
            article.info.toptrack
              .wrapper-box
                figure(class='content-image')
                  img(v-bind:src="photoArtist", alt="Placeholder image")
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

import VmLoader from '@/components/shared/Loader.vue'

import VmCardTops from '@/components/CardTops.vue'

import VmTableTracks from '@/components/TableTracks.vue'

import VmAlbums from '@/components/Albums.vue'

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
  mixins: [fadeInMixin, loaderMixin, dataTopsMixin, closeMenuMixin],
  components: {
    VmCardTops,
    VmTableTracks,
    VmAlbums,
    VmLoader
  },
  created () {
    this.getAll()
  },
  methods: {
    getAll () {
      let limit = 15
      trackService.getTopTracks(limit)
        .then(res => {
          this.nameTrack = res.tracks.track[0].name
          this.nameArtist = res.tracks.track[0].artist.name
          this.photoArtist = res.tracks.track[0].image[2]['#text']
          this.tracks = res.tracks.track
          this.getData(this.nameArtist, this.nameTrack)
        })
    },
    setSelectedTrack (id, artist, track, photo, ranking) {
      this.isUpdated = true
      this.selected = id
      this.getData(artist, track)
      setTimeout(() => {
        this.isUpdated = false
        this.nameArtist = artist
        this.nameTrack = track
        this.photoArtist = photo
        this.ranking = ranking
      }, 3000)
    },
    getData (artist, track) {
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
        })
    }
  }
}
</script>

<style lang="scss">

@import 'src/scss/general.scss';

@import 'src/scss/TopArtists/GalleryTopAlbums.scss';


.box-hero .tittle span,
.content-top-ten article,
.content-bio > *
{
  opacity: 0;
  -ms-transition:all 1s ease-out;
  -moz-transition:all 1s ease-out;
  -o-transition:all 1s ease-out;
  -webkit-transition:all 1s ease-out;
  transition:all 1s ease-out;
}
.fadeIn .box-hero .tittle span,
.fadeIn .content-top-ten article,
.fadeIn .content-bio > *
{
  opacity: 1;
  -ms-transition:all 1s ease-in;
  -moz-transition:all 1s ease-in;
  -o-transition:all 1s ease-in;
  -webkit-transition:all 1s ease-in;
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