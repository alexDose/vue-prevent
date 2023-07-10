<template>
<div class="navbar">
  <div @click="$router.push('/')">Vue 3</div>
  <div>
    <router-link to="/posts">Posts</router-link>
  </div>
</div>
</template>

<script>

</script>

<style scoped>
  .navbar {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    width: 100%;
    height: 50px;
    background-color: teal;
    box-shadow: 0 2px 4px gray;
  }
</style>
