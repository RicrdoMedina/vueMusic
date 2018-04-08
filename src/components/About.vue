<template lang="pug">
  section#sectionMain.section-main(v-bind:class="{ 'is-loaded': isLoading }")
    vue-headful(title='About me', description="Library of songs most populars, Find and Browse your favorite music, Top tracks and artists most populars of moment")
    vm-loader
    .box-hero
      h1.tittle
        span About me
    .container.detail-track
      .columns
        .column.is-12-mobile.is-12-tablet.is-6-desktop
          .content-info-track.about
            figure(class='content-image')
              img(src="https://ricrdomedina.github.io/vueMusic/dist/me.png", alt="Ricardo Medina")
              figcaption
                p.track Ricardo Medina
                p.artist Full Stack Developer
            article.content-wiki
              h3 This is me
              p.wiki 
                | Hello, my name is Ricardo, I am a web developer. I have worked in this field for 3 years and I am competent in both front-end and back-end development. I work with the latest tools and methodologies to keep up with current trends.
                
              p 
                | I started in the world of programming learning PHP on my own, that was my starting point to fall in love with this area that teaches you incredible things every day.

              p
                | I have been working in several companies as a programmer, layout designer and systems analyst thanks to the opportunities and experiences offered in the workplace has allowed me to launch the adventure as a freelance since 2017, filling me with satisfaction to be able to collaborate with various projects allowing me to continue Grow as a professional and gain enriching experiences.
 

            
        .column.is-12-mobile.is-12-tablet.is-6-desktop
          .content-bio.about
            article
              h3 Of interest:
                ul
                  li I value all the projects in which I participate with a clear vocation for results and quality of service.
                  li My main objective is to understand the requirements to meet expectations.
                  li Responsibility and discipline. 
                  li Organizational capacity.
                  li Communication and teamwork.
                  li Currently in my free time I dedicate it to continue improving.
            article
              h3 My main skills
                .box-images
                  .content-img
                    img(src='https://ricrdomedina.github.io/vueMusic/dist/html5.png', alt='Html 5')
                  .content-img
                    img(src='https://ricrdomedina.github.io/vueMusic/dist/css3.png', alt='CSS 3')
                  .content-img
                    img(src='https://ricrdomedina.github.io/vueMusic/dist/js.png', alt='Javascript')
                  .content-img
                    img(src='https://ricrdomedina.github.io/vueMusic/dist/jquery.png', alt='jquery')
                  .content-img
                    img(src='https://ricrdomedina.github.io/vueMusic/dist/vuejs.jpg', alt='Vue js')
                  .content-img
                    img(src='https://ricrdomedina.github.io/vueMusic/dist/webpack.jpg', alt='Webpack')
                  .content-img
                    img(src='https://ricrdomedina.github.io/vueMusic/dist/nodejs.png', alt='Node js')
                  .content-img
                    img(src='https://ricrdomedina.github.io/vueMusic/dist/laravel.png', alt='Laravel')
                  .content-img
                    img(src='https://ricrdomedina.github.io/vueMusic/dist/mysql.png', alt='Mysql')
            article
              h3 Currently
              p I am dedicated to continue improving using my free time to learn the most useful technologies of the medium, adding them to my work stack.

              
</template>

<script>

import fadeInMixin from '@/mixins/FadeIn'
import closeMenuMixin from '@/mixins/CloseMenu'
import VmLoader from '@/components/shared/Loader.vue'
import vueHeadful from 'vue-headful'

export default {
  name: 'app',
  data () {
    return {
      isLoading: false
    }
  },
  mixins: [closeMenuMixin, fadeInMixin],
  components: {
    VmLoader,
    vueHeadful
  },
  created () {
    setTimeout(() => {
      this.isLoading = true
      this.fadeIn()
    }, 3000)
  }
}
</script>

<style lang="scss">

@import 'src/scss/general.scss';

.box-hero .tittle,
.content-info-track.about > *,
.content-bio > *
{
  opacity: 0;
  transition:all 1s ease-out;
  will-change: auto;
}
.fadeIn .box-hero .tittle,
.fadeIn .content-info-track.about  > *,
.fadeIn .content-bio > *
{
  opacity: 1;
  transition:all 1s ease-in;
}
.content-image{
  text-align: center;
}
.section-main .content-bio.about article{
  min-height: unset;
}
.section-main .content-info-track.about article p,
.section-main .content-bio.about article p
{
  text-align: justify;
  margin: 1rem auto;
  text-indent: .5rem;
}
.section-main .content-info-track.about,
.section-main .content-bio.about{
  min-height: 1050px;
  position: static;
  overflow: hidden;
  padding-top: 2rem;
  margin-top: 4rem;
}
.content-info-track.about .artist{
  font-size: 1.4rem;
}
.content-info-track.about .content-image img {
  margin-top:1rem;
  width: 50%;
}
.about ul{
  font-size: 1rem;
  margin-left: .8rem;
  margin-top: 1rem;
  color: rgb(181,181,181);
}
.about ul li{
  margin: .5rem auto;
}
.box-images{
  display: flex;
  align-items: center;
  justify-content:space-around;
  flex-wrap:wrap;
}
.box-images .content-img{
  width: 100px;
  height: 100px;
  background: #fff;
  border-radius:50%;
  overflow: hidden;
  margin: .8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 3px rgb(148,66,37);
  filter: sepia(60%);
  transition:all .6s ease-out;
  will-change: auto;
}
.box-images .content-img:hover{
  filter: unset;
  transition:all .6s ease-in;
  transform: scale(1.1);
}
.box-images .content-img img{
  width: 80%;
}

@media only screen 
and (min-width : 320px) 
and (max-width : 540px) {
  .section-main .content-info-track.about, .section-main .content-bio.about{
    min-height: unset;
    height: auto;
  }
  .section-main .content-info-track.about .track{
    font-size: 1.5rem;
  }
  .content-info-track.about .content-image img {
    width: 70%;
  }
}
@media only screen 
and (min-width : 767px)
and (max-width : 1024px) {
  .columns:not(.is-desktop) {
    display: block;
  }
  .section-main .content-info-track.about,
  .section-main .content-bio.about{
    width: 80%;
    margin: 2rem auto 1rem;
    position: static;
  }
  .section-main .content-info-track.about{
    margin-top: 4rem;
  }
}
@media only screen 
and (max-width : 767px) {
  .section-main .content-bio.about{
    margin-top:0;
  }
}
@media only screen 
and (max-width : 1024px) {
  .box-images .content-img{
    filter: unset;
  }
}

</style>