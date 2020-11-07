import axios from "axios";
import router from "@/router/index";
const state = {
  userData: null,
};
const getters = {
  userData: (state) => state.userData,
};
const actions = {
  async getUserData({ commit }) {
    axios.get("http://127.0.0.1:8000/api/auth/user").then((response) => {
      commit("setUserData", response.data);
    });
  },
  async sendLoginRequest({ commit }, data) {
    axios
      .post("http://127.0.0.1:8000/api/auth/login", data)
      .then((response) => {
        commit("setUserData", response.data.user);
        localStorage.setItem("authToken", response.data.access_token);
        localStorage.setItem(
          "avatars",
          "http://127.0.0.1:8000/storage/avatars/" + response.data.user.avatar
        );
        commit("setSuccess", response.data.message, { root: true });
        router.go({
          path: "/home",
        });
      })
      .catch((error) => {
        if (error.response.data.message === "Unauthorized") {
          commit("setErrors", error.response.data.message, { root: true });
        } else {
          commit("setErrors", error.response.data.errors, { root: true });
        }
      });
  },
  async sendRegisterRequest({ commit }, data) {
    axios
      .post("http://127.0.0.1:8000/api/auth/signup", data)
      .then((response) => {
        commit("setSuccess", response.data.message, { root: true });
      })
      .catch((error) => {
        commit("setErrors", error.response.data.errors, { root: true });
      });
  },
  async sendLogoutRequest({ commit }) {
    axios.get("http://127.0.0.1:8000/api/auth/logout").then((response) => {
      commit("setUserData", null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("avatars");
      commit("setSuccess", response.data.message, { root: true });
      router.go({
        name: "Login",
      });
    });
  },
  async updateAvatar({ commit }, data) {
    axios
      .post("http://127.0.0.1:8000/api/updateAvatar", data)
      .then((response) => {
        commit("setUserData", response.data.user);
        localStorage.setItem(
          "avatars",
          "http://127.0.0.1:8000/storage/avatars/" + response.data.user.avatar
        );
        commit("setSuccess", response.data.message, { root: true });
      })
      .catch((error) => {
        commit("setErrors", error.response.data.errors, { root: true });
      });
  },
  async updatePassword({ commit }, data) {
    axios
      .post("http://127.0.0.1:8000/api/updatePassword", data)
      .then(() => {
        if (confirm("You are going to login again to confirm the change")) {
          axios
            .post("http://127.0.0.1:8000/api/confirmUpdatePassword", data)
            .then(() => {
              commit("setUserData", null);
              localStorage.removeItem("authToken");
              localStorage.removeItem("avatars");
              router.go({
                name: "Login",
              });
            });
        }
      })
      .catch((error) => {
        commit("setErrors", error.response.data.errors, { root: true });
      });
  },
  async updateUser({ commit }, data) {
    axios
      .post("http://127.0.0.1:8000/api/updateUser", data)
      .then((response) => {
        commit("setUserData", response.data.user);
        commit("setSuccess", response.data.message, { root: true });
      })
      .catch((error) => {
        commit("setErrors", error.response.data.errors, { root: true });
      });
  },
};
const mutations = {
  setUserData(state, user) {
    state.userData = user;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
