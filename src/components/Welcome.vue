<template>
  <div class="wrap">
    <div class="slideInRight animated">
      <benefits />
    </div>
  </div>
</template>

<script>
import benefits from "./Layout/Benefits";
export default {
  name: "Welcome",
  components: {
    benefits,
  },
};
</script>

<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  margin-top: 40px;
}
.container {
  margin-top: 40px;
}
</style>