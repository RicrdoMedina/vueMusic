import trae from 'trae'
import configService from './config'

const vueMusic = trae.create({
  baseUrl: configService.apiUrl
})

const tracks = {}

const apiKey = configService.apiKey

tracks.geoGetTopTracks = function (q, d = 'venezuela') {
  let country = q === undefined ? d : q
  return vueMusic.get('/2.0/', {
    params: {
      method: 'geo.gettoptracks',
      country,
      api_key: apiKey,
      format: 'json'
    }
  }).then(res => res.data)
}

tracks.search = function (q) {
  return vueMusic.get('/2.0/', {
    params: {
      method: 'track.search',
      track: q,
      api_key: apiKey,
      format: 'json'
    }
  }).then(res => res.data)
}

// Top Artists
tracks.topArtists = function () {
  return vueMusic.get('/2.0/', {
    params: {
      method: 'chart.gettopartists',
      api_key: apiKey,
      limit: 10,
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
tracks.getTopTracks = function () {
  return vueMusic.get('/2.0/', {
    params: {
      method: 'chart.gettoptracks',
      api_key: apiKey,
      limit: 10,
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
