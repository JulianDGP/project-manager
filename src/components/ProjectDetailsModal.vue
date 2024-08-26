<!-- src/components/ProjectDetailsModal.vue -->

<template>
  <!-- Modal de diálogo para mostrar detalles del proyecto -->
  <v-dialog v-model="dialog" max-width="800">
    <v-card>
      <v-card-title class="text-h4 pa-6 d-flex justify-space-between align-center">
        <span>{{ localProject.name }}</span>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-4">
        <v-container>
          <v-row>
            <v-col>
              <h3 class="text-h6 mb-2">Descripción</h3>
              <p>{{ localProject.description }}</p>
            </v-col>
            <v-col>
              <h3 class="text-h6 mb-2">Estado</h3>
              <v-chip :color="localProject.active ? 'success' : 'error'" text-color="white">
                {{ localProject.active ? 'Activo' : 'Inactivo' }}
              </v-chip>
            </v-col>
          </v-row>
          <v-row v-if="localProject.tasks && localProject.tasks.length">
            <v-col>
              <h3 class="text-h6 mb-2">Estadísticas de Tareas</h3>
              <v-row>
                <v-col cols="4" v-for="(value, key) in taskStatistics" :key="key">
                  <v-card outlined class="text-center pa-2">
                    <div class="text-h5 font-weight-bold">{{ value }}</div>
                    <div class="text-caption text-uppercase">{{ key }}</div>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="mt-4">
            <v-col cols="12">
              <v-btn color="primary" @click="openCreateTaskModal">
                <v-icon left>mdi-plus</v-icon>
                Crear Tarea
              </v-btn>
            </v-col>
          </v-row>

          <!-- lista de las tareas del proyecto -->
          <v-row v-if="localProject.tasks && localProject.tasks.length">
            <v-col cols="12">
              <h3 class="text-h6 mb-2">Tareas del Proyecto</h3>
              <v-row>
                <v-col cols="12" sm="6" md="4" v-for="task in localProject.tasks" :key="task.id">
                  <v-card hover class="task-card">
                    <v-card-title class="text-h6">{{ task.name }}</v-card-title>
                    <v-card-subtitle>
                      <v-chip small :color="getStatusColor(task.status)" text-color="white">
                        {{ task.status }}
                      </v-chip>
                    </v-card-subtitle>
                    <v-card-text>{{ task.description }}</v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn icon @click.stop="openDeleteTaskDialog(task)">
                        <v-icon color="error">mdi-delete</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="close">Cerrar</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Modal de creacion de la tarea -->

    <CreateTaskModal ref="createTaskModal" @task-saved="addTask" />

    <!-- Modal de Confirmación para Eliminar Tarea -->
    <v-dialog v-model="deleteTaskDialog" max-width="500">
      <v-card>
        <v-card-title>Confirmar Eliminación</v-card-title>
        <v-card-text>¿Estás seguro de que deseas eliminar esta tarea?</v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="handleDeleteTask">Eliminar</v-btn>
          <v-btn color="primary" text @click="closeDeleteTaskDialog">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>

</template>

<script>
import CreateTaskModal from './CreateTaskModal.vue';

export default {
  props: {
    project: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialog: false,
      deleteTaskDialog: false, // Estado del modal de confirmación de eliminación de tarea
      taskToDelete: null, // Tarea seleccionada para eliminar
      localProject: {} // Inicializa la propiedad local para almacenar una copia del proyecto
    };
  },
  components: {
    CreateTaskModal
  },
  computed: {
    taskStatistics() {
      const stats = {
        Pendientes: 0,
        'En Progreso': 0,
        Completadas: 0
      };
      if (this.localProject.tasks) {
        this.localProject.tasks.forEach(task => {
          if (task.status === 'Pendiente') stats.Pendientes++;
          if (task.status === 'En Progreso') stats['En Progreso']++;
          if (task.status === 'Completada') stats.Completadas++;
        });
      }
      return stats;
    }
  },
  methods: {
    open() {
      const projectFromStore = this.$store.state.projects.find(p => p.id === this.project.id);
      if (projectFromStore) {
        this.localProject = { ...projectFromStore };
      }
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    openCreateTaskModal() {
      if (this.$refs.createTaskModal) {
        this.$refs.createTaskModal.open();
      }
    },
    addTask(newTask) {
      if (!this.localProject.tasks) {
        this.localProject.tasks = [];
      }
      newTask.id = this.localProject.tasks.length + 1;
      this.localProject.tasks.push(newTask);
      this.updateProjectInLocalStorage(); // Guardar las tareas junto con el proyecto
    },

    // Método para abrir el modal de confirmación de eliminación de tarea
    openDeleteTaskDialog(task) {
      this.taskToDelete = task;
      this.deleteTaskDialog = true;
    },
    
    // Método para cerrar el modal de confirmación de eliminación de tarea
    closeDeleteTaskDialog() {
      this.taskToDelete = null;
      this.deleteTaskDialog = false;
    },

    // Método para eliminar la tarea seleccionada
    handleDeleteTask() {
      if (this.taskToDelete) {
        this.localProject.tasks = this.localProject.tasks.filter(task => task.id !== this.taskToDelete.id);
        this.updateProjectInLocalStorage();
        this.closeDeleteTaskDialog();
      }
    },
    // Método para actualizar el proyecto en localStorage
    updateProjectInLocalStorage() {
      const projects = JSON.parse(localStorage.getItem('projects')) || [];
      const updatedProjects = projects.map(project => {
        if (project.id === this.localProject.id) {
          return { ...this.localProject}; // Actualiza las tareas del proyecto
        }
        return project;
      });
      localStorage.setItem('projects', JSON.stringify(updatedProjects)); // Guarda la nueva lista de proyectos en localStorage

      // Actualiza también el store para que esté sincronizado
      this.$store.commit('SET_PROJECTS', updatedProjects);
    },
    getStatusColor(status) {
      switch (status) {
        case 'Pendiente':
          return 'warning';
        case 'En Progreso':
          return 'info';
        case 'Completada':
          return 'success';
        default:
          return 'grey';
      }
    }
  }
}
</script>

<style scoped>
.task-card {
  height: 100%;
  transition: all 0.3s ease;
}

.task-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
