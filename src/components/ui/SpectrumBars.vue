<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    bars?: number;
    height?: number;
    animated?: boolean;
  }>(),
  {
    bars: 32,
    height: 80,
    animated: true
  }
);

const containerRef = ref<HTMLElement | null>(null);
const containerWidth = ref(0);
const reducedMotion = ref(false);

const barsArray = computed(() => {
  const base = props.bars;
  if (!containerWidth.value) return Array.from({ length: base }, (_, i) => i);
  const minBarWidth = 4;
  const gap = 3;
  const maxForWidth = Math.max(8, Math.floor((containerWidth.value + gap) / (minBarWidth + gap)));
  const finalCount = Math.min(base, maxForWidth);
  return Array.from({ length: finalCount }, (_, i) => i);
});

let ro: ResizeObserver | null = null;
let mql: MediaQueryList | null = null;

onMounted(() => {
  if (typeof ResizeObserver !== 'undefined' && containerRef.value) {
    ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      containerWidth.value = w;
    });
    ro.observe(containerRef.value);
  }
  mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotion.value = mql.matches;
  mql.addEventListener('change', (ev) => {
    reducedMotion.value = ev.matches;
  });
});

onBeforeUnmount(() => {
  ro?.disconnect();
  ro = null;
  if (mql) mql.removeEventListener('change', () => {});
  mql = null;
});
</script>

<template>
  <div
    ref="containerRef"
    class="spectrum-bars"
    :style="{ height: `${height}px` }"
    aria-hidden="true"
  >
    <div
      v-for="i in barsArray"
      :key="i"
      class="spectrum-bar"
      :class="{ animated: animated && !reducedMotion }"
      :style="{
        '--delay': `${(i * 0.07) % 1.5}s`,
        '--duration': `${0.8 + (i % 7) * 0.15}s`,
        '--hue-shift': `${(i % 5) * 12}deg`
      }"
    ></div>
  </div>
</template>

<style scoped>
.spectrum-bars {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  width: 100%;
  overflow: hidden;
}

.spectrum-bar {
  flex: 1 1 0;
  min-width: 2px;
  height: 30%;
  min-height: 6px;
  max-height: 100%;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--accent), var(--accent-2));
  opacity: 0.6;
  transform-origin: center bottom;
}

.spectrum-bar.animated {
  animation: spectrum-pulse var(--duration, 1s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}

@media (prefers-reduced-motion: reduce) {
  .spectrum-bar.animated {
    animation: none;
  }
}

@keyframes spectrum-pulse {
  0%,
  100% {
    height: 15%;
    opacity: 0.4;
    filter: hue-rotate(0deg);
  }
  50% {
    height: 90%;
    opacity: 1;
    filter: hue-rotate(var(--hue-shift, 0deg));
  }
}
</style>