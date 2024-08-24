// src/main.js

import { createApp } from 'vue'
import App from './App.vue'
// Importar Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
// Importar componentes y directivas de Vuetify
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import store from './store' // Importar Vuex


// Configuración de Vuetify
const vuetify = createVuetify({
  components,
  directives,
})

// Crear la aplicación Vue y montar Vuetify
const app = createApp(App)
app.use(vuetify)
app.use(store) // Usar Vuex
app.mount('#app')
