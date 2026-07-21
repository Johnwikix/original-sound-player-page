<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from './components/layout/AppHeader.vue'

const reducedMotion = ref(false)
let mql: MediaQueryList | null = null

const onChange = (ev: MediaQueryListEvent) => {
  reducedMotion.value = ev.matches
}

onMounted(() => {
  if (typeof window === 'undefined' || !window.matchMedia) return
  mql = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.value = mql.matches
  mql.addEventListener('change', onChange)
})

onBeforeUnmount(() => {
  mql?.removeEventListener('change', onChange)
})
</script>

<template>
  <AppHeader />
  <RouterView v-slot="{ Component }">
    <Transition :name="reducedMotion ? '' : 'page'" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 600ms var(--ease-out),
    transform 600ms var(--ease-out);
  will-change: opacity, transform;
}

.page-leave-active {
  transition-duration: 360ms;
  transition-timing-function: var(--ease-in-out);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.985);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.995);
}
</style>
