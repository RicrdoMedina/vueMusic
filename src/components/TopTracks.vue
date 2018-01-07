<template lang="pug">
  section.section-main
    .container
      h1.tittle Top Tracks
      .columns
        .column.is-6
          .content-top-ten
            article(v-for="item in tracks")
              vm-card-tops(
                            @select="setSelectedTrack", 
                            v-bind:item="item",
                            v-bind:class="{ 'is-active': item.url === selected }"
                          )
            
        .column.is-6
          .content-bio(v-bind:class="{ 'is-updated': isUpdated }")

            article(v-if="infoTrack.wiki && infoTrack.wiki.summary")
              h2 Wiki
              .wrapper-box
                p.bio(v-if="infoTrack.wiki && infoTrack.wiki.summary") {{ infoTrack.wiki.summary }}

            article(v-else)
              h2 Biography
              .wrapper-box
                p.bio {{ bio }}

            article(v-if="infoTrack.album && infoTrack.album.image[3]")
              h3 Album
              .wrapper-box
                vm-album(v-bind:album="infoTrack.album")

            article(v-else)
              h3 Top Albums
              .wrapper-box
                vm-top-albums(v-bind:albums="albums")

            article(v-if="infoAlbum.tracks && infoAlbum.tracks.track[0]")
              h3 Tracks
              .wrapper-box
                vm-table-top-tracks(v-bind:tracks="infoAlbum.tracks.track")

            article(v-else)
              h3 Top Tracks
              .wrapper-box
                vm-table-top-tracks(v-bind:tracks="toptracks")
</template>

<script>

import trackService from '@/services/Tracks'

import VmMenuOptions from '@/components/MenuOptions.vue'

import VmCardTops from '@/components/CardTops.vue'

import VmTableTopTracks from '@/components/TableTopTracks.vue'

import VmTableTracks from '@/components/TableTracks.vue'

import VmTopAlbums from '@/components/TopAlbums.vue'

import VmAlbum from '@/components/Album.vue'

export default {
  name: 'app',
  data () {
    return {
      tracks: [],
      nameTrack: '',
      nameArtist: '',
      nameAlbum: '',
      bio: '',
      infoTrack: [],
      infoAlbum: [],
      albums: [],
      toptracks: [],
      selected: '',
      isUpdated: false
    }
  },
  components: {
    VmMenuOptions,
    VmCardTops,
    VmTableTopTracks,
    VmTableTracks,
    VmTopAlbums,
    VmAlbum
  },
  created () {
    this.getAll()
  },
  methods: {
    getAll () {
      trackService.getTopTracks()
        .then(res => {
          this.nameTrack = res.tracks.track[0].name
          this.nameArtist = res.tracks.track[0].artist.name
          this.tracks = res.tracks.track
          this.getData()
        })
    },
    setSelectedTrack (id, artist, track) {
      this.selected = id
      this.nameArtist = artist
      this.nameTrack = track
      this.isUpdated = true
      this.getData()
      setTimeout(() => {
        this.isUpdated = false
      }, 3000)
    },
    getData () {
      trackService.trackGetInfo(this.nameArtist, this.nameTrack)
        .then(res => {
          this.nameAlbum = res.track.album === undefined ? 'No found' : res.track.album.title
          this.infoTrack = res.track
          return trackService.albumGetInfo(this.nameArtist, this.nameAlbum)
        })
        .then(res => {
          this.infoAlbum = res.album && res.album.tracks.track[0] ? res.album : 'No found'
          return trackService.artistGetTopAlbums(this.nameArtist)
        })
        .then(res => {
          this.albums = res.topalbums.album
          return trackService.artistGetTopTracks(this.nameArtist)
        })
        .then(res => {
          this.toptracks = res.toptracks.track
          return trackService.artistGetInfo(this.nameArtist)
        })
        .then(res => {
          this.bio = res.artist.bio.summary
        })
    },
    getRoute () {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss">

@import 'src/scss/general.scss';

@import 'src/scss/TopArtists/GalleryTopAlbums.scss';

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