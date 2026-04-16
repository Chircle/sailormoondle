export type Locale = 'en' | 'de' | 'ja' | 'fr' | 'pt-BR' | 'it'

export type Affiliation =
  | 'Silver Millennium'
  | 'Dark Kingdom'
  | 'Black Moon'
  | 'Death Busters'
  | 'Dead Moon'
  | 'Shadow Galactica'
  | 'Makaiju'
  | 'Earth/Ally'
  | 'Civilian'

export type Role =
  | 'Inner Senshi'
  | 'Outer Senshi'
  | 'Starlight'
  | 'Villain'
  | 'Antihero'
  | 'Ally'

export type Season = 'Classic' | 'R' | 'S' | 'SuperS' | 'Stars'

export type Gender = 'Female' | 'Male' | 'Non-binary'

export interface Character {
  id: string
  names: Record<Locale, string>
  image?: string   // path relative to /public, e.g. /images/characters/sailor-moon.png
  affiliation: Affiliation
  role: Role
  element: string
  hairColor: string
  eyeColor: string
  firstAppearance: Season
  gender: Gender
}

export type HintResult = 'correct' | 'partial' | 'wrong'

export interface AttributeHint {
  value: string
  result: HintResult
}

export interface GuessResult {
  character: Character
  hints: {
    affiliation: AttributeHint
    role: AttributeHint
    element: AttributeHint
    hairColor: AttributeHint
    eyeColor: AttributeHint
    firstAppearance: AttributeHint
    gender: AttributeHint
  }
}
