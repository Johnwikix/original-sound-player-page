<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
const route = useRoute();
const router = useRouter();
const scrolled = ref(false);

const navLinks = computed(() => [
  { key: 'home', to: '/', label: t('nav.home') },
  { key: 'guide', to: '/guide', label: t('nav.guide') },
  { key: 'visualization', to: '/visualization', label: t('nav.visualization') },
  { key: 'faq', to: '/faq', label: t('nav.faq') }
]);

const onScroll = () => {
  scrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});

const isActive = (to: string) => {
  if (to === '/') return route.path === '/';
  return route.path.startsWith(to);
};

const toggleLocale = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh';
};
</script>

<template>
  <header class="app-header" :class="{ scrolled }">
    <div class="header-inner">
      <router-link to="/" class="brand">
        <img
          src="/logo.png"
          alt="OriginalSound HQ"
          class="brand-logo"
          width="32"
          height="32"
        />
        <span class="brand-name">{{ t('brand.name') }}</span>
      </router-link>

      <nav class="nav-links">
        <router-link
          v-for="link in navLinks"
          :key="link.key"
          :to="link.to"
          class="nav-link"
          :class="{ active: isActive(link.to) }"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <div class="header-actions">
        <button class="lang-toggle" @click="toggleLocale" :aria-label="t('nav.lang')">
          {{ locale === 'zh' ? 'EN' : '中' }}
        </button>
        <a
          href="https://apps.microsoft.com/detail/9nfw1rppt999?referrer=appbadge&mode=direct"
          rel="nofollow"
          class="cta-download"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {{ t('nav.download') }}
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--header-height);
  background: transparent;
  transition: background-color var(--duration-base) var(--ease-out),
    backdrop-filter var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out);
  border-bottom: 1px solid transparent;
}

.app-header.scrolled {
  background-color: rgba(5, 5, 7, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom-color: var(--border-subtle);
}

.header-inner {
  height: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-7);
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-weight: 700;
  font-size: 15px;
  color: var(--text-primary);
  letter-spacing: -0.01em;
  flex-shrink: 0;
}

.brand-logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  flex-shrink: 0;
}

.brand-name {
  white-space: nowrap;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex: 1;
  justify-content: center;
}

.nav-link {
  padding: var(--space-2) var(--space-4);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  border-radius: var(--r-full);
  transition: color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}

.nav-link:hover {
  color: var(--text-primary);
  background-color: rgba(255, 255, 255, 0.04);
}

.nav-link.active {
  color: var(--accent);
  background-color: var(--accent-soft);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-shrink: 0;
}

.lang-toggle {
  width: 36px;
  height: 36px;
  border-radius: var(--r-full);
  border: 1px solid var(--border-default);
  background: transparent;
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 600;
  transition: all var(--duration-fast) var(--ease-out);
}

.lang-toggle:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.cta-download {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-4);
  height: 36px;
  border-radius: var(--r-full);
  background: linear-gradient(135deg, var(--accent), #6d28d9);
  color: var(--bg-base);
  font-size: 13px;
  font-weight: 600;
  transition: transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

.cta-download:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(124, 58, 237, 0.35);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .header-inner {
    padding: 0 var(--space-4);
  }

  .brand-name {
    display: none;
  }
}
</style>