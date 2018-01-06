import Search from '@/components/Search.vue'
import TopArtist from '@/components/TopArtist.vue'
import TopTracks from '@/components/TopTracks.vue'
import TopAlbums from '@/components/TopAlbums.vue'

const routes = [
  { path: '/', component: Search, name: 'search' },
  { path: '/top-artists', component: TopArtist, name: 'top-artists' },
  { path: '/top-tracks', component: TopTracks, name: 'top-tracks' },
  { path: '/top-albums', component: TopAlbums, name: 'top-albums' }
]

export default routes
