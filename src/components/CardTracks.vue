<template lang="pug">
  article.card(@click="goToTrack(track.artist.name,track.name)")
    .card-image
      figure.image.is-4by3
        img(v-bind:src="track.image[2]['#text']", alt="Placeholder image")
    .card-content
      .media
        .media-content
          p.title {{ track.name }}
          p.subtitle {{ track.artist.name ? track.artist.name : track.artist }}
      .content
        img(src="../assets/listen.png")
        | {{ track.listeners ? track.listeners + ' listeners ' : "Popular right now." }}
</template>

<script>
export default {
  props: {
    track: { type: Object, required: true }
  },
  methods: {
    goToTrack (artist, track) {
      this.$router.push({ name: 'track', params: { artist, track } })
    }
  }
}
</script>

<style lang="scss" scoped>

.card{
  background-color: transparent;
}
.card-content{
  padding: .2rem .9rem;
  height: 40px;
  background: rgba(0, 0, 0, 0.7);
  color:rgb(222,89,34);
  -ms-transition:all 0.6s ease-out;
  -moz-transition:all 0.6s ease-out;
  -o-transition:all 0.6s ease-out;
  -webkit-transition:all 0.6s ease-out;
  transition:all 0.6s ease-out;
  will-change: background;
}
.card:hover .card-content{
  background:#fff;
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
.card-content .media{
  position: relative;
  top: -63px;
  width: 249px;
  left: -14px;
  box-sizing: border-box;
}
.media .media-content{
  height: 60px;
  background: #de592257;
  padding: .4rem 0 0 .5rem;
}
.card-content .content{
  position: relative;
  top: -65px;
}
.content img{
  width: 20px;
  display: inline;
  margin-right: 15px;
  position: relative;
  top: 4px;
}
.title{
  font-size: 1rem;
  color:#fff;
  font-weight: 300;
}
.subtitle{
  font-size: .9rem;
  color:#fff;
}

</style>