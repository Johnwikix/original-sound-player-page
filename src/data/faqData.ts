export type FaqItem = {
  id: number
  question: string
  questionEn: string
  steps: string[]
  stepsEn: string[]
  links?: { label: string; labelEn: string; url: string }[]
  note?: string
  noteEn?: string
}

export const faqData: FaqItem[] = [
  {
    id: 1,
    question: '应用无法启动？',
    questionEn: "App won't launch?",
    steps: [
      '请检查您的系统是否满足最低要求：Windows 10 版本 2004 或更高。',
      '如果满足最低要求，请从 Microsoft Learn 下载 C++ Runtime (Desktop Bridge) 与最新 Windows App SDK 的 x64 依赖，使用管理员权限安装。',
      '如果问题仍然存在，请打开日志目录查看崩溃日志（设置 → 关于 → 日志路径）。',
    ],
    stepsEn: [
      'Check if your system meets the minimum requirements: Windows 10, version 2004 or later.',
      'If you meet the requirements, download the x64 dependencies of C++ Runtime (Desktop Bridge) and the latest Windows App SDK from Microsoft Learn, then install them with administrator privileges.',
      'If the problem persists, open the log directory (Settings → About → Log Path) to check the crash log.',
    ],
    links: [
      {
        label: 'C++ Runtime (Desktop Bridge)',
        labelEn: 'C++ Runtime (Desktop Bridge)',
        url: 'https://learn.microsoft.com/en-us/troubleshoot/developer/visualstudio/cpp/libraries/c-runtime-packages-desktop-bridge',
      },
      {
        label: 'Windows App SDK 下载',
        labelEn: 'Windows App SDK Downloads',
        url: 'https://learn.microsoft.com/zh-cn/windows/apps/windows-app-sdk/downloads',
      },
    ],
  },
  {
    id: 2,
    question: 'Win10 系统缺少字体图标？',
    questionEn: 'Missing font icons on Windows 10?',
    steps: [
      'Segoe Fluent Icons 与 Segoe MDL2 Assets 是 Windows 系统字体，Win10 早期版本可能未预装。',
      '请从以下官方地址下载并安装这两个字体包。',
      '安装完成后重启应用即可正常显示图标。',
    ],
    stepsEn: [
      'Segoe Fluent Icons and Segoe MDL2 Assets are Windows system fonts. They may not be pre-installed on earlier versions of Windows 10.',
      'Download and install the two font packages from the official links below.',
      'Restart the application after installation to display icons properly.',
    ],
    links: [
      {
        label: 'Segoe Fluent Icons',
        labelEn: 'Segoe Fluent Icons',
        url: 'https://aka.ms/SegoeFluentIcons',
      },
      { label: 'Segoe MDL2 Assets', labelEn: 'Segoe MDL2 Assets', url: 'https://aka.ms/segoemdl2' },
    ],
  },
  {
    id: 3,
    question: '微软商店无法使用？',
    questionEn: "Microsoft Store isn't working?",
    steps: [
      '访问 rg-adguard.net 商店链接生成工具。',
      '粘贴 Microsoft Store 中本应用的链接（https://apps.microsoft.com/detail/9NFW1RPPT999）。',
      '选择对应的架构（x64）和通道（RP），生成离线 .msix 安装包链接并下载安装。',
    ],
    stepsEn: [
      'Visit rg-adguard.net, a Microsoft Store link generator.',
      "Paste the application's Store link (https://apps.microsoft.com/detail/9NFW1RPPT999).",
      'Select the architecture (x64) and channel (RP), generate the offline .msix package link, and install it.',
    ],
    links: [
      { label: 'rg-adguard.net', labelEn: 'rg-adguard.net', url: 'https://store.rg-adguard.net' },
    ],
  },
  {
    id: 4,
    question: '亚克力效果没有生效？',
    questionEn: "Acrylic effects aren't working?",
    steps: [
      '请检查 Windows 系统设置 → 辅助功能 → 视觉效果 → 透明效果是否已开启。',
      '如果安装了第三方系统美化软件（如 StartAllBack、Rainmeter、TranslucentTB 等），可能会与系统的透明效果产生冲突，请尝试关闭或卸载。',
      '如果仍然无效，请尝试在设置 → 外观 → 背景材质中切换为「云母 Mica」或「亚克力 Acrylic」。',
    ],
    stepsEn: [
      'Check Windows Settings → Accessibility → Visual effects → Transparency effects to ensure it is enabled.',
      'If you have third-party system beautification software installed (such as StartAllBack, Rainmeter, TranslucentTB, etc.), it may conflict with the system transparency effects. Try disabling or uninstalling them.',
      'If the issue persists, try switching the backdrop to "Mica" or "Acrylic" in Settings → Appearance → Backdrop Type.',
    ],
  },
  {
    id: 5,
    question: '添加完文件夹后不显示音乐？',
    questionEn: "Music isn't showing up after I add a folder?",
    steps: [
      '请确认您在文件夹选择对话框中真的点击了「选择文件夹」按钮，而不是仅仅打开浏览。',
      '您也可以直接将文件夹拖拽到主页面的「添加文件夹」区域。',
      '在「设置 → 高级」中开启「文件夹监听」，可让应用自动同步文件夹内的变化，无需手动重新扫描。',
      '支持的音频格式包括：FLAC、WAV、MP3、DSF、APE、M4A、WMV、AIFF、OGA 等。',
    ],
    stepsEn: [
      'Make sure you actually clicked the "Select Folder" button in the folder picker dialog, not just browsing into it.',
      'You can also drag and drop a folder directly onto the "Add Folder" area on the main page.',
      'Enable "Folder Watch" in Settings → Advanced to let the app automatically sync changes in the folder without manual rescan.',
      'Supported audio formats include: FLAC, WAV, MP3, DSF, APE, M4A, WMV, AIFF, OGA, and more.',
    ],
  },
  {
    id: 6,
    question: '应用运行时出现怪异行为？',
    questionEn: 'App behaving strangely?',
    steps: [
      '关闭应用进程（在任务管理器中结束 OriginalSound HIFI Player.exe）。',
      '按 Win + R 打开「运行」，输入 %USERPROFILE%\\Documents\\OriginalSoundPlayer\\Settings 后回车，打开设置所在目录。',
      '删除（或重命名备份）Settings.json 文件。',
      '重新启动应用。首次启动会使用默认设置，所有自定义项将被重置。',
    ],
    stepsEn: [
      'Close the application (end OriginalSound HIFI Player.exe in Task Manager).',
      'Press Win + R, enter %USERPROFILE%\\Documents\\OriginalSoundPlayer\\Settings and press Enter to open the settings directory.',
      'Delete (or rename as backup) the Settings.json file.',
      'Restart the application. The app will start with default settings; all custom preferences will be reset.',
      'If the issue persists, send the log to dannypan9709@foxmail.com.',
    ],
  },
  {
    id: 7,
    question: '歌词和翻译显示异常？',
    questionEn: 'Lyrics and translation display incorrectly?',
    steps: [
      '在播放页面右键点击歌曲封面，进入「音乐属性」窗口。',
      '在底部歌词编辑区域，将原始歌词填写在 Lrc 标签页的文本框中。',
      '将翻译歌词（与原始 LRC 使用相同的时间戳）填写在「Lrc 翻译」标签页的文本框中。',
      '点击右侧的 💾 保存按钮。',
      '如果使用本地 .lrc 文件，翻译文件应命名为 {原文件名}_Translated.lrc，放在同一目录下。',
      '应用会自动按时间戳匹配原始歌词和翻译，分别显示在主歌词（上方较大）和翻译（下方较小）位置。',
    ],
    stepsEn: [
      'Right-click the album art on the playing page, then select "Music Properties".',
      'In the lyrics editing section at the bottom, enter the original lyrics in the Lrc tab.',
      'Enter the translated lyrics (using the same timestamps as the original) in the "Lrc Translation" tab.',
      'Click the 💾 save button on the right.',
      'If using local .lrc files, name the translation file {original_filename}_Translated.lrc and place it in the same directory.',
      'The app automatically matches original and translated lines by timestamp and displays them in two lines (original above, translation below in smaller text).',
    ],
    note: '歌词的「翻译文本」需要单独填写在「Lrc 翻译」标签页中，与原始 Lrc 使用相同的时间戳即可自动匹配。',
    noteEn:
      'The translation text must be entered separately in the "Lrc Translation" tab. Use the same timestamps as the original Lrc for automatic matching.',
  },
  {
    id: 8,
    question: '如何联系开发者？',
    questionEn: 'How to contact the developer?',
    steps: ['可通过邮箱 dannypan9709@foxmail.com 反馈问题或建议。'],
    stepsEn: ['Send feedback or suggestions to dannypan9709@foxmail.com.'],
  },
  {
    id: 9,
    question: '有交流讨论群吗？',
    questionEn: 'QQ discussion groups (Chinese users)',
    steps: ['欢迎加入 QQ 群 1：1009034363', '若群 1 已满，请加 QQ 群 2：1033738779'],
    stepsEn: [],
  },
]
