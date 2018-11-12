<template>
  <div>
    <div class="login-box">
      <input id="loginEmail" type="text" placeholder="your@email.com" v-on:keypress="checkDoLogin"/>
      <input id="loginPassword" type="password" placeholder="Password" v-on:keypress="checkDoLogin"/>
      <div v-if="error" class="error">{{error}}</div>
      <button class="btn" v-on:click="doLogin">Login</button>
      or
      <router-link
        :to="{ name:'register' }">
        Register
      </router-link>
    </div>
  </div>
</template>

<script>
import { AuthService } from '@/common/api.service'
import TokenService from '@/common/token.service'
export default {
  name: 'home',
  data () {
    return {
      error: null,
      player: this.$store.state.global.player
    }
  },
  mounted () {
    if (TokenService.hasToken()) {
      this.$router.push({
        name: 'player',
        params: {
          playerId: TokenService.getCurrentUser()
        }
      })
    }
  },
  methods: {
    doLogin () {
      const self = this
      const email = document.getElementById('loginEmail').value
      const password = document.getElementById('loginPassword').value
      AuthService.create({
        email,
        password
      })
        .then(({ data }) => {
          TokenService.saveToken(data.token, data.expiresAt, data.playerId)
          window.location.reload()
        })
        .catch(error => {
          self.$data.error = 'Invalid Username or Password'
          throw new Error(error)
        })
    },
    checkDoLogin (e) {
      if (e.key === 'Enter') {
        this.doLogin()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-box {
  padding: 20px;
  width: 200px;
  margin: 0 auto;
  text-align: center;
}
.login-box > * {
  margin: 5px 0;
}
</style>
