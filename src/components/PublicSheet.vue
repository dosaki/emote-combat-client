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
          :interactable="false">
        </ec-Skill>
        <div class="img-filler"><img src="/static/magic.png"/></div>
      </div>
    </div>
  </div>
</template>

<script>
import ecSkill from '@/components/Skill'
export default {
  name: 'ec-pubSheet',
  props: {
    sheetEntries: { type: Array, required: true }
  },
  data () {
    return {
      skills: this.$store.state.global.skills
    }
  },
  components: {
    ecSkill
  },
  methods: {
    getStoreSkill (property, finder) {
      return this.$store.state.global.skills.general.find(skill => skill[property] === finder) ||
        this.$store.state.global.skills.main.find(skill => skill[property] === finder)
    },
    getStoreSheetEntry (property, finder) {
      return this.sheetEntries.find(skill => skill[property] === finder)
    }
  },
  mounted () {
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
.img-filler {
  display: inline-block;
  width:230px;
}
.img-filler > img {
  width:100%;
  opacity: 0.3;
}
</style>
