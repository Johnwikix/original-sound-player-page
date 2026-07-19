<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const productLinks = computed(() => [
  { key: 'main', label: t('footer.product.main'), href: 'https://apps.microsoft.com/detail/9nfw1rppt999' },
  { key: 'vis', label: t('footer.product.vis'), to: '/visualization' }
]);

const resourceLinks = computed(() => [
  { key: 'guide', label: t('footer.resource.guide'), to: '/guide' },
  { key: 'faq', label: t('footer.resource.faq'), to: '/faq' },
  { key: 'gh', label: t('footer.resource.gh'), href: 'https://github.com/Johnwikix/original-sound-hq-player' }
]);

const legalLinks = computed(() => [
  { key: 'policy', label: t('footer.legal.policy'), href: 'https://github.com/Johnwikix/original-sound-hq-player/blob/main/policy.md' }
]);

const socialLinks = computed(() => [
  {
    key: 'bili',
    label: 'Bilibili',
    href: 'https://www.bilibili.com/video/BV1f5pgzAEcs'
  },
  {
    key: 'gh',
    label: 'GitHub',
    href: 'https://github.com/Johnwikix'
  }
]);
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-col footer-brand-col">
          <div class="footer-brand">
            <img
              src="/logo.png"
              alt="OriginalSound HQ"
              class="brand-logo"
              width="32"
              height="32"
            />
            <span>{{ t('brand.name') }}</span>
          </div>
          <p class="footer-tagline">{{ t('footer.tagline') }}</p>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">{{ t('footer.col.product') }}</h4>
          <ul class="footer-list">
            <li v-for="link in productLinks" :key="link.key">
              <a v-if="link.href" :href="link.href" rel="nofollow">{{ link.label }}</a>
              <router-link v-else :to="link.to!">{{ link.label }}</router-link>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">{{ t('footer.col.resource') }}</h4>
          <ul class="footer-list">
            <li v-for="link in resourceLinks" :key="link.key">
              <a v-if="link.href" :href="link.href" rel="nofollow">{{ link.label }}</a>
              <router-link v-else :to="link.to!">{{ link.label }}</router-link>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">{{ t('footer.col.legal') }}</h4>
          <ul class="footer-list">
            <li v-for="link in legalLinks" :key="link.key">
              <a :href="link.href" rel="nofollow">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-title">{{ t('footer.col.social') }}</h4>
          <ul class="footer-list">
            <li v-for="link in socialLinks" :key="link.key">
              <a :href="link.href" rel="nofollow" target="_blank">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} Sennpei Studio · {{ t('footer.rights') }}</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: linear-gradient(180deg, var(--bg-base) 0%, #020203 100%);
  border-top: 1px solid var(--border-subtle);
  padding: var(--space-8) 0 var(--space-5);
  margin-top: var(--space-9);
}

.footer-inner {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr 1fr;
  gap: var(--space-7);
  margin-bottom: var(--space-7);
}

.footer-brand-col {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
}

.brand-logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  flex-shrink: 0;
}

.footer-tagline {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.6;
  max-width: 280px;
}

.footer-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: var(--space-4);
}

.footer-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer-list a {
  font-size: 13px;
  color: var(--text-muted);
  transition: color var(--duration-fast) var(--ease-out);
}

.footer-list a:hover {
  color: var(--accent);
}

.footer-bottom {
  padding-top: var(--space-5);
  border-top: 1px solid var(--border-subtle);
  text-align: center;
  font-size: 12px;
  color: var(--text-faint);
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer-brand-col {
    grid-column: 1 / -1;
  }
}

@media (max-width: 480px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>