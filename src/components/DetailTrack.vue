<template lang="pug">
  section.section-main
    .container
      h1.tittle {{ infoTrack.name }}
      .columns
        .column.is-6
          .content-info-track
            article
              figure
                img(v-if="infoArtist && infoArtist.name", v-bind:src="infoArtist.image[5]['#text']", alt="Placeholder image")
                figcaption
                  p.artist {{ infoArtist.name }}
                  p.track {{ infoTrack.name }}
                  span.listeners {{ infoTrack.listeners }} listeners
                  span.playcount {{ infoTrack.playcount }} playcount
            article.content-wiki(v-if="infoTrack && infoTrack.wiki")
              h2 Wiki
              p.wiki {{ infoTrack.wiki.summary }}

            article
              figure(v-if="infoTrack && infoTrack.name")
                img(v-bind:src="infoTrack.album.image[3]['#text']", alt="Placeholder image")
                figcaption
                  p.artist Album
                  p.track {{ infoTrack.album.title }}
                  span.listeners {{ albums.listeners }} listeners
                  span.playcount {{ albums.playcount }} playcount
            article
              h3 Tracks
              table(v-if="albums && albums.artist", class='table is-striped is-fullwidth')
                tr
                  th Track
                  th Duration
                tr(v-for="track in albums.tracks.track")
                  td {{ track.name }}
                  td {{ track.duration }}
            
        .column.is-6
          .content-bio
            article(v-if="infoArtist && infoArtist.name")
              h2 Biography
              p.bio {{ infoArtist.bio.summary }}
            article
              h3 Top Albums
              .box-top-images
                figure(v-for="album in topalbums")
                  img(v-if="album && album.image[3]", v-bind:src="album.image[3]['#text']", alt="Placeholder image")
                  figcaption
                    p.name {{ album.name }}
                    p.listeners {{ album.playcount }} playcount
            article
              h3 Top Tracks
              table(class='table is-striped is-fullwidth')
                tr
                  th Track
                  th Playcount
                  th Listeners
                tr(v-for="track in topTracks")
                  td {{ track.name }}
                  td {{ track.playcount }}
                  td {{ track.listeners }}
           
         
</template>

<script>

import trackService from '@/services/Tracks'

export default {
  name: 'app',
  data () {
    return {
      infoTrack: {},
      infoArtist: {},
      topalbums: {},
      topTracks: {},
      albums: {},
      nameAlbum: ''
    }
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
          this.nameAlbum = res.track.album.title
          this.infoTrack = res.track
          return trackService.artistGetInfo(artist)
        })
        .then(res => {
          this.infoArtist = res.artist
          return trackService.artistGetTopAlbums(artist)
        })
        .then(res => {
          this.topalbums = res.topalbums.album
          return trackService.artistGetTopTracks(artist)
        })
        .then(res => {
          this.topTracks = res.toptracks.track
          return trackService.albumGetInfo(artist, this.nameAlbum)
        })
        .then(res => {
          this.albums = res.album
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
}
.content-info-track figure figcaption{
  text-align: center;
}
.artist{
  font-size: 2rem;
  color: #ddd;
}
.track{
  font-size: 1.5rem;
}
.content-info-track .listeners,.content-info-track .playcount{
  font-size: 1rem;
  margin-right: .6rem;
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
</style>