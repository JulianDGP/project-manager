<!-- src/views/ProjectListView.vue -->
<template>

  <!-- Lista de proyectos -->
  <v-container class="project-list-container" fluid>
    <!-- Botón Crear Proyecto -->
    <v-row class="mb-4">
      <v-col>
        <v-btn color="primary" @click="openCreateProjectModal">Crear Proyecto</v-btn>
      </v-col>
    </v-row>

    <!-- Modal Crear Proyecto -->
    <CreateProjectModal ref="createProjectModal" />

    <v-row v-for="project in projects" :key="project.id">
      <v-col>
        <v-card>
          <v-card-title>{{ project.name }}</v-card-title>
          <v-card-subtitle :class="project.active ? 'status-activo' : 'status-inactivo'">
            {{ project.active ? 'Activo' : 'Inactivo' }}
          </v-card-subtitle>
          <v-card-text>
            {{ project.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
// Importar modal de crear proyecto
import CreateProjectModal from '../components/CreateProjectModal.vue';


export default {
  name: 'ProjectList',
  components: {
    CreateProjectModal
  },
  data() {
    return {
      projects: [
        { id: 1, name: 'Proyecto 1', description: 'Descripción del Proyecto 1', active: true },
        { id: 2, name: 'Proyecto 2', description: 'Descripción del Proyecto 2', active: false },
        { id: 3, name: 'Proyecto 3', description: 'Descripción del Proyecto 3', active: true },
        { id: 4, name: 'Proyecto 4', description: 'Descripción del Proyecto 4', active: false },
        { id: 5, name: 'Proyecto 5', description: 'Descripción del Proyecto 5', active: true },
        { id: 6, name: 'Proyecto 6', description: 'Descripción del Proyecto 6', active: false },
        { id: 7, name: 'Proyecto 7', description: 'Descripción del Proyecto 7', active: true },
        { id: 8, name: 'Proyecto 8', description: 'Descripción del Proyecto 8', active: false },
        { id: 9, name: 'Proyecto 9', description: 'Descripción del Proyecto 9', active: true },
        { id: 10, name: 'Proyecto 10', description: 'Descripción del Proyecto 10', active: false },
        { id: 11, name: 'Proyecto 11', description: 'Descripción del Proyecto 11', active: true },
        { id: 12, name: 'Proyecto 12', description: 'Descripción del Proyecto 12', active: false },
      ]
    }
  },
  methods: {
    openCreateProjectModal() {
      // Este método abrir el modal de creación de proyectos
      this.$refs.createProjectModal.open();
    }
  }
}
</script>

<style scoped>
/* Estilos específicos para ProjectList */
.project-list-container {
  max-width: 80%; /* Ancho máximo del contenedor */
  overflow-y: auto; /* Activa el scroll vertical */
  padding-top: 16px; /* Espaciado para los elementos */
}

/* Estilos para los estados */
.status-activo {
  color: green; /* verde para activo */
}

.status-inactivo {
  color: red; /* Rojo para inactivo */
}
</style>