<template>
  <div class="c-teeter-totter">
    <div
      class="c-teeter-totter__upper-line"
      :style="{ transform: `rotate(${this.lineBendingPercentage}deg)` }"
    >
      <div class="c-teeter-totter__left-objects">
        <GameObject
          v-for="object in leftObjects"
          :key="object.id"
          :type="object.type"
          :weight="object.weight"
        ></GameObject>
      </div>
      <div class="c-teeter-totter__right-objects">
        <GameObject
          v-for="object in rightObjects"
          :key="object.id"
          :type="object.type"
          :weight="object.weight"
        ></GameObject>
      </div>
    </div>

    <div class="c-teeter-totter__bottom-point"></div>
  </div>
</template>

<script>
import GameObject from "./GameObject.vue";
const MAX_BENDING_PERCENTAGE = 30;
export default {
  name: "teeter-totter",
  components: { GameObject },
  methods: {},
  computed: {
    leftObjects: function() {
      return this.$store.state.leftSideObjects;
    },
    rightObjects: function() {
      return this.$store.state.rightSideObjects;
    },
    //found formula from net
    lineBendingPercentage: function() {
      let percentage = 0;

      if (!this.leftObjects) {
        return MAX_BENDING_PERCENTAGE / 2;
      } else {
        const left = this.$store.getters.leftSideSum;
        const right = this.$store.getters.rightSideSum;
        const subtraction = Math.abs(right - left);

        percentage =
          left > right
            ? (subtraction / left) * -50
            : (subtraction / right) * 50;
        if (percentage > MAX_BENDING_PERCENTAGE) {
          return MAX_BENDING_PERCENTAGE / 2;
        } else {
          return percentage / 2;
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.c-teeter-totter {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &__left-objects {
    display: flex;
    justify-content: space-between;
  }
  &__right-objects {
    margin-left: 100%;
  }
  &__upper-line {
    display: flex;
    width: 50%;
    background-color: #df8562;
    height: 5px;
  }
  &__bottom-point {
    width: 0;
    height: 0;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-bottom: 80px solid #9ba7b6;
  }
}
</style>
