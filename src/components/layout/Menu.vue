<template lang="pug">
    nav#menu.menu
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
          strong email: 
          | rcrdmedina6@gmail.com
</template>

<script>
export default {
  data () {
    return {
      isOpenMenu: false,
      isCreated: false
    }
  },
  created () {
    this.$bus.$on('open-menu', (init = false) => {
      if (init) {
        this.cerrar()
        this.isOpenMenu = false
        this.isCreated = true
        return false
      }
      if (this.isCreated && !init) {
        this.isOpenMenu = !this.isOpenMenu ? true : !this.isOpenMenu
        if (this.isOpenMenu) {
          this.open()
        } else {
          this.cerrar()
        }
      }
    })
  },
  methods: {
    open () {
      document.getElementById('header').classList.add('is-open-menu')
      document.getElementById('menu').classList.add('is-active')
    },
    cerrar () {
      document.getElementById('header').classList.remove('is-open-menu')
      document.getElementById('menu').classList.remove('is-active')
    }
  }
}
</script>

<style lang="scss">
.menu{
  position: fixed;
  height: 100%;
  background: #de5922cc;
  font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
  width: 25%;
  right: -25%;
  display: block;
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
  text-transform: uppercase;
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
.menu .box-social-media{
  display: block;
  width: 100%;
  padding: 1.2rem 0 0 1.2rem;
}
.menu .box-social-media a{
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
.menu .box-social-media a:hover{
  -ms-transition:all 0.3s ease-in;
  -moz-transition:all 0.3s ease-in;
  -o-transition:all 0.3s ease-in;
  -webkit-transition:all 0.3s ease-in;
  transition:all 0.3s ease-in;
  color: rgba(0, 0, 0, 0.7);
}
.menu .box-social-media > div{
  display: inline;
}
.menu .box-contact{
  position: absolute;
  bottom: 0;
  display: block;
  left: 20px;
  bottom: 20px;
}
.menu .box-contact .email, .menu .box-contact strong{
  color: #fff;
}
.menu.is-active{
  right: 0%;
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
</style>