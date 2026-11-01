import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

async function generate() {
  const serverPath = path.resolve('.output/server/index.mjs')
  const serverUrl = pathToFileURL(serverPath).href
  const { default: server } = await import(serverUrl)

  const requestUrl = 'https://diwakarsharma2216.github.io/'
  const request = new Request(requestUrl, {
    headers: {
      accept: 'text/html',
      'user-agent': 'Mozilla/5.0 (compatible; StaticPrerender/1.0)',
    },
  })

  // Cloudflare Workers worker environment & context mock
  const env = {
    ASSETS: {
      fetch: async () => new Response(null, { status: 404 })
    }
  }
  const context = {
    waitUntil: () => {},
    passThroughOnException: () => {},
  }

  const res = await server.fetch(request, env, context)
  console.log('SSR Status Code:', res.status)
  if (res.status !== 200) {
    const errorText = await res.text()
    console.error(`Prerender failed with status ${res.status}:`, errorText)
    process.exit(1)
  }

  const html = await res.text()
  const outDir = path.resolve('.output/public')
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const indexPath = path.join(outDir, 'index.html')
  fs.writeFileSync(indexPath, html, 'utf8')
  console.log(`✓ Generated ${indexPath} (${(html.length / 1024).toFixed(1)} KB)`)

  const notFoundPath = path.join(outDir, '404.html')
  fs.writeFileSync(notFoundPath, html, 'utf8')
  console.log(`✓ Generated ${notFoundPath} (SPA fallback)`)

  const noJekyllPath = path.join(outDir, '.nojekyll')
  fs.writeFileSync(noJekyllPath, '', 'utf8')
  console.log(`✓ Generated ${noJekyllPath} (GitHub Pages Jekyll bypass)`)
}

generate().catch((err) => {
  console.error('Static generation error:', err)
  process.exit(1)
})
