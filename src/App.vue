<template>
  <div id="app">
    <game-content></game-content>
  </div>
</template>
<script>
import GameContent from "./components/GameContent.vue";

export default {
  components: {
    GameContent,
  },
};
</script>
<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
}

html {
  overflow-y: auto !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
