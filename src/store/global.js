import Vue from 'vue'
import { PlayerService, CharacterService, SheetEntryService, SkillService } from '@/common/api.service'

const state = {
  player: {},
  characters: [],
  allCharacters: [],
  characterSheets: {},
  skills: []
}

const actions = {
  fetchPlayer ({ commit }, uuid) {
    // console.log('Dispatching fetchPlayer')
    return PlayerService.get(uuid)
      .then(({ data }) => {
        commit('setPlayer', data)
      })
      .catch(error => {
        throw new Error(error)
      })
  },
  fetchCharacters ({ commit }, playerId) {
    // console.log('Dispatching fetchCharacters')
    return CharacterService.getAll(playerId)
      .then(({ data }) => {
        commit('setCharacters', data)
      })
      .catch(error => {
        throw new Error(error)
      })
  },
  fetchAllCharacters ({ commit }) {
    // console.log('Dispatching fetchAllCharacters')
    return CharacterService.getAll()
      .then(({ data }) => {
        commit('setAllCharacters', data)
      })
      .catch(error => {
        throw new Error(error)
      })
  },
  fetchCharacterSheet ({ commit }, params) {
    // console.log('Dispatching fetchCharacterSheet');
    (params.playerId ? SheetEntryService.getAll(params.playerId, params.characterId) : SheetEntryService.getAllAnonymous(params.characterId))
      .then(({ data }) => {
        commit('setCharacterSheet', {
          sheet: data,
          characterId: params.characterId
        })
      })
      .catch(error => {
        throw new Error(error)
      })
  },
  fetchSkills ({ commit }, playerId) {
    // console.log('Dispatching fetchSkills')
    return SkillService.getAll()
      .then(({ data }) => {
        const topLevelSkills = data.filter(skill => skill['parent_skill_id'] === '00000000-0000-0000-0000-000000000000')
        const skills = {
          general: topLevelSkills.filter(skill => skill['cost'] === 0),
          main: topLevelSkills.filter(skill => skill['cost'] !== 0).map(skill => {
            skill.children = data.filter(childSkill => childSkill['parent_skill_id'] === skill['id'])
            return skill
          })
        }
        commit('setSkills', skills)
      })
      .catch(error => {
        throw new Error(error)
      })
  },

  createCharacter ({ commit }, params) {
    // console.log('Dispatching createCharacter')
    CharacterService.create(params.playerId, {name: params.characterName})
      .then(({ data }) => {
        const charData = data
        commit('addCharacter', charData)
        SheetEntryService.getAll(params.playerId, charData.id)
          .then(({ data }) => {
            commit('setCharacterSheet', {
              sheet: data,
              characterId: charData.id
            })
          })
          .catch(error => {
            throw new Error(error)
          })
      })
      .catch(error => {
        throw new Error(error)
      })
  },

  deleteCharacter ({ commit }, params) {
    // console.log('Dispatching deleteCharacter')
    CharacterService.destroy(params.playerId, params.characterId)
      .then(({ data }) => {
        commit('deleteCharacter', params.characterId)
        commit('deleteSheet', params.characterId)
      })
      .catch(error => {
        throw new Error(error)
      })
  },

  modifySheetSkill ({ commit }, params) {
    // console.log('Dispatching modifySheetSkill')
    commit('modifySheetSkill', params)
  },
  saveModifiedSheetSkills ({ commit }, params) {
    // console.log('Dispatching saveModifiedSheetSkills')
    SheetEntryService.updateMany(params.playerId, params.characterId, params.sheetEntries)
      .then(({ data }) => {
        commit('saveModifiedSheetSkills', {
          characterId: params.characterId,
          sheetEntries: data
        })
      })
      .catch(error => {
        throw new Error(error)
      })
  }
}

const mutations = {
  setPlayer (state, player) {
    if (!state.player) {
      state.player = {}
    }
    Object.keys(player).forEach((prop) => {
      Vue.set(state.player, prop, player[prop])
    })
  },
  setCharacters (state, characters) {
    state.characters = characters
  },
  setAllCharacters (state, characters) {
    state.allCharacters = characters
  },
  setCharacterSheet (state, params) {
    if (!state.characterSheets) {
      state.characterSheets = {}
    }
    Vue.set(state.characterSheets, params.characterId, params.sheet)
  },
  setSkills (state, skills) {
    state.skills = skills
  },
  addCharacter (state, character) {
    if (!state.characters) {
      state.characters = []
    }
    state.characters.push(character)
  },
  deleteCharacter (state, characterId) {
    const index = state.characters.indexOf(state.characters.find(c => c.id === characterId))
    state.characters.splice(index, 1)
  },
  deleteSheet (state, characterId) {
    state.characterSheets[characterId] = null
    delete state.characterSheets[characterId]
  },
  modifySheetSkill (state, params) {
    state.characterSheets[params.characterId].find(s => s.id === params.entryId).value += params.valueChange
  },
  saveModifiedSheetSkills (state, params) {
    state.characterSheets[params.characterId] = params.sheetEntries
  }
}

// Example in case I want to turn things into getters
// const getters = {
//   allCharacters: state => {
//     return state.allCharacters
//   }
// }

export default {
  // getters, // Example getters
  state,
  actions,
  mutations
}
