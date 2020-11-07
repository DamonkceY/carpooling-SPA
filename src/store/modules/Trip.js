// import router from "@/router/index";

import Axios from "axios";

const state = {
  allTrips: null,
};

const getters = {
  getTrips: (state) => state.alltrips,
};

const mutations = {
  setTrips(state, data) {
    state.allTrips = data;
  },
};

const actions = {
  async validateTrip({ commit }, data) {
    await Axios.post("http://127.0.0.1:8000/api/validateTrip", data)
      .then((response) => {
        commit("setSuccess", response.data.message, { root: true });
      })
      .catch((error) => {
        commit("setErrors", error.response.data.errors, { root: true });
      });
  },
  async submitTrip({ commit }, data) {
    await Axios.post("http://127.0.0.1:8000/api/createTrip", data)
      .then((response) => {
        commit("setSuccess", response.data.message, { root: true });
      })
      .catch((error) => {
        commit("setErrors", error.response.data.errors, { root: true });
      });
  },
  async getAllTrips({ commit }) {
    await Axios.get("http://127.0.0.1:8000/api/getAllTrips")
      .then((response) => {
        commit("setTrips", response.data.trips);
      })
      .catch((error) => {
        commit("setErrors", error.response.data.errors, { root: true });
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
