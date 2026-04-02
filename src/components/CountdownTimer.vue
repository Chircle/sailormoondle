<template>
  <div class="countdown">
    <div class="countdown-icon" aria-hidden="true">☽</div>
    <p class="label">{{ t('nextCharacter') }}</p>
    <div class="time-display">
      <span v-for="(segment, i) in segments" :key="i" class="segment">
        <span class="digits">{{ segment.value }}</span>
        <span class="unit">{{ segment.unit }}</span>
        <span v-if="i < 2" class="sep" aria-hidden="true">:</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { getMsUntilNextDay } from '../composables/useDailyCharacter'

const { t } = useI18n()
const msLeft = ref(getMsUntilNextDay())
let interval: ReturnType<typeof setInterval>

const segments = computed(() => {
  const ms = msLeft.value
  const h = Math.floor(ms / 3_600_000)
  const m = Math.floor((ms % 3_600_000) / 60_000)
  const s = Math.floor((ms % 60_000) / 1_000)
  return [
    { value: String(h).padStart(2, '0'), unit: 'h' },
    { value: String(m).padStart(2, '0'), unit: 'm' },
    { value: String(s).padStart(2, '0'), unit: 's' },
  ]
})

onMounted(() => {
  interval = setInterval(() => { msLeft.value = getMsUntilNextDay() }, 1000)
})
onUnmounted(() => clearInterval(interval))
</script>

<style scoped>
.countdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: 20px;
}

.countdown-icon {
  font-size: 1.5rem;
  color: var(--gold);
  animation: float 4s ease-in-out infinite;
}

.label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-soft);
}

.time-display {
  display: flex;
  align-items: flex-start;
  gap: 2px;
}

.segment {
  display: flex;
  align-items: baseline;
  gap: 1px;
}

.digits {
  font-size: 2rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  background: var(--grad-pink);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.unit {
  font-size: 0.65rem;
  color: var(--color-text-soft);
  font-weight: 600;
  align-self: flex-end;
  margin-bottom: 4px;
}

.sep {
  font-size: 1.8rem;
  font-weight: 800;
  background: var(--grad-pink);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin: 0 2px;
  opacity: 0.5;
}
</style>
