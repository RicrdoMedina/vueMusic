<template lang="pug">
  .box-main
    .columns
      .column.is-3
        .navigate
          h4 navigate
          ul
            li 
              router-link(:to="{ path: '/' }") Home
            li 
              router-link(:to="{ path: '/top-artists' }") Top artists
            li 
              router-link(:to="{ path: '/top-tracks' }") Top tracks
            li 
              a About me

      .column


      .column.is-3
        .info
          h4 info 
          p.mail
            a(href="mailto:rcrdmedina6@gmail.com") 
              .icon-envelope
                icon(name="envelope" scale="1")
              | rcrdmedina6@gmail.com

          h4.follow-me follow me

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

</template>

<style lang="scss" scoped>

a,a:link,a:active,a:visited,a:focus,a:hover{
  color: #fff;
  -ms-transition:all 0.6s ease-out;
  -moz-transition:all 0.6s ease-out;
  -o-transition:all 0.6s ease-out;
  -webkit-transition:all 0.6s ease-out;
  transition:all 0.6s ease-out;
}
a:hover{
  color:#de5922cc;
  -ms-transition:all 0.6s ease-in;
  -moz-transition:all 0.6s ease-in;
  -o-transition:all 0.6s ease-in;
  -webkit-transition:all 0.6s ease-in;
  transition:all 0.6s ease-in;
}
.box-main{
  padding: 1rem 0;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 2.8rem;
  background: rgba(0, 0, 0, 0.7);
  color:rgb(222,89,34);
  width: 100%;
  font-size: 1.1rem;
}
.navigate, .info{
  margin-top:.8rem;
  padding: .5rem 0 0 2rem;
  text-align: left;
}
.box-main h4{
  font-size: 1.8rem;
  font-family: 'Dancing Script', cursive, "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
}
.navigate ul {
  margin-top: 1rem;
}
.navigate ul li{
  font-size: 1rem;
  margin-bottom: .9rem;
}
.icon-envelope{
  display:inline;
}
.mail{
  margin-top: 1rem;
  font-size: .9rem;
}
.mail .fa-icon{
  margin-right: .5rem;
  position: relative;
  top: 2px;
}
.follow-me{
  margin-top: 1rem;
  margin-bottom: .5rem;
}
.box-social-media{
  display: flex;
}
.box-social-media a{
  margin-right: .9rem;
}
</style>