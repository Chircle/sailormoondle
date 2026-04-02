<template>
  <Teleport to="body">
    <div class="overlay" @click.self="$emit('close')">
      <div class="modal glass-card">
        <button class="close-btn" @click="$emit('close')" aria-label="Close">✕</button>

        <div class="modal-header">
          <span class="deco" aria-hidden="true">✦ ☽ ✦</span>
          <h2>{{ t('howToPlay') }}</h2>
          <span class="deco" aria-hidden="true">✦ ☽ ✦</span>
        </div>

        <p class="intro">{{ t('howToPlayText') }}</p>

        <div class="legend">
          <div class="legend-item">
            <div class="swatch correct">✦</div>
            <div class="legend-text">
              <strong>{{ t('correct') }}</strong>
              <span>Exact match</span>
            </div>
          </div>
          <div class="legend-item">
            <div class="swatch partial">◈</div>
            <div class="legend-text">
              <strong>{{ t('partial') }}</strong>
              <span>Adjacent season or same group</span>
            </div>
          </div>
          <div class="legend-item">
            <div class="swatch wrong">·</div>
            <div class="legend-text">
              <strong>{{ t('wrong') }}</strong>
              <span>No match</span>
            </div>
          </div>
        </div>

        <div class="attrs-section">
          <p class="attrs-label">Attributes checked:</p>
          <div class="attrs-chips">
            <span v-for="key in attrKeys" :key="key" class="attr-chip">{{ t(`attributes.${key}`) }}</span>
          </div>
        </div>

        <button class="btn-magic close-action" @click="$emit('close')">
          Let's play ♡
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineEmits<{ (e: 'close'): void }>()

const attrKeys = ['affiliation', 'role', 'element', 'hairColor', 'eyeColor', 'firstAppearance', 'gender'] as const
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
  max-width: 400px;
  width: 100%;
  padding: 32px 24px 28px;
  position: relative;
  animation: pop-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
}

.modal::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--pink), var(--lavender), var(--sky), var(--lavender), var(--pink));
  background-size: 200% 100%;
  animation: shimmer 3s linear infinite;
}

.close-btn {
  position: absolute;
  top: 14px; right: 16px;
  background: none; border: none;
  color: var(--color-text-soft);
  font-size: 0.9rem; cursor: pointer;
  transition: color 0.15s;
}
.close-btn:hover { color: var(--pink-deep); }

.modal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
}

.modal-header h2 {
  font-size: 1.3rem;
  background: var(--grad-pink);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.deco {
  font-size: 0.65rem;
  color: var(--gold);
  letter-spacing: 0.25em;
  animation: sparkle-twinkle 4s ease-in-out infinite;
}

.intro {
  font-size: 0.88rem;
  color: var(--color-text-soft);
  line-height: 1.6;
  text-align: center;
  margin-bottom: 20px;
}

/* Legend */
.legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.swatch {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.swatch.correct {
  background: var(--grad-correct);
  color: #fff;
}
.swatch.partial {
  background: var(--grad-partial);
  color: var(--navy);
}
.swatch.wrong {
  background: var(--grad-wrong);
  color: var(--color-wrong-text);
}

.legend-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.legend-text strong {
  font-size: 0.88rem;
  color: var(--navy);
}

.legend-text span {
  font-size: 0.75rem;
  color: var(--color-text-soft);
}

/* Attrs */
.attrs-section { margin-bottom: 20px; }

.attrs-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-soft);
  margin-bottom: 8px;
}

.attrs-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.attr-chip {
  font-size: 0.72rem;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  background: rgba(205,180,255,0.2);
  border: 1px solid rgba(205,180,255,0.35);
  color: var(--navy-light);
  font-weight: 600;
}

.close-action {
  width: 100%;
}
</style>
