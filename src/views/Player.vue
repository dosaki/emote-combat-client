<template>
  <div v-if="player" :id="player.id">
    <div class="title">
      {{player.name}}'s characters
    </div>
    <div class="character-list">
      <div class="character-list-item"
          v-for="(character, index) in characters"
          v-bind:key="index+'-'+character.id">
        <img class="race-portrait" :src="getRaceIcon(character)" />
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
        <select id="genderSelect">
          <option value="">Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
        <select id="raceSelect">
          <option value="">Race</option>
          <option value="Dark Iron Dwarf">Dark Iron Dwarf</option>
          <option value="Draenei">Draenei</option>
          <option value="Dwarf">Dwarf</option>
          <option value="Gnome">Gnome</option>
          <option value="Human">Human</option>
          <option value="Kul Tiran">Kul Tiran</option>
          <option value="Lightforged Draenei">Lightforged Draenei</option>
          <option value="Night Elf">Night Elf</option>
          <option value="Void Elf">Void Elf</option>
          <option value="Worgen">Worgen</option>
          <option value="Pandaren">Pandaren</option>
          <option value="Blood Elf">Blood Elf</option>
          <option value="Goblin">Goblin</option>
          <option value="Highmountain Tauren">Highmountain Tauren</option>
          <option value="Mag'har Orc">Mag'har Orc</option>
          <option value="Nightborne">Nightborne</option>
          <option value="Orc">Orc</option>
          <option value="Tauren">Tauren</option>
          <option value="Troll">Troll</option>
          <option value="Forsaken">Forsaken</option>
        </select>
        <input class="new-character-input" id="newCharacter" type="text" placeholder="New Character Name"/>
        <button v-on:click="newCharacter" class="btn create-character">+</button>
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
      const characterGender = document.getElementById('genderSelect').value
      const characterRace = document.getElementById('raceSelect').value
      document.getElementById('newCharacter').value = ''
      this.$store.dispatch('createCharacter', {
        characterName,
        characterGender,
        characterRace,
        playerId: this.player.id
      })
    },
    deleteCharacter (characterId) {
      this.$store.dispatch('deleteCharacter', {
        characterId,
        playerId: this.player.id
      })
    },
    getRaceIcon (character) {
      return `/static/images/races/${character.race.replace(/[\s']/g, '').toLowerCase()}_${character.gender.toLowerCase()}.jpg`
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
  min-width: 215px;
  margin-bottom: 10px;
}
.race-portrait {
  margin-bottom: -10px;
}
.new-character-input {
  min-width: 230px;
  margin-right: 6px;
}
.create-character {
  padding: 3px 6px;
}
</style>
