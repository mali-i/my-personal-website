<script setup>
import { ref } from 'vue';

const selectedYear = ref('2024');

const timeline = ref([
  {
    year: '2025',
    title: '启动',
    description: '',
    selfIntro: ''
  },
  {
    year: '2024',
    title: '迷茫',
    description: '迷茫、试错、探索',
    selfIntro: ''
  },
  {
    year: '2023',
    title: '痛苦',
    description: '问题与冲突',
    selfIntro: ''
  },
  {
    year: '2022',
    title: '危机',
    description: '资讯、混沌、熵增',
    selfIntro: ``
  },
  {
    year: '2021',
    title: '焦虑',
    description: '认知退行，直抵熵死',
    selfIntro: ''
  }
]);

const selectYear = (year) => {
  selectedYear.value = year;
};

const getSelectedTimelineItem = () => {
  return timeline.value.find((item) => item.year === selectedYear.value);
};
</script>

<template>
  <section class="timeline-section">
    <h2 class="section-title">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
      自我介绍
    </h2>

    <div class="timeline-layout">
      <div class="timeline-content-area" v-if="getSelectedTimelineItem()">
        <div class="timeline-content-card">
          <div class="content-header">
            <h3 class="content-title">{{ getSelectedTimelineItem().title }}</h3>
            <span class="content-year">{{ getSelectedTimelineItem().year }}</span>
          </div>
          <p class="content-description">{{ getSelectedTimelineItem().description }}</p>
          <div class="self-intro">
            <div class="intro-text markdown-content">
              {{ getSelectedTimelineItem().selfIntro }}
            </div>
          </div>
        </div>
      </div>

      <div class="timeline-sidebar">
        <div class="timeline-line"></div>
        <div
          v-for="(item, index) in timeline"
          :key="index"
          class="timeline-point"
          :class="{ active: selectedYear === item.year }"
          @click="selectYear(item.year)"
        >
          <div class="timeline-marker"></div>
          <div class="timeline-year">{{ item.year }}</div>
          <div class="timeline-title">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline-section {
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  justify-content: center;
}

.section-title svg {
  color: #667eea;
}

.timeline-layout {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.timeline-content-area {
  flex: 1;
}

.timeline-sidebar {
  width: 200px;
  position: relative;
  padding: 1rem 0;
  flex-shrink: 0;
}

.timeline-line {
  position: absolute;
  left: 15px;
  top: 1rem;
  bottom: 1rem;
  width: 2px;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  z-index: 1;
}

.timeline-point {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
  margin-bottom: 2rem;
  padding-left: 2.5rem;
}

.timeline-point:hover {
  transform: translateX(5px);
}

.timeline-point.active {
  transform: translateX(8px);
}

.timeline-point.active .timeline-marker {
  background: #667eea;
  transform: scale(1.2);
}

.timeline-point.active .timeline-year {
  color: #667eea;
  font-weight: 700;
}

.timeline-point.active .timeline-title {
  color: #667eea;
  font-weight: 600;
}

.timeline-marker {
  position: absolute;
  left: -2.2rem;
  top: 0.2rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: 3px solid #667eea;
  transition: all 0.3s ease;
}

.timeline-year {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  transition: all 0.3s ease;
  margin-bottom: 0.3rem;
}

.timeline-title {
  font-size: 0.9rem;
  color: #7f8c8d;
  transition: all 0.3s ease;
  line-height: 1.3;
}

.timeline-content-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeInUp 0.5s ease-out;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.content-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.content-year {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(102, 126, 234, 0.08) 100%);
  color: #667eea;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.content-description {
  color: #7f8c8d;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.self-intro {
  padding: 1.5rem;
  border-radius: 8px;
}

.intro-text {
  color: #5a6c7d;
  font-size: 1rem;
  line-height: 1.7;
  margin: 0;
}

.markdown-content {
  white-space: pre-wrap;
  text-align: justify;
  word-wrap: break-word;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .timeline-section {
    padding: 1.5rem;
  }
  
  .timeline-layout {
    flex-direction: column;
  }
  
  .timeline-sidebar {
    width: 100%;
    order: -1;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding: 1rem 0;
    gap: 1rem;
  }
  
  .timeline-line {
    display: none;
  }
  
  .timeline-point {
    background: rgba(255, 255, 255, 0.9);
    padding: 1rem;
    border-radius: 12px;
    min-width: 120px;
    border: 1px solid rgba(102, 126, 234, 0.1);
    margin-bottom: 0;
    padding-left: 1rem;
    text-align: center;
  }
  
  .timeline-marker {
    position: relative;
    left: auto;
    top: auto;
    margin: 0 auto 0.5rem auto;
  }
  
  .timeline-content-card {
    padding: 1.5rem;
  }
  
  .content-header {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .self-intro {
    padding: 1rem;
  }
  
  .timeline-title {
    font-size: 0.8rem;
    text-align: center;
    margin: 0;
  }
}
</style>