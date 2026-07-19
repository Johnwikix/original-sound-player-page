<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<template>
  <section class="showcase-section">
    <div class="showcase-container">
      <div class="screenshot-frame">
        <img
          src="/app-screenshot.png"
          :alt="t('home.showcase.window_title')"
          loading="lazy"
        />
        <div class="screenshot-glow"></div>
      </div>

      <div class="showcase-badges">
        <div class="badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
          </svg>
          <span>WinUI 3</span>
        </div>
        <div class="badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>{{ t('home.showcase.badge1') }}</span>
        </div>
        <div class="badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span>{{ t('home.showcase.badge3') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.showcase-section {
  padding: var(--space-9) var(--space-6);
  position: relative;
}

.showcase-container {
  max-width: 1100px;
  margin: 0 auto;
}

.screenshot-frame {
  position: relative;
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  box-shadow:
    0 0 80px rgba(124, 58, 237, 0.12),
    0 30px 80px rgba(0, 0, 0, 0.5);
  transition: transform var(--duration-base) var(--ease-out);
}

.screenshot-frame:hover {
  transform: translateY(-4px);
}

.screenshot-frame img {
  width: 100%;
  display: block;
}

.screenshot-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.06), transparent 50%);
  pointer-events: none;
}

.showcase-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--r-full);
  font-size: 13px;
  color: var(--text-secondary);
}

.badge svg {
  color: var(--accent);
}
</style>