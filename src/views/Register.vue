<template>
  <div>
    <div class="register-box">
      <input id="registerEmail" type="text" placeholder="your@email.com" v-on:keypress="checkDoRegister"/>
      <input id="registerName" type="text" placeholder="Your Name" v-on:keypress="checkDoRegister"/>
      <input id="registerPassword" type="password" placeholder="Password" v-on:keypress="checkDoRegister"/>
      <input id="registerConfirmPassword" type="password" placeholder="Confirm Password" v-on:keypress="checkDoRegister"/>
      <div v-if="error" class="error">{{error}}</div>
      <button class="btn" v-on:click="doRegister">Register</button>
    </div>
  </div>
</template>

<script>
import { PlayerService } from '@/common/api.service'

export default {
  name: 'register',
  data () {
    return {
      error: null
    }
  },
  methods: {
    doRegister () {
      const self = this

      const email = document.getElementById('registerEmail').value
      const name = document.getElementById('registerName').value
      const password = document.getElementById('registerPassword').value
      const confirmPassword = document.getElementById('registerConfirmPassword').value

      PlayerService.create({
        email,
        name,
        password,
        confirmPassword
      })
        .then(({ data }) => {
          self.$router.push({
            name: 'home'
          })
        })
        .catch(error => {
          self.$data.error = 'Unable to register user. All fields must be filled.'
          throw new Error(error)
        })
    },
    checkDoRegister (e) {
      if (e.key === 'Enter') {
        this.doRegister()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register-box {
  padding: 20px;
  width: 200px;
  margin: 0 auto;
  text-align: center;
}
.register-box > * {
  margin: 5px 0;
}
</style>
