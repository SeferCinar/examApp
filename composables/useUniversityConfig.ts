import type { UniversityConfig } from '~/types/config'

const configModules = import.meta.glob('../configs/**/*.json') as Record<
  string,
  () => Promise<{ default: UniversityConfig } | UniversityConfig>
>

const cache = new Map<string, UniversityConfig | null>()

export async function useUniversityConfig(
  id: string
): Promise<UniversityConfig | null> {
  if (cache.has(id)) return cache.get(id) ?? null

  const dashIdx = id.indexOf('-')
  if (dashIdx === -1) {
    cache.set(id, null)
    return null
  }

  const uni = id.slice(0, dashIdx)
  const dept = id.slice(dashIdx + 1)
  const path = `../configs/${uni}/${dept}.json`

  const loader = configModules[path]
  if (!loader) {
    cache.set(id, null)
    return null
  }

  const mod = await loader()
  const config = (mod as { default?: UniversityConfig }).default ?? (mod as UniversityConfig)
  cache.set(id, config)
  return config
}
