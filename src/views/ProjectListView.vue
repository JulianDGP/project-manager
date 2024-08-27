<!-- src/views/ProjectListView.vue -->
<template>
  <v-container class="project-list-container" fluid>
    <!-- Botón Crear Proyecto -->
    <v-row class="mb-4">
      <v-col>
        <v-btn color="primary" @click="openCreateProjectModal" elevation="2" rounded>
          <v-icon left>mdi-plus</v-icon>
          Crear Proyecto
        </v-btn>
      </v-col>
    </v-row>

    <!-- Selector de estado para filtrar proyectos -->
    <v-col>
      <v-select v-model="selectedStatus" :items="['Todos', 'Activo', 'Inactivo']" label="Filtrar por estado"
        dense></v-select>
    </v-col>
    <!-- Mostrar mensaje si no hay proyectos -->
    <v-row v-if="projects.length === 0">
      <v-col>
        <v-alert type="info" text>
          ¡Vaya! Aún no tienes ningún proyecto creado ☹️. Puedes comenzar a crear uno haciendo clic en el botón 'Crear
          Proyecto'. Tus proyectos se guardarán en tu navegador, así que, aunque recargues la página o cierres y vuelvas
          a abrir el navegador, tus proyectos y sus tareas seguirán aquí... a menos que borres la caché o uses un
          navegador
          diferente 🤔.
        </v-alert>
      </v-col>
    </v-row>

    <!-- Mostrar mensaje si no se encuentran proyectos en la búsqueda -->
    <v-row v-else-if="foundedProjects.length === 0">
      <v-col>
        <v-alert type="info" prominent elevation="2">
          Parece que no se encontraron proyectos que coincidan con tu búsqueda 🥲 ... Intenta buscar con otro nombre o
          crear un nuevo proyecto 🤓☝️
        </v-alert>
      </v-col>
    </v-row>
    <!-- Modal Crear Proyecto -->
    <CreateProjectModal ref="createProjectModal" @project-saved="handleProjectSaved" />
    <!-- Modal Editar Proyecto -->
    <EditProjectModal ref="editProjectModal" v-if="selectedProject" :project="selectedProject"
      @project-saved="handleProjectUpdated" />
    <!-- Modal Detalles del Proyecto -->
    <ProjectDetailsModal ref="projectDetailsModal" v-if="selectedProject" :project="selectedProject" />
    <!-- Modal de Confirmación para Eliminar Proyecto -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title>Confirmar Eliminación</v-card-title>
        <v-card-text>¿Estás seguro de que deseas eliminar este proyecto?</v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="handleDeleteProject">Eliminar</v-btn>
          <v-btn color="primary" text @click="closeDeleteDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- Lista de proyectos -->
    <v-row>
      <v-col cols="12" sm="6" v-for="project in foundedProjects" :key="project.id">
        <v-card @click="openProjectDetails(project)" elevation="2" hover class="project-card transition-swing mb-4">
          <!-- Título del proyecto y chip de estado -->
          <v-card-title class="d-flex justify-space-between align-center flex-wrap">
            <span class="project-title">{{ project.name }}</span>
            <v-chip class="status-chip" :color="project.active === 'Activo' ? 'success' : 'error'">
              {{ project.active }}
            </v-chip>
          </v-card-title>

          <!-- Descripción del proyecto -->
          <v-card-text class="text-left">{{ project.description }}</v-card-text>
          <!-- Botones de acción -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="openEditProjectModal(project)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click.stop="openDeleteDialog(project)">
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Importar componentes necesarios
import CreateProjectModal from '../components/CreateProjectModal.vue';
import EditProjectModal from '../components/EditProjectModal.vue';
import ProjectDetailsModal from '../components/ProjectDetailsModal.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProjectList',
  components: {
    CreateProjectModal,
    EditProjectModal,
    ProjectDetailsModal
  },
  props: {
    searchQuery: String, // Prop para recibir la consulta de búsqueda
  },
  data() {
    return { // Lista de proyectos de ejemplo
      selectedStatus: 'Todos', // Estado seleccionado por el usuario
      selectedProject: null, // Proyecto seleccionado para editar o ver detalles
      projectToDelete: null, // Proyecto seleccionado para eliminar
      deleteDialog: false, // Estado del modal de confirmación de eliminación
    };
  },
  computed: {
    ...mapState(['projects']), // Obtener el estado de los proyectos desde Vuex
    foundedProjects() { // Filtrar proyectos basados en la consulta de búsqueda
      let filteredProjects = this.projects;

      if (this.searchQuery) {
        filteredProjects = filteredProjects.filter(project =>
          project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      if (this.selectedStatus !== 'Todos') {
        filteredProjects = filteredProjects.filter(project =>
          project.active === this.selectedStatus
        );
      }

      return filteredProjects;
    }
  },
  methods: {
    ...mapActions(['addProject', 'updateProject', 'deleteProject']),

    // Método para abrir el modal de creación de proyectos
    openCreateProjectModal() {
      this.$refs.createProjectModal.open();
    },
    // Este método se llama cuando se guarda un proyecto desde el modal
    handleProjectSaved(newProject) {
      this.addProject(newProject); // Llamar a la acción de Vuex para añadir un proyecto
    },
    openEditProjectModal(project) { // Método para abrir el modal de edición de proyectos
      this.selectedProject = { ...project }; // Clonar el proyecto seleccionado
      this.$nextTick(() => {
        if (this.$refs.editProjectModal) {
          this.$refs.editProjectModal.open();
        } else {
          console.error("El modal de edición no está disponible.");
        }
      });
    },
    handleProjectUpdated(updatedProject) {
      this.updateProject(updatedProject); // Llamar a la acción de Vuex para actualizar un proyecto
    },
    openDeleteDialog(project) { // Método para abrir el diálogo de confirmación de eliminación
      this.projectToDelete = project;
      this.deleteDialog = true;
    },
    closeDeleteDialog() { // Método para cerrar el diálogo de confirmación de eliminación
      this.projectToDelete = null;
      this.deleteDialog = false;
    },
    handleDeleteProject() {
      if (this.projectToDelete) {
        this.deleteProject(this.projectToDelete.id); // Llamar a la acción de Vuex para eliminar un proyecto
        this.closeDeleteDialog();
      }
    },
    openProjectDetails(project) { // Método para abrir el modal de detalles del proyecto
      const projectFromStore = this.projects.find(p => p.id === project.id);
      if (projectFromStore) {
        this.selectedProject = { ...projectFromStore }; // Asegurarse de que el proyecto esté actualizado desde el store
      }
      this.$nextTick(() => {
        if (this.$refs.projectDetailsModal) {
          this.$refs.projectDetailsModal.open();
        }
      });
    }
  }
}
</script>

<style scoped>
.project-list-container {
  max-width: 1200px;
  /* Ancho máximo del contenedor */
  padding-top: 24px;
}

.project-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.text-left {
  text-align: left;
}

.v-card__actions {
  justify-content: flex-end;
}

.transition-swing {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.v-card:hover {
  transform: translateY(-5px);
}

.project-title {
  text-align: left;
  font-size: 1rem;
  flex: 1;
  margin-right: 8px;
}

.status-chip {
  font-size: 0.875rem;
  padding: 0 4px;
}

@media (max-width: 600px) {
  .status-chip {
    font-size: 0.75rem;
    padding: 0 2px;
  }
  .project-title {
    font-size: 0.875rem;
  }
}
</style>
