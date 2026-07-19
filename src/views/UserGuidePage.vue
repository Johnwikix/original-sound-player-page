<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import PageLayout from '../components/layout/PageLayout.vue';
import DocSidebar from '../components/doc/DocSidebar.vue';
import SettingItem from '../components/doc/SettingItem.vue';
import { settingsDocs } from '../data/settingsDocs';

const { locale, t } = useI18n();

const chapterRefs = ref<Record<string, HTMLElement | null>>({});
const activeKey = ref(settingsDocs[0].key);

const localizedChapters = computed(() =>
  settingsDocs.map((c) => ({
    ...c,
    title: t(`guide.chapters.${c.key}.title`),
    intro: t(`guide.chapters.${c.key}.intro`)
  }))
);

const handleSelect = (key: string) => {
  activeKey.value = key;
  nextTick(() => {
    const el = chapterRefs.value[key];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
};

watch(locale, () => {
  // re-render localized titles
});
</script>

<template>
  <PageLayout>
    <div class="guide-page">
      <div class="guide-hero">
        <div class="guide-hero-inner">
          <div class="guide-eyebrow">{{ t('guide.eyebrow') }}</div>
          <h1 class="guide-title">{{ t('guide.title') }}</h1>
          <p class="guide-intro">{{ t('guide.intro') }}</p>

          <div class="guide-stats">
            <div class="guide-stat">
              <div class="stat-num">{{ settingsDocs.length }}</div>
              <div class="stat-label">{{ t('guide.stat.chapters') }}</div>
            </div>
            <div class="guide-stat">
              <div class="stat-num">{{ settingsDocs.reduce((sum, c) => sum + c.items.length, 0) }}+</div>
              <div class="stat-label">{{ t('guide.stat.settings') }}</div>
            </div>
            <div class="guide-stat">
              <div class="stat-num">2</div>
              <div class="stat-label">{{ t('guide.stat.langs') }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="guide-content">
        <DocSidebar
          :chapters="settingsDocs"
          :active-key="activeKey"
          @select="handleSelect"
        />

        <main class="guide-main">
          <section
            v-for="chapter in localizedChapters"
            :id="`chapter-${chapter.key}`"
            :key="chapter.key"
            :ref="(el) => { chapterRefs[chapter.key] = el as HTMLElement; }"
            class="chapter"
          >
            <header class="chapter-header">
              <div class="chapter-number">{{ chapter.number }}</div>
              <div class="chapter-icon">{{ chapter.icon }}</div>
              <div>
                <h2 class="chapter-title">{{ chapter.title }}</h2>
                <p class="chapter-intro">{{ chapter.intro }}</p>
              </div>
            </header>

            <div class="chapter-items">
              <SettingItem
                v-for="(item, idx) in chapter.items"
                :key="idx"
                :item="item"
              />
            </div>
          </section>

          <div class="guide-footer">
            <div class="footer-divider"></div>
            <p class="footer-text">{{ t('guide.footer_text') }}</p>
          </div>
        </main>
      </div>
    </div>
  </PageLayout>
</template>

<style scoped>
.guide-page {
  width: 100%;
}

.guide-hero {
  position: relative;
  padding: calc(var(--header-height) + var(--space-8)) var(--space-6) var(--space-8);
  border-bottom: 1px solid var(--border-subtle);
  overflow: hidden;
}

.guide-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at top, var(--accent-soft), transparent 60%);
  pointer-events: none;
}

.guide-hero-inner {
  position: relative;
  max-width: var(--container-max);
  margin: 0 auto;
}

.guide-eyebrow {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--space-3);
}

.guide-title {
  font-size: clamp(36px, 5vw, 64px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin: 0 0 var(--space-4);
}

.guide-intro {
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 720px;
  margin: 0 0 var(--space-7);
}

.guide-stats {
  display: flex;
  gap: var(--space-7);
}

.guide-stat {
  display: flex;
  flex-direction: column;
}

.stat-num {
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: var(--space-2);
}

.guide-content {
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
  gap: var(--space-7);
  max-width: var(--container-max);
  margin: 0 auto;
  padding: var(--space-7) var(--space-6);
}

.guide-main {
  min-width: 0;
}

.chapter {
  margin-bottom: var(--space-9);
  scroll-margin-top: calc(var(--header-height) + var(--space-4));
}

.chapter:last-of-type {
  margin-bottom: 0;
}

.chapter-header {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
  padding-bottom: var(--space-5);
  margin-bottom: var(--space-6);
  border-bottom: 1px solid var(--border-subtle);
}

.chapter-number {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
  color: var(--accent);
  padding: var(--space-2) var(--space-3);
  border: 1px solid rgba(124, 58, 237, 0.3);
  background: var(--accent-soft);
  border-radius: var(--r-sm);
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.chapter-icon {
  font-size: 32px;
  flex-shrink: 0;
  line-height: 1;
}

.chapter-title {
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  line-height: 1.2;
  margin: 0 0 var(--space-2);
}

.chapter-intro {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

.chapter-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.guide-footer {
  margin-top: var(--space-8);
  text-align: center;
}

.footer-divider {
  width: 80px;
  height: 1px;
  background: var(--border-default);
  margin: 0 auto var(--space-5);
}

.footer-text {
  font-size: 14px;
  color: var(--text-muted);
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.6;
}

@media (max-width: 960px) {
  .guide-content {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .guide-stats {
    flex-wrap: wrap;
    gap: var(--space-5);
  }
}
</style>