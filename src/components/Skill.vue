<template>
  <div v-if="skill" :class="skill.name.toLowerCase()">
    <div v-if="['Experience', 'Health'].includes(skill.name)" class="skill metered-skill">
      <div class="meter">
        <span class="bar" :style="`width: ${valuePercentage(skill.name, skillEntry.value)}%`">{{skill.name}} {{skillEntry.value}}</span>
      </div>
      <span class="item button"><button class="btn-borderless" v-if="interactable" v-on:click="$emit('add-main-skill', {skill, skillEntry, max:5})">+</button></span>
      <span class="item button"><button class="btn-borderless" v-if="interactable" v-on:click="$emit('subtract-main-skill', {skill, skillEntry})">-</button></span>
    </div>
    <div v-else class="skill">
      <span class="item name">{{skill.name}}</span>
      <span class="item value">{{skillEntry.value}}</span>
      <span class="item button"><button class="btn-borderless" v-if="interactable" v-on:click="$emit('add-main-skill', {skill, skillEntry, max:6})">+</button></span>
      <span class="item button"><button class="btn-borderless" v-if="interactable" v-on:click="$emit('subtract-main-skill', {skill, skillEntry})">-</button></span>
    </div>
    <div class="subskill-group" v-if="skill.children &&  skill.children.length > 0">
      <div class="subskill" v-for="(subskill, index) in skill.children"
          :key="'subskill'+subskill.id+'-'+index">
        <span class="item name">{{subskill.name}}</span>
        <span class="item value">{{subskillEntries.find(s=>s['skill_id'] === subskill.id).value}}</span>
        <span class="item button"><button class="btn-borderless" v-if="interactable" v-on:click="$emit('add-main-subskill', {subskill, subskillEntries, max:skillEntry.value/2})">+</button></span>
        <span class="item button"><button class="btn-borderless" v-if="interactable" v-on:click="$emit('subtract-main-subskill', {subskill, subskillEntries})">-</button></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ec-Skill',
  props: {
    skill: {type: Object, required: false},
    skillEntry: {type: Object, required: false},
    subskillEntries: {type: Array, required: false},
    interactable: {type: Boolean, required: true}
  },
  methods: {
    valuePercentage (skillName, value) {
      return Math.max(((skillName === 'Health' ? value / 5 : Math.min(94, value) / 94) * 100) - 4, 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.skill,
.subskill {
  height:24px;
}
.skill {
  margin-top: 5px;
}
.metered-skill {
  margin-bottom: 15px;
}
.subskill-group {
  display:inline-block;
  margin-left: 20px;
}
.subskill {
  display:inline-block;
}
.item {
  display:inline-block;
}
.skill .name {
  min-width: 140px;
}
.subskill-group .name {
  min-width: 120px;
}
.value {
  min-width: 20px;
}
.button {
  min-width: 10px;
}
.skill {
  background: linear-gradient(to left, transparent, #ffffff26, transparent);
  font-weight: bold;
}
.agility {
  background: rgba(67, 100, 67, 0.6);
  -webkit-box-shadow: 0px 0px 15px 5px rgba(67, 100, 67,0.75);
  -moz-box-shadow: 0px 0px 15px 5px rgba(67, 100, 67,0.75);
  box-shadow: 0px 0px 15px 5px rgba(67, 100, 67,0.75);
}
.agility .skill {
  background: linear-gradient(to left, transparent,rgba(67, 120, 67, 0.95), transparent);
}
.agility .subskill:nth-child(even) {
  background: linear-gradient(to left, transparent,rgba(67, 100, 67, 0.9), transparent);
}
.might {
  background: rgba(100, 67, 67, 0.6);
  -webkit-box-shadow: 0px 0px 15px 5px rgba(100, 67, 67,0.75);
  -moz-box-shadow: 0px 0px 15px 5px rgba(100, 67, 67,0.75);
  box-shadow: 0px 0px 15px 5px rgba(100, 67, 67,0.75);
}
.might .skill {
  background: linear-gradient(to left, transparent,rgba(120, 67, 67, 0.95), transparent);
}
.might .subskill:nth-child(even) {
  background: linear-gradient(to left, transparent,rgba(100, 67, 67, 0.9), transparent);
}
.presence {
  background: rgba(97, 100, 67, 0.6);
  -webkit-box-shadow: 0px 0px 15px 5px rgba(97, 100, 67,0.75);
  -moz-box-shadow: 0px 0px 15px 5px rgba(97, 100, 67,0.75);
  box-shadow: 0px 0px 15px 5px rgba(97, 100, 67,0.75);
}
.presence .skill {
  background: linear-gradient(to left, transparent,rgba(117, 120, 67, 0.95), transparent);
}
.presence .subskill:nth-child(even) {
  background: linear-gradient(to left, transparent,rgba(97, 100, 67, 0.9), transparent);
}
.brains {
  background: rgba(80, 67, 100, 0.6);
  -webkit-box-shadow: 0px 0px 15px 5px rgba(80, 67, 100,0.75);
  -moz-box-shadow: 0px 0px 15px 5px rgba(80, 67, 100,0.75);
  box-shadow: 0px 0px 15px 5px rgba(80, 67, 100,0.75);
}
.brains .skill {
  background: linear-gradient(to left, transparent,rgba(80, 68, 120, 0.95), transparent);
}
.brains .subskill:nth-child(even) {
  background: linear-gradient(to left, transparent,rgba(80, 67, 100, 0.9), transparent);
}
.magic {
  background: rgba(67, 81, 100, 0.6);
  -webkit-box-shadow: 0px 0px 15px 5px rgba(67, 81, 100,0.75);
  -moz-box-shadow: 0px 0px 15px 5px rgba(67, 81, 100,0.75);
  box-shadow: 0px 0px 15px 5px rgba(67, 81, 100,0.75);
}
.magic .skill {
  background: linear-gradient(to left, transparent,rgba(67, 81, 120, 0.95), transparent);
}
.magic .subskill:nth-child(even) {
  background: linear-gradient(to left, transparent,rgba(67, 81, 100, 0.9), transparent);
}
.meter {
  height: 20px;
  width: 450px;
  position: relative;
  background: #555;
  -moz-border-radius: 25px;
  -webkit-border-radius: 25px;
  border-radius: 25px;
  padding: 6px;
  box-shadow: inset 0 -1px 1px rgba(255,255,255,0.3);
  display: inline-block;
}
.meter > .bar {
  display: block;
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  box-shadow:
    inset 0 2px 9px  rgba(255,255,255,0.3),
    inset 0 -2px 6px rgba(0,0,0,0.4);
  position: relative;
  overflow: visible;
  white-space: nowrap;
  padding-left:15px;
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.experience .meter > .bar {
  background-color: rgb(150, 43, 194);
  background-image: linear-gradient(
    center bottom,
    rgb(150, 43, 194) 37%,
    rgb(214, 84, 240) 69%);
}
.health .meter > .bar {
  background-color: rgb(43,194,83);
  background-image: linear-gradient(
  center bottom,
  rgb(43,194,83) 37%,
  rgb(84,240,84) 69%);
}
</style>
