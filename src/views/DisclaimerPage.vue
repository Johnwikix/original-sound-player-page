<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageLayout from '../components/layout/PageLayout.vue'

const { tm, t } = useI18n()

const sections = tm('disclaimer.sections') as Record<
  string,
  { title: string; paragraphs: string[] }
>

const sectionKeys = Object.keys(sections)
</script>

<template>
  <PageLayout>
    <div class="disclaimer-page">
      <div class="disclaimer-hero">
        <div class="disclaimer-hero-inner">
          <div class="disclaimer-eyebrow">{{ t('disclaimer.eyebrow') }}</div>
          <h1 class="disclaimer-title">{{ t('disclaimer.title') }}</h1>
          <p class="disclaimer-subtitle">{{ t('disclaimer.subtitle') }}</p>
          <div class="disclaimer-meta">{{ t('disclaimer.lastUpdated') }}</div>
        </div>
      </div>

      <div class="disclaimer-content">
        <article class="disclaimer-document">
          <section
            v-for="key in sectionKeys"
            :id="`section-${key}`"
            :key="key"
            class="disclaimer-section"
          >
            <h2 class="section-title">{{ sections[key].title }}</h2>
            <p
              v-for="(para, idx) in sections[key].paragraphs"
              :key="idx"
              class="section-paragraph"
            >
              {{ para }}
            </p>
          </section>
        </article>
      </div>
    </div>
  </PageLayout>
</template>

<style scoped>
.disclaimer-page {
  width: 100%;
}

.disclaimer-hero {
  padding: calc(env(safe-area-inset-top, 0px) + var(--header-height) + var(--space-8))
    var(--space-6) var(--space-7);
  border-bottom: 1px solid var(--border-subtle);
  position: relative;
  overflow: hidden;
}

.disclaimer-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at top right, var(--accent-2-soft), transparent 60%);
  pointer-events: none;
}

.disclaimer-hero-inner {
  position: relative;
  max-width: var(--container-max);
  margin: 0 auto;
}

.disclaimer-eyebrow {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--space-3);
}

.disclaimer-title {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin: 0 0 var(--space-4);
}

.disclaimer-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 760px;
  line-height: 1.6;
  margin: 0 0 var(--space-5);
}

.disclaimer-meta {
  font-size: 12px;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: var(--font-mono);
}

.disclaimer-content {
  max-width: 820px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}

.disclaimer-document {
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
}

.disclaimer-section {
  padding-bottom: var(--space-6);
  border-bottom: 1px solid var(--border-subtle);
}

.disclaimer-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.section-title {
  font-size: clamp(20px, 2.4vw, 26px);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  margin: 0 0 var(--space-4);
  scroll-margin-top: calc(env(safe-area-inset-top, 0px) + var(--header-height) + var(--space-5));
}

.section-paragraph {
  font-size: 15px;
  line-height: 1.85;
  color: var(--text-secondary);
  margin: 0 0 var(--space-4);
}

.section-paragraph:last-child {
  margin-bottom: 0;
}

@media (max-width: 640px) {
  .disclaimer-hero {
    padding-left: var(--space-4);
    padding-right: var(--space-4);
  }
  .disclaimer-content {
    padding: var(--space-7) var(--space-4);
  }
  .section-paragraph {
    font-size: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-title,
  .section-paragraph {
    transition: none !important;
    animation: none !important;
  }
}
</style>