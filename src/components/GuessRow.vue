<template>
  <div class="guess-row glass-card">
    <!-- Uses .row-grid so GuessGrid's :deep selector applies the shared grid template -->
    <div class="row-grid">
      <!-- Col 1: avatar + name -->
      <div class="name-cell">
        <CharacterAvatar
          :id="guess.character.id"
          :name="guess.character.names[locale]"
          :src="`${baseUrl}images/characters/${guess.character.id}.png`"
        />
        <span class="character-name">{{ guess.character.names[locale] }}</span>
      </div>

      <!-- Cols 2-8: hint cells, in the same order as attrKeys in GuessGrid -->
      <HintCell
        v-for="(hint, key) in guess.hints"
        :key="key"
        :label="t(`attributes.${key}`)"
        :value="key === 'firstAppearance' ? t(`seasons.${hint.value}`) : hint.value"
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

/* Col 1: avatar + name */
.name-cell {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 6px;
  min-width: 0;
}

.character-name {
  font-size: 0.78rem;
  font-weight: 800;
  background: var(--grad-pink);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}
</style>
