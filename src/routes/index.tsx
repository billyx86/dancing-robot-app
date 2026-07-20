import { createFileRoute } from '@tanstack/react-router'
import { DancingRobot } from '../components/DancingRobot'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(200,255,46,0.08) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 20% 20%, rgba(30,42,56,0.9) 0%, transparent 50%)',
        }}
      />
      <div className="relative z-10 w-full max-w-3xl px-4 py-6 sm:py-10 flex flex-col items-center gap-4">
        <header className="text-center mb-1">
          <h1
            className="font-black uppercase tracking-tight leading-none text-transparent bg-clip-text"
            style={{
              fontSize: 'clamp(1.8rem, 6vw, 3rem)',
              backgroundImage:
                'linear-gradient(135deg, #c8ff2e 0%, #fff 50%, #c8ff2e 100%)',
            }}
          >
            Beep Boop Disco Bot
          </h1>
          <p className="mt-2 text-sm sm:text-base font-semibold tracking-wide text-[#7a8a9a]">
            Nightclub firmware. Zero dignity. Maximum groove.
          </p>
        </header>
        <DancingRobot />
      </div>
    </main>
  )
}
