<!-- src/views/ProjectListView.vue -->
<template>
  <v-container class="project-list-container" fluid>
    <!-- Botón Crear Proyecto -->
    <v-row class="mb-4">
      <v-col>
        <!-- Botón para abrir el modal de creación de proyectos -->
        <v-btn color="primary" @click="openCreateProjectModal">
          Crear Proyecto
        </v-btn>
      </v-col>
    </v-row>

    <!-- Modal Crear Proyecto -->
    <!-- Se escucha el evento 'project-saved' y se ejecuta el método 'addProject' -->
    <CreateProjectModal ref="createProjectModal" @project-saved="addProject" />

    <!-- Lista de proyectos -->
    <v-row v-for="project in projects" :key="project.id">
      <v-col>
        <v-card>
          <!-- Título del proyecto -->
          <v-card-title>{{ project.name }}</v-card-title>
          <!-- Subtítulo mostrando el estado del proyecto -->
          <v-card-subtitle :class="project.active === 'Activo' ? 'status-activo' : 'status-inactivo'">
            {{ project.active }}
          </v-card-subtitle>
          <!-- Descripción del proyecto -->
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
        { id: 1, name: 'Proyecto 1', description: 'Descripción del Proyecto 1', active: 'Activo' },
        { id: 2, name: 'Proyecto 2', description: 'Descripción del Proyecto 2', active: 'Inactivo' },
        { id: 3, name: 'Proyecto 3', description: 'Descripción del Proyecto 3', active: 'Activo' },
        { id: 4, name: 'Proyecto 4', description: 'Descripción del Proyecto 4', active: 'Inactivo' },
        { id: 5, name: 'Proyecto 5', description: 'Descripción del Proyecto 5', active: 'Activo' },
        { id: 6, name: 'Proyecto 6', description: 'Descripción del Proyecto 6', active: 'Inactivo' },
        { id: 7, name: 'Proyecto 7', description: 'Descripción del Proyecto 7', active: 'Activo' },
        { id: 8, name: 'Proyecto 8', description: 'Descripción del Proyecto 8', active: 'Inactivo' },
        { id: 9, name: 'Proyecto 9', description: 'Descripción del Proyecto 9', active: 'Activo' },
        { id: 10, name: 'Proyecto 10', description: 'Descripción del Proyecto 10', active: 'Inactivo' },
        { id: 11, name: 'Proyecto 11', description: 'Descripción del Proyecto 11', active: 'Activo' },
        { id: 12, name: 'Proyecto 12', description: 'Descripción del Proyecto 12', active: 'Inactivo' },
      ]
    }
  },
  methods: {
    openCreateProjectModal() {    // Método para abrir el modal de creación de proyectos

      this.$refs.createProjectModal.open();
    },
    addProject(newProject) {// Método para agregar un nuevo proyecto a la lista

      newProject.id = this.projects.length + 1;// Asignar un ID único al nuevo proyecto

      this.projects.push(newProject); // Añadir el nuevo proyecto a la lista de proyectos

      console.log('Nuevo proyecto añadido:', newProject);// Imprimir en consola para verificar

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