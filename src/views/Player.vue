<template>
  <div v-if="player()" :id="player().id">
    <div class="title">
      {{player().name}}'s characters
    </div>
    <div class="character-list">
      <div class="character-list-item"
          v-for="(character, index) in characters()"
          v-bind:key="index+'-'+character.id">
        <router-link class="character-info character-link"
          :to="{
            name: 'character',
            params: {
              characterId: character.id,
              playerId: player().id
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
  mounted () {
    const router = this.$router
    const store = this.$store

    if (TokenService.hasToken()) {
      store.dispatch('fetchSkills')
      store.dispatch('fetchPlayer', TokenService.getCurrentUser())
      router.push({
        name: 'player',
        params: {
          playerId: TokenService.getCurrentUser()
        }
      })
    } else {
      router.push({
        name: 'home'
      })
    }
  },
  methods: {
    newCharacter () {
      const characterName = document.getElementById('newCharacter').value
      document.getElementById('newCharacter').value = ''
      this.$store.dispatch('createCharacter', {
        characterName,
        playerId: this.$store.state.global.player.id
      })
    },
    deleteCharacter (characterId) {
      this.$store.dispatch('deleteCharacter', {
        characterId,
        playerId: this.$store.state.global.player.id
      })
    },
    player () {
      return this.$store.state.global.player
    },
    characters () {
      return this.$store.state.global.characters
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
