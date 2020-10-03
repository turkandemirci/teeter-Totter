<template>
  <div class="c-game-content">
    right: {{ $store.getters.rightSideSum }} left:{{
      $store.getters.leftSideSum
    }}
    <div class="c-game-content__upper">
      <button
        class="c-game-content__upper-start-button"
        @click="triggerForAnimation"
      >
        Start Animate
      </button>
      <button class="c-game-content__upper-stop-button" @click="this.clear()">
        Stop Animate
      </button>
      <game-object
        v-for="object in leftUpperObjects"
        :key="object.id"
        :type="object.type"
        :weight="object.weight"
        id="animation-object"
      ></game-object>
    </div>
    <teeter-totter></teeter-totter>
  </div>
</template>

<script>
//let the game begins component
import TeeterTotter from "./TeeterTotter.vue";
import GameObject from "./GameObject.vue";
import { mapMutations } from "vuex";
export default {
  name: "game-content",
  components: {
    TeeterTotter,
    GameObject
  },
  computed: {
    leftUpperObjects: function() {
      return this.$store.state.leftSideUpperObjects;
    }
  },
  created() {
    this.$store.dispatch("startGame");
  },
  methods: {
    ...mapMutations([
      "addleftSideObjects",
      "deleteFromUppersObjects",
      "createObjectsList",
      "clear",
      "start"
    ]),

    triggerForAnimation() {
      if (this.$store.state.isClear && this.$store.state.isClear === "true") {
        this.start();
      }
      const object = this.leftUpperObjects[0];
      var elem = document.getElementById("animation-object");
      var pos = 0;
      var id = setInterval(() => {
        if (pos == 390) {
          clearInterval(id);
          this.addleftSideObjects(object);
          this.deleteFromUppersObjects();
          this.createObjectsList(false);
          this.createObjectsList(true);
          this.triggerForAnimation();
        } else {
          pos++;
          if (elem) {
            elem.style.top = pos + "px";
          }
        }
      }, 10);
    }
  }
};
</script>

<style scoped lang="scss">
.c-game-content {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__upper {
    position: relative;
    flex: 1 1 50%;
    margin-bottom: 420px;
    left: 30%;
    &-start-button {
      margin-left: 50px;
      border: transparent;
      height: 40px;
      background-color: #33a7b6;
    }
    &-stop-button {
      margin-left: 40px;
      height: 40px;
      border: transparent;
      background-color: #0195d2;
    }
  }
}
</style>
