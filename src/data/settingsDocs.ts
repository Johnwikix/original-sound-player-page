export type SettingItem = {
  name: string
  nameEn: string
  type: 'select' | 'toggle' | 'number' | 'slider' | 'text' | 'color' | 'shortcut' | 'radio'
  description: string
  descriptionEn: string
  options?: string[]
  optionsEn?: string[]
  range?: { min: number; max: number; step: number; unit?: string }
}

export type DocChapter = {
  key: string
  number: string
  icon: string
  titleKey: string
  introKey: string
  items: SettingItem[]
}

export const settingsDocs: DocChapter[] = [
  {
    key: 'getting-started',
    number: '00',
    icon: '🚀',
    titleKey: 'guide.chapters.getting-started.title',
    introKey: 'guide.chapters.getting_started.intro',
    items: [
      {
        name: '系统要求',
        nameEn: 'System Requirements',
        type: 'text',
        description:
          '需要 Windows 10 2004 或更高版本（包括 Windows 11）。建议使用 Windows 11 以获得完整的 Mica / Acrylic 视觉效果。',
        descriptionEn:
          'Requires Windows 10 version 2004 or later (including Windows 11). Windows 11 is recommended for full Mica / Acrylic visual effects.',
      },
      {
        name: '安装方式',
        nameEn: 'Installation',
        type: 'text',
        description:
          '从 Microsoft Store 下载安装可获得自动更新；如商店不可用，可通过 rg-adguard.net 获取离线 .msix 安装包（详见 FAQ）。',
        descriptionEn:
          'Download from Microsoft Store for automatic updates. If the Store is unavailable, obtain the offline .msix package via rg-adguard.net (see FAQ).',
      },
      {
        name: '添加音乐文件夹',
        nameEn: 'Add Music Folder',
        type: 'text',
        description:
          '应用启动后可通过四种方式添加音乐：点击「选择文件夹」按钮、拖拽文件夹到主窗口、在设置中启用「文件夹监听」自动检测、或使用「重新扫描」刷新已有库。',
        descriptionEn:
          'After launching, add music in four ways: click the "Select Folder" button, drag and drop a folder onto the main window, enable "Folder Watch" in settings for automatic detection, or use "Rescan" to refresh the existing library.',
      },
      {
        name: '开始播放',
        nameEn: 'Start Playing',
        type: 'text',
        description:
          '在歌曲列表中点击任意曲目即可开始播放。可使用底部播放栏的播放/暂停、上一首、下一首按钮控制。',
        descriptionEn:
          'Click any track in the song list to begin playback. Use the play/pause, previous, and next buttons on the bottom playback bar to control.',
      },
      {
        name: '统计与桌面歌词',
        nameEn: 'Stats & Desktop Lyrics',
        type: 'text',
        description:
          '侧边栏「统计」页提供收听热力图、时段活跃度与 Top 榜单；播放栏的「词」按钮可开启悬停在桌面上的桌面歌词。',
        descriptionEn:
          'The Stats page in the sidebar offers a listening heatmap, hourly activity and Top charts; the lyrics button on the playback bar toggles the desktop lyrics overlay.',
      },
    ],
  },
  {
    key: 'audio',
    number: '01',
    icon: '🎵',
    titleKey: 'guide.chapters.audio.title',
    introKey: 'guide.chapters.audio.intro',
    items: [
      {
        name: '输出设备',
        nameEn: 'Output Device',
        type: 'select',
        description:
          '选择音频输出设备与输出模式。默认跟随系统设备（共享模式，播放中插拔设备或变更格式会静默切换不中断）；WASAPI 独占绕过系统混音，支持推送/事件两种驱动与格式自动协商；ASIO 提供原生低延迟输出并支持 DSD Native 位流扩展。',
        descriptionEn:
          'Choose the audio output device and mode. The default follows the system device (shared mode — hotplug or format changes switch silently during playback). WASAPI exclusive bypasses system mixing with push/event drivers and automatic format negotiation; ASIO offers native low-latency output with DSD Native bitstream support.',
        options: [
          '默认设备（共享）',
          'WASAPI 独占（推送/事件）',
          'WASAPI 共享 / DirectSound',
          'ASIO',
        ],
        optionsEn: [
          'Default device (shared)',
          'WASAPI Exclusive (Push/Event)',
          'WASAPI Shared / DirectSound',
          'ASIO',
        ],
      },
      {
        name: '缓冲区大小',
        nameEn: 'Buffer Size',
        type: 'number',
        description:
          '音频缓冲区大小（单位：毫秒），范围 100-900。数值越小延迟越低，但可能引起爆音；数值越大越稳定。',
        descriptionEn:
          'Audio buffer size in milliseconds, range 100-900. Smaller values reduce latency but may cause audio glitches; larger values are more stable.',
        range: { min: 100, max: 900, step: 10, unit: 'ms' },
      },
      {
        name: 'DSD 转 PCM 频率',
        nameEn: 'DSD to PCM Frequency',
        type: 'select',
        description: '将 DSD 音频流转换为 PCM 时使用的采样率。仅当 DSD 模式为「DoP」时生效。',
        descriptionEn:
          'The sample rate used when converting DSD audio to PCM. Only takes effect when DSD mode is "DoP".',
        options: [
          '44.1 kHz',
          '48 kHz',
          '88.2 kHz',
          '96 kHz',
          '176.4 kHz',
          '192 kHz',
          '352.8 kHz',
          '384 kHz',
        ],
        optionsEn: [
          '44.1 kHz',
          '48 kHz',
          '88.2 kHz',
          '96 kHz',
          '176.4 kHz',
          '192 kHz',
          '352.8 kHz',
          '384 kHz',
        ],
      },
      {
        name: 'DSD 增益',
        nameEn: 'DSD Gain',
        type: 'number',
        description:
          'DSD 信号到 PCM 的增益补偿（单位：dB），可降低 DSD→PCM 转换后的音量损失。仅 DoP 模式生效。',
        descriptionEn:
          'Gain compensation (in dB) when converting DSD to PCM, reducing the volume loss after conversion. Only effective in DoP mode.',
        range: { min: 0, max: 50, step: 1, unit: 'dB' },
      },
      {
        name: 'DSD DoP / DSD Native',
        nameEn: 'DSD DoP / DSD Native',
        type: 'toggle',
        description:
          '切换 DSD 输出模式。DoP（DSD over PCM）将 DSD 数据打包进 PCM 帧传输，兼容多数 DAC；Native 直接输出原始 DSD 流，需要 DAC 硬件支持。',
        descriptionEn:
          'Toggle DSD output mode. DoP (DSD over PCM) packs DSD data into PCM frames, compatible with most DACs. Native outputs the raw DSD stream, requiring hardware support.',
      },
      {
        name: '实验性 5.1 输出',
        nameEn: 'Experimental 5.1 Output',
        type: 'toggle',
        description:
          '默认关闭。仅用于 ASIO / WASAPI 独占的 5.1 PCM 输出（不含 Atmos）。ASIO 前六通道依次为：左、右、中置、低频、左环绕、右环绕。',
        descriptionEn:
          'Off by default. 5.1 PCM output for ASIO / WASAPI exclusive only (no Atmos). ASIO channel order: front-left, front-right, center, LFE, surround-left, surround-right.',
      },
      {
        name: '实验性 Atmos HDMI 直通',
        nameEn: 'Experimental Atmos HDMI Passthrough',
        type: 'toggle',
        description:
          '默认关闭。仅 WASAPI 独占下支持 48 kHz 六声道 E-AC-3 / Atmos HDMI 位流直通，需要兼容的接收设备。通过音量调节，请在功放端调节音量。',
        descriptionEn:
          'Off by default. 48 kHz 6-channel E-AC-3 / Atmos HDMI bitstream passthrough on WASAPI exclusive only, requiring a compatible receiver. Volume is controlled on the receiver.',
      },
      {
        name: '淡入淡出',
        nameEn: 'Fade In/Out',
        type: 'toggle',
        description: '切换歌曲时启用音量淡入淡出效果，使衔接更平滑自然。',
        descriptionEn: 'Enable volume fade in/out when switching songs for smoother transitions.',
      },
    ],
  },
  {
    key: 'dsp',
    number: '02',
    icon: '🎛️',
    titleKey: 'guide.chapters.dsp.title',
    introKey: 'guide.chapters.dsp.intro',
    items: [
      {
        name: 'DSP 总开关',
        nameEn: 'DSP Master Switch',
        type: 'toggle',
        description:
          '一键旁路全部音效（响度均一化、前级增益、EQ 和声道效果），并保留各项设置。音效设置仅应用于 PCM；DoP / Native DSD 位流播放时自动旁路。',
        descriptionEn:
          'Bypass all DSP effects at once (loudness normalization, preamp, EQ and channel effects) while keeping their settings. Effects apply to PCM only; DoP / Native DSD bitstream playback bypasses them automatically.',
      },
      {
        name: '均衡器',
        nameEn: 'Equalizer',
        type: 'toggle',
        description:
          '十段 EQ，每个频段的增益（±12 dB）与 Q 值独立可调，支持保存、更新与删除命名预设；合成频响图表实时预览 EQ 与卷积的叠加曲线。',
        descriptionEn:
          'A 10-band EQ with independent ±12 dB gain and adjustable Q per band. Save, update and delete named presets; the combined-response chart previews the sum of EQ and convolution in real time.',
      },
      {
        name: '音量均一化',
        nameEn: 'Loudness Normalization',
        type: 'toggle',
        description:
          '按 EBU R128 后台分析整曲响度，完成后平滑应用固定增益并缓存结果（不改文件、不压缩动态）。目标响度范围 −24 ~ −12 LUFS，默认 −18；分析未完成时优先保留动态。',
        descriptionEn:
          'Analyzes full-track loudness per EBU R128 in the background, then smoothly applies a fixed gain and caches the result (files untouched, dynamics preserved). Target range −24 to −12 LUFS, default −18.',
      },
      {
        name: '统一前级增益',
        nameEn: 'Unified Preamp',
        type: 'toggle',
        description:
          '统一作用于 EQ 与卷积，手动设定或开启自动增益/衰减（按合成频响峰值计算补偿并预留 1 dB 余量），避免校正提升造成削波。',
        descriptionEn:
          'Applies to both EQ and convolution. Set manually or enable auto gain/attenuation (compensation from the combined response peak with 1 dB headroom) to avoid clipping.',
      },
      {
        name: '卷积校正',
        nameEn: 'Convolution Correction',
        type: 'toggle',
        description:
          '两种校正来源：绘制 2–32 个可拖动控制点的校正曲线，或导入耳机/房间校正 WAV 脉冲响应（IR）。生成最小相位 FIR 实时卷积，按输出采样率自动重采样；编辑即时生效并自动保存，支持按输出设备绑定独立校正与命名预设管理。',
        descriptionEn:
          'Two correction sources: draw a curve with 2–32 draggable control points, or import a headphone/room WAV impulse response (IR). Generates real-time minimum-phase FIR convolution, resampled to the output rate; edits apply instantly and autosave, with per-device bindings and named presets.',
      },
      {
        name: '声道与耳机效果',
        nameEn: 'Channel & Headphone Effects',
        type: 'toggle',
        description:
          '左右平衡（−100 ~ 100）、左右声道互换、合并为单声道、耳机交叉馈送（Crossfeed，减弱左右分离感）与立体声宽度（0% 完全单声道，扩宽时自动衰减以保留低频）。',
        descriptionEn:
          'Left/right balance (−100 to 100), channel swap, mono merge, headphone crossfeed (reduces left/right separation) and stereo width (0% = mono; widening auto-attenuates to preserve lows).',
      },
    ],
  },
  {
    key: 'interface',
    number: '03',
    icon: '🖥️',
    titleKey: 'guide.chapters.interface.title',
    introKey: 'guide.chapters.interface.intro',
    items: [
      {
        name: '默认入口界面',
        nameEn: 'Default Entry Interface',
        type: 'select',
        description: '应用启动时默认显示的页面。',
        descriptionEn: 'The default page shown when the application launches.',
        options: ['添加文件夹', '音乐浏览', '播放列表'],
        optionsEn: ['Add Folder', 'Music Browse', 'Playlists'],
      },
      {
        name: '默认音乐浏览',
        nameEn: 'Default Music Browse',
        type: 'select',
        description: '进入「音乐浏览」页面时默认展示的分类视图。',
        descriptionEn: 'The default category view when entering the "Music Browse" page.',
        options: ['歌曲', '专辑', '艺术家', '文件夹', '收藏'],
        optionsEn: ['Songs', 'Albums', 'Artists', 'Folders', 'Favorites'],
      },
    ],
  },
  {
    key: 'advanced',
    number: '04',
    icon: '⚙️',
    titleKey: 'guide.chapters.advanced.title',
    introKey: 'guide.chapters.advanced.intro',
    items: [
      {
        name: '文件夹监听',
        nameEn: 'Folder Watch',
        type: 'toggle',
        description: '启用后，应用会持续监视已添加的音乐文件夹，自动同步新增、修改、删除的文件。',
        descriptionEn:
          'When enabled, the app continuously watches added music folders and automatically syncs new, modified, or deleted files.',
      },
      {
        name: '隐藏时释放',
        nameEn: 'Trim on Hide',
        type: 'toggle',
        description: '当应用窗口最小化或被遮挡时，释放已缓存的非活动曲目内存。',
        descriptionEn:
          'Release memory used by cached inactive tracks when the window is minimized or hidden.',
      },
      {
        name: '播放后释放',
        nameEn: 'Trim After Playback',
        type: 'toggle',
        description: '播放完一首曲目后，自动从内存中释放该曲目的解码缓存。',
        descriptionEn:
          "Automatically release a track's decoded buffer from memory after playback completes.",
      },
      {
        name: '立即释放',
        nameEn: 'Trim Now',
        type: 'text',
        description: '手动触发一次内存释放操作，立即清理所有非活动曲目的缓存。',
        descriptionEn:
          'Manually trigger a memory cleanup to immediately release all inactive track caches.',
      },
      {
        name: '重置窗口位置',
        nameEn: 'Reset Window Bounds',
        type: 'text',
        description: '将应用窗口恢复到默认位置和尺寸，并清除保存的窗口边界记录。',
        descriptionEn:
          'Restore the application window to its default position and size, clearing the saved window bounds.',
      },
    ],
  },
  {
    key: 'shortcuts',
    number: '05',
    icon: '⌨️',
    titleKey: 'guide.chapters.shortcuts.title',
    introKey: 'guide.chapters.shortcuts.intro',
    items: [
      {
        name: '启用全局快捷键',
        nameEn: 'Enable Global Hotkeys',
        type: 'toggle',
        description: '启用后，快捷键即使在应用未获焦点时也会响应。如与其他应用冲突会显示警告。',
        descriptionEn:
          'When enabled, hotkeys respond even when the app is not in focus. A warning is shown if conflicts with other apps are detected.',
      },
      {
        name: '播放/暂停',
        nameEn: 'Play/Pause',
        type: 'shortcut',
        description: '切换当前播放状态。',
        descriptionEn: 'Toggle the current playback state.',
      },
      {
        name: '下一首',
        nameEn: 'Next Song',
        type: 'shortcut',
        description: '跳转到播放列表中的下一首曲目。',
        descriptionEn: 'Skip to the next track in the playlist.',
      },
      {
        name: '上一首',
        nameEn: 'Previous Song',
        type: 'shortcut',
        description: '返回到播放列表中的上一首曲目。',
        descriptionEn: 'Return to the previous track in the playlist.',
      },
      {
        name: '音量增',
        nameEn: 'Volume Up',
        type: 'shortcut',
        description: '增大主音量。',
        descriptionEn: 'Increase the main volume.',
      },
      {
        name: '音量减',
        nameEn: 'Volume Down',
        type: 'shortcut',
        description: '减小主音量。',
        descriptionEn: 'Decrease the main volume.',
      },
      {
        name: '切换播放详情',
        nameEn: 'Toggle Playing Detail',
        type: 'shortcut',
        description: '显示或隐藏正在播放曲目的详情页面（含封面、全屏歌词）。',
        descriptionEn:
          'Show or hide the now-playing detail page (with cover and full-screen lyrics).',
      },
      {
        name: '返回',
        nameEn: 'Back',
        type: 'shortcut',
        description: '在页面导航中返回上一级。',
        descriptionEn: 'Navigate one level back in the page hierarchy.',
      },
      {
        name: '显示窗口',
        nameEn: 'Show Window',
        type: 'shortcut',
        description: '当应用在后台时将其窗口唤至前台。',
        descriptionEn:
          'Bring the application window to the foreground when it is in the background.',
      },
      {
        name: '全屏切换',
        nameEn: 'Toggle Fullscreen',
        type: 'shortcut',
        description: '进入或退出全屏播放模式。',
        descriptionEn: 'Enter or exit fullscreen playback mode.',
      },
    ],
  },
  {
    key: 'cover',
    number: '06',
    icon: '🎨',
    titleKey: 'guide.chapters.cover.title',
    introKey: 'guide.chapters.cover.intro',
    items: [
      {
        name: '封面尺寸',
        nameEn: 'Cover Size',
        type: 'number',
        description: '封面图片在界面中的显示尺寸。0 表示原始尺寸。',
        descriptionEn: 'Display size of the cover image. 0 means the original size.',
        range: { min: 0, max: 500, step: 1, unit: 'px' },
      },
      {
        name: '封面磁盘缓存',
        nameEn: 'Cover Disk Cache',
        type: 'text',
        description:
          '封面图片的本地缓存目录。点击可打开所在文件夹，或修改到其他位置。修改后需重启应用。',
        descriptionEn:
          'Local cache directory for cover images. Click to open the folder, or change to another location. Restart required after change.',
      },
      {
        name: '自动封面匹配',
        nameEn: 'Auto Cover Matching',
        type: 'toggle',
        description: '启用后，当曲目内嵌封面缺失时，自动从在线音乐数据库匹配并下载专辑封面。',
        descriptionEn:
          'When enabled, if a track has no embedded cover, the app will automatically match and download album art from online music databases.',
      },
      {
        name: 'Win2D 封面渲染',
        nameEn: 'Win2D Cover Image',
        type: 'toggle',
        description: '使用 Win2D 硬件加速渲染封面（更高性能、更多视觉效果）。修改后需重启应用。',
        descriptionEn:
          'Use Win2D hardware-accelerated rendering for covers (better performance, more visual effects). Restart required after change.',
      },
      {
        name: '动画标题',
        nameEn: 'Animated Title',
        type: 'toggle',
        description:
          '为正在播放的曲目标题添加文字动画效果。可选择效果类型：淡入、摇滚、春天、爵士、蓝调、金属等。修改后需重启应用。',
        descriptionEn:
          'Add text animation effects to the now-playing track title. Choose from: Fade, Rock, Spring, Jazz, Blues, Metal, etc. Restart required after change.',
      },
      {
        name: '流体背景',
        nameEn: 'Shader Background',
        type: 'select',
        description:
          '播放器界面的动态着色器背景。可选 7 种效果：Fluid（流体）、PS3XMB（PS3 风格）、RotatingMesh（旋转网格）、LiquidFlow（液态流）、GradientFlow（渐变流动）、WavyBackground（波浪）、ChromaticResonance（色彩共振）。修改后需重启应用。',
        descriptionEn:
          'Dynamic shader background for the player UI. Choose from 7 effects: Fluid, PS3XMB, RotatingMesh, LiquidFlow, GradientFlow, WavyBackground, ChromaticResonance. Restart required after change.',
        options: [
          'Fluid',
          'PS3XMB',
          'RotatingMesh',
          'LiquidFlow',
          'GradientFlow',
          'WavyBackground',
          'ChromaticResonance',
        ],
        optionsEn: [
          'Fluid',
          'PS3XMB',
          'RotatingMesh',
          'LiquidFlow',
          'GradientFlow',
          'WavyBackground',
          'ChromaticResonance',
        ],
      },
      {
        name: '光波',
        nameEn: 'Light Wave',
        type: 'toggle',
        description: '在着色器背景上叠加光波效果。仅当流体背景启用时可用。',
        descriptionEn:
          'Overlay a light wave effect on top of the shader background. Only available when shader background is enabled.',
      },
      {
        name: '雾',
        nameEn: 'Fog',
        type: 'toggle',
        description: '添加雾效果到流体背景。',
        descriptionEn: 'Add a fog effect to the fluid background.',
      },
      {
        name: '雪',
        nameEn: 'Snow',
        type: 'toggle',
        description: '添加飘雪粒子效果到流体背景。',
        descriptionEn: 'Add falling snow particle effect to the fluid background.',
      },
      {
        name: '雨滴',
        nameEn: 'Raindrop',
        type: 'toggle',
        description: '添加雨滴效果到流体背景。',
        descriptionEn: 'Add raindrop effect to the fluid background.',
      },
      {
        name: '调色算法',
        nameEn: 'Palette Algorithm',
        type: 'select',
        description:
          '从封面提取主色调时使用的算法：K-Means++（速度较慢但准确）或 OctTree（速度更快）。',
        descriptionEn:
          'Algorithm used to extract the dominant color from covers: K-Means++ (slower but more accurate) or OctTree (faster).',
        options: ['K-Means++', 'OctTree'],
        optionsEn: ['K-Means++', 'OctTree'],
      },
    ],
  },
  {
    key: 'lyrics',
    number: '07',
    icon: '📝',
    titleKey: 'guide.chapters.lyrics.title',
    introKey: 'guide.chapters.lyrics.intro',
    items: [
      {
        name: '自动歌词匹配',
        nameEn: 'Auto Lyric Matching',
        type: 'toggle',
        description: '启用后，当曲目内嵌歌词缺失时，自动从在线歌词服务（LrcAPI）匹配并下载歌词。',
        descriptionEn:
          'When enabled, if a track has no embedded lyrics, the app will automatically match and download them from online lyric services (LrcAPI).',
      },
      {
        name: '启用高级歌词效果',
        nameEn: 'Advanced Lyrics Effect',
        type: 'toggle',
        description: '启用字符级动画效果（字符浮动、缩放、发光等）。修改后需重启应用。',
        descriptionEn:
          'Enable character-level animation effects (floating, scaling, glowing). Restart required after change.',
      },
      {
        name: '歌词字体',
        nameEn: 'Lyrics Font Family',
        type: 'select',
        description: '歌词显示使用的字体。可从系统已安装的字体中选择。',
        descriptionEn:
          'Font family used for displaying lyrics. Choose from installed system fonts.',
      },
      {
        name: '歌词字号',
        nameEn: 'Lyrics Font Size',
        type: 'number',
        description: '歌词文本的字号。',
        descriptionEn: 'Font size for lyrics text.',
      },
      {
        name: '歌词对齐',
        nameEn: 'Lyrics Alignment',
        type: 'select',
        description: '歌词文本在显示区域内的对齐方式。',
        descriptionEn: 'Alignment of lyrics text within the display area.',
        options: ['左对齐', '居中', '右对齐'],
        optionsEn: ['Left', 'Center', 'Right'],
      },
      {
        name: '歌词边距',
        nameEn: 'Lyrics Margin',
        type: 'number',
        description: '歌词显示区域周围的间距。',
        descriptionEn: 'Margin around the lyrics display area.',
      },
      {
        name: '歌词模糊度',
        nameEn: 'Lyrics Blur Amount',
        type: 'slider',
        description: '未播放歌词行的模糊程度。值越大，未播放行越模糊。',
        descriptionEn:
          'Blur amount for unplayed lyric lines. Higher values blur the unplayed lines more.',
        range: { min: 0, max: 10, step: 0.1 },
      },
      {
        name: '播放行位置',
        nameEn: 'Playing Line Top Offset',
        type: 'slider',
        description: '当前播放的歌词行距离顶部的偏移量（百分比）。',
        descriptionEn: 'Top offset percentage of the currently playing lyric line.',
        range: { min: 30, max: 70, step: 1, unit: '%' },
      },
      {
        name: '未播放不透明度',
        nameEn: 'Unplayed Opacity',
        type: 'slider',
        description: '未播放歌词行的透明度。值越小，未播放行越透明。',
        descriptionEn:
          'Opacity of unplayed lyric lines. Smaller values make them more transparent.',
        range: { min: 0, max: 100, step: 1, unit: '%' },
      },
      {
        name: '翻译不透明度',
        nameEn: 'Translated Opacity',
        type: 'slider',
        description: '翻译行歌词的透明度。',
        descriptionEn: 'Opacity of translated lyric lines.',
        range: { min: 0, max: 100, step: 1, unit: '%' },
      },
      {
        name: '字符浮动幅度',
        nameEn: 'Character Float Amount',
        type: 'slider',
        description: '高级歌词效果中字符的垂直浮动幅度。',
        descriptionEn: 'Vertical float amount of characters in the advanced lyrics effect.',
        range: { min: 0, max: 10, step: 0.1 },
      },
      {
        name: '字符缩放幅度',
        nameEn: 'Character Scale Amount',
        type: 'slider',
        description: '高级歌词效果中字符的缩放幅度（百分比）。',
        descriptionEn: 'Scale amount of characters in the advanced lyrics effect (percentage).',
        range: { min: 50, max: 150, step: 1, unit: '%' },
      },
      {
        name: '发光强度',
        nameEn: 'Glow Amount',
        type: 'slider',
        description: '高级歌词效果中字符的发光强度。',
        descriptionEn: 'Glow intensity of characters in the advanced lyrics effect.',
        range: { min: 0, max: 10, step: 0.1 },
      },
      {
        name: '长音节阈值',
        nameEn: 'Long Syllable Threshold',
        type: 'slider',
        description: '判定为长音节的最小持续时间（毫秒），用于高级歌词动画。',
        descriptionEn:
          'Minimum duration (ms) to be classified as a long syllable for advanced lyric animation.',
        range: { min: 400, max: 1000, step: 10, unit: 'ms' },
      },
      {
        name: '目标帧率',
        nameEn: 'Target Frame Rate',
        type: 'select',
        description: '高级歌词动画的目标帧率，影响动画的流畅度与功耗。',
        descriptionEn:
          'Target frame rate for advanced lyric animation. Affects smoothness and power consumption.',
        options: ['30 hz', '60 hz', '90 hz', '120 hz', '144 hz'],
        optionsEn: ['30 hz', '60 hz', '90 hz', '120 hz', '144 hz'],
      },
      {
        name: '桌面歌词',
        nameEn: 'Desktop Lyrics',
        type: 'toggle',
        description:
          '独立桌面歌词窗口：逐字/逐行显示模式、锁定位置、字体字号与对齐、描边发光、双行显示（原文+翻译）、雾化/飘雪/雨滴特效与自定义配色。',
        descriptionEn:
          'Standalone desktop lyrics window: word-by-word or line modes, position lock, font/size/alignment, glow and outline, dual-line display (original + translation), fog/snow/rain effects and custom colors.',
      },
      {
        name: '自定义歌词颜色',
        nameEn: 'Custom Lyrics Color',
        type: 'color',
        description: '为已播放的歌词行启用自定义颜色。需先启用「高级歌词效果」。',
        descriptionEn:
          'Enable a custom color for played lyric lines. Requires the "Advanced Lyrics Effect" to be enabled first.',
      },
    ],
  },
  {
    key: 'appearance',
    number: '08',
    icon: '🌗',
    titleKey: 'guide.chapters.appearance.title',
    introKey: 'guide.chapters.appearance.intro',
    items: [
      {
        name: '同步背景材质',
        nameEn: 'Sync Backdrop',
        type: 'toggle',
        description: '启用后，应用窗口的背景材质会跟随系统主题切换。',
        descriptionEn: 'When enabled, the application window backdrop syncs with the system theme.',
      },
      {
        name: '背景材质',
        nameEn: 'Backdrop Type',
        type: 'radio',
        description:
          '窗口背景材质类型：透明色调、云母（Mica）、亚克力（Acrylic）、透明亚克力。自定义亚克力需要特定系统版本，仅当系统支持时显示。',
        descriptionEn:
          'Window backdrop type: TransparentTint, Mica, Acrylic, TransparentAcrylic. Custom Acrylic requires specific system versions and only appears when supported.',
        options: ['透明色调', '云母 Mica', '亚克力 Acrylic', '透明亚克力', '自定义亚克力'],
        optionsEn: ['TransparentTint', 'Mica', 'Acrylic', 'TransparentAcrylic', 'Custom Acrylic'],
      },
      {
        name: '自定义不透明度',
        nameEn: 'Custom Opacity',
        type: 'slider',
        description: '自定义亚克力背景的不透明度（仅当背景材质为「自定义亚克力」时可用）。',
        descriptionEn:
          'Opacity of the custom acrylic backdrop (only available when backdrop type is "Custom Acrylic").',
        range: { min: 0, max: 100, step: 1, unit: '%' },
      },
      {
        name: '自定义颜色',
        nameEn: 'Custom Color',
        type: 'color',
        description: '自定义亚克力背景的颜色（仅当背景材质为「自定义亚克力」时可用）。',
        descriptionEn:
          'Custom color for the acrylic backdrop (only available when backdrop type is "Custom Acrylic").',
      },
      {
        name: '提取主色',
        nameEn: 'Use Image Dominant Theme',
        type: 'toggle',
        description:
          '根据当前播放曲目的封面图片自动提取主色调，并应用到界面元素。仅当流体背景启用时可用。',
        descriptionEn:
          'Automatically extract the dominant color from the current track cover and apply it to UI elements. Only available when the fluid background is enabled.',
      },
      {
        name: '主题',
        nameEn: 'Theme',
        type: 'radio',
        description: '应用主题：跟随系统、深色、浅色。',
        descriptionEn: 'Application theme: System Default, Dark, Light.',
        options: ['系统默认', '深色', '浅色'],
        optionsEn: ['System Default', 'Dark', 'Light'],
      },
    ],
  },
  {
    key: 'close-button',
    number: '09',
    icon: '🚪',
    titleKey: 'guide.chapters.close-button.title',
    introKey: 'guide.chapters.close_button.intro',
    items: [
      {
        name: '关闭按钮功能',
        nameEn: 'Close Button Function',
        type: 'radio',
        description: '设置点击窗口关闭按钮时的行为：直接关闭应用，或最小化到后台继续播放音乐。',
        descriptionEn:
          'Configure the behavior when the window close button is clicked: close the application, or minimize to background while continuing playback.',
        options: ['关闭应用', '后台运行'],
        optionsEn: ['Close App', 'Run in Background'],
      },
    ],
  },
]
