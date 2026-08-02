<script setup>
const features = [
  {
    number: '01',
    title: '把远方，变成眼前的一步',
    description: '为长期目标设定清晰方向，再把它拆成今天真正能完成的行动。'
  },
  {
    number: '02',
    title: '计划会变，方向不丢',
    description: '根据实际进展持续回顾与调整，不再让一张过时的计划表绑住你。'
  },
  {
    number: '03',
    title: '看见每一次向前',
    description: '记录已完成的关键节点，在长距离里保留反馈，也保留继续行动的底气。'
  }
]

const steps = [
  { label: '定下方向', detail: '写下你真正想抵达的地方' },
  { label: '拆出下一步', detail: '让长期目标回到可执行的尺度' },
  { label: '行动与回顾', detail: '在真实进展中更新计划' },
  { label: '继续向前', detail: '带着反馈开始新一轮推进' }
]
</script>

<template>
  <div class="rolling-plan-page">
    <header class="topbar">
      <router-link to="/rollingplan" class="brand" aria-label="RollingPlan 首页">
        <img src="/rollingplan-icon.png" alt="" />
        <span>RollingPlan</span>
      </router-link>
      <nav class="topnav" aria-label="页面导航">
        <a href="#features">特点</a>
        <a href="#workflow">方法</a>
        <router-link to="/products" class="back-link">更多产品</router-link>
      </nav>
    </header>

    <main>
      <section class="hero">
        <div class="hero-glow glow-one"></div>
        <div class="hero-glow glow-two"></div>

        <div class="hero-copy">
          <div class="eyebrow"><span></span> 为长期目标而生的计划工具</div>
          <h1>计划不是定死的。<br /><em>它应该随你向前。</em></h1>
          <p class="hero-description">
            RollingPlan 帮你把长期方向变成清晰的下一步，<br class="desktop-only" />
            在每一次行动与回顾中，持续校准、持续推进。
          </p>
          <div class="hero-actions">
            <a href="#workflow" class="primary-button">看看它如何工作 <span>↓</span></a>
            <router-link to="/products" class="text-button">返回产品列表 <span>↗</span></router-link>
          </div>
          <div class="platform-note"><span class="status-dot"></span> 使用 SwiftUI 构建 · 正在持续打磨</div>
        </div>

        <div class="hero-visual" aria-label="RollingPlan 产品概念预览">
          <div class="orbit orbit-one"></div>
          <div class="orbit orbit-two"></div>
          <div class="app-window">
            <div class="window-top">
              <div class="window-dots"><span></span><span></span><span></span></div>
              <span class="window-title">我的计划</span>
              <span class="week-pill">本周</span>
            </div>
            <div class="window-content">
              <div class="goal-heading">
                <div>
                  <span class="mini-label">LONG-TERM GOAL</span>
                  <h2>完成独立产品发布</h2>
                </div>
                <div class="progress-ring"><strong>68</strong><small>%</small></div>
              </div>
              <div class="progress-line"><span></span></div>
              <div class="now-card">
                <div class="now-top"><span>现在，只做这一步</span><b>01</b></div>
                <p>完成 Landing Page 的核心信息与页面结构</p>
                <div class="task-meta"><span>◒ 今天</span><span>编辑中</span></div>
              </div>
              <div class="next-row">
                <span class="checkmark">✓</span>
                <div><small>上一步</small><p>确定产品的核心问题</p></div>
                <span class="done">已完成</span>
              </div>
              <div class="next-row muted">
                <span class="empty-check"></span>
                <div><small>接下来</small><p>邀请第一批用户体验</p></div>
                <span class="arrow">→</span>
              </div>
            </div>
          </div>
          <div class="floating-card floating-top">
            <span class="floating-icon">↻</span>
            <div><small>本周回顾</small><strong>方向不变，调整节奏</strong></div>
          </div>
          <div class="floating-card floating-bottom">
            <span class="floating-icon purple">✓</span>
            <div><small>今日进展</small><strong>又往前了一步</strong></div>
          </div>
        </div>
      </section>

      <section id="features" class="features-section section-shell">
        <div class="section-intro">
          <span class="section-kicker">WHY ROLLINGPLAN</span>
          <h2>不是管理更多任务，<br />而是让重要的事真正发生。</h2>
        </div>
        <div class="feature-grid">
          <article v-for="feature in features" :key="feature.number" class="feature-card">
            <span class="feature-number">{{ feature.number }}</span>
            <div class="feature-mark" :class="`mark-${feature.number}`"><span></span></div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </article>
        </div>
      </section>

      <section id="workflow" class="workflow-section">
        <div class="section-shell workflow-shell">
          <div class="workflow-copy">
            <span class="section-kicker">一种更符合真实的计划方式</span>
            <h2>目标很长，<br />但你只需要走好这一轮。</h2>
            <p>不试图预测每一个未来细节。RollingPlan 把计划看作一个循环：行动产生反馈，反馈帮你做出下一次更好的决定。</p>
          </div>
          <div class="steps-list">
            <article v-for="(step, index) in steps" :key="step.label" class="step-item">
              <span class="step-index">{{ String(index + 1).padStart(2, '0') }}</span>
              <div><h3>{{ step.label }}</h3><p>{{ step.detail }}</p></div>
              <span class="step-arrow">↗</span>
            </article>
          </div>
        </div>
      </section>

      <section class="closing-section section-shell">
        <img src="/rollingplan-icon.png" alt="RollingPlan 应用图标" />
        <span class="section-kicker">ROLL WITH THE PLAN</span>
        <h2>先开始，再在行动中<br />找到更好的路。</h2>
        <p>RollingPlan 正在持续完善。如果你也在寻找一种更轻、更灵活的长期计划方式，欢迎关注它的下一步。</p>
        <router-link to="/products" class="primary-button">查看我的其他产品 <span>↗</span></router-link>
      </section>
    </main>

    <footer class="footer">
      <div class="brand footer-brand"><img src="/rollingplan-icon.png" alt="" /><span>RollingPlan</span></div>
      <p>为长期主义者，做一个能随行动生长的计划。</p>
      <router-link to="/products">© {{ new Date().getFullYear() }} algernon</router-link>
    </footer>
  </div>
</template>

<style scoped>
:global(html) { scroll-behavior: smooth; }
:global(body) { margin: 0; }

.rolling-plan-page {
  --ink: #141220;
  --muted: #6e6a7c;
  --purple: #6752e8;
  --purple-deep: #4c34d9;
  --lavender: #f1eeff;
  --line: rgba(34, 27, 68, 0.11);
  min-height: 100vh;
  overflow: hidden;
  color: var(--ink);
  background: #fbfaff;
  font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.topbar {
  width: min(1180px, calc(100% - 48px));
  height: 88px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
}

.brand { display: inline-flex; align-items: center; gap: 11px; color: var(--ink); text-decoration: none; font-size: 18px; font-weight: 750; letter-spacing: -0.02em; }
.brand img { width: 34px; height: 34px; object-fit: cover; border-radius: 10px; box-shadow: 0 6px 18px rgba(83, 58, 220, 0.18); }
.topnav { display: flex; align-items: center; gap: 30px; }
.topnav a { color: #5e596a; text-decoration: none; font-size: 14px; font-weight: 550; transition: color .2s ease; }
.topnav a:hover { color: var(--purple); }
.topnav .back-link { padding: 10px 17px; border: 1px solid var(--line); border-radius: 999px; background: rgba(255,255,255,.7); }

.hero { width: min(1180px, calc(100% - 48px)); min-height: 720px; margin: 0 auto; display: grid; grid-template-columns: .92fr 1.08fr; align-items: center; gap: 40px; position: relative; }
.hero-copy { position: relative; z-index: 2; padding-bottom: 35px; }
.eyebrow, .section-kicker { font-size: 12px; letter-spacing: .14em; text-transform: uppercase; font-weight: 750; color: var(--purple); }
.eyebrow { display: flex; align-items: center; gap: 9px; margin-bottom: 23px; }
.eyebrow > span { display: block; width: 22px; height: 2px; background: var(--purple); }
.hero h1 { margin: 0; font-size: clamp(48px, 5vw, 70px); line-height: 1.12; letter-spacing: -.055em; font-weight: 780; }
.hero h1 em { color: var(--purple); font-style: normal; }
.hero-description { margin: 26px 0 0; color: var(--muted); font-size: 17px; line-height: 1.85; }
.hero-actions { display: flex; align-items: center; gap: 28px; margin-top: 34px; }
.primary-button { display: inline-flex; align-items: center; justify-content: center; gap: 14px; min-height: 50px; padding: 0 22px; border-radius: 12px; background: var(--ink); color: white; font-size: 14px; font-weight: 650; text-decoration: none; box-shadow: 0 12px 28px rgba(25,21,44,.16); transition: transform .2s ease, box-shadow .2s ease; }
.primary-button:hover { transform: translateY(-2px); box-shadow: 0 16px 34px rgba(25,21,44,.22); }
.primary-button span { color: #bfb5ff; font-size: 17px; }
.text-button { color: var(--ink); font-size: 14px; text-decoration: none; font-weight: 620; }
.text-button span { color: var(--purple); margin-left: 6px; }
.platform-note { display: flex; align-items: center; gap: 8px; margin-top: 30px; color: #8a8694; font-size: 12px; }
.status-dot { width: 6px; height: 6px; border-radius: 50%; background: #65bb88; box-shadow: 0 0 0 4px rgba(101,187,136,.12); }

.hero-glow { position: absolute; border-radius: 50%; filter: blur(2px); pointer-events: none; }
.glow-one { width: 470px; height: 470px; right: -90px; top: 60px; background: radial-gradient(circle, rgba(134,104,255,.17), rgba(134,104,255,0) 68%); }
.glow-two { width: 330px; height: 330px; left: 20%; bottom: -80px; background: radial-gradient(circle, rgba(214,193,255,.22), rgba(214,193,255,0) 70%); }

.hero-visual { min-height: 600px; position: relative; display: flex; align-items: center; justify-content: center; perspective: 1100px; }
.orbit { position: absolute; border: 1px solid rgba(103,82,232,.14); border-radius: 50%; transform: rotate(-13deg); }
.orbit-one { width: 570px; height: 350px; }
.orbit-two { width: 440px; height: 590px; }
.app-window { width: min(480px, 84%); min-height: 470px; border-radius: 24px; background: rgba(255,255,255,.88); border: 1px solid rgba(255,255,255,.9); box-shadow: 0 38px 90px rgba(67,49,154,.18), 0 10px 30px rgba(47,37,92,.08); backdrop-filter: blur(20px); transform: rotateY(-5deg) rotateX(2deg); overflow: hidden; position: relative; z-index: 2; }
.window-top { height: 58px; padding: 0 20px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; border-bottom: 1px solid rgba(37,29,74,.07); }
.window-dots { display: flex; gap: 6px; }
.window-dots span { width: 7px; height: 7px; border-radius: 50%; background: #ddd9ea; }
.window-title { font-size: 12px; font-weight: 700; }
.week-pill { justify-self: end; color: var(--purple); background: var(--lavender); border-radius: 999px; padding: 5px 10px; font-size: 10px; font-weight: 700; }
.window-content { padding: 28px; }
.goal-heading { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.mini-label { font-size: 8px; letter-spacing: .14em; color: #a09aaa; font-weight: 750; }
.goal-heading h2 { font-size: 19px; letter-spacing: -.02em; margin: 7px 0 0; }
.progress-ring { width: 49px; height: 49px; border-radius: 50%; display: flex; align-items: baseline; justify-content: center; background: radial-gradient(circle at center, white 58%, transparent 60%), conic-gradient(var(--purple) 68%, #ece9f5 0); padding-top: 16px; box-sizing: border-box; }
.progress-ring strong { font-size: 11px; }.progress-ring small { font-size: 7px; color: #8b8497; }
.progress-line { height: 5px; margin: 20px 0 26px; border-radius: 999px; background: #efedf5; overflow: hidden; }
.progress-line span { display: block; width: 68%; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #725eea, #9c82ff); }
.now-card { background: linear-gradient(135deg, #6b56e9, #8067f0); color: white; padding: 21px 22px; border-radius: 17px; box-shadow: 0 18px 36px rgba(103,82,232,.25); }
.now-top { display: flex; align-items: center; justify-content: space-between; font-size: 10px; color: #ded8ff; }
.now-top b { font-size: 25px; color: rgba(255,255,255,.2); }
.now-card > p { font-size: 15px; line-height: 1.55; font-weight: 650; margin: 13px 0 18px; max-width: 300px; }
.task-meta { display: flex; justify-content: space-between; color: #e2dcff; font-size: 9px; }
.task-meta span:last-child { padding: 4px 7px; border-radius: 999px; background: rgba(255,255,255,.13); }
.next-row { display: grid; grid-template-columns: 27px 1fr auto; align-items: center; gap: 11px; padding: 18px 4px 14px; border-bottom: 1px solid rgba(31,24,62,.07); }
.next-row small { color: #aaa5b4; font-size: 9px; }.next-row p { margin: 3px 0 0; font-size: 11px; font-weight: 620; }
.checkmark, .empty-check { width: 22px; height: 22px; display: grid; place-items: center; border-radius: 7px; }
.checkmark { color: var(--purple); background: var(--lavender); font-size: 11px; font-weight: 800; }.empty-check { border: 1px solid #ddd9e8; box-sizing: border-box; }
.done { color: #8a8494; font-size: 8px; background: #f3f1f7; border-radius: 999px; padding: 4px 7px; }.next-row .arrow { color: var(--purple); }.next-row.muted { opacity: .72; }
.floating-card { position: absolute; z-index: 3; display: flex; align-items: center; gap: 11px; background: rgba(255,255,255,.93); border: 1px solid rgba(255,255,255,.95); box-shadow: 0 18px 45px rgba(62,45,142,.15); padding: 12px 15px; border-radius: 14px; backdrop-filter: blur(15px); }
.floating-card small, .floating-card strong { display: block; }.floating-card small { color: #aaa4b2; font-size: 8px; margin-bottom: 3px; }.floating-card strong { font-size: 10px; }
.floating-icon { width: 29px; height: 29px; border-radius: 9px; display: grid; place-items: center; color: #6a55e5; background: #eeeaff; font-size: 14px; }.floating-icon.purple { color: white; background: var(--purple); }
.floating-top { top: 88px; right: -5px; }.floating-bottom { left: -12px; bottom: 108px; }

.section-shell { width: min(1120px, calc(100% - 48px)); margin: 0 auto; }
.features-section { padding: 120px 0 130px; }
.section-intro { display: grid; grid-template-columns: .75fr 1.25fr; gap: 60px; align-items: start; margin-bottom: 64px; }
.section-intro h2 { margin: 0; font-size: clamp(34px, 4vw, 50px); line-height: 1.2; letter-spacing: -.045em; }
.feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line); }
.feature-card { padding: 32px 30px 10px 0; position: relative; min-height: 310px; border-right: 1px solid var(--line); }
.feature-card + .feature-card { padding-left: 30px; }.feature-card:last-child { border-right: 0; }
.feature-number { font-size: 10px; color: #aaa5b4; letter-spacing: .12em; }
.feature-mark { width: 62px; height: 62px; margin: 45px 0 36px; border-radius: 20px; display: grid; place-items: center; background: var(--lavender); transform: rotate(-7deg); }
.feature-mark span { display: block; width: 23px; height: 23px; border: 4px solid var(--purple); border-radius: 50%; box-sizing: border-box; }
.mark-02 { transform: rotate(7deg); background: #efeaff; }.mark-02 span { border-radius: 7px; border-width: 3px; transform: rotate(45deg); }
.mark-03 { transform: rotate(-4deg); }.mark-03 span { border: 0; border-radius: 0; width: 26px; height: 15px; border-left: 4px solid var(--purple); border-bottom: 4px solid var(--purple); transform: rotate(-45deg) translate(2px,-3px); }
.feature-card h3 { font-size: 19px; margin: 0 0 13px; letter-spacing: -.025em; }.feature-card p { margin: 0; max-width: 280px; color: var(--muted); font-size: 14px; line-height: 1.75; }

.workflow-section { background: var(--ink); color: white; padding: 125px 0; position: relative; }
.workflow-section::after { content: ''; position: absolute; width: 440px; height: 440px; right: -170px; top: 80px; background: radial-gradient(circle, rgba(120,92,240,.28), transparent 68%); }
.workflow-shell { display: grid; grid-template-columns: .9fr 1.1fr; gap: 120px; position: relative; z-index: 2; }
.workflow-copy { position: sticky; top: 60px; align-self: start; }
.workflow-copy .section-kicker { color: #a998ff; }.workflow-copy h2 { margin: 23px 0 24px; font-size: clamp(37px, 4vw, 52px); line-height: 1.18; letter-spacing: -.045em; }.workflow-copy > p { color: #a9a5b6; max-width: 430px; font-size: 15px; line-height: 1.85; }
.steps-list { border-top: 1px solid rgba(255,255,255,.12); }
.step-item { display: grid; grid-template-columns: 42px 1fr auto; gap: 25px; align-items: center; padding: 29px 0; border-bottom: 1px solid rgba(255,255,255,.12); }
.step-index { color: #7e778c; font-size: 10px; letter-spacing: .12em; }.step-item h3 { margin: 0 0 7px; font-size: 18px; }.step-item p { margin: 0; color: #928d9e; font-size: 13px; }.step-arrow { width: 33px; height: 33px; border: 1px solid rgba(255,255,255,.15); border-radius: 50%; display: grid; place-items: center; color: #a99bff; }

.closing-section { padding: 140px 0 130px; text-align: center; }
.closing-section img { width: 82px; height: 82px; object-fit: cover; border-radius: 24px; box-shadow: 0 20px 45px rgba(93,64,222,.2); margin-bottom: 28px; }
.closing-section .section-kicker { display: block; }.closing-section h2 { margin: 22px 0; font-size: clamp(40px, 5vw, 60px); line-height: 1.16; letter-spacing: -.05em; }.closing-section p { max-width: 590px; margin: 0 auto 33px; color: var(--muted); font-size: 15px; line-height: 1.85; }.closing-section .primary-button { background: var(--purple); }
.footer { width: min(1180px, calc(100% - 48px)); margin: 0 auto; padding: 30px 0 38px; border-top: 1px solid var(--line); display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 20px; }
.footer-brand img { width: 26px; height: 26px; border-radius: 8px; }.footer-brand { font-size: 15px; }.footer p { margin: 0; color: #8f8998; font-size: 11px; text-align: center; }.footer > a { justify-self: end; color: #8f8998; font-size: 11px; text-decoration: none; }

@media (max-width: 980px) {
  .hero { grid-template-columns: 1fr; padding: 70px 0 100px; }
  .hero-copy { text-align: center; }.eyebrow, .hero-actions, .platform-note { justify-content: center; }.hero-visual { min-height: 570px; max-width: 680px; width: 100%; margin: 0 auto; }
  .section-intro { grid-template-columns: 1fr; gap: 22px; }.workflow-shell { grid-template-columns: 1fr; gap: 65px; }.workflow-copy { position: static; }.workflow-copy > p { max-width: 600px; }
}

@media (max-width: 700px) {
  .topbar { height: 72px; width: min(100% - 32px, 1180px); }.topnav > a:not(.back-link) { display: none; }.topnav .back-link { padding: 8px 13px; }
  .hero { width: min(100% - 32px, 1180px); padding: 54px 0 80px; min-height: auto; }.hero h1 { font-size: 44px; }.hero-description { font-size: 15px; }.desktop-only { display: none; }.hero-actions { flex-direction: column; gap: 18px; }.hero-visual { min-height: 470px; margin-top: 10px; }.app-window { width: 94%; min-height: 430px; }.window-content { padding: 22px 18px; }.floating-top { right: -30px; top: 35px; }.floating-bottom { left: -20px; bottom: 25px; }.orbit-one { width: 460px; }.orbit-two { width: 330px; height: 460px; }
  .section-shell { width: min(100% - 32px, 1120px); }.features-section { padding: 90px 0; }.section-intro { margin-bottom: 42px; }.feature-grid { grid-template-columns: 1fr; }.feature-card, .feature-card + .feature-card { padding: 28px 0 42px; min-height: 0; border-right: 0; border-bottom: 1px solid var(--line); }.feature-mark { margin: 30px 0 24px; }
  .workflow-section { padding: 90px 0; }.workflow-shell { gap: 50px; }.step-item { grid-template-columns: 30px 1fr auto; gap: 12px; }.step-item p { line-height: 1.5; }
  .closing-section { padding: 100px 0 90px; }.closing-section h2 { font-size: 42px; }
  .footer { width: min(100% - 32px, 1180px); grid-template-columns: 1fr auto; }.footer p { display: none; }
}

@media (max-width: 420px) {
  .brand { font-size: 16px; }.brand img { width: 30px; height: 30px; }.hero h1 { font-size: 38px; }.hero-visual { min-height: 440px; }.floating-card { transform: scale(.88); }.floating-top { right: -42px; }.floating-bottom { left: -35px; }.goal-heading h2 { font-size: 16px; }.now-card > p { font-size: 13px; }
}

@media (prefers-reduced-motion: reduce) {
  :global(html) { scroll-behavior: auto; }
  .primary-button { transition: none; }
}
</style>
