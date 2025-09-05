<script setup>

</script>

<template>
  <h1>Hello, here's algernon's personal website!</h1>
  <nav>
    <router-link to="/" class="block hover:bg-gray-200">Home</router-link>
    <router-link to="/writing" class="block hover:bg-gray-200">writing</router-link>
  </nav>
  <main class="p-8">
    <router-view></router-view>
  </main>
</template>

<style scoped>



</style>
