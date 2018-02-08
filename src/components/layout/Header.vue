<template lang="pug">
  header#header.header
    .columns
      .column
        router-link(:to="{ path: '/vueMusic/' }", class="main-logo")
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
  transition:all 0.6s ease-out;
  will-change: auto;
}
.header.is-open-menu{
  width: 75%;
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
  transition:all 0.6s ease-out;
}
.header.is-open-menu .close, .header .open{
  display:inline-block;
  opacity: 1;
  transition:all 0.6s ease-in;
}

@media only screen 
and (min-width : 320px) 
and (max-width : 540px) {
  .header.is-open-menu{
    width: 100%;
  }
  .header .content-icon-menu {
    background: #000;
    width: 20%;
    position: fixed;
    left: 80%;
    height: 86px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:all 0.6s ease-out;
    will-change: auto;
  }
  .header .content-icon-menu .icon-bars{
    width: 100%;
    height: 73px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header.is-open-menu .content-icon-menu {
    left: 0;
    transition:all 0.6s ease-in;
  }
}

@media only screen 
and (min-width : 541px) 
and (max-width : 960px) {
  .header.is-open-menu{
    width: 60%;
  }
}

@media only screen 
and (max-width : 960px) {
  .header .column .main-logo{
    left: 5%;
  }
}
</style>