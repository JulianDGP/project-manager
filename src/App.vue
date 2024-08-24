<!-- src/App.vue -->
<template>
<v-app>
    <!-- Header de la aplicación -->
    <HeaderComponent />
    <!-- Home de la aplicación -->
    <HomeView />

    <!-- Proyectos -->
    <ProjectListView />
  </v-app>
</template>

<script>
// Importar el componente HeaderComponent
import HeaderComponent from './components/HeaderComponent.vue'
import HomeView from './views/HomeView.vue'
import ProjectListView from './views/ProjectListView.vue'

export default {
  components: {
    HeaderComponent,
    HomeView,
    ProjectListView,
  },
}
</script>

<style>
/* añadir estilos globales aquí si es necesario */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
