<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './components/Home.vue';

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  max-width: 1280px;
  margin: 20px auto;
}

.ml-1 {
  margin-left: 0.3rem;
}
</style>
