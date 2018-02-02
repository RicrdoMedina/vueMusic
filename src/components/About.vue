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
              img(src="../assets/me.png", alt="Ricardo Medina")
              figcaption
                p.track Ricardo Medina
                p.artist Full Stack Developer
            article.content-wiki
              h3 Sobre mí
              p.wiki 
                | Soy un desarrollador web con 2 años de experiencia, empecé aprendiendo PHP por mi cuenta debido a mi fuerte vocación e inclinación por las tecnologías web. Desde entonces he crecido como profesional gracias a las oportunidades y experiencias brindadas dentro del ámbito laboral.
                
              p 
                | Al día de hoy poseo experiencia y habilidades en la creación de páginas web, desarrollo desde cero o rediseño de página actual.

              p
                | Implemento responsive web design en todos mis trabajos para que el sitio web se visualice en cualquier dispositivo algo fundamental ahora mismo ya que el mayor porcentaje de las visitas provienen de móviles como tablets y smartphone. Dominio de Html 5 (páginas web semánticas para posicionamiento en los buscadores), CSS3 (diseño y maquetación del sitio), SEO para posicionamiento web, Web performance (formación y experiencia optimizando la velocidad de carga de la web).
 

            
        .column.is-12-mobile.is-12-tablet.is-6-desktop
          .content-bio.about
            article
              h3 Datos de interés:
                ul
                  li Valoro todos los proyectos en los que participo con una clara vocación de resultados y calidad de servicio.
                  li Mi principal objetivo es comprender los requerimientos para cumplir las expectativas.
                  li Responsabilidad y disciplina. 
                  li Capacidad de organización.
                  li Comunicación y trabajo en equipo.
                  li Actualmente en mi tiempo libre lo dedico a seguir mejorando.
            article
              h3 Mis Habilidades Principales
                .box-images
                  .content-img
                    img(src='../assets/html5.png', alt='Html 5')
                  .content-img
                    img(src='../assets/css3.png', alt='CSS 3')
                  .content-img
                    img(src='../assets/js.png', alt='Javascript')
                  .content-img
                    img(src='../assets/jquery.png', alt='jquery')
                  .content-img
                    img(src='../assets/vuejs.jpg', alt='Vue js')
                  .content-img
                    img(src='../assets/webpack.jpg', alt='Webpack')
                  .content-img
                    img(src='../assets/nodejs.png', alt='Node js')
                  .content-img
                    img(src='../assets/laravel.png', alt='Laravel')
                  .content-img
                    img(src='../assets/mysql.png', alt='Mysql')
            article
              h3 Actualmente
              p Me dedico hacer seguimiento de las nuevas tecnologias y aprender aquellas que sean las mas populares en el area, agregandolas a mi stack de trabajo.  Soy freelancer y estoy registrado en workana donde ofrezco mi servicios como web developers.

              
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
  min-height: 1000px;
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
  font-size: .9rem;
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