import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import axios from 'axios'
var Vue = createApp(App)

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
Vue.config.globalProperties.$axios = axios;


Vue.use(Quasar, quasarUserOptions)
Vue.use(store)
Vue.use(router)
Vue.mount('#app')
