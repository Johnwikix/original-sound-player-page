import { createI18n } from 'vue-i18n';

// 导入语言文件
import en from './locales/en.json';
import zh from './locales/zh.json';

// 获取浏览器语言
const getBrowserLanguage = () => {
    const lang = navigator.language.toLowerCase();
    if (lang.startsWith('zh')) {
        return 'zh';
    }
    return 'en';
};

const i18n = createI18n({
    legacy: false, // 使用 Composition API 模式
    //   locale: getBrowserLanguage(), // 设置默认语言为浏览器语言
    locale: 'zh',
    fallbackLocale: 'en', // 当浏览器语言文件不存在时，使用英文作为备选
    messages: {
        en,
        zh
    }
});

export default i18n; 