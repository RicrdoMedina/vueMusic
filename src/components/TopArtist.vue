<template lang="pug">
  section#sectionMain.section-main(v-bind:class="{ 'is-loaded': isLoading }")
    vm-loader
    .box-hero
      h1.tittle
        span Top Artists
    .container
      .columns
        .column.is-6
          .content-top-ten
            article(v-for="(item, index) in artists")
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
                p.artist-top {{ nameArtistTop }}
            article
              h2 Biography
              .wrapper-box
                p.bio {{ bio }}
            article
              h3 Top Albums
              .wrapper-box
                vm-albums(v-bind:albums="albums")
            article
              h3 Top Tracks
              .wrapper-box
                vm-table-tracks(v-bind:tracks="tracks",  v-bind:table="isTable")
                
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
      artists: [],
      nameArtistTop: '',
      bio: ''
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
    this.getData()
  },
  methods: {
    getData () {
      trackService.topArtists()
        .then(res => {
          this.nameArtistTop = res.artists.artist[0].name
          this.photoArtist = res.artists.artist[0].image[2]['#text']
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
          this.isLoading = true
          this.fadeIn()
        })
    },
    setSelectedTrack (id, artist, track, photo, ranking) {
      this.selected = id
      trackService.artistGetInfo(artist)
        .then(res => {
          this.bio = res.artist.bio.summary
          return trackService.artistGetTopAlbums(artist)
        })
        .then(res => {
          this.albums = res.topalbums.album
          return trackService.artistGetTopTracks(artist)
        })
        .then(res => {
          this.tracks = res.toptracks.track
        })
      this.isUpdated = true
      setTimeout(() => {
        this.isUpdated = false
        this.nameArtistTop = artist
        this.photoArtist = photo
        this.ranking = ranking
      }, 3000)
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
  transition:all 1s ease-out;
  will-change: auto;
}
.fadeIn .box-hero .tittle span,
.fadeIn .content-top-ten article,
.fadeIn .content-bio > *
{
  opacity: 1;
  transition:all 1s ease-in;
}

</style>