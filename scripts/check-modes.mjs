#!/usr/bin/env node
// Parity guard: the React app (src/lib/dance.ts MODES) and the vanilla
// fallback (index.html / public/demo.html `modes` array) must list the
// same dance modes in the same order. If they drift, CI fails here.
// See issue: "public/demo.html is a second, divergent implementation".
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function read(rel) {
  return readFileSync(join(root, rel), 'utf8')
}

// Pull the quoted mode tokens out of a JS array literal like ['a', 'b'].
function modesFrom(text, pattern) {
  const match = text.match(pattern)
  if (!match) return null
  return [...match[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1])
}

const react = modesFrom(
  read('src/lib/dance.ts'),
  /MODES[^=]*=\s*\[([^\]]*)\]/,
)
const indexHtml = modesFrom(read('index.html'), /\bmodes\s*=\s*\[([^\]]*)\]/)
const demoHtml = modesFrom(read('public/demo.html'), /\bmodes\s*=\s*\[([^\]]*)\]/)

const same = (a, b) =>
  Array.isArray(a) && a.length === b.length && a.every((v, i) => v === b[i])

let failed = false
const report = (label, value) => {
  const ok = value != null
  if (!ok) failed = true
  console.log(`  ${ok ? 'ok  ' : 'MISS'} ${label}: ${JSON.stringify(value)}`)
}

console.log('Mode parity check')
report('src/lib/dance.ts  MODES   ', react)
report('index.html        modes   ', indexHtml)
report('public/demo.html  modes   ', demoHtml)

if (react && indexHtml && !same(react, indexHtml)) {
  failed = true
  console.log('  FAIL index.html modes differ from React MODES')
}
if (react && demoHtml && !same(react, demoHtml)) {
  failed = true
  console.log('  FAIL public/demo.html modes differ from React MODES')
}

if (failed) {
  console.error(
    '\nDance-mode lists drifted. Update the `MODES` list in src/lib/dance.ts ' +
      "and the `modes` array in index.html / public/demo.html to match.",
  )
  process.exit(1)
}
console.log('  All dance-mode lists agree.')
