<template>
  <div v-if="character" class="character" :id="character.id">
    <div class="header">
      <router-link class="btn"
        :to="{
          name: 'allCharacters'
        }">&lt;</router-link>
      <div class="character-name">
        <span class="title">
          <img class="race-portrait" :src="getRaceIcon(character)" />
          {{character.name}}
        </span>
      </div>
      <router-link
        v-if="currentPlayer === character['player_id']"
        :to="{
          name: 'character',
          params: {
            playerId: character['player_id'],
            characterId: character.id
          }
        }">(edit)</router-link>
      <div class="ingame-character-name">({{character["ingame_name"]}})</div>
    </div>
    <ec-pubSheet class="character-sheet"
      :character="character">
    </ec-pubSheet>
  </div>
</template>

<script>
import ecPubSheet from '@/components/PublicSheet'
import TokenService from '@/common/token.service'

export default {
  name: 'pubCharacter',
  components: {
    ecPubSheet
  },
  data () {
    return {
      character: null,
      currentPlayer: null
    }
  },
  beforeMount () {
    const self = this
    const store = this.$store
    const globalState = store.state.global
    const characterId = this.$route.params.characterId

    self.$data.currentPlayer = TokenService.getCurrentUser()

    if (globalState.allCharacters && globalState.allCharacters.length > 0) {
      self.$data.character = globalState.allCharacters.find(character => {
        return character.id === characterId
      })
    }

    if (globalState.characterSheets && Object.keys(globalState.characterSheets).length > 0) {
      self.$data.characterSheets = globalState.characterSheets
    }

    store.watch(
      state => state.global.allCharacters,
      value => {
        self.$data.character = globalState.allCharacters.find(character => {
          return character.id === characterId
        })
      })

    store.watch(
      state => state.global.characterSheets,
      value => {
        self.$data.characterSheets = globalState.characterSheets
      })
  },
  methods: {
    getRaceIcon (character) {
      return `/static/images/races/${character.race.replace(/[\s']/g, '').toLowerCase()}_${character.gender.toLowerCase()}.jpg`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  color: #e6cc00;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  width: 500px;
  padding: 20px;
  border: 6px double #797979;
  border-radius: 10px;
  background: radial-gradient(black 15%, transparent 16%) 0 0,
    radial-gradient(black 15%, transparent 16%) 8px 8px,
    radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 0 1px,
    radial-gradient(rgba(255,255,255,.1) 15%, transparent 20%) 8px 9px;
  background-color:#282828;
  background-size:10px 10px;
  margin: 0 auto 10px;
}
.character-sheet {
  margin: 0 auto;
}
.character-name {
  display: inline-block;
}
.ingame-character-name {
  margin-left: 75px;
  font-size: 0.9em;
}
</style>
