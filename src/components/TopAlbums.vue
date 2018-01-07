<template lang="pug">
  .box-top-images
    figure(v-for="album in albums")
      img(v-if="album && album.image[3]", v-bind:src="album.image[3]['#text']", alt="Placeholder image")
      figcaption
        p.name {{ album.name }}
        p.listeners {{ album.playcount }} playcount
</template>

<script>
export default {
  props: {
    albums: { type: Array, required: true }
  }
}
</script>
