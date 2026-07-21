import { preview } from 'vite'
import puppeteer from 'puppeteer'
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const base = '/original-sound-player-page'
const routes = [base + '/', base + '/guide', base + '/faq', base + '/visualization']
const outDir = resolve('docs')

const meta = {
  '/': {
    title: '原音HQ播放器 · OriginalSound HQ',
    description: '原音HQ播放器 — 为现代聆听而生的本地音乐播放器。沉浸式界面、极致音质、高度可定制。基于 WinUI 3 与 WASAPI。',
  },
  '/guide': {
    title: '用户指南 · 原音HQ播放器',
    description: '原音HQ播放器完整使用指南：快捷键、均衡器、音频设置、界面自定义等全部配置项详解。',
  },
  '/faq': {
    title: '常见问题 · 原音HQ播放器',
    description: '原音HQ播放器常见问题解答：安装配置、音频格式、性能优化、故障排除等。',
  },
  '/visualization': {
    title: '音频可视化 · 原音HQ播放器',
    description: '原音HQ播放器频谱可视化功能详解：实时FFT分析、多种视觉效果、高性能渲染。',
  },
}

const server = await preview({
  preview: {
    port: 4173,
    strictPort: true,
  },
})

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

const page = await browser.newPage()
page.setDefaultNavigationTimeout(30000)

for (const route of routes) {
  const url = `http://localhost:4173${route}`
  console.log(`Prerendering: ${route}`)

  await page.goto(url, { waitUntil: 'networkidle0' })
  await page.waitForSelector('#app', { timeout: 10000 })
  // small extra wait for head updates
  await new Promise(r => setTimeout(r, 500))

  let html = await page.content()

  const key = route.replace(base, '') || '/'
  const m = meta[key]

  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${m.title}</title>`
  )
  html = html.replace(
    /<meta name="description" content=".*?"/,
    `<meta name="description" content="${m.description}"`
  )

  const subpath = route.replace(base, '') || '/'
  const dir = subpath === '/' ? outDir : resolve(outDir, subpath.slice(1))
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  const filePath = resolve(dir, 'index.html')
  writeFileSync(filePath, html, 'utf-8')
  console.log(`  -> ${filePath} (${html.length} bytes)`)
}

await browser.close()
await server.close()
console.log('Prerender complete.')
