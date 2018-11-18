#!/bin/bash

FAILED=""

function download() {
  IMG="$1"
  RENAMED="$2"
  wget https://wow.zamimg.com/images/wow/icons/large/${IMG}
  if [[ $? -eq 0 ]]; then
    mv ${IMG} ${RENAMED}
  else
    FAILED="$FAILED
${IMG}"
  fi
}

download race_darkirondwarf_male.jpg darkirondwarf_male.jpg
download race_draenei_male.jpg draenei_male.jpg
download race_dwarf_male.jpg dwarf_male.jpg
download race_gnome_male.jpg gnome_male.jpg
download race_human_male.jpg human_male.jpg
download race_kultiran_male.jpg kultiran_male.jpg
download race_lightforgeddraenei_male.jpg lightforgeddraenei_male.jpg
download race_nightelf_male.jpg nightelf_male.jpg
download race_voidelf_male.jpg voidelf_male.jpg
download race_worgen_male.jpg worgen_male.jpg
download race_pandaren_male.jpg pandaren_male.jpg
download race_bloodelf_male.jpg bloodelf_male.jpg
download race_goblin_male.jpg goblin_male.jpg
download race_highmountaintauren_male.jpg highmountaintauren_male.jpg
download race_magharorc_male.jpg magharorc_male.jpg
download race_nightborne_male.jpg nightborne_male.jpg
download race_orc_male.jpg orc_male.jpg
download race_tauren_male.jpg tauren_male.jpg
download race_troll_male.jpg troll_male.jpg
download race_scourge_male.jpg forsaken_male.jpg
download race_darkirondwarf_female.jpg darkirondwarf_female.jpg
download race_draenei_female.jpg draenei_female.jpg
download race_dwarf_female.jpg dwarf_female.jpg
download race_gnome_female.jpg gnome_female.jpg
download race_human_female.jpg human_female.jpg
download race_kultiran_female.jpg kultiran_female.jpg
download race_lightforgeddraenei_female.jpg lightforgeddraenei_female.jpg
download race_nightelf_female.jpg nightelf_female.jpg
download race_voidelf_female.jpg voidelf_female.jpg
download race_worgen_female.jpg worgen_female.jpg
download race_pandaren_female.jpg pandaren_female.jpg
download race_bloodelf_female.jpg bloodelf_female.jpg
download race_goblin_female.jpg goblin_female.jpg
download race_highmountaintauren_female.jpg highmountaintauren_female.jpg
download race_magharorc_female.jpg magharorc_female.jpg
download race_nightborne_female.jpg nightborne_female.jpg
download race_orc_female.jpg orc_female.jpg
download race_tauren_female.jpg tauren_female.jpg
download race_troll_female.jpg troll_female.jpg
download race_scourge_female.jpg forsaken_female.jpg

echo "Failed downloads:"
echo "$FAILED"
