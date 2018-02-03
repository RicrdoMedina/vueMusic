<template lang="pug">
  .content-artist(@click="selectedTrack(index)")
    .box-number {{ index + 1 }}
    figure.photo-artist
      img(v-bind:src="item.image[2]['#text']", v-bind:alt="item.name", v-bind:title="item.name")
      .box-number-one # {{ index + 1 }}
    .info
      p.name(v-if="item.artist && item.artist.name") {{ item.name + ' - ' + item.artist.name }}
      p.name(v-else) {{ item.name }}
      span.listeners {{ item.listeners | int-to-dec }} listeners
      span.playcount {{ item.playcount | int-to-dec }} playcount 
</template>

<script>
export default {
  props: {
    item: { required: true },
    index: { required: true }
  },
  methods: {
    selectedTrack (index) {
      let nameRoute = this.getRoute()
      let id = this.item.url
      let artist = nameRoute === 'top-artists' ? this.item.name : this.item.artist.name
      let track = this.item.name ? this.item.name : ''
      let photo = this.item.image[2]['#text']
      let ranking = index + 1
      let args = [id, artist, track, photo, ranking]
      this.$emit('select', ...args)
    },
    getRoute () {
      return this.$route.name
    }
  }
}
</script>
