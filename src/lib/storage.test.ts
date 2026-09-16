import { beforeEach, describe, expect, it } from 'vitest'
import { MODES } from './dance'
import { MODE_STORAGE_KEY, readStoredMode, writeStoredMode } from './storage'

describe('dance-mode storage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('falls back to the first mode when nothing is stored', () => {
    expect(readStoredMode()).toBe(MODES[0])
  })

  it('restores a valid stored mode', () => {
    writeStoredMode('panic')
    expect(readStoredMode()).toBe('panic')
  })

  it('persists through a write/read round trip for every mode', () => {
    for (const mode of MODES) {
      writeStoredMode(mode)
      expect(readStoredMode()).toBe(mode)
    }
  })

  it('falls back to the first mode for a corrupt or unknown value', () => {
    window.localStorage.setItem(MODE_STORAGE_KEY, 'not-a-real-mode')
    expect(readStoredMode()).toBe(MODES[0])

    window.localStorage.setItem(MODE_STORAGE_KEY, 'GROOVE')
    expect(readStoredMode()).toBe(MODES[0])

    window.localStorage.setItem(MODE_STORAGE_KEY, '')
    expect(readStoredMode()).toBe(MODES[0])
  })
})
