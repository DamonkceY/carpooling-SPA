<template>
  <div class="container-fluid wrap">
    <div class="row slideInRight animated">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <form @submit.prevent="login" style="margin-top:50px">
          <div class="form-group">
            <h2>Login Form</h2>
            <br />
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
              id="exampleInputEmail1"
              v-model="details.email"
            />
            <div
              class="invalid-feedback is-invalid slideInRight animated"
              v-if="this.errors.email"
            >{{ this.errors.email[0] }}</div>
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.password }"
              id="exampleInputPassword1"
              v-model="details.password"
            />
            <div
              class="invalid-feedback is-invalid slideInRight animated"
              v-if="errors.password"
            >{{ errors.password[0] }}</div>
            <label style="margin-top:30px">
              <div
                v-if="errors==='Unauthorized'"
                class="alert alert-danger slideInRight animated"
                role="alert"
              >{{errors}}</div>
            </label>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Submit</button>
          <div style="margin-top:10px">
            <router-link to="/register">Register</router-link>
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
  name: "Login",

  data: function () {
    return {
      details: {
        email: null,
        password: null,
      },
    };
  },
  mounted() {
    this.$store.commit("setErrors", {});
  },
  computed: {
    ...mapGetters(["errors", "success"]),
  },
  methods: {
    ...mapActions("auth", ["sendLoginRequest"]),

    login: function () {
      this.sendLoginRequest(this.details).then(() => {});
    },
  },
};
</script>
