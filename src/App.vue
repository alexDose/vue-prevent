<template>
  <div class="app">
    <navbar></navbar>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  components: {Navbar}
}
</script>

<style>

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  height: 100vh;
}

.content {
  padding: 20px 30px;
}

button + button {
  margin-left: 10px;
}
</style>
