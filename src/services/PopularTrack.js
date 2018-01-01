import vueMusic from './vue-music'

const popularTrack = {}

popularTrack.tracks = function () {
  return vueMusic.get('/2.0/?method=user.getlovedtracks&user=rj&api_key=530008d1e1c32fb9159f1b10901f5032&format=json')
    .then(res => res.data)
}

export default popularTrack
