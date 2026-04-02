import { characters } from '../data/characters'
import type { Character } from '../types/character'

const MS_PER_DAY = 86_400_000
const EPOCH = new Date('2024-01-01').getTime()

export function getDayIndex(): number {
  return Math.floor((Date.now() - EPOCH) / MS_PER_DAY)
}

export function getDailyCharacter(): Character {
  const index = getDayIndex() % characters.length
  return characters[index]
}

export function getPuzzleNumber(): number {
  return getDayIndex() + 1
}

export function getMsUntilNextDay(): number {
  const now = Date.now()
  const todayStart = Math.floor((now - EPOCH) / MS_PER_DAY) * MS_PER_DAY + EPOCH
  return todayStart + MS_PER_DAY - now
}
