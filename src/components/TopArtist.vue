<template lang="pug">
  section.section-main
    .container
      h1.tittle Top Artists
      .columns
        .column.is-6
          .content-top-ten
            article(v-for="artist in artists")
              .content-artist
                //- .box-number
                figure.photo-artist
                  img(v-bind:src="artist.image[2]['#text']", alt="Placeholder image")
                .info
                  p.name {{ artist.name }}
                  span.listeners {{ artist.listeners }} listeners
                  span.playcount {{ artist.playcount }} playcount 
            
        .column.is-6.p
          .content-bio
            article
              h2 Biography
              p.bio {{ bio }}
            article
              h3 Top Albums
              .box-top-images
                figure(v-for="album in albums")
                  img(v-bind:src="album.image[3]['#text']", alt="Placeholder image")
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
                tr(v-for="track in tracks")
                  td {{ track.name }}
                  td {{ track.playcount }}
                  td {{ track.listeners }}
                
</template>
<script>
import trackService from '@/services/Tracks'
import VmMenuOptions from '@/components/MenuOptions.vue'

export default {
  name: 'app',
  data () {
    return {
      artists: [],
      nameArtistTop: '',
      bio: '',
      albums: [],
      tracks: []
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
      trackService.topArtists()
        .then(res => {
          this.nameArtistTop = res.artists.artist[0].name
          this.artists = res.artists.artist
          return trackService.artistGetInfo(this.nameArtistTop)
        })
        .then(res => {
          // console.log(JSON.stringify(res.artist))
          this.bio = res.artist.bio.summary
          return trackService.artistGetTopAlbums(this.nameArtistTop)
        })
        .then(res => {
          // console.dir(res.topalbums.album)
          this.albums = res.topalbums.album
          return trackService.artistGetTopTracks(this.nameArtistTop)
        })
        .then(res => {
          // console.dir(res.toptracks.track)
          this.tracks = res.toptracks.track
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
}
.content-bio{
  padding: .5rem 2rem;
}
.content-bio article{
  margin: 0 auto 1.2rem; 
}
.content-bio .bio{
  text-indent: .8rem;
  text-align: justify
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
  background:rgba(0, 0, 0, 0.28);
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