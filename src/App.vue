<script setup>
</script>

<template>
  <div class="layout">
    <nav class="sidebar">
      <h2 class="sidebar-title">algernon's</h2>
      <router-link to="/" class="sidebar-link">Home</router-link>
      <router-link to="/mindset-chain" class="sidebar-link">Mindset Trail</router-link>
      <router-link to="/writing" class="sidebar-link">Writing</router-link>
      <router-link to="/products" class="sidebar-link">Products</router-link>
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
  background: #fff;
  border-radius: 0px;
  box-shadow: 0 1px 3px rgba(27,31,35,.04);
  padding: 32px;
  min-height: 300px;
  box-sizing: border-box;
}

.title {
  color: #24292f;
  font-size: 2rem;
  font-weight: 600;
  text-align: left;
  margin-bottom: 32px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }

  .main-content {
    margin-left: 0;
    padding: 16px;
    width: 100%;
  }
  
  .sidebar {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    transform: none;
    border-right: none;
    border-bottom: 1px solid #d0d7de;
    padding: 10px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
  }

  .sidebar-title {
    width: 100%;
    text-align: center;
    margin-bottom: 8px;
    font-size: 1.1rem;
  }

  .sidebar-link {
    width: auto;
    margin-bottom: 0;
    padding: 6px 12px;
    font-size: 0.9rem;
    background: transparent;
  }

  .sidebar-link.router-link-active {
    background: #eaecef;
    color: #0969da;
    font-weight: 600;
  }
}
</style>