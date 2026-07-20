<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import PageLayout from '../components/layout/PageLayout.vue';
import GlowButton from '../components/ui/GlowButton.vue';
import { faqData } from '../data/faqData';

const { locale, t } = useI18n();
const openId = ref<number | null>(1);

const items = computed(() =>
  faqData
    .filter((item) => item.id !== 7 || locale.value === 'zh')
    .map((item) => ({
    ...item,
    question: locale.value === 'en' ? item.questionEn : item.question,
    steps: locale.value === 'en' ? item.stepsEn : item.steps,
    links: item.links?.map((l) => ({
      ...l,
      label: locale.value === 'en' ? l.labelEn : l.label
    }))
  }))
);

const toggle = (id: number) => {
  openId.value = openId.value === id ? null : id;
};
</script>

<template>
  <PageLayout>
    <div class="faq-page">
      <div class="faq-hero">
        <div class="faq-hero-inner">
          <div class="faq-eyebrow">{{ t('faq.eyebrow') }}</div>
          <h1 class="faq-title">{{ t('faq.title') }}</h1>
          <p class="faq-subtitle">{{ t('faq.subtitle') }}</p>

          <div class="faq-stats">
            <div class="faq-stat">
              <span class="faq-stat-num">{{ items.length }}</span>
              <span class="faq-stat-label">{{ t('faq.stat.questions') }}</span>
            </div>
            <div class="faq-stat-divider"></div>
            <div class="faq-stat">
              <span class="faq-stat-num">{{ items.reduce((sum, i) => sum + i.steps.length, 0) }}+</span>
              <span class="faq-stat-label">{{ t('faq.stat.steps') }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="faq-content">
        <div class="faq-list">
          <article
            v-for="item in items"
            :key="item.id"
            class="faq-item"
            :class="{ open: openId === item.id }"
          >
            <button class="faq-trigger" @click="toggle(item.id)">
              <span class="faq-number">Q{{ item.id }}</span>
              <span class="faq-question">{{ item.question }}</span>
              <span class="faq-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            <div v-show="openId === item.id" class="faq-body">
              <div class="faq-body-inner">
                <ol class="faq-steps">
                  <li v-for="(step, idx) in item.steps" :key="idx">{{ step }}</li>
                </ol>

                <div v-if="item.links && item.links.length" class="faq-links">
                  <div class="links-label">{{ t('faq.references') }}</div>
                  <div class="links-list">
                    <a
                      v-for="link in item.links"
                      :key="link.url"
                      :href="link.url"
                      target="_blank"
                      rel="nofollow"
                      class="faq-link"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      {{ link.label }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <aside class="faq-sidebar">
          <div class="sidebar-card">
            <h3 class="sidebar-title">{{ t('faq.sidebar.title') }}</h3>
            <p class="sidebar-text">{{ t('faq.sidebar.text') }}</p>
            <div class="sidebar-actions">
              <GlowButton to="/guide" variant="secondary">
                {{ t('faq.sidebar.guide') }}
              </GlowButton>
              <a
                href="https://github.com/Johnwikix/original-sound-hq-player/issues"
                target="_blank"
                rel="nofollow"
                class="sidebar-link"
              >
                {{ t('faq.sidebar.issue') }} →
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </PageLayout>
</template>

<style scoped>
.faq-page {
  width: 100%;
}

.faq-hero {
  padding: calc(var(--header-height) + var(--space-8)) var(--space-6) var(--space-7);
  border-bottom: 1px solid var(--border-subtle);
  position: relative;
  overflow: hidden;
}

.faq-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at top right, var(--accent-2-soft), transparent 60%);
  pointer-events: none;
}

.faq-hero-inner {
  position: relative;
  max-width: var(--container-max);
  margin: 0 auto;
}

.faq-eyebrow {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--space-3);
}

.faq-title {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin: 0 0 var(--space-4);
}

.faq-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 720px;
  line-height: 1.6;
  margin: 0 0 var(--space-7);
}

.faq-stats {
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.faq-stat {
  display: flex;
  flex-direction: column;
}

.faq-stat-num {
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}

.faq-stat-label {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: var(--space-2);
}

.faq-stat-divider {
  width: 1px;
  height: 32px;
  background: var(--border-default);
}

.faq-content {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: var(--space-7) var(--space-6);
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: var(--space-6);
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.faq-item {
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-md);
  overflow: hidden;
  transition: border-color var(--duration-fast) var(--ease-out);
}

.faq-item.open {
  border-color: rgba(131, 54, 230, 0.3);
  background: linear-gradient(180deg, var(--bg-elevated), #11111a);
}

.faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background: transparent;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
}

.faq-number {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
  padding: 4px 10px;
  background: var(--accent-soft);
  border-radius: var(--r-sm);
  flex-shrink: 0;
}

.faq-question {
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.faq-icon {
  color: var(--text-muted);
  transition: transform var(--duration-base) var(--ease-out);
  flex-shrink: 0;
}

.faq-item.open .faq-icon {
  transform: rotate(180deg);
  color: var(--accent);
}

.faq-body {
  border-top: 1px solid var(--border-subtle);
}

.faq-body-inner {
  padding: var(--space-5);
}

.faq-steps {
  list-style: none;
  counter-reset: step;
  padding: 0;
  margin: 0;
}

.faq-steps li {
  position: relative;
  padding-left: var(--space-7);
  margin-bottom: var(--space-3);
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-secondary);
}

.faq-steps li::before {
  counter-increment: step;
  content: counter(step);
  position: absolute;
  left: 0;
  top: 2px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--bg-overlay);
  border: 1px solid var(--border-default);
  color: var(--accent);
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
}

.faq-links {
  margin-top: var(--space-5);
  padding-top: var(--space-5);
  border-top: 1px solid var(--border-subtle);
}

.links-label {
  font-size: 11px;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-3);
}

.links-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.faq-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 13px;
  color: var(--accent);
  transition: color var(--duration-fast) var(--ease-out);
}

.faq-link:hover {
  color: var(--accent-hover);
}

.faq-sidebar {
  position: sticky;
  top: calc(var(--header-height) + var(--space-5));
  align-self: flex-start;
}

.sidebar-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--r-md);
  padding: var(--space-5);
}

.sidebar-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-3);
}

.sidebar-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--space-5);
}

.sidebar-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.sidebar-link {
  font-size: 13px;
  color: var(--text-muted);
  transition: color var(--duration-fast) var(--ease-out);
}

.sidebar-link:hover {
  color: var(--accent);
}

@media (max-width: 960px) {
  .faq-content {
    grid-template-columns: 1fr;
  }
  .faq-sidebar {
    position: static;
  }
}
</style>