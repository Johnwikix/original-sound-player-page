<script setup lang="ts">
import AppFooter from './AppFooter.vue'
</script>

<template>
  <div class="page-layout">
    <main id="main-content" class="page-main" tabindex="-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.page-layout {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

@supports not (height: 100dvh) {
  .page-layout {
    min-height: 100vh;
  }
}

.page-main {
  flex: 1;
  width: 100%;
}

.page-main:focus {
  outline: none;
}
</style>
