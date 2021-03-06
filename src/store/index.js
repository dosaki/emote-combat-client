import Vue from 'vue'
import Vuex from 'vuex'

import global from './global.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    global
  }
})
