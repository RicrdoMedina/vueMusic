<template lang="pug">
  article.card
    .loader
    .box-card-track(@click="goToTrack(track)")
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
          | {{ track.listeners | int-to-dec }} listeners
</template>

<script>
export default {
  props: {
    track: { required: true }
  },
  methods: {
    goToTrack (objTrack) {
      let track = objTrack.name
      let artist = objTrack.artist.name === undefined ? objTrack.artist : objTrack.artist.name
      this.$router.push({ name: 'track', params: { artist, track } })
    }
  }
}
</script>

<style lang="scss" scoped>

@import 'src/scss/loader-card.scss';

.card{
  background: rgba(0, 0, 0, 0.4);
  min-height: 235px;
  -ms-transition:all 0.6s ease-out;
  -moz-transition:all 0.6s ease-out;
  -o-transition:all 0.6s ease-out;
  -webkit-transition:all 0.6s ease-out;
  transition:all 0.6s ease-out;
}
.card:hover {
  background: #de5a228f;
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
.card-content{
  padding: .2rem 0;
  height: 40px;
  color:rgb(222,89,34);
}
.card figure img{
  -ms-transition:all 0.6s ease-out;
  -moz-transition:all 0.6s ease-out;
  -o-transition:all 0.6s ease-out;
  -webkit-transition:all 0.6s ease-out;
  transition:all 0.6s ease-out;
}
.card:hover figure img {
  -webkit-transform:scale(1.3);
  transform:scale(1.3);
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
.card:hover .content{
  color: #fff;
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
.card-image figure {
  overflow:hidden;
}
.wrapper-card.is-loaded .card{
  background: #de5a2265;
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
.wrapper-card.is-loaded .card:hover{
  transform: unset;
  cursor:default;
}
.card-content .media{
  position: relative;
  top: -63px;
  width: 250px;
  box-sizing: border-box;
}
.media .media-content{
  min-height: 60px;
  background: #de59229c;
  padding: .4rem 0 0 .5rem;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.card-content .content{
  position: relative;
  top: -66px;
  display: flex;
  align-items: center;
  justify-content: center;
  -ms-transition:all 0.6s ease-out;
  -moz-transition:all 0.6s ease-out;
  -o-transition:all 0.6s ease-out;
  -webkit-transition:all 0.6s ease-out;
  transition:all 0.6s ease-out;
}
.content img{
  width: 30px;
  display: inline-block;
  margin-right: 15px;
  position: relative;
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