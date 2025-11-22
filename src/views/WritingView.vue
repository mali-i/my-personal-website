<script setup>

</script>

<template>
  <div class="writing-container">

    <div class="content">
      <div class="section">
        <h2 class="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14,2 14,8 20,8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10,9 9,9 8,9"></polyline>
          </svg>
          阶段复盘
        </h2>
        
        <div class="articles-list">
          <a href="https://mp.weixin.qq.com/s/3f2I_CvgFLpcO5Cpy7njow" target="_blank" rel="noopener noreferrer" class="article-link">
            <div class="article-card">
              <div class="article-header">
                <h3 class="article-title">2025.08 熵增曲线波浪式地前进着</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="external-link-icon">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15,3 21,3 21,9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
              <p class="article-description">关于熵增理论的思考与人生阶段的波浪式发展模式</p>
            </div>
          </a>
          
          <a href="https://mp.weixin.qq.com/s?__biz=Mzg4NDY2OTUwMA==&mid=2247484221&idx=1&sn=5210df184838995b2e3c720ce0fe2cf9&chksm=cfb5ee6ef8c267789c995c3d17d667dea875596a49912f436fb5e3d3b29f7d6fd5e815b8c909&token=586495846&lang=zh_CN#rd" target="_blank" rel="noopener noreferrer" class="article-link">
            <div class="article-card">
              <div class="article-header">
                <h3 class="article-title">25.7.27-8.2 零到五维思维模式、阶段回顾、关于目标与情绪的新发现</h3>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="external-link-icon">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15,3 21,3 21,9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
              <p class="article-description">多维思维模式探索、个人成长阶段性总结与情绪管理新见解</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.writing-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid rgba(102, 126, 234, 0.1);
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #24292f;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.1rem;
  color: #656d76;
  margin: 0;
  font-weight: 400;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 2rem;
  /* box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #24292f;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.section-title svg {
  color: #667eea;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.article-link {
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.article-link:hover {
  transform: translateY(-2px);
}

.article-card {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(102, 126, 234, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.article-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.article-link:hover .article-card {
  border-color: #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.article-link:hover .article-card::before {
  transform: scaleY(1);
}

.article-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.article-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #24292f;
  margin: 0;
  line-height: 1.4;
  flex: 1;
}

.external-link-icon {
  color: #656d76;
  opacity: 0.6;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.article-link:hover .external-link-icon {
  color: #667eea;
  opacity: 1;
  transform: scale(1.1);
}

.article-description {
  color: #656d76;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  font-style: italic;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .writing-container {
    padding: 0;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .section {
    padding: 1.5rem;
  }
  
  .article-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .external-link-icon {
    align-self: flex-end;
  }
}
</style>