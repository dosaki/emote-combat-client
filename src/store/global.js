import { PlayerService, CharacterService, SheetEntryService, SkillService } from '@/common/api.service'

const state = {
  player: null,
  characters: null,
  // allCharacters: null,
  characterSheets: null,
  skills: []
}

const actions = {
  fetchPlayer ({ commit }, uuid) {
    return PlayerService.get(uuid)
      .then(({ data }) => {
        commit('setPlayer', data)
      })
      .catch(error => {
        throw new Error(error)
      })
  },
  fetchCharacters ({ commit }, playerId) {
    return CharacterService.getAll(playerId)
      .then(({ data }) => {
        commit('setCharacters', data)
      })
      .catch(error => {
        throw new Error(error)
      })
  },
  fetchAllCharacters ({ commit }) {
    return CharacterService.getAll()
      .then(({ data }) => {
        commit('setAllCharacters', data)
      })
      .catch(error => {
        throw new Error(error)
      })
  },
  fetchCharacterSheet ({ commit }, params) {
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
    commit('modifySheetSkill', params)
  },
  saveModifiedSheetSkills ({ commit }, params) {
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
      state.player[prop] = player[prop]
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
    state.characterSheets[params.characterId] = params.sheet
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

export default {
  state,
  actions,
  mutations
}
