<template>
  <div class="c-game-content">
    <div class="c-game-content__upper">
      <button @click="triggerForAnimation">Start Animate</button>
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
    GameObject,
  },
  computed: {
    leftUpperObjects: function () {
      return this.$store.state.leftSideUpperObjects;
    },
  },
  created() {
    this.$store.dispatch("startGame");
  },
  methods: {
    ...mapMutations([
      "addleftSideObjects",
      "deleteFromUppersObjects",
      "createObjectsList",
    ]),

    triggerForAnimation() {
      const object = this.leftUpperObjects[0];
      var elem = document.getElementById("animation-object");
      var pos = 0;
      var id = setInterval(() => {
        if (pos == 490) {
          clearInterval(id);
          this.addleftSideObjects(object);
          this.deleteFromUppersObjects();
          this.createObjectsList(false);
          this.createObjectsList(true);
          this.triggerForAnimation();
        } else {
          pos++;
          elem.style.top = pos + "px";
        }
      }, 10);
    },
  },
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
    margin-bottom: 500px;
    left: 30%;
  }
}
</style>
