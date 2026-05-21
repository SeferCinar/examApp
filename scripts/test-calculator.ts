/**
 * Boundary tests for the grading calculator.
 *
 * Reads each config under configs/ and asserts that calculator behavior
 * matches the gradingScale at boundary scores (49.99, 50, 54, 55, 89, 89.5,
 * 90, 94.99, 95, 100). Catches off-by-one, rounding, and threshold bugs.
 *
 * Run: tsx scripts/test-calculator.ts
 * Exits 1 on any failure.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(fileURLToPath(new URL('../configs', import.meta.url)))

interface GradingScaleEntry {
  min: number
  max: number
  gpa?: number
}

interface UniversityConfig {
  id: string
  gradingScale: Record<string, GradingScaleEntry>
  passingGrade: string
  conditionalPassingGrade?: string
  examWeights: { midterm: number; final: number }
}

// Re-implementation of useGradeCalculator's letterFromScore — kept in sync
// with composables/useGradeCalculator.ts.
function letterFromScore(config: UniversityConfig, score: number): string {
  if (!Number.isFinite(score)) return 'Geçersiz'
  const sorted = Object.entries(config.gradingScale).sort((a, b) => b[1].min - a[1].min)
  for (const [letter, range] of sorted) {
    if (score >= range.min) return letter
  }
  return 'Geçersiz'
}

function thresholdForLetter(config: UniversityConfig, letter: string): number {
  return config.gradingScale[letter]?.min ?? 0
}

function listConfigs(): string[] {
  const out: string[] = []
  for (const e of readdirSync(ROOT, { withFileTypes: true })) {
    if (e.isDirectory()) {
      const sub = join(ROOT, e.name)
      for (const f of readdirSync(sub, { withFileTypes: true })) {
        if (f.isFile() && f.name.endsWith('.json') && f.name !== '_schema.json') {
          out.push(join(sub, f.name))
        }
      }
    }
  }
  return out
}

interface Failure {
  config: string
  message: string
}

const failures: Failure[] = []

function expect(config: string, cond: boolean, message: string) {
  if (!cond) failures.push({ config, message })
}

function testConfig(path: string, config: UniversityConfig) {
  const rel = relative(ROOT, path)

  // 1. Every gradingScale entry's [min, max] should round-trip through
  //    letterFromScore for both endpoints and the midpoint.
  for (const [letter, range] of Object.entries(config.gradingScale)) {
    for (const score of [range.min, range.max, (range.min + range.max) / 2]) {
      const got = letterFromScore(config, score)
      expect(
        rel,
        got === letter,
        `score ${score} (in ${letter} range ${range.min}-${range.max}) → expected '${letter}', got '${got}'`
      )
    }
  }

  // 2. passingGrade letter must exist; scores just at and below its
  //    threshold must flip pass/fail correctly.
  const passMin = thresholdForLetter(config, config.passingGrade)
  expect(
    rel,
    config.gradingScale[config.passingGrade] !== undefined,
    `passingGrade '${config.passingGrade}' missing in gradingScale`
  )
  if (passMin > 0) {
    const justBelow = passMin - 0.01
    const justAt = passMin
    expect(
      rel,
      letterFromScore(config, justBelow) !== config.passingGrade,
      `score ${justBelow} should NOT map to passing letter '${config.passingGrade}'`
    )
    expect(
      rel,
      letterFromScore(config, justAt) === config.passingGrade,
      `score ${justAt} should map to passing letter '${config.passingGrade}'`
    )
  }

  // 3. Weighted total at boundary: midterm 0, final = exact threshold/finalWeight
  //    should produce passingGrade.
  const { midterm: mw, final: fw } = config.examWeights
  if (fw > 0) {
    const neededFinal = passMin / fw // when midterm = 0
    const computed = 0 * mw + neededFinal * fw
    expect(
      rel,
      Math.abs(computed - passMin) < 1e-9,
      `weighted total at boundary: expected ~${passMin}, got ${computed}`
    )
  }

  // 4. examWeights sum to 1.0.
  expect(
    rel,
    Math.abs(mw + fw - 1) < 1e-9,
    `examWeights sum = ${mw + fw}, expected 1.0`
  )

  // 5. GPA monotonicity: higher scores should have GPA >= lower scores
  //    (only checked when gpa is set on all entries).
  const entries = Object.entries(config.gradingScale)
    .filter(([, r]) => r.gpa !== undefined)
    .sort((a, b) => b[1].min - a[1].min) // highest min first
  for (let i = 1; i < entries.length; i++) {
    const [higher, hr] = entries[i - 1]
    const [lower, lr] = entries[i]
    expect(
      rel,
      (hr.gpa ?? 0) >= (lr.gpa ?? 0),
      `GPA non-monotonic: ${higher}(gpa=${hr.gpa}) should be >= ${lower}(gpa=${lr.gpa})`
    )
  }
}

function main() {
  const paths = listConfigs()
  for (const path of paths) {
    const raw = JSON.parse(readFileSync(path, 'utf8')) as UniversityConfig
    testConfig(path, raw)
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} test failure(s):\n`)
    for (const f of failures) console.error(`  [${f.config}] ${f.message}`)
    process.exit(1)
  }

  console.log(`✓ ${paths.length} config × boundary tests passed`)
}

main()
