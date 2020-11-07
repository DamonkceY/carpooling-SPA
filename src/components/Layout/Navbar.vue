<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <router-link class="navbar-brand" to="/">Carpooling.TN</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarCollapse"
      aria-controls="navbarCollapse"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/home" data-toggle="collapse" data-target=".navbar-collapse.show">Home</router-link>
        </li>
        <li class="nav-item" v-show="!userData">
          <router-link class="nav-link" to="/login" data-toggle="collapse" data-target=".navbar-collapse.show">Login</router-link>
        </li>
        <li class="nav-item" v-show="!userData">
          <router-link class="nav-link" to="/register" data-toggle="collapse" data-target=".navbar-collapse.show">Register</router-link>
        </li>
        <li class="nav-item" v-show="userData">
          <router-link class="nav-link" to="/profile" data-toggle="collapse" data-target=".navbar-collapse.show">Profile</router-link>
        </li>
        <li class="nav-item" v-show="userData">
          <a class="nav-link" href="#" @click="logout" data-toggle="collapse" data-target=".navbar-collapse.show">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  data: function () {
    return {};
  },
  mounted() {
    if (localStorage.getItem("authToken")) {
      this.getUserData();
    }
  },
  computed: {
    ...mapGetters("auth", ["userData"]),
  },
  methods: {
    ...mapActions("auth", ["sendLogoutRequest", "getUserData"]),

    logout: function () {
      this.sendLogoutRequest();
    },
    click: function () {
      console.log(this.userData);
    },
  },
};
</script>

<style>
</style>