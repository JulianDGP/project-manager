<!-- src/components/HeaderComponent.vue -->
<template>
  <!-- Barra de aplicación que se muestra en la parte superior -->
  <v-app-bar app color="primary" dark>
    <!-- Contenedor para hacer que el contenido sea responsive -->
    <v-container fluid>
      <v-row class="align-center" no-gutters>
        <!-- Campo de búsqueda por nombre, se ajusta según el tamaño de la pantalla -->
        <v-col cols="10" offset="1"> 
          <v-text-field
            v-model="searchQuery"
            label="Buscar proyectos por nombre"
            color="white"
            hide-details
            dense
            clearable
            rounded
            @keydown.enter="applySearch"
          ></v-text-field>
        </v-col>
        
        <!-- Botón de búsqueda que también se ajusta en tamaño -->
        <v-col cols="1" class="text-right">
          <v-btn icon color="white" @click="applySearch">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '', // Campo para almacenar el término de búsqueda
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

/* Asegura que el botón tenga un fondo semi-transparente */
.v-btn {
  background-color: rgba(255, 255, 255, 0.15);
}
</style>
