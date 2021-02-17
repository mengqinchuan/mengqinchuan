import Vue from "vue";
import VueRouter from "vue-router";
import adjustp from "../pages/adjustp";
import adjustsc from "../pages/adjustsc";
import adjustqr from "../pages/adjustqr";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "adjustp",
    component: adjustp
  },
  {
    path: "/adjustqr",
    name: "adjustqr",
    component: adjustqr
  },
  {
    path: "/adjustsc",
    name: "adjustsc",
    component: adjustsc
  },
];

const router = new VueRouter({
  mode:'hash',
   base:process.env.BASE_URL,
  routes
});

export default router;
