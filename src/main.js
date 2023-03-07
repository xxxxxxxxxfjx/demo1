import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import router from '@/router/index'
import pinia from '@/stores/index'
import "normalize.css"
import "@/assets/index.css"


const app = createApp(App)
    app.use(router).use(pinia).mount('#app')
