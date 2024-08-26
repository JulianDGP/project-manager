<template>
  <!-- Dialogo principal que muestra los detalles del proyecto -->
  <v-dialog v-model="dialog" max-width="800">
    <v-card>
      <!-- Encabezado del diálogo con el nombre del proyecto y un botón para cerrar -->
      <v-card-title class="text-h4 pa-6 d-flex justify-space-between align-center">
        <span>{{ project.name }}</span>
        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Contenido del diálogo -->
      <v-card-text class="pa-4">
        <v-container>
          <!-- Información del proyecto: Descripción y Estado -->
          <v-row>
            <v-col>
              <h3 class="text-h6 mb-2">Descripción</h3>
              <p>{{ project.description }}</p>
            </v-col>
            <v-col>
              <h3 class="text-h6 mb-2">Estado</h3>
              <v-chip :color="project.active ? 'success' : 'error'" text-color="white">
                {{ project.active ? 'Activo' : 'Inactivo' }}
              </v-chip>
            </v-col>
          </v-row>

          <!-- Estadísticas de las tareas del proyecto -->
          <v-row v-if="project.tasks && project.tasks.length">
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

          <!-- Botón para crear una nueva tarea -->
          <v-row class="mt-4">
            <v-col cols="12">
              <v-btn color="primary" @click="openCreateTaskModal">
                <v-icon left>mdi-plus</v-icon>
                Crear Tarea
              </v-btn>
            </v-col>
          </v-row>

          <!-- Lista de tareas del proyecto -->
          <v-row v-if="project.tasks && project.tasks.length">
            <v-col cols="12">
              <h3 class="text-h6 mb-2">Tareas del Proyecto</h3>
              <v-row>
                <v-col cols="12" sm="6" md="4" v-for="task in project.tasks" :key="task.id">
                  <v-card hover class="task-card">
                    <v-card-title class="text-h6">{{ task.name }}</v-card-title>
                    <v-card-subtitle>
                      <v-chip small :color="getStatusColor(task.status)" text-color="white">
                        {{ task.status }}
                      </v-chip>
                    </v-card-subtitle>
                    <v-card-text>{{ task.description }}</v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- Acciones del diálogo cerrar -->
      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="close">Cerrar</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Componente modal para crear nuevas tareas -->
    <CreateTaskModal ref="createTaskModal" @task-saved="addTask" />
  </v-dialog>
</template>

<script>
import CreateTaskModal from './CreateTaskModal.vue';

export default {
  props: {
    // Propiedad que recibe la información del proyecto
    project: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialog: false, // Controla la visibilidad del diálogo
    };
  },
  components: {
    CreateTaskModal // Componente para la creación de tareas
  },
  computed: {
    // Calcula las estadísticas de las tareas del proyecto
    taskStatistics() {
      const stats = {
        Pendientes: 0,
        'En Progreso': 0,
        Completadas: 0
      };
      if (this.project.tasks) {
        this.project.tasks.forEach(task => {
          if (task.status === 'Pendiente') stats.Pendientes++;
          if (task.status === 'En Progreso') stats['En Progreso']++;
          if (task.status === 'Completada') stats.Completadas++;
        });
      }
      return stats;
    }
  },
  methods: {
    // Abre el diálogo
    open() {
      this.dialog = true;
    },
    // Cierra el diálogo
    close() {
      this.dialog = false;
    },
    // Abre el modal para crear una nueva tarea
    openCreateTaskModal() {
      if (this.$refs.createTaskModal) {
        this.$refs.createTaskModal.open();
      }
    },
    // Añade una nueva tarea al proyecto
    addTask(newTask) {
      if (!this.project.tasks) {
        this.project.tasks = [];
      }
      newTask.id = this.project.tasks.length + 1; // Asigna un ID a la nueva tarea
      this.project.tasks.push(newTask); // Agrega la tarea a la lista
      console.log('Nueva tarea añadida:', newTask);
    },
    // Retorna el color correspondiente al estado de la tarea
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
/* Estilos para la tarjeta de tarea, incluyendo una animación al pasar el mouse */
.task-card {
  transition: all 0.3s ease;
}

.task-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>