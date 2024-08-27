<!-- src/App.vue -->
<template>
<v-app>
    <!-- Header de la aplicación -->
    <HeaderComponent 
      @search-query="updateSearchQuery" />
    <HomeView/>

    <!-- Proyectos -->
    <ProjectListView 
      :search-query="searchQuery" />
  </v-app>
</template>

<script>
// Importar el componente HeaderComponent
import HeaderComponent from './components/HeaderComponent.vue'
import ProjectListView from './views/ProjectListView.vue'
import HomeView from './views/HomeView.vue'
export default {
  components: {
    HeaderComponent,
    ProjectListView,
    HomeView
    
  },
  data() {
    return {
      searchQuery: '', // Inicialmente vacío
    };
  },
  methods: {
    updateSearchQuery(query) {
      this.searchQuery = query; // Actualizar el término de búsqueda
    },
  },
  created() {
    this.$store.dispatch('loadProjects'); // Cargar proyectos desde localStorage cuando se crea el componente
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
