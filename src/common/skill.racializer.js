export const Racialize = {
  'light': (race, description) => {
    // A Human wouldn't worship the Light, right?
    if (race === 'Night Elf') {
      return description.replace(/\[\[LIGHT\]\]/, 'Light of Elune')
        .replace(/\[\[LIGHT_PRONOUN\]\]/, 'her')
    }
    if (race === 'Tauren') {
      return description.replace(/\[\[LIGHT\]\]/, 'Sun')
        .replace(/\[\[LIGHT_PRONOUN\]\]/, 'its')
    }
    // Default to the Holy Light
    return description.replace(/\[\[LIGHT\]\]/, 'Holy Light')
      .replace(/\[\[LIGHT_PRONOUN\]\]/, 'its')
  },
  'druidic': (race, description) => {
    if (race === 'worgen' || race === 'gilnean') {
      return description.replace(/\[\[DRUID_CLASS\]\]/, 'harvest-witches')
    }
    return description.replace(/\[\[DRUID_CLASS\]\]/, 'druids')
  }
}
