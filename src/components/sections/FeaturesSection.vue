<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { featuresData } from '../../data/featuresData';

const { locale } = useI18n();

const features = computed(() =>
  featuresData.map((f) => ({
    ...f,
    title: locale.value === 'en' ? f.titleEn : f.title,
    content: locale.value === 'en' ? f.contentEn : f.content,
    image: locale.value === 'en' ? f.imageEn : f.image
  }))
);
</script>

<template>
  <section class="features-section">
    <div class="features-container">
      <div class="section-header">
        <div class="section-eyebrow">{{ $t('home.features.eyebrow') }}</div>
        <h2 class="section-title">{{ $t('home.features.title') }}</h2>
        <p class="section-subtitle">{{ $t('home.features.subtitle') }}</p>
      </div>

      <div class="features-list">
        <div
          v-for="(feature, index) in features"
          :key="feature.id"
          class="feature-row"
          :class="[`feature-${feature.accent}`, { reverse: index % 2 === 1 }]"
        >
          <div class="feature-text">
            <div class="feature-number">{{ String(index + 1).padStart(2, '0') }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-content">{{ feature.content }}</p>
          </div>

          <div class="feature-visual">
            <div class="feature-image-frame">
              <img
                :src="feature.image"
                :alt="feature.title"
                width="1280"
                height="800"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  padding: var(--space-9) var(--space-6);
  position: relative;
}

.features-container {
  max-width: var(--container-max);
  margin: 0 auto;
}

.section-header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto var(--space-8);
}

.section-eyebrow {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--space-3);
}

.section-title {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin: 0 0 var(--space-4);
  text-wrap: balance;
  word-break: break-word;
}

.section-subtitle {
  font-size: 16px;
  color: var(--text-muted);
  line-height: 1.6;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-9);
}

.feature-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-7);
  align-items: center;
}

.feature-row.reverse {
  direction: rtl;
}

.feature-row.reverse > * {
  direction: ltr;
}

.feature-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.feature-number {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.1em;
  font-family: var(--font-mono);
  width: fit-content;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--r-sm);
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
}

.feature-amber .feature-number {
  color: var(--accent);
  border-color: rgba(131, 54, 230, 0.4);
  background: var(--accent-soft);
}

.feature-cyan .feature-number {
  color: var(--accent-2);
  border-color: rgba(6, 182, 212, 0.4);
  background: var(--accent-2-soft);
}

.feature-violet .feature-number {
  color: var(--accent-violet);
  border-color: rgba(167, 139, 250, 0.4);
  background: rgba(167, 139, 250, 0.1);
}

.feature-title {
  font-size: clamp(24px, 2.5vw, 36px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  line-height: 1.2;
  margin: 0;
}

.feature-content {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
}

.feature-visual {
  position: relative;
}

.feature-image-frame {
  position: relative;
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  box-shadow: var(--shadow-lg);
  transition: transform var(--duration-base) var(--ease-out);
  aspect-ratio: 16 / 10;
}

@media (hover: hover) {
  .feature-image-frame:hover {
    transform: translateY(-4px);
  }
}

.feature-image-frame::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent, rgba(131, 54, 230, 0.04));
  pointer-events: none;
  z-index: 1;
}

.feature-image-frame img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.feature-amber .feature-image-frame {
  box-shadow:
    0 16px 60px rgba(0, 0, 0, 0.5),
    0 0 80px rgba(131, 54, 230, 0.15);
}

.feature-cyan .feature-image-frame {
  box-shadow:
    0 16px 60px rgba(0, 0, 0, 0.5),
    0 0 80px rgba(6, 182, 212, 0.15);
}

.feature-violet .feature-image-frame {
  box-shadow:
    0 16px 60px rgba(0, 0, 0, 0.5),
    0 0 80px rgba(167, 139, 250, 0.15);
}

@media (max-width: 900px) {
  .feature-row {
    grid-template-columns: 1fr;
    gap: var(--space-5);
  }
  .feature-row.reverse {
    direction: ltr;
  }
  .features-section {
    padding: var(--space-8) var(--space-4);
  }
  .features-list {
    gap: var(--space-7);
  }
}
</style>