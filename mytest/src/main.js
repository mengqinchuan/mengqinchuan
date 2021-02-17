import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
// import JsonExcel from "vue-json-excel";
// Vue.component("downloadExcel", JsonExcel);
Vue.config.productionTip = false;
//axios.defaults.withCredentials=true;
Vue.use(VueAxios, axios);
new Vue({
  router,
  store,
  vuetify,
  icons: {
    iconfont: "md"
  },
  render: h => h(App)
}).$mount("#app");
