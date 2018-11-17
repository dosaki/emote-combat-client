<template>
  <div id='app' class="container">
    <ec-header class="header"></ec-header>
    <router-view class="body" :key="$route.fullPath"></router-view>
    <ec-footer class="footer"></ec-footer>
  </div>
</template>

<script>
import ecHeader from '@/components/Header'
import ecFooter from '@/components/Footer'
import TokenService from '@/common/token.service'

export default {
  name: 'App',
  components: {
    ecHeader,
    ecFooter
  },
  methods: {
    gotToken () {
      return TokenService.hasToken()
    }
  },
  beforeMount () {
    const store = this.$store
    store.dispatch('fetchAllCharacters')
    store.dispatch('fetchSkills')

    console.log('Token:', TokenService.hasToken())
    if (TokenService.hasToken()) {
      store.dispatch('fetchPlayer', TokenService.getCurrentUser())
      store.dispatch('fetchCharacters', TokenService.getCurrentUser())
    }

    store.watch(
      state => state.global.player,
      value => {
        store.dispatch('fetchCharacters', value.id)
        console.log('(Global Watch) player:', value)
      })

    store.watch(
      state => state.global.characters,
      value => {
        store.state.global.characters.forEach((character) => {
          store.dispatch('fetchCharacterSheet', {
            playerId: store.state.global.player.id,
            characterId: character.id
          })
        })
        console.log('(Global Watch) characters:', value)
      })

    store.watch(
      state => state.global.allCharacters,
      value => {
        console.log('(Global Watch) all characters:', value)
        store.state.global.allCharacters.forEach((character) => {
          store.dispatch('fetchCharacterSheet', {
            characterId: character.id
          })
        })
      })
  }
}
</script>

<style scoped>
.container {
  min-height:100%;
  position:relative;
}
.body {
  width: 1024px;
  margin-left: auto;
  margin-right: auto;
  background: #1d1d1d;
  border: 10px solid #242424;
  padding: 20px 20px 80px;
}
.header {
  border-bottom:1px solid black;
  padding-bottom:5px;
  margin-bottom:10px;
}
.footer {
  border-top:1px solid black;
  padding-top:5px;
  margin-top:10px;
  position:absolute;
  bottom:0;
  width:100%;
  height: 60px;
}
</style>
