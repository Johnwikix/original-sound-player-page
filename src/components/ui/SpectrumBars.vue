<script setup lang="ts">
import { computed } from 'vue';

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

const barsArray = computed(() => Array.from({ length: props.bars }, (_, i) => i));
</script>

<template>
  <div class="spectrum-bars" :style="{ height: `${height}px` }">
    <div
      v-for="i in barsArray"
      :key="i"
      class="spectrum-bar"
      :class="{ animated }"
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
}

.spectrum-bar {
  flex: 1;
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