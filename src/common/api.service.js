import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import TokenService from '@/common/token.service'

const API_URL = 'https://emote-combat-server.dosaki.net'

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = API_URL
  },

  setHeader () {
    Vue.axios.defaults.headers.common[ 'Authorization' ] = `${TokenService.getToken()}`
  },

  query (resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[EC] ApiService ${error}`)
    })
  },

  get (resource, slug = '') {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[EC] ApiService ${error}`)
    })
  },

  post (resource, params) {
    return Vue.axios.post(`${resource}`, params)
  },

  update (resource, slug, params) {
    if (slug === null) {
      return Vue.axios.put(`${resource}`, params)
    }
    return Vue.axios.put(`${resource}/${slug}`, params)
  },

  put (resource, params) {
    return Vue.axios.put(`${resource}`, params)
  },

  delete (resource, slug = null) {
    const appendage = !slug ? '' : `/${slug}`
    return Vue.axios.delete(`${resource}${appendage}`).catch(error => {
      throw new Error(`[EC] ApiService ${error}`)
    })
  }
}

export default ApiService

export const PlayerService = {
  getAll () {
    ApiService.setHeader()
    return ApiService.get('players') // no endpoint yet
  },
  get (uuid) {
    ApiService.setHeader()
    return ApiService.get('player', uuid)
  },
  create (params) {
    return ApiService.post('player', params)
  },
  update (uuid, params) {
    ApiService.setHeader()
    return ApiService.update('player', uuid, params)
  },
  destroy (uuid) {
    ApiService.setHeader()
    return ApiService.delete('player', uuid) // no endpoint yet
  }
}

export const CharacterService = {
  getAll (playerId = '') {
    if (!playerId) {
      return ApiService.get('characters')
    }
    ApiService.setHeader()
    return ApiService.get(`player/${playerId}/characters`)
  },
  get (playerId, uuid) {
    ApiService.setHeader()
    return ApiService.get(`player/${playerId}/character`, uuid)
  },
  create (playerId, params) {
    ApiService.setHeader()
    return ApiService.post(`player/${playerId}/character`, params)
  },
  update (playerId, uuid, params) {
    ApiService.setHeader()
    return ApiService.update(`player/${playerId}/character`, uuid, params)
  },
  destroy (playerId, uuid) {
    ApiService.setHeader()
    return ApiService.get(`player/${playerId}/character/${uuid}/delete`)
  }
}

export const SheetEntryService = {
  getAll (playerId, characterId) {
    ApiService.setHeader()
    return ApiService.get(`/player/${playerId}/character/${characterId}/sheet_entries`)
  },
  getAllAnonymous (characterId) {
    return ApiService.get(`/character/${characterId}/sheet_entries`)
  },
  get (playerId, characterId, uuid) {
    ApiService.setHeader()
    return ApiService.get(`/player/${playerId}/character/${characterId}/sheet_entry`, uuid)
  },
  create (playerId, characterId, params) {
    ApiService.setHeader()
    return ApiService.post(`/player/${playerId}/character/${characterId}/sheet_entry`, params)
  },
  update (playerId, characterId, uuid, params) {
    ApiService.setHeader()
    return ApiService.update(`/player/${playerId}/character/${characterId}/sheet_entry`, uuid, params)
  },
  updateMany (playerId, characterId, params) {
    ApiService.setHeader()
    return ApiService.update(`/player/${playerId}/character/${characterId}/sheet_entries`, null, params)
  },
  destroy (playerId, characterId, uuid) {
    ApiService.setHeader()
    return ApiService.delete(`/player/${playerId}/character/${characterId}/sheet_entry`, uuid)
  }
}

export const SkillService = {
  getAll () {
    return ApiService.get(`/skills`)
  },
  get (uuid) {
    return ApiService.get(`/skill`, uuid)
  },
  create (params) {
    return ApiService.post(`/skill`, params)
  },
  update (uuid, params) {
    return ApiService.update(`/skill`, uuid, params)
  },
  destroy (uuid) {
    return ApiService.delete(`/skill`, uuid)
  }
}

export const AuthService = {
  create (params) {
    return ApiService.post('auth/token', params)
  },
  destroy () {
    return ApiService.get('auth/invalidate')
  }
}
