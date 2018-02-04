import Search from '@/components/Search.vue'
import TopArtist from '@/components/TopArtist.vue'
import TopTracks from '@/components/TopTracks.vue'
import DetailTrack from '@/components/DetailTrack.vue'
import About from '@/components/About.vue'

const routes = [
  { path: '/vueMusic/', component: Search, name: 'search', meta: {title: 'Home'} },
  { path: '/vueMusic/top-artists', component: TopArtist, name: 'top-artists', meta: {title: 'Home'} },
  { path: '/vueMusic/top-tracks', component: TopTracks, name: 'top-tracks' },
  { path: '/vueMusic/track/:track/:artist', component: DetailTrack, name: 'track' },
  { path: '/vueMusic/about', component: About, name: 'about' }
]

export default routes
