import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { existsSync, statSync } from 'node:fs'
import { extname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import handler from './dist/server/server.js'

const CLIENT_DIR = new URL('./dist/client/', import.meta.url)
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000
const HOST = process.env.HOST || '0.0.0.0'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
}

function serveStatic(req, res, url) {
  const rel = normalize(url.pathname).replace(/^\/+/, '')
  const file = new URL(rel, CLIENT_DIR)
  if (!file.href.startsWith(CLIENT_DIR.href)) return false
  const p = fileURLToPath(file)
  if (existsSync(p) && statSync(p).isFile()) {
    return readFile(p).then((data) => {
      res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' })
      res.end(data)
      return true
    })
  }
  return false
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
  if (req.method === 'GET' || req.method === 'HEAD') {
    const done = await serveStatic(req, res, url)
    if (done) return
  }
  try {
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: req.method === 'GET' || req.method === 'HEAD' ? undefined : req,
      duplexer: req.method === 'GET' || req.method === 'HEAD' ? undefined : req,
    })
    const response = await handler.fetch(request)
    res.writeHead(response.status, Object.fromEntries(response.headers))
    const buf = Buffer.from(await response.arrayBuffer())
    res.end(req.method === 'HEAD' ? undefined : buf)
  } catch (err) {
    console.error(err)
    res.writeHead(500, { 'content-type': 'text/plain' })
    res.end('Internal Server Error')
  }
})

server.listen(PORT, HOST, () => {
  console.log(`Disco bot listening on http://${HOST}:${PORT}`)
})
