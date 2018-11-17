<template>
  <div v-if="character" class="character" :id="character.id">
    <div class="header">
      <router-link class="btn"
        :to="{
          name: 'player',
          params: {playerId: character['player_id']}
        }">&lt;</router-link>
      <span class="title">{{character.name}}</span>
      <router-link
        :to="{
          name: 'publicCharacter',
          params: {characterId: character.id}
        }">(public link)</router-link>
    </div>
    <ec-Sheet class="character-sheet"
      :characterId="character.id"
      :playerId="character['player_id']">
    </ec-Sheet>
  </div>
</template>

<script>
import ecSheet from '@/components/Sheet'
import TokenService from '@/common/token.service'

export default {
  name: 'character',
  components: {
    ecSheet
  },
  data () {
    return {
      character: (this.$store.state.global.characters || []).find(character => {
        return character.id === this.$route.params.characterId
      })
    }
  },
  mounted () {
    const router = this.$router
    const store = this.$store
    if (TokenService.hasToken()) {
      if (store.global && !store.global.player.id) {
        store.dispatch('fetchSkills')
        store.dispatch('fetchPlayer', TokenService.getCurrentUser())
      }
      if (store.global && !store.global.characters) {
        store.dispatch('fetchCharacters', store.global.player.id)
      }

      if (store.state.global.characters) {
        store.state.global.characters.forEach((character) => {
          store.dispatch('fetchCharacterSheet', {
            characterId: character.id
          })
        })
      }

      store.watch(
        state => state.global.characters,
        value => {
          store.state.global.characters.forEach((character) => {
            store.dispatch('fetchCharacterSheet', {
              playerId: store.state.global.player.id,
              characterId: character.id
            })
          })
        })
    } else {
      router.push({
        name: 'home'
      })
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
</style>
