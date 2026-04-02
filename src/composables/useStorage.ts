import type { GuessResult } from '../types/character'

const PREFIX = 'sailormoondle'

function todayKey(): string {
  return `${PREFIX}-${new Date().toISOString().slice(0, 10)}`
}

interface PersistedState {
  guesses: GuessResult[]
  status: 'playing' | 'won' | 'lost'
}

export function loadState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(todayKey())
    if (!raw) return null
    return JSON.parse(raw) as PersistedState
  } catch {
    return null
  }
}

export function saveState(state: PersistedState): void {
  localStorage.setItem(todayKey(), JSON.stringify(state))
}
