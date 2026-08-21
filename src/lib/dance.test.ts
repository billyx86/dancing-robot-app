import { describe, expect, it } from 'vitest'
import { CAPTIONS, MODES, captionFor, nextMode } from './dance'

describe('nextMode', () => {
  it('walks the mode cycle in order', () => {
    expect(nextMode('groove')).toBe('robot')
    expect(nextMode('robot')).toBe('breakdance')
    expect(nextMode('breakdance')).toBe('panic')
  })

  it('wraps from the last mode back to the first', () => {
    expect(nextMode('panic')).toBe('groove')
  })

  it('covers exactly the four modes', () => {
    expect(MODES).toEqual(['groove', 'robot', 'breakdance', 'panic'])
    let m = 'groove' as (typeof MODES)[number]
    for (let i = 0; i < MODES.length; i++) {
      m = nextMode(m)
    }
    expect(m).toBe('groove')
  })
})

describe('captionFor', () => {
  it('returns the caption at the given index', () => {
    expect(captionFor('groove', 0)).toBe('ERROR 404: DIGNITY NOT FOUND')
    expect(captionFor('panic', 1)).toBe('STACK OVERFLOW: FUN')
  })

  it('wraps around when the index exceeds the caption list length', () => {
    const len = CAPTIONS.groove.length
    expect(captionFor('groove', len)).toBe(CAPTIONS.groove[0])
    expect(captionFor('groove', len + 2)).toBe(CAPTIONS.groove[2])
  })

  it('gives every mode five unique captions', () => {
    for (const mode of MODES) {
      const list = CAPTIONS[mode]
      expect(list).toHaveLength(5)
      expect(new Set(list).size).toBe(5)
    }
  })
})
