import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import App from './App.vue'
import router from './router.js'

loadFonts()

createApp(App)
  .use(router) // Use the router
  .use(vuetify)
  .mount('#app')
