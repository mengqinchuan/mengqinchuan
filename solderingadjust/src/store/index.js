import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    soldernum:[]
  },
  mutations: {
    getnum(state,mydata){
      state.soldernum=mydata
    }
  },
  actions: {},
  modules: {}
});
