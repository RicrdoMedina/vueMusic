<template lang="pug">
  .content-table
    table(v-if="table === 1",class="table is-striped is-fullwidth")
      tr
        th Track
        th Duration
      tr(v-for="track in tracks")
        td {{ track.name }}
        td {{ track.duration | sg-to-mm }}
    table(v-else,class="table is-striped is-fullwidth")
      tr
        th Track
        th Playcount
        th Listeners
      tr(v-for="track in tracks")
        td {{ track.name }}
        td {{ track.playcount | int-to-dec }}
        td {{ track.listeners | int-to-dec }}
</template>

<script>
export default {
  props: {
    tracks: { required: true },
    table: { required: true }
  }
}
</script>
