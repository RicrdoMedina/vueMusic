<template lang="pug">
  .content-table
    table(v-if="table === 1",class="table is-striped is-fullwidth")
      tr
        th Track
        th Duration
      tr(v-for="track in tracks")
        td {{ track.name }}
        td {{ track.duration }}
    table(v-else,class="table is-striped is-fullwidth")
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
    tracks: { required: true },
    table: { required: true }
  }
}
</script>
