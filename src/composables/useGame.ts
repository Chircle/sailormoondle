import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Character, GuessResult, HintResult, Season } from '../types/character'
import { getDailyCharacter, getPuzzleNumber } from './useDailyCharacter'
import { loadState, saveState } from './useStorage'

const MAX_GUESSES = 8
const SEASON_ORDER: Season[] = ['Classic', 'R', 'S', 'SuperS', 'Stars']

function compareSeasons(a: Season, b: Season): HintResult {
  if (a === b) return 'correct'
  const diff = Math.abs(SEASON_ORDER.indexOf(a) - SEASON_ORDER.indexOf(b))
  return diff === 1 ? 'partial' : 'wrong'
}

function compareAffiliation(guess: string, target: string): HintResult {
  if (guess === target) return 'correct'
  // Same broad kingdom/group = partial
  const sameGroup = (a: string, b: string) => {
    const groups = [
      ['Dark Kingdom'],
      ['Black Moon'],
      ['Death Busters'],
      ['Dead Moon'],
      ['Shadow Galactica'],
      ['Silver Millennium', 'Earth/Ally'],
    ]
    return groups.some(g => g.includes(a) && g.includes(b))
  }
  return sameGroup(guess, target) ? 'partial' : 'wrong'
}

function compareRole(guess: string, target: string): HintResult {
  if (guess === target) return 'correct'
  const senshi = ['Inner Senshi', 'Outer Senshi', 'Starlight']
  if (senshi.includes(guess) && senshi.includes(target)) return 'partial'
  return 'wrong'
}

function buildGuessResult(guessed: Character, target: Character): GuessResult {
  return {
    character: guessed,
    hints: {
      affiliation: {
        value: guessed.affiliation,
        result: compareAffiliation(guessed.affiliation, target.affiliation),
      },
      role: {
        value: guessed.role,
        result: compareRole(guessed.role, target.role),
      },
      element: {
        value: guessed.element,
        result: guessed.element === target.element ? 'correct' : 'wrong',
      },
      hairColor: {
        value: guessed.hairColor,
        result: guessed.hairColor === target.hairColor ? 'correct' : 'wrong',
      },
      eyeColor: {
        value: guessed.eyeColor,
        result: guessed.eyeColor === target.eyeColor ? 'correct' : 'wrong',
      },
      firstAppearance: {
        value: guessed.firstAppearance,
        result: compareSeasons(guessed.firstAppearance, target.firstAppearance),
      },
      gender: {
        value: guessed.gender,
        result: guessed.gender === target.gender ? 'correct' : 'wrong',
      },
    },
  }
}

export function useGame() {
  const { t } = useI18n()
  const target = getDailyCharacter()
  const puzzleNumber = getPuzzleNumber()

  const saved = loadState()
  const guesses = ref<GuessResult[]>(saved?.guesses ?? [])
  const status = ref<'playing' | 'won' | 'lost'>(saved?.status ?? 'playing')

  const guessedIds = computed(() => new Set(guesses.value.map(g => g.character.id)))

  function submitGuess(character: Character) {
    if (status.value !== 'playing') return
    if (guessedIds.value.has(character.id)) return

    const result = buildGuessResult(character, target)
    guesses.value.push(result)

    const won = Object.values(result.hints).every(h => h.result === 'correct')
    if (won) {
      status.value = 'won'
    } else if (guesses.value.length >= MAX_GUESSES) {
      status.value = 'lost'
    }

    saveState({ guesses: guesses.value, status: status.value })
  }

  function buildShareText(): string {
    const emojiMap: Record<HintResult, string> = {
      correct: '🟩',
      partial: '🟨',
      wrong: '⬛',
    }
    const header = `Sailormoondle #${puzzleNumber} 🌙\n${guesses.value.length}/${MAX_GUESSES}`
    const grid = guesses.value
      .map(g =>
        Object.values(g.hints)
          .map(h => emojiMap[h.result])
          .join(''),
      )
      .join('\n')
    const url = window.location.origin + window.location.pathname
    const footer = `${t('playSailormoondle')}: ${url}`
    return `${header}\n\n${grid}\n\n${footer}`
  }

  return {
    target,
    puzzleNumber,
    guesses,
    status,
    guessedIds,
    maxGuesses: MAX_GUESSES,
    submitGuess,
    buildShareText,
  }
}
