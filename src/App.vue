<template>
  <div id="app">
    <NavBar />
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
export default {
  name: "App",
  components: {
    NavBar,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.wrap {
  overflow-x: hidden;
}
.slideInRight {
  animation-name: slideInRight;
}
.animated {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}

@keyframes slideInRight {
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
