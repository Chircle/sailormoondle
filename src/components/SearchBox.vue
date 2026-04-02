<template>
  <div class="search-box">
    <div class="input-wrap" :class="{ focused, disabled }">
      <span class="search-icon" aria-hidden="true">☽</span>
      <input
        v-model="query"
        type="text"
        :placeholder="t('searchPlaceholder')"
        :disabled="disabled"
        autocomplete="off"
        @focus="focused = true"
        @blur="onBlur"
        @input="onInput"
        @keydown.enter="selectFirst"
        @keydown.escape="close"
        @keydown.arrow-down.prevent="moveDown"
        @keydown.arrow-up.prevent="moveUp"
      />
      <span v-if="query" class="clear-btn" role="button" tabindex="0" @click="clearQuery" @keydown.enter="clearQuery" @keydown.space.prevent="clearQuery">✕</span>
    </div>

    <transition name="dropdown">
      <ul v-if="filtered.length && open" class="dropdown glass-card" role="listbox">
        <li
          v-for="(char, i) in filtered"
          :key="char.id"
          role="option"
          :class="{ active: i === activeIndex, guessed: guessedIds.has(char.id) }"
          @click="select(char)"
          @mouseenter="activeIndex = i"
        >
          <CharacterAvatar
            :id="char.id"
            :name="char.names[locale]"
            :src="`${baseUrl}images/characters/${char.id}.png`"
            style="width:28px;height:28px;"
          />
          <span class="char-name">{{ char.names[locale] }}</span>
          <span v-if="guessedIds.has(char.id)" class="already">✦</span>
        </li>
      </ul>
    </transition>

    <p v-if="query && !filtered.length" class="no-results">
      {{ t('noResults') }} ☽
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { characters } from '../data/characters'
import type { Character, Locale } from '../types/character'
import CharacterAvatar from './CharacterAvatar.vue'

const baseUrl = import.meta.env.BASE_URL

const props = defineProps<{
  locale: Locale
  guessedIds: Set<string>
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'guess', character: Character): void
}>()

const { t } = useI18n()
const query = ref('')
const open = ref(false)
const focused = ref(false)
const activeIndex = ref(0)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return []
  return characters.filter(c =>
    c.names[props.locale].toLowerCase().includes(q),
  )
})

function onInput() {
  open.value = true
  activeIndex.value = 0
}

function select(char: Character) {
  if (props.guessedIds.has(char.id)) return
  emit('guess', char)
  query.value = ''
  open.value = false
}

function selectFirst() {
  if (filtered.value.length) select(filtered.value[activeIndex.value])
}

function close() { open.value = false }
function clearQuery() { query.value = ''; open.value = false }
// Delay close so a click on a dropdown item fires before blur hides the list
function onBlur() { setTimeout(() => { focused.value = false; open.value = false }, 150) }
function moveDown() { if (activeIndex.value < filtered.value.length - 1) activeIndex.value++ }
function moveUp() { if (activeIndex.value > 0) activeIndex.value-- }
</script>

<style scoped>
.search-box {
  position: relative;
  width: 100%;
  max-width: 640px;
}

.input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: var(--radius-pill);
  background: var(--color-surface-strong);
  border: 1.5px solid rgba(205, 180, 255, 0.4);
  box-shadow: var(--shadow-card);
  transition: border-color 0.25s, box-shadow 0.25s;
}

.input-wrap.focused {
  border-color: var(--lavender);
  box-shadow: var(--glow-pink);
}

.input-wrap.disabled { opacity: 0.5; }

.search-icon {
  font-size: 1.1rem;
  color: var(--lavender);
  flex-shrink: 0;
}

input {
  flex: 1;
  border: none;
  background: none;
  color: var(--navy);
  font-size: 0.95rem;
  outline: none;
  font-family: inherit;
}

input::placeholder { color: var(--color-text-soft); }
input:disabled { cursor: not-allowed; }

.clear-btn {
  color: var(--color-text-soft);
  cursor: pointer;
  font-size: 0.75rem;
  padding: 2px 4px;
  border-radius: 50%;
  transition: color 0.15s;
  flex-shrink: 0;
}
.clear-btn:hover { color: var(--pink-deep); }

.dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0; right: 0;
  list-style: none;
  padding: 6px 0;
  max-height: 260px;
  overflow-y: auto;
  z-index: 100;
  transform-origin: top;
}

li {
  padding: 8px 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--navy);
  transition: background 0.15s;
  border-radius: 8px;
  margin: 0 4px;
}

li.active { background: rgba(205, 180, 255, 0.2); }

li.guessed {
  opacity: 0.45;
  cursor: default;
}

.char-name { flex: 1; }

.already {
  color: var(--color-correct);
  font-size: 0.7rem;
}

.no-results {
  text-align: center;
  color: var(--color-text-soft);
  font-size: 0.85rem;
  margin-top: 10px;
  font-style: italic;
}

/* Dropdown transition */
.dropdown-enter-active { animation: pop-in 0.25s ease; }
.dropdown-leave-active { transition: opacity 0.15s, transform 0.15s; }
.dropdown-leave-to { opacity: 0; transform: scaleY(0.9); }
</style>
