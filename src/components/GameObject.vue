<template>
  <div class="c-game-object" :class="{ ['c-game-object--' + type]: type }">
    <div class="c-game-object__text">{{ weight }} kg</div>
  </div>
</template>

<script>
export default {
  name: "game-object",
  components: {},
  props: ["type", "weight"],
  methods: {},
  computed: {},
};
</script>

<style scoped lang="scss">
.c-game-object {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;

  &__text {
    font-size: 8px;
  }
  &--square {
    width: 30px;
    height: 30px;
    background-color: #c160a3;
  }
  &--circle {
    width: 30px;
    height: 30px;
    border-radius: 90%;
    background-color: #33a7b6;
  }

  &--triangle {
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 40px solid #6d9876;

    .c-game-object__text {
      position: absolute;
      top: 20px;
      text-align: center;
      display: flex;
    }
  }
}
</style>
