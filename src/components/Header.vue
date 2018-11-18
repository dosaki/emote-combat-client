<template>
  <nav class="navbar">
    <div class="content">
      <router-link class="brand"
        :to="{ name: 'home' }">
        <div class="top-out"><div class="top">RolePlay</div></div>
        <div class="bottom-out"><div class="bottom">EmoteCombat</div></div>
      </router-link>
      <ul class="nav-menu">

        <li class="nav-item">
          <router-link class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }">
            Home
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'allCharacters' }">
            All Characters
          </router-link>
        </li>

        <li v-if="gotToken()" class="nav-item">
          <a href="javascript:void(0)" v-on:click="logout()">
            Logout
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '@/common/api.service'
import TokenService from '@/common/token.service'

export default {
  name: 'ec-Header',
  methods: {
    gotToken () {
      return TokenService.hasToken()
    },
    logout () {
      AuthService.destroy()
        .finally(() => {
          TokenService.destroyToken()
          window.location.reload()
        })
    }
  }
}
</script>

<style scoped>
.content {
  width: 1024px;
  margin: 5px auto;
}
.brand{
  font-size: 3em;
  color: #e6cc00;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  display: inline-block;
  font-family: "lifecraftregular";
  text-decoration: none;
  text-align: center;
  width: 250px;
}
.brand .top-out,
.brand .bottom-out {
  border-radius: 20px;
  margin: 0 auto;
}
.brand .top-out {
  width: 200px;
  background: url('/static/images/map-top.png');
}
.brand .bottom-out {
  width: 250px;
  background: url('/static/images/map-bottom.png');
}
.brand .top,
.brand .bottom {
  border-radius: 20px;
  margin: 0 auto;
}
.brand .top {
  width: 200px;
  border-top:6px double #e6cc00;
  border-left:6px double #e6cc00;
  border-right:6px double #e6cc00;
  background: rgb(2,0,36);
  background: linear-gradient(180deg, rgba(2,0,36,0.65) 0%, rgba(9,9,121,0.65) 0%, rgba(0,50,165,0.65) 100%);
}
.brand .bottom {
  width: 250px;
  border-bottom:6px double #e6cc00;
  border-left:6px double #e6cc00;
  border-right:6px double #e6cc00;
  background: rgb(2,0,36);
  background: linear-gradient(0deg, rgba(2,0,36,0.65) 0%, rgba(9,9,121,0.65) 0%, rgba(0,50,165,0.65) 100%);

}
.nav-menu {
  float: right;
}

.nav-item {
  display: inline-block;
  padding-left:0.5em;
  padding-right:0.5em;
  border-left: 2px solid black;
}
.nav-item:first-child {
  border-left:0;
}
</style>
