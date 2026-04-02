<template>
  <div
    class="avatar-wrap"
    :class="{ large }"
    @mouseenter="onEnter"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <div class="avatar" :style="avatarStyle">
      <img
        v-if="src && imgOk"
        :src="src"
        :alt="name"
        class="avatar-img"
        @error="imgOk = false"
      />
      <div v-else class="avatar-placeholder">
        <span class="moon-icon">☽</span>
        <span class="initials">{{ initials }}</span>
      </div>
    </div>
  </div>

  <!-- Zoom preview — only when image is available and not already large -->
  <Teleport to="body">
    <Transition name="zoom-preview">
      <div
        v-if="showPreview && imgOk && src && !large"
        class="zoom-preview"
        :style="previewStyle"
      >
        <img :src="src" :alt="name" class="zoom-img" />
        <span class="zoom-name">{{ name }}</span>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const PREVIEW_SIZE = 200
const OFFSET = 16 // gap from cursor

const props = defineProps<{
  id: string
  name: string
  src?: string
  large?: boolean
}>()

const imgOk = ref(true)
const showPreview = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

function idToHue(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xfffff
  return h % 360
}

const hue = computed(() => idToHue(props.id))

const avatarStyle = computed(() => ({
  background: `linear-gradient(135deg,
    hsl(${hue.value}, 80%, 88%) 0%,
    hsl(${(hue.value + 40) % 360}, 70%, 82%) 100%)`,
}))

const initials = computed(() =>
  props.name
    .replace(/^(Sailor|Queen|Prince|Princess|Professor)\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase(),
)

// Keep preview inside the viewport
const previewStyle = computed(() => {
  const vw = window.innerWidth
  const vh = window.innerHeight
  let x = mouseX.value + OFFSET
  let y = mouseY.value + OFFSET

  if (x + PREVIEW_SIZE > vw) x = mouseX.value - PREVIEW_SIZE - OFFSET
  if (y + PREVIEW_SIZE + 32 > vh) y = mouseY.value - PREVIEW_SIZE - 32 - OFFSET

  return { left: `${x}px`, top: `${y}px` }
})

function onEnter() { showPreview.value = true }
function onLeave() { showPreview.value = false }
function onMove(e: MouseEvent) {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}
</script>

<style scoped>
.avatar-wrap {
  position: relative;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  cursor: zoom-in;
}

.avatar-wrap.large {
  width: 140px;
  height: 140px;
  cursor: default;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.moon-icon { font-size: 0.9em; opacity: 0.6; line-height: 1; }
.large .moon-icon { font-size: 1.4em; }
.initials { font-size: 0.55em; font-weight: 800; color: rgba(43,45,66,0.75); line-height: 1; }
.large .initials { font-size: 0.85em; }

/* ── Zoom preview (Teleported to body) ── */
.zoom-preview {
  position: fixed;
  z-index: 999;
  width: 200px;
  background: var(--color-surface-strong);
  border: 1.5px solid rgba(205, 180, 255, 0.45);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 32px rgba(205, 180, 255, 0.35), 0 2px 8px rgba(0,0,0,0.08);
  overflow: hidden;
  pointer-events: none;
  backdrop-filter: blur(12px);
}

.zoom-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.zoom-name {
  display: block;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--navy);
  padding: 6px 8px;
  background: rgba(255,255,255,0.6);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Transition */
.zoom-preview-enter-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.zoom-preview-leave-active { transition: opacity 0.1s ease; }
.zoom-preview-enter-from  { opacity: 0; transform: scale(0.92); }
.zoom-preview-leave-to    { opacity: 0; }
</style>
