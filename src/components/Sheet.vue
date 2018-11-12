<template>
  <div v-if="sheetEntries" class="parchment">
    <div class="sheet">
      <div class="general-skills">
        <ec-Skill class="general-skill"
          v-for="(skill, index) in skills.general"
          :key="'general'+index"
          :skillEntry="sheetEntries.find(entry => entry['skill_id'] === skill.id)"
          :skill="skill"
          :interactable="false">
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
          v-on:add-main-skill="addMainSkill"
          v-on:subtract-main-skill="subtractMainSkill"
          v-on:add-main-subskill="addMainSubskill"
          v-on:subtract-main-subskill="subtractMainSubskill">
        </ec-Skill>
        <div class="img-filler"><img src="/static/magic.png"/></div>
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
    characterId: { type: String, required: true },
    playerId: { type: String, required: true }
  },
  data () {
    return {
      skills: this.$store.state.global.skills,
      sheetEntries: this.$store.state.global.characterSheets[this.characterId],
      isDisabled: true
    }
  },
  components: {
    ecSkill
  },
  methods: {
    saveSheet () {
      this.$store.dispatch('saveModifiedSheetSkills', {
        sheetEntries: this.$store.state.global.characterSheets[this.characterId],
        characterId: this.characterId,
        playerId: this.playerId
      })
      this.$data.isDisabled = true
    },
    getStoreSkill (property, finder) {
      return this.$store.state.global.skills.general.find(skill => skill[property] === finder) ||
        this.$store.state.global.skills.main.find(skill => skill[property] === finder)
    },
    getStoreSheetEntry (property, finder) {
      return this.$store.state.global.characterSheets[this.characterId].find(skill => skill[property] === finder)
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
      if (experienceEntry.value - info.skill.cost >= 0 && (skillEntry.value + 1) <= info.max) {
        this.$store.dispatch('modifySheetSkill', {
          characterId: this.characterId,
          entryId: skillEntry.id,
          valueChange: 1
        })
        this.$store.dispatch('modifySheetSkill', {
          characterId: this.characterId,
          entryId: experienceEntry.id,
          valueChange: -info.skill.cost
        })
        this.$data.isDisabled = false
      }
    },
    subtractMainSkill (info) {
      const skillEntry = this.getStoreSheetEntry('id', info.skillEntry.id)
      const experience = this.getStoreSkill('name', 'Experience')
      const experienceEntry = this.getStoreSheetEntry('skill_id', experience.id)
      if (experienceEntry.value + info.skill.cost >= 0 && (skillEntry.value - 1) >= info.skill['starting_value']) {
        this.$store.dispatch('modifySheetSkill', {
          characterId: this.characterId,
          entryId: skillEntry.id,
          valueChange: -1
        })
        this.$store.dispatch('modifySheetSkill', {
          characterId: this.characterId,
          entryId: experienceEntry.id,
          valueChange: info.skill.cost
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
  background: url('/static/parchment.png');
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
