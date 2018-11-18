<template>
  <div v-if="character" class="character" :id="character.id">
    <div class="header">
      <router-link class="btn"
        :to="{
          name: 'player',
          params: {playerId: character['player_id']}
        }">&lt;</router-link>
      <span class="title"><img class="race-portrait" :src="getRaceIcon(character)" /> {{character.name}}</span>
      <router-link
        :to="{
          name: 'publicCharacter',
          params: {characterId: character.id}
        }">(public link)</router-link>
    </div>
    <ec-Sheet class="character-sheet"
      :character="character"
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
      character: null
    }
  },
  beforeMount () {
    const store = this.$store
    store.watch(
      state => state.global.characters,
      value => {
        this.$data.character = store.state.global.characters.find(character => {
          return character.id === this.$route.params.characterId
        })
      })
  },
  mounted () {
    const router = this.$router
    const store = this.$store
    const characterId = this.$route.params.characterId
    if (!TokenService.hasToken()) {
      router.push({
        name: 'home'
      })
    } else {
      if (store.state.global.characters && (!this.$data.character || !this.$data.character.id !== characterId)) {
        this.$data.character = store.state.global.characters.find(character => {
          return character.id === characterId
        })
      }
    }
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
</style>
