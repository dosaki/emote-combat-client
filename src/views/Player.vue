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
        <span class="character-info character-delete"><button class="btn" v-on:click="deleteCharacter(character.id)">-</button></span>
      </div>
      <div class="character-list-item ">
        <div class="character-creation-form-item">
          <span class="info">Server:</span>
          <select id="serverLocationSelect" @change="onSelectLocation()" class="first">
            <option v-for="(serverLocation, index) in Object.keys(servers)"
                v-bind:key="`serverLocation${index}`"
                :value="serverLocation">
              {{serverLocation}}
            </option>
          </select>
          <select id="serverSelect" class="second">
            <option v-for="(server, index) in getServerList()"
                v-bind:key="`server${index}`"
                :value="server">
              {{server}}
            </option>
          </select>
        </div>
        <div class="character-creation-form-item">
          <span class="info">Race:</span>
          <select id="raceSelect" class="first">
            <option v-for="(race, index) in races"
                v-bind:key="`race${index}`"
                :value="race">
              {{race}}
            </option>
          </select>
          <select id="genderSelect" class="second">
            <option value="">Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
        <div class="character-creation-form-item">
          <span class="info">Name: </span>
          <input class="new-character-input" id="newCharacter" type="text" placeholder="New Character Name"/>
          <i class="fas fa-question-circle" title="This should be the roleplay name of your character"></i>
        </div>
        <div class="character-creation-form-item">
          <span class="info"></span>
          <input class="new-ingame-character-input" id="newIngameCharacter" type="text" placeholder="Ingame Character Name"/>
          <i class="fas fa-question-circle"
            title="This should be the ingame name of your WoW character spelled exactly as it shows on your character list"></i>
        </div>
        <div class="character-creation-form-item">
          <button v-on:click="newCharacter" class="btn create-character">Create Character</button>
        </div>
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
      characters: null,
      races: [
        'Race',
        'Dark Iron Dwarf',
        'Draenei',
        'Dwarf',
        'Gnome',
        'Human',
        'Kul Tiran',
        'Lightforged Draenei',
        'Night Elf',
        'Void Elf',
        'Worgen',
        'Pandaren',
        'Blood Elf',
        'Goblin',
        'Highmountain Tauren',
        'Mag\'har Orc',
        'Nightborne',
        'Orc',
        'Tauren',
        'Troll',
        'Forsaken',
        'Zandalari Troll'],
      selectedLocation: 'Region',
      servers: {
        'Region': ['Roleplay Server'],
        'US Pacific': [
          'Blackwater Raiders',
          'Cenarion Circle',
          'Feathermoon',
          'Sentinels',
          'Silver Hand',
          'The Scryers',
          'Wyrmrest Accord',
          'The Venture Co'],
        'US Mountain': [
          'Shadow Council'],
        'US Central': [
          'Farstriders',
          'Kirin Tor',
          'Moon Guard',
          'Scarlet Crusade',
          'Sisters of Elune',
          'Thorium Brotherhood',
          'Emerald Dream',
          'Lightninghoof',
          'Maelstrom',
          'Twisting Nether'],
        'US Eastern': [
          'Argent Dawn',
          'Earthen Ring',
          'Steamwheedle Cartel',
          'Ravenholdt'],
        'Europe (English)': [
          'Argent Dawn',
          'Darkmoon Faire',
          'Earthen Ring',
          'Moonglade',
          'Steamwheedle Cartel',
          'The Sha\'tar',
          'Defias Brotherhood',
          'Ravenholdt',
          'Scarshield Legion',
          'Sporeggar',
          'The Venture Co EU'],
        'Europe (French)': [
          'Confrérie du Thorium',
          'Kirin Tor',
          'Les Clairvoyants',
          'Les Sentinelles',
          'Conseil des Ombres',
          'Culte de la Rive Noire',
          'La Croisade écarlate'],
        'Europe (German)': [
          'Der Mithrilorden',
          'Der Rat von Dalaran',
          'Die Aldor',
          'Die ewige Wacht',
          'Die Nachtwache',
          'Die Silberne Hand',
          'Forscherliga',
          'Todeswache',
          'Zirkel des Cenarius',
          'Das Konsortium',
          'Das Syndikat',
          'Der abyssische Rat',
          'Die Arguswacht',
          'Die Todeskrallen',
          'Kult der Verdammten'],
        'Europe (Spanish)': [
          'Los Errantes',
          'Shen\'dralar'],
        'China (Battlegroup 10)': [
          '金色平原 (The Golden Plains)']
      }
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
    getServerList () {
      return this.servers[this.selectedLocation]
    },
    onSelectLocation () {
      this.selectedLocation = document.getElementById('serverLocationSelect').value
    },
    newCharacter () {
      const characterName = document.getElementById('newCharacter').value
      const characterGender = document.getElementById('genderSelect').value
      const characterRace = document.getElementById('raceSelect').value
      const characterIngameName = document.getElementById('newIngameCharacter').value
      const characterServer = this.selectedLocation + document.getElementById('serverSelect').value
      document.getElementById('newCharacter').value = ''
      this.$store.dispatch('createCharacter', {
        characterName,
        characterGender,
        characterRace,
        characterIngameName,
        characterServer,
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
}
.character-creation-form-item {
  margin-top:2px;
  margin-bottom:2px;
}
.character-creation-form-item .info {
  display: inline-block;
  width: 60px;
}
.character-creation-form-item select.first {
  width:173px;
}
.character-creation-form-item select.second {
  width:133px;
}
.character-creation-form-item input {
  width:293px;
}
.create-character {
  margin-top:5px;
  padding: 3px 6px;
}
</style>
