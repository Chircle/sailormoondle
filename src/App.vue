<template>
  <div class="app">
    <div class="app-content">
      <AppHeader :locale="locale" @open-help="showHelp = true" />

      <main class="main">
        <div class="game-area">
          <div class="puzzle-badge glass-card">
            <span>✦ {{ t('title') }} #{{ puzzleNumber }} ✦</span>
          </div>

          <SearchBox
            :locale="locale"
            :guessed-ids="guessedIds"
            :disabled="status !== 'playing'"
            @guess="submitGuess"
          />

          <transition name="status">
            <div v-if="status !== 'playing'" class="status-banner glass-card" :class="status">
              <span class="status-icon">{{ status === 'won' ? '🌙' : '🌑' }}</span>
              <span>{{ status === 'won' ? t('youWon') : t('youLost') }}</span>
              <button class="reveal-btn" @click="showResult = true">
                {{ t('theAnswerWas') }} ↗
              </button>
            </div>
          </transition>

          <div v-if="guesses.length === 0 && status === 'playing'" class="empty-state">
            <div class="empty-moon" aria-hidden="true">☽</div>
            <p>{{ t('searchPlaceholder') }}</p>
          </div>

          <GuessGrid :guesses="guesses" :locale="locale" />
        </div>
      </main>
    </div>

    <ResultModal
      v-if="showResult"
      :status="(status as 'won' | 'lost')"
      :target="target"
      :locale="locale"
      :guess-count="guesses.length"
      :share-text="buildShareText()"
      @close="showResult = false"
    />

    <HowToPlay v-if="showHelp" @close="showHelp = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from './components/AppHeader.vue'
import SearchBox from './components/SearchBox.vue'
import GuessGrid from './components/GuessGrid.vue'
import ResultModal from './components/ResultModal.vue'
import HowToPlay from './components/HowToPlay.vue'
import { useGame } from './composables/useGame'
import type { Locale } from './types/character'

const { t, locale: i18nLocale } = useI18n()
const locale = computed(() => i18nLocale.value as Locale)

const { target, puzzleNumber, guesses, status, guessedIds, buildShareText, submitGuess } = useGame()

const showResult = ref(false)
const showHelp = ref(false)

watch(status, val => {
  if (val !== 'playing') {
    setTimeout(() => (showResult.value = true), 900)
  }
})

if (status.value !== 'playing') {
  showResult.value = true
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  position: relative;
}

.app-content {
  position: relative;
  z-index: 1;
  isolation: isolate;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 24px 16px 60px;
}

.game-area {
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

/* Puzzle badge */
.puzzle-badge {
  padding: 6px 20px;
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  background: linear-gradient(135deg, rgba(255,193,227,0.3), rgba(205,180,255,0.3));
  color: var(--navy-light);
}

/* Status banner */
.status-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 0.95rem;
  width: 100%;
  justify-content: center;
}

.status-banner.won {
  background: linear-gradient(135deg, rgba(110,231,183,0.2), rgba(205,180,255,0.2));
  border-color: rgba(110, 231, 183, 0.4);
  color: #1a7a4a;
}

.status-banner.lost {
  background: linear-gradient(135deg, rgba(255,193,227,0.2), rgba(205,180,255,0.2));
  color: var(--navy);
}

.status-icon { font-size: 1.2rem; }

.reveal-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--lavender);
  text-decoration: underline;
  text-underline-offset: 3px;
  margin-left: 4px;
}

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 32px;
  opacity: 0.45;
}

.empty-moon {
  font-size: 3rem;
  animation: float 5s ease-in-out infinite;
  color: var(--gold);
}

.empty-state p {
  font-size: 0.88rem;
  color: var(--color-text-soft);
  font-style: italic;
}

/* Status transition */
.status-enter-active { animation: slide-in 0.4s ease; }
.status-leave-active { transition: opacity 0.2s; }
.status-leave-to    { opacity: 0; }
</style>
