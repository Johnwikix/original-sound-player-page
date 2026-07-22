<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import GlowButton from '../ui/GlowButton.vue'
import ShaderBackground from './ShaderBackground.vue'
import { heroFragmentSource } from './shaders/hero'

const { t, locale } = useI18n()
const title = ref<HTMLElement | null>(null)
const reducedMotion = ref(false)

const titleChars = computed(() => {
  const text = t('home.hero.title')
  return text.split('')
})

const charDelay = computed(() =>
  reducedMotion.value ? 0 : Math.min(0.04, 0.6 / Math.max(titleChars.value.length, 1)),
)

onMounted(() => {
  if (title.value) {
    title.value.classList.add('animate-in')
  }
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.value = mql.matches
  mql.addEventListener('change', (ev) => {
    reducedMotion.value = ev.matches
  })
})
</script>

<template>
  <section class="hero-section">
    <div class="hero-bg" aria-hidden="true">
      <ShaderBackground :fragment-source="heroFragmentSource" />
    </div>

    <div class="hero-content">
      <div class="hero-eyebrow">
        <span class="eyebrow-dot"></span>
        {{ t('home.hero.eyebrow') }}
      </div>

      <h1 class="hero-title" ref="title">
        <span
          v-for="(char, index) in titleChars"
          :key="`${locale}-${index}`"
          class="title-char"
          :style="{ animationDelay: `${index * charDelay}s` }"
          >{{ char === ' ' ? ' ' : char }}</span
        >
      </h1>

      <p class="hero-subtitle">{{ t('home.hero.subtitle') }}</p>

      <div class="hero-cta">
        <GlowButton
          href="https://apps.microsoft.com/detail/9nfw1rppt999?referrer=appbadge&mode=direct"
          variant="primary"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {{ t('home.hero.cta_primary') }}
        </GlowButton>

        <GlowButton
          href="https://github.com/Johnwikix/original-sound-hq-player"
          variant="secondary"
          rel="noopener"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"
            />
          </svg>
          {{ t('home.hero.cta_secondary') }}
        </GlowButton>
      </div>

      <div class="hero-meta">
        <span class="meta-item">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          WinUI 3
        </span>
        <span class="meta-divider" aria-hidden="true">·</span>
        <span class="meta-item">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
          10+ {{ t('home.meta.formats') }}
        </span>
        <span class="meta-divider" aria-hidden="true">·</span>
        <span class="meta-item">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          {{ t('home.meta.audio') }}
        </span>
      </div>
    </div>

    <div class="scroll-indicator" aria-hidden="true">
      <span class="scroll-text">{{ t('home.hero.scroll') }}</span>
      <span class="scroll-arrow"></span>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100dvh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(env(safe-area-inset-top, 0px) + var(--header-height) + var(--space-7))
    var(--space-6) calc(env(safe-area-inset-bottom, 0px) + var(--space-7));
  overflow: hidden;
}

@supports not (height: 100dvh) {
  .hero-section {
    min-height: 100vh;
  }
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-5);
  width: 100%;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--accent-soft);
  border: 1px solid rgba(131, 54, 230, 0.3);
  border-radius: var(--r-full);
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

.hero-title {
  font-size: clamp(36px, 8vw, 96px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.04em;
  color: var(--text-primary);
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-wrap: balance;
  background: linear-gradient(180deg, #ffffff 0%, #c9d1d9 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  word-break: break-word;
}

.title-char {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: char-rise 0.6s var(--ease-out) forwards;
  padding-bottom: 10px;
}

@keyframes char-rise {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .title-char {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

.hero-subtitle {
  font-size: clamp(15px, 1.4vw, 20px);
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 640px;
  margin: 0;
  text-wrap: pretty;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: center;
  margin-top: var(--space-3);
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: 13px;
  color: var(--text-muted);
  margin-top: var(--space-4);
  flex-wrap: wrap;
  justify-content: center;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  white-space: nowrap;
}

.meta-divider {
  color: var(--text-faint);
}

.scroll-indicator {
  position: absolute;
  bottom: calc(env(safe-area-inset-bottom, 0px) + var(--space-6));
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  z-index: 1;
}

.scroll-text {
  font-size: 11px;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.scroll-arrow {
  width: 1px;
  height: 32px;
  background: linear-gradient(180deg, var(--accent), transparent);
  position: relative;
  overflow: hidden;
}

.scroll-arrow::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: var(--accent);
  animation: scroll-line 2s ease-in-out infinite;
}

@keyframes scroll-line {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(200%);
  }
}

@media (max-width: 768px) {
  .hero-meta {
    font-size: 12px;
    gap: var(--space-2);
  }
}

@media (max-width: 640px) {
  .hero-section {
    padding-left: var(--space-4);
    padding-right: var(--space-4);
  }

  .hero-cta {
    flex-direction: column;
    width: 100%;
  }

  .hero-cta :deep(.glow-button) {
    width: 100%;
  }
}

@media (max-width: 380px) {
  .hero-meta {
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
  }

  .meta-divider {
    display: none;
  }
}
</style>
