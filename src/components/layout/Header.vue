<template lang="pug">
  header#header.header
    .columns
      .column
        router-link(:to="{ path: '/' }", class="main-logo")
          figure.content-logo
            img.logo(src="src/assets/vue-logo.png")

        .content-icon-menu
          .icon-bars(@click="openMenu")
            icon(name="bars" scale="2" class="open")
            icon(name="times" scale="2" class="close")
</template>

<script>

export default {
  methods: {
    openMenu () {
      this.$bus.$emit('open-menu')
    }
  }
}
</script>

<style lang="scss">

.header{
  width: 100%;
  margin: 0 auto;
  padding: .5em;
  box-sizing: border-box;
  height: 70px;
  position: fixed;
  top:0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  -ms-transition:all 0.6s ease-out;
  -moz-transition:all 0.6s ease-out;
  -o-transition:all 0.6s ease-out;
  -webkit-transition:all 0.6s ease-out;
  transition:all 0.6s ease-out;
}
.header.is-open-menu{
  width: 75%;
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
.header .column{
  padding: 20px 4px 0 35px
}
.header .column .main-logo{
  position: fixed;
  left: 45%;
}
.header .icon-bars{
  color: rgb(222,89,34);
  cursor:pointer;
}
.content-logo{
  width: 94px;
  display: inline-block;
  margin: 0 auto;
}
.content-icon-menu {
  text-align: center;
  width: 100px;
  background: rgba(0, 0, 0, 0.6);
  position: relative;
  float: right;
  height: 70px;
  top: -16px;
  padding-top: 15px;
}
.header .close, .header.is-open-menu .open{
  display:none;
  opacity: 0;
  -ms-transition:all 0.6s ease-out;
  -moz-transition:all 0.6s ease-out;
  -o-transition:all 0.6s ease-out;
  -webkit-transition:all 0.6s ease-out;
  transition:all 0.6s ease-out;
}
.header.is-open-menu .close, .header .open{
  display:inline-block;
  opacity: 1;
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
</style>