<template lang="pug">
  #app
    .wrapper
      vm-header
      vm-menu
      router-view
      vm-info
      vm-footer
</template>

<script>

import VmHeader from '@/components/layout/Header.vue'
import VmMenu from '@/components/layout/Menu.vue'
import VmInfo from '@/components/layout/Info.vue'
import VmFooter from '@/components/layout/Footer.vue'

export default {
  name: 'app',
  components: {
    VmHeader,
    VmFooter,
    VmInfo,
    VmMenu
  }
}
</script>

<style lang="scss">
@import 'src/scss/main.scss';
@import url("https://fonts.googleapis.com/css?family=Roboto");
@import url('https://fonts.googleapis.com/css?family=Dancing+Script');
@import 'src/scss/media-queries.scss';

$color-vue : rgb(222,89,34);
$background-vue : #ffffff36;

body{
  font-family:'Roboto', "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
}
a,a:link,a:active,a:visited,a:focus,a:hover{
  color: $color-vue;
}
#app{
  background: url('https://images.unsplash.com/photo-1477346611705-65d1883cee1e?dpr=0.800000011920929&auto=format&fit=crop&w=1199&h=800&q=80&cs=tinysrgb&crop=') fixed no-repeat;
  background-size: cover;
}
.wrapper{
  min-height: 100vh;
  padding: 0;
  margin: 0;
  border: 0;
  display: flex;
  flex-direction: column;
}
.section-main{
  flex: 1;
  padding-top: 4.4rem;
}

</style>
