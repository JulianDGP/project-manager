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

import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css'; // Importa los íconos de Material Design

// Configuración de Vuetify
const vuetify = createVuetify({
  components,
  directives,
  icons:{
    defaultSet: 'mdi',
    aliases,
    sets:{
      mdi,
    },
  },
});

// Crear la aplicación Vue y montar Vuetify
const app = createApp(App)
app.use(vuetify)
app.use(store) // Usar Vuex
app.mount('#app')
