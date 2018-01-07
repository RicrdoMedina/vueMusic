<template lang="pug">
  section.section-main
    .container
      h1.tittle Top Artists
      .columns
        .column.is-6
          .content-top-ten
            article(v-for="item in artists")
              vm-card-tops(
                            @select="setSelectedTrack", 
                            v-bind:item="item",
                            v-bind:class="{ 'is-active': item.url === selected }"
                          )
            
        .column.is-6
          .content-bio(v-bind:class="{ 'is-updated': isUpdated }")
            article
              h2 Biography
              .wrapper-box
                p.bio {{ bio }}
            article
              h3 Top Albums
              .wrapper-box
                vm-top-albums(v-bind:albums="albums")
            article
              h3 Top Tracks
              .wrapper-box
                vm-table-top-tracks(v-bind:tracks="tracks")
                
</template>
<script>
import trackService from '@/services/Tracks'

import VmMenuOptions from '@/components/MenuOptions.vue'

import VmCardTops from '@/components/CardTops.vue'

import VmTableTopTracks from '@/components/TableTopTracks.vue'

import VmTopAlbums from '@/components/TopAlbums.vue'

export default {
  name: 'app',
  data () {
    return {
      artists: [],
      nameArtistTop: '',
      bio: '',
      albums: [],
      tracks: [],
      selected: '',
      isUpdated: false
    }
  },
  components: {
    VmMenuOptions,
    VmCardTops,
    VmTableTopTracks,
    VmTopAlbums
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      trackService.topArtists()
        .then(res => {
          this.nameArtistTop = res.artists.artist[0].name
          this.artists = res.artists.artist
          return trackService.artistGetInfo(this.nameArtistTop)
        })
        .then(res => {
          this.bio = res.artist.bio.summary
          return trackService.artistGetTopAlbums(this.nameArtistTop)
        })
        .then(res => {
          this.albums = res.topalbums.album
          return trackService.artistGetTopTracks(this.nameArtistTop)
        })
        .then(res => {
          this.tracks = res.toptracks.track
        })
    },
    setSelectedTrack (id, track, artist) {
      this.selected = id
      this.nameArtistTop = artist

      trackService.artistGetInfo(this.nameArtistTop)
        .then(res => {
          this.bio = res.artist.bio.summary
          return trackService.artistGetTopAlbums(this.nameArtistTop)
        })
        .then(res => {
          this.albums = res.topalbums.album
          return trackService.artistGetTopTracks(this.nameArtistTop)
        })
        .then(res => {
          this.tracks = res.toptracks.track
        })
      this.isUpdated = true
      setTimeout(() => {
        this.isUpdated = false
      }, 3000)
    }
  }
}
</script>

<style lang="scss">

@import 'src/scss/general.scss';

@import 'src/scss/TopArtists/GalleryTopAlbums.scss';

</style>