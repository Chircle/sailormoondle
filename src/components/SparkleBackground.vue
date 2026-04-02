<template>
  <div class="sparkle-layer" aria-hidden="true">
    <span
      v-for="s in sparkles"
      :key="s.id"
      class="sparkle"
      :class="s.type"
      :style="s.style"
    >{{ s.char }}</span>
  </div>
</template>

<script setup lang="ts">
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

const ENTRIES = [
  { type: 'star',  char: '✦', color: 'var(--lavender)' },
  { type: 'heart', char: '♡', color: 'var(--pink)'     },
  { type: 'moon',  char: '☽', color: 'var(--gold)'     },
  { type: 'dot',   char: '✧', color: 'var(--sky)'      },
]

const sparkles = Array.from({ length: 22 }, (_, i) => {
  const entry = ENTRIES[i % ENTRIES.length]
  return {
    id: i,
    ...entry,
    style: {
      left:              `${rand(4, 92)}%`,
      top:               `${rand(4, 92)}%`,
      fontSize:          `${rand(8, 18)}px`,
      color:             entry.color,
      animationDelay:    `${rand(0, 9)}s`,
      animationDuration: `${rand(4, 10)}s`,
    },
  }
})
</script>

<style scoped>
.sparkle-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  /* No overflow, no contain needed — nothing moves */
}

.sparkle {
  position: absolute;
  display: block;
  /* Only opacity + scale — both GPU composited, zero layout impact */
  will-change: opacity, transform;
  transform: translateZ(0);
  animation: sparkle-pulse ease-in-out infinite;
  user-select: none;
}

@keyframes sparkle-pulse {
  0%   { opacity: 0;    transform: translateZ(0) scale(0.4) rotate(0deg);   }
  30%  { opacity: 1;    transform: translateZ(0) scale(1.1) rotate(20deg);  }
  60%  { opacity: 0.6;  transform: translateZ(0) scale(0.9) rotate(-10deg); }
  100% { opacity: 0;    transform: translateZ(0) scale(0.4) rotate(0deg);   }
}
</style>
