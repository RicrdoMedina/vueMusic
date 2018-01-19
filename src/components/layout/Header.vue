<template lang="pug">
  header.header(v-bind:class="{ 'is-active': isOpenMenu }")
    .columns
      .column
        router-link(:to="{ path: '/' }", class="main-logo")
          figure.content-logo
            img.logo(src="src/assets/vue-logo.png")

        .content-icon-menu
          .icon-bars(@click="openMenu")
            icon(name="bars" scale="2" class="open")
            icon(name="times" scale="2" class="close")
    nav.menu
      ul
        li 
          router-link(:to="{ path: '/' }") Home
        li 
          router-link(:to="{ path: '/top-artists' }") Top artists
        li 
          router-link(:to="{ path: '/top-tracks' }") Top tracks
        li 
          a About me
      .box-social-media
        a(href="#" target="_blank")
          .icon-facebook-square
            icon(name="facebook-square" scale="2")
        a(href="#" target="_blank")
          .icon-twitter-square
            icon(name="twitter-square" scale="2")
        a(href="#" target="_blank")
          .icon-google-plus-square
            icon(name="google-plus-square" scale="2")
      .box-contact
        .email 
          strong Email: 
          | rcrdmedina6@gmail.com
</template>

<script>
export default {
  data () {
    return {
      isOpenMenu: 0
    }
  },
  methods: {
    openMenu () {
      this.isOpenMenu = 1 - this.isOpenMenu
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
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  -ms-transition:all 0.6s ease-out;
  -moz-transition:all 0.6s ease-out;
  -o-transition:all 0.6s ease-out;
  -webkit-transition:all 0.6s ease-out;
  transition:all 0.6s ease-out;
}
.header.is-active{
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
.menu{
  position: fixed;
  height: 100%;
  background: #de5922cc;
  width: 25%;
  right: -25%;
  bottom: 0;
  z-index: 99999;
  -ms-transition:all 0.6s ease-out;
  -moz-transition:all 0.6s ease-out;
  -o-transition:all 0.6s ease-out;
  -webkit-transition:all 0.6s ease-out;
  transition:all 0.6s ease-out;
}
.menu ul{
  display: block;
  width: 100%;
}
.menu ul li{
  width: 100%;
  padding: 0;
  margin:0;
}
.menu ul li a,
.menu ul li a:focus,
.menu ul li a:active,
.menu ul li a:visited,
.menu ul li a:link,
{
  width: 100%;
  padding: 23px 20px 23px 15px;
  color: #dbdbdb;
  border-bottom: solid 1px #dbdbdb;
  -ms-transition:all 0.3s ease-out;
  -moz-transition:all 0.3s ease-out;
  -o-transition:all 0.3s ease-out;
  -webkit-transition:all 0.3s ease-out;
  transition:all 0.3s ease-out;
  display: block;
  font-size: 1rem;
  font-weight: bold;
}
.menu ul li a:hover, .menu ul li a.router-link-exact-active.router-link-active{
  padding-left: 25px;
  background: rgba(0, 0, 0, 0.7);
  -ms-transition:all 0.3s ease-in;
  -moz-transition:all 0.3s ease-in;
  -o-transition:all 0.3s ease-in;
  -webkit-transition:all 0.3s ease-in;
  transition:all 0.3s ease-in;
}
.header .box-social-media{
  display: block;
  width: 100%;
  padding: 1.2rem 0 0 1.2rem;
}
.header .box-social-media a{
  display: inline-block;
  margin-right: .8rem;
  cursor: pointer;
  color: #e8e8e8;
  -ms-transition:all 0.6s ease-out;
  -moz-transition:all 0.6s ease-out;
  -o-transition:all 0.6s ease-out;
  -webkit-transition:all 0.6s ease-out;
  transition:all 0.6s ease-out;
}
.header .box-social-media a:hover{
  -ms-transition:all 0.3s ease-in;
  -moz-transition:all 0.3s ease-in;
  -o-transition:all 0.3s ease-in;
  -webkit-transition:all 0.3s ease-in;
  transition:all 0.3s ease-in;
  color: rgba(0, 0, 0, 0.7);
}
.header .box-social-media > div{
  display: inline;
}
.header .box-contact{
  position: absolute;
  bottom: 0;
  display: block;
  left: 20px;
  bottom: 20px;
}
.header .box-contact .email, .header .box-contact strong{
  color: #fff;
}
.header.is-active .menu{
  right: 0%;
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
.header .close, .header.is-active .open{
  display:none;
  opacity: 0;
  -ms-transition:all 0.6s ease-out;
  -moz-transition:all 0.6s ease-out;
  -o-transition:all 0.6s ease-out;
  -webkit-transition:all 0.6s ease-out;
  transition:all 0.6s ease-out;
}
.header.is-active .close, .header .open{
  display:inline-block;
  opacity: 1;
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
</style>