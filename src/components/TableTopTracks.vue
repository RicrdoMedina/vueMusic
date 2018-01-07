<template lang="pug">
  table(class='table is-striped is-fullwidth')
    tr
      th Track
      th Playcount
      th Listeners
    tr(v-for="track in tracks")
      td {{ track.name }}
      td {{ track.playcount }}
      td {{ track.listeners }}
</template>

<script>
export default {
  props: {
    tracks: { type: Array, required: true }
  }
}
</script>
