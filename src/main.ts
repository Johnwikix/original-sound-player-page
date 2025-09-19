import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import i18n from './i18n';
const app = createApp(App)

// app.use(router)

app.use(Antd)
console.log('App is mounting!');
app.use(i18n)
console.log('i18n has been registered!');
app.mount('#app');
