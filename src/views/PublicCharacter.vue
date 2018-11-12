<template>
  <div v-if="character" class="character" :id="character.id">
    <div class="header">
      <span class="title">{{character.name}}</span>
    </div>
    <ec-pubSheet class="character-sheet"
      :sheetEntries="sheetEntries">
    </ec-pubSheet>
  </div>
</template>

<script>
import ecPubSheet from '@/components/PublicSheet'
export default {
  name: 'pubCharacter',
  components: {
    ecPubSheet
  },
  data () {
    return {
      character: (this.$store.state.global.allCharacters || []).find(character => {
        return character.id === this.$route.params.characterId
      }),
      sheetEntries: this.$store.state.global.characterSheets && this.$store.state.global.characterSheets[this.$route.params.characterId]
    }
  },
  mounted () {
    const self = this
    const store = this.$store
    const globalState = store.state.global
    const characterId = this.$route.params.characterId

    if (!globalState.allCharacters) {
      store.dispatch('fetchAllCharacters')
    }
    if (!globalState.skills) {
      store.dispatch('fetchSkills')
    }

    if (!globalState.characterSheets || !globalState.characterSheets[characterId]) {
      store.dispatch('fetchCharacterSheet', { characterId })
    }

    store.watch(
      state => state.global.allCharacters,
      value => {
        globalState.allCharacters.forEach((character) => {
          store.dispatch('fetchCharacterSheet', {
            characterId: character.id
          })
        })
      })

    store.watch(
      state => state.global.characterSheets,
      value => {
        self.$data.characterSheets = globalState.characterSheets
        self.$data.sheetEntries = globalState.characterSheets[characterId]
      })
    console.log(this.$data)
    console.log(self.$data.characterSheets)
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
</style>
