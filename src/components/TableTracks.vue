<template lang="pug">
  .content-artist(v-if="item && item.name")
    //- .box-number
    figure.photo-artist
      img(v-bind:src="item.image[2]['#text']", v-bind:alt="item.name")
    .info
      p.name {{ item.name }} - {{ item.artist.name ? item.artist.name : '' }}
      span.listeners {{ item.listeners }} listeners
      span.playcount {{ item.playcount }} playcount 
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true }
  }
}
</script>
