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
          <h1>一款管理长期目标并可视化推进过程的本地存储、离线 ios app</h1>
          <p class="hero-description">
            RollingPlan 帮你把长期方向变成清晰的下一步，<br class="desktop-only" />
            在每一次行动与回顾中，持续校准、持续推进。
          </p>
          <div class="hero-actions">
            <a href="#workflow" class="primary-button">看看它如何工作 <span>↓</span></a>
          </div>
          <div class="platform-note"><span class="status-dot"></span> 使用 SwiftUI 构建 · 正在持续打磨</div>
        </div>

        <div class="hero-visual">
          <div class="icon-halo" aria-hidden="true"></div>
          <img class="hero-app-icon" src="/rollingplan-icon.png" alt="RollingPlan 应用图标" />
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
      </section>
    </main>

    <footer class="footer">
      <div class="brand footer-brand"><img src="/rollingplan-icon.png" alt="" /><span>RollingPlan</span></div>
      <p>为长期主义者，做一个能随行动生长的计划。</p>
      <a class="footer-contact" href="mailto:rollingplan@163.com">联系：rollingplan@163.com</a>
      <span class="footer-copyright">© {{ new Date().getFullYear() }} algernon</span>
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
  --purple-soft: #7569a8;
  --purple-soft-deep: #5f557f;
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
.section-kicker { font-size: 12px; letter-spacing: .14em; text-transform: uppercase; font-weight: 750; color: var(--purple); }
.hero h1 { margin: 0; max-width: 620px; font-size: clamp(42px, 4.2vw, 58px); line-height: 1.22; letter-spacing: -.04em; font-weight: 760; text-wrap: balance; }
.hero-description { margin: 26px 0 0; color: var(--muted); font-size: 17px; line-height: 1.85; }
.hero-actions { display: flex; align-items: center; gap: 28px; margin-top: 34px; }
.primary-button { display: inline-flex; align-items: center; justify-content: center; gap: 14px; min-height: 50px; padding: 0 22px; border-radius: 12px; background: var(--purple-soft); color: white; font-size: 14px; font-weight: 650; text-decoration: none; box-shadow: 0 12px 28px rgba(87,75,128,.2); transition: transform .2s ease, box-shadow .2s ease; }
.primary-button:hover { transform: translateY(-2px); box-shadow: 0 16px 34px rgba(87,75,128,.28); }
.primary-button span { color: #ddd7f4; font-size: 17px; }
.platform-note { display: flex; align-items: center; gap: 8px; margin-top: 30px; color: #8a8694; font-size: 12px; }
.status-dot { width: 6px; height: 6px; border-radius: 50%; background: #65bb88; box-shadow: 0 0 0 4px rgba(101,187,136,.12); }

.hero-glow { position: absolute; border-radius: 50%; filter: blur(2px); pointer-events: none; }
.glow-one { width: 470px; height: 470px; right: -90px; top: 60px; background: radial-gradient(circle, rgba(134,104,255,.17), rgba(134,104,255,0) 68%); }
.glow-two { width: 330px; height: 330px; left: 20%; bottom: -80px; background: radial-gradient(circle, rgba(214,193,255,.22), rgba(214,193,255,0) 70%); }

.hero-visual { min-height: 600px; position: relative; display: flex; align-items: center; justify-content: center; }
.icon-halo { position: absolute; width: min(510px, 92%); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, rgba(123, 91, 239, .18), rgba(180, 155, 255, .08) 48%, transparent 72%); }
.hero-app-icon { position: relative; z-index: 1; width: min(400px, 72%); aspect-ratio: 1; object-fit: cover; border-radius: 30%; box-shadow: 0 40px 90px rgba(84, 57, 190, .2), 0 12px 34px rgba(62, 45, 142, .12); }

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

.workflow-section { background: #fbfaff; color: var(--ink); padding: 125px 0; position: relative; }
.workflow-shell { display: grid; grid-template-columns: .9fr 1.1fr; gap: 120px; position: relative; z-index: 2; }
.workflow-copy { position: sticky; top: 60px; align-self: start; }
.workflow-copy .section-kicker { color: var(--purple-soft); }.workflow-copy h2 { margin: 23px 0 24px; font-size: clamp(37px, 4vw, 52px); line-height: 1.18; letter-spacing: -.045em; }.workflow-copy > p { color: var(--muted); max-width: 430px; font-size: 15px; line-height: 1.85; }
.steps-list { border-top: 1px solid var(--line); }
.step-item { display: grid; grid-template-columns: 42px 1fr auto; gap: 25px; align-items: center; padding: 29px 0; border-bottom: 1px solid var(--line); }
.step-index { color: #9690a2; font-size: 10px; letter-spacing: .12em; }.step-item h3 { margin: 0 0 7px; font-size: 18px; }.step-item p { margin: 0; color: var(--muted); font-size: 13px; }.step-arrow { width: 33px; height: 33px; border: 1px solid var(--line); border-radius: 50%; display: grid; place-items: center; color: var(--purple-soft); }

.closing-section { padding: 140px 0 130px; text-align: center; }
.closing-section img { width: 82px; height: 82px; object-fit: cover; border-radius: 24px; box-shadow: 0 20px 45px rgba(93,64,222,.2); margin-bottom: 28px; }
.closing-section .section-kicker { display: block; }.closing-section h2 { margin: 22px 0; font-size: clamp(40px, 5vw, 60px); line-height: 1.16; letter-spacing: -.05em; }.closing-section p { max-width: 590px; margin: 0 auto; color: var(--muted); font-size: 15px; line-height: 1.85; }
.footer { width: min(1180px, calc(100% - 48px)); margin: 0 auto; padding: 30px 0 38px; border-top: 1px solid var(--line); display: grid; grid-template-columns: auto 1fr auto auto; align-items: center; gap: 28px; }
.footer-brand img { width: 26px; height: 26px; border-radius: 8px; }.footer-brand { font-size: 15px; }.footer p { margin: 0; color: #8f8998; font-size: 11px; text-align: center; }.footer-contact, .footer-copyright { color: #8f8998; font-size: 11px; }.footer-contact { text-decoration: none; transition: color .2s ease; }.footer-contact:hover { color: var(--purple-soft); }.footer-copyright { justify-self: end; }

@media (max-width: 980px) {
  .hero { grid-template-columns: 1fr; padding: 70px 0 100px; }
  .hero-copy { text-align: center; }.hero-actions, .platform-note { justify-content: center; }.hero h1 { margin-inline: auto; }.hero-visual { min-height: 570px; max-width: 680px; width: 100%; margin: 0 auto; }
  .section-intro { grid-template-columns: 1fr; gap: 22px; }.workflow-shell { grid-template-columns: 1fr; gap: 65px; }.workflow-copy { position: static; }.workflow-copy > p { max-width: 600px; }
}

@media (max-width: 700px) {
  .topbar { height: 72px; width: min(100% - 32px, 1180px); }.topnav > a:not(.back-link) { display: none; }.topnav .back-link { padding: 8px 13px; }
  .hero { width: min(100% - 32px, 1180px); padding: 54px 0 80px; min-height: auto; }.hero h1 { font-size: 40px; line-height: 1.24; }.hero-description { font-size: 15px; }.desktop-only { display: none; }.hero-actions { flex-direction: column; gap: 18px; }.hero-visual { min-height: 440px; margin-top: 10px; }.hero-app-icon { width: min(340px, 78%); }
  .section-shell { width: min(100% - 32px, 1120px); }.features-section { padding: 90px 0; }.section-intro { margin-bottom: 42px; }.feature-grid { grid-template-columns: 1fr; }.feature-card, .feature-card + .feature-card { padding: 28px 0 42px; min-height: 0; border-right: 0; border-bottom: 1px solid var(--line); }.feature-mark { margin: 30px 0 24px; }
  .workflow-section { padding: 90px 0; }.workflow-shell { gap: 50px; }.step-item { grid-template-columns: 30px 1fr auto; gap: 12px; }.step-item p { line-height: 1.5; }
  .closing-section { padding: 100px 0 90px; }.closing-section h2 { font-size: 42px; }
  .footer { width: min(100% - 32px, 1180px); grid-template-columns: 1fr auto; gap: 16px; }.footer p { display: none; }.footer-contact { grid-column: 1 / -1; grid-row: 2; justify-self: start; }
}

@media (max-width: 420px) {
  .brand { font-size: 16px; }.brand img { width: 30px; height: 30px; }.hero h1 { font-size: 34px; }.hero-visual { min-height: 380px; }
}

@media (prefers-reduced-motion: reduce) {
  :global(html) { scroll-behavior: auto; }
  .primary-button { transition: none; }
}
</style>
