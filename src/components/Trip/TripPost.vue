<template>
  <div class="container-fluid slideInRight animated">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-2">
            <!-- image -->
            <button @click="qsd">qsd</button>
          </div>
          <div class="col-md-10">
            <!-- empty -->
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <!-- trip data -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TripPost",
  data() {
    return {
      details:{}
    };
  },
  mounted() {
    this.getAllTrips();
  },
  computed: {
    ...mapGetters("trip", ["getTrips"]),
  },
  methods: {
    ...mapActions("trip", ["getAllTrips"]),
    qsd(){
      console.log(this.getTrips)
    }
  },
};
</script>

<style scoped>
</style>