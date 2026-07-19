<script setup lang="ts">
defineProps<{
  href?: string;
  to?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  external?: boolean;
}>();
</script>

<template>
  <a
    v-if="href || external"
    :href="href"
    rel="nofollow"
    class="glow-button"
    :class="[`variant-${variant || 'primary'}`]"
  >
    <span class="glow-button-bg"></span>
    <span class="glow-button-content">
      <slot />
    </span>
  </a>
  <router-link
    v-else-if="to"
    :to="to"
    class="glow-button"
    :class="[`variant-${variant || 'primary'}`]"
  >
    <span class="glow-button-bg"></span>
    <span class="glow-button-content">
      <slot />
    </span>
  </router-link>
  <button v-else class="glow-button" :class="[`variant-${variant || 'primary'}`]">
    <span class="glow-button-bg"></span>
    <span class="glow-button-content">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.glow-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--space-5);
  height: 44px;
  border-radius: var(--r-full);
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  overflow: hidden;
  text-decoration: none;
  transition: transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
  isolation: isolate;
}

.glow-button:hover {
  transform: translateY(-1px);
}

.glow-button-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.variant-primary {
  color: var(--bg-base);
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.25);
}

.variant-primary .glow-button-bg {
  background: linear-gradient(135deg, var(--accent), #6d28d9);
}

.variant-primary:hover {
  box-shadow: 0 8px 32px rgba(124, 58, 237, 0.4);
}

.variant-secondary {
  color: var(--text-primary);
  border: 1px solid var(--border-default);
}

.variant-secondary .glow-button-bg {
  background: rgba(255, 255, 255, 0.04);
}

.variant-secondary:hover {
  border-color: var(--accent);
  box-shadow: 0 8px 24px rgba(124, 58, 237, 0.15);
}

.variant-ghost {
  color: var(--text-secondary);
}

.variant-ghost .glow-button-bg {
  background: transparent;
}

.variant-ghost:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.04);
}

.glow-button-content {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}
</style>