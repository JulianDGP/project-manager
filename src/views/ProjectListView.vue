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

    <!-- Modal Editar Proyecto -->
    <CreateProjectModal ref="editProjectModal" v-if="selectedProject" :project="selectedProject"
      @project-saved="updateProject" />

    <!-- Modal Detalles del Proyecto -->
    <ProjectDetailsModal ref="projectDetailsModal"
    v-if="selectedProject" :project="selectedProject" />

    <!-- Modal de Confirmación para Eliminar Proyecto -->
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirmar Eliminación</v-card-title>
        <v-card-text>¿Estás seguro de que deseas eliminar este proyecto?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deleteProject">Eliminar</v-btn>
          <v-btn color="blue darken-1" text @click="closeDeleteDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Lista de proyectos -->
    <v-row v-for="project in projects" :key="project.id">
      <v-col>
        <v-card @click="openProjectDetails(project)" elevation="5">
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
          <!-- Botón de edición -->
          <v-btn icon @click.stop="openEditProjectModal(project)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <!-- Botón de eliminación -->
          <v-btn icon @click.stop="openDeleteDialog(project)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Importar modal de crear proyecto y modal detalles del proyecto
import CreateProjectModal from '../components/CreateProjectModal.vue';
import ProjectDetailsModal from '../components/ProjectDetailsModal.vue';

export default {
  name: 'ProjectList',
  components: {
    CreateProjectModal,
    ProjectDetailsModal
  },
  data() {
    return {

      
      projects: [
        { id: 1, name: 'Proyecto 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula mauris nec augue elementum, nec scelerisque arcu fringilla. Vivamus euismod, metus at fermentum vehicula, urna justo lobortis est, in volutpat neque nunc vel nisi. Donec non urna ut erat malesuada dictum non non nisi.', active: 'Activo', tasks: [
          { id: 1, name: 'Tarea 1.1', description: 'Descripción de la tarea 1.1', status: 'Pendiente' },
          { id: 2, name: 'Tarea 1.2', description: 'Descripción de la tarea 1.2', status: 'En Progreso' },
          { id: 3, name: 'Tarea 1.3', description: 'Descripción de la tarea 1.3', status: 'En Progreso' },
          { id: 4, name: 'Tarea 1.4', description: 'Descripción de la tarea 1.4', status: 'En Progreso' },
          { id: 5, name: 'Tarea 1.5', description: 'Descripción de la tarea 1.5', status: 'En Progreso' }
        ] },
        { id: 2, name: 'Proyecto 2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula mauris nec augue elementum, nec scelerisque arcu fringilla. Vivamus euismod, metus at fermentum vehicula, urna justo lobortis est, in volutpat neque nunc vel nisi. Donec non urna ut erat malesuada dictum non non nisi.', active: 'Inactivo', tasks: [
          { id: 1, name: 'Tarea 2.1', description: 'Descripción de la tarea 2.1', status: 'Completada' }
        ] },
        { id: 3, name: 'Proyecto 3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vehicula mauris nec augue elementum, nec scelerisque arcu fringilla. Vivamus euismod, metus at fermentum vehicula, urna justo lobortis est, in volutpat neque nunc vel nisi. Donec non urna ut erat malesuada dictum non non nisi.', active: 'Activo', tasks: [] },
        // Otros proyectos...
      ],
      selectedProject: {}, // Proyecto seleccionado para editar
      projectToDelete: null, // Proyecto seleccionado para eliminar
      deleteDialog: false, // Estado del modal de confirmación de eliminación
    };
  },

  methods: {
    openCreateProjectModal() {// Método para abrir el modal de creación de proyectos
      this.$refs.createProjectModal.open();
    },
    addProject(newProject) {// Método para agregar un nuevo proyecto a la lista
      newProject.id = this.projects.length + 1;// Asignar un ID único al nuevo proyecto
      newProject.tasks = []; // Asegurarse de que el nuevo proyecto tenga una lista de tareas vacía
      this.projects.push(newProject); // Añadir el nuevo proyecto a la lista de proyectos
      console.log('Nuevo proyecto añadido:', newProject);// Imprimir en consola para verificar
    },
    openEditProjectModal(project) {
      this.selectedProject = { ...project }; // Clonar el proyecto seleccionado
      // asegurarse de que el ref `editProjectModal` esté definido antes de intentar abrir el modal
      this.$nextTick(() => {
        if (this.$refs.editProjectModal) {
          this.$refs.editProjectModal.open();
        } else {
          console.error("El modal de edición no está disponible.");
        }
      });
    },
    updateProject(updatedProject) {
      const index = this.projects.findIndex(p => p.id === updatedProject.id);
      if (index !== -1) {
        this.projects[index] = updatedProject;
      }
      console.log('Proyecto actualizado:', updatedProject);
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
        console.log('Proyecto eliminado:', this.projectToDelete);
        this.closeDeleteDialog();
      }
    },
    openProjectDetails(project){
      this.selectedProject= { ...project};
      this.$nextTick(()=>{
        if (this.$refs.projectDetailsModal){
          this.$refs.projectDetailsModal.open();
        }
      });
    }
  }
}
</script>

<style scoped>
/* Estilos específicos para ProjectList */
.project-list-container {
  max-width: 80%;
  /* Ancho máximo del contenedor */
  overflow-y: auto;
  /* Activa el scroll vertical */
  padding-top: 16px;
  /* Espaciado para los elementos */
}

/* Estilos para los estados */
.status-activo {
  color: green;
  /* verde para activo */
}

.status-inactivo {
  color: red;
  /* Rojo para inactivo */
}
</style>