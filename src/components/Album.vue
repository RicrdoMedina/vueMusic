<template lang="pug">
  .album
    figure
      img(v-if="album && album.image[3]", v-bind:src="album.image[3]['#text']", alt="Placeholder image")
      figcaption
        p.name {{ album.name }}
        span.listeners {{ album.listeners }} listeners
        span.playcount {{ album.playcount }} playcount
</template>

<script>
export default {
  props: {
    album: { type: Object, required: true }
  }
}
</script>
