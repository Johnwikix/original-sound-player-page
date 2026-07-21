<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import GlowButton from '../ui/GlowButton.vue'
import SpectrumBars from '../ui/SpectrumBars.vue'
import visualizationImage from '../../assets/visualization.png'
import { useReveal } from '../../composables/useReveal'

const { t } = useI18n()
const { elementRef, isVisible } = useReveal()
</script>

<template>
  <section class="spectrum-section">
    <div class="spectrum-bg" aria-hidden="true">
      <div class="spectrum-blob spectrum-blob-1"></div>
      <div class="spectrum-blob spectrum-blob-2"></div>
    </div>

    <div ref="elementRef" class="spectrum-container reveal-base" :class="{ revealed: isVisible }">
      <div class="spectrum-grid">
        <div class="spectrum-content" data-reveal-child :style="{ '--i': 0 }">
          <div class="section-eyebrow">{{ t('home.spectrum.eyebrow') }}</div>
          <h2 class="section-title">{{ t('home.spectrum.title') }}</h2>
          <p class="section-description">{{ t('home.spectrum.content') }}</p>

          <div class="spectrum-features">
            <div class="mini-feature">
              <div class="mini-dot"></div>
              <div>
                <div class="mini-title">{{ t('home.spectrum.feat1_title') }}</div>
                <div class="mini-desc">{{ t('home.spectrum.feat1_desc') }}</div>
              </div>
            </div>
            <div class="mini-feature">
              <div class="mini-dot"></div>
              <div>
                <div class="mini-title">{{ t('home.spectrum.feat2_title') }}</div>
                <div class="mini-desc">{{ t('home.spectrum.feat2_desc') }}</div>
              </div>
            </div>
            <div class="mini-feature">
              <div class="mini-dot"></div>
              <div>
                <div class="mini-title">{{ t('home.spectrum.feat3_title') }}</div>
                <div class="mini-desc">{{ t('home.spectrum.feat3_desc') }}</div>
              </div>
            </div>
          </div>

          <div class="spectrum-actions">
            <GlowButton
              href="https://apps.microsoft.com/detail/9pl2dshj79w7?referrer=appbadge&mode=direct"
              variant="primary"
            >
              {{ t('home.spectrum.cta_primary') }}
            </GlowButton>
            <GlowButton to="/visualization" variant="secondary">
              {{ t('home.spectrum.cta_secondary') }}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </GlowButton>
          </div>
        </div>

        <div class="spectrum-visual" data-reveal-child :style="{ '--i': 1 }">
          <div class="visual-card">
            <div class="visual-image-wrapper">
              <img
                :src="visualizationImage"
                :alt="t('home.spectrum.title')"
                width="1280"
                height="800"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="visual-spectrogram">
              <SpectrumBars :bars="48" :height="64" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.spectrum-section {
  padding: var(--space-9) var(--space-6);
  position: relative;
  overflow: hidden;
}

.spectrum-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.spectrum-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
}

.spectrum-blob-1 {
  width: 600px;
  height: 600px;
  background: var(--accent);
  top: -200px;
  right: -200px;
}

.spectrum-blob-2 {
  width: 500px;
  height: 500px;
  background: var(--accent-2);
  bottom: -200px;
  left: -200px;
}

.spectrum-container {
  max-width: var(--container-max);
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.spectrum-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-7);
  align-items: center;
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

.section-description {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0 0 var(--space-5);
}

.spectrum-features {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.mini-feature {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
}

.mini-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  margin-top: 8px;
  flex-shrink: 0;
  box-shadow: 0 0 12px var(--accent);
}

.mini-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.mini-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
}

.spectrum-actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.spectrum-visual {
  position: relative;
}

.visual-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--r-lg);
  padding: var(--space-3);
  box-shadow:
    0 0 80px rgba(131, 54, 230, 0.1),
    0 30px 80px rgba(0, 0, 0, 0.4);
}

.visual-image-wrapper {
  border-radius: var(--r-md);
  overflow: hidden;
  background: var(--bg-base);
  aspect-ratio: 16 / 10;
}

.visual-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.visual-spectrogram {
  margin-top: var(--space-3);
  padding: var(--space-3);
  background: var(--bg-base);
  border-radius: var(--r-md);
}

@media (max-width: 900px) {
  .spectrum-grid {
    grid-template-columns: 1fr;
  }
  .spectrum-section {
    padding: var(--space-8) var(--space-4);
  }
  .spectrum-actions {
    flex-direction: column;
    width: 100%;
  }
  .spectrum-actions :deep(.glow-button) {
    width: 100%;
  }
}

@media (max-width: 720px) {
  .spectrum-blob {
    filter: blur(70px);
    opacity: 0.25;
  }
  .spectrum-blob-1 {
    width: 360px;
    height: 360px;
    top: -120px;
    right: -120px;
  }
  .spectrum-blob-2 {
    width: 300px;
    height: 300px;
    bottom: -120px;
    left: -80px;
  }
}
</style>
