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

export const featuresData: Feature[] = [
  {
    id: 1,
    title: '沉浸式的现代界面',
    titleEn: 'Immersive Modern UI',
    content:
      '精心设计的用户界面，提供流畅、直观的交互体验。支持多种亚克力效果，让你的音乐之旅赏心悦目。多项自定义设置，打造你专属的音乐播放器。',
    contentEn:
      'A meticulously designed user interface that provides a fluid and intuitive interaction. Supports multiple acrylic effects to make your music journey visually pleasing. Multiple custom settings to create your exclusive music player.',
    image:
      'https://store-images.s-microsoft.com/image/apps.27363.13587170393988356.9cd84e64-f1af-4f6c-9b56-2ffe0193367b.b82d1815-3c22-4018-929f-302c2c5ee2b6',
    imageEn:
      'https://store-images.s-microsoft.com/image/apps.27363.13587170393988356.9cd84e64-f1af-4f6c-9b56-2ffe0193367b.b82d1815-3c22-4018-929f-302c2c5ee2b6',
    accent: 'violet',
  },
  {
    id: 2,
    title: '掌控你的音乐库',
    titleEn: 'Master Your Music Library',
    content:
      '自动扫描并管理你的本地音乐文件。轻松按专辑、艺术家或文件夹浏览，支持创建导入导出自定义播放列表，还能进行元数据编辑，自动匹配歌词和歌曲封面。',
    contentEn:
      'Automatically scan and manage your local music files. Easily browse by album, artist, or folder, and support creating, importing, and exporting custom playlists. You can also edit metadata and automatically match lyrics and album art.',
    image:
      'https://store-images.s-microsoft.com/image/apps.61090.13587170393988356.9cd84e64-f1af-4f6c-9b56-2ffe0193367b.4b41e520-4cbc-4c3a-814e-c2dfa266bbeb',
    imageEn:
      'https://store-images.s-microsoft.com/image/apps.61090.13587170393988356.9cd84e64-f1af-4f6c-9b56-2ffe0193367b.4b41e520-4cbc-4c3a-814e-c2dfa266bbeb',
    accent: 'cyan',
  },
  {
    id: 3,
    title: '极致音质体验',
    titleEn: 'Ultimate Sound Quality',
    content:
      '支持包括 FLAC、WAV、MP3、DSF、APE、M4A、WMV、AIFF、OGA 等多种音频格式，搭配均衡器和 WASAPI 独占模式，还原音乐最本真的细节。',
    contentEn:
      'Supports various audio formats including FLAC, WAV, MP3, DSF, APE, M4A, WMV, AIFF, OGA, and more. Paired with an equalizer and WASAPI exclusive mode, it restores the most authentic details of the music.',
    image:
      'https://store-images.s-microsoft.com/image/apps.60735.13587170393988356.9cd84e64-f1af-4f6c-9b56-2ffe0193367b.f9f7b72e-b655-4fb7-8b53-5d6c76f92edf',
    imageEn:
      'https://store-images.s-microsoft.com/image/apps.60735.13587170393988356.9cd84e64-f1af-4f6c-9b56-2ffe0193367b.f9f7b72e-b655-4fb7-8b53-5d6c76f92edf',
    accent: 'amber',
  },
]

export type Stat = {
  value: string
  label: string
  labelEn: string
}

export const statsData: Stat[] = [
  { value: '10+', label: '音频格式', labelEn: 'Audio Formats' },
  { value: '6', label: '动态背景', labelEn: 'Dynamic Backgrounds' },
  { value: '10', label: '全局快捷键', labelEn: 'Global Hotkeys' },
  { value: '5', label: '背景材质', labelEn: 'Backdrop Materials' },
]
