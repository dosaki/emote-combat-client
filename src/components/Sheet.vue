<template>
  <div v-if="sheetEntries" class="parchment">
    <div class="sheet">
      <div class="general-skills">
        <ec-Skill class="general-skill"
          :skillEntry="experience()"
          :skill="getStoreSkill('name', 'Experience')"
          :subtract="calculateTotalCost()"
          :interactable="false">
        </ec-Skill>
        <ec-Skill class="general-skill"
          :skillEntry="health()"
          :skill="getStoreSkill('name', 'Health')"
          :interactable="true"
          v-on:add-main-skill="addMainSkill"
          v-on:subtract-main-skill="subtractMainSkill">
        </ec-Skill>
      </div>
      <div class="other-skills">
        <ec-Skill class="main-skill"
          v-for="(skill, index) in skills.main"
          :key="'main'+index"
          :skillEntry="sheetEntries.find(entry => entry['skill_id'] === skill.id)"
          :subskillEntries="sheetEntries.filter(entry => skill.children.map(subskill => subskill.id).includes(entry['skill_id']))"
          :skill="skill"
          :interactable="true"
          :characterRace="character.race"
          :gender="character.gender"
          v-on:add-main-skill="addMainSkill"
          v-on:subtract-main-skill="subtractMainSkill"
          v-on:add-main-subskill="addMainSubskill"
          v-on:subtract-main-subskill="subtractMainSubskill">
        </ec-Skill>
        <div class="img-filler"><img src="/static/images/magic.png"/></div>
        <div><button class="btn save-btn" :disabled="isDisabled" v-on:click="saveSheet">Save</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import ecSkill from '@/components/Skill'
export default {
  name: 'ec-Sheet',
  props: {
    character: { type: Object, required: true },
    playerId: { type: String, required: true }
  },
  data () {
    return {
      skills: null,
      sheetEntries: null,
      isDisabled: true
    }
  },
  beforeMount () {
    const store = this.$store
    const data = this.$data
    const globalState = store.state.global
    const characterId = (this.character || {}).id

    if (globalState.skills && Object.keys(globalState.skills).length > 0) {
      data.skills = globalState.skills
    }

    if (globalState.characterSheets && globalState.characterSheets[characterId] && globalState.characterSheets[characterId].length > 0) {
      data.sheetEntries = globalState.characterSheets[characterId]
    }
    store.watch(
      state => state.global.skills,
      value => {
        data.skills = globalState.skills
      })
    store.watch(
      state => state.global.characterSheets,
      value => {
        data.sheetEntries = globalState.characterSheets[characterId]
      })
  },
  components: {
    ecSkill
  },
  methods: {
    experience () {
      const skill = this.getStoreSkill('name', 'Experience')
      return this.sheetEntries.find(entry => entry['skill_id'] === skill.id)
    },
    health () {
      const skill = this.getStoreSkill('name', 'Health')
      return this.sheetEntries.find(entry => entry['skill_id'] === skill.id)
    },
    calculateTotalCost() {
      const totalCost = this.sheetEntries.map((entry) => {
        const skill = this.getStoreSkill('id', entry['skill_id']) || this.getStoreSubskill('id', entry['skill_id'])
        return entry["value"] * skill.cost
      })
      .reduce((val, total)=>{
        return total+val
      }, 0)
      return totalCost
    },
    saveSheet () {
      this.$store.dispatch('saveModifiedSheetSkills', {
        sheetEntries: this.$store.state.global.characterSheets[this.character.id],
        characterId: this.character.id,
        playerId: this.playerId
      })
      this.$data.isDisabled = true
    },
    getStoreSkill (property, finder) {
      return this.$store.state.global.skills.general.find(skill => skill[property] === finder) ||
        this.$store.state.global.skills.main.find(skill => skill[property] === finder)
    },
    getStoreSubskill (property, finder) {
      let returnable = null
        this.$store.state.global.skills.main.forEach((skill) => {
          const subskill = skill.children.find(skill => skill[property] === finder)
          if(subskill){
            returnable = subskill
          }
        })
        return returnable
    },
    getStoreSheetEntry (property, finder) {
      return this.$store.state.global.characterSheets[this.character.id].find(skill => skill[property] === finder)
    },
    addMainSubskill (info) {
      const skillEntry = info.subskillEntries.find(e => e['skill_id'] === info.subskill.id)
      this.addMainSkill({
        skill: info.subskill,
        skillEntry,
        max: info.max
      })
    },
    subtractMainSubskill (info) {
      const skillEntry = info.subskillEntries.find(e => e['skill_id'] === info.subskill.id)
      this.subtractMainSkill({
        skill: info.subskill,
        skillEntry
      })
    },
    addMainSkill (info) {
      const skillEntry = this.getStoreSheetEntry('id', info.skillEntry.id)
      const experience = this.getStoreSkill('name', 'Experience')
      const experienceEntry = this.getStoreSheetEntry('skill_id', experience.id)
      const exp = experienceEntry.value - (this.calculateTotalCost()||0)
      if (exp - info.skill.cost >= 0 && (skillEntry.value + 1) <= info.max) {
        this.$store.dispatch('modifySheetSkill', {
          characterId: this.character.id,
          entryId: skillEntry.id,
          valueChange: 1
        })
        this.$data.isDisabled = false
      }
    },
    subtractMainSkill (info) {
      const skillEntry = this.getStoreSheetEntry('id', info.skillEntry.id)
      const experience = this.getStoreSkill('name', 'Experience')
      const experienceEntry = this.getStoreSheetEntry('skill_id', experience.id)
      const minValue = info.skill.name === 'Health' ? 0 : info.skill['starting_value']
      const exp = experienceEntry.value - (this.calculateTotalCost()||0)
      if (exp + info.skill.cost >= 0 && (skillEntry.value - 1) >= minValue) {
        this.$store.dispatch('modifySheetSkill', {
          characterId: this.character.id,
          entryId: skillEntry.id,
          valueChange: -1
        })
        this.$data.isDisabled = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.parchment {
  width: 550px;
  background: url('/static/images/parchment.png');
  border-radius: 10px;
}
.sheet {
  color: #e6cc00;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  width: 500px;
  padding: 20px;
  border: 6px double #797979;
  border-radius: 10px;
  background-color:#000000d2;
}
.general-skills {
  margin-bottom: 25px;
}
.main-skill {
  display:inline-block;
  width: 210px;
  margin: 15px 10px;
  padding: 10px;
}
.save-btn {
  width: 100%;
  margin-top: 20px;
}
.img-filler {
  display: inline-block;
  width:230px;
}
.img-filler > img {
  width:100%;
  opacity: 0.3;
}
</style>
