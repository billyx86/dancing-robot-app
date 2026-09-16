import { useCallback, useEffect, useState } from 'react'
import {
  type DanceMode,
  MODES,
  captionFor,
  nextMode,
} from '../lib/dance'
import { readStoredMode, writeStoredMode } from '../lib/storage'

export function DancingRobot() {
  const [mode, setMode] = useState<DanceMode>(readStoredMode)
  const [captionIdx, setCaptionIdx] = useState(0)
  const [captionKey, setCaptionKey] = useState(0)

  const caption = captionFor(mode, captionIdx)

  // Remember the chosen mode so a refresh keeps the last dance.
  useEffect(() => {
    writeStoredMode(mode)
  }, [mode])

  const applyMode = useCallback((next: DanceMode) => {
    setMode(next)
    setCaptionIdx((i) => i + 1)
    setCaptionKey((k) => k + 1)
  }, [])

  const cycleMode = useCallback(() => {
    setMode((m) => nextMode(m))
    setCaptionIdx((i) => i + 1)
    setCaptionKey((k) => k + 1)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setCaptionIdx((i) => i + 1)
      setCaptionKey((k) => k + 1)
    }, 3500)
    return () => window.clearInterval(id)
  }, [mode])

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <p
        key={captionKey}
        aria-live="polite"
        className="caption-anim min-h-[2.5rem] text-center text-sm sm:text-lg font-extrabold uppercase tracking-widest text-[#c8ff2e]"
      >
        {caption}
      </p>

      <div
        className="relative w-full max-w-[420px] aspect-square cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff2e] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0c1218] rounded-2xl"
        role="button"
        tabIndex={0}
        aria-label={`Dancing robot, currently in ${mode} mode. Press to switch to the next dance mode.`}
        onClick={cycleMode}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            cycleMode()
          }
        }}
      >
        <div
          className="floor-anim pointer-events-none absolute left-[8%] right-[8%] bottom-[6%] h-[18%] rounded-full opacity-70"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(200,255,46,0.15) 50%, transparent 100%), repeating-linear-gradient(90deg, #1e2a38 0 12px, transparent 12px 24px), repeating-linear-gradient(0deg, #1e2a38 0 12px, transparent 12px 24px)',
            transform: 'perspective(200px) rotateX(60deg)',
          }}
          aria-hidden
        />

        {['♪', '♫', '♩', '♬'].map((n, i) => (
          <span
            key={n}
            className="note-float pointer-events-none absolute text-[#c8ff2e] text-xl"
            style={{
              left: i % 2 === 0 ? `${6 + i * 3}%` : undefined,
              right: i % 2 === 1 ? `${8 + i}%` : undefined,
              top: `${22 + i * 8}%`,
              animationDelay: `${i * 0.7}s`,
            }}
            aria-hidden
          >
            {n}
          </span>
        ))}

        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="sparkle-anim pointer-events-none absolute h-2 w-2 rounded-full bg-[#c8ff2e] shadow-[0_0_12px_#c8ff2e]"
            style={{
              left: i === 0 ? '18%' : i === 1 ? undefined : '22%',
              right: i === 1 ? '20%' : undefined,
              top: i === 2 ? undefined : i === 0 ? '18%' : '30%',
              bottom: i === 2 ? '30%' : undefined,
              animationDelay: `${0.3 + i * 0.8}s`,
            }}
            aria-hidden
          />
        ))}

        <svg
          className={`bot mode-${mode} h-full w-full overflow-visible`}
          viewBox="0 0 400 420"
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="botTitle botDesc"
        >
          <title id="botTitle">Dancing robot</title>
          <desc id="botDesc">
            A silly blocky robot with googly eyes dancing on a disco floor
          </desc>

          <g className="body-bounce">
            <ellipse cx="200" cy="390" rx="70" ry="12" fill="#000" opacity="0.35" />

            <g className="leg-l">
              <rect x="158" y="300" width="28" height="62" rx="8" fill="#2a3a4d" stroke="#1a2533" strokeWidth="3" />
              <rect x="148" y="354" width="48" height="18" rx="6" fill="#1e2a38" stroke="#141c26" strokeWidth="2" />
              <rect x="152" y="358" width="16" height="6" rx="2" fill="#c8ff2e" className="led" opacity="0.85" />
            </g>

            <g className="leg-r">
              <rect x="214" y="300" width="28" height="62" rx="8" fill="#2a3a4d" stroke="#1a2533" strokeWidth="3" />
              <rect x="204" y="354" width="48" height="18" rx="6" fill="#1e2a38" stroke="#141c26" strokeWidth="2" />
              <rect x="232" y="358" width="16" height="6" rx="2" fill="#c8ff2e" className="led" opacity="0.85" />
            </g>

            <g className="torso-group">
              <rect x="130" y="175" width="140" height="135" rx="18" fill="#2a3a4d" stroke="#1a2533" strokeWidth="4" />
              <rect x="142" y="190" width="116" height="72" rx="10" fill="#141c26" stroke="#0c1218" strokeWidth="2" />
              <circle cx="165" cy="212" r="7" fill="#c8ff2e" className="led" />
              <circle cx="190" cy="212" r="7" fill="#c8ff2e" className="led" style={{ animationDelay: '0.15s' }} />
              <circle cx="215" cy="212" r="7" fill="#c8ff2e" className="led" style={{ animationDelay: '0.3s' }} />
              <circle cx="240" cy="212" r="7" fill="#c8ff2e" className="led" style={{ animationDelay: '0.45s' }} />
              <rect x="155" y="232" width="90" height="10" rx="3" fill="#c8ff2e" className="led" opacity="0.7" />
              <rect x="165" y="250" width="70" height="6" rx="2" fill="#8ab81f" opacity="0.5" />
              <circle cx="200" cy="280" r="8" fill="#1e2a38" stroke="#c8ff2e" strokeWidth="2" />
              <circle cx="200" cy="280" r="3" fill="#c8ff2e" />

              <g className="arm-l">
                <rect x="88" y="185" width="48" height="22" rx="10" fill="#2a3a4d" stroke="#1a2533" strokeWidth="3" />
                <rect x="78" y="200" width="22" height="70" rx="10" fill="#2a3a4d" stroke="#1a2533" strokeWidth="3" />
                <circle cx="89" cy="278" r="16" fill="#1e2a38" stroke="#c8ff2e" strokeWidth="3" />
                <circle cx="89" cy="278" r="6" fill="#c8ff2e" className="led" />
              </g>

              <g className="arm-r">
                <rect x="264" y="185" width="48" height="22" rx="10" fill="#2a3a4d" stroke="#1a2533" strokeWidth="3" />
                <rect x="300" y="200" width="22" height="70" rx="10" fill="#2a3a4d" stroke="#1a2533" strokeWidth="3" />
                <circle cx="311" cy="278" r="16" fill="#1e2a38" stroke="#c8ff2e" strokeWidth="3" />
                <circle cx="311" cy="278" r="6" fill="#c8ff2e" className="led" />
              </g>
            </g>

            <g className="head-group">
              <rect x="185" y="155" width="30" height="24" rx="4" fill="#1e2a38" stroke="#141c26" strokeWidth="2" />

              <g className="antenna">
                <line x1="200" y1="58" x2="200" y2="78" stroke="#2a3a4d" strokeWidth="5" strokeLinecap="round" />
                <circle cx="200" cy="50" r="12" fill="#ff4d6a" stroke="#1a2533" strokeWidth="2" />
                <circle cx="200" cy="50" r="5" fill="#fff" opacity="0.5" />
              </g>

              <rect x="135" y="78" width="130" height="90" rx="22" fill="#2a3a4d" stroke="#1a2533" strokeWidth="4" />
              <rect x="148" y="92" width="104" height="62" rx="14" fill="#0c1218" />

              <g className="eye-l">
                <circle cx="170" cy="118" r="22" fill="#fff" />
                <circle className="eye-l-pupil" cx="174" cy="122" r="10" fill="#0c1218" />
                <circle cx="178" cy="118" r="4" fill="#fff" opacity="0.9" />
                <ellipse className="eye-l-lid" cx="170" cy="118" rx="22" ry="22" fill="#2a3a4d" />
              </g>
              <g className="eye-r">
                <circle cx="230" cy="118" r="22" fill="#fff" />
                <circle className="eye-r-pupil" cx="226" cy="122" r="10" fill="#0c1218" />
                <circle cx="230" cy="116" r="4" fill="#fff" opacity="0.9" />
                <ellipse className="eye-r-lid" cx="230" cy="118" rx="22" ry="22" fill="#2a3a4d" />
              </g>

              <path
                d="M165 145 Q200 168 235 145"
                fill="none"
                stroke="#c8ff2e"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <ellipse cx="152" cy="138" rx="8" ry="5" fill="#ff4d6a" opacity="0.35" />
              <ellipse cx="248" cy="138" rx="8" ry="5" fill="#ff4d6a" opacity="0.35" />

              <circle cx="135" cy="120" r="8" fill="#1e2a38" stroke="#c8ff2e" strokeWidth="2" />
              <circle cx="265" cy="120" r="8" fill="#1e2a38" stroke="#c8ff2e" strokeWidth="2" />
            </g>
          </g>
        </svg>
      </div>

      <p className="mt-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#7a8a9a]">
        MODE: <span className="text-[#c8ff2e]">{mode.toUpperCase()}</span>
      </p>

      <div className="mt-1 flex flex-wrap justify-center gap-2" role="group" aria-label="Dance modes">
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={m === mode}
            onClick={(e) => {
              e.stopPropagation()
              applyMode(m)
            }}
            className={
              m === mode
                ? 'rounded-full border-2 border-[#c8ff2e] bg-[#c8ff2e] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#0a1008] shadow-[0_0_24px_rgba(200,255,46,0.35)] transition hover:-translate-y-0.5'
                : 'rounded-full border-2 border-[#2a3a4d] bg-[#141c26] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#e8eef5] transition hover:-translate-y-0.5 hover:border-[#8ab81f]'
            }
          >
            {m}
          </button>
        ))}
      </div>

      <p className="mt-1 max-w-md text-center text-sm font-semibold text-[#7a8a9a]">
        Tap the bot (or a mode) to switch dances. Prefers reduced motion? It freezes mid-pose.
      </p>
    </div>
  )
}
