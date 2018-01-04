<template lang="pug">
  #app
    .wrapper
      vm-header
      router-view
      vm-footer
</template>

<script>

import VmHeader from '@/components/layout/Header.vue'
import VmFooter from '@/components/layout/Footer.vue'

export default {
  name: 'app',
  components: {
    VmHeader,
    VmFooter
  }
}
</script>

<style lang="scss">
@import 'src/scss/main.scss';
@import url("https://fonts.googleapis.com/css?family=Roboto");

$color-vue : rgb(222,89,34);
$background-vue : #ffffff36;

body{
  font-family:'Roboto', Times, serif;
}
a,a:link,a:active,a:visited,a:focus,a:hover{
  color: $color-vue;
}
#app{
  // background: url('https://images.unsplash.com/photo-1477346611705-65d1883cee1e?dpr=0.800000011920929&auto=format&fit=crop&w=1199&h=800&q=80&cs=tinysrgb&crop=') fixed no-repeat;
  // background-size: cover;
  background: $black;
}
.wrapper{
  min-height: 100vh;
  padding: 0;
  margin: 0;
  border: 0;
  display: flex;
  flex-direction: column;
}
</style>
