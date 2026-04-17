<template>
  <div v-if="guesses.length" class="guess-grid">
    <div class="guess-grid-scroll">
      <!-- Column header row -->
      <div class="col-headers">
        <div class="col-header name-col">{{ t('attributes.name') }}</div>
        <div v-for="key in attrKeys" :key="key" class="col-header">
          {{ t(`attributes.${key}`) }}
        </div>
      </div>

      <GuessRow
        v-for="guess in [...guesses].reverse()"
        :key="guess.character.id"
        :guess="guess"
        :locale="locale"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { GuessResult, Locale } from '../types/character'
import GuessRow from './GuessRow.vue'

defineProps<{
  guesses: GuessResult[]
  locale: Locale
}>()

const { t } = useI18n()

// Must match the order of keys in GuessResult.hints
const attrKeys = [
  'affiliation',
  'role',
  'element',
  'hairColor',
  'eyeColor',
  'firstAppearance',
  'gender',
] as const
</script>

<style scoped>
.guess-grid {
  width: 100%;
  margin-top: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.guess-grid-scroll {
  min-width: 640px;
}

/* ── Shared column template ──────────────────────────────────────
   Column 1 : avatar + character name  (fixed)
   Columns 2-8: 7 attribute cells      (equal, flexible)
   ──────────────────────────────────────────────────��──────────── */
.col-headers,
:deep(.row-grid) {
  display: grid;
  grid-template-columns: 160px repeat(7, 1fr);
  gap: 6px;
}

.col-headers {
  padding: 0 4px 4px;
  position: sticky;
  top: 0;
  z-index: 2;
}

.col-header {
  font-size: 0.58rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--color-text-soft);
  text-align: center;
  padding: 4px 2px;
}

.col-header.name-col {
  text-align: left;
  padding-left: 48px; /* align with name text, after avatar */
  position: sticky;
  left: 0;
  z-index: 3;
  background: var(--color-bg, #FFF6FB);
}

@media (max-width: 480px) {
  .col-header{
    text-align: left;
  }
}

</style>
