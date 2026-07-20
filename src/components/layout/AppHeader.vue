<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();
const route = useRoute();
const scrolled = ref(false);
const menuOpen = ref(false);
const menuButtonRef = ref<HTMLButtonElement | null>(null);
const firstLinkRef = ref<HTMLAnchorElement | null>(null);
const reducedMotion = ref(false);

const navLinks = computed(() => [
  { key: 'home', to: '/', label: t('nav.home') },
  { key: 'guide', to: '/guide', label: t('nav.guide') },
  { key: 'visualization', to: '/visualization', label: t('nav.visualization') },
  { key: 'faq', to: '/faq', label: t('nav.faq') }
]);

const onScroll = () => {
  scrolled.value = window.scrollY > 20;
};

let savedScrollY = 0;

const lockBody = () => {
  savedScrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${savedScrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
};

const unlockBody = () => {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  window.scrollTo({ top: savedScrollY, behavior: reducedMotion.value ? 'auto' : 'smooth' });
};

const closeMenu = () => {
  if (!menuOpen.value) return;
  menuOpen.value = false;
  unlockBody();
  nextTick(() => menuButtonRef.value?.focus());
};

const toggleMenu = () => {
  if (menuOpen.value) {
    closeMenu();
    return;
  }
  menuOpen.value = true;
  lockBody();
  nextTick(() => firstLinkRef.value?.focus());
};

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && menuOpen.value) {
    closeMenu();
  }
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('keydown', onKeydown);
  onScroll();
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotion.value = mql.matches;
  const onMq = (ev: MediaQueryListEvent) => {
    reducedMotion.value = ev.matches;
  };
  mql.addEventListener('change', onMq);
  onMountedStop = () => mql.removeEventListener('change', onMq);
});

let onMountedStop: (() => void) | null = null;

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('keydown', onKeydown);
  onMountedStop?.();
  if (menuOpen.value) unlockBody();
});

watch(
  () => route.fullPath,
  () => {
    if (menuOpen.value) closeMenu();
  }
);

watch(locale, (val) => {
  document.documentElement.lang = val === 'zh' ? 'zh-CN' : 'en';
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
  <a class="skip-link" href="#main-content">{{ t('nav.skip') }}</a>
  <header class="app-header" :class="{ scrolled, 'menu-open': menuOpen }">
    <div class="header-inner">
      <router-link to="/" class="brand" @click="closeMenu">
        <img
          src="/logo.png"
          alt="OriginalSound HQ"
          class="brand-logo"
          width="32"
          height="32"
        />
        <span class="brand-name">{{ t('brand.name') }}</span>
      </router-link>

      <nav class="nav-links" aria-label="Primary">
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
        <button
          class="lang-toggle"
          @click="toggleLocale"
          :aria-label="t('nav.lang')"
          :aria-pressed="locale === 'zh'"
        >
          {{ locale === 'zh' ? 'EN' : '中' }}
        </button>
        <a
          href="https://apps.microsoft.com/detail/9nfw1rppt999?referrer=appbadge&mode=direct"
          rel="nofollow noopener"
          class="cta-download"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span class="cta-download-text">{{ t('nav.download') }}</span>
        </a>

        <button
          ref="menuButtonRef"
          class="menu-toggle"
          @click="toggleMenu"
          :aria-label="menuOpen ? t('nav.close_menu') : t('nav.open_menu')"
          :aria-expanded="menuOpen"
          aria-controls="mobile-drawer"
        >
          <svg
            v-if="!menuOpen"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg
            v-else
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition :name="reducedMotion ? '' : 'drawer-fade'">
        <div
          v-if="menuOpen"
          class="drawer-backdrop"
          @click="closeMenu"
          aria-hidden="true"
        ></div>
      </Transition>
      <Transition :name="reducedMotion ? '' : 'drawer-slide'">
        <aside
          v-if="menuOpen"
          id="mobile-drawer"
          class="drawer"
          role="dialog"
          aria-modal="true"
          :aria-label="t('nav.menu_label')"
        >
          <div class="drawer-header">
            <span class="drawer-eyebrow">{{ t('nav.menu_label') }}</span>
          </div>
          <nav class="drawer-nav" aria-label="Mobile">
            <router-link
              v-for="(link, i) in navLinks"
              :key="link.key"
              :to="link.to"
              class="drawer-link"
              :class="{ active: isActive(link.to) }"
              :ref="(el) => { if (i === 0) firstLinkRef = el as HTMLAnchorElement; }"
              @click="closeMenu"
            >
              <span class="drawer-link-index">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="drawer-link-label">{{ link.label }}</span>
            </router-link>
          </nav>
          <div class="drawer-footer">
            <a
              href="https://apps.microsoft.com/detail/9nfw1rppt999?referrer=appbadge&mode=direct"
              rel="nofollow noopener"
              class="drawer-cta"
              @click="closeMenu"
            >
              {{ t('nav.download') }}
            </a>
          </div>
        </aside>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: calc(var(--header-height) + env(safe-area-inset-top, 0px));
  padding-top: env(safe-area-inset-top, 0px);
  background: transparent;
  transition: background-color var(--duration-base) var(--ease-out),
    backdrop-filter var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-out);
  border-bottom: 1px solid transparent;
}

.app-header.scrolled,
.app-header.menu-open {
  background-color: rgba(5, 5, 7, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom-color: var(--border-subtle);
}

.header-inner {
  height: var(--header-height);
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-5);
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
  min-height: 44px;
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
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 var(--space-4);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
  border-radius: var(--r-full);
  transition: color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}

.nav-link:hover,
.nav-link:focus-visible {
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
  min-width: 44px;
  min-height: 44px;
  padding: 0 var(--space-3);
  border-radius: var(--r-full);
  border: 1px solid var(--border-default);
  background: transparent;
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 600;
  transition: color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}

.lang-toggle:hover,
.lang-toggle:focus-visible {
  border-color: var(--accent);
  color: var(--accent);
}

.cta-download {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-4);
  min-height: 44px;
  border-radius: var(--r-full);
  background: linear-gradient(135deg, var(--accent), #5e1bb8);
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  transition: transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

.cta-download:hover,
.cta-download:focus-visible {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(131, 54, 230, 0.35);
}

.cta-download:focus-visible {
  outline-color: #ffffff;
}

.menu-toggle {
  display: none;
  min-width: 44px;
  min-height: 44px;
  padding: 0;
  border-radius: var(--r-md);
  border: 1px solid var(--border-default);
  color: var(--text-primary);
  align-items: center;
  justify-content: center;
}

.menu-toggle:hover,
.menu-toggle:focus-visible {
  border-color: var(--accent);
  color: var(--accent);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .header-inner {
    padding: 0 var(--space-4);
    gap: var(--space-3);
  }

  .header-actions {
    margin-left: auto;
  }

  .menu-toggle {
    display: inline-flex;
  }

  .cta-download-text {
    display: none;
  }

  .cta-download {
    padding: 0;
    width: 44px;
    justify-content: center;
  }

  .brand-name {
    display: none;
  }
}

@media (max-width: 360px) {
  .header-inner {
    padding: 0 var(--space-3);
  }

  .cta-download {
    display: none;
  }
}

.drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(2, 2, 4, 0.65);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 110;
  width: min(86vw, 360px);
  padding:
    calc(env(safe-area-inset-top, 0px) + var(--space-6))
    var(--space-6)
    calc(env(safe-area-inset-bottom, 0px) + var(--space-6));
  background: var(--bg-elevated);
  border-left: 1px solid var(--border-default);
  box-shadow: -24px 0 60px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drawer-eyebrow {
  font-size: 11px;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-3);
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.drawer-link {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  min-height: 56px;
  border-radius: var(--r-md);
  border: 1px solid transparent;
  color: var(--text-secondary);
  font-size: 16px;
  font-weight: 500;
  transition: color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out);
}

.drawer-link:hover,
.drawer-link:focus-visible {
  color: var(--text-primary);
  background-color: rgba(255, 255, 255, 0.04);
  border-color: var(--border-subtle);
}

.drawer-link.active {
  color: var(--accent);
  background-color: var(--accent-soft);
  border-color: rgba(131, 54, 230, 0.3);
}

.drawer-link-index {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
  letter-spacing: 0.1em;
  flex-shrink: 0;
}

.drawer-link.active .drawer-link-index {
  color: var(--accent);
}

.drawer-link-label {
  flex: 1;
  min-width: 0;
  word-break: break-word;
}

.drawer-footer {
  margin-top: var(--space-4);
}

.drawer-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 48px;
  padding: 0 var(--space-5);
  border-radius: var(--r-full);
  background: linear-gradient(135deg, var(--accent), #5e1bb8);
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
}

.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity var(--duration-base) var(--ease-out);
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
  transition: transform var(--duration-base) var(--ease-out);
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
  transform: translateX(100%);
}
</style>