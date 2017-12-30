<template lang="pug">
  #app
    section.hero
      .columns
        .column.is-4.has-text-centered
          figure.content-logo
            img.logo(src="src/assets/vue-logo.png")
        .column.is-4.has-text-centered
          column 4
        .column.is-4.has-text-centered
          column 4
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
@import 'src/scss/main.scss';

.content-logo{
  width: 74px;
  position: absolute;
  left: 20px;
  padding-top: 15px;
}
</style>
