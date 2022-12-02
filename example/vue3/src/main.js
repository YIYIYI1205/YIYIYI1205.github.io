import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { createPinia } from 'pinia'
const pinia = createPinia()
createApp(App).use(pinia).use(store).use(router).mount('#app')
