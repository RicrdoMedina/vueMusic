<template lang="pug">
  section.section-main
    .container
      h1.tittle Top Tracks
      .columns
        .column.is-6
          .content-top-ten
            article(v-for="item in tracks")
              vm-card-tops(v-bind:item="item")
            
        .column.is-6
          .content-bio
            article
              h2 Wiki
              p.bio(v-if="infoTrack && infoTrack.wiki.summary") {{ infoTrack.wiki.summary }}
            article
              h3 Album
              .album
                figure
                  img(v-if="infoTrack.album && infoTrack.album.image[3]", v-bind:src="infoTrack.album.image[3]['#text']", alt="Placeholder image")
                  figcaption
                    p.name(v-if="infoTrack.album && infoTrack.album.title") {{ infoTrack.album.title }}
                    span.listeners {{ infoTrack.listeners }} listeners
                    span.playcount {{ infoTrack.playcount }} playcount
            article(v-if="infoAlbum.tracks && infoAlbum.tracks.track[0]")
              h3 Tracks
              table(class='table is-striped is-fullwidth')
                tr
                  th Track
                  th Duration
                tr(v-for="trackAlbum in infoAlbum.tracks.track")
                  td {{ trackAlbum.name }}
                  td {{ trackAlbum.duration }}
            article(v-else)
              h3 Top Tracks
              table(class='table is-striped is-fullwidth')
                tr
                  th Track
                  th Playcount
                  th Listeners
                tr(v-for="track in infoAlbum")
                  td {{ track.name }}
                  td {{ track.playcount }}
                  td {{ track.listeners }}
</template>

<script>

import trackService from '@/services/Tracks'

import VmMenuOptions from '@/components/MenuOptions.vue'

import VmCardTops from '@/components/CardTops.vue'

export default {
  name: 'app',
  data () {
    return {
      tracks: [],
      nameTrack: '',
      nameArtist: '',
      nameAlbum: '',
      infoTrack: '',
      infoAlbum: ''
    }
  },
  components: {
    VmMenuOptions,
    VmCardTops
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      trackService.getTopTracks()
        .then(res => {
          this.nameTrack = res.tracks.track[0].name
          this.nameArtist = res.tracks.track[0].artist.name
          this.tracks = res.tracks.track
          return trackService.trackGetInfo(this.nameArtist, this.nameTrack)
        })
        .then(res => {
          this.nameAlbum = res.track.album.title
          this.infoTrack = res.track
          return trackService.albumGetInfo(this.nameArtist, this.nameAlbum)
        })
        .then(res => {
          if (res.album && res.album.tracks.track[0]) {
            // console.log('tracks')
            this.infoAlbum = res.album
          } else {
            // console.log('no existe')
            return trackService.artistGetTopTracks(this.nameArtist)
          }
        })
        .then(res => {
          this.infoAlbum = res.toptracks.track
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