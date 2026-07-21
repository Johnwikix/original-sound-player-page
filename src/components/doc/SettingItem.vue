<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { SettingItem } from '../../data/settingsDocs'

const props = defineProps<{
  item: SettingItem
}>()

const { locale } = useI18n()

const name = computed(() => (locale.value === 'en' ? props.item.nameEn : props.item.name))
const description = computed(() =>
  locale.value === 'en' ? props.item.descriptionEn : props.item.description,
)
const options = computed(() =>
  props.item.options
    ? locale.value === 'en'
      ? props.item.optionsEn || props.item.options
      : props.item.options
    : undefined,
)

const typeLabel = computed(() => {
  const map: Record<SettingItem['type'], { zh: string; en: string }> = {
    select: { zh: '下拉选择', en: 'Dropdown' },
    toggle: { zh: '开关', en: 'Toggle' },
    number: { zh: '数值输入', en: 'Number' },
    slider: { zh: '滑块', en: 'Slider' },
    text: { zh: '文本', en: 'Text' },
    color: { zh: '颜色选择', en: 'Color Picker' },
    shortcut: { zh: '快捷键', en: 'Shortcut' },
    radio: { zh: '单选', en: 'Radio' },
  }
  return map[props.item.type][locale.value === 'en' ? 'en' : 'zh']
})

const rangeLabel = computed(() => {
  if (!props.item.range) return ''
  const { min, max, step, unit } = props.item.range
  const stepStr = step < 1 ? step.toString() : step.toString()
  let s = `${min} ~ ${max} (step ${stepStr})`
  if (unit) s += ` ${unit}`
  return s
})
</script>

<template>
  <article class="setting-item">
    <header class="setting-header">
      <div class="setting-meta">
        <span class="setting-type">{{ typeLabel }}</span>
        <span v-if="item.range" class="setting-range">{{ rangeLabel }}</span>
      </div>
      <h4 class="setting-name">{{ name }}</h4>
    </header>

    <p class="setting-description">{{ description }}</p>

    <div v-if="options && options.length" class="setting-options">
      <span class="options-label">{{ locale === 'en' ? 'Options' : '可选值' }}:</span>
      <div class="options-list">
        <span v-for="opt in options" :key="opt" class="option-chip">{{ opt }}</span>
      </div>
    </div>

    <div v-if="item.type !== 'text'" class="setting-visual" :class="`type-${item.type}`">
      <template v-if="item.type === 'toggle'">
        <div class="toggle-mock">
          <span class="toggle-knob"></span>
        </div>
        <span class="visual-hint">{{ locale === 'en' ? 'Off / On' : '关 / 开' }}</span>
      </template>

      <template v-else-if="item.type === 'select'">
        <div class="select-mock">
          <span>{{ options ? options[0] : '...' }}</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </template>

      <template v-else-if="item.type === 'number' || item.type === 'slider'">
        <div class="slider-mock">
          <div class="slider-track">
            <div class="slider-fill"></div>
            <div class="slider-knob"></div>
          </div>
          <span class="slider-value"
            >{{ item.range ? Math.round((item.range.min + item.range.max) / 2) : '0'
            }}{{ item.range?.unit || '' }}</span
          >
        </div>
      </template>

      <template v-else-if="item.type === 'color'">
        <div class="color-mock">
          <div class="color-swatch"></div>
          <div class="color-swatch color-swatch-2"></div>
          <div class="color-swatch color-swatch-3"></div>
        </div>
      </template>

      <template v-else-if="item.type === 'shortcut'">
        <div class="shortcut-mock">
          <kbd>Ctrl</kbd>
          <span>+</span>
          <kbd>Shift</kbd>
          <span>+</span>
          <kbd>K</kbd>
        </div>
      </template>

      <template v-else-if="item.type === 'radio'">
        <div class="radio-mock">
          <label class="radio-item" v-for="opt in (options || []).slice(0, 3)" :key="opt">
            <span class="radio-circle"></span>
            <span>{{ opt }}</span>
          </label>
        </div>
      </template>
    </div>
  </article>
</template>

<style scoped>
.setting-item {
  padding: var(--space-5);
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-md);
  transition:
    border-color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}

.setting-item:hover {
  border-color: var(--border-default);
  background: #10101a;
}

.setting-header {
  margin-bottom: var(--space-3);
}

.setting-meta {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
  flex-wrap: wrap;
}

.setting-type {
  display: inline-block;
  padding: 2px 8px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  border-radius: var(--r-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.setting-range {
  display: inline-block;
  padding: 2px 8px;
  background: var(--bg-overlay);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
  border-radius: var(--r-sm);
}

.setting-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

.setting-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0 0 var(--space-4);
}

.setting-options {
  margin-bottom: var(--space-4);
}

.options-label {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: var(--space-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.options-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.option-chip {
  display: inline-block;
  padding: 4px 10px;
  background: var(--bg-overlay);
  border: 1px solid var(--border-subtle);
  border-radius: var(--r-sm);
  font-size: 12px;
  color: var(--text-secondary);
  font-family: var(--font-mono);
}

.setting-visual {
  padding: var(--space-3);
  background: var(--bg-base);
  border-radius: var(--r-sm);
  border: 1px solid var(--border-subtle);
}

.toggle-mock {
  width: 40px;
  height: 22px;
  background: var(--accent);
  border-radius: var(--r-full);
  position: relative;
}

.toggle-knob {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
}

.visual-hint {
  font-size: 11px;
  color: var(--text-faint);
  margin-left: var(--space-3);
}

.select-mock {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--bg-overlay);
  border: 1px solid var(--border-default);
  border-radius: var(--r-sm);
  font-size: 13px;
  color: var(--text-primary);
  max-width: 280px;
}

.slider-mock {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.slider-track {
  flex: 1;
  height: 4px;
  background: var(--bg-overlay);
  border-radius: 2px;
  position: relative;
}

.slider-fill {
  position: absolute;
  inset: 0;
  width: 50%;
  background: var(--accent);
  border-radius: 2px;
}

.slider-knob {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.slider-value {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
  min-width: 48px;
  text-align: right;
}

.color-mock {
  display: flex;
  gap: var(--space-2);
}

.color-swatch {
  width: 36px;
  height: 36px;
  border-radius: var(--r-sm);
  background: var(--accent);
  border: 2px solid var(--border-default);
}

.color-swatch-2 {
  background: var(--accent-2);
}
.color-swatch-3 {
  background: var(--accent-violet);
}

.shortcut-mock {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}

.shortcut-mock kbd {
  padding: 4px 8px;
  background: var(--bg-overlay);
  border: 1px solid var(--border-default);
  border-bottom-width: 2px;
  border-radius: var(--r-sm);
  font-family: inherit;
  color: var(--text-primary);
  font-size: 11px;
}

.radio-mock {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.radio-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 13px;
  color: var(--text-secondary);
}

.radio-circle {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid var(--border-strong);
  position: relative;
}

.radio-circle::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 50%;
  background: transparent;
}

.radio-item:first-child .radio-circle::after {
  background: var(--accent);
}

.text-mock {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.text-line {
  height: 8px;
  background: var(--bg-overlay);
  border-radius: 4px;
  width: 100%;
}

.text-line.short {
  width: 60%;
}
</style>
