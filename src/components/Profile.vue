<template>
  <div class="container wrap" v-if="userData">
    <div class="row slideInRight animated">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <!-- Avatar -->
        <div class="row">
          <div class="col-md-12" style="padding-top:10px;">
            <label>
              <img :src="this.image" style="width: 200px; height:200px;border-radius: 40%;" />
            </label>
          </div>
        </div>

        <!-- Avatar Success Message-->
        <div class="row">
          <div style="padding-top:10px" class="col-md-12">
            <div class="wrap">
              <div
                class="alert alert-success alert-dismissable slideInRight animated"
                v-if="success.updatedAvatar"
              >
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                {{success.updatedAvatar[0]}}
              </div>
            </div>
          </div>
        </div>

        <!-- Avatar Error Message-->
        <div class="row">
          <div style="padding-top:10px" class="col-md-12">
            <div class="wrap" v-if="this.errors.avatar">
              <div
                class="alert alert-danger alert-dismissable slideInRight animated"
                v-for="err in errors.avatar"
                :key="err"
              >
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                <strong>{{err}}</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Avatar Input -->
        <div class="row">
          <div style="padding-top:10px" class="col-md-12">
            <button @click="$refs.file.click()">Upload Image</button>
            <input style="display: none;" type="file" ref="file" @change="getImage" />
            <button v-on:click="submitFile()">Submit</button>
          </div>
        </div>

        <hr style=" border: 1px solid gray; border-radius: 5px;" />

        <!-- User Data -->
        <div class="row">
          <div style="padding-top:10px;text-align:left;padding-left:25%;" class="col-md-12">
            <h3>{{userData.name}}</h3>
            <h3>{{userData.email}}</h3>
            <h3>{{userData.birthDate}}</h3>
            <h3>{{userData.city}}</h3>
            <h3>
              <a @click="init" href="#editProfile" data-toggle="modal">Edit Profile</a>
            </h3>
            <h3>
              <a href="#password" data-toggle="modal">Change Password</a>
            </h3>
          </div>
        </div>

        <!-- User Data Update Success Message -->
        <div class="row">
          <div style="padding-top:10px" class="col-md-12">
            <div
              class="alert alert-success alert-dismissable slideInRight animated"
              v-if="success.userUpdated"
            >
              <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
              {{success.userUpdated[0]}}
            </div>
          </div>
        </div>

        <hr style=" border: 1px solid gray; border-radius: 5px;" />
      </div>

      <div class="col-md-3"></div>
    </div>

    <!-- Change Password Modal -->
    <div class="modal fade" id="password" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <h2>Change Password</h2>
            <form @submit.prevent="changePass">
              <div class="form-group">
                <label for="oldPassword">Old Password(current)</label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  v-model="pass.oldPassword"
                  class="form-control"
                  :class="{ 'is-invalid': errors.oldPassword }"
                />
                <div
                  class="invalid-feedback is-invalid slideInRight animated"
                  v-if="this.errors.oldPassword"
                >{{ this.errors.oldPassword[0] }}</div>
              </div>
              <div class="form-group">
                <label for="password">New Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  v-model="pass.password"
                  class="form-control"
                  :class="{ 'is-invalid': errors.password }"
                />
                <div
                  class="invalid-feedback is-invalid slideInRight animated"
                  v-if="this.errors.password"
                >{{ this.errors.password[0] }}</div>
              </div>

              <div class="form-group">
                <label for="passConf">Password Confirmation</label>
                <input
                  type="password"
                  id="passConf"
                  name="password_confirmation"
                  v-model="pass.password_confirmation"
                  class="form-control"
                  :class="{ 'is-invalid': errors.password_confirmation }"
                />
                <div
                  class="invalid-feedback is-invalid slideInRight animated"
                  v-if="this.errors.password_confirmation"
                >{{ this.errors.password_confirmation[0] }}</div>
              </div>
              <div class="modal-footer">
                <input type="submit" class="btn btn-primary" value="Save Changes" />
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div class="modal fade" id="editProfile" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <h2>Edit Profile Data</h2>
            <form @submit.prevent="editProfile">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  v-model="details.name"
                  class="form-control"
                  :class="{ 'is-invalid': errors.name }"
                  style="text-align:center"
                />
                <div
                  class="invalid-feedback is-invalid slideInRight animated"
                  v-if="this.errors.name"
                >{{ this.errors.name[0] }}</div>
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
                <div
                  class="invalid-feedback slideInRight animated"
                  v-if="errors.birthDate"
                >{{ errors.birthDate[0] }}</div>
              </div>
              <div class="form-group">
                <label for="city">Current city</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.city }"
                  id="city"
                  v-model="details.city"
                  style="text-align:center"
                />
                <div
                  class="invalid-feedback slideInRight animated"
                  v-if="errors.city"
                >{{ errors.city[0] }}</div>
              </div>
              <div
                class="invalid-feedback slideInRight animated"
                v-if="errors.sameData"
              >{{ errors.sameData[0] }}</div>

              <div class="modal-footer">
                <input type="submit" class="btn btn-primary" value="Save Changes" />
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  ref="btnClose"
                >Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from 'axios';
export default {
  name: "Profile",
  data: function () {
    return {
      image: localStorage.getItem("avatars"),
      file: null,
      pass: {
        oldPassword: null,
        password: null,
        password_confirmation: null,
      },
      details: {
        name: null,
        birthDate: null,
        city: null,
      },
    };
  },
  mounted() {
    this.getUserData();
  },
  computed: {
    ...mapGetters("auth", ["userData"]),
    ...mapGetters(["success", "errors"]),
  },
  methods: {
    ...mapActions("auth", [
      "getUserData",
      "updateAvatar",
      "updatePassword",
      "updateUser",
    ]),

    changePass() {
      this.updatePassword(this.pass);
    },

    submitFile() {
      let formData = new FormData();
      formData.append("avatar", this.file);
      this.updateAvatar(formData);
    },
    getImage(e) {
      let img = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (e) => {
        this.image = e.target.result;
      };
      this.file = this.$refs.file.files[0];
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
    editProfile: function () {
      this.details.birthDate = this.formatDate(this.details.birthDate);
      axios
      .post("http://127.0.0.1:8000/api/updateUser", this.details)
      .then((response) => {
        this.$refs.btnClose.click();
        this.$store.commit("auth/setUserData", response.data.user);
        this.$store.commit("setSuccess", response.data.message, { root: true });
      })
      .catch((error) => {
        this.$store.commit("setErrors", error.response.data.errors, { root: true });
      });
    },
    init: function () {
      this.details.name = this.userData.name;
      this.details.birthDate = this.userData.birthDate;
      this.details.city = this.userData.city;
    },
  },
};
</script>

<style scoped>
</style>