<template>
  <v-container class="project-list-container" fluid>
    <v-row class="mb-4">
      <v-col>
        <v-btn color="primary" @click="openCreateProjectModal" elevation="2" rounded>
          <v-icon left>mdi-plus</v-icon>
          Crear Proyecto
        </v-btn>
      </v-col>
    </v-row>

    <v-row v-if="projects.length === 0">
      <v-col>
        <v-alert type="info" text>
          ¡Vaya! Aún no tienes ningún proyecto creado ☹️. Puedes comenzar a crear uno haciendo clic en el botón 'Crear
          Proyecto'. Tus proyectos se guardarán en tu navegador, así que, aunque recargues la página o cierres y vuelvas
          a abrir el navegador, tus proyectos y sus tareas seguirán aquí... a menos que borres la caché o uses un navegador
          diferente 🤔.
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-else-if="foundedProjects.length === 0">
      <v-col>
        <v-alert type="info" prominent elevation="2">
          Parece que no se encontraron proyectos que coincidan con tu búsqueda 🥲 ... Intenta buscar con otro nombre o crear un nuevo proyecto 🤓☝️
        </v-alert>
      </v-col>
    </v-row>

    <CreateProjectModal ref="createProjectModal" @project-saved="addProject" />
    <EditProjectModal ref="editProjectModal" v-if="selectedProject" :project="selectedProject" @project-saved="updateProject" />
    <ProjectDetailsModal ref="projectDetailsModal" v-if="selectedProject" :project="selectedProject" />
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title>Confirmar Eliminación</v-card-title>
        <v-card-text>¿Estás seguro de que deseas eliminar este proyecto?</v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="deleteProject">Eliminar</v-btn>
          <v-btn color="primary" text @click="closeDeleteDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col cols="12" sm="6" v-for="project in foundedProjects" :key="project.id">
        <v-card @click="openProjectDetails(project)" elevation="2" hover class="project-card transition-swing mb-4">
          <v-card-title class="d-flex justify-space-between">
            <span>{{ project.name }}</span>
            <v-chip :color="project.active === 'Activo' ? 'success' : 'error'">
              {{ project.active }}
            </v-chip>
          </v-card-title>
          <v-card-text>{{ project.description }}</v-card-text>
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
import CreateProjectModal from '../components/CreateProjectModal.vue';
import EditProjectModal from '../components/EditProjectModal.vue';
import ProjectDetailsModal from '../components/ProjectDetailsModal.vue';

export default {
  name: 'ProjectList',
  components: {
    CreateProjectModal,
    EditProjectModal,
    ProjectDetailsModal
  },
  props: {
    searchQuery: String,
  },
  data() {
    return {
      projects: [
        {
          id: 1,
          name: 'Proyecto 1',
          description: 'Lorem ipsum dolor sit amet...',
          active: 'Activo',
          tasks: [
            { id: 1, name: 'Tarea 1.1', description: 'Descripción de la tarea 1.1', status: 'Pendiente' },
            { id: 2, name: 'Tarea 1.2', description: 'Descripción de la tarea 1.2', status: 'En Progreso' },
          ]
        },
        {
          id: 2,
          name: 'Proyecto 2',
          description: 'Vivamus euismod...',
          active: 'Inactivo',
          tasks: [
            { id: 1, name: 'Tarea 2.1', description: 'Descripción de la tarea 2.1', status: 'Completada' }
          ]
        },
      ],
      selectedProject: null,
      projectToDelete: null,
      deleteDialog: false,
    };
  },
  computed: {
    foundedProjects() {
      if (this.searchQuery) {
        return this.projects.filter(project =>
          project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        return this.projects;
      }
    }
  },
  methods: {
    openCreateProjectModal() {
      this.$refs.createProjectModal.open();
    },
    addProject(newProject) {
      newProject.id = this.projects.length + 1;
      newProject.tasks = [];
      this.projects.push(newProject);
    },
    openEditProjectModal(project) {
      this.selectedProject = { ...project };
      this.$nextTick(() => {
      if (this.$refs.editProjectModal) {
        this.$refs.editProjectModal.open();
      }
    });
    },
    updateProject(updatedProject) {
      const index = this.projects.findIndex(p => p.id === updatedProject.id);
      if (index !== -1) {
        this.projects[index] = updatedProject;
      }
    },
    openDeleteDialog(project) {
      this.projectToDelete = project;
      this.deleteDialog = true;
    },
    closeDeleteDialog() {
      this.projectToDelete = null;
      this.deleteDialog = false;
    },
    deleteProject() {
      if (this.projectToDelete) {
        this.projects = this.projects.filter(p => p.id !== this.projectToDelete.id);
        this.closeDeleteDialog();
      }
    },
    openProjectDetails(project) {
      this.selectedProject = { ...project };
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
  padding-top: 24px;
}

.project-card {
  height: 100%;
  display: flex;
  flex-direction: column;
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
</style>
