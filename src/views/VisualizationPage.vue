<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageLayout from '../components/layout/PageLayout.vue'
import GlowButton from '../components/ui/GlowButton.vue'
import SpectrumBars from '../components/ui/SpectrumBars.vue'

const { t } = useI18n()
</script>

<template>
  <PageLayout>
    <div class="viz-page">
      <section class="viz-hero">
        <div class="viz-hero-bg">
          <div class="viz-blob viz-blob-1"></div>
          <div class="viz-blob viz-blob-2"></div>
        </div>
        <div class="viz-hero-inner">
          <div class="viz-eyebrow">{{ t('visualization.eyebrow') }}</div>
          <h1 class="viz-title">{{ t('visualization.title') }}</h1>
          <p class="viz-subtitle">{{ t('visualization.subtitle') }}</p>

          <div class="viz-actions">
            <GlowButton
              href="https://apps.microsoft.com/detail/9pl2dshj79w7?referrer=appbadge&mode=direct"
              variant="primary"
            >
              {{ t('visualization.cta_primary') }}
            </GlowButton>
            <GlowButton
              href="https://github.com/Johnwikix/SpectrumVisualization"
              variant="secondary"
            >
              {{ t('visualization.cta_secondary') }}
            </GlowButton>
          </div>

          <div class="viz-bars-wrap">
            <SpectrumBars :bars="56" :height="120" />
          </div>
        </div>
      </section>

      <section class="viz-showcase">
        <div class="viz-container">
          <div class="viz-image-frame">
            <img
              src="https://store-images.s-microsoft.com/image/apps.53500.14251122581188954.3f2cb392-8351-43be-862f-9c8d47c72a76.8d1b8b95-c774-4bdc-b4c7-6ec91ea776fb"
              :alt="t('visualization.title')"
              width="1280"
              height="720"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div class="viz-features">
            <h2 class="viz-section-title">{{ t('visualization.features.title') }}</h2>
            <div class="viz-feature-grid">
              <div class="viz-feature">
                <div class="viz-feature-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <line x1="6" y1="20" x2="6" y2="14" />
                    <line x1="12" y1="20" x2="12" y2="8" />
                    <line x1="18" y1="20" x2="18" y2="4" />
                  </svg>
                </div>
                <h3>{{ t('visualization.features.f1.title') }}</h3>
                <p>{{ t('visualization.features.f1.desc') }}</p>
              </div>
              <div class="viz-feature">
                <div class="viz-feature-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h3>{{ t('visualization.features.f2.title') }}</h3>
                <p>{{ t('visualization.features.f2.desc') }}</p>
              </div>
              <div class="viz-feature">
                <div class="viz-feature-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <h3>{{ t('visualization.features.f3.title') }}</h3>
                <p>{{ t('visualization.features.f3.desc') }}</p>
              </div>
              <div class="viz-feature">
                <div class="viz-feature-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                  </svg>
                </div>
                <h3>{{ t('visualization.features.f4.title') }}</h3>
                <p>{{ t('visualization.features.f4.desc') }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </PageLayout>
</template>

<style scoped>
.viz-page {
  width: 100%;
}

.viz-hero {
  position: relative;
  padding: calc(env(safe-area-inset-top, 0px) + var(--header-height) + var(--space-8))
    var(--space-6) var(--space-8);
  overflow: hidden;
  border-bottom: 1px solid var(--border-subtle);
}

.viz-hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.viz-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.4;
}

.viz-blob-1 {
  width: 600px;
  height: 600px;
  background: var(--accent-2);
  top: -200px;
  right: -100px;
}

.viz-blob-2 {
  width: 500px;
  height: 500px;
  background: var(--accent);
  bottom: -200px;
  left: -100px;
}

@media (max-width: 720px) {
  .viz-blob {
    filter: blur(80px);
    opacity: 0.3;
  }
  .viz-blob-1 {
    width: 360px;
    height: 360px;
    top: -120px;
    right: -80px;
  }
  .viz-blob-2 {
    width: 300px;
    height: 300px;
    bottom: -120px;
    left: -60px;
  }
}

.viz-hero-inner {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.viz-eyebrow {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent-2);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--space-3);
}

.viz-title {
  font-size: clamp(32px, 6vw, 80px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin: 0 0 var(--space-4);
  background: linear-gradient(180deg, #ffffff 0%, #c9d1d9 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-wrap: balance;
  word-break: break-word;
}

.viz-subtitle {
  font-size: clamp(15px, 1.3vw, 18px);
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 640px;
  margin: 0 auto var(--space-6);
}

.viz-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: var(--space-7);
}

.viz-bars-wrap {
  max-width: 700px;
  margin: 0 auto;
  padding: var(--space-4);
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--r-md);
}

.viz-showcase {
  padding: var(--space-9) var(--space-6);
}

.viz-container {
  max-width: var(--container-max);
  margin: 0 auto;
}

.viz-image-frame {
  border-radius: var(--r-lg);
  overflow: hidden;
  border: 1px solid var(--border-default);
  background: var(--bg-elevated);
  box-shadow:
    0 0 80px rgba(6, 182, 212, 0.15),
    0 30px 80px rgba(0, 0, 0, 0.5);
  margin-bottom: var(--space-8);
  aspect-ratio: 16 / 9;
}

.viz-image-frame img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.viz-section-title {
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--space-6);
  text-align: center;
}

.viz-feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.viz-feature {
  padding: var(--space-5);
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-md);
  transition: all var(--duration-fast) var(--ease-out);
}

.viz-feature:hover {
  border-color: rgba(6, 182, 212, 0.3);
  transform: translateY(-2px);
}

.viz-feature-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--r-sm);
  background: var(--accent-2-soft);
  color: var(--accent-2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-3);
}

.viz-feature h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 var(--space-2);
}

.viz-feature p {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 720px) {
  .viz-feature-grid {
    grid-template-columns: 1fr;
  }
  .viz-hero,
  .viz-showcase {
    padding-left: var(--space-4);
    padding-right: var(--space-4);
  }
  .viz-actions {
    flex-direction: column;
    width: 100%;
  }
  .viz-actions :deep(.glow-button) {
    width: 100%;
  }
  .viz-bars-wrap {
    padding: var(--space-3);
  }
}
</style>
