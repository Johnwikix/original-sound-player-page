export type Feature = {
  id: number
  title: string
  titleEn: string
  content: string
  contentEn: string
  image: string
  imageEn: string
  accent: 'amber' | 'cyan' | 'violet'
}

const base = (import.meta.env.BASE_URL || '/') + 'screenshots/'

export const featuresData: Feature[] = [
  {
    id: 1,
    title: '逐字歌词与着色器背景',
    titleEn: 'Word-by-word Lyrics & Shader Backgrounds',
    content:
      '7 种动态着色器背景（流体、PS3 XMB、旋转网格、液态流、渐变流动、波动、色彩共振）按封面取色实时渲染，支持光波与雾化氛围；播放页逐字歌词逐字点亮、字符浮动缩放，换行采用流波弹簧、逐行错峰等缓动曲线（可调）。',
    contentEn:
      'Seven dynamic shader backgrounds (Fluid, PS3 XMB, Rotating Mesh, Liquid Flow, Gradient Flow, Wavy, Chromatic Resonance) render live from cover colors with light-wave and fog ambience. Lyrics light up word by word with floating/scaling characters and eased per-line scrolling (FlowWave spring, staggered lines — both adjustable).',
    image: `${base}playing-lyrics.jpg`,
    imageEn: `${base}playing-lyrics.jpg`,
    accent: 'violet',
  },
  {
    id: 2,
    title: '十段均衡器与响度均一化',
    titleEn: '10-band EQ & Loudness Normalization',
    content:
      '内置自定义十段均衡器，各频段增益与 Q 值独立可调并提供多种预设；按 EBU R128 后台分析整曲响度，平滑应用固定增益并缓存结果，不改文件、不压缩动态。',
    contentEn:
      'A custom 10-band equalizer with per-band gain and adjustable Q plus presets. Full-track loudness is analyzed in the background per EBU R128 and applied as a cached fixed gain — files are never modified and dynamics stay intact.',
    image: `${base}equalizer.jpg`,
    imageEn: `${base}equalizer.jpg`,
    accent: 'cyan',
  },
  {
    id: 3,
    title: '卷积校正',
    titleEn: 'Convolution Correction',
    content:
      '绘制 2–32 点校正曲线或导入耳机/房间校正 WAV 脉冲响应（IR），生成最小相位 FIR 实时卷积；支持按输出设备绑定独立校正、编辑即时生效与命名预设管理，内置合成频响实时预览。',
    contentEn:
      'Draw a 2–32 point correction curve or import headphone/room WAV impulse responses (IR) for real-time minimum-phase FIR convolution. Bind corrections to output devices, edit live, manage named presets, and preview the combined response in real time.',
    image: `${base}convolution.jpg`,
    imageEn: `${base}convolution.jpg`,
    accent: 'amber',
  },
  {
    id: 4,
    title: '音乐库与播放统计',
    titleEn: 'Music Library & Listening Stats',
    content:
      '按歌曲、专辑、艺术家、文件夹或收藏夹多维浏览，自动扫描实时同步文件变动；内置收听热力图、时段活跃度与 Top 榜单统计，创建和管理自定义播放列表。',
    contentEn:
      'Browse by songs, albums, artists, folders or favorites with automatic rescan; a listening heatmap, hourly activity chart and Top charts are built in, along with custom playlist management.',
    image: `${base}stats.jpg`,
    imageEn: `${base}stats.jpg`,
    accent: 'cyan',
  },
  {
    id: 5,
    title: '桌面歌词',
    titleEn: 'Desktop Lyrics',
    content:
      '独立桌面歌词窗口悬停在桌面上方：逐字/逐行模式、双行显示（原文+翻译）、描边发光、雾化/飘雪/雨滴特效与自定义配色，锁定不挡操作，看歌词无需切回播放器。',
    contentEn:
      'A standalone desktop lyrics overlay with word-by-word or line modes, dual-line display (original + translation), glow and outline, fog/snow/rain effects and custom colors — lockable, click-through, no need to switch back to the player.',
    image: `${base}desktop-lyrics-wide.jpg`,
    imageEn: `${base}desktop-lyrics-wide.jpg`,
    accent: 'violet',
  },
  {
    id: 6,
    title: '专业输出与多种背景材质',
    titleEn: 'Pro Output & Backdrop Materials',
    content:
      'WASAPI 独占/共享、ASIO、DoP 与 DSD Native 位流输出，实验性 5.1 与 Atmos HDMI 直通；Mica、Acrylic 等 5 种应用背景材质，配合深浅主题与封面取色。',
    contentEn:
      'WASAPI exclusive/shared, ASIO, DoP and DSD Native bitstream output plus experimental 5.1 and Atmos HDMI passthrough; 5 backdrop materials including Mica and Acrylic with dark/light themes and cover tinting.',
    image: `${base}cover-shader.jpg`,
    imageEn: `${base}cover-shader.jpg`,
    accent: 'amber',
  },
]

export type Stat = {
  value: string
  label: string
  labelEn: string
}

export const statsData: Stat[] = [
  { value: '12+', label: '音频格式', labelEn: 'Audio Formats' },
  { value: '7', label: '着色器背景', labelEn: 'Shader Backgrounds' },
  { value: '10', label: '全局快捷键', labelEn: 'Global Hotkeys' },
  { value: '5', label: '背景材质', labelEn: 'Backdrop Materials' },
]
