// GitHub Pages has no SPA rewrite rule. Serving a copy of index.html as
// 404.html lets deep links such as /projects resolve to the React router.
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve(process.cwd(), 'dist')
const index = resolve(dist, 'index.html')
const fallback = resolve(dist, '404.html')

if (!existsSync(index)) {
  console.error('spa-fallback: dist/index.html not found. Run `vite build` first.')
  process.exit(1)
}

copyFileSync(index, fallback)
console.log('spa-fallback: wrote dist/404.html')
