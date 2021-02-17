import Vue from "vue";
import VueRouter from "vue-router";
import request from "../views/logvue/request";
import login2 from "../views/logvue/login2";
import pandian from "../pages/pandian";
import diaoyong from "../pages/diaoyong";
import pandianc from "../pages/pandianc";
import lingyong from "../pages/lingyong";
import sbchaxun from "../pages/sbchaxun";
import accountm from "../pages/accountm";
import waijie from "../pages/waijie";
import songxiu from "../pages/songxiu";
import historycx from "../pages/historycx"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login2"
  },
  {
    path: "/request",
    name: "request",
    component: request
  },
  {
    path: "/login2",
    name: "login2",
    component: login2
  },
  {
    path: "/pandian",
    name: "pandian",
    component: pandian,
    meta: { requirelevel: 1 }
  },
  {
    path: "/diaoyong",
    name: "diaoyong",
    component: diaoyong,
    meta: { requirelevel: 3 }
  },
  {
    path: "/pandianc",
    name: "pandianc",
    component: pandianc,
    meta: { requirelevel: 2 }
  },
  {
    path: "/lingyong",
    name: "lingyong",
    component: lingyong,
    meta: { requirelevel: 3 }
  },
  {
    path: "/sbchaxun",
    name: "sbchaxun",
    component: sbchaxun,
    meta: { requirelevel: 1 }
  },
  {
    path: "/accountm",
    name: "accountm",
    component: accountm,
    meta: { requirelevel: 4 }
  },
  {
    path: "/waijie",
    name: "waijie",
    component: waijie,
    meta: { requirelevel: 3 }
  },
  {
    path: "/songxiu",
    name: "songxiu",
    component: songxiu,
    meta: { requirelevel: 3 }
  },
  {
    path: "/historycx",
    name: "historycx",
    component: historycx,
    meta: { requirelevel: 1 }
  },
];

const router = new VueRouter({
  // mode: "hash",
  // base: "process.env.BASE_URL",
  routes
});
router.beforeEach((to, from, next) => {
  // ...
  if (to.path == "/login2" || to.path == "/request") {
    next();
  } else {
    if (
      sessionStorage.getItem("myid") &&
      sessionStorage.getItem("mylevel") >= to.meta.requirelevel
    ) {
      next();
    } else {
      sessionStorage.clear();
      next({ path: "/login2" });
    }
  }
});
export default router;
