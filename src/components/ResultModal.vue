<template>
  <Teleport to="body">
    <div class="overlay" @click.self="$emit('close')">
      <div class="modal glass-card">
        <button class="close-btn" @click="$emit('close')" aria-label="Close">✕</button>

        <!-- Decorative ring -->
        <div class="deco-ring" aria-hidden="true" />

        <div class="result-section" :class="status">
          <div class="big-icon" :class="{ spin: status === 'won' }">
            {{ status === 'won' ? '🌙' : '🌑' }}
          </div>
          <h2 class="result-title">{{ status === 'won' ? t('youWon') : t('youLost') }}</h2>
          <p v-if="status === 'won'" class="guess-count">
            {{ t('guessCount', { count: guessCount }) }}
          </p>
        </div>

        <div class="divider" aria-hidden="true">✦ ☽ ✦</div>

        <p class="answer-label">{{ t('theAnswerWas') }}</p>

        <div class="answer-card">
          <CharacterAvatar
            :id="target.id"
            :name="target.names[locale]"
            :src="`${baseUrl}images/characters/${target.id}.png`"
            :large="true"
          />
          <p class="answer-name">{{ target.names[locale] }}</p>
          <div class="answer-attrs">
            <span class="attr-chip">{{ target.affiliation }}</span>
            <span class="attr-chip">{{ target.role }}</span>
            <span class="attr-chip">{{ target.element }}</span>
          </div>
        </div>

        <button class="btn-magic share-btn" @click="share">
          {{ copied ? `${t('copied')} ✦` : `${t('share')} ♡` }}
        </button>

        <CountdownTimer />

        <p class="tomorrow">{{ t('playAgainTomorrow') }}</p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Character, Locale } from '../types/character'
import CountdownTimer from './CountdownTimer.vue'
import CharacterAvatar from './CharacterAvatar.vue'

const baseUrl = import.meta.env.BASE_URL

const props = defineProps<{
  status: 'won' | 'lost'
  target: Character
  locale: Locale
  guessCount: number
  shareText: string
}>()

defineEmits<{ (e: 'close'): void }>()

const { t } = useI18n()
const copied = ref(false)

async function share() {
  try {
    await navigator.clipboard.writeText(props.shareText)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    alert(props.shareText)
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(240, 228, 255, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 16px;
}

.modal {
  max-width: 380px;
  width: 100%;
  padding: 32px 24px 28px;
  text-align: center;
  position: relative;
  animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
}

/* Rainbow shimmer top border */
.modal::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--pink), var(--lavender), var(--sky), var(--lavender), var(--pink));
  background-size: 200% 100%;
  animation: shimmer 3s linear infinite;
}

.deco-ring {
  position: absolute;
  top: -60px; right: -60px;
  width: 160px; height: 160px;
  border-radius: 50%;
  border: 2px solid rgba(205, 180, 255, 0.2);
  pointer-events: none;
}

.close-btn {
  position: absolute;
  top: 14px; right: 16px;
  background: none;
  border: none;
  color: var(--color-text-soft);
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.15s;
  z-index: 1;
}
.close-btn:hover { color: var(--pink-deep); }

/* Result section */
.result-section { margin-bottom: 8px; }

.big-icon {
  font-size: 3.5rem;
  line-height: 1;
  margin-bottom: 8px;
  display: inline-block;
}

.big-icon.spin {
  animation: float 3s ease-in-out infinite, heart-burst 0.6s ease 0.1s;
}

.result-title {
  font-size: 1.7rem;
  margin: 0 0 4px;
  background: var(--grad-pink);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.won .result-title {
  background: linear-gradient(135deg, var(--pink), var(--lavender));
  -webkit-background-clip: text;
  background-clip: text;
  filter: drop-shadow(0 0 8px rgba(255,193,227,0.5));
}

.guess-count {
  color: var(--color-text-soft);
  font-size: 0.9rem;
}

/* Divider */
.divider {
  font-size: 0.7rem;
  color: var(--gold);
  letter-spacing: 0.4em;
  margin: 12px 0;
  animation: sparkle-twinkle 4s ease-in-out infinite;
}

.answer-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-soft);
  margin-bottom: 12px;
}

/* Answer card */
.answer-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(255,193,227,0.15), rgba(205,180,255,0.15));
  border-radius: var(--radius-md);
  border: 1px solid rgba(205,180,255,0.3);
  margin-bottom: 20px;
}

.answer-name {
  font-size: 1.3rem;
  font-weight: 800;
  background: var(--grad-pink);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.answer-attrs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}

.attr-chip {
  font-size: 0.7rem;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  background: rgba(205,180,255,0.2);
  border: 1px solid rgba(205,180,255,0.3);
  color: var(--navy-light);
  font-weight: 600;
}

.share-btn {
  width: 100%;
  max-width: 240px;
}

.tomorrow {
  margin-top: 16px;
  font-size: 0.75rem;
  color: var(--color-text-soft);
  font-style: italic;
}
</style>
