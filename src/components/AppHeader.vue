<template>
  <header class="app-header glass-card">
    <div class="left">
      <button class="icon-btn" :title="t('howToPlay')" @click="$emit('openHelp')">
        <span class="icon-inner">?</span>
      </button>
    </div>

    <div class="title-group">
      <div class="deco-stars" aria-hidden="true">✦ ☽ ✦</div>
      <h1 class="title">
        <span class="text-gradient">{{ t('title') }}</span>
      </h1>
      <p class="subtitle">{{ t('subtitle') }}</p>
    </div>

    <div class="right">
      <div class="lang-dropdown" :class="{ open: dropdownOpen }">
        <!-- Trigger button -->
        <button class="lang-trigger" @click="dropdownOpen = !dropdownOpen">
          <span class="flag">{{ flagMap[locale] }}</span>
          <!-- <span class="lang-label">{{ labelMap[locale] }}</span> -->
          <span class="chevron" aria-hidden="true">{{ dropdownOpen ? '▲' : '▼' }}</span>
        </button>

        <!-- Dropdown list -->
        <transition name="lang-list">
          <ul v-if="dropdownOpen" class="lang-list glass-card" role="listbox">
            <li
              v-for="loc in supported"
              :key="loc"
              role="option"
              class="lang-option"
              :class="{ active: locale === loc }"
              @click="pick(loc)"
            >
              <span class="flag">{{ flagMap[loc] }}</span>
              <span class="lang-label">{{ labelMap[loc] }}</span>
              <span v-if="locale === loc" class="check" aria-hidden="true">✦</span>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </header>

  <!-- Click-outside backdrop -->
  <div v-if="dropdownOpen" class="backdrop" @click="dropdownOpen = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, SUPPORTED } from '../i18n'
import type { Locale } from '../types/character'

defineProps<{ locale: Locale }>()
defineEmits<{ (e: 'openHelp'): void }>()

const { t } = useI18n()
const supported = SUPPORTED
const dropdownOpen = ref(false)

const flagMap: Record<Locale, string> = {
  en: '🇬🇧',
  de: '🇩🇪',
  ja: '🇯🇵',
  fr: '🇫🇷',
  'pt-BR': '🇧🇷',
  it: '🇮🇹',
}

const labelMap: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  ja: '日本語',
  fr: 'Français',
  'pt-BR': 'Português',
  it: 'Italiano',
}

function pick(loc: Locale) {
  setLocale(loc)
  dropdownOpen.value = false
}
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  border-top: none;
  gap: 12px;
  position: relative;
  z-index: 20;
}

.app-header::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--pink), var(--lavender), var(--sky), var(--lavender), var(--pink));
  background-size: 200% 100%;
  animation: shimmer 4s linear infinite;
}

.title-group {
  text-align: center;
  flex: 1;
  overflow: hidden; /* prevent deco-stars from pushing layout */
  min-width: 0;
}

.deco-stars {
  font-size: 0.6rem;
  color: var(--gold);
  letter-spacing: 0.2em;
  margin-bottom: 2px;
  will-change: opacity, transform;
  /* overflow: hidden on .title-group clips any scale overflow safely */
  animation: sparkle-twinkle 4s ease-in-out infinite;
}

.title {
  margin: 0;
  font-size: clamp(1.4rem, 5vw, 2.2rem);
  letter-spacing: 0.06em;
  line-height: 1;
  filter: drop-shadow(0 2px 8px rgba(255, 140, 200, 0.4));
}

.subtitle {
  margin: 4px 0 0;
  font-size: 0.78rem;
  color: var(--color-text-soft);
  letter-spacing: 0.05em;
}

.left, .right { flex-shrink: 0; }

/* ── Help button ── */
.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid rgba(205, 180, 255, 0.5);
  background: var(--color-surface);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(205, 180, 255, 0.25);
}

.icon-btn:hover {
  transform: scale(1.1);
  box-shadow: var(--glow-pink);
}

.icon-inner {
  font-size: 0.9rem;
  font-weight: 800;
  background: var(--grad-pink);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Language dropdown ── */
.lang-dropdown {
  position: relative;
}

.lang-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border-radius: var(--radius-pill);
  border: 1.5px solid rgba(205, 180, 255, 0.45);
  background: var(--color-surface-strong);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--navy);
  box-shadow: 0 2px 8px rgba(205, 180, 255, 0.2);
  transition: border-color 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}

.lang-trigger:hover,
.lang-dropdown.open .lang-trigger {
  border-color: var(--lavender);
  box-shadow: var(--glow-pink);
}

.flag { font-size: 1.1rem; line-height: 1; }

.chevron {
  font-size: 0.5rem;
  color: var(--color-text-soft);
  transition: transform 0.2s;
}

.lang-dropdown.open .chevron {
  transform: rotate(180deg);
}

/* ── Dropdown list ── */
.lang-list {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 160px;
  list-style: none;
  padding: 6px;
  z-index: 50;
  transform-origin: top right;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--navy);
  transition: background 0.15s;
}

.lang-option:hover {
  background: rgba(205, 180, 255, 0.18);
}

.lang-option.active {
  background: rgba(205, 180, 255, 0.25);
  color: var(--navy);
}

.check {
  margin-left: auto;
  font-size: 0.65rem;
  color: var(--lavender);
}

/* ── Transition ── */
.lang-list-enter-active { animation: pop-in 0.2s ease; }
.lang-list-leave-active { transition: opacity 0.15s, transform 0.15s; transform-origin: top right; }
.lang-list-leave-to    { opacity: 0; transform: scale(0.92); }

/* ── Click-outside backdrop ── */
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 15;
}
</style>
