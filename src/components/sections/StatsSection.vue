<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { statsData } from '../../data/featuresData'
import { useReveal } from '../../composables/useReveal'

const { locale } = useI18n()
const { elementRef, isVisible } = useReveal()

const stats = computed(() =>
  statsData.map((s) => ({
    ...s,
    label: locale.value === 'en' ? s.labelEn : s.label,
  })),
)
</script>

<template>
  <section class="stats-section">
    <div ref="elementRef" class="stats-container reveal-base" :class="{ revealed: isVisible }">
      <div class="stats-grid">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="stat-item"
          data-reveal-child
          :style="{ '--i': index }"
        >
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-divider"></div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  padding: var(--space-7) var(--space-6);
  position: relative;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
  background: var(--bg-elevated);
}

.stats-container {
  max-width: var(--container-max);
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-5);
}

.stat-item {
  text-align: center;
  padding: var(--space-4);
  position: relative;
}

.stat-value {
  font-size: clamp(36px, 4vw, 56px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: var(--space-3);
}

.stat-divider {
  width: 32px;
  height: 2px;
  background: var(--accent);
  margin: 0 auto var(--space-3);
  border-radius: 2px;
}

.stat-label {
  font-size: 13px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
}

@media (max-width: 720px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
