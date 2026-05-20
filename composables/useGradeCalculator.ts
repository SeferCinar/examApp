import type { UniversityConfig } from '~/types/config'

export interface GradeResult {
  score: number
  letter: string
  gpa: number | null
  passed: boolean
}

const INVALID_LETTER = 'Geçersiz'

export function useGradeCalculator(config: UniversityConfig) {
  const sortedScale = Object.entries(config.gradingScale)
    .sort((a, b) => b[1].min - a[1].min)

  function letterFromScore(score: number): string {
    if (!Number.isFinite(score)) return INVALID_LETTER
    for (const [letter, range] of sortedScale) {
      if (score >= range.min) return letter
    }
    return INVALID_LETTER
  }

  function gpaFromLetter(letter: string): number | null {
    return config.gradingScale[letter]?.gpa ?? null
  }

  function thresholdForLetter(letter: string): number {
    return config.gradingScale[letter]?.min ?? 0
  }

  const passingThreshold = thresholdForLetter(config.passingGrade)
  const conditionalPassingThreshold = config.conditionalPassingGrade
    ? thresholdForLetter(config.conditionalPassingGrade)
    : passingThreshold

  function calculateGrade(midterm: number, final: number): GradeResult {
    const { midterm: mw, final: fw } = config.examWeights
    const score = midterm * mw + final * fw
    const letter = letterFromScore(score)
    return {
      score,
      letter,
      gpa: gpaFromLetter(letter),
      passed: score >= passingThreshold,
    }
  }

  return {
    letterFromScore,
    gpaFromLetter,
    calculateGrade,
    thresholdForLetter,
    passingThreshold,
    conditionalPassingThreshold,
  }
}
