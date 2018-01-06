<template lang="pug">
  section.section-main
    .container
      h1.tittle Top Tracks
      .columns
        .column.is-6
          .content-top-ten
            article(v-for="track in tracks")
              .content-artist
                //- .box-number
                figure.photo-artist
                  img(v-bind:src="track.image[2]['#text']", alt="Placeholder image")
                .info
                  p.name {{ track.name }} - {{ track.artist.name }}
                  span.listeners {{ track.listeners }} listeners
                  span.playcount {{ track.playcount }} playcount
            
        .column.is-6.p
          .content-bio
            article
              h2 Wiki
              p.bio {{ infoTrack.wiki.summary }}
            article
              h3 Album
              .album
                figure
                  img(v-bind:src="infoTrack.album.image[3]['#text']", alt="Placeholder image")
                  figcaption
                    p.name {{ infoTrack.album.title }}
                    span.listeners {{ infoTrack.listeners }} listeners
                    span.playcount {{ infoTrack.playcount }} playcount
            article
              h3 Tracks
              table(class='table is-striped is-fullwidth')
                tr
                  th Track
                  th Duration
                tr(v-for="trackAlbum in infoAlbum.tracks.track")
                  td {{ trackAlbum.name }}
                  td {{ trackAlbum.duration }}
                
                
</template>
<script>
import trackService from '@/services/Tracks'
import VmMenuOptions from '@/components/MenuOptions.vue'

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
    VmMenuOptions
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      trackService.getTopTracks()
        .then(res => {
          console.dir(res.tracks.track)
          this.nameTrack = res.tracks.track[0].name
          this.nameArtist = res.tracks.track[0].artist.name
          this.tracks = res.tracks.track
          return trackService.trackGetInfo(this.nameArtist, this.nameTrack)
        })
        .then(res => {
          // console.dir(res.toptracks.track)
          this.nameAlbum = res.track.album.title
          this.infoTrack = res.track
          return trackService.albumGetInfo(this.nameArtist, this.nameAlbum)
        })
        .then(res => {
          this.infoAlbum = res.album
        })
    }
  }
}
</script>

<style lang="scss">
h1{
  text-align: center;
  font-size: 3rem;
  color:rgb(222,89,34);
}
h2{
  font-size: 1.5rem;
  padding: .8rem 0;
}
h3{
  font-size: 1.2rem;
  padding: .8rem 0;
}
.column.is-6{
  margin-top: 1.2rem;
}
.content-top-ten, .content-bio{
  width: 100%;
  margin: 0 auto;
  padding: 0 .5rem;
  min-height: 300px;
  background: #fff;
  color:#000;
  padding-bottom: 2rem;
  height: 1220px;
  overflow: hidden;
}
.content-bio{
  padding: .5rem 2rem;
}
.content-bio article{
  margin: 0 auto 1.2rem; 
}
.content-bio .bio{
  text-indent: .8rem;
  text-align: justify;
  overflow: hidden;
}
.content-top-ten article:first-child{
  position: relative;
  height: 260px;
  padding: .5rem 0;
  border-bottom: solid 1px #ccc;
}
.content-top-ten article:first-child .content-artist{
  border-bottom: none;
}
.content-top-ten article:first-child figure{
  position: absolute;
  width: 200px;
  top: 10px;
  left: 0;
  right: 0;
  display: block;
  margin: 0 auto;
  
}
.content-top-ten article:first-child figure img{
  border-radius: 50%;
}
.content-top-ten article:first-child .box-number,.content-top-ten article:first-child .info{
  position: absolute;
  bottom: 20px;
  width: 10%;
  margin: 0;
  padding: 0;
  text-align: center;
}
.content-top-ten article:first-child .info{
  right: 0;
  bottom: 10px;
  width: 90%;
  text-align: left;
  padding-left: .8rem;
}
.content-top-ten article .info span{
  margin: 0 1rem 0 0;
}
.content-top-ten .content-artist{
  display: flex;
  align-items: center;
  border-bottom: solid 1px #ccc;
  padding-top: .3rem;
}
.content-top-ten .content-artist .box-number{
  width: 10%;
  text-align: center;
}
.content-top-ten .content-artist figure{
  width: 90px;
}
.content-top-ten .content-artist .info{
  padding-left: .8rem;
}
.info .name{
  font-size: 1.2rem;
  font-weight: 600;
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
.box-top-images{
  height: 280px;
}
.box-top-images figure:first-child,.box-top-images figure{
  width: 45%;
  margin: 0;
  padding: 0;
  vertical-align: top;
  float: left;
  height: 280px;
}
.box-top-images figure{
  width: 25%;
  height: 125px;
}
.box-top-images figure:first-child img{
  height: 250px;
}
.box-top-images figure:first-child figcaption{
  top: -67px;
  height: 60px;
}
.box-top-images figcaption{
  position: relative;
  top: -50px;
  padding: 0 .2rem;
  height: 43px;
  background:rgba(0, 0, 0, 0.58);
}
.box-top-images figure:first-child .name, .box-top-images figure:first-child .listeners{
  font-size: 1rem;
}
.box-top-images figcaption .name,.box-top-images figcaption .listeners{
  font-size: .8rem;
  color: #fff;
}
.box-top-images figcaption .listeners{
  font-size: .7rem;
}   
</style>