import Vue from 'vue'
import App from '@/App.vue'

// import all icons if you don't care about bundle size
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

// globally (in your main .js file)
Vue.component('icon', Icon)

new Vue({
  el: '#app',
  render: h => h(App)
})
