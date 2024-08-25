<!-- src/components/HeaderComponent.vue -->
<template>
  <v-app-bar app color="primary" dark>
    <v-row class="align-center" no-gutters>
      <!-- Título del encabezado -->
      <v-col cols="auto">
        <v-toolbar-title class="white--text">Gestión de Proyectos</v-toolbar-title>
      </v-col>
       <!-- Campo de búsqueda por nombre -->
       <v-col cols="auto">
        <v-text-field
          v-model="searchQuery"
          label="Buscar por nombre"
          dense
          solo
          color="secondary"
        ></v-text-field>
      </v-col>
       <!-- Botón para aplicar la búsqueda -->
       <v-col cols="auto">
        <v-btn color="secondary" @click="applySearch" class="white--text">
          Buscar
        </v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>


<script>
export default {
  data() {
    return {
      searchQuery: '', // Campo para el término de búsqueda
    };
  },
  methods: {
    applySearch() {
      this.$emit('search-query', this.searchQuery); // Emitir el término de búsqueda al componente padre
    }
  }
}
</script>

<style scoped>
/* Estilos específicos para el HeaderComponent */
</style>
  