const STORAGE_KEY = 'lastUsedConfig'

export interface LastUsedConfig {
  id: string
  university: string
  department: string
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function useLastUsedConfig() {
  function get(): LastUsedConfig | null {
    if (!isBrowser()) return null
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    try {
      const parsed = JSON.parse(raw) as Partial<LastUsedConfig>
      if (
        typeof parsed?.id === 'string' &&
        typeof parsed?.university === 'string' &&
        typeof parsed?.department === 'string'
      ) {
        return parsed as LastUsedConfig
      }
    } catch {
      // fall through
    }
    return null
  }

  function set(value: LastUsedConfig): void {
    if (!isBrowser()) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  }

  function clear(): void {
    if (!isBrowser()) return
    window.localStorage.removeItem(STORAGE_KEY)
  }

  return { get, set, clear }
}
