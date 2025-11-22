<script setup>
</script>

<template>
  <div class="layout">
    <nav class="sidebar">
      <h2 class="sidebar-title">algernon's</h2>
      <router-link to="/" class="sidebar-link">Home</router-link>
      <router-link to="/mindset-chain" class="sidebar-link">Mindset Chain</router-link>
      <router-link to="/writing" class="sidebar-link">Writing</router-link>
    </nav>
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: #f6f8fa;
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, 'Liberation Sans', 'sans-serif';
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 220px;
  background: #fff;
  border-right: 1px solid #d0d7de;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 1px 0 4px rgba(27,31,35,.04);
  z-index: 1000;
}

.sidebar-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #24292f;
  margin-bottom: 32px;
}

.sidebar-link {
  color: #24292f;
  background: #f6f8fa;
  border-radius: 6px;
  padding: 10px 32px;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 16px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  transition: background 0.2s, color 0.2s;
}

.sidebar-link:hover {
  background: #eaecef;
  color: #0969da;
}

.main-content {
  flex: 1;
  margin-left: 220px;
  /* max-width: 800px; */
  /* margin: 0px auto; */
  background: #fff;
  /* border: 1px solid #d0d7de; */
  border-radius: 0px;
  box-shadow: 0 1px 3px rgba(27,31,35,.04);
  padding: 32px;
  min-height: 300px;
}

.title {
  color: #24292f;
  font-size: 2rem;
  font-weight: 600;
  text-align: left;
  margin-bottom: 32px;
}
</style>