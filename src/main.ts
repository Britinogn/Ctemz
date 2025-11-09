// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'
// import router from './routes'

// import {useLenis}  from './plugins/lenis'

// createApp(App).use(router).use(useLenis).mount('#app')


import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
//import { useLenis } from './plugins/lenis'

const app = createApp(App)

app.use(router)
app.mount('#app')

// // Initialize Lenis after mounting
// onMounted(() => {
//   useLenis() // Only one instance, singleton pattern
// })
