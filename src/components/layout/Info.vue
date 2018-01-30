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
        .content-nota
          h4 Nota
          p.nota Se uso la API Rest de last.fm como servicio de consulta para proporcionar la información de todo el client site.
          .more-info
            span more info:
            a(href="https://www.last.fm/api", target="_blank") &nbsp; https://www.last.fm/api
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
@import 'src/scss/media-queries.scss';
a,a:link,a:active,a:visited,a:focus,a:hover{
  color: #fff;
  transition:all 0.6s ease-out;
}
a:hover{
  color:#f092049a;
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
  background-image: url("../../assets/dark-mosaic-footer.png");
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
.content-nota{
  margin-top:1.4rem;
  padding: 0 1rem 0 0;
  position: relative;
}
.nota{
  text-align: justify;
  margin-top:1rem;
  color:#fff;
  font-size: 1rem;
}
.more-info{
  position: absolute;
  bottom: -60px;
  right: 20px;
  font-size: 1rem;
}
.nota, .more-info{
  font-style: oblique;
}
.box-social-media{
  display: flex;
}
.box-social-media a{
  margin-right: .9rem;
}
</style>