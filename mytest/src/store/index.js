import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mydata: {}
  },
  mutations: {
    changevuexdata(state, val) {
      state.mydata = val;
    }
  },
  actions: {},
  modules: {}
});
