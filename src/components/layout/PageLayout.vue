<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
</script>

<template>
  <div class="page-layout">
    <AppHeader />
    <main class="page-main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.page-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-main {
  flex: 1;
  width: 100%;
}
</style>