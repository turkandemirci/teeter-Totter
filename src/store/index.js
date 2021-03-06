import { createStore } from "vuex";
//store
import {
  OBJECT_MIN_WEIGHT,
  OBJECT_MAX_WEIGHT,
  OBJECT_TYPES,
} from "@/constant-values/";
export const store = createStore({
  state: {
    leftSideObjects: [],
    rightSideObjects: [],
    leftSideUpperObjects: [],
    isClear: false,
  },

  getters: {
    leftSideSum(state) {
      let total = 0;
      state.leftSideObjects.forEach((item) => {
        total += item.weight;
      });
      return total;
    },
    rightSideSum(state) {
      let total = 0;
      state.rightSideObjects.forEach((item) => {
        total += item.weight;
      });
      return total;
    },
  },
  actions: {
    startGame({ commit }) {
      commit("createObjectsList", true);
      commit("createObjectsList", false);
    },
  },
  mutations: {
    //using mutations to modify state
    createObjectsList({ rightSideObjects, leftSideUpperObjects }, isRightSide) {
      var randomIndex = Math.floor(Math.random() * OBJECT_TYPES.length);
      const weight =
        OBJECT_MIN_WEIGHT + Math.round(Math.random() * OBJECT_MAX_WEIGHT - 1);
      const type = OBJECT_TYPES[randomIndex];

      const object = { weight, type };

      if (isRightSide) {
        rightSideObjects.push(object);
      } else {
        leftSideUpperObjects.push(object);
      }
    },
    addleftSideObjects(state, object) {
      state.leftSideObjects.push(object);
    },
    deleteFromUppersObjects(state) {
      state.leftSideUpperObjects.pop();
    },
    clear(state) {
      state.isClear = true;
      state.leftSideObjects = [];
      state.rightSideObjects = [];
      state.leftSideUpperObjects = [];
    },
    start(state) {
      this.startGame();
      state.isClear = false;
    },
  },
});

export default store;
