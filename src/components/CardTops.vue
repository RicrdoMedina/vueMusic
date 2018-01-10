<template lang="pug">
  .content-artist(@click="selectedTrack()")
    .box-number {{ index + 1 }}
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
    item: { type: Object, required: true },
    index: { required: true }
  },
  methods: {
    selectedTrack () {
      let nameRoute = this.getRoute()
      let id = this.item.url
      let artist = nameRoute === 'top-artists' ? this.item.name : this.item.artist.name
      let track = this.item.name ? this.item.name : ''
      let args = [id, artist, track]
      this.$emit('select', ...args)
    },
    getRoute () {
      return this.$route.name
    }
  }
}
</script>
