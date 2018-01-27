<template lang="pug">
  .box-top-images(v-bind:class="{ 'unique-album': albums.length === 1 }")
    figure(v-for="album in albums")
      img(v-if="album && album.image[3]", v-bind:src="album.image[3]['#text']", alt="Placeholder image")
      figcaption
        p.name {{ album.name }}
        p.listeners {{ album.playcount | int-to-dec }} playcount
</template>

<script>
export default {
  props: {
    albums: { required: true }
  }
}
</script>
