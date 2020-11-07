<template>
  <div class="container-fluid wrap">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="row slideInRight animated">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12 slideInRight animated" :class="{ 'd-none': this.addtrip }">
                <hr />
                <h3 style="text-align:center;">Home Sweet Home !</h3>
                <hr />
                <div class="form-row">
                  <div class="col-md-9">
                    <input
                      class="form-control"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                  </div>
                  <div class="col-md-3">
                    <button class="btn btn-outline-success btn-block">Search</button>
                  </div>
                </div>
                <hr />
                <div class="form-row">
                  <div class="col">
                    <a @click="addtrip = true" class="btn btn-outline-primary btn-block">Add a Trip</a>
                  </div>
                </div>
                <hr />
              </div>
              <div class="col-md-12 slideInRight animated" :class="{ 'd-none': !this.addtrip }">
                <addtrip @cancel="addtrip = false" />
              </div>
            </div>
          </div>
        </div>
        <div class="row slideInRight animated">
          <tripPost />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addtrip from "./Trip/AddTrip";
import tripPost from "./Trip/TripPost";
export default {
  name: "Home",
  data: function () {
    return {
      addtrip: false,
    };
  },
  components: {
    addtrip,
    tripPost,
  },
};
</script>

<style>
</style>