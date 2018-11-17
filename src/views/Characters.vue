<template>
  <div>
    <input type="text" v-model="searchTerm" placeholder="Search for a character">
    <div class="character-list">
      <div class="character-list-item"
          v-for="(character, index) in allCharacters"
          v-bind:key="index+'-'+character.id">
        <router-link class="character-info character-link"
          :to="{
            name: 'publicCharacter',
            params: {
              characterId: character.id
            }
          }">
          {{character.name}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'allCharacters',
  data () {
    return {
      searchTerm: '',
      allCharacters: []
    }
  },
  mounted () {
    const store = this.$store
    const data = this.$data
    store.dispatch('fetchAllCharacters')
    store.dispatch('fetchSkills')
    if (store.state.global.allCharacters) {
      store.state.global.allCharacters.forEach((character) => {
        store.dispatch('fetchCharacterSheet', {
          characterId: character.id
        })
      })
    }

    store.watch(
      state => state.global.allCharacters,
      value => {
        store.state.global.allCharacters.forEach((character) => {
          store.dispatch('fetchCharacterSheet', {
            characterId: character.id
          })
        })
        data.allCharacters = store.state.global.allCharacters
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
