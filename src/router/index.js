import Vue from "vue";
import VueRouter from "vue-router";

import Welcome from "../components/Welcome.vue";
import Login from "../components/Auth/Login.vue";
import Register from "../components/Auth/Register.vue";
import Profile from "../components/Profile.vue";
import Home from "../components/Home.vue";

Vue.use(VueRouter);

const guest = (to, from, next) => {
  if (!localStorage.getItem("authToken")) {
    return next();
  } else {
    return next("/");
  }
};
const auth = (to, from, next) => {
  if (localStorage.getItem("authToken")) {
    return next();
  } else {
    return next("/login");
  }
};

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: guest,
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    beforeEnter: guest,
    component: Register,
  },
  {
    path: "/profile",
    name: "Profile",
    beforeEnter: auth,
    component: Profile,
  },
  {
    path: "/home",
    name: "Home",
    beforeEnter: auth,
    component: Home,
  }
  //   {
  //     path: "/verify/:hash",
  //     name: "Verify",
  //     beforeEnter: auth,
  //     props: true,
  //     component: () =>
  //       import(/* webpackChunkName: "verify" */ "../views/Auth/Verify.vue"),
  //   },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
