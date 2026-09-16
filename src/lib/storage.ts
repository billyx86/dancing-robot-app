import { MODES, type DanceMode } from './dance'

/** localStorage key used to remember the last chosen dance mode. */
export const MODE_STORAGE_KEY = 'dancing-robot.mode'

/**
 * Read the last chosen dance mode from localStorage.
 * Returns the stored value when it is one of the known MODES, otherwise
 * falls back to the first mode ('groove').
 * Safe to call during SSR or without a DOM — always resolves to a valid mode.
 */
export function readStoredMode(): DanceMode {
  const fallback: DanceMode = MODES[0]
  try {
    if (typeof window === 'undefined' || !window.localStorage) return fallback
    const raw = window.localStorage.getItem(MODE_STORAGE_KEY)
    if (raw == null) return fallback
    return (MODES as readonly string[]).includes(raw) ? (raw as DanceMode) : fallback
  } catch {
    return fallback
  }
}

/** Persist a dance mode to localStorage. No-op when storage is unavailable. */
export function writeStoredMode(mode: DanceMode): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return
    window.localStorage.setItem(MODE_STORAGE_KEY, mode)
  } catch {
    // Storage unavailable (private mode, quota, etc.) — ignore silently.
  }
}
