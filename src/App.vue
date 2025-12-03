<script setup>
import { ref } from 'vue';

const writingExpanded = ref(false);
const toggleWriting = () => {
  writingExpanded.value = !writingExpanded.value;
};
</script>

<template>
  <div class="layout">
    <nav class="sidebar">
      <h2 class="sidebar-title">algernon's</h2>
      <div class="nav-content">
        <router-link to="/" class="sidebar-link">Home</router-link>
        <router-link to="/algernon-agent" class="sidebar-link">Algernon Agent</router-link>
        
        <div class="nav-group">
          <div class="sidebar-link group-toggle" @click="toggleWriting" :class="{ active: writingExpanded }">
            <span>Writing</span>
            <span class="arrow" :class="{ expanded: writingExpanded }">▶</span>
          </div>
          <div class="nested-links" :class="{ show: writingExpanded }">
            <router-link to="/writing/self-introduction" class="sidebar-link nested">Self Introduction</router-link>
            <router-link to="/writing/phase-review" class="sidebar-link nested">Phase Review</router-link>
          </div>
        </div>

        <router-link to="/products" class="sidebar-link">Products</router-link>
      </div>
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
  background: #f9fafb;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 260px;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 24px rgba(0,0,0,0.02);
  z-index: 1000;
  box-sizing: border-box;
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 32px 12px;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #111827 0%, #4b5563 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-radius: 8px;
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
}

.sidebar-link:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.sidebar-link.router-link-active {
  background-color: #eff6ff;
  color: #2563eb;
  font-weight: 600;
  border-color: rgba(37, 99, 235, 0.1);
}

.group-toggle {
  margin-bottom: 0;
}

.group-toggle.active {
  color: #111827;
}

.arrow {
  font-size: 0.7rem;
  color: #9ca3af;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.arrow.expanded {
  transform: rotate(90deg);
  color: #4b5563;
}

.nested-links {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 12px;
  border-left: 1px solid #e5e7eb;
}

.nested-links.show {
  max-height: 200px;
  margin-top: 4px;
  margin-bottom: 4px;
}

.sidebar-link.nested {
  padding: 8px 16px 8px 20px;
  font-size: 0.9rem;
  color: #6b7280;
  border-radius: 0 6px 6px 0;
  margin-left: 1px;
}

.sidebar-link.nested:hover {
  color: #111827;
  background-color: transparent;
  transform: translateX(4px);
}

.sidebar-link.nested.router-link-active {
  color: #2563eb;
  background-color: transparent;
  font-weight: 600;
  border-color: transparent;
  transform: translateX(4px);
}

.sidebar-link.nested.router-link-active::before {
  content: '';
  position: absolute;
  left: -1px;
  height: 60%;
  width: 2px;
  background-color: #2563eb;
  border-radius: 2px;
}

.main-content {
  flex: 1;
  margin-left: 260px;
  background: #f9fafb;
  padding: 40px;
  min-height: 100vh;
  box-sizing: border-box;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }

  .main-content {
    margin-left: 0;
    padding: 20px;
    width: 100%;
  }
  
  .sidebar {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    padding: 12px 16px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
  }

  .sidebar-title {
    margin: 0;
    font-size: 1.2rem;
  }

  .nav-content {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 0;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .nav-content::-webkit-scrollbar {
    display: none;
  }

  .sidebar-link {
    padding: 6px 12px;
    font-size: 0.9rem;
    white-space: nowrap;
    margin: 0;
  }

  .nav-group {
    display: flex;
    align-items: center;
  }

  .nested-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-bottom: 1px solid #e5e7eb;
    margin: 0;
    padding: 0;
    border-left: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .nested-links.show {
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .sidebar-link.nested {
    padding: 8px 16px;
    border-radius: 6px;
  }
  
  .sidebar-link.nested:hover,
  .sidebar-link.nested.router-link-active {
    transform: none;
  }
  
  .sidebar-link.nested.router-link-active::before {
    display: none;
  }
}
</style>