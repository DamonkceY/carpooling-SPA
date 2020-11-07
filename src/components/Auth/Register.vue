<template>
  <div class="container-fluid wrap">
    <div class="row slideInRight animated">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <form @submit.prevent="register" style="margin-top:50px">
          <h2>Register Form</h2>
          <br />

          <div class="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
              id="email"
              v-model="details.email"
            />
            <div class="invalid-feedback slideInRight animated" v-if="errors.email">{{ errors.email[0] }}</div>
          </div>
          <div class="form-group">
            <label for="name">Full Name</label>
            <input
              type="text"
              id="name"
              v-model="details.name"
              class="form-control"
              :class="{ 'is-invalid': errors.name }"
            />
            <div class="invalid-feedback slideInRight animated" v-if="errors.name">{{ errors.name[0] }}</div>
          </div>
          <div class="form-group">
            <label for="birthday">Birthday</label>
            <input
              type="date"
              class="form-control"
              :class="{ 'is-invalid': errors.birthDate }"
              id="birthday"
              v-model="details.birthDate"
              style="text-align:center"
            />
            <div class="invalid-feedback slideInRight animated" v-if="errors.birthDate">{{ errors.birthDate[0] }}</div>
          </div>
          <div class="form-group">
            <label for="city">Current city</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.city }"
              id="city"
              v-model="details.city"
            />
            <div class="invalid-feedback slideInRight animated" v-if="errors.city">{{ errors.city[0] }}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.password }"
              id="password"
              v-model="details.password"
            />
            <div class="invalid-feedback slideInRight animated" v-if="errors.password">{{ errors.password[0] }}</div>
          </div>
          <div class="form-group">
            <label for="passwordConf">Confirm password</label>
            <input
              type="password"
              class="form-control"
              id="passwordConf"
              v-model="details.password_confirmation"
            />
          </div>
          <label>
            <div v-if="success" class="alert alert-success slideInRight animated" role="alert">
              {{success}} :
              <router-link to="/login">Login</router-link>
            </div>
          </label>
          <button type="submit" class="btn btn-primary btn-block">Register</button>
          <div style="margin-top:10px">
            <router-link to="/login">Login</router-link>
          </div>
        </form>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Register",
  data: function () {
    return {
      details: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        birthDate: null,
        city: null,
      },
    };
  },
  computed: {
    ...mapGetters(["errors", "success"]),
  },
  mounted() {
    this.$store.commit("setErrors", {});
    this.$store.commit("setSuccess", "");
  },
  methods: {
    ...mapActions("auth", ["sendRegisterRequest"]),

    register: function () {
      this.details.birthDate = this.formatDate(this.details.birthDate);
      this.$store.commit("setErrors", {});
      this.sendRegisterRequest(this.details);
    },
    formatDate: function (date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
  },
};
</script>
