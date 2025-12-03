<script setup>
</script>

<template>
  <div class="writing-container">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.writing-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (max-width: 768px) {
  .writing-container {
    padding: 0.5rem;
  }
}
</style>