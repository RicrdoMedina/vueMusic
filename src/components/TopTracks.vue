<template lang="pug">
  section.section-main
    .container
      h1.tittle Top Tracks
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
  
            article(v-if="infoTrack.wiki && infoTrack.wiki.summary")
              h2 Wiki 
              .wrapper-box
                p.bio(v-if="infoTrack.wiki && infoTrack.wiki.summary") {{ infoTrack.wiki.summary }}

            article(v-else)
              h2 Biography
              .wrapper-box
                p.bio {{ bio }}

            article(v-if="infoAlbum && infoAlbum.image")
              h3 Album
              .wrapper-box
                vm-album(v-bind:album="infoAlbum")

            article(v-else)
              h3 Top Albums
              .wrapper-box
                vm-top-albums(v-bind:albums="albums")

            article(v-if="infoAlbum && infoAlbum.tracks.track[0]")
              h3 Tracks
              .wrapper-box
                vm-table-tracks(v-bind:tracks="infoAlbum.tracks.track")

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
      isUpdated: false,
      photoArtist: '',
      ranking: 1
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
          this.albums = res.topalbums.album
          return trackService.artistGetTopTracks(artist)
        })
        .then(res => {
          this.toptracks = res.toptracks.track
          return trackService.artistGetInfo(artist)
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