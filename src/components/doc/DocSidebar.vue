<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { DocChapter, SettingItem } from '../../data/settingsDocs'

const props = defineProps<{
  chapters: DocChapter[]
  activeKey: string
}>()

const emit = defineEmits<{
  (e: 'select', key: string): void
}>()

const { locale, t } = useI18n()

const typeLabel = (type: SettingItem['type']) => {
  if (locale.value === 'en') {
    switch (type) {
      case 'select':
        return 'Select'
      case 'toggle':
        return 'Toggle'
      case 'number':
        return 'Number'
      case 'slider':
        return 'Slider'
      case 'text':
        return 'Text'
      case 'color':
        return 'Color'
      case 'shortcut':
        return 'Shortcut'
      case 'radio':
        return 'Radio'
      default:
        return type
    }
  }
  switch (type) {
    case 'select':
      return '下拉'
    case 'toggle':
      return '开关'
    case 'number':
      return '数值'
    case 'slider':
      return '滑块'
    case 'text':
      return '文本'
    case 'color':
      return '颜色'
    case 'shortcut':
      return '快捷键'
    case 'radio':
      return '单选'
    default:
      return type
  }
}

const localizedChapters = computed(() =>
  props.chapters.map((c) => ({
    ...c,
    title: c.titleKey,
  })),
)
</script>

<template>
  <aside class="doc-sidebar">
    <div class="sidebar-header">
      <div class="sidebar-eyebrow">{{ locale === 'en' ? 'Contents' : '目录' }}</div>
      <div class="sidebar-title">{{ locale === 'en' ? 'User Guide' : '使用指南' }}</div>
    </div>

    <nav class="sidebar-nav" aria-label="Guide chapters">
      <button
        v-for="chapter in localizedChapters"
        :key="chapter.key"
        class="sidebar-item"
        :class="{ active: activeKey === chapter.key }"
        :aria-current="activeKey === chapter.key ? 'location' : undefined"
        :title="t(chapter.titleKey)"
        @click="emit('select', chapter.key)"
      >
        <span class="item-number" aria-hidden="true">{{ chapter.number }}</span>
        <span class="item-icon" aria-hidden="true">{{ chapter.icon }}</span>
        <span class="item-title">{{ t(chapter.titleKey) }}</span>
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.doc-sidebar {
  position: sticky;
  top: calc(env(safe-area-inset-top, 0px) + var(--header-height) + var(--space-5));
  width: var(--sidebar-width);
  max-height: calc(100dvh - var(--header-height) - var(--space-7));
  overflow-y: auto;
  padding-right: var(--space-3);
  align-self: flex-start;
}

@supports not (height: 100dvh) {
  .doc-sidebar {
    max-height: calc(100vh - var(--header-height) - var(--space-7));
  }
}

.sidebar-header {
  padding: 0 var(--space-3);
  margin-bottom: var(--space-5);
}

.sidebar-eyebrow {
  font-size: 11px;
  color: var(--text-faint);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: var(--space-2);
}

.sidebar-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  min-height: 44px;
  border-radius: var(--r-md);
  background: transparent;
  border: 1px solid transparent;
  text-align: left;
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
  font-family: inherit;
  color: var(--text-secondary);
  min-width: 0;
}

.sidebar-item:hover,
.sidebar-item:focus-visible {
  background: var(--bg-elevated);
  border-color: var(--border-subtle);
  color: var(--text-primary);
}

.sidebar-item.active {
  background: var(--accent-soft);
  border-color: rgba(131, 54, 230, 0.3);
}

.item-number {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-faint);
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.sidebar-item.active .item-number {
  color: var(--accent);
}

.item-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.item-title {
  font-size: 13px;
  font-weight: 500;
  color: inherit;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-item.active .item-title {
  color: var(--text-primary);
}

@media (max-width: 960px) {
  .doc-sidebar {
    position: static;
    width: 100%;
    max-height: none;
    padding: 0;
    margin-bottom: var(--space-5);
  }
  .sidebar-nav {
    flex-direction: row;
    overflow-x: auto;
    gap: var(--space-2);
    padding: var(--space-1) 0 var(--space-3);
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .sidebar-nav::-webkit-scrollbar {
    display: none;
  }
  .sidebar-item {
    flex: 0 0 auto;
    min-width: 132px;
    max-width: 200px;
    scroll-snap-align: start;
  }
  .item-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
