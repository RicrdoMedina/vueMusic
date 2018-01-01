import trae from 'trae'
import configService from './config'

const vueMusic = trae.create({
  baseUrl: configService.apiUrl
})

export default vueMusic
