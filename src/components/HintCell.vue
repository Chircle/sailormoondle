<template>
  <div class="hint-cell" :class="result">
    <span class="label">{{ label }}</span>
    <span class="value">{{ value }}</span>
    <span class="cell-deco" aria-hidden="true">{{ decoMap[result] }}</span>
  </div>
</template>

<script setup lang="ts">
import type { HintResult } from '../types/character'

defineProps<{
  label: string
  value: string
  result: HintResult
}>()

const decoMap: Record<HintResult, string> = {
  correct: '✦',
  partial: '◈',
  wrong: '·',
}
</script>

<style scoped>
.hint-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 4px 8px;
  border-radius: var(--radius-sm);
  text-align: center;
  gap: 3px;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  animation: slide-in 0.35s ease both;
}

.hint-cell:hover {
  transform: translateY(-2px) scale(1.03);
}

/* Gloss overlay */
.hint-cell::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 40%;
  background: linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%);
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  pointer-events: none;
}

.label {
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-weight: 700;
  opacity: 0.8;
  line-height: 1;
}

.value {
  font-size: 0.72rem;
  font-weight: 800;
  word-break: break-word;
  line-height: 1.2;
}

.cell-deco {
  font-size: 0.6rem;
  opacity: 0.7;
  line-height: 1;
}

/* ── Correct ── */
.correct {
  background: var(--grad-correct);
  color: #fff;
  box-shadow: 0 3px 14px var(--color-correct-glow), inset 0 1px 0 rgba(255,255,255,0.3);
}

/* ── Partial ── */
.partial {
  background: var(--grad-partial);
  color: var(--navy);
  box-shadow: 0 3px 14px var(--color-partial-glow), inset 0 1px 0 rgba(255,255,255,0.4);
}

/* ── Wrong ── */
.wrong {
  background: var(--grad-wrong);
  color: var(--color-wrong-text);
  box-shadow: 0 2px 8px rgba(180,170,220,0.2), inset 0 1px 0 rgba(255,255,255,0.5);
}
</style>
