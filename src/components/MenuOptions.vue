<template lang="pug">
  aside.content-link
      .columns
        .column
          nav.nav-items
            ul
              li
                router-link(to="top-artists") Artist
              li 
                router-link(to="top-tracks") Tracks
              li 
                router-link(to="top-albums") Albums
</template>

<style lang="scss">

.nav-items ul{
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
.nav-items ul li{
  display: inline-block;
  vertical-align: top;
  padding: .4rem;
  margin: 0 .5rem;
  min-width: 140px;
  cursor:pointer;
  background: #ffffff36;
  color:rgb(222,89,34);
}
</style>