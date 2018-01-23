import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'

import EventBus from '@/plugins/event-bus'

import routes from '@/routes'

import 'vue-awesome/icons'

import sgToMm from '@/filters/sg-to-mm'

import Icon from 'vue-awesome/components/Icon'

Vue.use(EventBus)
Vue.use(sgToMm)
Vue.use(VueRouter)

Vue.component('icon', Icon)

Vue.filter('toLowerCase', function (value) {
  return value.toLowerCase()
})

const router = new VueRouter({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    // return desired position
    return {x: 0, y: 0}
  }
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
