<template lang="pug">
  .card
    .card-image
      figure.image.is-4by3
        img(v-bind:src="track.image[2]['#text']", alt="Placeholder image")
    .card-content
      .media
        .media-content
          p.title {{ track.name }}
          p.subtitle {{ track.artist.name }}
      .content
        | Popular right now.
</template>

<script>
export default {
  props: {
    track: { type: Object, required: true }
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
  background: #ffffff36;
  color:rgb(222,89,34);
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