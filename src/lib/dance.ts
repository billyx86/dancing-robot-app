export type DanceMode = 'groove' | 'robot' | 'breakdance' | 'panic'

export const MODES: DanceMode[] = ['groove', 'robot', 'breakdance', 'panic']

export const CAPTIONS: Record<DanceMode, string[]> = {
  groove: [
    'ERROR 404: DIGNITY NOT FOUND',
    'BEEP BOOP FUNKY',
    'SERVOS SET TO SASSY',
    'BOOTING GROOVE.EXE',
    'HIP ACTUATORS ONLINE',
  ],
  robot: [
    'CLASSIC. STIFF. ICONIC.',
    'CALCULATING... FUN.',
    'STEP. STEP. BEEP.',
    'I AM NOT A TOASTER',
    'BINARY BOOGIE ENGAGED',
  ],
  breakdance: [
    'FLOOR? WHAT FLOOR?',
    'GYRO LOCK: DISABLED',
    'SPINNING AT UNSAFE RPM',
    'WARRANTY: VOIDED',
    'HEADSPIN.EXE RUNNING',
  ],
  panic: [
    'OH NO OH NO OH NO',
    'STACK OVERFLOW: FUN',
    'ABORT DANCE? TOO LATE',
    'COOLANT LEAKING GROOVE',
    'HELP I CANNOT STOP',
  ],
}

/** Next mode in the cycle; wraps from the last mode back to the first. */
export function nextMode(mode: DanceMode): DanceMode {
  const i = MODES.indexOf(mode)
  return MODES[(i + 1) % MODES.length]
}

/** Caption for a mode at a given (unbounded) index — wraps within the mode's caption list. */
export function captionFor(mode: DanceMode, index: number): string {
  const list = CAPTIONS[mode]
  return list[index % list.length]
}
