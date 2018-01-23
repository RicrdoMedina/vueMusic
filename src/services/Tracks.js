import trae from 'trae'
import configService from './config'

const vueMusic = trae.create({
  baseUrl: configService.apiUrl
})

const tracks = {}

const apiKey = configService.apiKey

tracks.geoGetTopTracks = function (q, page = 1, limit = 60) {
  let country = q
  return vueMusic.get('/2.0/', {
    params: {
      method: 'geo.gettoptracks',
      country,
      limit,
      page,
      api_key: apiKey,
      format: 'json'
    }
  }).then(res => res.data)
}

tracks.search = function (q, page = 1, limit = 60) {
  return vueMusic.get('/2.0/', {
    params: {
      method: 'track.search',
      track: q,
      limit,
      page,
      api_key: apiKey,
      format: 'json'
    }
  }).then(res => res.data)
}

// Top Artists
tracks.topArtists = function (limit = 15) {
  return vueMusic.get('/2.0/', {
    params: {
      method: 'chart.gettopartists',
      api_key: apiKey,
      limit,
      format: 'json'
    }
  }).then(res => res.data)
}

tracks.artistGetInfo = function (q) {
  return vueMusic.get('/2.0/', {
    params: {
      method: 'artist.getinfo',
      artist: q,
      api_key: apiKey,
      format: 'json'
    }
  }).then(res => res.data)
}

tracks.artistGetTopAlbums = function (q) {
  return vueMusic.get('/2.0/', {
    params: {
      method: 'artist.gettopalbums',
      artist: q,
      limit: 5,
      api_key: apiKey,
      format: 'json'
    }
  }).then(res => res.data)
}

tracks.artistGetTopTracks = function (q) {
  return vueMusic.get('/2.0/', {
    params: {
      method: 'artist.gettoptracks',
      artist: q,
      limit: 10,
      api_key: apiKey,
      format: 'json'
    }
  }).then(res => res.data)
}

// Top Tracks
tracks.getTopTracks = function (limit = 50) {
  return vueMusic.get('/2.0/', {
    params: {
      method: 'chart.gettoptracks',
      api_key: apiKey,
      limit,
      format: 'json'
    }
  }).then(res => res.data)
}

tracks.trackGetInfo = function (artist, track) {
  return vueMusic.get('/2.0/', {
    params: {
      method: 'track.getInfo',
      artist,
      track,
      api_key: apiKey,
      format: 'json'
    }
  }).then(res => res.data)
}

// Top Albums
tracks.albumGetInfo = function (artist, album) {
  return vueMusic.get('/2.0/', {
    params: {
      method: 'album.getinfo',
      artist,
      album,
      api_key: apiKey,
      format: 'json'
    }
  }).then(res => res.data)
}

export default tracks
