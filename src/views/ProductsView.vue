<script setup>
</script>

<template>
  <div class="products-container">

    <div class="products-grid">
      <div class="product-card">
        <div class="product-icon">🗺️</div>
        <h3 class="product-title">DoneTrail</h3>
        <p class="product-description">记录每日完成的事项，生成AI报告和图片日志</p>
        <div class="product-tags">
          <span class="tag">Vue</span>
          <span class="tag">D3.js</span>
          <span class="tag">可视化</span>
        </div>
        <a href="http://www.donetrail.com" class="product-link" target="_blank">查看详情 →</a>
      </div>

    <div class="product-card">
        <div class="product-icon">🤖</div>
        <h3 class="product-title">Deepseek-ai-assistant</h3>
        <p class="product-description">统计你与LLM的prompts</p>
        <div class="product-tags">
            <span class="tag">obsidian插件</span>
        </div>
        <a href="https://github.com/mali-i/deepseek-ai-assistant" target="_blank" rel="noopener noreferrer" class="product-link">查看详情 →</a>
      </div>

        <div class="product-card">
        <div class="product-icon">🌲</div>
        <h3 class="product-title">MindGrove</h3>
        <p class="product-description">从大模型的交互中从零开始生长出你的知识库</p>
        <div class="product-tags">
            <span class="tag">知识管理</span>
        </div>
        <div class="product-status">敬请期待</div>
        <!-- <a href="" target="_blank" rel="noopener noreferrer" class="product-link">查看详情 →</a> -->
      </div>

      <div class="product-card coming-soon">
        <div class="product-icon">💡</div>
        <h3 class="product-title">More Coming Soon</h3>
        <p class="product-description">正在开发更多有趣的产品...</p>
        <div class="product-status">敬请期待</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-container {
  max-width: 1400px;
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

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.product-card {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(102, 126, 234, 0.1);
  border-radius: 10px;
  padding: 1.2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  border-color: #667eea;
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.2);
}

.product-card:hover::before {
  transform: scaleX(1);
}

.product-icon {
  font-size: 2rem;
  margin-bottom: 0.8rem;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #24292f;
  margin-bottom: 0.5rem;
}

.product-description {
  color: #656d76;
  line-height: 1.5;
  margin-bottom: 1rem;
  min-height: 2.5rem;
  font-size: 0.9rem;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.tag {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
}

.product-link {
  display: inline-flex;
  align-items: center;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.product-link:hover {
  color: #764ba2;
  transform: translateX(5px);
}

.coming-soon {
  opacity: 0.7;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 247, 255, 0.9) 100%);
}

.product-status {
  display: inline-block;
  background: rgba(255, 193, 7, 0.2);
  color: #f57c00;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .title {
    font-size: 2rem;
  }
}
</style>