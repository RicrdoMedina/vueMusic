<template lang="pug">
  .content-artist
    //- .box-number
    figure.photo-artist
      img(v-bind:src="item.image[2]['#text']", v-bind:alt="item.name")
    .info
      p.name(v-if="item.artist && item.artist.name") {{ item.name + ' - ' + item.artist.name }}
      p.name(v-else) {{ item.name }}
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
