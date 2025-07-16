// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'      // ← make sure this path is correct
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)                    // ← don’t forget this!
app.mount('#app')
