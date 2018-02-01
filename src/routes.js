import Search from '@/components/Search.vue'
import TopArtist from '@/components/TopArtist.vue'
import TopTracks from '@/components/TopTracks.vue'
import DetailTrack from '@/components/DetailTrack.vue'
import About from '@/components/About.vue'

const routes = [
  { path: '/', component: Search, name: 'search' },
  { path: '/top-artists', component: TopArtist, name: 'top-artists' },
  { path: '/top-tracks', component: TopTracks, name: 'top-tracks' },
  { path: '/:artist/:track', component: DetailTrack, name: 'track' },
  { path: '/:about', component: About, name: 'about' }
]

export default routes
