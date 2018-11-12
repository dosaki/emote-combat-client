<template>
  <footer>
    <div class="content">
      <div class="left">
        by <a href="https://github.com/dosaki/">Dosaki</a>
      </div>
      <div class="right">
        <a href="https://github.com/dosaki/emote-combat-client/issues">Report a problem</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'ec-Footer'
}
</script>

<style scoped>
.content {
  width: 1024px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}
.left,
.right {
  width:509px;
  display:inline-block;
}
.right{
  text-align: right;
}
</style>
