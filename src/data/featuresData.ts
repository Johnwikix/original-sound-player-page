export type Feature = {
  id: number;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  image: string;
  imageEn: string;
  accent: 'amber' | 'cyan' | 'violet' | 'rose';
};

export const featuresData: Feature[] = [
  {
    id: 1,
    title: '沉浸式的现代界面',
    titleEn: 'Immersive Modern UI',
    content:
      '精心设计的用户界面，提供流畅、直观的交互体验。支持多种亚克力效果，让你的音乐之旅赏心悦目。多项自定义设置，打造你专属的音乐播放器。',
    contentEn:
      'A meticulously designed user interface that provides a fluid and intuitive interaction. Supports multiple acrylic effects to make your music journey visually pleasing. Multiple custom settings to create your exclusive music player.',
    image: '/original-sound-player-page/p1-zh.png',
    imageEn: '/original-sound-player-page/p1-en.png',
    accent: 'violet'
  },
  {
    id: 2,
    title: '掌控你的音乐库',
    titleEn: 'Master Your Music Library',
    content:
      '自动扫描并管理你的本地音乐文件。轻松按专辑、艺术家或文件夹浏览，支持创建导入导出自定义播放列表，还能进行元数据编辑，自动匹配歌词和歌曲封面。',
    contentEn:
      'Automatically scan and manage your local music files. Easily browse by album, artist, or folder, and support creating, importing, and exporting custom playlists. You can also edit metadata and automatically match lyrics and album art.',
    image: '/original-sound-player-page/p2-zh.png',
    imageEn: '/original-sound-player-page/p2-en.png',
    accent: 'cyan'
  },
  {
    id: 3,
    title: '极致音质体验',
    titleEn: 'Ultimate Sound Quality',
    content:
      '支持包括 FLAC、WAV、MP3、DSF、APE、M4A、WMV、AIFF、OGA 等多种音频格式，搭配均衡器和 WASAPI 独占模式，还原音乐最本真的细节。',
    contentEn:
      'Supports various audio formats including FLAC, WAV, MP3, DSF, APE, M4A, WMV, AIFF, OGA, and more. Paired with an equalizer and WASAPI exclusive mode, it restores the most authentic details of the music.',
    image: '/original-sound-player-page/p3-zh.png',
    imageEn: '/original-sound-player-page/p3-en.png',
    accent: 'amber'
  },
  {
    id: 4,
    title: 'Walkman 伴侣',
    titleEn: 'Walkman Companion',
    content:
      '轻松将你的音乐转换为 WAV、MP3、FLAC 等格式，并方便地通过 USB 连同同步好的歌词文件一同传输到你的 Walkman 上，让你的随身听体验更上一层楼。',
    contentEn:
      'Easily convert your music to WAV, MP3, FLAC, and other formats, and conveniently transfer them along with synchronized lyric files to your Walkman via USB, taking your portable listening experience to the next level.',
    image: '/original-sound-player-page/p4-zh.png',
    imageEn: '/original-sound-player-page/p4-en.png',
    accent: 'rose'
  }
];

export type Stat = {
  value: string;
  label: string;
  labelEn: string;
};

export const statsData: Stat[] = [
  { value: '10+', label: '音频格式', labelEn: 'Audio Formats' },
  { value: '6', label: '动态背景', labelEn: 'Dynamic Backgrounds' },
  { value: '10', label: '全局快捷键', labelEn: 'Global Hotkeys' },
  { value: '5', label: '背景材质', labelEn: 'Backdrop Materials' }
];