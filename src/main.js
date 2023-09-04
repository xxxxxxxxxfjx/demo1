import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:windi.css';
import { router } from '@/router/index';
import pinia from '@/stores/index';
import 'normalize.css';
import '@/assets/index.css';
import '@/hooks/routerGuard';
import 'nprogress/nprogress.js';
import 'nprogress/nprogress.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import useDirectives from '@/hooks/directives/index'

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.use(useDirectives)
app.use(router).use(pinia).mount('#app');
console.log(app.config.globalProperties);