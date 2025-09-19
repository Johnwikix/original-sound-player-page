import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { createI18n, type ExportedGlobalComposer } from 'vue-i18n';

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

// 创建 i18n 实例
const i18n = createI18n({
    legacy: false,
    locale: getBrowserLanguage(),
    fallbackLocale: 'en',
    messages: {
        en,
        zh
    }
});

const app = createApp(App)
const globalI18n = {
    get locale() {
        return i18n.global.locale.value;
    },
    set locale(v) {
        i18n.global.locale.value = v;
    },
    get fallbackLocale() {
        return i18n.global.fallbackLocale.value;
    },
    set fallbackLocale(v) {
        i18n.global.fallbackLocale.value = v;
    },
    get availableLocales() {
        return i18n.global.availableLocales.value;
    },
    t: i18n.global.t,
    d: i18n.global.d,
    n: i18n.global.n
};
// app.use(router)
app.use(Antd)
console.log('App is mounting!');
// app.use(i18n)
app.config.globalProperties.$i18n = globalI18n as ExportedGlobalComposer;
app.config.globalProperties.$t = i18n.global.t;

console.log('i18n has been registered!');
app.mount('#app');
