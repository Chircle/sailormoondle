<template>
  <div class="guess-row glass-card">
    <!-- Uses .row-grid so GuessGrid's :deep selector applies the shared grid template -->
    <div class="row-grid">
      <!-- Col 1: avatar + name -->
      <div class="name-cell">
        <CharacterAvatar
          :id="guess.character.id"
          :name="guess.character.names[locale]"
          :src="`${baseUrl}images/characters-thumb/${guess.character.id}.png`"
          :full-src="`${baseUrl}images/characters/${guess.character.id}.png`"
        />
        <span class="character-name">{{ guess.character.names[locale] }}</span>
      </div>

      <!-- Cols 2-8: hint cells, in the same order as attrKeys in GuessGrid -->
      <HintCell
        v-for="(hint, key) in guess.hints"
        :key="key"
        :label="t(`attributes.${key}`)"
        :value="translateValue(key, hint.value)"
        :result="hint.result"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { GuessResult, Locale } from '../types/character'
import HintCell from './HintCell.vue'

const baseUrl = import.meta.env.BASE_URL
import CharacterAvatar from './CharacterAvatar.vue'

defineProps<{
  guess: GuessResult
  locale: Locale
}>()

const { t } = useI18n()

function translateValue(key: string, value: string): string {
  if (key === 'firstAppearance') return t(`seasons.${value}`)
  if (key === 'hairColor' || key === 'eyeColor') return t(`colors.${value}`)
  if (key === 'gender') return t(`genders.${value}`)
  if (key === 'affiliation') return t(`affiliations.${value}`)
  if (key === 'role') return t(`roles.${value}`)
  if (key === 'element') return t(`elements.${value}`)
  return value
}
</script>

<style scoped>
.guess-row {
  padding: 8px;
  margin-bottom: 8px;
  animation: slide-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* .row-grid template is injected by GuessGrid's :deep(.row-grid) */
.row-grid {
  align-items: stretch;
}

/* Col 1: avatar + name — sticky so it stays visible on horizontal scroll */
.name-cell {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 6px;
  min-width: 0;
  position: sticky;
  left: 0;
  z-index: 2;
  background: var(--color-surface, rgba(255, 255, 255, 0.72));
  border-radius: var(--radius-sm) 0 0 var(--radius-sm);
}

.character-name {
  font-size: 0.78rem;
  font-weight: 800;
  background: var(--grad-pink);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  min-width: 0;
  line-height: 1.2;
}
</style>
