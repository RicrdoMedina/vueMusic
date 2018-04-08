<template lang="pug">
  .box-main
    .columns
      .column.is-12-mobile.is-12-tablet.is-4-desktop
        .navigate
          h4 navigate
          ul
            li 
              router-link(:to="{ path: '/vueMusic/' }") Home
            li 
              router-link(:to="{ path: '/vueMusic/top-artists' }") Top artists
            li 
              router-link(:to="{ path: '/vueMusic/top-tracks' }") Top tracks
            li 
              router-link(:to="{ path: '/vueMusic/about' }") About me

      .column.is-12-mobile.is-12-tablet.is-4-desktop
        .content-nota
          h4 Note
          p.nota The last.fm Rest API was used as a query service to provide information about the entire client site.
          .more-info
            span more info:
            a(href="https://www.last.fm/api", target="_blank") &nbsp; https://www.last.fm/api
      .column.is-12-mobile.is-12-tablet.is-4-desktop
        .info
          h4 info 
          p.mail
            a(href="mailto:rcrdmedina6@gmail.com") 
              .icon-envelope
                icon(name="envelope" scale="1")
              | rcrdmedina6@gmail.com

          h4.follow-me follow me

          .box-social-media
            a(href="https://www.facebook.com/profile.php?id=100013340386539" target="_blank")
              .icon-facebook-square
                icon(name="facebook-square" scale="2")
            a(href="https://twitter.com/RicrdoMedina" target="_blank")
              .icon-twitter-square
                icon(name="twitter-square" scale="2")
            a(href="https://github.com/RicrdoMedina" target="_blank")
              .icon-github-square
                  icon(name="github-square" scale="2")
            a(href="https://www.linkedin.com/in/ricardo-medina-webdeveloper/" target="_blank")
              .icon-linkedin-square
                  icon(name="linkedin-square" scale="2")

</template>

<style lang="scss" scoped>
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
  background-image: url("https://ricrdomedina.github.io/vueMusic/dist/dark-mosaic-footer.png");
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
@media only screen 
and (max-width : 1024px) {
  .box-main .navigate,
  .box-main .info{
     margin: .8rem auto 0;
     padding: 2rem 2rem 0;
     text-align: center;
   }
   .box-main .navigate{
     margin-top: .4rem;
   }
   .box-main .info{
     margin-top: 2rem;
   }
   .box-main .navigate h4,
   .box-main .content-nota h4,
   .box-main .info h4{
     font-size: 2.8rem;
     margin-bottom: 2rem;
   }
   .box-main .navigate h4{
     margin-bottom: 1.3rem;
   }
   .box-main .navigate ul li{
     font-size: 1.2rem;
     margin-bottom: .4rem;
   }
   .box-main .content-nota{
     margin-top: .8rem;
     padding: 0 2rem;
     text-align: center;
   }
   .box-main .info .mail{
     font-size: 1.1rem;
   }
   .box-main .info .box-social-media{
     display: flex;
     align-items: center;
     justify-content: center;
   }
}
</style>