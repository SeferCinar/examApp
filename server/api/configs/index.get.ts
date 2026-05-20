import type { UniversityConfig } from '~/types/config'

export interface ConfigSummary {
  id: string
  universitySlug: string
  departmentSlug: string
  university: {
    tr: string
    en?: string
    shortCode: string
  }
  department: {
    tr: string
    en?: string
  }
}

export default defineEventHandler(async (): Promise<ConfigSummary[]> => {
  const storage = useStorage('assets:configs')
  const keys = await storage.getKeys()

  const summaries: ConfigSummary[] = []

  for (const rawKey of keys) {
    if (!rawKey.endsWith('.json')) continue

    const cleanKey = rawKey.replace(/\.json$/, '')
    const segments = cleanKey.split(':')
    if (segments.length !== 2) continue

    const [universitySlug, departmentSlug] = segments
    if (universitySlug.startsWith('_') || departmentSlug.startsWith('_')) continue

    const config = await storage.getItem<UniversityConfig>(rawKey)
    if (!config?.id || !config.university || !config.department) continue

    summaries.push({
      id: config.id,
      universitySlug,
      departmentSlug,
      university: config.university,
      department: config.department,
    })
  }

  summaries.sort(
    (a, b) =>
      a.university.tr.localeCompare(b.university.tr, 'tr') ||
      a.department.tr.localeCompare(b.department.tr, 'tr')
  )

  return summaries
})
