import { readFileSync, readdirSync } from 'node:fs'
import { join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv, { type ErrorObject } from 'ajv'
import addFormats from 'ajv-formats'

const ROOT = resolve(fileURLToPath(new URL('../configs', import.meta.url)))
const SCHEMA_FILE = '_schema.json'

interface Issue {
  file: string
  message: string
}

function listConfigFiles(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...listConfigFiles(full))
    } else if (entry.isFile() && entry.name.endsWith('.json') && entry.name !== SCHEMA_FILE) {
      out.push(full)
    }
  }
  return out
}

function loadSchema() {
  return JSON.parse(readFileSync(join(ROOT, SCHEMA_FILE), 'utf8'))
}

function formatAjvError(err: ErrorObject): string {
  const path = err.instancePath || '/'
  return `${path} ${err.message ?? 'invalid'}${err.params ? ` (${JSON.stringify(err.params)})` : ''}`
}

function checkExamWeights(config: any): string | null {
  const { midterm, final } = config.examWeights ?? {}
  if (typeof midterm !== 'number' || typeof final !== 'number') return null
  const sum = midterm + final
  if (Math.abs(sum - 1) > 1e-9) {
    return `examWeights.midterm + final = ${sum} (1.0 olmalı)`
  }
  return null
}

function checkGradingScale(config: any): string | null {
  const scale = config.gradingScale ?? {}
  const ranges = Object.entries(scale).map(([letter, r]: any) => ({
    letter,
    min: r.min,
    max: r.max,
  }))

  for (const r of ranges) {
    if (r.min > r.max) return `gradingScale.${r.letter}: min (${r.min}) > max (${r.max})`
  }

  ranges.sort((a, b) => a.min - b.min)

  for (let i = 1; i < ranges.length; i++) {
    if (ranges[i].min <= ranges[i - 1].max) {
      return `gradingScale: ${ranges[i - 1].letter} (${ranges[i - 1].min}-${ranges[i - 1].max}) ile ${ranges[i].letter} (${ranges[i].min}-${ranges[i].max}) çakışıyor`
    }
  }

  if (ranges.length === 0) return 'gradingScale boş'
  if (ranges[0].min !== 0) {
    return `gradingScale: en düşük aralık ${ranges[0].letter} (min ${ranges[0].min}) — 0'dan başlamalı`
  }
  if (ranges[ranges.length - 1].max !== 100) {
    const last = ranges[ranges.length - 1]
    return `gradingScale: en yüksek aralık ${last.letter} (max ${last.max}) — 100'e kadar gitmeli`
  }

  for (let i = 1; i < ranges.length; i++) {
    if (ranges[i].min !== ranges[i - 1].max + 1) {
      return `gradingScale: ${ranges[i - 1].letter} (max ${ranges[i - 1].max}) ile ${ranges[i].letter} (min ${ranges[i].min}) arasında boşluk var`
    }
  }

  return null
}

function checkPassingGradeRefs(config: any): string | null {
  const scale = config.gradingScale ?? {}
  if (config.passingGrade && !(config.passingGrade in scale)) {
    return `passingGrade '${config.passingGrade}' gradingScale içinde tanımlı değil`
  }
  if (config.conditionalPassingGrade && !(config.conditionalPassingGrade in scale)) {
    return `conditionalPassingGrade '${config.conditionalPassingGrade}' gradingScale içinde tanımlı değil`
  }
  return null
}

function expectedIdFromPath(filePath: string): string {
  const rel = relative(ROOT, filePath).split(sep)
  const dept = rel[rel.length - 1].replace(/\.json$/, '')
  const uni = rel.slice(0, -1).join('-')
  return uni ? `${uni}-${dept}` : dept
}

function main() {
  const schema = loadSchema()
  const ajv = new Ajv({ allErrors: true, strict: false })
  addFormats(ajv)
  const validate = ajv.compile(schema)

  const files = listConfigFiles(ROOT)
  const issues: Issue[] = []
  const idToFile = new Map<string, string>()

  for (const file of files) {
    const rel = relative(ROOT, file)
    let raw: unknown
    try {
      raw = JSON.parse(readFileSync(file, 'utf8'))
    } catch (e: any) {
      issues.push({ file: rel, message: `geçersiz JSON: ${e.message}` })
      continue
    }

    if (!validate(raw)) {
      for (const err of validate.errors ?? []) {
        issues.push({ file: rel, message: formatAjvError(err) })
      }
      continue
    }

    const config = raw as any

    const expected = expectedIdFromPath(file)
    if (config.id !== expected) {
      issues.push({
        file: rel,
        message: `id '${config.id}' dosya yolundan beklenen '${expected}' ile uyuşmuyor`,
      })
    }

    const dup = idToFile.get(config.id)
    if (dup) {
      issues.push({
        file: rel,
        message: `id '${config.id}' çakışıyor (zaten ${dup} içinde kullanılıyor)`,
      })
    } else {
      idToFile.set(config.id, rel)
    }

    const checks = [checkExamWeights, checkGradingScale, checkPassingGradeRefs]
    for (const check of checks) {
      const msg = check(config)
      if (msg) issues.push({ file: rel, message: msg })
    }
  }

  if (issues.length > 0) {
    console.error(`\n${issues.length} hata bulundu:\n`)
    for (const i of issues) {
      console.error(`  [${i.file}] ${i.message}`)
    }
    process.exit(1)
  }

  console.log(`✓ ${files.length} config geçerli`)
}

main()
