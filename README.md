# Beep Boop Disco Bot

A hilarious animated SVG dancing robot with CSS keyframe dances.

## Quick look

Open `index.html` in a browser for the zero-dependency demo, or run the TanStack Start app:

```bash
npm install
npm run dev
```

## Features

- Full SVG robot: googly eyes, wobbling antenna, LED panel, dancing limbs
- Four modes: Groove, Robot, Breakdance, Panic
- **Dance mode is remembered** — the last chosen mode persists across reloads via `localStorage` (falls back to Groove for missing/corrupt values)
- Cycling funny captions
- Disco floor, music notes, sparkles
- `prefers-reduced-motion` freezes to a static pose
- Dark playful aesthetic with electric lime accent
- Social meta (Open Graph + Twitter card) and a 1200×630 `og-image.png` for chat link previews
- Branded `404` page and an SVG/favicon icon
- `scripts/check-modes.mjs` CI guard keeps the React app's `MODES` list and the vanilla fallback's `modes` array in sync

Live standalone page: open `index.html`.
