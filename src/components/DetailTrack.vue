<template lang="pug">
  section.section-main
    .container
      h1.tittle {{ infoTrack.name }}
      .columns
        .column.is-6
          .content-info-track
            article
              figure(class='content-image')
                img(v-if="infoArtist && infoArtist.name", v-bind:src="infoArtist.image[5]['#text']", alt="Placeholder image")
                figcaption
                  p.artist {{ infoArtist.name }}
                  p.track {{ infoTrack.name }}
                  span.listeners {{ infoTrack.listeners }} listeners
                  span.playcount {{ infoTrack.playcount }} playcount
            article.content-wiki(v-if="infoTrack && infoTrack.wiki")
              h3 Wiki
              p.wiki {{ infoTrack.wiki.summary }}

            article
              figure(class='content-image',v-if="album && album.name")
                img(v-bind:src="album.image[3]['#text']", alt="Placeholder image")
                figcaption
                  p.artist Album
                  p.track {{ album.name }}
                  span.listeners {{ album.listeners }} listeners
                  span.playcount {{ album.playcount }} playcount
            article(v-if="album && album.tracks.track[0]")
              h3 Tracks
              vm-table-tracks(v-bind:tracks="album.tracks.track")
            
        .column.is-6
          .content-bio
            article(v-if="infoArtist && infoArtist.bio")
              h3 Biography
              p.bio {{ infoArtist.bio.summary }}
            article
              h3 Top Albums
              vm-top-albums(v-bind:albums="topAlbums")

            article
              h3 Top Tracks
              vm-table-top-tracks(v-bind:tracks="topTracks")
           
         
</template>

<script>

import trackService from '@/services/Tracks'

import VmTableTopTracks from '@/components/TableTopTracks.vue'

import VmTopAlbums from '@/components/TopAlbums.vue'

import VmTableTracks from '@/components/TableTracks.vue'

export default {
  name: 'app',
  data () {
    return {
      infoTrack: {},
      infoArtist: {},
      topAlbums: {},
      topTracks: {},
      album: {},
      nameAlbum: ''
    }
  },
  components: {
    VmTableTopTracks,
    VmTopAlbums,
    VmTableTracks
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
          return trackService.artistGetInfo(artist)
        })
        .then(res => {
          this.infoArtist = res.artist
          return trackService.artistGetTopAlbums(artist)
        })
        .then(res => {
          this.topAlbums = res.topalbums.album
          return trackService.artistGetTopTracks(artist)
        })
        .then(res => {
          this.topTracks = res.toptracks.track
          return trackService.albumGetInfo(artist, this.nameAlbum)
        })
        .then(res => {
          this.album = res.album
        })
    }
  }
}
</script>

<style lang="scss">

@import 'src/scss/general.scss';

@import 'src/scss/TopArtists/GalleryTopAlbums.scss';

.content-info-track article{
  margin-top: 1.5rem;
}
.content-info-track figure{
  width: 90%;
  display: block;
  margin: 0 auto;
  text-align: center;
}
.content-info-track figure img{
  border-radius: 50%;
  width: 60%;
  border: solid 6px rgba(222, 89, 34, 0.32)
}
.content-info-track figure figcaption{
  text-align: center;
}
.artist{
  font-size: 2rem;
  color: rgba(210, 127, 92, 0.6313725490196078);
}
.track{
  font-size: 2.5rem;
  color: #de5922;
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
.content-info-track .content-image img{
  -ms-transition:all 0.6s ease-out;
  -moz-transition:all 0.6s ease-out;
  -o-transition:all 0.6s ease-out;
  -webkit-transition:all 0.6s ease-out;
  transition:all 0.6s ease-out;
}
.content-info-track .content-image:hover img{
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
  transform: scale(1.1);
}
</style>