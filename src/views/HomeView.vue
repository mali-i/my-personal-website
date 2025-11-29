<script setup>
import { ref } from 'vue'
import avatarUrl from '../assets/icon-192.jpg'

// 技能数据
const skills = ref([
  { name: 'Vue.js', level: 90, color: '#4FC08D' },
  { name: 'JavaScript', level: 85, color: '#F7DF1E' },
  { name: 'Node.js', level: 80, color: '#339933' },
  { name: 'Python', level: 51, color: '#3776AB' },
  { name: '产品设计', level: 40, color: '#FF6B6B' },
  { name: '项目管理', level: 80, color: '#4ECDC4' }
])

// 联系方式数据
const contacts = ref([
  { 
    name: 'GitHub', 
    icon: '🐙', 
    url: 'https://github.com/mali-i',
    description: '查看我的开源项目'
  },
  { 
    name: '邮箱', 
    icon: '📧', 
    // url: '',
    description: '商务合作联系'
  },
  { 
    name: '微信', 
    icon: '💬', 
    // url: '',
    description: '扫码添加微信'
  }

])
</script>

<template>
  <div class="home-container">
    <!-- 个人介绍区 -->
    <section class="hero-section">
      <div class="avatar-container">
        <div class="avatar">
          <img :src="avatarUrl" alt="Avatar" class="avatar-img" />
        </div>
      </div>
      <h1 class="main-title">你好！我是阿吉侬algernon</h1>
      <p class="subtitle">独立开发者 · 创业者</p>
      <div class="intro-text">
        <p>我正在朝着独立开发、创业者的身份标签努力</p>
        <p>热爱技术，专注于创造有价值的产品和解决方案</p>
      </div>
      <div class="identity-tags">
        <span class="tag primary">🚀 独立开发</span>
        <span class="tag secondary">💼 创业者</span>
        <span class="tag accent">🎯 一人公司</span>
      </div>
    </section>

    <!-- 技能展示区 -->
    <section class="skills-section">
      <h2 class="section-title">技能专长</h2>
      <div class="skills-grid">
        <div 
          v-for="skill in skills" 
          :key="skill.name" 
          class="skill-card"
        >
          <div class="skill-header">
            <h3 class="skill-name">{{ skill.name }}</h3>
            <span class="skill-percentage">{{ skill.level }}%</span>
          </div>
          <div class="skill-bar">
            <div 
              class="skill-progress" 
              :style="{ 
                width: skill.level + '%',
                backgroundColor: skill.color 
              }"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系方式区 -->
    <section class="contact-section">
      <h2 class="section-title">联系我</h2>
      <p class="contact-intro">欢迎与我交流合作，一起创造有趣的项目！</p>
      <div class="contact-grid">
        <a 
          v-for="contact in contacts" 
          :key="contact.name"
          :href="contact.url" 
          class="contact-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="contact-icon">{{ contact.icon }}</div>
          <div class="contact-info">
            <h3 class="contact-name">{{ contact.name }}</h3>
            <p class="contact-description">{{ contact.description }}</p>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  max-width: 1400px;
  margin: 0 auto;
}

/* 个人介绍区样式 */
.hero-section {
  text-align: center;
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  /* box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); */
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.avatar-container {
  margin-bottom: 1rem;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  border: 3px solid rgba(255, 255, 255, 0.8);
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 1rem;
  font-weight: 500;
}

.intro-text {
  margin-bottom: 1rem;
}

.intro-text p {
  margin: 0.2rem 0;
  color: #5a6c7d;
  font-size: 0.95rem;
  line-height: 1.4;
}

.identity-tags {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  flex-wrap: wrap;
}

.tag {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: default;
  text-decoration: none;
}

.tag.primary {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(102, 126, 234, 0.08) 100%);
  color: #667eea;
  border: 2px solid rgba(102, 126, 234, 0.2);
}

.tag.secondary {
  background: linear-gradient(135deg, rgba(118, 75, 162, 0.15) 0%, rgba(118, 75, 162, 0.08) 100%);
  color: #764ba2;
  border: 2px solid rgba(118, 75, 162, 0.2);
}

.tag.accent {
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.15) 0%, rgba(255, 107, 107, 0.08) 100%);
  color: #ff6b6b;
  border: 2px solid rgba(255, 107, 107, 0.2);
}

.tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* 技能展示区样式 */
.skills-section {
  margin-bottom: 2rem;
}

.section-title {
  text-align: center;
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  position: relative;
}

.section-title::after {
  content: '';
  width: 50px;
  height: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.skill-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.skill-percentage {
  font-size: 0.85rem;
  font-weight: 700;
  color: #667eea;
}

.skill-bar {
  width: 100%;
  height: 6px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  border-radius: 3px;
  transition: width 1.5s ease-out;
  position: relative;
}

/* 联系方式区样式 */
.contact-section {
  text-align: center;
}

.contact-intro {
  font-size: 0.95rem;
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  max-width: 1000px;
  margin: 0 auto;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.contact-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  text-decoration: none;
}

.contact-icon {
  font-size: 1.2rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 50%;
  flex-shrink: 0;
}

.contact-info {
  text-align: left;
  flex: 1;
}

.contact-name {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 0.1rem 0;
}

.contact-description {
  font-size: 0.8rem;
  color: #7f8c8d;
  margin: 0;
}

.skill-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-container {
    padding: 0.5rem;
  }
  
  .hero-section {
    padding: 1.5rem 1rem;
  }
  
  .main-title {
    font-size: 1.5rem;
  }
  
  .identity-tags {
    flex-direction: column;
    align-items: center;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-card {
    flex-direction: column;
    text-align: center;
  }
  
  .contact-info {
    text-align: center;
  }
}

/* 动画效果 */
.hero-section {
  animation: fadeInUp 0.8s ease-out;
}

.skills-section {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.contact-section {
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>