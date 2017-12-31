<template lang="pug">
  #app
    .main
      vue-header
      section.section-main
        .columns
          .column
            nav.nav-search
              form
                input.search(
                  type="text",
                  placeholder="Buscar canciones",
                  v-model='searchQuery'
                )
                a.button 
                  icon(name="search" scale="1")
        aside.content-link
          .columns
            .column
              nav.nav-items
                ul
                  li Featured
                  li Top
                  li Popular
      vue-footer
</template>

<script>

import VueHeader from '@/components/layout/Header.vue'
import VueFooter from '@/components/layout/Footer.vue'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    VueHeader,
    VueFooter
  }
}
</script>

<style lang="scss">
@import 'src/scss/main.scss';
@import url("https://fonts.googleapis.com/css?family=Roboto");

body{
  font-family:'Roboto', Times, serif;
}
#app{
  background: url('https://images.unsplash.com/photo-1477346611705-65d1883cee1e?dpr=0.800000011920929&auto=format&fit=crop&w=1199&h=800&q=80&cs=tinysrgb&crop=') fixed no-repeat;
  background-size: cover;
}
.main{
  min-height: 100vh;
  padding: 0;
  margin: 0;
  border: 0;
  display: flex;
  flex-direction: column;
}
.section-main{
  flex: 1;
  padding-top: 100px;
}
.section-main form{
  text-align: center;
}

.search{
  height: 35px;
  border-left: solid rgb(222,89,34) 1px;
  border-bottom: solid rgb(222,89,34) 1px;
  border-top: solid rgb(222,89,34) 1px;
  outline: 0;
  width: 400px;
  padding: 0 .5em;
  font-size: 16px;
  background: #ffffff36;
}
.button{
  border-radius: unset;
  border: solid rgb(222,89,34) 1px;
  background: rgb(222,89,34);
  border-right: unset;
  position: relative;
  left: -2px;
  height: 35px;
}
.button:hover,.button.focus{
  border-left: solid rgb(222,89,34) 1px;
  border-bottom: solid rgb(222,89,34) 1px;
  border-top: solid rgb(222,89,34) 1px;
}
.nav-items ul{
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
.nav-items ul li{
  display: inline-block;
  vertical-align: top;
  padding:5px;
  margin: 0 5px;
  background: #ffffff36;
  color: $black;
  min-width: 140px;
}
.footer{
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff36;
  color:rgb(222,89,34);
}
</style>
