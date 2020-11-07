<template>
  <div>
    <div>
      <hr />
      <h3 style="text-align:center;">Add a trip</h3>
      <hr />
      <!-- Stage 1 -->
      <div>
        <div class="form-row">
          <div class="col-md-9">
            <input
              ref="departure_place"
              placeholder="Departure Place"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.departure_place }"
              v-model="details.departure_place"
            />
            <div
              class="invalid-feedback slideInRight animated"
              v-if="errors.departure_place"
            >
              {{ errors.departure_place[0] }}
            </div>
          </div>
          <div class="col-md-3">
            <button
              ref="departure_plac"
              class="btn btn-outline-success btn-block"
              @click="validate(1)"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <!-- Stage 2 -->
      <div v-if="confirmed.departure_place">
        <hr />
        <div class="form-row slideInRight animated">
          <div class="col-md-9">
            <input
              ref="arrival_place"
              placeholder="Arrival Place"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.arrival_place }"
              v-model="details.arrival_place"
            />
            <div
              class="invalid-feedback slideInRight animated"
              v-if="errors.arrival_place"
            >
              {{ errors.arrival_place[0] }}
            </div>
          </div>
          <div class="col-md-3">
            <button
              ref="arrival_plac"
              class="btn btn-outline-success btn-block"
              @click="validate(2)"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <!-- Stage 3 -->
      <div v-if="confirmed.arrival_place">
        <hr />
        <div class="form-row slideInRight animated">
          <div class="col-md-9">
            <div class="row">
              <div class="col">
                <input
                  ref="departure_datetime"
                  type="date"
                  class="form-control"
                  :class="{ 'is-invalid': errors.departure_datetime }"
                  v-model="datetime.date"
                />
              </div>
              <div class="col">
                <input
                  ref="departure_datetim"
                  type="time"
                  class="form-control"
                  :class="{ 'is-invalid': errors.departure_datetime }"
                  v-model="datetime.time"
                  style="text-align:center"
                />
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <button
              ref="departure_dateti"
              class="btn btn-outline-success btn-block"
              @click="validate(3)"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <!-- Stage 4 -->
      <div v-if="confirmed.departure_datetime">
        <hr />
        <div class="form-row slideInRight animated">
          <div class="col-md-9">
            <input
              ref="contact"
              placeholder="Phone Number"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors.contact }"
              v-model="details.contact"
            />
            <div
              class="invalid-feedback slideInRight animated"
              v-if="errors.contact"
            >
              {{ errors.contact[0] }}
            </div>
          </div>
          <div class="col-md-3">
            <button
              ref="contac"
              class="btn btn-outline-success btn-block"
              @click="validate(4)"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <!-- Stage 5 -->
      <div v-if="confirmed.contact">
        <hr />
        <div class="form-row slideInRight animated">
          <div class="col-md-9">
            <input
              ref="available_places"
              placeholder="available places"
              type="number"
              class="form-control"
              :class="{ 'is-invalid': errors.available_places }"
              v-model="details.available_places"
            />
            <div
              class="invalid-feedback slideInRight animated"
              v-if="errors.available_places"
            >
              {{ errors.available_places[0] }}
            </div>
          </div>
          <div class="col-md-3">
            <button
              ref="available_place"
              class="btn btn-outline-success btn-block"
              @click="validate(5)"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <hr v-if="this.success" />
      <button
        class="btn btn-outline-success btn-block slideInRight animated"
        v-if="this.success"
        @click="saveTrip"
      >
        Save Trip
      </button>
      <hr />
      <button
        ref="btnCancel"
        class="btn btn-outline-danger btn-block"
        @click="cancel"
      >
        Cancel
      </button>
      <hr />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AddTrip",
  components: {},
  data() {
    return {
      datetime: {
        date: null,
        time: null,
      },
      details: {
        departure_place: null,
        arrival_place: null,
        departure_datetime: null,
        contact: null,
        available_places: null,
      },
      confirmed: {
        departure_place: null,
        arrival_place: null,
        departure_datetime: null,
        contact: null,
        available_places: null,
      },
    };
  },

  computed: {
    ...mapGetters(["errors", "success"]),
  },
  methods: {
    ...mapActions("trip", ["validateTrip", "submitTrip"]),
    cancel() {
      this.$emit("cancel");
      this.confirmed = {
        departure_place: null,
        arrival_place: null,
        departure_datetime: null,
        contact: null,
        available_places: null,
      };
      this.datetime = {
        date: null,
        time: null,
      };
      this.details = {
        departure_place: null,
        arrival_place: null,
        departure_datetime: null,
        contact: null,
        available_places: null,
      };
    },
    async validate(x) {
      if (this.datetime.time && this.datetime.time.length <= 7) {
        this.datetime.time = this.datetime.time + ":00";
        this.details.departure_datetime =
          this.datetime.date + " " + this.datetime.time;
      }

      await this.validateTrip(this.details);

      switch (x) {
        case 1:
          if (!this.errors.departure_place) {
            this.confirmed.departure_place = this.details.departure_place;
            // this.$refs.departure_place.disabled = true;
            // this.$refs.departure_plac.disabled = true;
            this.$store.commit("setErrors", {});
          }
          break;
        case 2:
          if (!this.errors.arrival_place) {
            this.confirmed.arrival_place = this.details.arrival_place;
            // this.$refs.arrival_place.disabled = true;
            // this.$refs.arrival_plac.disabled = true;
            this.$store.commit("setErrors", {});
          }
          break;
        case 3:
          if (!this.errors.departure_datetime) {
            this.confirmed.departure_datetime = this.details.departure_datetime;
            // this.$refs.departure_datetime.disabled = true;
            // this.$refs.departure_datetim.disabled = true;
            // this.$refs.departure_dateti.disabled = true;
            this.$store.commit("setErrors", {});
          }
          break;
        case 4:
          if (!this.errors.contact) {
            this.confirmed.contact = this.details.contact;
            // this.$refs.contact.disabled = true;
            // this.$refs.contac.disabled = true;
            this.$store.commit("setErrors", {});
          }
          break;
        case 5:
          if (!this.errors.available_places) {
            this.confirmed.available_places = this.details.available_places;
            // this.$refs.available_places.disabled = true;
            // this.$refs.available_place.disabled = true;
            this.$store.commit("setErrors", {});
          }
          break;

        default:
          break;
      }
    },
    saveTrip() {
      this.submitTrip(this.confirmed);
      this.$refs.btnCancel.click();
      this.$store.commit("setSuccess", {});
    },
  },
};
</script>

<style></style>
