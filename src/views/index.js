import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: () => import('@/views/Home')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register')
  },
  {
    path: '/player/:playerId',
    name: 'player',
    component: () => import('@/views/Player')
  },
  {
    path: '/player/:playerId/character/:characterId',
    name: 'character',
    component: () => import('@/views/Character')
  },
  {
    path: '/characters',
    name: 'allCharacters',
    component: () => import('@/views/Characters')
  },
  {
    path: '/character/:characterId',
    name: 'publicCharacter',
    component: () => import('@/views/PublicCharacter')
  }]
})
