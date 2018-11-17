<template>
  <div v-if="player" :id="player.id">
    <div class="title">
      {{player.name}}'s characters
    </div>
    <div class="character-list">
      <div class="character-list-item"
          v-for="(character, index) in characters"
          v-bind:key="index+'-'+character.id">
        <router-link class="character-info character-link"
          :to="{
            name: 'character',
            params: {
              characterId: character.id,
              playerId: player.id
            }
          }">
          {{character.name}}
        </router-link>
        <span class="character-info character-delete"><button class="btn-borderless" v-on:click="deleteCharacter(character.id)">-</button></span>
      </div>
      <div class="character-list-item ">
        <input class="new-character-input" id="newCharacter" type="text" placeholder="New Character Name"/><button v-on:click="newCharacter" class="btn-borderless create-character">+</button>
      </div>
    </div>
  </div>
</template>

<script>
import TokenService from '@/common/token.service'

export default {
  name: 'player',
  data () {
    return {
      player: null,
      characters: null
    }
  },
  mounted () {
    const router = this.$router
    const data = this.$data
    const store = this.$store
    const globalState = this.$store.state.global

    if (!TokenService.hasToken()) {
      router.push({
        name: 'home'
      })
    }

    if (globalState.player) {
      data.player = globalState.player
    }

    if (globalState.characters) {
      data.characters = globalState.characters
    }

    store.watch(
      state => state.global.player,
      value => {
        data.player = value
      })

    store.watch(
      state => state.global.characters,
      value => {
        data.characters = value
      })
  },
  methods: {
    newCharacter () {
      const characterName = document.getElementById('newCharacter').value
      document.getElementById('newCharacter').value = ''
      this.$store.dispatch('createCharacter', {
        characterName,
        playerId: this.player.id
      })
    },
    deleteCharacter (characterId) {
      this.$store.dispatch('deleteCharacter', {
        characterId,
        playerId: this.player.id
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player-info {
  font-size:1.1em;
  text-decoration: underline;
}
.character-list {
  margin-top:10px;
}
.character-list-item{
  margin-top:5px;
  display:block;
}
.character-info {
  display:inline-block;
}
.character-link {
  min-width: 250px;
}
.new-character-input {
  min-width: 230px;
  margin-right: 6px;
}
</style>
