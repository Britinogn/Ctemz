import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'

import {useLenis}  from './plugins/lenis'

createApp(App).use(router).use(useLenis).mount('#app')
