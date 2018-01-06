<template lang="pug">
  section.section-main
    .container
      h1.tittle Top Artists
      .columns
        .column.is-6
          .content-top-ten
            article(v-for="item in artists")
              vm-card-tops(v-bind:item="item")
            
        .column.is-6
          .content-bio
            article
              h2 Biography
              p.bio {{ bio }}
            article
              h3 Top Albums
              .box-top-images
                figure(v-for="album in albums")
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
                tr(v-for="track in tracks")
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
      artists: [],
      nameArtistTop: '',
      bio: '',
      albums: [],
      tracks: []
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
    }
  }
}
</script>

<style lang="scss">

@import 'src/scss/general.scss';

@import 'src/scss/TopArtists/GalleryTopAlbums.scss';

</style>